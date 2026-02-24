# CheckPay - User Journeys

This document describes the user journeys implemented in the CheckPay demo, including the partner integrations that would power each step in production.

---

## Partner Overview

```
                         CheckPay App
                              |
          ┌───────────────────┼───────────────────┐
          |                   |                   |
    ┌─────▼─────┐     ┌──────▼──────┐     ┌──────▼──────┐
    | ClearPath  |     | Horizon Card|     |   Payment   |
    | Bank       |     | Bank        |     |   Partners  |
    | (Sponsor)  |     | (Issuer)    |     |             |
    └─────┬─────┘     └──────┬──────┘     └──────┬──────┘
          |                   |                   |
    - Check clearing    - Card issuance     - TabaPay
      via RDC partner   - Balance held        (Mastercard
      (e.g. Ingo Money)  here                  Bill Pay)
    - KYC requirements  - Virtual + physical  - Stripe
      (sponsor bank      cards                 (card payments)
       drives KYC)     - Account management
```

**Key distinction:** The sponsor bank (ClearPath Bank in demo) and the issuing bank (Horizon Card Bank in demo) can be the same institution in production, but are shown separately here to illustrate the multi-party model.

The sponsor bank is the regulatory entity that drives KYC requirements for both account opening and check deposits. The issuing bank holds the user's funds and issues their card.

---

## Journey 1: New User Signup

### Entry Point
Landing page (index.html) → Click **"Get Started"** → app.html (welcome screen)

### Overt UX (Primary Flow)

```
Landing Page                    Welcome Screen
[Get Started] ─────────────────► [Get an Account]          ← primary CTA
                                  [Already have an account? Sign In]
                                        |
                                        ▼
                                ┌─── KYC-A ───┐
                                |  Step 1/4    |
                                |  Personal    |
                                |  Info + T&C  |
                                └──────┬───────┘
                                       |
                                       ▼
                                ┌─── KYC-A ───┐
                                |  Step 2/4    |
                                |  Government  |
                                |  ID Upload   |
                                └──────┬───────┘
                                       |
                                       ▼
                                ┌─── KYC-A ───┐
                                |  Step 3/4    |
                                |  Selfie      |
                                |  Capture     |
                                └──────┬───────┘
                                       |
                                       ▼
                                ┌─── KYC-A ───┐
                                |  Step 4/4    |
                                |  Provisioning|
                                |  Animation   |
                                └──────┬───────┘
                                       |
                                       ▼
                                ┌─ Dashboard ──┐
                                | Balance: $0   |
                                | Card: Pending |
                                | Txns: Empty   |
                                └───────────────┘
```

### Secondary Functions (Welcome Screen)

| Function | Location | Behavior |
|----------|----------|----------|
| **Back to Home** | Footer left | Returns to index.html |
| **Language selector** | Footer center | Inline `<select>` dropdown; persists via `localStorage` |
| **Terms & Conditions** | Footer right | Opens full-screen terms modal (T&C content) |
| **Privacy Policy** | Footer right | Opens full-screen terms modal (Privacy content) |

### Dashboard State After Signup
| Element | Value |
|---------|-------|
| Available Balance | $0.00 |
| Pending Balance | $0.00 |
| Balance Header | $0.00 / $0.00 + "Funds held by Horizon Card Bank" |
| Card Preview | Masked (••••), "Pending" badge, "Pending Activation" |
| Transactions | "No transactions yet. Clear a check to get started." |

### KYC-A Step Details

**Step 1 — Personal Information**
- Fields: Full name, Date of birth, ITIN, Street address, City, State, ZIP
- T&C checkbox: "I agree to the Terms & Conditions and Privacy Policy"
- No field validation (demo mode)

**Step 2 — Government ID Upload**
- Passport or government ID photo
- Reassurance: "Your documents are encrypted end-to-end"

**Step 3 — Selfie Capture**
- Liveness verification photo used for facial match against government ID

**Step 4 — Provisioning Animation**
- 3-phase sequential animation (~6 seconds total):
  1. "Verifying your identity..." ✓
  2. "Creating your virtual card..." ✓
  3. "Activating your wallet..." ✓
- On completion: sets `isAuthenticated = true`, stores user data, navigates to dashboard
- Success modal: "Account Ready! Your account is set up and your virtual card is ready to use."

