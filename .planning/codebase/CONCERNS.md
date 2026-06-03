# Codebase Concerns

**Analysis Date:** 2026-06-03

---

## Tech Debt

**In-memory rate limiter resets on serverless cold start:**
- Issue: Both `app/api/lead/route.ts` and `app/api/chat/route.ts` use a module-level `Map` (`ipCache`) for rate limiting. Serverless cold starts reset the map — a burst of requests across invocations bypasses the 15-minute window entirely.
- Files: `app/api/lead/route.ts:6-31`, `app/api/chat/route.ts:13-47`
- Impact: Under traffic (real or bot), the rate limit provides no reliable protection. For the lead route (5/15min), a persistent attacker can submit unlimited forms. The chat route (30/15min) carries Anthropic API cost risk.
- Fix approach: Replace `Map` with a shared KV store (Vercel KV / Upstash Redis). The code comment at `app/api/chat/route.ts:13` acknowledges this explicitly as a revisit item.

**Duplicate GSAP plugin registration across components:**
- Issue: `gsap.registerPlugin(ScrollTrigger, useGSAP)` is called at module scope in four separate files.
- Files: `components/Hero.tsx:15`, `components/ScrollParallax.tsx:8`, `components/ScrollReveal.tsx:8`, `components/SmoothScroll.tsx:9`
- Impact: Harmless at runtime (GSAP idempotently ignores re-registration), but adds noise and creates a maintenance split — a future plugin addition must be added in four places.
- Fix approach: Centralise in a single `lib/gsap.ts` that registers all plugins and re-exports `gsap`, `ScrollTrigger`, `useGSAP`. Each component imports from there.

**Booking URL hardcoded across 10+ files, env var only consulted in 2:**
- Issue: `https://calendar.app.google/gBTNh7XSxQXxiXZF7` is hardcoded in `app/about/page.tsx:48`, `app/approach/page.tsx:53`, `app/approach/page.tsx:78`, `app/not-found.tsx:55`, `app/pathways/page.tsx:28`, `app/insights/page.tsx:26`, `components/ArticleLayout.tsx:101`, `components/SiteHeader.tsx:98`, `components/SiteHeader.tsx:187`, `components/SiteFooter.tsx:46`. Only `app/page.tsx:22` and `components/ContactInquiry.tsx:291` correctly use `process.env.NEXT_PUBLIC_BOOKING_URL ?? fallback`.
- Impact: Changing the booking link requires 10+ surgical edits across the codebase. A stale link in production is one missed file away.
- Fix approach: Extract to a single `lib/constants.ts` exporting `BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ?? "https://..."`. Import everywhere.

**Dev-only image processing packages in production `dependencies`:**
- Issue: `heic-convert`, `sharp`, and `playwright` are listed under `dependencies` (not `devDependencies`) in `package.json:23,43,44`.
- Impact: These ship into the production bundle resolution graph and increase install footprint in CI/CD and serverless environments. `playwright` especially pulls in Chromium binaries.
- Fix approach: Move all three to `devDependencies`. They are only used by `scripts/` one-off tooling and are never imported by `app/`, `components/`, or `lib/`.

**`SHOW_SCROLL_MARKERS` pattern is duplicated and brittle:**
- Issue: Each scroll-animation component (`Hero.tsx:17`, `ScrollParallax.tsx:10`, `ScrollReveal.tsx:10`) independently declares `const SHOW_SCROLL_MARKERS = process.env.NODE_ENV !== "production"` and threads it into ScrollTrigger `markers:`. GSAP debug markers are DOM overlays that corrupt the visual in dev builds.
- Impact: Any new scroll component must remember to add the constant. A developer who adds `markers: true` directly (instead of `markers: SHOW_SCROLL_MARKERS`) ships debug overlays to production.
- Fix approach: Centralise in `lib/gsap.ts` alongside plugin registration. Export `SHOW_SCROLL_MARKERS` from there.

---

## Known Bugs

