#!/bin/bash

set -e
set -x

# Generate a unique cache bust value using the current timestamp and a random string
CACHEBUST=$(date +%s)-$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 8)
echo "Cache bust value: $CACHEBUST"

# Export CACHEBUST as an environment variable so Docker Compose can use it
export CACHEBUST

CURRENT_DIR=$(pwd)
if [ "$ISLOCAL" = true ]; then
  echo "Deploy On Local Env"
  DEPLOY_DIR=$CURRENT_DIR/deployments/$DEPLOYMENT_ID
else
  echo "Deploying to DEVELOPMENT..."
  DEPLOY_DIR=/home/deployer/company-profile/deployments/$DEPLOYMENT_ID
fi

echo "Deployment ID: $DEPLOYMENT_ID"
echo "Deployment Directory: $DEPLOY_DIR"

# Navigate to deployment directory
mkdir -p $DEPLOY_DIR
cd $DEPLOY_DIR

PROJECT_NAME=company-profile-$DEPLOYMENT_ID

# Create .env file
cat <<EOF > .env
NEXT_PUBLIC_API_BASE_URL=$BE_URL
NEXT_PUBLIC_API_PATH=api
NEXT_PUBLIC_API_VERSION=v1
NODE_ENV=$DEPLOYMENT_ID
NEXT_PUBLIC_CACHE_BUST=$CACHEBUST
DEPLOYMENT_ID=$DEPLOYMENT_ID
NEXTAUTH_SECRET=${NEXTAUTH_SECRET:-8ea28feed665d06fd12c8a1a35b90577293531b59c3e8b8316213c89b5e5d62c}
EOF

cat .env

# Secure the .env file
chmod 600 .env

# Clean any previous build artifacts
echo "Cleaning previous build artifacts..."
rm -rf .next
rm -rf node_modules/.cache

if [ "$ISLOCAL" = true ]; then
  echo "Deploy On Local Env"
  echo "You are in: $CURRENT_DIR"
  cd "$CURRENT_DIR/devops/dev"
else
  if [ "$DEPLOYMENT_ID" = "master" ]; then
    echo "Deploying to PRODUCTION..."
    cd "$DEPLOY_DIR/devops/prod"
  else
    echo "Deploying to DEVELOPMENT..."
    cd "$DEPLOY_DIR/devops/dev"
  fi
fi

# Start the containers and remove any orphaned containers
echo "Starting Docker containers with cache bust: $CACHEBUST"
docker compose -p $PROJECT_NAME build --no-cache
docker compose -p $PROJECT_NAME up --force-recreate --remove-orphans -d

# Verify the container is running
echo "Verifying container is running..."
docker ps | grep $PROJECT_NAME

