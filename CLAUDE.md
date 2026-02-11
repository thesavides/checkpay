# CheckPay - Project Handoff

## What is CheckPay?
A multilingual check-to-card wallet web app targeting ITIN-based users (immigrants without SSN). Users deposit payroll checks via Remote Deposit Capture (RDC), verify identity (KYC), receive a virtual debit card, and can pay bills — all without a traditional bank account. Currently a frontend demo/prototype with no backend.

## Tech Stack
- **Vanilla HTML/CSS/JS** — no frameworks, no build step
- **Static site** — served directly, no compilation needed
- **Cloudflare Pages** — hosting & auto-deploy
- **GitHub** — source control

## Project Files
```
/Users/chrissavides/checkpay/
├── index.html                  # Marketing/landing page (self-contained CSS & JS, FAQ, responsive)
├── app.html                    # Main app (all screens: welcome, KYC-A, dashboard, check clearing w/ KYC-B, card, bill pay, profile)
├── app.js                      # App logic & state management (~1003 lines)
├── styles.css                  # App styles (used by app.html, ~1968 lines)
├── i18n.js                     # Internationalization — English, Spanish, Filipino, Yoruba (~859 lines)
├── favicon.svg                 # App favicon (teal wallet icon)
├── clearpath-icon.svg          # ClearPath Bank favicon (blue bank icon — clearing partner)
├── horizon-icon.svg            # Horizon Card Bank favicon (orange card icon — card issuer)
├── translations-reference.csv  # Master translation table (133+ keys x 4 languages) — source of truth for i18n
├── start-local.sh              # Local dev server script (runs python3 http.server)
├── .gitignore                  # Ignores .DS_Store, .env, .claude/, node_modules/, Screenshots/
├── CLAUDE.md                   # This file (handoff document)
└── USER-JOURNEYS.md            # User journey documentation with partner integration notes
```

## Partner Ecosystem

### Bank Partners (Demo Names)
| Partner | Role | Demo Name | Real-World Equivalent |
|---------|------|-----------|----------------------|
| **Sponsor / Clearing Bank** | Clears checks via RDC, holds sponsor bank license, sets KYC requirements | ClearPath Bank | Sponsor bank (e.g. Sunrise Banks) |
| **Issuing Bank** | Issues virtual/physical cards, holds user account balance | Horizon Card Bank | Could be same as sponsor bank or separate issuer |

**Key distinction:** The sponsor bank and issuing bank can be the same institution, but in this demo they are separate to illustrate the multi-party model. The sponsor bank drives the KYC requirements for both account opening and check deposits.

### Technology Partners (Production)
| Partner | Role | Integration Point |
|---------|------|-------------------|
| **RDC Provider** (e.g. Ingo Money) | Remote Deposit Capture — check image processing, validation, and clearing | Check clearing flow (Steps 1-2: front/back capture, Step 4: submit & timeline) |
| **KYC Provider** | Identity verification per sponsor bank & issuing bank requirements | KYC-A (account setup) and KYC-B (per-deposit). May require split/asynchronous KYC |
| **TabaPay** | Bill payments via Mastercard Bill Pay rails | Bill pay flow |
| **Stripe** | Card payments for bill payment and future services | Bill pay checkout, future payment services |
| **Card Issuer/Processor** | Virtual & physical card issuance, PAN management | Card screen, physical card request |

### KYC Requirements Note
KYC is driven by the sponsor bank and issuing bank requirements. In production, this may require a **split synchronous KYC** approach — where identity verification data is collected once but validated against requirements from both the sponsor bank (for check clearing eligibility) and the issuing bank (for card issuance eligibility). The demo simplifies this into two distinct flows: KYC-A (one-time account setup) and KYC-B (per-deposit verification).

## App Architecture

### Design Principles
- **Safety-first tone** — reassurance messaging throughout, no compliance jargon
- **ITIN-native** — never references SSN, uses ITIN as primary tax ID
- **Persistent financial visibility** — balance header visible on all authenticated screens
- **KYC differentiation** — KYC-A (one-time account setup) vs KYC-B (per-deposit verification)
- **Trust-building** — encryption notes, "safer than standing in line" messaging, no fear-inducing language
- **Bank partner transparency** — disclaimers show which bank clears checks and which holds funds/issues cards
- **Demo-first** — no form validation enforced, all flows are clickable end-to-end