**Phone field schema mismatch — field labelled optional in UI but required in API:**
- Symptoms: `ContactInquiry.tsx:129` labels the phone field "Phone (Optional)" and does not mark it `required`. However `app/api/lead/route.ts:14` validates `phone: z.string().min(6)` — Zod will reject a blank phone submission with a 400.
- Files: `app/api/lead/route.ts:14`, `components/ContactInquiry.tsx:129-137`
- Trigger: Submit the contact form with name, email, and message but leave phone blank.
- Workaround: None visible to the user — they see "Please check your details and try again" with no field indication.
- Fix: Either make phone optional in the Zod schema (`z.string().min(6).optional().or(z.literal(""))`) or remove the "Optional" label and add `required` to the input.

**Testimonial references "Dan" — name not on the Kismet team:**
- Symptoms: `app/page.tsx:105` includes a Google review mentioning "someone like Dan". The two Directors are Shane Hewson and Josh Hewson. "Dan" is not identified anywhere in the codebase or `project-notes/`.
- Files: `app/page.tsx:103-107`
- Impact: A compliance risk — the system prompt in `lib/chat.ts:66` explicitly states "Do not invent any other details, hours, prices, or staff names." A visitor reading the testimonial may ask the chatbot about Dan and receive a confused response.
- Workaround: None.
- Fix: Verify whether Dan is a real person (a contractor, referral partner?) or if the testimonial was selected without vetting. If unverifiable, swap the testimonial.

---

## Security Considerations

