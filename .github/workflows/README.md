# CI/CD Workflows - Company Profile

This directory contains GitHub Actions workflows for automated deployment of the company-profile application.

## 📁 Workflow Files

### 1. `ci_cd.yml` - Development & Staging Deployments
- **Triggers**: Push to `dev`, `stage`, `testing` branches
- **Purpose**: Automated deployments for development and staging environments
- **URL Pattern**: `https://company-{branch}.constrix-nv.com`

### 2. `prod.yml` - Production Deployments
- **Triggers**: Push to `master` or `main` branch
- **Purpose**: Production deployments
- **URL**: `https://company.constrix-nv.com`

---

## 🚀 How It Works

### Deployment Flow

```
┌─────────────────────────────────────────────────────────┐
│  1. Developer pushes to GitHub                          │
│     git push origin dev/stage/master                    │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│  2. GitHub Actions Triggered                            │
│     - Checkout code                                     │
│     - Set deployment ID (branch name)                   │
│     - Determine backend URL                             │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│  3. Transfer to Server                                  │
│     - Clean old deployment directory                    │
│     - SCP files to server                               │
│     - Path: /home/deployer/company-profile/             │
│             deployments/{branch}/                       │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│  4. Server Deployment                                   │
│     - Run devops/deploy.sh                              │
│     - Build Docker image                                │
│     - Start container with docker-compose               │
│     - Traefik routes traffic automatically              │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│  5. Application Live!                                   │
│     Dev:   https://company-dev.constrix-nv.com         │
│     Stage: https://company-stage.constrix-nv.com       │
│     Prod:  https://company.constrix-nv.com             │
└─────────────────────────────────────────────────────────┘
```

---

## ⚙️ Setup Instructions

### Step 1: GitHub Repository Secrets

Add these secrets to your GitHub repository:
**Settings → Secrets and variables → Actions → New repository secret**

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `DEPLOY_HOST` | Server IP or hostname | `123.456.789.0` |
| `DEPLOY_USER` | SSH username | `deployer` |
| `DEPLOY_PORT` | SSH port | `22` |
| `DEPLOY_SSH_KEY` | Private SSH key | `-----BEGIN RSA...` |

### Step 2: Generate SSH Key (if needed)

```bash
# On your local machine
ssh-keygen -t rsa -b 4096 -C "github-actions-company-profile"

# Copy public key to server
ssh-copy-id -i ~/.ssh/id_rsa.pub deployer@your-server.com

# Copy private key content for GitHub secret
cat ~/.ssh/id_rsa
# Copy the entire output including BEGIN and END lines
```

### Step 3: Server Preparation

```bash
# SSH to your server
ssh deployer@your-server.com

# Create deployment directory
mkdir -p /home/deployer/company-profile/deployments

# Verify Docker and Traefik are running
docker ps | grep traefik
docker network ls | grep traefik_network

# Verify deployer user has Docker permissions
docker ps
```

### Step 4: DNS Configuration

Add these DNS A records pointing to your server IP:

```
company-dev.constrix-nv.com      → 123.456.789.0
company-stage.constrix-nv.com    → 123.456.789.0
company-testing.constrix-nv.com  → 123.456.789.0
company.constrix-nv.com          → 123.456.789.0
```

### Step 5: Test Deployment

```bash
# Push to dev branch
git checkout dev
git add .
git commit -m "Test CI/CD deployment"
git push origin dev

# Watch GitHub Actions
# Go to: GitHub → Actions tab → See running workflow

# After successful deployment, visit:
# https://company-dev.constrix-nv.com
```

---

## 🌿 Branch Strategy

### Development Branches

```
┌─────────────────────────────────────────────────────────┐
│  Branch    │  Deployment ID  │  URL                     │
├────────────┼─────────────────┼──────────────────────────┤
│  dev       │  dev            │  company-dev.constrix... │
│  stage     │  stage          │  company-stage.constrix..│
│  testing   │  testing        │  company-testing.constrix│
│  master    │  master         │  company.constrix-nv.com │
│  main      │  main           │  company.constrix-nv.com │
└─────────────────────────────────────────────────────────┘
```

### Workflow Selection

- **`ci_cd.yml`**: Runs for `dev`, `stage`, `testing`
- **`prod.yml`**: Runs for `master`, `main`

---

## 🔄 Deployment Lifecycle

### Automatic Deployment

```bash
# Make changes
git checkout dev
echo "Update homepage" > src/app/page.tsx

# Commit and push
git add .
git commit -m "Update homepage"
git push origin dev

# GitHub Actions automatically:
# 1. Detects push to dev branch
# 2. Runs ci_cd.yml workflow
# 3. Transfers code to server
# 4. Deploys to company-dev.constrix-nv.com
# 5. Comments on PR if applicable
```

### Manual Deployment (SSH)

```bash
# If you need to deploy manually
ssh deployer@your-server.com
cd /home/deployer/company-profile

# Set environment
export DEPLOYMENT_ID=stage
export BE_URL=https://core-be-stage.constrix-nv.com
export NODE_ENV=development
export ISLOCAL=false

# Deploy
./devops/deploy.sh
```

---

