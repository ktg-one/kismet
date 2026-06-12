---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: Marketing Site (Hardening + Animation + Ship)
current_phase: 03
status: complete
last_updated: "2026-06-10T00:00:00.000Z"
progress:
  total_phases: 4
  completed_phases: 4
  total_plans: 9
  completed_plans: 9
  percent: 100
---

# Project State: Kismet-site

## Status: COMPLETE — project closed at v1.0 (owner decision, 2026-06-10)

The Kismet Finance Group marketing site is done and live at
https://kismetfinancegroup.com.au. The owner has closed the web project at v1.0.
This STATE reflects the honest end-of-project ledger: what shipped, what was
consciously deferred (not silently dropped), and where the loose ends live.

## What shipped (done + verified)

- **Phase 1 — Foundation & Hardening:** API security (honeypot + per-IP rate
  limit), React 19 hook fixes, Shane-voice About audit, lead pipeline env
  contract (`lib/env.ts`) + smoke script. Codebase map refreshed 2026-06-09.
- **Phase 2 — Animation & Interactivity:** five animation lanes (reveal audit,
  card polish, MagneticCTA, page transitions, GSAP final pass) merged via
  `feat/animations`; reduced-motion gating removed (it had hidden all motion
  from the client); scroll-driven `ScrollReveal`/`ScrollParallax` added;
  scrub-reveal showcase cards on about + approach (PR #9).
- **Phase 3 — Deployment:** site is LIVE on Vercel; production build + deploy
  done. This was the shipping goal and it is met.

## Done this cycle but NOT yet merged to main (loose end)

- **Section-height standardisation + perceptibility** on branch
  `agent/ultracode/510810bd`: `.section-screen` utility (min-height:100svh) on
  the four homepage sections so GSAP/ScrollTrigger math is reliable, and
  `ScrollReveal` scale 0.9->0.84. Playwright-measured and verified
  (hero-watermark 148px, photo 113px+0.15, StrategicPathways cards 120px+0.16;
  all >= the 80px / 0.15 perceptibility thresholds). Evidence in
  `docs/handoff/observer-feed.md`. **Decision needed at close: merge this branch
  or consciously drop it.**

## Consciously DEFERRED at close (not done — recorded, not silently dropped)

- Phase 3.2 Vercel env-var sync and 3.3 GA4 analytics — optional ops/analytics,
  non-blocking for "site live". Not done.
- Phase 4 — em-dash CI gate, `.understand-anything` knowledge graph, final
  Lighthouse a11y/perf pass, CLAUDE.md AI-collaboration guidelines. Polish, not
  done.

## Built but out of scope for v1.0 (belongs to the deferred v2.0 milestone)

- **ElevenLabs voice TTS** — implemented on `agent/gemini/64c502eb` (PR #11,
  OPEN/unmerged). Voice IDs Lee `abRFZIdN4pvo8ZPmGxHP`, Emma
  `56bWURjYFHyYyVf490Dp`. This is a v2.0 (Interactive AI Layer) feature, not part
  of the v1.0 marketing site. Leave for v2.0 or merge separately if wanted.

## Future / not started — v2.0 Interactive AI Layer (backlog, deferred)

Detailed SPECs preserved on branch `agent/ultracode/510810bd` under
`.planning/phases/05..08/`: GSAP signature motion, voice I/O, demo voice agent +
phone (Trillet on owner's Twilio, +61 8 7741 4191), premium web-analyzer.
Not built. Out of scope for this close.

## Planning hygiene note

Two Phase-3 dirs exist after parallel-agent work: `03-deployment-analytics`
(canonical Phase 3) and `03-scroll-polish` (interim animation-polish plan whose
work was folded into Phase 2 scope). Both retained for history; canonical
Phase 3 = Deployment & Analytics.

## Blockers

- None. Project closed.
