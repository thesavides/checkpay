# CheckPay - Project Handoff

## What is CheckPay?
A multilingual check-to-card wallet web app targeting ITIN-based users (immigrants without SSN). Users upload paychecks via Remote Deposit Capture (RDC), verify identity (KYC), receive a virtual debit card, and can pay bills — all without a traditional bank account. Currently a frontend demo/prototype with no backend. The sponsor bank partner is Sunrise Banks.

## Tech Stack
- **Vanilla HTML/CSS/JS** — no frameworks, no build step
- **Static site** — served directly, no compilation needed
- **Cloudflare Pages** — hosting & auto-deploy
- **GitHub** — source control

## Project Files
```
/Users/chrissavides/checkpay/
├── index.html                  # Marketing/landing page (self-contained CSS & JS)
├── app.html                    # Main app (all screens: welcome, KYC-A, dashboard, check cashing w/ KYC-B, card, bill pay, profile)
├── app.js                      # App logic & state management (~979 lines)
├── styles.css                  # App styles (used by app.html, ~1789 lines)
├── i18n.js                     # Internationalization — English, Spanish, Filipino, Yorùbá (~839 lines)
├── translations-reference.csv  # Master translation table (133 keys × 4 languages) — source of truth for i18n
├── start-local.sh              # Local dev server script (runs python3 http.server)
├── .gitignore                  # Ignores .DS_Store, .env, .claude/, node_modules/, Screenshots/
└── CLAUDE.md                   # This file
```

## App Architecture

### Design Principles
- **Safety-first tone** — reassurance messaging throughout, no compliance jargon
- **ITIN-native** — never references SSN, uses ITIN as primary tax ID
- **Persistent financial visibility** — balance header visible on all authenticated screens
- **KYC differentiation** — KYC-A (one-time account setup) vs KYC-B (per-deposit verification)
- **Trust-building** — encryption notes, "safer than standing in line" messaging, no fear-inducing language

### State Management
- `isAuthenticated` flag controls balance header visibility and screen routing
- `userData` object stores `fullName` and `itinLast4` after KYC-A completion
- Screen navigation via `showScreen(screenId)` which manages active classes and balance header
- All state is in-memory (resets on page reload — no backend persistence)

### Screens & Features (in app.html)
1. **Welcome Screen** — get started button, "Sign In" shortcut (skips KYC for demo), auto-detected language
2. **KYC-A Screen (Account Verification)** — 4-step flow:
   - Step 1: Personal Info form (full name, DOB, ITIN, address, city, state, ZIP)
   - Step 2: Government ID upload (passport/ID photo)
   - Step 3: Selfie capture (liveness verification)
   - Step 4: Provisioning animation (verify identity → create virtual card → activate wallet)
3. **Dashboard** — balance card with show/hide toggle, virtual card preview, quick actions (cash check, view card, pay bill), recent transactions
4. **Persistent Balance Header** — fixed bar showing Available Balance ($1,234.56) and Pending ($850.00) on all authenticated screens
5. **Cash Check** — 4-step flow:
   - Step 1: Capture check front
   - Step 2: Capture check back
   - Step 3: **KYC-B (Secure Deposit Confirmation)** — selfie verification, ITIN last-4 confirmation, "payable to me" checkbox, endorsement instructions
   - Step 4: Confirm & submit → **Deposit Timeline** (5-stage animated tracker: Submitted → Under Review → Accepted → Pending → Cleared)
6. **Virtual Card** — full card display, reveal PAN, Apple/Google Pay buttons, freeze toggle, spending limits, change PIN
7. **Bill Pay** — 4-step enhanced flow: select state/utility/biller → enter details → review → Stripe-style checkout → confirmation
8. **Transactions** — filterable list (all/pending/completed/failed)
9. **Profile & Settings** — personal info, language modal, notifications, security, support, sign out
10. **Language Modal** — accessible from Profile, shows 4 languages with checkmark on current selection
11. **Success Modal** — reusable success confirmation

### KYC-A vs KYC-B Distinction
| | KYC-A (Account Verification) | KYC-B (Secure Deposit Confirmation) |
|---|---|---|
| **When** | One-time, during onboarding | Every check deposit |
| **Purpose** | Activate account + virtual card | Protect individual deposit |
| **Steps** | Personal info → ID → Selfie → Provisioning | Selfie → ITIN confirm → Payable checkbox → Endorsement |
| **Messaging** | "One-time setup to activate your account" | "Required by the clearing bank to protect your deposit" |
| **Location** | Standalone KYC screen | Embedded in check cashing flow (step 3 of 4) |

## Internationalization (i18n)

### Supported Languages
- English (en) — **master/source language**
- Spanish (es) — primary immigrant demographic
- Filipino (ph) — uses natural Taglish (Tagalog-English code-switching)
- Yorùbá (yo) — **needs native speaker review** (see translation audit notes below)

