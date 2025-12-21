# 🏗️ Deployment Architecture

## Visual Overview

### Complete System Architecture

```
                         ┌─────────────────────────┐
                         │      Internet           │
                         │   (Port 443/HTTPS)      │
                         └───────────┬─────────────┘
                                     │
                         ┌───────────▼─────────────┐
                         │   Traefik Reverse Proxy │
                         │   - SSL Termination     │
                         │   - Domain Routing      │
                         │   - Load Balancing      │
                         └───────────┬─────────────┘
                                     │
                    ┌────────────────┼────────────────┐
                    │                │                │
         ┌──────────▼──────────┐    │    ┌──────────▼──────────┐
         │   Constrix_Base     │    │    │  Company Profile    │
         │   Containers        │    │    │  Containers         │
         └─────────────────────┘    │    └─────────────────────┘
                                    │
    ┌───────────────────────────────┼───────────────────────────────┐
    │                               │                               │
┌───▼──────────────┐    ┌──────────▼────────┐    ┌────────────────▼────┐
│  nextjs-stage    │    │  nextjs-dev       │    │  default-router      │
│  (Constrix Base) │    │  (Constrix Base)  │    │  (Constrix Prod)     │
│                  │    │                   │    │                      │
│  core-stage      │    │  core-dev         │    │  constrix-nv.com     │
│  .constrix-nv.com│    │  .constrix-nv.com │    │  (catch-all)         │
│                  │    │                   │    │                      │
│  Port: 3000      │    │  Port: 3000       │    │  Port: 3000          │
└──────────────────┘    └───────────────────┘    └──────────────────────┘

┌──────────────────────┐  ┌────────────────────┐  ┌────────────────────────┐
│ company-profile-stage│  │ company-profile-dev│  │ company-profile-router │
│ (Company Profile)    │  │ (Company Profile)  │  │ (Company Profile Prod) │
│                      │  │                    │  │                        │
│ company-stage        │  │ company-dev        │  │ company.constrix-nv.com│
│ .constrix-nv.com     │  │ .constrix-nv.com   │  │                        │
│                      │  │                    │  │                        │
│ Port: 3000           │  │ Port: 3000         │  │ Port: 3000             │
└──────────────────────┘  └────────────────────┘  └────────────────────────┘

                    ┌──────────────────────────┐
                    │   traefik_network        │
                    │   (Docker Network)       │
                    │   All containers connect │
                    └──────────────────────────┘
```

---

## Request Flow Examples

### Example 1: User visits `https://company-stage.constrix-nv.com/about`

```
1. DNS Resolution
   company-stage.constrix-nv.com → 123.456.789.0 (Server IP)

2. HTTPS Request (Port 443)
   Client → Traefik (TLS termination)

3. Traefik Rule Matching
   Checks: HostRegexp(`^company-stage.constrix-nv.com$`)
   ✓ Match found: company-profile-stage router

4. Internal Routing
   Traefik → company-profile-stage container:3000

5. Next.js Processing
   Container processes request at /about

6. Response
   company-profile-stage:3000 → Traefik → Client (HTTPS)
```

### Example 2: User visits `https://core-stage.constrix-nv.com/dashboard`

```
1. DNS Resolution
   core-stage.constrix-nv.com → 123.456.789.0 (Same Server IP)

2. HTTPS Request (Port 443)
   Client → Traefik (TLS termination)

3. Traefik Rule Matching
   Checks: HostRegexp(`^core-stage.constrix-nv.com$`)
   ✓ Match found: nextjs-stage router

4. Internal Routing
   Traefik → nextjs-stage container:3000

5. Next.js Processing
   Container processes request at /dashboard

6. Response
   nextjs-stage:3000 → Traefik → Client (HTTPS)
```

**Key Point**: Same port (3000), different containers, routed by domain!

---

## Network Architecture

### Docker Networks

```
┌─────────────────────────────────────────────────────────┐
│              traefik_network (External)                 │
│                                                         │
│  ┌──────────┐  ┌────────────┐  ┌──────────────────┐   │
│  │ Traefik  │  │ nextjs-*   │  │ company-profile-*│   │
│  │ Container│  │ Containers │  │ Containers       │   │
│  └──────────┘  └────────────┘  └──────────────────┘   │
│                                                         │
│  All containers can communicate within this network    │
└─────────────────────────────────────────────────────────┘
```

### Container Isolation