### State Management
- `isAuthenticated` flag controls balance header visibility and screen routing
- `userData` object stores `fullName` and `itinLast4` after KYC-A completion
- Screen navigation via `showScreen(screenId)` which manages active classes and balance header
- URL parameter `?mode=signin` routes returning users directly to dashboard
- `setupDashboard(mode)` configures dashboard for 'returning' (balance + active card + transactions) vs new user ($0.00 + pending card + empty)
- All state is in-memory (resets on page reload — no backend persistence)

### Two Dashboard States
| Aspect | New User (post-signup) | Returning User (sign-in) |
|--------|----------------------|------------------------|
| **Available Balance** | $0.00 | $1,234.56 |
| **Pending Balance** | $0.00 (→ $850.00 after check submit) | $850.00 |
| **Card Preview** | Masked (••••), "Pending" badge, "Pending Activation" | ••••4532, expiry 12/26, active |
| **Transactions** | Empty state ("No transactions yet") | Mock history (Check Deposit, Electric Bill, etc.) |
| **Triggered by** | Completing KYC-A provisioning | `?mode=signin` URL param or "Sign In" button |

### Dynamic Balance Flow
1. After signup: $0.00 available, $0.00 pending
2. After submitting a check: $0.00 available, $850.00 pending (header updates immediately)
3. After deposit clears ("Back to Dashboard"): $1,234.56 available, $850.00 pending, card activated, transactions loaded

### Screens & Features (in app.html)
1. **Welcome Screen** — "Get an Account" button, "Already have an account? Sign In" shortcut, auto-detected language, "Back to Home" link, language selector
2. **KYC-A Screen (Account Verification)** — 4-step flow:
   - Step 1: Personal Info form (full name, DOB, ITIN, address, city, state, ZIP) + T&C checkbox
   - Step 2: Government ID upload (passport/ID photo)
   - Step 3: Selfie capture (liveness verification)
   - Step 4: Provisioning animation (verify identity → create virtual card → activate wallet)
3. **Dashboard** — balance card with bank disclaimer, virtual card preview with issuer badge, quick actions (clear check, view card, pay bill), recent transactions
4. **Persistent Balance Header** — fixed bar showing Available + Pending + "Funds held by Horizon Card Bank" disclaimer
5. **Clear Check** — 4-step flow:
   - Step 1: Capture check front
   - Step 2: Capture check back
   - Step 3: **KYC-B (Secure Deposit Confirmation)** — selfie verification, ITIN last-4 confirmation, "payable to me" checkbox, endorsement instructions
   - Step 4: Confirm & submit (with ClearPath Bank disclaimer + T&C checkbox) → **Deposit Timeline** (5-stage animated tracker: Submitted → Under Review → Accepted → Pending → Cleared) with dual bank disclaimer
6. **Virtual Card** — full card display with "Issued by Horizon Card Bank" disclaimer + link to issuer, reveal PAN, Apple/Google Pay buttons, freeze toggle, spending limits, change PIN, request physical card
7. **Request Physical Card** — modal with postal address verification form (street, apt, city, state, ZIP)
8. **Bill Pay** — 4-step enhanced flow: select state/utility/biller → enter details → review → Stripe-style checkout → confirmation
9. **Transactions** — filterable list (all/pending/completed/failed)
10. **Profile & Settings** — personal info, language modal, notifications, security, support, sign out (→ landing page)
11. **Language Modal** — accessible from Profile and welcome screen, shows 4 languages with checkmark
12. **Success Modal** — reusable success confirmation

### Bank Partner Disclaimers (6 locations)
| Location | Disclaimer | Bank |
|----------|-----------|------|
| Balance header bar | "Funds held by Horizon Card Bank" | Issuing bank |
| Dashboard balance card | "Your funds are held by Horizon Card Bank" | Issuing bank |
| Dashboard card preview | "Issued by Horizon Card Bank" | Issuing bank |
| Full card screen | "Issued by Horizon Card Bank" + "Visit Horizon Card Bank →" link | Issuing bank |
| Check confirm (Step 4) | "Your check will be processed by ClearPath Bank" | Clearing bank |
| Deposit timeline | "Processed by ClearPath Bank • Card issued by Horizon Card Bank" | Both |

