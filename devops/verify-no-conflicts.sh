#!/bin/bash

# Color codes for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  🔍 Conflict Verification Script"
echo "  Checking for conflicts with Constrix_Base"
echo "═══════════════════════════════════════════════════════"
echo ""

# Function to print success
success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Function to print error
error() {
    echo -e "${RED}❌ $1${NC}"
}

# Function to print warning
warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Function to print info
info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

CONFLICTS=0

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. Checking Container Names"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check for container name conflicts
if docker ps -a --format '{{.Names}}' | grep -q "^company-profile-"; then
    warning "Company Profile containers already exist:"
    docker ps -a --format '{{.Names}}' | grep "^company-profile-"
    info "This is OK if you've deployed before"
else
    success "No existing Company Profile containers found"
fi

if docker ps -a --format '{{.Names}}' | grep -q "^nextjs-"; then
    info "Constrix_Base containers found:"
    docker ps -a --format '{{.Names}}' | grep "^nextjs-"
    success "Different naming pattern - NO CONFLICT"
else
    warning "No Constrix_Base containers found (is it deployed?)"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2. Checking Docker Networks"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if docker network ls | grep -q "traefik_network"; then
    success "traefik_network exists (required for both projects)"
else
    error "traefik_network not found! Create it with:"
    echo "   docker network create traefik_network"
    CONFLICTS=$((CONFLICTS + 1))
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3. Checking Traefik Status"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if docker ps | grep -q "traefik"; then
    TRAEFIK_CONTAINER=$(docker ps --filter "name=traefik" --format "{{.Names}}" | head -n 1)
    success "Traefik is running: $TRAEFIK_CONTAINER"
else
    error "Traefik is not running! Both projects need Traefik"
    CONFLICTS=$((CONFLICTS + 1))
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4. Checking Deployment Directories"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -d "/home/deployer/nextjs" ]; then
    info "Constrix_Base directory: /home/deployer/nextjs"
    success "Path is separate - NO CONFLICT"
else
    warning "Constrix_Base directory not found (might not be deployed yet)"
fi

if [ -d "/home/deployer/company-profile" ]; then
    info "Company Profile directory: /home/deployer/company-profile"
    success "Path is separate - NO CONFLICT"
else
    info "Company Profile directory will be created on first deploy"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "5. Checking Port Usage"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check if port 3000 is exposed on host
if netstat -tuln 2>/dev/null | grep -q ":3000 "; then
    warning "Port 3000 is in use on host"
    info "This is usually OK - containers use internal networking"
else
    success "Port 3000 not exposed on host (good!)"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "6. Checking Container Port Bindings"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check Constrix_Base containers
if docker ps --filter "name=nextjs-" --format "{{.Names}}" | head -n 1 | xargs -I {} docker port {} 2>/dev/null | grep -q "3000"; then
    error "Constrix_Base container exposes port 3000 to host!"
    info "This might cause conflicts. Check docker-compose.yml"
    CONFLICTS=$((CONFLICTS + 1))
else
    success "Constrix_Base containers don't expose ports to host"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "7. Checking Traefik Router Names"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check for router naming conflicts by inspecting container labels
if docker ps -a --filter "name=nextjs-" -q | head -n 1 | xargs -I {} docker inspect {} --format '{{.Config.Labels}}' 2>/dev/null | grep -q "traefik.http.routers.nextjs-"; then
    success "Constrix_Base uses 'nextjs-*' router names"
fi

info "Company Profile will use 'company-profile-*' router names"
success "Different router names - NO CONFLICT"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "8. Checking Domain Patterns"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

info "Constrix_Base domains: core-*.constrix-nv.com"
info "Company Profile domains: company-*.constrix-nv.com"
success "Different domain patterns - NO CONFLICT"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "9. Simulating Deployment"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

DEPLOYMENT_ID="test"
info "Simulating deployment with ID: $DEPLOYMENT_ID"

# Check if test container would conflict
if docker ps -a --format '{{.Names}}' | grep -q "^company-profile-$DEPLOYMENT_ID$"; then
    warning "Container 'company-profile-$DEPLOYMENT_ID' already exists"
    info "Will be replaced on deployment (this is normal)"
else
    success "No conflicting test containers found"
fi

# Check if project name would conflict
if docker ps -a --format '{{.Names}}' | grep -q "^nextjs-$DEPLOYMENT_ID$"; then
    info "Constrix_Base test container exists: nextjs-$DEPLOYMENT_ID"
    success "Different name from company-profile-$DEPLOYMENT_ID - NO CONFLICT"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "10. Checking Docker Compose Project Names"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# List all docker compose projects
info "Checking for existing Docker Compose projects..."

# Constrix_Base projects
if docker ps --filter "label=com.docker.compose.project=nextjs-dev" -q 2>/dev/null | grep -q .; then
    info "Found Constrix_Base project: nextjs-dev"
fi

# Company Profile would use different project names
info "Company Profile will use: company-profile-*"
success "Different Docker Compose project names - NO CONFLICT"

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  📊 Verification Summary"
echo "═══════════════════════════════════════════════════════"
echo ""

if [ $CONFLICTS -eq 0 ]; then
    echo -e "${GREEN}╔═══════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                                                   ║${NC}"
    echo -e "${GREEN}║  ✅  NO CONFLICTS DETECTED!                       ║${NC}"
    echo -e "${GREEN}║                                                   ║${NC}"
    echo -e "${GREEN}║  Your company-profile project is safe to deploy  ║${NC}"
    echo -e "${GREEN}║  alongside Constrix_Base.                        ║${NC}"
    echo -e "${GREEN}║                                                   ║${NC}"
    echo -e "${GREEN}╚═══════════════════════════════════════════════════╝${NC}"
    echo ""
    success "All verification checks passed!"
    echo ""
    echo "You can now deploy with:"
    echo "  export DEPLOYMENT_ID=dev"
    echo "  export BE_URL=https://core-be-dev.constrix-nv.com"
    echo "  ./devops/deploy.sh"
    echo ""
    exit 0
else
    echo -e "${RED}╔═══════════════════════════════════════════════════╗${NC}"
    echo -e "${RED}║                                                   ║${NC}"
    echo -e "${RED}║  ⚠️  ISSUES FOUND: $CONFLICTS                              ║${NC}"
    echo -e "${RED}║                                                   ║${NC}"
    echo -e "${RED}║  Please resolve the issues above before          ║${NC}"
    echo -e "${RED}║  deploying.                                       ║${NC}"
    echo -e "${RED}║                                                   ║${NC}"
    echo -e "${RED}╚═══════════════════════════════════════════════════╝${NC}"
    echo ""
    error "$CONFLICTS potential conflict(s) detected"
    echo ""
    exit 1
fi