### How i18n Works
- All UI strings use `data-i18n="namespace.key"` attributes in HTML
- Translations stored in `i18n.js` as nested objects under `i18n.locales`
- `i18n.t('namespace.key')` retrieves translation, returns `null` if missing (allows JS fallback with `||`)
- `i18n.updateUI()` updates all `[data-i18n]` elements in DOM
- Auto-detects language from `navigator.language` on first visit (es→es, fil/tl→ph, yo→yo, default en)
- Stored in `localStorage` as `checkpay-language`

### Translation Reference
- **Master table:** `translations-reference.csv` — 133 keys × 4 languages, sorted by namespace
- English column is the source of truth; other languages should match its meaning
- When adding new keys: add to English in `i18n.js` first, then update CSV, then translate

### Translation Quality Status (audited Feb 2025)
| Language | Rating | Notes |
|----------|--------|-------|
| Spanish (es) | **Production-ready** | Natural, consistent, appropriate for Mexican/Central American audience |
| Filipino (ph) | **Production-ready** | Good Taglish style, appropriate for US-based Filipino users |
| Yorùbá (yo) | **Needs native review** | Some fabricated words fixed, but grammar patterns and diacritical consistency need native speaker pass |

### Known i18n Gaps
- Bill pay flow has some hardcoded English labels (step names "Biller", "Details", "Review", "Pay" and form labels) without `data-i18n` attributes — pre-existing, not part of Phase 1
- Some unused translation keys exist in `i18n.js` (leftover from pre-Phase 1 code) — harmless

### Future i18n Architecture (Phase 2 planning note)
The owner wants to use Claude API for auto-translation in Phase 2. Workflow would be:
1. Add/edit English keys in `i18n.js`
2. Export to CSV (or use CSV as source of truth)
3. API call to translate new/changed English keys → es, ph, yo
4. Human review for Yorùbá (required)
5. Import back to `i18n.js`

## Phase 1 Demo Polish — What Was Done

### Context
A comprehensive UX redesign specification was provided covering state machines, messaging frameworks, KYC differentiation, persistent balance headers, and more. Phase 1 polished the existing vanilla JS demo to align with that spec — without introducing a framework or backend. The goal was a presentation-ready clickable prototype.

### Changes Made (Feb 2025)

#### 1. Removed All Blue Info Boxes
- Deleted 7 `div.info-box` elements from `app.html` that showed instructional text at the top of each process step
- These were identified as "fake interstitials" that cluttered the UI
- Affected: KYC passport, KYC selfie, check front, check back, check confirm, bill pay review, bill pay processing

#### 2. Footer Copyright
- `index.html`: Changed `© 2024` → `© 2025`

#### 3. Welcome Screen + Language Relocation
- Removed language selector dropdown from welcome screen
- Added auto-detect language from `navigator.language` on first visit
- Added "Already have an account? Sign In" link (demo shortcut: sets auth=true, skips to dashboard)
- Moved language selection to a modal accessible from Profile → Language settings

#### 4. Persistent Balance Header
- Fixed bar at top of viewport showing Available Balance + Pending Balance
- Visible only on authenticated screens (dashboard, check, card, transactions, billpay, profile)
- Hidden during welcome and KYC-A flows
- Uses `has-balance-header` class on `.app-container` to push screen content down 48px

#### 5. KYC-A Expanded (2 steps → 4 steps)
- **Step 1 (NEW):** Personal Info form — full name, DOB, ITIN (with privacy hint), address fields
- **Step 2:** Government ID upload (existing, rewired)
- **Step 3:** Selfie capture (existing, rewired)
- **Step 4 (NEW):** Provisioning animation — 3-phase setup (verify identity → create card → activate wallet) → stores userData → navigates to dashboard with success modal
- Added reassurance banner: "One-time setup to activate your account. Your data is encrypted and protected."
- Added encrypted note under ID upload: "Your documents are encrypted end-to-end"

#### 6. KYC-B Added to Check Flow (3 steps → 4 steps)
- **Step 3 (NEW):** Secure Deposit Confirmation inserted between Back and Confirm
  - Selfie/liveness capture
  - ITIN last-4 auto-display from `userData.itinLast4`
  - "This check is payable to me" checkbox
  - Endorsement instructions (sign back + write "For mobile deposit only - CheckPay")
  - Continue enabled when selfie taken AND checkbox checked
- Added reassurance: "This replaces standing in line at a check cashing store"
- Added "Safer than standing in line" banner on confirm screen

#### 7. Deposit Timeline Tracking
- Replaced old processing spinner with 5-stage vertical timeline
- Stages: Submitted → Under Review → Accepted → Pending (Clearing) → Cleared
- Each stage animates sequentially (~2s intervals) with timestamps
- Active stage dot pulses (teal), completed stages turn green
- Shows deposit amount card below timeline
- "Back to Dashboard" button appears after Cleared stage

