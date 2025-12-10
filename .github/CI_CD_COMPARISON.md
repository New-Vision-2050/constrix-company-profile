# CI/CD Comparison: Constrix_Base vs Company Profile

Visual comparison of the CI/CD workflows between both projects.

---

## 🗺️ Deployment Architecture

### Both Projects Side-by-Side

```
                    ┌────────────────────────┐
                    │   GitHub Repository    │
                    │   (Push Trigger)       │
                    └───────────┬────────────┘
                                │
                ┌───────────────┴───────────────┐
                │                               │
        ┌───────▼────────┐             ┌───────▼────────┐
        │ Constrix_Base  │             │ Company Profile│
        │ CI/CD Workflow │             │ CI/CD Workflow │
        └───────┬────────┘             └───────┬────────┘
                │                               │
                │  SSH + SCP                    │  SSH + SCP
                │                               │
        ┌───────▼────────┐             ┌───────▼────────┐
        │ /home/deployer/│             │ /home/deployer/│
        │ nextjs/        │             │ company-profile│
        └───────┬────────┘             └───────┬────────┘
                │                               │
                │  docker-compose               │  docker-compose
                │                               │
        ┌───────▼────────┐             ┌───────▼────────┐
        │ nextjs-stage   │             │ company-profile│
        │ Container      │             │ -stage         │
        │ Port: 3000     │             │ Port: 3000     │
        └───────┬────────┘             └───────┬────────┘
                │                               │
                └───────────────┬───────────────┘
                                │
                    ┌───────────▼────────────┐
                    │   Traefik Routing      │
                    │   - core-stage...      │
                    │   - company-stage...   │
                    └────────────────────────┘
```

---

## 📊 Side-by-Side Configuration

### Workflow Triggers

| Event | Constrix_Base | Company Profile |
|-------|---------------|-----------------|
| **Dev Branch** | `dev` → ci_cd.yml | `dev` → ci_cd.yml |
| **Stage Branch** | `stage` → ci_cd.yml | `stage` → ci_cd.yml |
| **Testing Branch** | `testing` → ci_cd.yml | `testing` → ci_cd.yml |
| **Master Branch** | `master` → prod.yml | `master` → prod.yml |
| **Main Branch** | Not used | `main` → prod.yml |
| **Pull Requests** | Commented out | Commented out |

---

### Deployment Paths

```
Constrix_Base:
├── /home/deployer/nextjs/
│   └── deployments/
│       ├── dev/
│       ├── stage/
│       └── master/

Company Profile:
├── /home/deployer/company-profile/
│   └── deployments/
│       ├── dev/
│       ├── stage/
│       └── master/
```

---

### Container Naming

| Environment | Constrix_Base | Company Profile |
|-------------|---------------|-----------------|
| **Dev** | `nextjs-dev` | `company-profile-dev` |
| **Stage** | `nextjs-stage` | `company-profile-stage` |
| **Testing** | `nextjs-testing` | `company-profile-testing` |
| **Production** | `default-router` | `company-profile-router` |

---

### URL Patterns

| Environment | Constrix_Base | Company Profile |
|-------------|---------------|-----------------|
| **Dev** | `core-dev.constrix-nv.com` | `company-dev.constrix-nv.com` |
| **Stage** | `core-stage.constrix-nv.com` | `company-stage.constrix-nv.com` |
| **Testing** | `core-testing.constrix-nv.com` | `company-testing.constrix-nv.com` |
| **Production** | `constrix-nv.com` (catch-all) | `company.constrix-nv.com` |

---

### Backend URL Logic

**Constrix_Base (`ci_cd.yml`):**
```yaml
# For push events
BE_URL="https://core-be-${BRANCH_NAME}.constrix-nv.com"

# For production
BE_URL="https://core-be-production.constrix-nv.com"
```

**Company Profile (`ci_cd.yml`):**
```yaml
# Same logic - shared backend
BE_URL="https://core-be-${BRANCH_NAME}.constrix-nv.com"

# For production
BE_URL="https://core-be-production.constrix-nv.com"
```

**Note**: Both projects use the **same backend API**!

---

## 🔄 Workflow Steps Comparison

### Constrix_Base Workflow

```
1. Checkout Code
2. Set Deployment ID (branch name)
3. Extract BE_URL (core-be-{branch}...)
4. Clean Old Data (/home/deployer/nextjs/...)
5. Transfer Files (SCP to server)
6. Set Environment (NODE_ENV)
7. Deploy via SSH
   - cd /home/deployer/nextjs/deployments/{branch}
   - chmod +x ./devops/deploy.sh
   - ./devops/deploy.sh
8. Cleanup deployment directory
9. Post Comment (if PR)
```

### Company Profile Workflow

