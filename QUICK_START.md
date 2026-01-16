# PayMyBill - Quick Start Guide

## ⚡ Test Locally RIGHT NOW

Run this command in your terminal:

```bash
cd /Users/chrissavides/Documents/Paymybill
./start-local.sh
```

This will:
1. Start a local web server at http://localhost:8000
2. Automatically open your browser
3. Show you the PayMyBill app running locally

**That's it!** Your app should be running.

---

## 🚀 Deploy to Cloudflare

### Your Cloudflare Info

- **Project**: paymybill
- **Live URL**: https://af63a98d.paymybill.pages.dev
- **Status**: Already deployed and working!

### Method 1: Automatic (via GitHub)

When you push to GitHub, Cloudflare automatically deploys:

```bash
# Make changes to your code
# Then commit and push:

git add .
git commit -m "Describe your changes"
git push origin main
```

Wait 1-2 minutes, then check: https://af63a98d.paymybill.pages.dev

### Method 2: Manual (Direct Deploy)

Install Wrangler CLI first:
```bash
npm install -g wrangler
```

Then deploy:
```bash
cd /Users/chrissavides/Documents/Paymybill
./deploy-cloudflare.sh
```

---

## 🔧 Quick Commands

### Start Local Development
```bash
./start-local.sh
```

### Check Git Status
```bash
git status
```

### Commit Changes
```bash
git add .
git commit -m "Your message here"
```

### Deploy to Production
```bash
git push origin main
```

### Manual Deploy to Cloudflare
```bash
./deploy-cloudflare.sh
```

---

## 📁 Key Files

| File | What It Does |
|------|--------------|
| `index.html` | Main app HTML |
| `styles.css` | All styling |
| `app.js` | App logic |
| `i18n.js` | Translations |
| `start-local.sh` | Start local server |
| `deploy-cloudflare.sh` | Deploy to Cloudflare |

---

## 🆘 Troubleshooting

### Local server won't start

Try manually:
```bash
python3 -m http.server 8000
```

Then open: http://localhost:8000

### Changes not showing locally

- Hard refresh: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)
- Make sure you saved the file

### Git push fails

```bash
# Pull first, then push
git pull origin main --rebase
git push origin main
```

### Cloudflare deployment not working

1. Check your deployment at: https://dash.cloudflare.com
2. Go to "Workers & Pages" → "paymybill"
3. Check deployment logs

---

## ✅ Your Setup is Complete!

Everything is configured and ready to use:

- ✅ Local development: `./start-local.sh`
- ✅ Git repository connected
- ✅ Cloudflare auto-deploy enabled
- ✅ Production URL: https://af63a98d.paymybill.pages.dev

**Start developing now!** Make changes, test locally, then push to deploy.

---

## 📚 More Information

- `LOCAL_DEVELOPMENT.md` - Detailed local dev guide
- `DEPLOYMENT_WORKFLOW.md` - Complete workflow documentation
- `CLOUDFLARE_AUTOMATION_SETUP.md` - Advanced Cloudflare setup
- `README.md` - Full app documentation

---

## 🎯 Next Steps

1. Run `./start-local.sh` to test the app
2. Make a small change (edit `index.html`)
3. Test it locally
4. Commit: `git add . && git commit -m "Test change"`
5. Deploy: `git push origin main`
6. Check production: https://af63a98d.paymybill.pages.dev

**That's your complete workflow!** 🎉