## 📊 Workflow Comparison

| Feature | ci_cd.yml (Dev/Stage) | prod.yml (Production) |
|---------|----------------------|----------------------|
| **Branches** | dev, stage, testing | master, main |
| **Backend URL** | `core-be-{branch}.constrix-nv.com` | `core-be-production.constrix-nv.com` |
| **Container Name** | `company-profile-{branch}` | `company-profile-router` |
| **Frontend URL** | `company-{branch}.constrix-nv.com` | `company.constrix-nv.com` |
| **PR Comments** | ✅ Yes | ❌ No |
| **Environment** | development/staging | production |

---

## 🛠️ Customization

### Change Backend URL Pattern

Edit the "Extract BE_URL" step in workflows:

```yaml
# For different backend URL pattern
BE_URL="https://api-${BRANCH_NAME}.yourcompany.com"
```

### Add Slack Notifications

Add to the end of deploy job:

```yaml
- name: Slack Notification
  if: always()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
    text: 'Deployment ${{ job.status }}: company-${{ env.DEPLOYMENT_ID }}'
```

### Add Health Check

Add after deployment:

```yaml
- name: Health Check
  run: |
    sleep 30
    curl -f https://company-${{ env.DEPLOYMENT_ID }}.constrix-nv.com || exit 1
```

### Enable Pull Request Deployments

Uncomment in `ci_cd.yml`:

```yaml
on:
  pull_request:
    types: [opened, synchronize, reopened, closed, edited]
```

This creates temporary deployments for each PR at:
`https://company-pr{number}.constrix-nv.com`

---

## 🐛 Troubleshooting

### Workflow Not Triggering

```yaml
# Check branch names match exactly
on:
  push:
    branches:
      - dev    # Must match exactly (not development)
      - stage  # Must match exactly (not staging)
```

### SSH Connection Failed

```bash
# Test SSH connection manually
ssh -i path/to/key deployer@your-server.com

# Check server firewall
sudo ufw status
sudo ufw allow 22/tcp

# Verify SSH key is correct
cat ~/.ssh/id_rsa
# Should match DEPLOY_SSH_KEY secret
```

### Deployment Failed

```bash
# SSH to server
ssh deployer@your-server.com

# Check if directory exists
ls -la /home/deployer/company-profile/deployments/

# Check Docker logs
docker logs company-profile-dev

# Check container status
docker ps -a | grep company-profile
```

### Traefik Not Routing

```bash
# Check container labels
docker inspect company-profile-dev | grep traefik

# Check Traefik logs
docker logs traefik-container

# Verify DNS resolves
nslookup company-dev.constrix-nv.com
```

---

## 📈 Monitoring

### View Workflow Status

1. Go to GitHub repository
2. Click **Actions** tab
3. See all workflow runs

### View Deployment Logs

```bash
# Real-time logs
docker logs -f company-profile-dev

# Last 100 lines
docker logs --tail 100 company-profile-dev

# Since specific time
docker logs --since 30m company-profile-dev
```

### Check Container Status

```bash
# All company-profile containers
docker ps | grep company-profile

# Specific deployment
docker ps | grep company-profile-dev

# Container resource usage
docker stats company-profile-dev
```

---

## 🔐 Security Best Practices

1. **Rotate SSH Keys Regularly**
   ```bash
   ssh-keygen -t rsa -b 4096
   # Update DEPLOY_SSH_KEY secret
   ```

2. **Use Deploy Keys** (Recommended)
   - GitHub Settings → Deploy Keys
   - Add server's public key
   - Enable "Allow write access"

3. **Limit SSH Access**
   ```bash
   # On server, restrict deployer user
   sudo usermod -s /bin/rbash deployer
   ```

4. **Use Environment-Specific Secrets**
   - Different credentials per environment
   - Store in GitHub Environments

5. **Enable Branch Protection**
   - Require PR reviews before merge to master
   - Require status checks to pass

---

## 🎯 Quick Reference

### Trigger Deployment

```bash
# Development
git push origin dev

# Staging
git push origin stage

# Production
git push origin master
```

### Access Deployments

```bash
# Dev
curl -I https://company-dev.constrix-nv.com

# Stage
curl -I https://company-stage.constrix-nv.com

# Production
curl -I https://company.constrix-nv.com
```

### View Logs

```bash
# GitHub Actions logs
# Go to: GitHub → Actions → Click workflow run

# Server logs
ssh deployer@your-server.com
docker logs -f company-profile-dev
```

---

## 🚦 Deployment Status

After deployment, check:

✅ **GitHub Actions**: Green checkmark in Actions tab  
✅ **Server Container**: `docker ps | grep company-profile`  
✅ **Website**: Visit URL and verify it loads  
✅ **Traefik**: Check routing rules work  
✅ **SSL**: Ensure HTTPS works correctly  

---

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [SSH Action Documentation](https://github.com/appleboy/ssh-action)
- [SCP Action Documentation](https://github.com/appleboy/scp-action)
- [Docker Deployment Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Traefik Configuration](https://doc.traefik.io/traefik/)

---

**Need Help?** Check the troubleshooting section or review the workflow logs in GitHub Actions! 🚀