### KYC-A vs KYC-B Distinction
| | KYC-A (Account Verification) | KYC-B (Secure Deposit Confirmation) |
|---|---|---|
| **When** | One-time, during onboarding | Every check deposit |
| **Purpose** | Activate account + virtual card | Protect individual deposit |
| **Steps** | Personal info → ID → Selfie → Provisioning | Selfie → ITIN confirm → Payable checkbox → Endorsement |
| **Messaging** | "One-time setup to activate your account" | "Required by the clearing bank to protect your deposit" |
| **Location** | Standalone KYC screen | Embedded in check clearing flow (step 3 of 4) |
| **T&C** | Checkbox on Step 1 (Terms & Conditions + Privacy Policy) | Checkbox on Step 4 confirm (Deposit Terms) |
| **Production driver** | Sponsor bank + issuing bank requirements (possibly split synchronous KYC) | Sponsor bank + RDC provider requirements |

## Landing Page (index.html)

### Structure
- **Navigation** — CheckPay logo, Features, How It Works, FAQ links, language selector, Sign In (→ `app.html?mode=signin`), Get Started (→ `app.html`)
- **Hero** — "Clear Your Payroll Check, Get Your Card Instantly" + CTA buttons + stats (2-3 min, 4 languages, 24/7)
- **Phone Mockup** — interactive dashboard preview with balance, card, quick actions
- **Features Grid** — 6 cards: Payroll Check Clearing, Virtual Debit Card, Secure KYC Verification, Bill Payments, Mobile Top-Up, Multi-Language Support
- **How It Works** — 4 steps: Verify Identity → Upload Check → Receive Card → Start Transacting
- **Languages** — 4-language grid (English, Spanish, Filipino, Yoruba)
- **FAQ** — 12-question accordion covering: What is CheckPay, SSN requirements, account creation, identity verification, immigration concerns, deposit confirmation, surveillance, funds timing, fees, money safety, cash withdrawal, bank partners
- **CTA Section** — "Sign up, create your account, scan a check, and get paid."

### Responsive Breakpoints
- **968px** — single-column hero, hide text nav links, reduce button sizes
- **640px** — smaller headings, stacked CTAs, tighter padding, 2-col language grid
- **480px** — further reduced nav (smaller logo, tighter gaps, compact buttons)

### Metadata
- Title: "CheckPay - Sign Up, Scan a Check, Get Paid"
- Open Graph tags for social sharing
- Theme color: #009688 (teal)
- SVG favicon

## Internationalization (i18n)

### Supported Languages
- English (en) — **master/source language**
- Spanish (es) — primary immigrant demographic
- Filipino (ph) — uses natural Taglish (Tagalog-English code-switching)
- Yoruba (yo) — **needs native speaker review**

### How i18n Works
- All UI strings use `data-i18n="namespace.key"` attributes in HTML
- Translations stored in `i18n.js` as nested objects under `i18n.locales`
- `i18n.t('namespace.key')` retrieves translation, returns `null` if missing (allows JS fallback with `||`)
- `i18n.updateUI()` updates all `[data-i18n]` elements in DOM
- Auto-detects language from `navigator.language` on first visit (es→es, fil/tl→ph, yo→yo, default en)
- Stored in `localStorage` as `checkpay-language`

### Translation Quality Status
| Language | Rating | Notes |
|----------|--------|-------|
| Spanish (es) | **Production-ready** | Natural, consistent, appropriate for Mexican/Central American audience |
| Filipino (ph) | **Production-ready** | Good Taglish style, appropriate for US-based Filipino users |
| Yoruba (yo) | **Needs native review** | Some fabricated words fixed, but grammar patterns and diacritical consistency need native speaker pass |

### Known i18n Gaps
- Bill pay flow has some hardcoded English labels (step names "Biller", "Details", "Review", "Pay" and form labels)
- Bank disclaimer text is hardcoded English (not yet in i18n system)
- T&C checkbox text is hardcoded English
- Some unused translation keys exist in `i18n.js` (harmless)

## Git & Deployment

### Repository
- **GitHub:** `git@github.com:thesavides/checkpay.git` (SSH)
- **Branch:** `main`

