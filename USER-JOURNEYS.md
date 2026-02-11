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

### Flow

```
Landing Page                    Welcome Screen
[Get Started] ─────────────────► [Get an Account]
                                  [Already have an account? Sign In]
                                  [Back to Home] [Language]
                                        |
                                        ▼
                                ┌─── KYC-A ───┐
                                |  Step 1/4    |
                                |  Personal    |
                                |  Info        |──── Production: Data collected for
                                |  + T&C ☑     |     both sponsor bank and issuing
                                └──────┬───────┘     bank KYC (split synchronous)
                                       |
                                       ▼
                                ┌─── KYC-A ───┐
                                |  Step 2/4    |
                                |  Government  |──── Production: Document verification
                                |  ID Upload   |     via KYC provider per sponsor bank
                                └──────┬───────┘     and issuing bank requirements
                                       |
                                       ▼
                                ┌─── KYC-A ───┐
                                |  Step 3/4    |
                                |  Selfie      |──── Production: Liveness detection
                                |  Capture     |     + facial match to ID
                                └──────┬───────┘
                                       |
                                       ▼
                                ┌─── KYC-A ───┐
                                |  Step 4/4    |
                                |  Provisioning|──── 3-phase animation:
                                |  Animation   |     1. Verify identity
                                └──────┬───────┘     2. Create virtual card
                                       |             3. Activate wallet
                                       ▼
                                ┌─ Dashboard ──┐
                                | Balance: $0   |
                                | Card: Pending |
                                | Txns: Empty   |
                                | "Funds held   |
                                |  by Horizon   |
                                |  Card Bank"   |
                                └───────────────┘
```

### Dashboard State After Signup
| Element | Value |
|---------|-------|
| Available Balance | $0.00 |
| Pending Balance | $0.00 |
| Balance Header | $0.00 / $0.00 + "Funds held by Horizon Card Bank" |
| Card Preview | Masked (••••), "Pending" badge, "Pending Activation" |
| Transactions | "No transactions yet. Cash a check to get started." |

### KYC-A Details

**Step 1 — Personal Information**
- Fields: Full name, Date of birth, ITIN (with privacy hint), Street address, City, State, ZIP
- T&C checkbox: "I agree to the Terms & Conditions and Privacy Policy"
- No field validation (demo mode)

**Step 2 — Government ID Upload**
- Passport or government ID photo
- Reassurance: "Your documents are encrypted end-to-end"

**Step 3 — Selfie Capture**
- Liveness verification photo
- Used for facial match against government ID

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

### Flow

```
Landing Page                    Dashboard (Authenticated)
[Sign In] ──────────────────────► Balance: $1,234.56
(href: app.html?mode=signin)      Pending: $850.00
                                   Card: Active (••••4532)
                                   Txns: Check Deposit, Electric Bill, etc.
                                   "Funds held by Horizon Card Bank"
```

### Dashboard State After Sign-In
| Element | Value |
|---------|-------|
| Available Balance | $1,234.56 |
| Pending Balance | $850.00 |
| Balance Header | $1,234.56 / $850.00 + "Funds held by Horizon Card Bank" |
| Card Preview | ••••4532, "CHRIS SQUIRE", Expires 12/26 |
| Transactions | Check Deposit (+$850), Electric Bill (-$125.50), Account Top-up (+$500), Internet Bill (-$89.99) |

### How It Works (Demo)
- Landing page "Sign In" link includes `?mode=signin` URL parameter
- `app.js` init() reads URL parameter and calls `setupDashboard('returning')`
- Sets `isAuthenticated = true` with demo data (Chris Squire, ITIN last 4: 7890)
- Skips welcome screen entirely — goes straight to dashboard

### Alternative Entry
The welcome screen also has an **"Already have an account? Sign In"** button that triggers the same returning-user dashboard state.

---

## Journey 3: Cash a Check (Payroll Check Clearing)

### Entry Point
Dashboard → Click **"Cash a Check"** quick action

### Flow