### Production Integration Points
| Step | Partner | Integration |
|------|---------|-------------|
| Personal Info | KYC Provider | Validates ITIN, screens against watchlists |
| Government ID | KYC Provider | Document verification, OCR extraction |
| Selfie | KYC Provider | Liveness detection, facial comparison to ID |
| Provisioning | Sponsor Bank + Issuing Bank | Split synchronous KYC — data validated against both banks' requirements simultaneously. If approved, issuing bank creates account and provisions virtual card |

---

## Journey 2: Returning User Sign-In

### Entry Point
Landing page (index.html) → Click **"Sign In"** → app.html?mode=signin (dashboard)

### Overt UX (Primary Flow)

```
Landing Page                    Dashboard (Authenticated)
[Sign In] ──────────────────────► Balance: $1,234.56
(href: app.html?mode=signin)      Pending: $850.00
                                   Card: Active (••••4532)
                                   Txns: Check Deposit, Electric Bill, etc.
```

### Dashboard State After Sign-In
| Element | Value |
|---------|-------|
| Available Balance | $1,234.56 |
| Pending Balance | $850.00 |
| Balance Header | $1,234.56 / $850.00 + "Funds held by Horizon Card Bank" |
| Card Preview | ••••4532, "CHRIS SQUIRE", Expires 12/26 |
| Transactions | Check Deposit (+$850), Electric Bill (-$125.50), Account Top-up (+$500), Internet Bill (-$89.99) |

### Secondary Functions
- Welcome screen also has **"Already have an account? Sign In"** button — triggers the same returning-user dashboard state
- `app.js` reads `?mode=signin` URL parameter, calls `setupDashboard('returning')`, sets `isAuthenticated = true`

---

## Journey 3: Clear a Check (Payroll Check Clearing)

### Entry Point
Dashboard → Click **"Clear a Check"** quick action

### Overt UX (Primary Flow)

```
Dashboard
[Clear a Check] ─────────────────► Check Flow Step 1/4
                                   ┌──────────────────┐
                                   | Capture Check     |
                                   | FRONT             |
                                   | [Upload Photo]    |
                                   └────────┬──────────┘
                                            |
                                            ▼
                                   ┌──────────────────┐
                                   | Capture Check     |
                                   | BACK              |
                                   | [Upload Photo]    |
                                   └────────┬──────────┘
                                            |
                                            ▼
                                   ┌──────────────────┐
                                   | KYC-B: Secure     |
                                   | Deposit           |
                                   | Confirmation      |
                                   |  - Selfie         |
                                   |  - ITIN last 4    |
                                   |  - "Payable to me"|
                                   |  - Endorsement    |
                                   └────────┬──────────┘
                                            |
                        ┌───────────────────┼──────────────────────────────────┐
                        │ FIRST DEPOSIT ONLY│                                  │
                        ▼                   │ SUBSEQUENT DEPOSITS              │
              ┌──────────────────┐          │                                  │
              | Reg E Disclosure |          │                                  │
              | Modal            |          │                                  │
              | (EFT rights,     |          │                                  │
              |  error process,  |          │                                  │
              |  contact info)   |          │                                  │
              | [I Acknowledge   |          │                                  │
              |  & Continue]     |          │                                  │
              └────────┬─────────┘          │                                  │
                        └───────────────────┘                                  │
                                            ▼                                  │
                                   ┌──────────────────┐ ◄────────────────────┘
                                   | Confirm & Submit  |
                                   |  Amount: $850.00  |
                                   |  Fee: $5.00       |
                                   |  You receive:     |
                                   |    $845.00        |
                                   |                   |
                                   | EFT notice        |
                                   | "Your check will  |
                                   |  be processed as  |
                                   |  an EFT..."       |
                                   |                   |
                                   | "Processed by     |
                                   |  ClearPath Bank"  |
                                   |                   |
                                   |  ☑ Deposit Terms  |
                                   |  [Submit Check]   |
                                   └────────┬──────────┘
                                            |
                                            ▼
                                   ┌──────────────────┐
                                   | Check Clearing    |
                                   | Status            |
                                   |                   |
                                   | ✓ Submitted       |
                                   | ✓ Under Review    |
                                   | ✓ Accepted        |
                                   | ✓ Pending         |
                                   | ✓ Cleared         |
                                   |                   |
                                   | [Back to Dashboard]
                                   └────────┬──────────┘
                                            |
                                            ▼
                                   ┌──────────────────┐
                                   | Dashboard         |
                                   | Balance: $1,234.56|
                                   | Card: ACTIVATED   |
                                   | Txns: History     |
                                   └──────────────────┘
```

