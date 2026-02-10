#!/bin/bash

# CheckPay - Deploy to Cloudflare Pages
# This script deploys the app directly to Cloudflare using the API

set -e  # Exit on error

echo "🚀 Deploying CheckPay to Cloudflare Pages..."
echo ""

# Load environment variables
if [ -f .env.local ]; then
    export $(cat .env.local | grep -v '^#' | xargs)
else
    echo "❌ Error: .env.local file not found!"
    echo "Please ensure your Cloudflare credentials are configured."
    exit 1
fi

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "📦 Wrangler CLI not found. Installing..."
    npm install -g wrangler
fi

# Authenticate with Cloudflare
export CLOUDFLARE_API_TOKEN=$CLOUDFLARE_API_TOKEN

echo "✅ Configuration loaded"
echo "   Project: $CLOUDFLARE_PROJECT_NAME"
echo "   URL: $CLOUDFLARE_PRODUCTION_URL"
echo ""

# Deploy to Cloudflare Pages
echo "📤 Deploying files..."
wrangler pages deploy . \
    --project-name=$CLOUDFLARE_PROJECT_NAME \
    --branch=main

echo ""
echo "✅ Deployment complete!"
echo "🌐 Your site is live at: $CLOUDFLARE_PRODUCTION_URL"
echo ""