#### 8. Translation Audit & Fixes (10 corrections)
- **Spanish (1 fix):** `checkVerify.itinConfirm` grammar correction
- **Filipino (2 fixes):** fabricated word "Kliniklir" fixed, semantic mismatch on "payableToMe" fixed
- **Yorùbá (7 fixes):** fabricated words replaced ("Onitelorun", "ipamora", "alag-bẹka"), alarming "Pa" (kill) changed to "Da...Duro" (stop) for freeze card, broken comparative grammar fixed, meaningless "jeje" replaced
- Created `translations-reference.csv` as master source of truth

### Files Modified in Phase 1
| File | Lines | Nature of Changes |
|------|-------|------------------|
| `app.html` | ~1100 | Screen structure overhaul — new KYC-A steps, KYC-B verify step, deposit timeline, balance header, language modal |
| `app.js` | ~979 | Complete logic rewrite — auth state, 4-step KYC-A handlers, KYC-B handlers, deposit timeline animation, language modal |
| `styles.css` | ~1789 | ~200 lines of new component styles added at end (balance header, reassurance banner, timeline, KYC-B, language picker) |
| `i18n.js` | ~839 | Complete rewrite — auto-detect language, ~35 new translation keys (4 languages), 10 quality fixes |
| `index.html` | ~819 | Footer copyright only |
| `translations-reference.csv` | 134 | NEW — master translation table |

## Git & Deployment

### Repository
- **GitHub:** `git@github.com:thesavides/checkpay.git` (SSH)
- **Branch:** `main`
- **Repo was renamed** from `paymybill` → `checkpay`

### Commit History
```
9cede01 Add local dev setup: .gitignore and start-local.sh
b6109f7 Merge pull request #1 from thesavides/claude/checkpay-bill-payment-QyCH7
dc7e4eb Rename project from PayMyBill to CheckPay across all config and source files
d672ed9 Add wrangler dependency for Cloudflare Pages deployment
4e3f2c9 Rename to CheckPay, add multi-step bill payment flow with Stripe-style checkout
155ca06 Fix wrangler.toml for Cloudflare Pages compatibility
eea609d Add complete local development and automated deployment setup
85c6f51 Initial commit: PayMyBill app
```

**UNCOMMITTED:** Phase 1 changes are complete but NOT yet committed. All 5 source files + CLAUDE.md + translations-reference.csv are modified/new.

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
- **Landing page:** http://localhost:8000/index.html (or whatever port)
- **App:** http://localhost:8000/app.html

## Current State (Feb 2025)
- ✅ Phase 1 demo polish complete (all 8 implementation steps done)
- ✅ Cross-file validation passed (100+ ID references, all i18n keys, all event handlers, all CSS classes verified)
- ✅ JavaScript syntax validation passed (app.js and i18n.js)
- ✅ HTML parsing validation passed (app.html and index.html)
- ✅ Translation audit complete with 10 quality fixes applied
- ✅ Master translation CSV reference table created
- ⬜ Changes NOT yet committed to git
- ⬜ Changes NOT yet deployed to production

## Phase 2 — Production Build (Future)

### Recommended Tech Stack
- **TypeScript everywhere** — Node.js backend + React Native frontend
- **PostgreSQL** — database
- **Architecture:** Aligned with TOGAF document (Scenario A/B/C/D for offshore vs domestic account provisioning)

### Key Integrations Needed
- Sunrise Banks (sponsor bank partner)
- Remote Deposit Capture (RDC) provider
- KYC/identity verification service
- Virtual card issuing platform
- Bill payment aggregator

### Phase 2 i18n Plan
- Use Claude API for auto-translation from English master
- CSV reference table feeds the translation pipeline
- Mandatory native speaker review for Yorùbá

## Known Limitations / TODO
- **No backend** — all features (KYC, check cashing, card issuance, payments) are mocked/demo
- **No tests**
- **No custom domain** — using checkpay.pages.dev
- **Cloudflare API token** — was flagged as exposed in an earlier session; should be regenerated at https://dash.cloudflare.com/profile/api-tokens
- **Bill pay i18n incomplete** — step labels and form labels still hardcoded English
- **Yorùbá translations** — need native speaker review before production use

## Important Notes
- The project folder was renamed from `~/Documents/Paymybill` to `~/checkpay`
- The GitHub repo was renamed from `paymybill` to `checkpay`
- Git remote uses SSH (`git@github.com:...`), not HTTPS
- The `.claude/` directory is gitignored
- The UX redesign spec document referenced during Phase 1 is a consolidated Markdown document covering: executive context about ITIN-based users, 7 UX issues identified in the original demo, design principles, application state architecture (States 0-7), detailed flow specifications, messaging framework, data model requirements, and developer implementation brief