### Secondary Functions (Check Flow)

| Function | Location | Behavior |
|----------|----------|----------|
| **Reg E Disclosure Modal** | Gates confirm step on first deposit | Full-screen modal with EFT rights summary; requires explicit "I Acknowledge & Continue" before proceeding. Not shown on repeat deposits. |
| **EFT notice** | Check confirm screen | Inline text: "Your check will be processed as an electronic fund transfer to your account; see Deposit Terms for your rights and protections." |
| **Deposit Terms link** | EFT notice + T&C checkbox | Opens dedicated Deposit Terms modal (11 Reg E sections; distinct from general T&C) |
| **Save / Print** | Deposit Terms modal footer | Triggers `window.print()` for record-keeping |
| **ClearPath Bank disclaimer** | Check confirm + timeline | Shows clearing bank at both touchpoints |
| **Dual bank disclaimer** | Deposit timeline | "Processed by ClearPath Bank • Card issued by Horizon Card Bank" |

### Balance State Changes During Check Flow
| Stage | Available | Pending | Trigger |
|-------|-----------|---------|---------|
| Before check | $0.00 | $0.00 | — |
| Check submitted | $0.00 | **$850.00** | `processCheck()` updates header |
| Deposit cleared → Back to Dashboard | **$1,234.56** | $850.00 | `setupDashboard('returning')` called |

### KYC-B Details (Step 3)
KYC-B is a per-deposit verification embedded within the check clearing flow. Unlike KYC-A (one-time account setup), KYC-B is required every time the user deposits a check.

**Required elements:**
- Selfie/liveness capture (confirms the person depositing is the account holder)
- ITIN last-4 auto-displayed (from stored `userData.itinLast4`)
- "This check is payable to me" checkbox
- Endorsement instructions: "Sign the back of the check and write: For mobile deposit only - CheckPay"

**Messaging:** "Required by the clearing bank to protect your deposit" / "This replaces standing in line at a check clearing store"

### Reg E First-Deposit Disclosure Gate
Shown once — before the confirm step on the user's first check deposit. Not shown on subsequent deposits.

**Content (summarized):**
- Your deposit is an Electronic Fund Transfer governed by Reg E
- Right to documentation of every transfer
- Right to resolve errors within 60 days
- Limited liability for unauthorized transfers ($50 if reported within 2 business days)
- Right to save or print the full Deposit Terms

**Action:** "I Acknowledge & Continue" — proceeds to check confirm step

### Check Confirm Details (Step 4)
| Field | Value |
|-------|-------|
| Check Amount | $850.00 |
| Processing Time | 2-3 minutes |
| Processing Fee | $5.00 |
| You'll Receive | $845.00 |
| EFT Notice | Inline text + link to Deposit Terms |
| Bank Disclaimer | "Your check will be processed by ClearPath Bank" |
| Deposit Terms | "I agree to the Deposit Terms and authorize check clearing" (links to dedicated deposit terms, not general T&C) |

### Deposit Timeline Stages
| Stage | Timing (Demo) | Production Equivalent |
|-------|---------------|----------------------|
| Submitted | Immediate | Check images sent to RDC partner |
| Under Review | +2 seconds | RDC partner validates check images, MICR, endorsement |
| Accepted | +4 seconds | RDC partner confirms check is valid |
| Pending (Clearing) | +6 seconds | Check enters clearing process via sponsor bank |
| Cleared | +8 seconds | Funds cleared, transferred to issuing bank account |

Each stage shows a timestamp with date and timezone (e.g. "Feb 18, 2:04 PM EST").

### Production Integration Points
| Step | Partner | Integration |
|------|---------|-------------|
| Check front/back capture | RDC Provider (e.g. Ingo Money) | Image capture, quality validation, MICR reading |
| KYC-B verification | KYC Provider + Sponsor Bank | Per-deposit identity confirmation per sponsor bank requirements |
| Reg E disclosure | Compliance / Legal | One-time acknowledgement stored per user |
| Check submission | RDC Provider | Check submission for processing and clearing |
| Timeline tracking | RDC Provider | Status callbacks (submitted → review → accepted → pending → cleared) |
| Funds availability | Sponsor Bank → Issuing Bank | Cleared funds transferred from sponsor bank to issuing bank account |

---

## Journey 4: Pending Deposit Status (Returning User)