```
1. Checkout Code
2. Set Deployment ID (branch name)
3. Extract BE_URL (core-be-{branch}...)
4. Clean Old Data (/home/deployer/company-profile/...)
5. Transfer Files (SCP to server)
6. Set Environment (NODE_ENV)
7. Deploy via SSH
   - cd /home/deployer/company-profile/deployments/{branch}
   - chmod +x ./devops/deploy.sh
   - ./devops/deploy.sh
8. Cleanup deployment directory
9. Post Comment (if PR)
```

**Difference**: Only the deployment paths and container names differ!

---

## 📝 Key Configuration Changes

### 1. Deployment Directory

**Before (Constrix_Base):**
```yaml
script: |
  DEPLOY_DIR=/home/deployer/nextjs/deployments/${{env.DEPLOYMENT_ID}}
```

**After (Company Profile):**
```yaml
script: |
  DEPLOY_DIR=/home/deployer/company-profile/deployments/${{env.DEPLOYMENT_ID}}
```

### 2. Container Name Reference

**Before (Constrix_Base):**
```yaml
echo "Deployment of nextjs-${{env.DEPLOYMENT_ID}} completed successfully."
```

**After (Company Profile):**
```yaml
echo "Deployment of company-profile-${{env.DEPLOYMENT_ID}} completed successfully."
```

### 3. Preview URL in PR Comments

**Before (Constrix_Base):**
```yaml
body: |
  🔗 [FE Preview](https://core-${{ env.DEPLOYMENT_ID }}.constrix-nv.com)
```

**After (Company Profile):**
```yaml
body: |
  🔗 [Company Profile Preview](https://company-${{ env.DEPLOYMENT_ID }}.constrix-nv.com)
```

### 4. Cleanup Container Name

**Before (Constrix_Base):**
```bash
PROJECT_NAME=nextjs-$DEPLOYMENT_ID
docker rm -f $PROJECT_NAME
```

**After (Company Profile):**
```bash
PROJECT_NAME=company-profile-$DEPLOYMENT_ID
docker rm -f $PROJECT_NAME
```

---

## 🎯 Environment Variable Comparison

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

**Key Differences**:
- Company Profile includes `NEXTAUTH_SECRET`
- Constrix_Base includes `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- Both share the same backend URL

---

## 🚀 Deployment Timeline

### Simultaneous Deployments

```
Time: 10:00 AM
┌──────────────────────────────────────────────────────┐
│  Developer pushes to Constrix_Base dev branch        │
│  → Triggers ci_cd.yml                                │
│  → Deploys to core-dev.constrix-nv.com               │
└──────────────────────────────────────────────────────┘

Time: 10:05 AM
┌──────────────────────────────────────────────────────┐
│  Developer pushes to Company Profile dev branch      │
│  → Triggers ci_cd.yml                                │
│  → Deploys to company-dev.constrix-nv.com            │
└──────────────────────────────────────────────────────┘

Both running simultaneously! ✅
No conflicts! ✅
```

---

## 📦 Docker Compose Comparison

### Constrix_Base (dev/docker-compose.yml)

```yaml
services:
  nextjs:
    container_name: nextjs-${DEPLOYMENT_ID}
    labels:
      - "traefik.http.routers.nextjs-${DEPLOYMENT_ID}.rule=HostRegexp(`(?i)^core-${DEPLOYMENT_ID}(-[a-z0-9-]+)?\\.constrix-nv\\.com$`)"
      - "traefik.http.services.nextjs-${DEPLOYMENT_ID}.loadbalancer.server.port=3000"
```

### Company Profile (dev/docker-compose.yml)

```yaml
services:
  company-profile:
    container_name: company-profile-${DEPLOYMENT_ID}
    labels:
      - "traefik.http.routers.company-profile-${DEPLOYMENT_ID}.rule=HostRegexp(`(?i)^company-${DEPLOYMENT_ID}(-[a-z0-9-]+)?\\.constrix-nv\\.com$`)"
      - "traefik.http.services.company-profile-${DEPLOYMENT_ID}.loadbalancer.server.port=3000"
```

**Key Changes**:
- Service name: `nextjs` → `company-profile`
- Container name: `nextjs-*` → `company-profile-*`
- Router name: `nextjs-*` → `company-profile-*`
- Domain pattern: `core-*` → `company-*`

---

## 🔍 Traefik Routing Rules

### How Traefik Distinguishes Them

```
Request: https://core-stage.constrix-nv.com
├─ Traefik checks all router rules
├─ Matches: HostRegexp(`^core-stage.constrix-nv.com$`)
├─ Router: nextjs-stage
└─ Forwards to: nextjs-stage container:3000

Request: https://company-stage.constrix-nv.com
├─ Traefik checks all router rules
├─ Matches: HostRegexp(`^company-stage.constrix-nv.com$`)
├─ Router: company-profile-stage
└─ Forwards to: company-profile-stage container:3000
```

**No conflicts because**:
- Different hostnames
- Different router names
- Different container names
- Same port (3000) but isolated in separate containers

---

## 💾 Resource Usage Comparison

### Server Resources

```
Constrix_Base Deployments:
├── Dev:     ~300 MB RAM, ~500 MB Disk
├── Stage:   ~300 MB RAM, ~500 MB Disk
└── Master:  ~500 MB RAM, ~500 MB Disk
    Total:   ~1.1 GB RAM, ~1.5 GB Disk

