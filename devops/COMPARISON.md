# Deployment Comparison: Constrix_Base vs Company Profile

## Side-by-Side Configuration

| Aspect | Constrix_Base | Company Profile |
|--------|---------------|-----------------|
| **Project Name** | nextjs-{ID} | company-profile-{ID} |
| **Dev Domain** | core-{ID}.constrix-nv.com | company-{ID}.constrix-nv.com |
| **Prod Domain** | Default catch-all (/) | company.constrix-nv.com |
| **Container Name (Dev)** | nextjs-stage | company-profile-stage |
| **Container Name (Prod)** | default-router | company-profile-router |
| **Deployment Path** | /home/deployer/nextjs/deployments | /home/deployer/company-profile/deployments |
| **Internal Port** | 3000 | 3000 |
| **Traefik Priority (Prod)** | 1 (lowest) | 10 (higher) |

---

## Key Changes Made

### 1. **Container Names** ✅
**Why**: Prevents container name conflicts

```yaml
# Before (Constrix_Base)
container_name: nextjs-${DEPLOYMENT_ID}

# After (Company Profile)
container_name: company-profile-${DEPLOYMENT_ID}
```

### 2. **Traefik Routing Rules** ✅
**Why**: Different domains to avoid routing conflicts

```yaml
# Before (Constrix_Base Dev)
- "traefik.http.routers.nextjs-${DEPLOYMENT_ID}.rule=HostRegexp(`(?i)^core-${DEPLOYMENT_ID}(-[a-z0-9-]+)?\\.constrix-nv\\.com$`)"

# After (Company Profile Dev)
- "traefik.http.routers.company-profile-${DEPLOYMENT_ID}.rule=HostRegexp(`(?i)^company-${DEPLOYMENT_ID}(-[a-z0-9-]+)?\\.constrix-nv\\.com$`)"
```

### 3. **Production Routing** ✅
**Why**: Specific domain instead of catch-all

```yaml
# Before (Constrix_Base Prod) - Catches ALL traffic
- "traefik.http.routers.default-router.rule=PathPrefix(`/`)"
- "traefik.http.routers.default-router.priority=1"

# After (Company Profile Prod) - Specific domain
- "traefik.http.routers.company-profile.rule=Host(`company.constrix-nv.com`)"
- "traefik.http.routers.company-profile.priority=10"
```

### 4. **Deployment Directory** ✅
**Why**: Separate repositories

```bash
# Before
DEPLOY_DIR=/home/deployer/nextjs/deployments/$DEPLOYMENT_ID

# After
DEPLOY_DIR=/home/deployer/company-profile/deployments/$DEPLOYMENT_ID
```

### 5. **Project Name for Docker Compose** ✅
**Why**: Prevents docker-compose stack conflicts

```bash
# Before
PROJECT_NAME=nextjs-$DEPLOYMENT_ID

# After
PROJECT_NAME=company-profile-$DEPLOYMENT_ID
```

---

## How They Coexist

### Network Architecture

```
┌──────────────────────────────────────────────────────────┐
│                   Internet (Port 443)                     │
└───────────────────────────┬──────────────────────────────┘
                            │
                ┌───────────▼──────────────┐
                │   Traefik Reverse Proxy  │
                │   (traefik_network)      │
                └───────────┬──────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
┌───────▼────────┐  ┌───────▼────────┐  ┌──────▼─────────┐
│ Constrix_Base  │  │ Company Profile│  │ Other Services │
│ Container      │  │ Container      │  │                │
│ Port: 3000     │  │ Port: 3000     │  │                │
└────────────────┘  └────────────────┘  └────────────────┘
```

**Key Point**: All containers use port 3000 internally, but they're isolated in separate containers. Traefik routes external traffic based on domain names.

---

## Traffic Routing Examples

### Request 1: `https://core-stage.constrix-nv.com`
```
1. DNS resolves to server IP
2. Traefik receives request on port 443
3. Matches rule: HostRegexp(`^core-stage.constrix-nv.com$`)
4. Routes to: nextjs-stage container (Constrix_Base)
5. Container port 3000 handles request
```

### Request 2: `https://company-stage.constrix-nv.com`
```
1. DNS resolves to server IP
2. Traefik receives request on port 443
3. Matches rule: HostRegexp(`^company-stage.constrix-nv.com$`)
4. Routes to: company-profile-stage container
5. Container port 3000 handles request
```

### Request 3: `https://company.constrix-nv.com`
```
1. DNS resolves to server IP
2. Traefik receives request on port 443
3. Matches rule: Host(`company.constrix-nv.com`)
4. Routes to: company-profile-router container
5. Container port 3000 handles request
```

---

## DNS Configuration Needed

### For Constrix_Base
```
# Existing (assuming already configured)
core-stage.constrix-nv.com    → A → Server IP
core-dev.constrix-nv.com      → A → Server IP
constrix-nv.com               → A → Server IP (catch-all)
```

