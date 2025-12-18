# 🚀 Quick Start - Deploy Company Profile

## TL;DR - Deploy in 3 Steps

### 1️⃣ Set Environment
```bash
source devops/set-env.sh

# Override defaults for your deployment
export DEPLOYMENT_ID=stage  # or: dev, master
export BE_URL=https://core-be-stage.constrix-nv.com
export ISLOCAL=false  # true for local, false for server
```

### 2️⃣ Deploy
```bash
chmod +x devops/deploy.sh
./devops/deploy.sh
```

### 3️⃣ Access Your Site
- **Dev/Stage**: `https://company-stage.constrix-nv.com`
- **Production**: `https://company.constrix-nv.com`

---

## 🎯 Understanding the Setup

### What Makes This Work Alongside Other Projects?

**The Magic: Traefik Reverse Proxy**

Both projects use port 3000 internally, but Traefik routes by domain:

```
┌─────────────────────────────────────────────┐
│          Traefik (Port 443/80)              │
├─────────────────────────────────────────────┤
│  Routes to different containers by domain:  │
│                                             │
│  core-stage.constrix-nv.com                │
│      ↓                                      │
│  nextjs-stage (Constrix_Base:3000)         │
│                                             │
│  company-stage.constrix-nv.com             │
│      ↓                                      │
│  company-profile-stage (This project:3000) │
└─────────────────────────────────────────────┘
```

**No port conflicts!** Each container has its own isolated network namespace.

---

## 📋 Complete Deployment Examples

### Local Development
```bash
# Set variables
export DEPLOYMENT_ID=local
export BE_URL=https://core-be-stage.constrix-nv.com
export NODE_ENV=development
export ISLOCAL=true

# Deploy
./devops/deploy.sh

# Access at http://localhost:3000 (or through Traefik)
```

### Stage Deployment (Server)
```bash
# SSH to server
ssh deployer@your-server.com
cd /home/deployer/company-profile

# Set variables
export DEPLOYMENT_ID=stage
export BE_URL=https://core-be-stage.constrix-nv.com
export NODE_ENV=development
export ISLOCAL=false

# Deploy
./devops/deploy.sh

# Access at https://company-stage.constrix-nv.com
```

### Production Deployment
```bash
export DEPLOYMENT_ID=master
export BE_URL=https://core-be.constrix-nv.com
export NODE_ENV=production
export ISLOCAL=false

./devops/deploy.sh

# Access at https://company.constrix-nv.com
```

---

## 🔍 Verify Deployment

```bash
# Check container is running
docker ps | grep company-profile

# View logs
docker logs company-profile-stage -f

# Check Next.js is responding
curl -I https://company-stage.constrix-nv.com
```

---

## 🛑 Common Issues & Solutions

### Issue: "Permission denied" on deploy.sh
```bash
chmod +x devops/deploy.sh
```

### Issue: Container won't start
```bash
# View logs
docker logs company-profile-stage

# Common fix: rebuild from scratch
docker compose -p company-profile-stage down
docker system prune -f
./devops/deploy.sh
```

### Issue: "Network traefik_network not found"
```bash
# Create the network
docker network create traefik_network

# Or check if Traefik is running
docker ps | grep traefik
```

### Issue: 502 Bad Gateway
- Wait 30 seconds for Next.js to start
- Check logs: `docker logs company-profile-stage`
- Verify the build completed successfully

---

## 🔄 Update Deployment

```bash
# On server
cd /home/deployer/company-profile
git pull origin main

# Redeploy (no need to change variables)
./devops/deploy.sh
```

The script automatically:
- Generates new cache bust value
- Rebuilds the container
- Replaces the old container with zero downtime

---

## 🎨 Customization Options

### Change Port for Local Development

Edit `devops/dev/docker-compose.yml`:

```yaml
services:
  company-profile:
    ports:
      - "3001:3000"  # Map to different external port
```

Then access at `http://localhost:3001`

### Use Different Backend URL per Environment

```bash
# Create environment-specific scripts
cat > devops/deploy-stage.sh <<'EOF'
#!/bin/bash
export DEPLOYMENT_ID=stage
export BE_URL=https://core-be-stage.constrix-nv.com
export NODE_ENV=development
export ISLOCAL=false
./devops/deploy.sh
EOF

chmod +x devops/deploy-stage.sh
```

---

## 💡 Pro Tips

1. **Auto-deploy on git push**: Set up a webhook to trigger `deploy.sh`
2. **Health checks**: Add health check endpoint to Next.js app
3. **Monitoring**: Use Traefik dashboard to monitor routing
4. **Backup**: Deployment directories are in `/home/deployer/company-profile/deployments/`

---

## 📞 Need Help?

1. Check logs: `docker logs company-profile-stage`
2. Verify environment: `docker exec company-profile-stage env`
3. Test container internally: `docker exec company-profile-stage curl http://localhost:3000`
4. Check Traefik routing: Visit Traefik dashboard (if enabled)

---

## 🎓 What You Learned

✅ How to deploy Next.js with Docker  
✅ How Traefik enables multiple apps on same server  
✅ How to manage multiple environments (dev/stage/prod)  
✅ How to update deployments with zero downtime  
✅ How to troubleshoot common deployment issues  

Happy deploying! 🎉

