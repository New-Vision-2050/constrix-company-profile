# ✅ CI/CD Setup Complete!

Your company-profile project now has automated deployment workflows configured.

## 🎯 What Was Created

### GitHub Actions Workflows
```
.github/workflows/
├── ci_cd.yml          # Dev/Stage/Testing deployments
├── prod.yml           # Production deployments
└── README.md          # Complete CI/CD documentation
```

---

## 🔑 Key Differences from Constrix_Base

| Aspect | Constrix_Base | Company Profile |
|--------|---------------|-----------------|
| **Deploy Path** | `/home/deployer/nextjs/` | `/home/deployer/company-profile/` |
| **Container Name** | `nextjs-{branch}` | `company-profile-{branch}` |
| **Preview URL** | `core-{branch}.constrix-nv.com` | `company-{branch}.constrix-nv.com` |
| **Prod URL** | `constrix-nv.com` (catch-all) | `company.constrix-nv.com` |
| **Project Name** | `nextjs-{branch}` | `company-profile-{branch}` |

---

## 🚀 Quick Start - 3 Steps to Deploy

### Step 1: Add GitHub Secrets

Go to: **GitHub Repository → Settings → Secrets and variables → Actions**

Add these secrets:

```
DEPLOY_HOST        = your-server-ip-or-hostname
DEPLOY_USER        = deployer
DEPLOY_PORT        = 22
DEPLOY_SSH_KEY     = (your private SSH key)
```

### Step 2: Push to Trigger Deployment

```bash
# Development deployment
git checkout dev
git add .
git commit -m "Initial deployment"
git push origin dev

# Staging deployment
git checkout stage
git merge dev
git push origin stage

# Production deployment
git checkout master
git merge stage
git push origin master
```

### Step 3: Access Your Deployment

```
Dev:        https://company-dev.constrix-nv.com
Stage:      https://company-stage.constrix-nv.com
Production: https://company.constrix-nv.com
```

---

## 📋 Prerequisites Checklist

Before your first deployment, ensure:

- [ ] **GitHub Secrets** are configured (see Step 1 above)
- [ ] **Server access** via SSH works
- [ ] **Docker** is installed on server
- [ ] **Traefik** is running on server
- [ ] **traefik_network** Docker network exists
- [ ] **DNS records** are configured:
  - `company-dev.constrix-nv.com`
  - `company-stage.constrix-nv.com`
  - `company-testing.constrix-nv.com`
  - `company.constrix-nv.com`
- [ ] **Deployment directory** exists: `/home/deployer/company-profile/`
- [ ] **Deployer user** has Docker permissions

---

## 🔧 Server Setup (If Not Already Done)

### 1. Create Deployment Directory

```bash
ssh deployer@your-server.com

# Create directory structure
mkdir -p /home/deployer/company-profile/deployments
cd /home/deployer/company-profile
```

### 2. Verify Docker Access

```bash
# Test Docker access
docker ps

# If permission denied, add user to docker group
sudo usermod -aG docker deployer
newgrp docker
```

### 3. Verify Traefik Network

```bash
# Check if network exists
docker network ls | grep traefik_network

# If not exists, create it
docker network create traefik_network
```

### 4. Verify Traefik is Running

```bash
# Check Traefik container
docker ps | grep traefik

# If not running, start Traefik
# (Use your existing Traefik setup)
```

---

## 🌊 Workflow Behavior

### Branch-Based Deployments

```
┌──────────────────────────────────────────────────────┐
│  Push to Branch  │  Workflow   │  Deployment URL     │
├──────────────────┼─────────────┼─────────────────────┤
│  dev             │  ci_cd.yml  │  company-dev...     │
│  stage           │  ci_cd.yml  │  company-stage...   │
│  testing         │  ci_cd.yml  │  company-testing... │
│  master          │  prod.yml   │  company.constrix...│
│  main            │  prod.yml   │  company.constrix...│
└──────────────────────────────────────────────────────┘
```

### Deployment Process

