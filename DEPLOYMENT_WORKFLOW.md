# PayMyBill - Complete Deployment Workflow

## Overview

This document provides the complete workflow for developing, testing, and deploying PayMyBill to production using Cloudflare Pages.

## Development Workflow

```
┌──────────────────────┐
│  Local Development   │
│  (Your Computer)     │
└──────────────────────┘
          ↓
   Test Locally
          ↓
┌──────────────────────┐
│   Git Commit         │
└──────────────────────┘
          ↓
┌──────────────────────┐
│   Push to GitHub     │
│   (main branch)      │
└──────────────────────┘
          ↓
┌──────────────────────┐
│ Cloudflare Auto-     │
│ Deploy (1-2 min)     │
└──────────────────────┘
          ↓
┌──────────────────────┐
│   Production Live!   │
│   Test on Real URL   │
└──────────────────────┘
```

## Step-by-Step Guide

### 1. Local Development

#### Start Local Server

Choose your preferred method:

```bash
# Python (recommended for macOS)
cd /Users/chrissavides/Documents/Paymybill
python3 -m http.server 8000
```

Or:
```bash
# Node.js
npx http-server -p 8000
```

Or:
```bash
# PHP
php -S localhost:8000
```

Open: http://localhost:8000

#### Make Your Changes

Edit any of these files:
- `index.html` - Structure and content
- `styles.css` - Styling
- `app.js` - Application logic
- `i18n.js` - Translations

#### Test Changes

- ✅ Refresh browser to see changes
- ✅ Test all affected features
- ✅ Check browser console for errors (F12)
- ✅ Test mobile view (responsive design)
- ✅ Test all language options
- ✅ Test on different browsers (Chrome, Firefox, Safari)

### 2. Commit Changes

#### Check What Changed

```bash
cd /Users/chrissavides/Documents/Paymybill
git status
```

This shows which files you modified.

#### Stage Your Changes

```bash
# Add all changes
git add .

# Or add specific files
git add index.html styles.css
```

#### Commit with Message

```bash
git commit -m "Your descriptive commit message here"
```

**Good commit messages:**
- ✅ "Add Spanish translations for bill pay screen"
- ✅ "Fix mobile navigation menu styling"
- ✅ "Update check cashing fee display"

**Bad commit messages:**
- ❌ "Updates"
- ❌ "Fixed stuff"
- ❌ "Changes"

### 3. Push to GitHub

```bash
git push origin main
```

This automatically triggers deployment to Cloudflare Pages!

### 4. Monitor Deployment

#### Check GitHub

1. Go to: https://github.com/thesavides/paymybill
2. Click "Actions" tab (if you've set up GitHub Actions)
3. See the deployment running
4. Click on the running workflow to see details

#### Check Cloudflare

1. Go to: https://dash.cloudflare.com
2. Click "Workers & Pages"
3. Click "paymybill"
4. See deployment in progress
5. Watch the build log

**Typical deployment time:** 1-2 minutes

### 5. Verify Production

Once deployed:

1. Visit your production URL
2. Hard refresh: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)
3. Test the changes you made
4. Test on mobile devices
5. Test all critical flows:
   - Language switching
   - KYC verification
   - Check cashing
   - Navigation

## Testing Checklist

### Before Committing

- [ ] Code works locally
- [ ] No console errors
- [ ] All features tested
- [ ] Mobile view checked
- [ ] All languages work
- [ ] Code is clean (no debug logs)

### After Deploying

- [ ] Production site loads
- [ ] Changes are visible
- [ ] No broken features
- [ ] Mobile works
- [ ] Performance is good
- [ ] No console errors in production

## Common Workflows

### Adding a New Feature

```bash
# 1. Create feature branch (optional)
git checkout -b feature/new-payment-method

# 2. Develop and test locally
# ... make changes ...
# ... test thoroughly ...

# 3. Commit
git add .
git commit -m "Add support for new payment method"

# 4. Push and merge to main
git checkout main
git merge feature/new-payment-method
git push origin main

# 5. Deployment happens automatically
```

### Fixing a Bug

```bash
# 1. Identify the bug
# 2. Test and fix locally
# 3. Commit with clear message
git add .
git commit -m "Fix: Card number not displaying on Safari"

# 4. Push to deploy fix
git push origin main
```

### Updating Translations

```bash
# 1. Edit i18n.js
# 2. Test all language options locally
# 3. Commit
git add i18n.js
git commit -m "Add Yoruba translations for profile screen"

# 4. Deploy
git push origin main
```

### Updating Styles

```bash
# 1. Edit styles.css
# 2. Test responsive design
# 3. Commit
git add styles.css
git commit -m "Improve mobile menu spacing"

# 4. Deploy
git push origin main
```

## Rollback Procedure

If you deploy something broken:

### Quick Rollback (Git Revert)

```bash
# Revert the last commit
git revert HEAD

# Push to trigger new deployment with old code
git push origin main
```

### Rollback via Cloudflare Dashboard

1. Go to Cloudflare Dashboard
2. Click "Workers & Pages" → "paymybill"
3. Go to "Deployments" tab
4. Find the last working deployment
5. Click "⋮" menu → "Rollback to this deployment"

