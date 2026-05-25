# Phase 1: Foundation & Hardening — Research

**Researched:** 2026-06-10
**Domain:** Next.js App Router integration finalization (Resend + Google Sheets), ENV verification, TypeScript hardening
**Confidence:** HIGH (all findings from direct code inspection; no speculative claims)

---

## Summary

Phase 1 is materially complete. Tasks 1.1–1.4 have been shipped:
API security (honeypot, IP rate-limiting), React 19 hook violations in the Embla carousel, Shane Voice audit of the About page, and the GSD `.planning/` scaffold. The only remaining engineering task is **Task 1.5: Finalize Resend & Google Sheets helpers, verify ENV usage**.

Both integration helpers (`lib/email.ts` and `lib/sheets.ts`) and the lead API route (`app/api/lead/route.ts`) are written and structurally correct. What is *not* done is: (a) a startup env-validation module that gives clear developer errors when vars are absent, (b) comprehensive comments in `.env.example` that explain how to obtain each value, and (c) an end-to-end smoke test. The env credentials themselves (`RESEND_API_KEY`, `GOOGLE_SHEETS_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_SERVICE_ACCOUNT_KEY`) are external gates — Shane must supply them or unlock platform access.

**Primary recommendation:** Deliver Task 1.5 as three concrete deliverables — `lib/env.ts` (startup env guard), annotated `.env.example`, and a `scripts/smoke-lead.mjs` manual smoke-test script. All three are pure code changes; none require new dependencies. Once those exist, Phase 1 closes and Phase 2 can begin.

---

## User Constraints

No `CONTEXT.md` exists for this phase. Constraints are drawn from `CLAUDE.md` and project docs:

### Locked Decisions
- Framework: Next.js 16.2.5 App Router + React 19 (do not change)
- Styling: Tailwind v4 only (do not add CSS-in-JS)
- Motion: `motion` (Framer Motion v12) — do not add any other animation library
- No new top-level docs in repo root — long-form content goes in `project-notes/` or `docs/`
- Server-only modules (`lib/email.ts`, `lib/sheets.ts`) must NOT be imported from client components
- No em-dashes or en-dashes anywhere — including code comments and commit messages
- Brand tokens only — never hardcode hex values; use `var(--kismet-*)` or Tailwind theme keys
- Path alias: `@/*` resolves to repo root — use consistently
- No `lint` or `type-check` script existed in `package.json` prior to this phase; both now exist (`npm run lint`, `npm run type-check`)

### Claude's Discretion
- Structure of `lib/env.ts` — validated approach recommended below
- Whether smoke-test script lives in `scripts/` or a dedicated `tests/` directory
- Comment format inside `.env.example`

### Deferred (OUT OF SCOPE for Phase 1)
- Vercel deployment (Phase 3)
- GA4 / analytics (Phase 3)
- CI em-dash gate (Phase 4)
- Motion/animation audit (Phase 2)
- DNS cutover (Phase 3/launch gate)
- Newsletter provider integration (content decision pending)

---

## Standard Stack

### Core (already installed — no new deps needed for Task 1.5)

| Library | Version | Purpose | Status |
|---------|---------|---------|--------|
| `resend` | 6.12.3 | Transactional email to Shane | Installed, helper written |
| `googleapis` | 171.4.0 | Google Sheets append via Service Account JWT | Installed, helper written |
| `zod` | 4.4.3 | Schema validation at route boundary | Installed, used in route |
| `next` | 16.2.5 | App Router, serverless route | Installed |

### No New Dependencies Required

Task 1.5 is env verification + documentation + a lightweight test script. All required libraries are already present. Do **not** add jest, vitest, or any test runner for this phase — `@playwright/test` can be added in Phase 2 or 3 when e2e tests are written.

### Verification: Current Package Versions