```
1. Developer pushes code
   ↓
2. GitHub Actions triggered
   ↓
3. Code transferred to server
   ↓
4. deploy.sh script executed
   ↓
5. Docker image built
   ↓
6. Container started with docker-compose
   ↓
7. Traefik routes traffic automatically
   ↓
8. Application live! 🎉
```

---

## 📊 Workflow Steps Breakdown

### ci_cd.yml (Dev/Stage/Testing)

1. **Checkout Code** - Get latest code from repository
2. **Set Deployment ID** - Use branch name as ID
3. **Extract BE_URL** - Determine backend URL based on branch
4. **Clean Old Data** - Remove previous deployment files
5. **Transfer Files** - SCP code to server
6. **Set Environment** - Set NODE_ENV based on branch
7. **Deploy via SSH** - Run deploy.sh on server
8. **Post Comment** - Add deployment URL to PR (if PR)

### prod.yml (Production)

Same as ci_cd.yml but:
- Only runs on `master`/`main` branch
- Uses production backend URL
- No PR comments
- Additional success notification

---

## 🔍 How to Monitor Deployments

### 1. GitHub Actions Dashboard

```
1. Go to your GitHub repository
2. Click "Actions" tab
3. See all workflow runs
4. Click a run to see detailed logs
```

### 2. Real-Time Server Logs

```bash
# SSH to server
ssh deployer@your-server.com

# Watch deployment logs
docker logs -f company-profile-dev

# Check container status
docker ps | grep company-profile

# View recent logs
docker logs --tail 100 company-profile-dev
```

### 3. Check Deployment Status

```bash
# Test if site is live
curl -I https://company-dev.constrix-nv.com

# Should return: HTTP/2 200
```

---

## 🛠️ Troubleshooting

### Workflow Not Running

**Problem**: Pushed to branch but workflow didn't trigger

**Solutions**:
```bash
# Check branch name matches workflow config
git branch

# Verify workflows are enabled
# Go to: GitHub → Actions → Enable workflows

# Check workflow syntax
# Go to: GitHub → Actions → View workflow file
```

### SSH Connection Failed

**Problem**: "Permission denied" or "Connection refused"

**Solutions**:
```bash
# Test SSH manually
ssh -i ~/.ssh/your_key deployer@your-server.com

# Verify SSH key in GitHub secrets
# Should include BEGIN and END lines

# Check server firewall
sudo ufw status
sudo ufw allow 22/tcp
```

### Deployment Failed on Server

**Problem**: Files transferred but deployment failed

**Solutions**:
```bash
# SSH to server and check logs
ssh deployer@your-server.com
cd /home/deployer/company-profile/deployments/dev

# Check if devops/deploy.sh exists
ls -la devops/

# Try running deploy manually
export DEPLOYMENT_ID=dev
export BE_URL=https://core-be-dev.constrix-nv.com
./devops/deploy.sh

# Check Docker logs
docker logs company-profile-dev
```

### Container Not Starting

**Problem**: Container starts then immediately stops

**Solutions**:
```bash
# Check container logs
docker logs company-profile-dev

# Common issues:
# - Build failed (check Next.js build)
# - Port already in use (shouldn't happen with Traefik)
# - Missing environment variables

# Rebuild container
cd /home/deployer/company-profile/deployments/dev
docker compose -p company-profile-dev down
docker compose -p company-profile-dev up -d --build
```

### Site Not Accessible

**Problem**: Container running but site not loading

**Solutions**:
```bash
# Check DNS resolution
nslookup company-dev.constrix-nv.com

# Check Traefik routing
docker logs traefik-container | grep company-profile

# Verify container labels
docker inspect company-profile-dev | grep traefik

# Test internally
docker exec company-profile-dev curl http://localhost:3000
```

---

## 🎨 Customization Examples

### 1. Add Staging Environment Variable

Edit workflow:

```yaml
- name: Deploy to Server via SSH
  env:
    BE_URL: ${{ env.BE_URL }}
    NODE_ENV: ${{ env.NODE_ENV }}
    CUSTOM_VAR: ${{ secrets.CUSTOM_VAR }}  # Add this
```