```
┌───────────────────────────────────────────────────────┐
│  company-profile-stage Container                      │
│  ┌─────────────────────────────────────────────────┐  │
│  │  Isolated File System                           │  │
│  │  - /app (Next.js application)                   │  │
│  │  - /app/messages (i18n files)                   │  │
│  │  - /app/public (static assets)                  │  │
│  └─────────────────────────────────────────────────┘  │
│                                                        │
│  ┌─────────────────────────────────────────────────┐  │
│  │  Network Interfaces                             │  │
│  │  - eth0 (traefik_network)                       │  │
│  │  - lo (localhost)                               │  │
│  └─────────────────────────────────────────────────┘  │
│                                                        │
│  ┌─────────────────────────────────────────────────┐  │
│  │  Process Isolation                              │  │
│  │  - PID 1: node server.js                        │  │
│  │  - Listening on: 0.0.0.0:3000                   │  │
│  └─────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────┐
│  nextjs-stage Container (Completely Separate)         │
│  ┌─────────────────────────────────────────────────┐  │
│  │  Isolated File System                           │  │
│  │  - /app (Different Next.js app)                 │  │
│  │  - /app/public (Different assets)               │  │
│  └─────────────────────────────────────────────────┘  │
│                                                        │
│  ┌─────────────────────────────────────────────────┐  │
│  │  Network Interfaces                             │  │
│  │  - eth0 (traefik_network) - Different IP!      │  │
│  │  - lo (localhost)                               │  │
│  └─────────────────────────────────────────────────┘  │
│                                                        │
│  ┌─────────────────────────────────────────────────┐  │
│  │  Process Isolation                              │  │
│  │  - PID 1: node server.js                        │  │
│  │  - Listening on: 0.0.0.0:3000 (No Conflict!)   │  │
│  └─────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────┘
```

**Why No Port Conflicts?**
- Each container has its own network namespace
- Port 3000 is bound to 0.0.0.0 **inside** each container
- Traefik accesses them via Docker network IPs (e.g., 172.18.0.5, 172.18.0.6)
- External access goes through Traefik only

---

## Traefik Routing Logic

### Router Priority

```
Priority 10: company-profile (specific domain)
    ↓
Priority 1:  default-router (catch-all)
    ↓
Default:     404 Not Found
```

### Rule Matching Process

```
Incoming Request: https://company-stage.constrix-nv.com

Step 1: Extract hostname
  hostname = "company-stage.constrix-nv.com"

Step 2: Check routers (by priority, high to low)
  Router: company-profile-stage
  Rule: HostRegexp(`^company-stage.constrix-nv.com$`)
  ✓ MATCH! → Forward to company-profile-stage:3000

Step 3: TLS
  Use letsencrypt certificate for constrix-nv.com
  (includes *.constrix-nv.com subdomains)

Step 4: Forward request
  Traefik → company-profile-stage:3000
```

---

## Deployment Flow

### Build & Deploy Process

```
Developer/CI System
    │
    │ git push
    ▼
Git Repository
    │
    │ git pull / webhook
    ▼
Deployment Server
    │
    │ ./devops/deploy.sh
    ▼
┌───────────────────────────────────────────┐
│  Deploy Script Execution                  │
│  1. Generate CACHEBUST                    │
│  2. Create deployment directory           │
│  3. Generate .env file                    │
│  4. Build Docker image                    │
│     ┌──────────────────────────────────┐  │
│     │  Multi-stage Docker Build        │  │
│     │  Stage 1: Builder (node:22)      │  │
│     │    - yarn install                │  │
│     │    - yarn build (.next folder)   │  │
│     │  Stage 2: Runner (node:22-slim)  │  │
│     │    - Copy built files            │  │
│     │    - Optimize image size         │  │
│     └──────────────────────────────────┘  │
│  5. Start with docker-compose             │
│  6. Traefik auto-detects new container   │
└───────────────────────────────────────────┘
    │
    │ Container starts
    ▼
Running Container
    │
    │ Traefik labels applied
    ▼
Traffic Routing Active
```

### Zero-Downtime Update

```
┌─────────────────────────────────────────────────────┐
│  Update Process                                     │
│                                                     │
│  1. Old container running                          │
│     company-profile-stage (v1.0)                   │
│     Handling traffic ←──── Traefik                 │
│                                                     │
│  2. Build new image                                │
│     company-profile-stage (v1.1)                   │
│     (old container still running)                  │
│                                                     │
│  3. Start new container                            │
│     company-profile-stage (v1.1)                   │
│     Waiting for health check...                    │
│     (old container still handling traffic)         │
│                                                     │
│  4. Health check passes                            │
│     New container ready!                           │
│     Traefik switches to new container ←───┐        │
│                                            │        │
│  5. Stop old container                     │        │
│     company-profile-stage (v1.0) [stopped] │        │
│                                            │        │
│  6. Remove old container                   │        │
│     Only new container running ←───────────┘        │
│                                                     │
│  Result: Zero downtime! 🎉                          │
└─────────────────────────────────────────────────────┘
```

