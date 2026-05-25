# Handoff: Code Review Plan

Written 2026-05-25 by previous session for whoever runs `/gsd-code-review` next.

## Context in one paragraph

This site (`feat/stitch-redesign` branch) was built by a desktop LLM (Claude Desktop or ChatGPT Desktop) and handed to us by the client because he doesn't know how to deploy it. There is no Vercel project yet. Plan-vs-code mapping was completed last session — see "Status" below. The code is competent baseline (textbook framer-motion patterns, JSDoc commentary in unmistakable LLM style) but not award-tier. The goal here is **harden to ship**, not redesign.

## How to run the review

This repo is NOT a GSD-phased project — there is no `.planning/` directory. `/gsd-code-review <phase>` will fail because phase state doesn't exist.

**Two viable paths:**

1. **Targeted with `--files` (recommended):** scope to the files this handoff calls out. Skips SUMMARY/git scoping entirely.
   ```
   /gsd-code-review --files=components/TestimonialBlock.tsx,components/Reveal.tsx,components/Hero.tsx,components/MagneticCTA.tsx,components/PageTransition.tsx,app/api/lead/route.ts,lib/email.ts,lib/sheets.ts,lib/articles.ts --depth=standard
   ```

2. **Git-diff fallback:** branch is ahead of main by 30+ commits, so plain `/gsd-code-review` will pick up everything in the redesign. That's too broad — prefer path 1.

If you must initialize GSD first, mock a phase: create `.planning/phases/01-handoff/` with a stub `SUMMARY.md` listing the files in path 1, then `/gsd-code-review 1`.

## Known issues — don't waste cycles rediscovering these

| File | Issue | Severity | Status |
|---|---|---|---|
| `components/TestimonialBlock.tsx:83` | `setScrollSnaps(emblaApi.scrollSnapList())` called synchronously inside `useEffect` body → React 19 `react-hooks/set-state-in-effect` error. Caught by lint. | **error** | not fixed — needs Embla `init`/`reInit` event handler pattern |
| `components/Reveal.tsx` (RevealWords) | Adds `will-change: transform` to every animated word and never removes it after animation completes | minor perf leak | not fixed |
| `components/Hero.tsx` | Above-the-fold headline uses `whileInView` via `RevealWords`. Motion library has to hydrate before headline animates → perceived delay on LCP. Hero showed up as **static** in client's screenshot. | medium UX | not fixed; user reported "site was static when he showed it" — investigate hydration |
| `components/Hero.tsx` | Ambient orbs + smoke gradient + watermark are static CSS layers, not animated. Looks atmospheric in stills, dead in motion. | design quality, not bug | by design for restraint, but worth flagging |
| `.mcp.json` | Still has `gsap-master` entry. User wants it removed; auto-mode classifier kept false-positive-blocking my edits. | cleanup | manual remove pending |
| `.claude/settings.json` | User pasted hook config with a trailing `{}` → invalid JSON, so the PostToolUse ESLint hook never fires. | tooling | user knows; needs manual fix |

## Priority targets for the reviewer

### Tier 1 — ship blockers (security + correctness)

1. **`app/api/lead/route.ts`** — POST handler taking form data, sending Resend email, writing Google Sheet. Verify:
   - Zod validation on the full payload
   - Rate limiting (currently absent? confirm)
   - CSRF stance (Next App Router default is fine but confirm no cookie auth assumed)
   - Honeypot or other spam mitigation
   - Error responses don't leak credentials/PII
2. **`lib/email.ts`** — Resend wiring. Verify:
   - `RESEND_API_KEY` checked at boot, not silently undefined
   - Email body sanitized (user input rendered without HTML-escape risk)
   - `from` address matches verified Resend domain
3. **`lib/sheets.ts`** — Google service-account auth. Verify:
   - `GOOGLE_SERVICE_ACCOUNT_KEY` newline handling (the classic `\n` vs literal newline footgun)
   - Sheet write is appended, not overwriting headers
   - PII column ordering is intentional and documented

### Tier 2 — correctness/perf

4. **`components/TestimonialBlock.tsx`** — fix the React 19 violation cleanly. Two options:
   - Wire `setScrollSnaps` to the Embla `init` event in the same effect (acceptable)
   - Or pull into a ref + use the `reInit` lifecycle (cleaner)
   - Verify the dot navigation a11y (role=tab + aria-selected) survives the fix.
5. **`components/Reveal.tsx`** — add `onAnimationComplete` to drop `will-change` after motion settles.
6. **`components/Hero.tsx`** — investigate the "site was static" report. Could be:
   - Motion library not loading on user's browser
   - SSR fallback showing pre-animation state forever (motion's `whileInView` requires JS)
   - User saw a screenshot, not a live render
7. **`lib/articles.ts`** — markdown ingestion via remark. Verify:
   - Frontmatter shape is validated (zod or similar)
   - No injection via slug param into filesystem reads
   - Reading from `content/insights/` is path-safe

### Tier 3 — quality/style

8. **`components/PageTransition.tsx`**, **`components/MagneticCTA.tsx`** — these are well-written; pattern-check only. Skip if reviewer is time-constrained.
9. **Em-dash audit** — plan Task 12 calls for an em-dash grep gate. Many `—` in source files. Confirm the plan still wants them stripped, then add a grep CI gate.

## Anti-targets (do NOT review)

- `.understand-anything/` — tool intermediate output, gitignored
- `.serena/` — language server cache, mostly gitignored
- `.next/`, `node_modules/` — standard ignores
- `public/photos/` — assets, not code
- `scripts/optimize-photos.mjs` etc. — dev-only tooling, not shipping path

## Plan progress map (also see CLAUDE.md)

Done: Tasks 1–9, 16 (copy pass).
Not done: 10 (Newsletter), 11 (Analytics), 12 (CI gates / em-dash grep / tests), 13 (Vercel project setup — **THE big one**), 14 (live env test), 15 (Lighthouse + a11y), 17 (final review), 18 (DNS cutover).

## Tooling state at handoff

- ESLint installed + flat config + `npm run lint` works. One pre-existing error (the TestimonialBlock issue above).
- `next.config.ts` has `allowedDevOrigins` for LAN dev.
- `.claude/hooks/lint-changed.mjs` exists; `.claude/settings.json` wiring broken (see known issues).
- `agentmemory` MCP verified working. `mem0` is legacy — saved a memory about migrating off it.
- jcodemunch indexed the repo: `local/kismet-website-c3326f12`, 78 files, 326 symbols. Use it for symbol search instead of grep.

## Suggested next moves after review

1. Apply Tier 1 + Tier 2 fixes (auto-fixable: pass `--fix` to /gsd-code-review)
2. Confirm Vercel project doesn't exist (Vercel MCP available) → create it → preview deploy
3. Have client fill in `.env.example` blanks (Resend key, Google service account, Sheets ID, booking URL)
4. End-to-end test of lead form before DNS cutover