### 2. Add Deployment Notification

Add to workflow after deployment:

```yaml
- name: Notify Deployment
  if: success()
  run: |
    curl -X POST ${{ secrets.WEBHOOK_URL }} \
      -H 'Content-Type: application/json' \
      -d '{"text":"Deployed to company-${{ env.DEPLOYMENT_ID }}"}'
```

### 3. Add Build Caching

Add before "Transfer Repo Files":

```yaml
- name: Cache Dependencies
  uses: actions/cache@v3
  with:
    path: node_modules
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
```

### 4. Add Tests Before Deploy

Add before "Deploy to Server":

```yaml
- name: Run Tests
  run: |
    npm install
    npm test
```

---

## 📈 Multiple Environments Side-by-Side

Both projects can run simultaneously:

```
┌────────────────────────────────────────────────────┐
│              Traefik (Port 443)                    │
└────────────────┬───────────────────────────────────┘
                 │
     ┌───────────┼───────────┐
     │           │           │
┌────▼────┐ ┌───▼────┐ ┌────▼─────┐
│ Constrix│ │ Company│ │ Company  │
│  Base   │ │ Profile│ │ Profile  │
│  Dev    │ │  Dev   │ │  Stage   │
│         │ │        │ │          │
│ core-   │ │company-│ │company-  │
│ dev...  │ │dev...  │ │stage...  │
└─────────┘ └────────┘ └──────────┘

All using port 3000 internally!
No conflicts! ✅
```

---

## 🔄 Typical Deployment Workflow

### Development Cycle

```bash
# 1. Create feature branch
git checkout dev
git checkout -b feature/new-homepage

# 2. Make changes
# ... edit files ...

# 3. Commit changes
git add .
git commit -m "Add new homepage design"

# 4. Push to dev for testing
git checkout dev
git merge feature/new-homepage
git push origin dev
# → Auto-deploys to company-dev.constrix-nv.com

# 5. Test on dev, then promote to stage
git checkout stage
git merge dev
git push origin stage
# → Auto-deploys to company-stage.constrix-nv.com

# 6. Test on stage, then promote to production
git checkout master
git merge stage
git push origin master
# → Auto-deploys to company.constrix-nv.com
```

---

## 🎓 What You Get

✅ **Automated deployments** on every push  
✅ **Multiple environments** (dev/stage/prod)  
✅ **Zero-downtime updates** via Docker  
✅ **Automatic SSL** via Traefik & Let's Encrypt  
✅ **PR preview comments** with deployment URLs  
✅ **Deployment history** in GitHub Actions  
✅ **Rollback capability** via git revert + push  
✅ **Side-by-side with Constrix_Base** no conflicts  

---

## 📚 Documentation Files

- **`.github/workflows/README.md`** - Complete CI/CD guide
- **`devops/README.md`** - DevOps deployment guide
- **`devops/QUICK_START.md`** - Quick deployment guide
- **`devops/COMPARISON.md`** - Comparison with Constrix_Base
- **`devops/ARCHITECTURE.md`** - Architecture deep dive
- **`DEPLOYMENT_SETUP.md`** - Overall deployment summary

---

## 🚦 Next Steps

1. **Add GitHub Secrets** (see Step 1 above)
2. **Verify Server Setup** (see prerequisites)
3. **Configure DNS Records** for your domains
4. **Push to dev branch** to trigger first deployment
5. **Monitor in GitHub Actions** to verify success
6. **Visit your site** at the deployment URL

---

## 💡 Pro Tips

1. **Use branch protection** on master branch
2. **Require PR reviews** before merging to production
3. **Tag releases** for production deployments
4. **Monitor logs** regularly for issues
5. **Set up health checks** for automatic failover
6. **Use GitHub Environments** for approval workflows
7. **Add Slack notifications** for deployment alerts

---

**Your CI/CD pipeline is ready! Push to deploy! 🚀**