```
Dashboard
[Cash a Check] ──────────────────► Check Flow Step 1/4
                                   ┌──────────────────┐
                                   | Capture Check     |
                                   | FRONT             |──── Production: RDC partner
                                   | [Upload Photo]    |     (e.g. Ingo Money) receives
                                   └────────┬──────────┘     check image
                                            |
                                            ▼
                                   ┌──────────────────┐
                                   | Capture Check     |
                                   | BACK              |──── Production: RDC validates
                                   | [Upload Photo]    |     endorsement, MICR line,
                                   └────────┬──────────┘     check authenticity
                                            |
                                            ▼
                                   ┌──────────────────┐
                                   | KYC-B: Secure     |
                                   | Deposit           |──── Production: Per-deposit
                                   | Confirmation      |     verification per sponsor
                                   |  - Selfie         |     bank + RDC requirements
                                   |  - ITIN last 4    |
                                   |  - "Payable to me"|
                                   |  - Endorsement    |
                                   └────────┬──────────┘
                                            |
                                            ▼
                                   ┌──────────────────┐
                                   | Confirm & Submit  |
                                   |  Amount: $850.00  |
                                   |  Fee: $5.00       |
                                   |  You receive:     |
                                   |    $845.00        |
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
                                   | Deposit Timeline  |
                                   |                   |
                                   | ✓ Submitted       |
                                   | ✓ Under Review    |
                                   | ✓ Accepted        |
                                   | ✓ Pending         |
                                   | ✓ Cleared         |
                                   |                   |
                                   | "Processed by     |
                                   | ClearPath Bank •  |
                                   | Card issued by    |
                                   | Horizon Card Bank"|
                                   |                   |
                                   | [Back to Dashboard]
                                   └────────┬──────────┘
                                            |
                                   Balance updated:
                                   Pending → Available
                                            |
                                            ▼
                                   ┌──────────────────┐
                                   | Dashboard         |
                                   | Balance: $1,234.56|
                                   | Card: ACTIVATED   |
                                   | Txns: History     |
                                   | Modal: "Check     |
                                   |  Deposited"       |
                                   └──────────────────┘
```

### Balance State Changes During Check Flow
| Stage | Available | Pending | Trigger |
|-------|-----------|---------|---------|
| Before check | $0.00 | $0.00 | — |
| Check submitted | $0.00 | **$850.00** | `processCheck()` updates header |
| Deposit cleared → Back to Dashboard | **$1,234.56** | $850.00 | `setupDashboard('returning')` called |

### KYC-B Details (Step 3)
KYC-B is a per-deposit verification embedded within the check cashing flow. Unlike KYC-A (one-time account setup), KYC-B is required every time the user deposits a check.

**Required elements:**
- Selfie/liveness capture (confirms the person depositing is the account holder)
- ITIN last-4 auto-displayed (from stored `userData.itinLast4`)
- "This check is payable to me" checkbox
- Endorsement instructions: "Sign the back of the check and write: For mobile deposit only - CheckPay"

**Messaging:** "Required by the clearing bank to protect your deposit" / "This replaces standing in line at a check cashing store"

### Check Confirm Details (Step 4)
| Field | Value |
|-------|-------|
| Check Amount | $850.00 |
| Processing Time | 2-3 minutes |
| Processing Fee | $5.00 |
| You'll Receive | $845.00 |
| Bank Disclaimer | "Your check will be processed by ClearPath Bank" |
| T&C | "I agree to the Deposit Terms and authorize check clearing" |

### Deposit Timeline Stages
| Stage | Timing (Demo) | Production Equivalent |
|-------|---------------|----------------------|
| Submitted | Immediate | Check images sent to RDC partner |
| Under Review | +2 seconds | RDC partner validates check images, MICR, endorsement |
| Accepted | +4 seconds | RDC partner confirms check is valid |
| Pending (Clearing) | +6 seconds | Check enters clearing process via sponsor bank |
| Cleared | +8 seconds | Funds cleared, transferred to issuing bank account |

### Production Integration Points
| Step | Partner | Integration |
|------|---------|-------------|
| Check front/back capture | RDC Provider (e.g. Ingo Money) | Image capture, quality validation, MICR reading |
| KYC-B verification | KYC Provider + Sponsor Bank | Per-deposit identity confirmation per sponsor bank requirements |
| Check submission | RDC Provider | Check submission for processing and clearing |
| Timeline tracking | RDC Provider | Status callbacks (submitted → review → accepted → pending → cleared) |
| Funds availability | Sponsor Bank → Issuing Bank | Cleared funds transferred from sponsor bank to issuing bank account |