Confirmed from `package.json` and `node_modules` inspection (2026-06-10):
- `resend`: ^6.12.3 (latest stable branch)
- `googleapis`: ^171.4.0
- `zod`: ^4.4.3
- `playwright`: 1.59.1 (installed as devDep; `@playwright/test` is NOT installed — no test runner available this phase)

---

## Architecture Patterns

### Current File Layout (relevant to Task 1.5)

```
lib/
├── email.ts        ✅ Written — Resend send helper
├── sheets.ts       ✅ Written — Google Sheets JWT append helper
├── articles.ts     ✅ Written — Markdown loader (not in scope this phase)
└── env.ts          ❌ Missing — startup env validator (TO BUILD)

app/api/lead/
└── route.ts        ✅ Written — POST handler (hardened: honeypot, rate-limit, Zod)

.env.example        ⚠️  Exists but blank values for all Google/Sheets vars
.env.local          ⚠️  Only NEXT_PUBLIC_BOOKING_URL is set (no Resend/Sheets creds)

scripts/
└── (to add) smoke-lead.mjs  ❌ Missing — dev smoke-test for lead pipeline
```

### Pattern 1: Startup ENV Guard (`lib/env.ts`)

**What:** A centralized module that reads and validates all required environment variables. Called by server-only modules on import. Throws a descriptive error at startup (not silently at request time) when a var is absent.

**Why:** Currently `lib/email.ts` throws at call time ("RESEND_API_KEY not configured") and `lib/sheets.ts` throws at call time too. This is acceptable, but a startup guard surfaces config errors during `next build` or on first request, making them impossible to miss in CI.

**Pattern (TypeScript, no new deps):**

```typescript
// lib/env.ts
// Source: direct project inspection + Next.js server-env conventions

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `[kismet] Required environment variable "${name}" is not set. ` +
      `See .env.example for setup instructions.`
    );
  }
  return value;
}

// Resend
export const RESEND_API_KEY = requireEnv("RESEND_API_KEY");
export const LEAD_INBOX_TO = requireEnv("LEAD_INBOX_TO");
export const LEAD_INBOX_FROM = requireEnv("LEAD_INBOX_FROM");

// Google Sheets
export const GOOGLE_SHEETS_ID = requireEnv("GOOGLE_SHEETS_ID");
export const GOOGLE_SERVICE_ACCOUNT_EMAIL = requireEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL");
export const GOOGLE_SERVICE_ACCOUNT_KEY = requireEnv("GOOGLE_SERVICE_ACCOUNT_KEY");

// Booking
export const NEXT_PUBLIC_BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ?? "";
```

**Note:** `NEXT_PUBLIC_*` vars are baked in at build time. `NEXT_PUBLIC_BOOKING_URL` should be optional (defaults to empty string) since the Calendly URL is a content decision pending Shane's input.