---

## SSL/TLS Architecture

```
┌────────────────────────────────────────────────────┐
│  Let's Encrypt Certificate Management              │
│                                                    │
│  Traefik Configuration:                            │
│  ┌──────────────────────────────────────────────┐ │
│  │  certificatesResolvers:                      │ │
│  │    letsencrypt:                              │ │
│  │      acme:                                   │ │
│  │        email: admin@constrix-nv.com          │ │
│  │        storage: acme.json                    │ │
│  │        httpChallenge:                        │ │
│  │          entryPoint: http                    │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│  Automatic Process:                                │
│  1. New domain detected (e.g., company-stage...)   │
│  2. Traefik requests cert from Let's Encrypt       │
│  3. HTTP-01 challenge completed                    │
│  4. Certificate issued and stored                  │
│  5. Auto-renewal every 60 days                     │
└────────────────────────────────────────────────────┘

Request Flow:
┌──────────┐  HTTPS  ┌──────────┐  HTTP  ┌──────────────┐
│  Client  │────────→│ Traefik  │───────→│  Container   │
│          │         │ (SSL end)│        │  (no SSL)    │
└──────────┘         └──────────┘        └──────────────┘
```

---

## Resource Allocation

### Memory Usage per Container

```
┌─────────────────────────────────────────────┐
│  company-profile-stage                      │
│  ┌────────────────────────────────────────┐ │
│  │  Base OS (Alpine):     ~10 MB          │ │
│  │  Node.js Runtime:      ~50 MB          │ │
│  │  Next.js App:          ~100 MB         │ │
│  │  Runtime Data:         ~50 MB          │ │
│  │  Buffer/Cache:         ~40 MB          │ │
│  │  ─────────────────────────────         │ │
│  │  Total:                ~250 MB         │ │
│  └────────────────────────────────────────┘ │
│                                             │
│  Under Load:              ~500 MB           │
│  Peak Usage:              ~800 MB           │
└─────────────────────────────────────────────┘
```

### Disk Usage per Deployment

```
Deployment Directory Structure:
/home/deployer/company-profile/
├── deployments/
│   ├── stage/
│   │   ├── .env                    (~1 KB)
│   │   ├── .next/                  (~50 MB)
│   │   ├── node_modules/           (~300 MB)
│   │   └── devops/
│   ├── dev/
│   │   └── (same structure)        (~350 MB)
│   └── master/
│       └── (same structure)        (~350 MB)
└── Docker Images
    └── company-profile:latest      (~200 MB)

Total Disk Usage: ~1.2 GB per project
```

---

## Scaling Strategy

### Horizontal Scaling (Multiple Instances)

```
              ┌─────────────────┐
              │    Traefik      │
              │  Load Balancer  │
              └────────┬────────┘
                       │
       ┌───────────────┼───────────────┐
       │               │               │
┌──────▼──────┐ ┌──────▼──────┐ ┌─────▼───────┐
│  Instance 1 │ │  Instance 2 │ │  Instance 3 │
│  :3000      │ │  :3000      │ │  :3000      │
└─────────────┘ └─────────────┘ └─────────────┘

Docker Compose Configuration:
services:
  company-profile:
    deploy:
      replicas: 3
    # Traefik automatically load balances!
```

### Vertical Scaling (Resource Limits)

```yaml
services:
  company-profile:
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
```

---

## Monitoring & Health Checks

### Container Health

```yaml
services:
  company-profile:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

### Traefik Health Dashboard

```
Access: https://traefik.constrix-nv.com/dashboard/

Shows:
- Active routers and rules
- Backend container status
- Request metrics
- SSL certificate status
```

---

## Summary

### Key Architectural Principles

1. **Container Isolation**: Each deployment runs in its own container
2. **Network Segmentation**: traefik_network connects all services
3. **Reverse Proxy Routing**: Traefik handles domain-based routing
4. **SSL Termination**: Traefik handles all SSL/TLS
5. **Zero-Downtime Deploys**: Container replacement strategy
6. **Resource Efficiency**: Shared Traefik, isolated apps

### Benefits

✅ **No Port Conflicts** - Multiple apps on same port  
✅ **Easy Scaling** - Add more containers as needed  
✅ **SSL Automation** - Let's Encrypt integration  
✅ **Clean Separation** - Projects don't interfere  
✅ **Simple Routing** - Domain-based traffic management  
✅ **Cost Effective** - Share infrastructure  

---

**This architecture allows unlimited Next.js apps to run on the same server! 🚀**