### Rollback to Specific Commit

```bash
# Find the commit you want to return to
git log --oneline

# Revert to that commit
git revert <commit-hash>

# Push
git push origin main
```

## Branch Strategy

### Main Branch (Production)

```
main ← Always deployable, always production-ready
```

### Feature Branches (Optional)

```
main
  ↓
  ├── feature/new-dashboard
  ├── feature/add-language
  └── bugfix/safari-issue
```

Create feature branch:
```bash
git checkout -b feature/description
# ... work on feature ...
git commit -m "Feature description"
git push origin feature/description
```

Merge to main:
```bash
git checkout main
git merge feature/description
git push origin main  # This deploys!
```

## Preview Deployments

Cloudflare automatically creates preview deployments for branches:

```bash
# Create a test branch
git checkout -b test/new-feature

# Push branch
git push origin test/new-feature
```

Access preview at:
```
https://test-new-feature.paymybill.pages.dev
```

## Environment-Specific Configuration

Currently, PayMyBill is a static site with no environment variables. If you add backend integration:

### Add Environment Variables in Cloudflare

1. Cloudflare Dashboard → paymybill → Settings
2. "Environment variables"
3. Add variables:
   - `API_ENDPOINT`: `https://api.paymybill.com`
   - `STRIPE_PUBLIC_KEY`: `pk_live_...`

### Use in Code

```javascript
// In your app.js (requires a build step)
const API_ENDPOINT = process.env.API_ENDPOINT || 'http://localhost:3000';
```

## Performance Optimization

### Before Deploying Major Changes

1. Test with Lighthouse:
   ```bash
   # Install Lighthouse CLI
   npm install -g lighthouse

   # Test locally
   lighthouse http://localhost:8000 --view
   ```

2. Check bundle size:
   ```bash
   # Check file sizes
   ls -lh *.html *.css *.js
   ```

3. Minify if needed (for production):
   ```bash
   # Install minification tools
   npm install -g clean-css-cli uglify-js html-minifier

   # Minify CSS
   cleancss -o styles.min.css styles.css

   # Minify JS
   uglifyjs app.js -o app.min.js -c -m
   uglifyjs i18n.js -o i18n.min.js -c -m

   # Update index.html to use minified files
   ```

## Monitoring

### Check Site Health

```bash
# Check if site is up
curl -I https://your-site.pages.dev

# Should return: HTTP/2 200
```

### Monitor Deployments

Set up notifications:
1. Cloudflare Dashboard → Notifications
2. Create alert for "Pages deployment failed"
3. Add your email

### View Analytics

1. Cloudflare Dashboard → paymybill
2. Click "Analytics" tab
3. See:
   - Page views
   - Unique visitors
   - Bandwidth usage
   - Top pages

## Troubleshooting

### Changes Not Showing After Deploy

1. Check deployment succeeded:
   - Cloudflare Dashboard shows "Success"
2. Clear cache:
   - Hard reload: `Cmd + Shift + R`
3. Check you're viewing the correct URL
4. Wait 2-3 minutes for CDN propagation

### Deployment Failed

1. Check logs in Cloudflare Dashboard
2. Common issues:
   - Missing files
   - Syntax errors
   - File size limits exceeded
3. Fix the issue
4. Push again

### Site is Down

1. Check Cloudflare status: https://www.cloudflarestatus.com
2. Check deployment history for recent changes
3. Rollback to last working deployment
4. Check your domain settings (if using custom domain)

## Best Practices

### Commit Often

```bash
# Make small, focused commits
git commit -m "Add validation to check amount field"
git commit -m "Update error message styling"
# Better than one big commit with everything
```

### Test Before Pushing

- Always test locally first
- Never push untested code to main
- Use feature branches for experimental work

### Write Clear Commit Messages

Follow this format:
```
Type: Brief description

- Detail 1
- Detail 2

Why this change was needed
```

### Keep Documentation Updated

When you make changes, update relevant docs:
- `README.md` - Main features
- `DEPLOYMENT.md` - Deployment info
- Comments in code

## Quick Reference Commands

```bash
# Check status
git status

# Stage and commit
git add .
git commit -m "Description"

# Push to deploy
git push origin main

# View recent commits
git log --oneline -5

# View diff before committing
git diff

# Undo uncommitted changes
git checkout -- filename

# View remote info
git remote -v

# Pull latest changes (if working with team)
git pull origin main
```

## Getting Help

### Check Logs

1. **Local**: Browser console (F12)
2. **GitHub**: Actions tab → Click workflow → View logs
3. **Cloudflare**: Dashboard → paymybill → Deployments → Click deployment → View logs

### Resources

- [Git Documentation](https://git-scm.com/doc)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

---

## Summary

**The simple workflow:**

1. Change code locally
2. Test it works: `python3 -m http.server 8000`
3. Commit: `git add . && git commit -m "Description"`
4. Deploy: `git push origin main`
5. Wait 2 minutes
6. Check production site

**That's it!** 🚀

Everything else in this document is for advanced scenarios and troubleshooting.

---

**Happy deploying!**