### Commit History
```
b15df09 Add bank partner disclaimers, favicons, T&C checkboxes, and bank FAQ
6fe97d4 Dynamic balance: pending updates on check submit, clears to available on deposit
0b675c5 Fix user journeys: Sign In routes to dashboard, two auth states, mobile nav
dbaba62 Update landing page: cash check → clear payroll check messaging
78483ba Add Sign Out redirect to landing page and Sign In link on landing nav
d293abe Add Request Physical Card flow with postal address verification
d5cd18d New user dashboard: zero balance, pending card, empty transactions, cash FAQ
fce2fb3 Rename Get Started button to Get an Account across all languages
42115d1 Update metadata to new CTA messaging and add SVG favicon
481e500 Demo polish: remove form validation, unify CTAs, add language selector
0707690 Improve responsive design for mobile and wrapper compatibility
4cc1cd4 Add FAQ section to landing page and back-to-home link in app
10d17e3 Remove loading spinner screen for demo version
b529ecb Phase 1 demo polish: KYC-A/B flows, deposit timeline, balance header, i18n audit
9cede01 Add local dev setup: .gitignore and start-local.sh
b6109f7 Merge pull request #1 from thesavides/claude/checkpay-bill-payment-QyCH7
dc7e4eb Rename project from PayMyBill to CheckPay across all config and source files
d672ed9 Add wrangler dependency for Cloudflare Pages deployment
4e3f2c9 Rename to CheckPay, add multi-step bill payment flow with Stripe-style checkout
155ca06 Fix wrangler.toml for Cloudflare Pages compatibility
eea609d Add complete local development and automated deployment setup
85c6f51 Initial commit: PayMyBill app
```

### Auto-Deploy Pipeline
- Push to `main` → GitHub triggers Cloudflare Pages build → deployed in ~1-2 minutes
- **Production URL:** https://checkpay.pages.dev
- **Cloudflare dashboard:** dash.cloudflare.com → Workers & Pages → checkpay

### Workflow
```bash
# 1. Test locally
cd /Users/chrissavides/checkpay
./start-local.sh            # Serves on http://localhost:8000, auto-opens browser

# 2. Commit changes
git add <files>
git commit -m "description"

# 3. Deploy
git push origin main        # Auto-deploys to Cloudflare Pages
```

## Local Development
- **Script:** `./start-local.sh [port]` (default port 8000)
- **Manual:** `python3 -m http.server 8080` from the project directory
- **Landing page:** http://localhost:8000/index.html
- **App (new user):** http://localhost:8000/app.html
- **App (returning user):** http://localhost:8000/app.html?mode=signin

## Current State (Feb 2025)
- ✅ Phase 1 demo polish complete
- ✅ Phase 2 demo polish complete (user journeys, bank disclaimers, responsive, FAQ)
- ✅ All changes committed and deployed to production
- ✅ Two user journeys working (new signup + returning sign-in)
- ✅ Dynamic balance flow (pending → cleared)
- ✅ Bank partner disclaimers at all key touchpoints
- ✅ T&C checkboxes on signup and check clearing
- ✅ FAQ with 12 questions including bank partners and cash withdrawal
- ✅ Mobile responsive (968px, 640px, 480px, 380px breakpoints)
- ✅ 4-language support (en, es, ph, yo)

## Phase 3 — Production Build (Future)

### Recommended Tech Stack
- **TypeScript everywhere** — Node.js backend + React Native frontend
- **PostgreSQL** — database
- **Architecture:** Aligned with TOGAF document (Scenario A/B/C/D for offshore vs domestic account provisioning)

### Key Integrations
| Integration | Provider | Purpose |
|-------------|----------|---------|
| Sponsor Bank | TBD (e.g. Sunrise Banks) | Bank license, KYC requirements, check clearing |
| RDC | Ingo Money (or similar) | Remote Deposit Capture — check image processing & validation |
| KYC/Identity | TBD | Identity verification per sponsor + issuing bank requirements (possibly split synchronous) |
| Card Issuing | TBD | Virtual & physical card issuance, PAN management |
| Bill Pay | TabaPay | Mastercard Bill Pay rails |
| Payments | Stripe | Card payments for bills and future services |

### Production KYC Architecture
- KYC-A may require **split synchronous verification** — a single data collection step validated against both sponsor bank and issuing bank requirements simultaneously
- KYC-B (per-deposit) driven by sponsor bank and RDC provider requirements
- Liveness detection, document verification, and ITIN validation need real third-party integrations

### Production i18n Plan
- Use Claude API for auto-translation from English master
- CSV reference table feeds the translation pipeline
- Mandatory native speaker review for Yoruba

## Known Limitations / TODO
- **No backend** — all features are mocked/demo
- **No tests**
- **No custom domain** — using checkpay.pages.dev
- **Bill pay i18n incomplete** — step labels and form labels still hardcoded English
- **Bank disclaimers not in i18n** — hardcoded English
- **T&C text not in i18n** — hardcoded English
- **Yoruba translations** — need native speaker review before production use
- **T&C links are placeholder** (#) — need actual terms documents
- **Card issuer link is placeholder** (#) — needs real bank URL
- **Form validation removed** — all fields are optional for demo purposes
