# Cloudflare Configuration - PayMyBill

## 🔐 SECURITY WARNING

**IMPORTANT**: Your API token was shared in our conversation. For security, you should:

1. Go to https://dash.cloudflare.com/profile/api-tokens
2. Find and revoke the current token
3. Create a new token
4. Update `.env.local` with the new token

**Never share API tokens publicly or commit them to git!**

---

## Current Configuration

### Project Details

- **Project Name**: `paymybill`
- **Production URL**: https://af63a98d.paymybill.pages.dev
- **GitHub Repo**: `thesavides/paymybill`
- **Branch**: `main` (auto-deploys)

### Deployment Status

Your last successful deployment:
- **Date**: 2025-12-06 at 11:10:32 UTC
- **Commit**: 85c6f51 (Initial commit: PayMyBill app)
- **Files Deployed**: 5 files (2.19 sec upload)
- **Status**: ✅ Success

---

## Local Configuration Files

### `.env.local`

Your local credentials are stored here (not committed to git):

```bash
CLOUDFLARE_API_TOKEN=E9NucnMPYJNUsPOKwYDN7sN6KqZBBwE6p7vuWqgx
CLOUDFLARE_PROJECT_NAME=paymybill
CLOUDFLARE_PRODUCTION_URL=https://af63a98d.paymybill.pages.dev
```

**To rotate your token:**
1. Create new token at: https://dash.cloudflare.com/profile/api-tokens
2. Update `CLOUDFLARE_API_TOKEN` in `.env.local`
3. Update GitHub Secret `CLOUDFLARE_API_TOKEN` (see below)

---

## GitHub Repository Configuration

### Required Secrets

Your GitHub repository needs these secrets for automated deployment:

Go to: https://github.com/thesavides/paymybill/settings/secrets/actions

#### Add These Secrets:

**1. CLOUDFLARE_API_TOKEN**
- Name: `CLOUDFLARE_API_TOKEN`
- Value: Your Cloudflare API token (currently: `E9NucnMPYJNUsPOKwYDN7sN6KqZBBwE6p7vuWqgx`)
- ⚠️ **Regenerate this token for security!**

**2. CLOUDFLARE_ACCOUNT_ID**
- Name: `CLOUDFLARE_ACCOUNT_ID`
- Value: Your Cloudflare account ID
- Find it at: https://dash.cloudflare.com (in the URL or project settings)

### How to Add Secrets

1. Go to your GitHub repo: https://github.com/thesavides/paymybill
2. Click "Settings" tab
3. Click "Secrets and variables" → "Actions"
4. Click "New repository secret"
5. Add both secrets above

---

## Cloudflare Dashboard Access

### Access Your Project

1. Go to: https://dash.cloudflare.com
2. Click "Workers & Pages"
3. Click "paymybill"

### What You Can Do There

- **View Deployments**: See all deployment history
- **Check Logs**: View build and deployment logs
- **Rollback**: Revert to a previous deployment
- **Custom Domain**: Add your own domain
- **Environment Variables**: Add configuration
- **Analytics**: View traffic and performance

---

## Deployment Methods

### Method 1: Git Push (Recommended)

Cloudflare automatically deploys when you push to GitHub:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

**Deployment happens automatically in 1-2 minutes!**

### Method 2: Wrangler CLI (Manual)

For direct deployment without git:

```bash
# Install Wrangler
npm install -g wrangler

# Deploy
cd /Users/chrissavides/Documents/Paymybill
wrangler pages deploy . --project-name=paymybill
```

Or use the provided script:
```bash
./deploy-cloudflare.sh
```

### Method 3: GitHub Actions

Once you add the GitHub secrets, the workflow will:
- Trigger on every push to `main`
- Deploy via GitHub Actions
- Show status in the Actions tab

---

## Project Files Deployed

Based on your last deployment log, these files are deployed:

1. `index.html` - Main application (34KB)
2. `styles.css` - Styling (22KB)
3. `app.js` - Application logic (22KB)
4. `i18n.js` - Translations (24KB)
5. Additional assets (images, etc.)

**Total size**: ~87KB uncompressed, ~25KB gzipped

---

## Monitoring Your Deployments

### Cloudflare Dashboard

View at: https://dash.cloudflare.com/pages/paymybill

- **Deployments Tab**: See all deployments and their status
- **Build Logs**: Click any deployment to view logs
- **Analytics**: Track visitors and performance
- **Custom Domains**: Add your own domain

### GitHub Actions

View at: https://github.com/thesavides/paymybill/actions