---

## Journey 4: View Card Details

### Entry Point
Dashboard → Click **"View Card"** quick action or bottom nav **"Card"** tab

### Flow

```
Dashboard
[View Card] ────────────────────► Card Screen
                                   ┌──────────────────────┐
                                   | [Full Card Display]   |
                                   | •••• •••• •••• 4532   |
                                   | CHRIS SQUIRE  12/26   |
                                   | CVV: •••              |
                                   |                       |
                                   | "Issued by Horizon    |
                                   |  Card Bank"           |
                                   | [Visit Horizon Card   |
                                   |  Bank →]              |
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

### Card Screen Features
| Feature | Description |
|---------|-------------|
| Reveal PAN | Toggle to show/hide full card number (auto-hides after 10s) |
| Bank disclaimer | "Issued by Horizon Card Bank" with bank favicon |
| Issuer link | "Visit Horizon Card Bank →" (placeholder link) |
| Apple Pay / Google Pay | Add card to mobile wallets |
| Freeze Card | Toggle to temporarily disable transactions |
| Spending Limits | Shows $500/day limit |
| Change PIN | Update card PIN |
| Request Physical Card | Opens address verification modal |

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

## Journey 5: Pay a Bill

### Entry Point
Dashboard → Click **"Pay a Bill"** quick action

### Flow

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
                                  | Pay date          |
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
                                  | Checkout          |──── Production: TabaPay via
                                  | Mini card preview |     Mastercard Bill Pay or
                                  | [Pay $XX.XX]      |     Stripe for card payments
                                  └────────┬──────────┘
                                           |
                                           ▼
                                  ┌──────────────────┐
                                  | Confirmation      |
                                  | Payment submitted |
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

## Journey 6: Sign Out

### Entry Point
Any authenticated screen → Bottom nav **"Profile"** → **"Sign Out"**

### Flow

```
Any Screen
[Profile tab] ────► Profile Screen
                    [Sign Out] ────► Landing Page (index.html)
                                     (full page redirect, state reset)
```

Sign out performs a full page redirect to `index.html`. Since all app state is in-memory, the redirect effectively resets the session. The user can then choose to "Sign In" (returning user) or "Get Started" (new account).

---

## Journey 7: Change Language

### Entry Points
1. Welcome screen → **"Language"** button → Language modal
2. Any authenticated screen → Profile → **"Language"** → Language modal

### Available Languages
| Language | Code | Auto-detect from |
|----------|------|-----------------|
| English | en | Default / en-* |
| Spanish | es | es-* |
| Filipino | ph | fil / tl |
| Yoruba | yo | yo |

Language preference is saved in `localStorage` as `checkpay-language` and persists across page reloads.

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
                  | Dashboard   |      └───┬───┬───┬───┘
                  | (New User)  |          |   |   |
                  | $0.00       |◄─────────┘   |   |
                  | Pending card|    (same features)
                  | No txns     |              |   |
                  └───┬───┬───┬─┘              |   |
                      |   |   |                |   |
              ┌───────┘   |   └───────┐        |   |
              ▼           ▼           ▼        |   |
        ┌──────────┐ ┌─────────┐ ┌──────────┐  |   |
        | Cash     | | View    | | Pay      |  |   |
        | Check    | | Card    | | Bill     |  |   |
        | (4 steps)| | + Link  | | (4 steps)|  |   |
        |          | | + Phys. | |          |  |   |
        |  KYC-B   | |  Card   | | Stripe   |  |   |
        |  at      | |  Request| | Checkout |  |   |
        |  Step 3  | |         | |          |  |   |
        └────┬─────┘ └─────────┘ └──────────┘  |   |
             |                                  |   |
             | Deposit cleared                  |   |
             | Balance updates                  |   |
             | Card activates                   |   |
             ▼                                  |   |
        ┌──────────┐                            |   |
        | Dashboard |◄──────────────────────────┘   |
        | Updated   |                               |
        | $1,234.56 |                               |
        | Active    |                               |
        └─────┬────┘                                |
              |                                     |
              ▼                                     |
        ┌──────────┐                                |
        | Profile  |────────────────────────────────┘
        | Sign Out |──────► Landing Page (index.html)
        └──────────┘
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