**No HTTP security headers configured:**
- Risk: `next.config.ts` has no `headers()` function and no Content-Security-Policy, `X-Frame-Options`, `X-Content-Type-Options`, or `Referrer-Policy` headers. The site is embeddable in iframes by any domain.
- Files: `next.config.ts`
- Current mitigation: None.
- Recommendations: Add a `headers()` export to `next.config.ts` setting at minimum `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and a CSP that whitelists the CDN origins already in use.

**`dangerouslySetInnerHTML` on user-generated Markdown content:**
- Risk: `components/ArticleLayout.tsx:78` renders `article.html` (remark-generated from Markdown files) directly into the DOM. `remark-html` does not sanitize by default — if any content file were compromised or authored carelessly, raw `<script>` tags in the Markdown would execute.
- Files: `components/ArticleLayout.tsx:78`, `lib/articles.ts:37`
- Current mitigation: Articles live in `content/insights/` behind Git access; public users cannot author them. Risk is supply-chain/editorial.
- Recommendations: Add `remark-html` with `sanitize: true` option, or swap to `rehype-sanitize` in the remark pipeline. The JSON-LD usage of `dangerouslySetInnerHTML` in `app/layout.tsx:115` is safe (static constant, no user input).

**`replyTo` uses unvalidated user email — potential email header injection surface:**
- Risk: `lib/email.ts:19` sets `replyTo: input.email` directly from the form submission. Zod validates it as a valid email address, which substantially mitigates the risk, but Resend's SDK is the last line of defence against any header injection a malformed-but-valid email might carry.
- Files: `lib/email.ts:19`, `app/api/lead/route.ts:46`
- Current mitigation: Zod `z.string().email()` validation at `app/api/lead/route.ts:14`.
- Recommendations: Current posture is adequate for a low-volume form. If Resend's SDK does not sanitize `replyTo`, consider stripping non-ASCII and newline characters before passing.

**`x-forwarded-for` IP for rate limiting is spoofable:**
- Risk: Both route rate limiters read IP from `req.headers.get("x-forwarded-for")?.split(",")[0]`. On Vercel, this header is set by the platform and is not spoofable in production, but the code has no explicit trust-proxy check — it would be trivially bypassed in any other deployment (self-hosted, Railway) by sending a forged header.
- Files: `app/api/lead/route.ts:20`, `app/api/chat/route.ts:37`
- Current mitigation: Vercel's edge network strips and sets `x-forwarded-for` reliably.
- Recommendations: Document the Vercel-only assumption explicitly, or add a `CF-Connecting-IP` / `x-real-ip` fallback chain.

---

## Performance Bottlenecks

**`will-change-transform` applied unconditionally on all ScrollReveal and ScrollParallax wrappers:**
- Problem: Every element wrapped in `ScrollReveal` (`components/ScrollReveal.tsx:88`) or `ScrollParallax` (`components/ScrollParallax.tsx:81`) gets `will-change-transform` added as a static class regardless of whether the animation has fired or is even visible.
- Files: `components/ScrollReveal.tsx:88`, `components/ScrollParallax.tsx:81`
- Cause: Pages with many cards (e.g. `app/pathways/page.tsx`, `app/about/page.tsx`) promote many layers simultaneously, increasing GPU memory and compositing overhead.
- Improvement path: Remove `will-change-transform` from static class and instead apply it only when the ScrollTrigger is active using GSAP `onStart`/`onComplete` callbacks. GSAP itself manages `will-change` internally when `force3D: true` is set.

**`CustomCursor` runs a `gsap.ticker` tick every animation frame even when cursor is stationary:**
- Problem: `components/CustomCursor.tsx:59-66` lerps dot and ring positions in every `gsap.ticker` frame unconditionally. With no delta threshold, it calls `gsap.set()` 60fps even when the pointer has not moved.
- Files: `components/CustomCursor.tsx:59-66`
- Cause: No `isDirty` / delta-threshold guard.
- Improvement path: Track previous target coords; skip `gsap.set` when `Math.abs(target.x - d.x) < 0.1 && Math.abs(target.y - d.y) < 0.1`.

**`GrainOverlay` uses an inline SVG data URL pattern that repaints on every scroll:**
- Problem: `components/GrainOverlay.tsx` renders a `fixed`-position overlay with a tiled SVG background using `mix-blend-mode: overlay`. Because it is `fixed`, it stays in place, but the SVG `feTurbulence` filter can be expensive on some GPU paths.
- Files: `components/GrainOverlay.tsx`
- Cause: SVG filter in a tiled background on a full-viewport fixed element.
- Improvement path: Low severity. Replace with a pre-rendered PNG grain texture (`/public/grain.png`) which the GPU tiles natively without SVG filter evaluation overhead.

---

## Fragile Areas

**`SmoothScroll` bridge is the single point of failure for all GSAP scroll work:**
- Files: `components/SmoothScroll.tsx`
- Why fragile: `ReactLenis` with `autoRaf: false` + the `LenisGsapBridge` component are the agreed contract. If this component is unmounted, re-mounted, or if a child re-creates a Lenis instance, all `ScrollTrigger` calculations will drift. The comment in `CLAUDE.md` warns about this but the enforcement is social — there is no runtime guard.
- Safe modification: Never add a second `ReactLenis` or a second call to `lenis.raf`. If `SmoothScroll` is split or moved, keep the bridge co-located with the single Lenis root. Test by scrolling halfway down a long page and confirming ScrollTrigger `start`/`end` markers align.
- Test coverage: None. No automated test validates that Lenis and ScrollTrigger are in sync.

**`ipCache` is a module-level singleton shared across requests in the same invocation:**
- Files: `app/api/lead/route.ts:9`, `app/api/chat/route.ts:18`
- Why fragile: In Next.js App Router on Vercel, route handlers that are not explicitly marked `export const runtime = "edge"` run in the Node.js runtime. The `Map` persists for the lifetime of a warm function instance but is not shared across instances. Concurrent high traffic to two warm instances each see a fresh counter after split.
- Safe modification: Treat the rate limiter as best-effort for the current deployment scale. Do not add logic that relies on the counter being globally accurate across instances.

**`remark-html` renders without sanitization — content pipeline trust assumption:**
- Files: `lib/articles.ts:37`, `components/ArticleLayout.tsx:78`
- Why fragile: The entire XSS surface of the Insights section is gated on "trusted Markdown authors with Git access." One unsafe `<script>` tag in a content file produces a live XSS in the browser. This is low risk today but high blast-radius.
- Safe modification: Do not author raw HTML in Markdown files. Any `<iframe>`, `<script>`, or `<object>` tag in a `.md` file will pass through unfiltered.
- Test coverage: None.

**`ContactInquiry` form has no client-side phone field length validation:**
- Files: `components/ContactInquiry.tsx:129-137`
- Why fragile: Phone is labelled Optional, has no `minLength` attribute, no client-side guard, but the server rejects blank submissions with min(6). The mismatch is invisible to the user and could generate confusing UX regressions if the form is modified.
- Safe modification: Match the form label and input `required`/`minLength` to exactly what the Zod schema demands at the API boundary.

---

## Scaling Limits

**Anthropic API costs are unbounded per chat session:**
- Current capacity: `CHAT_LIMITS.maxMessages = 20`, `maxOutputTokens = 800`. Default model is `claude-opus-4-8` — the most expensive Claude tier.
- Limit: At 30 requests per IP per 15 minutes, a single warm serverless instance could generate up to 30 × 800 = 24,000 output tokens per 15 minutes per IP before rate limiting kicks in. Across cold starts the effective cap is higher.
- Scaling path: Switch `CHAT_MODEL` default to `claude-haiku-4-5` for the public widget (noted as an option in `lib/chat.ts:17`). Add a server-side token budget with Anthropic's usage headers. The env var `CHAT_MODEL` can be changed without a deploy.

---

## Dependencies at Risk

**`googleapis` (`^171.4.0`) is a large, broad SDK pulled in only for Sheets append:**
- Risk: The entire Google APIs SDK (~10MB unpacked) is installed for a single spreadsheet append operation. Versioned with `^`, meaning major bumps could break the JWT auth pattern.
- Impact: Increased cold-start time on the serverless lead route.
- Migration plan: Replace with a direct REST call to the Sheets API v4 using `fetch` + a JWT signed with the service account key. Removes the dependency entirely.

**`sharp` in `dependencies` (not `devDependencies`):**
- Risk: `sharp` ships native binaries for the target platform. Listed under `dependencies`, it is included in the production install graph and may cause platform mismatch errors on Vercel's Linux runtime if the lockfile was generated on Windows (where the `win32-x64` native binding is selected).
- Impact: Potential `Error: Could not load the "sharp" module using the win32-x64 runtime` on deploy.
- Migration plan: Move to `devDependencies`. It is used only by `scripts/optimize-photos.mjs`.

---

## Missing Critical Features

**No CSRF protection on the lead form:**
- Problem: `app/api/lead/route.ts` has no CSRF token, SameSite cookie, or `Origin` header check. The form can be submitted cross-origin from any page.
- Blocks: The honeypot + rate limit are the only spam defences. A bot that omits the honeypot field and cycles IPs will reach both sinks without restriction.
- Notes: Next.js does not add CSRF protection automatically for API routes. For a public lead form this is low priority, but it means the Sheets row and email can be flooded.

**No `robots.txt` disallow for `/api/` routes:**
- Problem: `app/robots.ts` is not visible in the file listing to confirm its content, but `app/sitemap.ts` registers all content pages. If `/api/chat` and `/api/lead` are crawlable, search engines may attempt to index or hit them.
- Blocks: Not blocking, but is a hygiene gap.
- Fix: Confirm `app/robots.ts` disallows `/api/`.

---

## Test Coverage Gaps

**No test runner configured — zero automated tests:**
- What's not tested: The entire codebase. No unit tests, no integration tests, no E2E tests.
- Files: All of `app/`, `components/`, `lib/`
- Risk: Regressions in the lead pipeline (rate limit, honeypot, Zod validation, sink error handling), scroll animation sync, and chat compliance guardrails are all caught only by manual QA.
- Priority: High for `app/api/lead/route.ts` and `lib/articles.ts` (slug traversal guard). Medium for `lib/chat.ts` system prompt integrity.
- Notes: `CLAUDE.md` states "There is no test runner configured." `npm run build` lints via postbuild but does not execute tests. Consider Vitest with jsdom for unit coverage of `lib/` modules.

**`lib/articles.ts` path traversal guard is untested:**
- What's not tested: `getArticle`'s directory traversal rejection (`slug.includes("..")`, `slug.includes("/")`, `slug.includes("\\")`) at `lib/articles.ts:60`.
- Files: `lib/articles.ts:58-62`
- Risk: A bypass in the guard (e.g. URL-encoded `%2F`) would allow reading arbitrary files from `content/insights/`. Next.js decodes slugs before passing to page params, so the current guard likely covers the real attack surface — but it is unverified.
- Priority: Medium.

---

*Concerns audit: 2026-06-03*