### Entry Point
Dashboard (returning user) → **"Activity"** tab → Click **"Check Clearing"** pending transaction

This journey is available to returning users who have a pending deposit already in flight. It lets them check clearing status without initiating a new deposit.

### Overt UX (Primary Flow)

```
Dashboard (returning user)
  Pending balance: $850.00
        |
        ▼
[Activity tab] ─────────────────► Transactions Screen
                                   ┌──────────────────┐
                                   | Check Clearing    |
                                   | $850.00 Pending ▶ | ← chevron indicates tappable
                                   └────────┬──────────┘
                                            |
                                            ▼
                                   ┌──────────────────┐
                                   | Check Clearing    |
                                   | Status            |
                                   |                   |
                                   | ✓ Submitted       |
                                   | ✓ Under Review    |
                                   | ● Accepted (active|
                                   |   = in progress)  |
                                   |   Pending         |
                                   |   Cleared         |
                                   |                   |
                                   | [Back to Dashboard]
                                   └──────────────────┘
```

### How It Works (Demo)
- `showPendingDeposit()` renders the timeline with stages Submitted and Under Review completed, Accepted as the active (in-progress) step
- Tapping the pending transaction in the Activity list navigates to this view
- The chevron `›` icon on the transaction row signals it is actionable
- "Back to Dashboard" returns the user to the dashboard without changing balance state

---

## Journey 5: View Card Details

### Entry Point
Dashboard → Click **"View Card"** quick action, or bottom nav **"Card"** tab

### Overt UX (Primary Flow)

```
Dashboard
[View Card] ────────────────────► Card Screen
                                   ┌──────────────────────┐
                                   | •••• •••• •••• 4532   |
                                   | CHRIS SQUIRE  12/26   |
                                   | CVV: •••              |
                                   |                       |
                                   | "Issued by Horizon    |
                                   |  Card Bank"           |
                                   |                       |
                                   | [Apple Pay][Google Pay]|
                                   |                       |
                                   | Controls:             |
                                   | ☐ Freeze Card         |
                                   | > Spending Limits     |
                                   | > Change PIN          |
                                   | > Request Physical    |
                                   |   Card                |
                                   └──────────────────────┘
```

### Secondary Functions (Card Screen)

| Function | Location | Behavior |
|----------|----------|----------|
| **Reveal PAN** | Card number row | Toggle shows full card number; auto-hides after 10 seconds |
| **Bank disclaimer** | Below card | "Issued by Horizon Card Bank" with bank favicon |
| **Visit Horizon Card Bank** | Below disclaimer | External link to issuing bank (placeholder `#`) |
| **Freeze Card** | Controls | Toggle to temporarily disable transactions |
| **Spending Limits** | Controls | Shows $500/day limit |
| **Change PIN** | Controls | Update card PIN |
| **Request Physical Card** | Controls | Opens address verification modal |

### Request Physical Card (Modal)
- Triggered from card controls
- Address form: Street, Apt/Suite (optional), City, State (all US states + DC/PR dropdown), ZIP
- Submit → Success modal: "Your physical card will arrive in 7-10 business days."
- No validation enforced (demo mode)

### Production Integration Points
| Feature | Partner | Integration |
|---------|---------|-------------|
| Card display | Card Issuer/Processor | PAN, expiry, CVV retrieved from card management system |
| Apple/Google Pay | Card Issuer/Processor | Tokenization for mobile wallet provisioning |
| Freeze/Unfreeze | Card Issuer/Processor | Real-time card status management |
| Physical card request | Card Issuer/Processor + Fulfillment | Card printing, mailing, address verification |
| Visit issuer | Issuing Bank | Redirect to bank's customer portal |

---

## Journey 6: Pay a Bill

### Entry Point
Dashboard → Click **"Pay a Bill"** quick action

### Overt UX (Primary Flow)

```
Dashboard
[Pay a Bill] ──────────────────► Bill Pay Step 1/4
                                  ┌──────────────────┐
                                  | Select Biller     |
                                  | State: [dropdown] |
                                  | Utility: [select] |
                                  | Biller: [select]  |
                                  └────────┬──────────┘
                                           |
                                           ▼
                                  ┌──────────────────┐
                                  | Enter Details     |
                                  | Account #         |
                                  | Amount            |
                                  | Reference #       |
                                  └────────┬──────────┘
                                           |
                                           ▼
                                  ┌──────────────────┐
                                  | Review Payment    |
                                  | Biller, Amount,   |
                                  | Account, Date     |
                                  └────────┬──────────┘
                                           |
                                           ▼
                                  ┌──────────────────┐
                                  | Stripe-style      |
                                  | Checkout          |
                                  | Mini card preview |
                                  | Pre-filled card   |
                                  | details (demo)    |
                                  | [Pay $XX.XX]      |
                                  └────────┬──────────┘
                                           |
                                           ▼
                                  ┌──────────────────┐
                                  | Confirmation      |
                                  | Payment submitted |
                                  | Txn ID, Date,     |
                                  | Status: Pending   |
                                  └──────────────────┘
```

