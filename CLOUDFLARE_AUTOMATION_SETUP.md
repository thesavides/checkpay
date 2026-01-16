# Cloudflare Pages Automation Setup

This guide will help you set up automated deployments from GitHub to Cloudflare Pages with full API access.

## Overview

Your PayMyBill app is configured to automatically deploy to Cloudflare Pages whenever you push to GitHub. The deployment log you shared shows it's already working, but this guide will help you set up full automation with API tokens.

## Current Setup

Based on your deployment log:
- ✅ GitHub repo: `thesavides/paymybill`
- ✅ Cloudflare Pages is already connected
- ✅ Auto-deploys on push to main branch
- ✅ Deploys from commit: 85c6f51 (Initial commit)
- ✅ Deployment successful (5 files uploaded)

## Setting Up API Automation

To enable full automation and programmatic access:

### Step 1: Get Your Cloudflare Account ID

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click on "Workers & Pages" in the left sidebar
3. Click on your "paymybill" project
4. Your Account ID is displayed in the right sidebar

Or find it in the URL:
```
https://dash.cloudflare.com/{ACCOUNT_ID}/pages/...
```

### Step 2: Create a Cloudflare API Token

1. Go to [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Click "Create Token"
3. Use the "Edit Cloudflare Workers" template, or create a custom token with these permissions:

**Token Permissions:**
```
Account:
  - Cloudflare Pages: Edit

Zone: (if you have a custom domain)
  - DNS: Edit
  - Workers Routes: Edit
```

4. Click "Continue to Summary"
5. Click "Create Token"
6. **IMPORTANT:** Copy your token immediately (you won't see it again!)

### Step 3: Add Secrets to GitHub Repository

1. Go to your GitHub repo: `https://github.com/thesavides/paymybill`
2. Click "Settings" tab
3. Click "Secrets and variables" → "Actions"
4. Click "New repository secret"

Add these two secrets:

**Secret 1: CLOUDFLARE_API_TOKEN**
- Name: `CLOUDFLARE_API_TOKEN`
- Value: The token you just created
- Click "Add secret"

**Secret 2: CLOUDFLARE_ACCOUNT_ID**
- Name: `CLOUDFLARE_ACCOUNT_ID`
- Value: Your account ID from Step 1
- Click "Add secret"

### Step 4: Verify GitHub Actions

The repository now has a GitHub Actions workflow file at:
`.github/workflows/cloudflare-deploy.yml`

This workflow will:
- ✅ Trigger on every push to `main` branch
- ✅ Trigger on pull requests to `main` branch
- ✅ Deploy to Cloudflare Pages automatically
- ✅ Provide deployment status in GitHub

## Deployment Methods

You now have TWO ways to deploy:

### Method 1: Cloudflare's Built-in GitHub Integration (Current)
- Cloudflare watches your GitHub repo
- Automatically deploys on push
- Managed in Cloudflare Dashboard

### Method 2: GitHub Actions (New - More Control)
- GitHub Actions workflow controls deployment
- More flexibility for future CI/CD
- Can add tests, linting, etc. before deployment
- Deployment status visible in GitHub

**Both methods can coexist!** Choose what works best for you.

## Testing the Setup

### Test Automatic Deployment

1. Make a small change to `index.html` or `README.md`
2. Commit and push:
   ```bash
   git add .
   git commit -m "Test automated deployment"
   git push origin main
   ```
3. Watch the deployment:
   - **Cloudflare Dashboard**: Check deployment status
   - **GitHub Actions**: Go to "Actions" tab to see workflow run

### Expected Results

After pushing, you should see:
1. GitHub Actions workflow starts (if configured with secrets)
2. Cloudflare Pages builds and deploys
3. Your site updates within 1-2 minutes
4. Visit your Cloudflare Pages URL to see changes

## Cloudflare Wrangler CLI (Optional)

For manual deployments and local testing:

### Install Wrangler

```bash
npm install -g wrangler
```

### Authenticate

```bash
wrangler login
```

This opens a browser to authorize Wrangler with your Cloudflare account.

### Deploy Manually

```bash
cd /Users/chrissavides/Documents/Paymybill
wrangler pages deploy . --project-name=paymybill
```

### View Deployments

```bash
wrangler pages deployments list --project-name=paymybill
```

### View Logs

```bash
wrangler pages deployments tail --project-name=paymybill
```

## Project Configuration

### Current Configuration (`wrangler.toml`)

```toml
name = "paymybill"
compatibility_date = "2024-12-06"
pages_build_output_dir = "."
```

This tells Cloudflare:
- Project name: `paymybill`
- Deploy everything in the current directory (static files)
- No build step needed (pure HTML/CSS/JS)

### Files Deployed

Based on your last deployment log, these 5 files are deployed:
1. `index.html` - Main app
2. `styles.css` - Styling
3. `app.js` - Application logic
4. `i18n.js` - Translations
5. (Possibly a favicon or other asset)

## Cloudflare Pages Settings

### Custom Domain (Optional)

1. Go to Cloudflare Dashboard → Pages → paymybill
2. Click "Custom domains"
3. Add your domain (e.g., `paymybill.com`)
4. Cloudflare handles SSL automatically

### Environment Variables

If you need to add environment variables:

1. Cloudflare Dashboard → Pages → paymybill → Settings
2. Scroll to "Environment variables"
3. Add variables for production/preview environments

Example:
```
API_ENDPOINT = https://api.paymybill.com
```

Access in your code (if you add a build step):
```javascript
const API_ENDPOINT = process.env.API_ENDPOINT;
```

### Preview Deployments

Cloudflare automatically creates preview deployments for:
- Every pull request
- Every branch you push

Access previews at:
```
https://{BRANCH}.paymybill.pages.dev
```

## Monitoring Deployments

### Cloudflare Dashboard

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click "Workers & Pages"
3. Click "paymybill"
4. View:
   - Deployment history
   - Build logs
   - Analytics
   - Custom domains

### GitHub Actions

1. Go to your [GitHub repo](https://github.com/thesavides/paymybill)
2. Click "Actions" tab
3. See all deployment runs
4. Click on any run to see detailed logs

## Rollback Deployments

If a deployment breaks something:

### Via Cloudflare Dashboard

1. Go to paymybill project → Deployments
2. Find the last working deployment
3. Click "⋮" → "Rollback to this deployment"

### Via Wrangler CLI

```bash
wrangler pages deployment list --project-name=paymybill
# Copy the deployment ID of the version you want
wrangler pages deployment create --project-name=paymybill --branch=main
```

### Via Git

```bash
# Revert to previous commit
git revert HEAD
git push origin main
# This triggers a new deployment with the old code
```

## Troubleshooting

### Deployment Failed

Check logs:
1. Cloudflare Dashboard → paymybill → Deployments → Click failed deployment
2. GitHub Actions → Failed workflow → View logs

Common issues:
- Missing files
- Git conflicts
- Cloudflare API rate limits

### Changes Not Showing

1. Check deployment completed successfully
2. Clear browser cache (Cmd+Shift+R)
3. Check you're viewing the production URL (not a preview)
4. Wait a few minutes for CDN to update

### GitHub Actions Not Running

1. Verify secrets are added: Repository → Settings → Secrets
2. Check workflow file exists: `.github/workflows/cloudflare-deploy.yml`
3. Verify workflow is enabled: Actions tab → Enable workflows

## Security Best Practices

### API Token Security

- ✅ Never commit API tokens to git
- ✅ Only store tokens in GitHub Secrets
- ✅ Use minimum required permissions
- ✅ Rotate tokens periodically
- ✅ Revoke unused tokens

### Git Security

```bash
# Never commit sensitive files
echo ".env" >> .gitignore
echo "secrets.json" >> .gitignore
git add .gitignore
git commit -m "Add security to gitignore"
```

## Deployment Workflow Summary

```
Local Development
       ↓
   git commit
       ↓
   git push origin main
       ↓
    GitHub Repository
       ↓
   ┌────────────────┬──────────────────┐
   ↓                ↓                  ↓
GitHub Actions   Cloudflare Pages   Preview Deploys
   ↓                ↓                  ↓
   └────────────────┴──────────────────┘
       ↓
  Production Site
  paymybill.pages.dev
```

## Next Steps

1. ✅ Add Cloudflare API token to GitHub Secrets (see Step 3)
2. ✅ Make a test commit and push to verify automation
3. ✅ Check both Cloudflare Dashboard and GitHub Actions
4. ✅ Optionally set up custom domain
5. ✅ Start developing with confidence!

## Useful Commands

```bash
# Check git status
git status

# See commit history
git log --oneline

# Check remote configuration
git remote -v

# Push to GitHub (triggers deployment)
git push origin main

# Create a new branch for testing
git checkout -b feature/new-feature

# View Cloudflare deployments (if Wrangler installed)
wrangler pages deployments list --project-name=paymybill
```

## Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)
- [Your GitHub Repository](https://github.com/thesavides/paymybill)
- [Cloudflare Dashboard](https://dash.cloudflare.com)

---

**You're all set for automated deployments! 🚀**

Any push to the `main` branch will automatically deploy to Cloudflare Pages.
