# External Integrations

**Analysis Date:** 2026-06-03

## APIs & External Services

**AI / LLM:**
- Anthropic Claude API — powers the on-site chat assistant widget (`app/api/chat/route.ts`)
  - SDK/Client: `@anthropic-ai/sdk` 0.100.1
  - Auth: `ANTHROPIC_API_KEY` env var (read by `lib/chat.ts` → `getAnthropicApiKey()`)
  - Model: configurable via `CHAT_MODEL` env var; defaults to `claude-opus-4-8`
  - Usage: streaming text responses (`messages.stream`), prompt caching on system prompt, thinking disabled
  - Rate limit: 30 requests / 15 min per IP (in-memory, resets on cold start)
  - Graceful degradation: returns 503 `service_unconfigured` if `ANTHROPIC_API_KEY` absent

**Transactional Email:**
- Resend — sends lead notification emails when the contact form is submitted (`lib/email.ts`)
  - SDK/Client: `resend` 6.12.3
  - Auth: `RESEND_API_KEY`
  - From address: `LEAD_INBOX_FROM` (must be a verified Resend domain in production: `kismetfinancegroup.com.au`)
  - Dev fallback: `onboarding@resend.dev` (Resend sandbox, no domain verification needed)
  - Recipient: `LEAD_INBOX_TO` (currently `shane@kismetfinancegroup.com.au`)

## Data Storage

**Databases:**
- None. No traditional database.

**Spreadsheet as lead log:**
- Google Sheets v4 API — appends one row per lead submission (`lib/sheets.ts`)
  - Client: `googleapis` 171.4.0, `google.sheets({ version: "v4" })`
  - Auth: Google Service Account JWT (`GOOGLE_SERVICE_ACCOUNT_EMAIL` + `GOOGLE_SERVICE_ACCOUNT_KEY`)
  - Target: spreadsheet ID from `GOOGLE_SHEETS_ID`, range `Leads!A:E`
  - Columns: Timestamp | Name | Email | Phone | Message
  - Note: `GOOGLE_SERVICE_ACCOUNT_KEY` must be stored as a single line with literal `\n` sequences; `lib/sheets.ts` converts them back at runtime

**File Storage:**
- Local filesystem only — static assets in `public/`, source photos in `photos-raw/`, processed photos in `public/photos/`

**Caching:**
- None (no Redis, no KV store). Rate limiter uses in-memory `Map` — resets on serverless cold start.

## Authentication & Identity

**Auth Provider:**
- None. No user login, no session management.
- The chat and lead API routes use per-IP in-memory rate limiting only.

## Lead Pipeline Architecture

Flow in `app/api/lead/route.ts`:
1. IP rate limit check (5 req / 15 min per IP, in-memory `Map`)
2. Honeypot field rejection (spam filter)
3. Zod schema validation (name, email, phone, message)
4. `Promise.allSettled([sendLeadEmail(data), appendLeadRow({...data, submittedAt})])` — dual-sink, partial success allowed
5. Returns `ok: true` if either sink fulfils; `503 service_unconfigured` only if both fail due to missing env vars

## Booking Widget

**Provider:** Configurable — Calendly or similar
- Env var: `NEXT_PUBLIC_BOOKING_URL` (optional)
- When blank, the `BookingEmbed` component hides itself entirely
- `.env.example` shows example: `https://calendly.com/shane-kismet/30min`

## Fonts

**Google Fonts:**
- Montserrat — loaded server-side via `next/font/google` in `app/layout.tsx` (no external runtime request; Next.js self-hosts at build time)

**Self-hosted:**
- Berlingske Serif — webfont files in `public/fonts/`, declared via `@font-face` in `app/globals.css`

## Monitoring & Observability

**Error Tracking:**
- None (no Sentry, no Datadog).

**Logs:**
- `console.warn` / `console.error` at partial sink failure, full sink failure, and rate limit events in `app/api/lead/route.ts` and `app/api/chat/route.ts`
- Vercel captures stdout/stderr automatically on the platform

## SEO & Structured Data

**JSON-LD:** `ProfessionalService` schema injected inline in `app/layout.tsx` — carries ABN, address, phone, email, founders, social links

**Social profiles:**
- Instagram: `https://www.instagram.com/kismetfinancegroup/`
- Facebook: `https://www.facebook.com/kismetfinancegroup`
- Listed in JSON-LD `sameAs` array; no API integration

**Sitemap/Robots:**
- `app/sitemap.ts` — code-generated `/sitemap.xml` (new routes must be added manually)
- `app/robots.ts` — code-generated `/robots.txt`

## CI/CD & Deployment

**Hosting:**
- Vercel (inferred from framework choice, `eslint-config-next`, live URL `https://kismetfinancegroup.com.au`)

**CI Pipeline:**
- None configured (no GitHub Actions, no Vercel CI beyond auto-deploy)
- `npm run build` runs `postbuild` → `npm run lint` — clean build implies clean lint

## Environment Configuration

**Required env vars (all secrets, never commit):**
- `RESEND_API_KEY` — Resend API key
- `LEAD_INBOX_TO` — recipient address for lead emails
- `LEAD_INBOX_FROM` — sender address (must be Resend-verified domain in production)
- `GOOGLE_SHEETS_ID` — Google Sheet ID for lead log
- `GOOGLE_SERVICE_ACCOUNT_EMAIL` — service account email (from GCP JSON key)
- `GOOGLE_SERVICE_ACCOUNT_KEY` — service account private key (single-line, `\n` escaped)
- `ANTHROPIC_API_KEY` — Claude API key for chat assistant

**Optional env vars:**
- `NEXT_PUBLIC_BOOKING_URL` — booking widget embed URL (Calendly or similar); widget hidden if blank
- `CHAT_MODEL` — override Claude model; defaults to `claude-opus-4-8`

**Secrets location:**
- Local dev: `.env.local` (gitignored)
- Production: Vercel project environment variables
- Template: `.env.example` (committed, no real values)

## Webhooks & Callbacks

**Incoming:**
- `POST /api/lead` — contact form submissions from the site's own frontend
- `POST /api/chat` — streaming chat messages from the `ChatWidget` component

**Outgoing:**
- None. All external calls are request-initiated (Resend email send, Google Sheets append, Anthropic stream).

---

*Integration audit: 2026-06-03*