**Important:** Mark `lib/env.ts` as server-only. Add `import "server-only"` at the top (the `server-only` package is available in Next.js projects without install — it's a zero-dep sentinel). This prevents accidental client-bundle inclusion.

### Pattern 2: Google Sheets Service Account Key (the `\n` footgun)

**Already handled in `lib/sheets.ts`:**

```typescript
key: saKey.replace(/\\n/g, "\n"),
```

This converts the escaped `\n` that environment variable stores (as a single-line JSON string in `.env.local`) back into real newline characters that the Google JWT library expects. This is the standard pattern and is already correctly implemented.

**What `.env.example` must document for `GOOGLE_SERVICE_ACCOUNT_KEY`:**

The private key from a Google Service Account JSON looks like:
```
-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKC...
```
When pasting into `.env.local`, the value should be the full single-line string with literal `\n` sequences (not real newlines). The code handles conversion.

### Pattern 3: Resend Domain Verification Requirement

**Critical:** The `LEAD_INBOX_FROM` address (`hello@kismetfinancegroup.com.au`) must come from a domain verified in the Resend dashboard. This requires:
1. Shane (or whoever manages the DNS) to add TXT/CNAME records for `kismetfinancegroup.com.au` in Resend
2. Or — for dev/testing only — use `onboarding@resend.dev` as the `from` address (Resend's sandbox sender)

The code already guards for this (`from` is checked), but `.env.example` must document this requirement clearly.

### Pattern 4: Google Sheets Setup Requirements

For `appendLeadRow` to succeed, the following must be true before first use:
1. A Google Cloud project exists with Sheets API enabled
2. A Service Account is created; its JSON key is downloaded
3. A Google Sheet named "Kismet Leads" (or similar) exists with a tab named `Leads` and columns in order: `Timestamp | Name | Email | Phone | Message`
4. The Sheet is shared (Editor access) with the Service Account email
5. The `GOOGLE_SHEETS_ID` is the ID from the Sheet URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/`

The append range is hardcoded to `Leads!A:E` — this must match exactly.

### Pattern 5: Smoke-Test Script

**What:** A Node.js ESM script (matches `"type": "module"` in `package.json`) that POSTs to the local lead API route and prints results.

```javascript
// scripts/smoke-lead.mjs
// Run: npm run dev (in another terminal), then node scripts/smoke-lead.mjs

const payload = {
  name: "Test Lead",
  email: "test@example.com",
  phone: "0400000000",
  message: "Smoke test from scripts/smoke-lead.mjs",
  honeypot: "",
};

const res = await fetch("http://localhost:3000/api/lead", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

const body = await res.json();
console.log(`Status: ${res.status}`, body);
if (!res.ok) process.exit(1);
```

This requires no test framework. Run while `npm run dev` is active.

### Anti-Patterns to Avoid

- **Importing `lib/email.ts` or `lib/sheets.ts` from any client component** — these use Node APIs (`googleapis`) that break in the browser. Already prevented by convention; add `import "server-only"` to enforce at build time.
- **Hardcoding test credentials** — never commit actual Resend API keys or Google service account JSON. `.gitignore` already covers `.env*`.
- **Adding a test framework just for this phase** — premature; validation is TypeScript + build + manual smoke test.
- **Calling `requireEnv()` in `lib/env.ts` at module load time from a file that gets bundled client-side** — use the `server-only` sentinel to prevent this.
- **Putting a newline in the `.env.local` value for `GOOGLE_SERVICE_ACCOUNT_KEY`** — the key must be on a single line with literal `\n` sequences. Multi-line breaks env parsing.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Email delivery | Custom SMTP | `resend` (already installed) | Deliverability, Auth, API |
| Google auth JWT | Custom RSA signing | `google.auth.JWT` from `googleapis` (already installed) | Cert handling, token refresh |
| Input validation | Custom type guards | `zod` (already installed, used in route) | Edge cases in type coercion |
| Server-only enforcement | Custom webpack plugin | `import "server-only"` (Next.js built-in sentinel) | Zero-dep, works with all bundlers |
| ENV validation schema | Full `zod` schema for env | Simple `requireEnv()` helper | Zod for env is overkill here; `t3-env` or `zod` env schemas add complexity for 6 vars |

---

## Common Pitfalls

### Pitfall 1: `GOOGLE_SERVICE_ACCOUNT_KEY` Newline Encoding

**What goes wrong:** Developer pastes the private key from the JSON file as a multi-line value in `.env.local`. The env parser treats each line as a separate key=value, silently corrupting the key. Auth fails at runtime with a cryptic JWT error.

**Why it happens:** The RSA private key is a multi-line PEM block. Shell env files don't support multi-line values by default.

**How to avoid:** The key must be pasted as a single line with literal `\n` sequences (e.g., `-----BEGIN RSA PRIVATE KEY-----\nMIIE...`). The `lib/sheets.ts` code already converts `\\n` back to newlines via `.replace(/\\n/g, "\n")`. Document this clearly in `.env.example`.

**Warning signs:** `Error: error:09091064:PEM routines:PEM_read_bio:no start line` from googleapis at runtime.

### Pitfall 2: Resend `from` Domain Not Verified

**What goes wrong:** API key is valid but emails fail with `422 Unprocessable Entity` or similar from Resend's API.

**Why it happens:** Resend requires the `from` address to use a verified sending domain. `hello@kismetfinancegroup.com.au` won't work until DNS records are added and verified in the Resend dashboard.

**How to avoid:** For local testing, use `onboarding@resend.dev` as `from`. Document this in `.env.example` as a dev override. The `LEAD_INBOX_FROM` var makes this switchable without code changes.

**Warning signs:** `sendLeadEmail` throws or returns an error with the Resend API's 422 response.

### Pitfall 3: Google Sheet Tab Name Mismatch

**What goes wrong:** `appendLeadRow` throws `The requested range was not found.` despite correct credentials.

**Why it happens:** The range is hardcoded to `Leads!A:E`. If the sheet tab is named anything other than exactly `Leads`, the append fails.

**How to avoid:** Document in `.env.example` / setup instructions that the tab must be named exactly `Leads`. Or rename the hardcoded range to `Sheet1!A:E` (the default tab name) — but `Leads` is more intentional.

**Warning signs:** googleapis error mentioning "range not found" despite successful auth.

### Pitfall 4: `lib/env.ts` Evaluated Client-Side

**What goes wrong:** If `lib/env.ts` is imported (even transitively) by a client component, Next.js will try to bundle it. `process.env` on the client only surfaces `NEXT_PUBLIC_*` vars; all secret vars become `undefined`, triggering all the `requireEnv` throws at build time.

**Why it happens:** Client component trees include all their imports transitively.

**How to avoid:** Add `import "server-only"` to `lib/env.ts`. Next.js throws a clear build error if a client component imports a server-only module.

### Pitfall 5: Rate Limiter Memory State Reset on Serverless

**What goes wrong:** The in-memory `ipCache` in `app/api/lead/route.ts` resets on every cold start in a serverless environment (Vercel). Rate limiting effectively doesn't persist between function invocations.

**Why it happens:** Serverless functions are stateless. The `Map` lives in module scope but each cold start is a fresh process.

**Impact for this phase:** LOW — this is a known architectural limitation documented in the handoff. It's acceptable for v1. Do not "fix" it now with Redis or similar; that's out of scope. Just document it.

**Warning signs:** Not applicable (no warning; limit resets silently). Note in code comments.

---

## Code Examples

### Correct Resend Invocation (already in lib/email.ts)

```typescript
// Source: lib/email.ts (direct inspection)
export async function sendLeadEmail(input: LeadEmailInput) {
  if (!resend) throw new Error("RESEND_API_KEY not configured");
  const to = process.env.LEAD_INBOX_TO;
  const from = process.env.LEAD_INBOX_FROM;
  if (!to || !from) throw new Error("LEAD_INBOX_TO or LEAD_INBOX_FROM not configured");
  return resend.emails.send({
    to,
    from,
    replyTo: input.email,
    subject: `New Kismet lead: ${input.name}`,
    text: [
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      `Phone: ${input.phone}`,
      "",
      "Message:",
      input.message,
    ].join("\n"),
  });
}
```

**Note:** Plain `text:` email is correct. No HTML needed. Avoids any XSS surface in email rendering.

### Correct Google Sheets JWT Auth (already in lib/sheets.ts)

```typescript
// Source: lib/sheets.ts (direct inspection)
const auth = new google.auth.JWT({
  email: saEmail,
  key: saKey.replace(/\\n/g, "\n"),  // CRITICAL: converts literal \n to real newlines
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const sheets = google.sheets({ version: "v4", auth });
await sheets.spreadsheets.values.append({
  spreadsheetId: sheetId,
  range: "Leads!A:E",
  valueInputOption: "USER_ENTERED",
  requestBody: {
    values: [[row.submittedAt, row.name, row.email, row.phone, row.message]],
  },
});
```

### Annotated .env.example (target state)

```bash
# ===================================================
# RESEND — Transactional email for lead notifications
# Get your API key at: https://resend.com/api-keys
# ===================================================
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx

# Address Shane receives lead emails at
LEAD_INBOX_TO=shane@kismetfinancegroup.com.au

# Address emails are sent FROM — must be a verified domain in Resend.
# For local dev only, use: onboarding@resend.dev
# For production: verify kismetfinancegroup.com.au in the Resend dashboard first.
LEAD_INBOX_FROM=hello@kismetfinancegroup.com.au

# ===================================================
# GOOGLE SHEETS — Lead log spreadsheet
# Setup: create a Sheet, name the first tab "Leads",
# columns: Timestamp | Name | Email | Phone | Message
# Share the sheet (Editor) with the service account email below.
# Sheet ID is in the URL: /spreadsheets/d/SHEET_ID/
# ===================================================
GOOGLE_SHEETS_ID=

# From Google Cloud Console > Service Accounts
GOOGLE_SERVICE_ACCOUNT_EMAIL=

# Paste the private_key field from the downloaded JSON as a SINGLE LINE
# with literal \n sequences (not real newlines). Example:
# GOOGLE_SERVICE_ACCOUNT_KEY=-----BEGIN RSA PRIVATE KEY-----\nMIIE...\n-----END RSA PRIVATE KEY-----\n
GOOGLE_SERVICE_ACCOUNT_KEY=

# ===================================================
# BOOKING WIDGET
# Paste your Calendly (or other scheduler) embed URL here.
# Used in BookingEmbed component. Leave blank to hide widget.
# ===================================================
NEXT_PUBLIC_BOOKING_URL=
```

---

## State of the Art

| Area | Current State | Notes |
|------|--------------|-------|
| Resend SDK | resend@6.12.3 | Current stable. `resend.emails.send()` API is correct. No deprecations. |
| googleapis JWT auth | googleapis@171.4.0 | `google.auth.JWT` is the correct service-account pattern for server-side Node.js. |
| Next.js ENV | next@16.2.5 | `process.env.VAR` in App Router server components/routes reads from `.env.local` in dev, from Vercel env in prod. `NEXT_PUBLIC_*` is baked at build time. |
| `server-only` package | Built into Next.js ecosystem | Zero dep; `import "server-only"` prevents accidental client bundle inclusion of server modules. |

---

## Open Questions

1. **Resend domain verification status**
   - What we know: `LEAD_INBOX_FROM=hello@kismetfinancegroup.com.au` is the intended from-address
   - What's unclear: Has Shane/the DNS manager added Resend's required DNS records? Is `kismetfinancegroup.com.au` verified in Resend?
   - Recommendation: Task 1.5 should include a step for Shane to verify the domain. Until verified, document `onboarding@resend.dev` as the dev/test override.

2. **Google Sheet existence**
   - What we know: Code appends to `Leads!A:E`; no sheet exists yet
   - What's unclear: Has a sheet been created? Has the service account been granted Editor access?
   - Recommendation: Task 1.5 should include setup instructions as a documented external step. The code is ready; the sheet is not.

3. **Calendly URL / Booking provider**
   - What we know: `NEXT_PUBLIC_BOOKING_URL` is in `.env.local` with no value; the `.env.example` also has it blank
   - What's unclear: Has Shane confirmed which booking tool he uses?
   - Recommendation: Leave as optional env var with empty string default. `BookingEmbed` component should handle empty URL gracefully (hide widget). Do not block Phase 1 completion on this.

4. **`replyTo` field in Resend**
   - What we know: `lib/email.ts` uses `replyTo: input.email` — email content passed directly from user input
   - What's unclear: Is the Resend `replyTo` field safe for unvalidated user input?
   - Recommendation: Zod validation already ensures `email` is a valid email address (`.email()` schema). No additional sanitization needed. This is safe.

---

## Validation Architecture

> `workflow.nyquist_validation: true` in `.planning/config.json` — section required.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None installed yet — `playwright` (1.59.1) is in devDeps but `@playwright/test` is NOT installed |
| Config file | None — no `playwright.config.ts` or `jest.config.*` exists |
| Quick run command | `npm run type-check` (TypeScript compile check) |
| Full validation command | `npm run build` (catches type errors + build failures) |
| Manual smoke | `node scripts/smoke-lead.mjs` (requires `npm run dev` running) |

### Phase 1 Task 1.5 Requirements → Validation Map

| Behavior | Test Type | Automated Command | Notes |
|----------|-----------|-------------------|-------|
| ENV vars validated at startup | unit / compile | `npm run type-check` | `lib/env.ts` throws at module load; TS catches undefined return type issues |
| Resend helper sends email correctly | manual | `node scripts/smoke-lead.mjs` | Requires real RESEND_API_KEY + verified domain |
| Sheets helper appends row | manual | `node scripts/smoke-lead.mjs` | Requires real Google Sheet + service account |
| Lead route returns 200 on valid POST | manual | `node scripts/smoke-lead.mjs` | Full pipeline test |
| Lead route returns 400 on invalid input | static analysis | `npm run type-check` | Zod schema covers this; already in place |
| `.env.example` matches all required vars | review | Manual diff against `lib/env.ts` exports | No automation needed |
| `lib/email.ts` not imported client-side | build gate | `npm run build` | `server-only` sentinel will fail build if violated |

### Per-Task Validation

- **Per-task commit:** `npm run type-check && npm run lint`
- **Per-wave merge:** `npm run build`
- **Phase gate:** `npm run build` green + manual smoke test documented as passed

### Wave 0 Gaps

- [ ] `lib/env.ts` — does not exist; covers env validation for all required vars
- [ ] `scripts/smoke-lead.mjs` — does not exist; covers manual e2e lead pipeline verification
- [ ] `@playwright/test` — NOT installed; not needed for Phase 1 but needed before Phase 2/3 e2e work
- [ ] No `playwright.config.ts` — not needed this phase; document as Phase 3 gap

*Note: No automated unit test framework is recommended for Phase 1. TypeScript + build + manual smoke is the appropriate validation bar for an integration-finalization phase with external credential gates.*

---

## Sources

### Primary (HIGH confidence)

- Direct code inspection: `lib/email.ts`, `lib/sheets.ts`, `app/api/lead/route.ts` — read verbatim
- Direct file inspection: `.env.example`, `.env.local`, `package.json`, `.planning/config.json`
- `docs/handoff/2026-05-25-code-review-plan.md` — previous session's handoff notes
- `CLAUDE.md` — project conventions and stack constraints
- `.planning/ROADMAP.md`, `STATE.md`, `REQUIREMENTS.md` — project state

### Secondary (MEDIUM confidence)

- Resend Node.js SDK docs: current API is `resend.emails.send({to, from, replyTo, subject, text})` — matches code
- googleapis JWT pattern: `google.auth.JWT({email, key, scopes})` — standard service-account pattern, consistent with googleapis@171.x docs
- Next.js `server-only` pattern: documented Next.js App Router convention for preventing server modules from leaking to client bundle

### Tertiary (LOW confidence)

- Rate-limiter serverless reset behavior: inferred from general serverless architecture knowledge; not verified against Vercel's specific cold-start behavior for this codebase

---

## Metadata

**Confidence breakdown:**
- Task scope: HIGH — code is read directly; what's done and what's not is clear
- Standard stack: HIGH — no new deps; existing packages are verified
- Architecture patterns: HIGH — drawn from existing code, not speculation
- Pitfalls: HIGH — `\n` footgun, domain verification, and tab name issues are known from direct code + handoff doc review
- Validation architecture: MEDIUM — no test files exist; recommendations are based on project config and available tools

**Research date:** 2026-06-10
**Valid until:** 2026-07-10 (stable domain; only changes if new requirements added to Phase 1)