### For Company Profile (NEW)
```
# Add these DNS records
company-stage.constrix-nv.com → A → Server IP
company-dev.constrix-nv.com   → A → Server IP
company.constrix-nv.com       → A → Server IP
```

---

## Environment Variables Comparison

### Constrix_Base `.env`
```bash
NEXT_PUBLIC_API_BASE_URL=https://core-be-stage.constrix-nv.com
NEXT_PUBLIC_API_PATH=api
NEXT_PUBLIC_API_VERSION=v1
NODE_ENV=stage
NEXT_PUBLIC_CACHE_BUST=1234567890-abcd1234
DEPLOYMENT_ID=stage
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyD5izq7FZI...
```

### Company Profile `.env`
```bash
NEXT_PUBLIC_API_BASE_URL=https://core-be-stage.constrix-nv.com
NEXT_PUBLIC_API_PATH=api
NEXT_PUBLIC_API_VERSION=v1
NODE_ENV=stage
NEXT_PUBLIC_CACHE_BUST=1234567890-xyz9876
DEPLOYMENT_ID=stage
NEXTAUTH_SECRET=8ea28feed665d06fd12c8a1a35b90577...
```

**Note**: Both can share the same backend API (`NEXT_PUBLIC_API_BASE_URL`)

---

## Deployment Commands Comparison

### Deploying Constrix_Base
```bash
cd /home/deployer/nextjs
export DEPLOYMENT_ID=stage
export BE_URL=https://core-be-stage.constrix-nv.com
./devops/deploy.sh
```

### Deploying Company Profile
```bash
cd /home/deployer/company-profile
export DEPLOYMENT_ID=stage
export BE_URL=https://core-be-stage.constrix-nv.com
./devops/deploy.sh
```

**Both can run simultaneously without conflicts!**

---

## Resource Usage

### Each Deployment Consumes:
- **Disk Space**: ~500MB (Docker image + dependencies)
- **Memory**: ~200-500MB (Next.js runtime)
- **CPU**: Minimal when idle, scales with traffic

### Total for Both Projects (3 deployments each)
```
Constrix_Base:
├─ Stage:  ~500MB disk, ~300MB RAM
├─ Dev:    ~500MB disk, ~300MB RAM
└─ Prod:   ~500MB disk, ~500MB RAM

Company Profile:
├─ Stage:  ~500MB disk, ~300MB RAM
├─ Dev:    ~500MB disk, ~300MB RAM
└─ Prod:   ~500MB disk, ~500MB RAM

Total: ~3GB disk, ~2GB RAM (approximate)
```

---

## Benefits of This Approach

✅ **Zero Port Conflicts**: Each container is isolated  
✅ **Independent Deployments**: Update one without affecting the other  
✅ **Shared Infrastructure**: Both use same Traefik instance  
✅ **Easy Scaling**: Add more projects by repeating the pattern  
✅ **Environment Parity**: Same setup for dev/stage/prod  
✅ **Zero Downtime**: Docker Compose recreates containers seamlessly  

---

## Migration Path

If you have an existing Constrix_Base deployment:

### Step 1: Verify Traefik is Running
```bash
docker ps | grep traefik
docker network ls | grep traefik_network
```

### Step 2: Deploy Company Profile
```bash
cd /home/deployer
git clone <repo> company-profile
cd company-profile
export DEPLOYMENT_ID=stage
export BE_URL=https://core-be-stage.constrix-nv.com
export ISLOCAL=false
./devops/deploy.sh
```

### Step 3: Update DNS
Add A records for `company-stage.constrix-nv.com` pointing to your server

### Step 4: Test
```bash
curl -I https://company-stage.constrix-nv.com
```

**Done!** Both projects now run side-by-side.

---

## Troubleshooting Conflicts

### Issue: Traefik not routing correctly
```bash
# Check Traefik labels
docker inspect company-profile-stage | grep traefik

# Verify routing rules
docker logs traefik-container-name
```

### Issue: Both projects responding to same domain
- Check the Traefik rules in docker-compose.yml
- Ensure router names are unique
- Verify priorities (higher number = higher priority)

### Issue: Container name already exists
```bash
# Stop and remove conflicting container
docker stop nextjs-stage
docker rm nextjs-stage

# Redeploy
./devops/deploy.sh
```

---

## Summary

| Feature | Impact | Status |
|---------|--------|--------|
| Separate Container Names | No conflicts | ✅ Working |
| Different Domains | Clear separation | ✅ Working |
| Shared Traefik Network | Resource efficient | ✅ Working |
| Independent Deployment | Can update separately | ✅ Working |
| Same Internal Port | No conflicts (isolated) | ✅ Working |

**Result**: Both projects run independently on the same server! 🎉