- See all workflow runs
- View detailed logs
- Check deployment status
- Get notified on failures

---

## Preview Deployments

Cloudflare automatically creates preview deployments for:

### Feature Branches

```bash
git checkout -b feature/new-feature
git push origin feature/new-feature
```

Preview URL: `https://feature-new-feature.paymybill.pages.dev`

### Pull Requests

Every PR gets its own preview deployment automatically!

---

## Custom Domain Setup (Optional)

### Add Your Domain

1. Go to Cloudflare Dashboard → paymybill → Custom domains
2. Click "Add custom domain"
3. Enter your domain (e.g., `www.paymybill.com`)
4. Update DNS records as instructed

### SSL Certificate

Cloudflare provides free SSL automatically via Let's Encrypt!

---

## Environment Variables

Currently not needed (static HTML), but if you add backend integration:

### Add in Cloudflare Dashboard

1. Go to: paymybill → Settings → Environment variables
2. Click "Add variable"
3. Example variables:
   - `API_ENDPOINT`: `https://api.paymybill.com`
   - `STRIPE_PUBLIC_KEY`: `pk_live_...`

### Use in Your Code

```javascript
// Access in your app
const API_URL = process.env.API_ENDPOINT || 'http://localhost:3000';
```

---

## Rollback Procedure

### Via Cloudflare Dashboard

If a deployment breaks something:

1. Go to Dashboard → paymybill → Deployments
2. Find the last working deployment
3. Click "⋮" → "Rollback to this deployment"

### Via Git

```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or reset to specific commit
git reset --hard <commit-hash>
git push --force origin main
```

---

## Security Best Practices

### Protect Your API Token

✅ **DO**:
- Store in `.env.local` (gitignored)
- Store in GitHub Secrets
- Rotate tokens periodically
- Use minimum required permissions

❌ **DON'T**:
- Commit to git
- Share publicly
- Use in client-side code
- Reuse across projects

### Regenerate Your Token

**Do this now:**

1. Go to: https://dash.cloudflare.com/profile/api-tokens
2. Find token: `E9NucnMPYJNUsPOKwYDN7sN6KqZBBwE6p7vuWqgx`
3. Click "⋮" → "Revoke"
4. Click "Create Token"
5. Use "Edit Cloudflare Workers" template
6. Copy new token
7. Update `.env.local`
8. Update GitHub Secret

---

## Troubleshooting

### Deployment Fails

**Check**:
1. Cloudflare Dashboard → paymybill → Deployments → View logs
2. GitHub Actions → Click failed workflow → View logs
3. Verify files are correctly formatted

**Common Issues**:
- Missing files
- Syntax errors in HTML/CSS/JS
- File size too large
- API token expired

### Changes Not Showing

**Try**:
1. Hard refresh: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)
2. Clear browser cache
3. Wait 2-3 minutes for CDN propagation
4. Check deployment succeeded in dashboard

### Site is Down

**Check**:
1. Cloudflare status: https://www.cloudflarestatus.com
2. Your deployment history for recent changes
3. Rollback to last working version

---

## Useful Commands

### View Deployments
```bash
wrangler pages deployments list --project-name=paymybill
```

### View Logs
```bash
wrangler pages deployments tail --project-name=paymybill
```

### Check Project Info
```bash
wrangler pages project list
```

---

## Getting Your Account ID

Your Cloudflare Account ID is needed for GitHub Actions.

**Find it**:
1. Go to: https://dash.cloudflare.com
2. Click "Workers & Pages"
3. Click "paymybill"
4. Account ID is in the right sidebar

Or look in the URL:
```
https://dash.cloudflare.com/{ACCOUNT_ID}/pages/...
```

---

## Resources

- **Cloudflare Dashboard**: https://dash.cloudflare.com
- **Your Project**: https://dash.cloudflare.com/pages/paymybill
- **API Tokens**: https://dash.cloudflare.com/profile/api-tokens
- **Production URL**: https://af63a98d.paymybill.pages.dev
- **GitHub Repo**: https://github.com/thesavides/paymybill
- **Cloudflare Docs**: https://developers.cloudflare.com/pages/

---

## Summary

✅ **What's Working**:
- Cloudflare Pages project created
- Auto-deploy from GitHub enabled
- Production site live
- 5 files deployed successfully

⏳ **Action Items**:
1. **SECURITY**: Regenerate your API token
2. Add GitHub Secrets for automation
3. Update `.env.local` with new token
4. Test deployment workflow

---

**Your site is live at**: https://af63a98d.paymybill.pages.dev 🎉
