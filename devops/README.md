# Company Profile - DevOps Deployment Guide

This deployment setup allows the company-profile project to run alongside other Next.js projects (like Constrix_Base) using **Traefik** as a reverse proxy.

## 🎯 Key Differences from Constrix_Base

### Container Naming
- **Constrix_Base**: `nextjs-${DEPLOYMENT_ID}` → `default-router`
- **Company Profile**: `company-profile-${DEPLOYMENT_ID}` → `company-profile-router`

### Routing Strategy
- **Dev Environment**: `company-${DEPLOYMENT_ID}.constrix-nv.com` (vs `core-${DEPLOYMENT_ID}.constrix-nv.com`)
- **Prod Environment**: `company.constrix-nv.com` OR path-based `/company` route

### Deployment Directory
- `/home/deployer/company-profile/deployments/${DEPLOYMENT_ID}`

---

## 📁 File Structure

```
devops/
├── Dockerfile              # Multi-stage Docker build
├── deploy.sh              # Main deployment script
├── set-env.sh            # Environment variable defaults
├── dev/
│   └── docker-compose.yml # Dev/Stage environment
└── prod/
    └── docker-compose.yml # Production environment
```

---

## 🚀 How It Works

### 1. **Port Management**
- **Internal**: All containers use port `3000` internally
- **External**: Traefik handles routing based on:
  - **Hostname** (dev): `company-stage.constrix-nv.com`
  - **Hostname** (prod): `company.constrix-nv.com`
  - No port conflicts because Traefik routes by domain/path

### 2. **Deployment Flow**

```bash
# 1. Set environment variables
source devops/set-env.sh

# 2. Deploy
./devops/deploy.sh
```

**What happens:**
1. Generates unique `CACHEBUST` value
2. Creates deployment directory
3. Generates `.env` file with all configs
4. Builds Docker image (Next.js build included)
5. Starts container with docker-compose
6. Traefik automatically routes traffic

### 3. **Environment Variables**

Required variables:
- `DEPLOYMENT_ID`: Deployment identifier (e.g., "stage", "dev", "master")
- `BE_URL`: Backend API URL
- `NODE_ENV`: Node environment
- `ISLOCAL`: Set to `true` for local development

---

## 🔧 Deployment Options

### Option 1: Run on Different Subdomain (Recommended)

**Dev**: `company-stage.constrix-nv.com`, `company-dev.constrix-nv.com`
**Prod**: `company.constrix-nv.com`

This is **already configured** in the docker-compose files!

```bash
# Dev deployment
export DEPLOYMENT_ID=stage
export BE_URL=https://core-be-stage.constrix-nv.com
export NODE_ENV=development
export ISLOCAL=false
./devops/deploy.sh
```

Access at: `https://company-stage.constrix-nv.com`

---

### Option 2: Run on Path Prefix

Edit `devops/prod/docker-compose.yml`:

```yaml
labels:
  - "traefik.http.routers.company-profile.rule=PathPrefix(`/company`)"
  # Add middleware to strip prefix
  - "traefik.http.middlewares.company-strip.stripprefix.prefixes=/company"
  - "traefik.http.routers.company-profile.middlewares=company-strip"
```

Then update `next.config.ts`:

```typescript
const nextConfig = {
  basePath: process.env.NODE_ENV === 'production' ? '/company' : '',
  // ... rest of config
}
```

Access at: `https://constrix-nv.com/company`

---

## 📝 Step-by-Step Deployment

### Prerequisites
1. Traefik must be running on the server
2. Network `traefik_network` must exist
3. DNS configured for your domain

### Deploy to Stage

```bash
# SSH to server
ssh deployer@your-server.com

# Clone the repository
cd /home/deployer
git clone <your-repo-url> company-profile
cd company-profile

# Set environment
export DEPLOYMENT_ID=stage
export BE_URL=https://core-be-stage.constrix-nv.com
export NODE_ENV=development
export ISLOCAL=false

# Deploy
chmod +x devops/deploy.sh
./devops/deploy.sh
```

### Deploy to Production

```bash
export DEPLOYMENT_ID=master
export BE_URL=https://core-be.constrix-nv.com
export NODE_ENV=production
export ISLOCAL=false

./devops/deploy.sh
```

---

## 🔍 Verification

```bash
# Check running containers
docker ps | grep company-profile

# Check logs
docker logs company-profile-stage

# Check Traefik routing
curl -I https://company-stage.constrix-nv.com
```

---

## 🛠️ Local Development with Docker

```bash
# Set local environment
export ISLOCAL=true
export DEPLOYMENT_ID=local
export BE_URL=https://core-be-stage.constrix-nv.com

# Deploy locally
./devops/deploy.sh
```

Access at: `http://localhost:3000` (or through Traefik if configured)

---

## 🔄 Updating Deployment

```bash
# SSH to server
cd /home/deployer/company-profile

# Pull latest changes
git pull origin main

# Redeploy (generates new cache bust automatically)
./devops/deploy.sh
```

---

## 🐛 Troubleshooting

### Container won't start
```bash
# Check logs
docker logs company-profile-stage

# Check if port 3000 is already in use (shouldn't matter with Traefik)
docker ps | grep 3000
```

### DNS not resolving
- Ensure DNS A record points to server IP
- Check Traefik dashboard for routing rules
- Verify certificate resolver is working

### Build fails
```bash
# Clean everything and rebuild
cd /home/deployer/company-profile/deployments/stage
rm -rf .next node_modules
./devops/deploy.sh
```

---

## 📊 Architecture Diagram

```
                                    ┌─────────────────┐
                                    │   Internet      │
                                    └────────┬────────┘
                                             │
                              ┌──────────────┴──────────────┐
                              │      Traefik (Port 443)     │
                              │    Reverse Proxy + SSL      │
                              └──────────────┬──────────────┘
                                             │
                 ┌───────────────────────────┼───────────────────────────┐
                 │                           │                           │
    ┌────────────▼────────────┐ ┌───────────▼────────────┐ ┌───────────▼────────────┐
    │  core-stage.constrix    │ │ company-stage.constrix │ │   company.constrix     │
    │  (Constrix_Base:3000)   │ │ (Company Profile:3000) │ │ (Company Profile:3000) │
    └─────────────────────────┘ └────────────────────────┘ └────────────────────────┘
```

**Key Points:**
- Multiple containers can use port 3000 internally
- Traefik routes based on hostname/path
- Each container is isolated
- No port conflicts!

---

## 🔐 Security Notes

1. **Secrets**: Store `NEXTAUTH_SECRET` securely (use environment variables on server)
2. **Environment Files**: The deploy script creates `.env` with `chmod 600`
3. **SSL**: Traefik handles Let's Encrypt certificates automatically

---

## 💡 Next.js Configuration Required

Update `next.config.ts` to enable standalone output:

```typescript
const nextConfig = {
  output: 'standalone',
  // ... rest of your config
}
```

This is **required** for the Docker build to work!

---

## 📚 Additional Resources

- [Traefik Documentation](https://doc.traefik.io/traefik/)
- [Next.js Docker Deployment](https://nextjs.org/docs/deployment#docker-image)
- [Docker Compose Networking](https://docs.docker.com/compose/networking/)

