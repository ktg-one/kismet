# Roadmap: Kismet-site

## Phase 1: Foundation & Hardening (Complete)
*Hardening the existing codebase and finalizing initial integrations.*

- [x] Task 1.1: Initialize .planning and GSD workflow.
- [x] Task 1.2: Implement API Security (Honeypot, Rate Limiting).
- [x] Task 1.3: Fix React 19 hook violations in carousel.
- [x] Task 1.4: Sanitize Shane Voice on About page.
- [x] Task 1.5: Finalize Resend & Google Sheets helpers (verify ENV usage).
  - **Plans:** 2 plans
  - [x] 01-01-PLAN.md -- Env contract: create lib/env.ts, wire lib/email.ts + lib/sheets.ts, annotate .env.example
  - [x] 01-02-PLAN.md -- Smoke script: create scripts/smoke-lead.mjs, close external gates checkpoint

## Phase 2: Animations & Interactivity Upgrade (Complete)
*Enhancing the visual experience with Motion v12.*

**Execution priority (lowest to highest complexity):**
1. Reveal and RevealWords audit.
2. Card hover and reveal polish.
3. Magnetic CTA refinement.
4. Page-level transition refinement.
5. GSAP scroll or timeline final pass.

**Orchestration:** Explore and implement animation lanes in separate worktrees or branches, then merge sequentially in the priority order above. Do not introduce new GSAP work until the final lane.

- [x] Task 2.1: Audit all `Reveal` and `RevealWords` components.
- [x] Task 2.2: Fix Hero headline hydration delay. (Fixed: added `immediate` prop to `Reveal` components)
- [x] Task 2.3: Implement smooth page-level transitions.
- [x] Task 2.4: Add magnetic CTA effects to primary buttons.
- [x] Task 2.5: Polish card hover and reveal animations as a separate lane.
- [x] Task 2.6: Audit existing GSAP scroll effects and reserve any new GSAP work for the final pass.
- [x] Task 2.7 (follow-on, PR #2): Remove `prefers-reduced-motion` gating (it was hiding all motion from the client) and add perceptible scroll-DRIVEN reveals (ScrollTrigger scrub) on cards/photos.
  - **Plans:** 5/5 plans executed + follow-on (PR #2)
  - [x] 02-01-PLAN.md -- Reveal and RevealWords audit on `anim/reveal-audit`
  - [x] 02-02-PLAN.md -- Card hover and reveal polish on `anim/card-polish`
  - [x] 02-03-PLAN.md -- Magnetic CTA refinement on `anim/magnetic-ctas`
  - [x] 02-04-PLAN.md -- Page transition refinement on `anim/page-transitions`
  - [x] 02-05-PLAN.md -- GSAP final pass on `anim/gsap-final-pass`
  - [x] Follow-on -- reduced-motion removal + scroll-driven `ScrollReveal` on `anim/scroll-reveal` (PR #2 → `feat/animations`); heavy pinned ktg.one-style choreography deferred to a separate owner

## Phase 3: Deployment & Analytics (Shipped — site live; analytics deferred)
*Shipping the site to Vercel and setting up tracking.*

- [x] Task 3.1: Initialize Vercel project and link repo. (Site is live on Vercel; Vercel CLI present.)
- [~] Task 3.2: Configure Environment Variables in Vercel. **DEFERRED at close** (optional ops, non-blocking).
- [~] Task 3.3: Set up Google Analytics 4 (GA4) with environment gating. **DEFERRED at close** (optional analytics, non-blocking).
- [x] Task 3.4: Perform first production build and preview deploy. (Deployed.)

**Plans:** 2 plans
- [~] 03-01-PLAN.md — Configure Environment Variables in Vercel (deferred)
- [~] 03-02-PLAN.md — Set up Google Analytics 4 (GA4) (deferred)

> Shipping goal met: the site is live. GA4 + env-var sync were consciously
> deferred when the owner closed the project, not silently dropped.

## Phase 4: AI Preparation & Final Audit (Deferred at close — backlog)
*Optimizing for future collaboration and site quality. Polish, non-blocking; not done.*

- [~] Task 4.1: Automate em-dash grep CI gate. (deferred)
- [~] Task 4.2: Update `.understand-anything` knowledge graph. (deferred)
- [~] Task 4.3: Final Lighthouse performance & a11y pass. (deferred)
- [~] Task 4.4: Document AI collaboration guidelines in CLAUDE.md. (deferred)

---

# Project Closeout — v1.0 (2026-06-10)

Owner closed the Kismet marketing-site project at v1.0. Site is done and live at
https://kismetfinancegroup.com.au. Legend: `[x]` done · `[~]` consciously
deferred (recorded, not silently dropped).

**Shipped:** Phases 1–2 complete; Phase 3 shipping goal met (live on Vercel);
scroll-scrub reveals on home/about/approach merged.

**Done this cycle, NOT yet merged to main (decide: merge or drop):**
`agent/ultracode/510810bd` — `.section-screen` 100svh standardisation on the
homepage + `ScrollReveal` perceptibility fix, Playwright-verified (see
`docs/handoff/observer-feed.md`).

**Built, out of v1.0 scope (v2.0):** ElevenLabs voice TTS — PR #11 OPEN, unmerged.

**Future / not built — v2.0 Interactive AI Layer (backlog):** signature GSAP
motion, voice I/O, demo phone agent (Trillet on owner Twilio, +61 8 7741 4191),
premium web-analyzer. Detailed SPECs preserved on `agent/ultracode/510810bd`
under `.planning/phases/05..08/`.

**Planning hygiene:** canonical Phase 3 = `03-deployment-analytics`;
`03-scroll-polish` was an interim animation-polish plan (work folded into
Phase 2). Both kept for history.
