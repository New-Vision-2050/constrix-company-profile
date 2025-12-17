# ✅ Deployment Setup Complete!

Your company-profile project is now ready to deploy alongside the existing Constrix_Base project.

## 📚 What Was Created

### DevOps Files
1. **`devops/Dockerfile`** - Multi-stage Docker build for Next.js
2. **`devops/deploy.sh`** - Main deployment script
3. **`devops/set-env.sh`** - Environment variable defaults
4. **`devops/dev/docker-compose.yml`** - Dev/Stage environment config
5. **`devops/prod/docker-compose.yml`** - Production environment config
6. **`devops/.gitignore`** - Prevents committing sensitive files

### Documentation
7. **`devops/README.md`** - Complete deployment guide
8. **`devops/QUICK_START.md`** - Quick start guide
9. **`devops/COMPARISON.md`** - Comparison with Constrix_Base

### Configuration Updates
10. **`next.config.ts`** - Added `output: "standalone"` for Docker

---

## 🎯 How It Works

### The Magic: No Port Conflicts!

Both projects use **port 3000 internally**, but they're **completely isolated**:

```
┌─────────────────────────────────────────────────┐
│         Traefik (Reverse Proxy)                 │
│         Routes by Domain Name                   │
├─────────────────────────────────────────────────┤
│                                                 │
│  core-stage.constrix-nv.com                    │
│      ↓                                          │
│  Constrix_Base Container (port 3000)           │
│                                                 │
│  company-stage.constrix-nv.com                 │
│      ↓                                          │
│  Company Profile Container (port 3000)         │
│                                                 │
└─────────────────────────────────────────────────┘
```

**No port conflicts** because:
1. Each container has its own network namespace
2. Traefik routes traffic by **domain name**, not port
3. Both use port 3000 **inside** their containers
4. Only Traefik needs external ports (80/443)

---

## 🚀 Quick Deploy

### 1. Set Environment
```bash
source devops/set-env.sh

export DEPLOYMENT_ID=stage  # or: dev, master
export BE_URL=https://core-be-stage.constrix-nv.com
export ISLOCAL=false  # true for local, false for server
```

### 2. Deploy
```bash
chmod +x devops/deploy.sh
./devops/deploy.sh
```

### 3. Access
- **Dev**: https://company-dev.constrix-nv.com
- **Stage**: https://company-stage.constrix-nv.com
- **Production**: https://company.constrix-nv.com

---

## 🔑 Key Differences from Constrix_Base

| Aspect | Constrix_Base | Company Profile |
|--------|---------------|-----------------|
| **Domain (Dev)** | core-stage.constrix-nv.com | company-stage.constrix-nv.com |
| **Domain (Prod)** | constrix-nv.com (catch-all) | company.constrix-nv.com |
| **Container Name** | nextjs-stage | company-profile-stage |
| **Deploy Path** | /home/deployer/nextjs | /home/deployer/company-profile |

---

## ✅ Prerequisites

Before deploying, ensure:

1. **Traefik is running** on your server
   ```bash
   docker ps | grep traefik
   ```

2. **Network exists**
   ```bash
   docker network ls | grep traefik_network
   ```

3. **DNS configured** (A records pointing to server):
   - company-stage.constrix-nv.com
   - company-dev.constrix-nv.com
   - company.constrix-nv.com

4. **Server access**
   ```bash
   ssh deployer@your-server.com
   ```

---

## 📖 Next Steps

### For Local Testing
```bash
export ISLOCAL=true
export DEPLOYMENT_ID=local
./devops/deploy.sh
```

### For Server Deployment

**Stage:**
```bash
ssh deployer@your-server.com
cd /home/deployer
git clone <your-repo> company-profile
cd company-profile

export DEPLOYMENT_ID=stage
export BE_URL=https://core-be-stage.constrix-nv.com
export ISLOCAL=false
./devops/deploy.sh
```

**Production:**
```bash
export DEPLOYMENT_ID=master
export BE_URL=https://core-be.constrix-nv.com
export NODE_ENV=production
./devops/deploy.sh
```

---

## 📚 Documentation Guide

Choose based on your needs:

### 🏃 Just want to deploy quickly?
→ Read **`devops/QUICK_START.md`**

### 🔍 Want to understand everything?
→ Read **`devops/README.md`**

### 🤔 Curious about differences from Constrix_Base?
→ Read **`devops/COMPARISON.md`**

---

## 🔧 Customization Options

### Option 1: Different Subdomain (Current Setup) ✅
- Dev: `company-stage.constrix-nv.com`
- Prod: `company.constrix-nv.com`

**No changes needed!** This is already configured.

### Option 2: Path-Based Routing
Edit `devops/prod/docker-compose.yml`:
```yaml
- "traefik.http.routers.company-profile.rule=PathPrefix(`/company`)"
```

Then update `next.config.ts`:
```typescript
const nextConfig = {
  basePath: '/company',
  output: 'standalone',
}
```

Access at: `https://constrix-nv.com/company`

### Option 3: Different Port for Local Development
Edit `devops/dev/docker-compose.yml`:
```yaml
services:
  company-profile:
    ports:
      - "3001:3000"  # External port 3001
```

---

## 🛠️ Troubleshooting

### Container won't start
```bash
docker logs company-profile-stage
```

### DNS not resolving
```bash
# Check DNS
nslookup company-stage.constrix-nv.com

# Check Traefik routing
docker logs traefik-container
```

### Build fails
```bash
# Clean and rebuild
rm -rf .next node_modules
./devops/deploy.sh
```

### View all deployment logs
```bash
docker ps | grep company-profile
docker logs -f company-profile-stage
```

---

## 🎓 What You Can Do Now

✅ Deploy to dev/stage/prod environments  
✅ Run alongside Constrix_Base without conflicts  
✅ Use the same port (3000) in multiple containers  
✅ Route traffic by domain name via Traefik  
✅ Update deployments with zero downtime  
✅ Scale to additional projects using the same pattern  

---

## 💡 Pro Tips

1. **Auto-update on git push**: Set up a webhook
2. **Monitor deployments**: Use Traefik dashboard
3. **Health checks**: Add `/api/health` endpoint to your Next.js app
4. **Rollback**: Keep previous deployment in deployments/ directory
5. **Logs**: Use `docker logs -f` to watch real-time logs

---

## 🔐 Security Checklist

- [ ] Generate unique `NEXTAUTH_SECRET` for production
- [ ] Secure `.env` files with `chmod 600`
- [ ] Use environment variables for sensitive data
- [ ] Enable Traefik dashboard authentication
- [ ] Keep Docker images updated
- [ ] Use SSL certificates (Traefik handles this automatically)

---

## 📞 Need Help?

1. Check the documentation files in `devops/`
2. Review logs: `docker logs company-profile-stage`
3. Verify environment: `docker exec company-profile-stage env`
4. Test internally: `docker exec company-profile-stage curl http://localhost:3000`

---

## 🎉 Success!

Your deployment setup is complete and ready to use. Both projects can now run side-by-side on the same server without any port conflicts!

**Happy Deploying!** 🚀