### Production Integration Points
| Step | Partner | Integration |
|------|---------|-------------|
| Biller selection | Bill Pay Aggregator | Biller directory, account validation |
| Payment processing | TabaPay | Mastercard Bill Pay rails for utility payments |
| Card payment | Stripe | Card-based payments for bills and future services |
| Confirmation | Both | Payment status tracking, receipt generation |

---

## Journey 7: Sign Out

### Entry Point
Any authenticated screen → Bottom nav **"Profile"** → **"Sign Out"**

### Overt UX

```
Any Screen
[Profile tab] ────► Profile Screen
                    [Sign Out] ────► Landing Page (index.html)
                                     (full page redirect, state reset)
```

Sign out performs a full page redirect to `index.html`. Since all app state is in-memory, the redirect effectively resets the session. The user can then choose to "Sign In" (returning user) or "Get Started" (new account).

---

## Journey 8: Change Language

### Entry Points
1. Welcome screen → **Language** dropdown (inline `<select>` in footer)
2. Any authenticated screen → Profile → **"Language"** → Language modal

### Available Languages
| Language | Code | Auto-detect from |
|----------|------|-----------------|
| English | en | Default / en-* |
| Spanish | es | es-* |
| Filipino | ph | fil / tl |
| Yoruba | yo | yo |

Language preference is saved in `localStorage` as `checkpay-language` and persists across page reloads and between landing page and app.

### Note on Entry Point Difference
- **Welcome screen** uses an inline `<select>` dropdown — no modal, takes effect immediately
- **Profile screen** uses a modal with 4 language buttons and a checkmark on the active selection

---

## Terms & Conditions Modal (Secondary Function, Global)

The T&C modal is a secondary function accessible from multiple surfaces. It is not a primary user journey step — it gates or annotates flows but is not the main path.

### Entry Points
| Surface | Trigger | Content |
|---------|---------|---------|
| Welcome screen footer | "Terms & Conditions" link | General T&C |
| Welcome screen footer | "Privacy Policy" link | Privacy Policy |
| KYC-A Step 1 | T&C checkbox links | General T&C / Privacy |
| Profile → Legal | "Terms & Conditions" item | General T&C |
| Profile → Legal | "Privacy Policy" item | Privacy Policy |
| Check confirm | "Deposit Terms" checkbox link | Deposit Terms (Reg E) |
| Check confirm | EFT notice link | Deposit Terms (Reg E) |
| Reg E disclosure modal | "Deposit Terms" link | Deposit Terms (Reg E) |
| URL deep-link | `?view=terms` | General T&C |
| URL deep-link | `?view=privacy` | Privacy Policy |

### Modal Behaviors
- Full-screen scrollable overlay
- Language disclaimer banner for non-English ("This is a translated convenience copy. English version is legally binding.") with "View English" CTA
- **Save / Print** button triggers `window.print()` — print-specific CSS hides everything except modal body
- Three distinct content sets: General T&C, Privacy Policy, Deposit Terms (11 Reg E sections)
- English is the legally binding version; translated copies for Spanish, Filipino, Yoruba

---

## State Diagram

