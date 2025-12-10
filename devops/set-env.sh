#!/bin/bash

# Set default values if not already set
: "${NEXT_PUBLIC_API_BASE_URL:=https://core-be-dev.constrix-nv.com}"
: "${NEXT_PUBLIC_API_PATH:=api}"
: "${NEXT_PUBLIC_API_VERSION:=v1}"
: "${NODE_ENV:=development}"
: "${NEXT_PUBLIC_CACHE_BUST:=$(date +%s)-$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 8)}"
: "${DEPLOYMENT_ID:=stage}"
: "${ISLOCAL:=true}"
: "${BE_URL:=$NEXT_PUBLIC_API_BASE_URL}"
: "${NEXTAUTH_SECRET:=8ea28feed665d06fd12c8a1a35b90577293531b59c3e8b8316213c89b5e5d62c}"

export NEXT_PUBLIC_API_BASE_URL
export NEXT_PUBLIC_API_PATH
export NEXT_PUBLIC_API_VERSION
export NODE_ENV
export NEXT_PUBLIC_CACHE_BUST
export DEPLOYMENT_ID
export ISLOCAL
export BE_URL
export NEXTAUTH_SECRET

echo "Environment variables have been set:"
echo "  DEPLOYMENT_ID: $DEPLOYMENT_ID"
echo "  NODE_ENV: $NODE_ENV"
echo "  BE_URL: $BE_URL"
echo "  ISLOCAL: $ISLOCAL"

