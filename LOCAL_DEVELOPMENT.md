# Local Development Setup for PayMyBill

This guide will help you set up and test PayMyBill locally before committing to GitHub.

## Quick Start

### Option 1: Python HTTP Server (Simplest)

If you have Python installed (macOS/Linux usually do by default):

```bash
cd /Users/chrissavides/Documents/Paymybill
python3 -m http.server 8000
```

Then open: http://localhost:8000

### Option 2: Node.js HTTP Server

If you have Node.js installed:

```bash
# Install http-server globally (one-time setup)
npm install -g http-server

# Run the server
cd /Users/chrissavides/Documents/Paymybill
http-server -p 8000
```

Then open: http://localhost:8000

### Option 3: PHP Built-in Server

If you have PHP installed:

```bash
cd /Users/chrissavides/Documents/Paymybill
php -S localhost:8000
```

Then open: http://localhost:8000

### Option 4: Live Server (VS Code Extension)

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. The app will open automatically with auto-reload on changes

## Testing Workflow

### 1. Make Changes Locally
- Edit `index.html`, `styles.css`, `app.js`, or `i18n.js`
- Save your changes

### 2. Test Locally
- Refresh your browser (or it will auto-refresh with Live Server)
- Test all functionality:
  - ✅ Language switching
  - ✅ KYC flow
  - ✅ Check cashing
  - ✅ Navigation
  - ✅ Forms
  - ✅ Mobile view (use browser dev tools)

### 3. Test on Multiple Browsers
- Chrome
- Firefox
- Safari
- Mobile view in dev tools

### 4. Commit to Git
Once you're satisfied with your changes:

```bash
# Check what changed
git status

# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "Description of your changes"

# Push to GitHub (this will trigger Cloudflare deployment)
git push origin main
```

### 5. Cloudflare Auto-Deploy
- Cloudflare Pages automatically detects the push to GitHub
- It will build and deploy your changes
- Check the deployment at your Cloudflare Pages URL

## Development Tips

### Hot Reload
Use Live Server in VS Code for automatic browser refresh on file changes.

### Browser Console
Always test with the browser console open (F12 or Cmd+Option+I) to catch any JavaScript errors.

### Mobile Testing
Use Chrome DevTools Device Mode:
1. Open DevTools (F12)
2. Click the device toolbar icon (Cmd+Shift+M)
3. Test different device sizes

### Clear Cache
If changes don't appear:
- Hard reload: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Or clear browser cache

## File Structure

```
Paymybill/
├── index.html          # Main HTML (all screens)
├── styles.css          # All styling
├── app.js              # Application logic
├── i18n.js             # Translations
├── .gitignore          # Git ignore rules
├── README.md           # Main documentation
└── LOCAL_DEVELOPMENT.md # This file
```

## Common Issues

### Port Already in Use
If port 8000 is taken, use a different port:
```bash
python3 -m http.server 8001
```

### Changes Not Showing
- Hard reload (Cmd+Shift+R)
- Check browser console for errors
- Make sure you saved the file

### Git Push Fails
```bash
# If you need to pull first
git pull origin main --rebase

# Then push
git push origin main
```

## Pre-Commit Checklist

Before committing and pushing:

- [ ] Tested in local browser
- [ ] All features work
- [ ] No console errors
- [ ] Mobile view looks good
- [ ] All languages work
- [ ] Git status looks correct
- [ ] Commit message is descriptive

## Next Steps

After local testing is successful:
1. Commit your changes
2. Push to GitHub
3. Cloudflare will auto-deploy
4. Check your live site at your Cloudflare Pages URL
5. Test the production deployment

---

**Happy coding! 🚀**