```
                    ┌──────────────┐
                    |  Landing     |
                    |  Page        |
                    └──┬───────┬───┘
                       |       |
              Get Started  Sign In
              (no param)   (?mode=signin)
                       |       |
                       ▼       |
                  ┌─────────┐  |
                  | Welcome |  |
                  | Screen  |  |
                  └──┬──┬───┘  |
                     |  |      |
           Get an    |  Sign In|
           Account   |  (demo) |
                     |  |      |
                     ▼  ▼      ▼
                  ┌─────────────┐
                  | KYC-A       |      ┌───────────────┐
                  | (4 steps)   |      | Dashboard     |
                  └──────┬──────┘      | (Returning)   |
                         |             | $1,234.56     |
                         ▼             | Active card   |
                  ┌─────────────┐      | Transactions  |
                  | Dashboard   |      └──┬──┬───┬──┬──┘
                  | (New User)  |         |  |   |  |
                  | $0.00       |◄────────┘  |   |  |
                  | Pending card|    (same features)
                  | No txns     |            |   |  |
                  └───┬───┬───┬─┘            |   |  |
                      |   |   |              |   |  |
              ┌───────┘   |   └───────┐      |   |  |
              ▼           ▼           ▼      |   |  |
        ┌──────────┐ ┌─────────┐ ┌──────────┐ |   |  |
        | Clear    | | View    | | Pay      | |   |  |
        | Check    | | Card    | | Bill     | |   |  |
        | (4 steps)| |         | | (4 steps)| |   |  |
        |          | | Reveal  | |          | |   |  |
        | Reg E    | | PAN     | | Stripe   | |   |  |
        | gate     | | Freeze  | | Checkout | |   |  |
        | (1st     | | Limits  | |          | |   |  |
        |  deposit)| | PIN     | |          | |   |  |
        | KYC-B    | | Phys.   | |          | |   |  |
        | at Step 3| | Card    | |          | |   |  |
        └────┬─────┘ └─────────┘ └──────────┘ |   |  |
             |                                 |   |  |
             | Deposit cleared                 |   |  |
             | Balance updates                 |   |  |
             | Card activates                  |   |  |
             ▼                                 |   |  |
        ┌──────────┐    ┌────────────────┐     |   |  |
        | Dashboard |◄──| Pending Deposit|◄────┘   |  |
        | Updated   |   | Status         |          |  |
        | $1,234.56 |   | (Activity tab) |          |  |
        | Active    |   └────────────────┘          |  |
        └─────┬────┘                                |  |
              |                                     |  |
              ▼                                     |  |
        ┌──────────┐                                |  |
        | Profile  |────────────────────────────────┘  |
        | Sign Out |──────► Landing Page (index.html)  |
        └──────────┘                                   |
              ▲                                        |
              └────────────────────────────────────────┘
```

---

## Production Architecture Notes

### Split Synchronous KYC
In production, KYC-A (account verification) may require a **split synchronous** approach:

1. User enters personal information once (Step 1)
2. User uploads government ID and selfie (Steps 2-3)
3. Behind the scenes, the KYC provider validates the data against:
   - **Sponsor bank requirements** — for check clearing eligibility
   - **Issuing bank requirements** — for card issuance eligibility
4. Both validations happen simultaneously (synchronous split)
5. If both pass → account provisioned, card issued
6. If one fails → user informed of which requirement was not met

This is simplified in the demo to a single linear flow, but the data model supports the split by collecting all required fields upfront.

### RDC (Remote Deposit Capture)
Check clearing in production would be handled by an RDC partner like **Ingo Money**:

1. Check images (front + back) captured with quality validation
2. MICR line read and validated
3. Endorsement verified ("For mobile deposit only - CheckPay")
4. Check submitted to clearing network via sponsor bank
5. Status callbacks drive the deposit timeline (Submitted → Under Review → Accepted → Pending → Cleared)
6. Funds availability based on check type, amount, and user risk profile

### Reg E Compliance
The Deposit Terms modal contains 11 Reg E-compliant sections covering EFT disclosure, error resolution, unauthorized transfer liability, business day definitions, fee schedule, funds availability, documentation rights, and contact information. The first-deposit disclosure gate ensures the user has acknowledged their rights before submitting any check. Save/Print allows users to retain a copy per their Reg E rights.

### Bill Pay
Bill payments in production use a dual-rail approach:

- **TabaPay** — processes bill payments via **Mastercard Bill Pay** rails for utility and biller payments
- **Stripe** — handles card-based payments for bill pay checkout and future services (subscriptions, marketplace transactions, etc.)

### Sponsor Bank = Clearing Bank
The sponsor bank (ClearPath Bank in demo) is the same entity as the clearing bank. It:
- Holds the bank charter/license
- Drives KYC requirements for account opening and check deposits
- Clears checks through the RDC partner
- Could also be the issuing bank (but is separate in this demo to illustrate the model)

The issuing bank (Horizon Card Bank in demo):
- Issues virtual and physical debit cards
- Holds the user's account balance
- Manages card lifecycle (freeze, PIN, limits)
- Could be the same as the sponsor bank in production
