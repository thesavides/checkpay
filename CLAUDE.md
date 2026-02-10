# CheckPay - Session Handoff

## Project Overview

**CheckPay** (formerly PayMyBill) is a static single-page web app for check cashing and bill payment. It provides a multi-step bill payment flow with a Stripe-style checkout experience. The app supports i18n (internationalization).

- **GitHub repo**: `thesavides/paymybill` (repo was renamed from `paymybill` but GitHub still uses old name internally)
- **Hosting**: Cloudflare Pages (project name: `checkpay`)
- **Stack**: Vanilla HTML/CSS/JS — no build step, no framework

## File Structure

| File | Purpose |
|---|---|
| `index.html` | Landing page / marketing site |
| `app.html` | Main application (bill payment flow) |
| `app.js` | Application logic |
| `styles.css` | Shared styles |
| `i18n.js` | Internationalization / translations |
| `wrangler.toml` | Cloudflare Pages config (project: `checkpay`, output dir: `.`) |
| `.github/workflows/cloudflare-deploy.yml` | GitHub Actions CI/CD to Cloudflare Pages |
| `deploy-cloudflare.sh` | Manual Cloudflare deploy script |
| `start-local.sh` | Local dev server script |
| `package.json` | Only dependency is `wrangler` (for local dev/deploy) |

## Deployment

- **Auto-deploy**: Pushes to `main` trigger GitHub Actions → Cloudflare Pages
- **Requires secrets**: `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in GitHub repo settings
- **No build command** — static files are deployed directly from repo root
- **Pages build output dir**: `.` (the entire repo root)

## Known Issue: Cloudflare Pages Git Connection

The Cloudflare Pages project `checkpay` was created when the repo was named `paymybill`. Cloudflare Pages does not allow changing the connected Git repository on an existing project. To fix the stale connection:

1. Delete the `checkpay` project in Cloudflare Pages dashboard
2. Recreate it, connecting to `thesavides/checkpay` (the renamed repo)
3. Settings: production branch `main`, no build command, no build output dir
4. Re-add any custom domains

The GitHub Actions workflow deployment (`cloudflare/pages-action@v1`) works independently of the Cloudflare dashboard Git connection, so CI/CD deploys via API token are unaffected.

## Development

```bash
# Install deps (just wrangler)
npm install

# Local dev
./start-local.sh
# or
npx wrangler pages dev .

# Manual deploy
./deploy-cloudflare.sh
```

## Git Conventions

- Default branch: `main`
- Feature branches: `claude/<feature>-<id>` pattern
- Commit messages: short imperative descriptions