Company Profile Deployments:
├── Dev:     ~300 MB RAM, ~500 MB Disk
├── Stage:   ~300 MB RAM, ~500 MB Disk
└── Master:  ~500 MB RAM, ~500 MB Disk
    Total:   ~1.1 GB RAM, ~1.5 GB Disk

Combined Total: ~2.2 GB RAM, ~3 GB Disk
```

---

## 🎨 PR Comment Comparison

### Constrix_Base PR Comment

```markdown
🚀 **Deployment Successful**

Your backend has been deployed to the following URL:
🔗 [FE Preview](https://core-pr42.constrix-nv.com)
🔗 [Backend URL](https://core-be-stage.constrix-nv.com)
```

### Company Profile PR Comment

```markdown
🚀 **Company Profile Deployment Successful**

Your application has been deployed to:
🔗 [Company Profile Preview](https://company-pr42.constrix-nv.com)
🔗 [Backend URL](https://core-be-stage.constrix-nv.com)

📦 Deployment ID: `pr42`
🌍 Environment: `pr`
```

---

## 🔐 GitHub Secrets (Shared)

Both projects can use the **same GitHub secrets**:

```
DEPLOY_HOST     - Server IP/hostname
DEPLOY_USER     - SSH username (deployer)
DEPLOY_PORT     - SSH port (22)
DEPLOY_SSH_KEY  - Private SSH key
```

**Note**: If repos are separate, you'll need to add secrets to each repo.

---

## ⚡ Performance Comparison

| Metric | Constrix_Base | Company Profile | Notes |
|--------|---------------|-----------------|-------|
| **Build Time** | ~3-5 min | ~3-5 min | Depends on dependencies |
| **Transfer Time** | ~30-60 sec | ~30-60 sec | Depends on code size |
| **Docker Build** | ~2-4 min | ~2-4 min | Next.js build included |
| **Container Start** | ~10-20 sec | ~10-20 sec | Next.js startup time |
| **Total Deploy** | ~6-10 min | ~6-10 min | End-to-end |

---

## 🛠️ Maintenance Comparison

### Update Workflows

**Constrix_Base:**
```bash
cd Constrix_Base
vim .github/workflows/ci_cd.yml
git commit -m "Update workflow"
git push
```

**Company Profile:**
```bash
cd company-profile
vim .github/workflows/ci_cd.yml
git commit -m "Update workflow"
git push
```

**Independent updates** - changing one doesn't affect the other!

---

## 📈 Scaling Strategy

### Adding More Environments

**Constrix_Base:**
```yaml
# Add to ci_cd.yml
on:
  push:
    branches:
      - dev
      - stage
      - testing
      - qa        # New environment
```

**Company Profile:**
```yaml
# Add to ci_cd.yml
on:
  push:
    branches:
      - dev
      - stage
      - testing
      - qa        # New environment
```

Automatically deploys to:
- `core-qa.constrix-nv.com`
- `company-qa.constrix-nv.com`

---

## 🎯 Summary

### What's the Same?

✅ **GitHub Actions setup** - Same structure  
✅ **Deployment process** - Same steps  
✅ **Backend API** - Shared backend  
✅ **Traefik network** - Same network  
✅ **GitHub secrets** - Can be shared  
✅ **Docker strategy** - Same approach  

### What's Different?

🔄 **Deployment paths** - Different directories  
🔄 **Container names** - Unique per project  
🔄 **Domain names** - Different subdomains  
🔄 **Router names** - Unique in Traefik  
🔄 **Service names** - Different in docker-compose  

---

## 🚦 Deployment Matrix

|  | Constrix_Base | Company Profile | Conflict? |
|---|---|---|---|
| **Dev URL** | core-dev.constrix-nv.com | company-dev.constrix-nv.com | ❌ No |
| **Stage URL** | core-stage.constrix-nv.com | company-stage.constrix-nv.com | ❌ No |
| **Prod URL** | constrix-nv.com | company.constrix-nv.com | ❌ No |
| **Container** | nextjs-stage | company-profile-stage | ❌ No |
| **Port** | 3000 | 3000 | ❌ No (isolated) |
| **Backend** | core-be-stage... | core-be-stage... | ✅ Shared |
| **Network** | traefik_network | traefik_network | ✅ Shared |

**Result**: Complete isolation with shared infrastructure! 🎉

---

## 💡 Best Practices

1. **Keep workflows in sync** - Update both when making structural changes
2. **Use same naming conventions** - Makes management easier
3. **Share backend when possible** - Reduces infrastructure costs
4. **Monitor both projects** - Set up unified monitoring
5. **Document differences** - Keep this comparison updated

---

**Both CI/CD pipelines work perfectly side-by-side! 🚀**

