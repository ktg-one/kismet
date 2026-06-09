---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
current_phase: 03
status: in_progress
last_updated: "2026-06-01T16:30:00.000Z"
progress:
  total_phases: 4
  completed_phases: 2
  total_plans: 7
  completed_plans: 7
  percent: 71
---

# Project State: Kismet-site

## Overview

Current Phase: 03 (Phase 2 complete incl. animation follow-on)
Next Step: Merge PR #2 (`anim/scroll-reveal` → `feat/animations`) to ship the perceptible scroll animations, then finish Phase 3 (GA4 + env-var confirmation — the site itself is already live on Vercel).

## Summary

Phase 1 (foundation/hardening) and Phase 2 (animation & interactivity) are complete. Phase 2 ran as five isolated animation lanes (Reveal audit, card polish, MagneticCTA, page transitions, GSAP final pass), all merged into `feat/animations`.

A Phase 2 follow-on (this session, `anim/scroll-reveal` / PR #2) fixed why the animation looked dead to the client: the site strictly honoured `prefers-reduced-motion`, which the client/reviewer had enabled, so ALL motion was switched off for them. Root cause traced to the original aggressive `@media (prefers-reduced-motion)` CSS reset in commit `ec30aae`. The gate was removed project-wide, and genuine scroll-DRIVEN reveals (GSAP ScrollTrigger scrub) were added to cards/photos at perceptible magnitudes. Heavy pinned (ktg.one-style) choreography is intentionally deferred to a separate owner/GSD log.

## Milestone: Initial Hardening & Mapping

- [x] Initial codebase map created.
- [x] API security (honeypot/rate limiting) implemented.
- [x] React 19 hook violations resolved.
- [x] Shane Voice audit of About page complete.
- [x] GSD .planning structure initialized.
- [x] Hero headline hydration delay fixed via 'immediate' prop.
- [x] Lead pipeline env contract and smoke verification workflow completed.

## Active Tasks

- Plan 02-02: ✅ Complete — card hover and reveal animations polished.
- Plan 02-03: ✅ Complete — MagneticCTA hard clamp + coarse-pointer guard.
- Plan 02-04: ✅ Complete — Page transition refinement.
- Plan 02-05: ✅ Complete — GSAP final pass.
- Follow-on (PR #2, `anim/scroll-reveal`): ✅ Removed `prefers-reduced-motion` gating site-wide; added scroll-driven `ScrollReveal` (scrub) on cards/photos at perceptible magnitudes (y 120px, scale 0.9, parallax 18%); `ScrollTrigger.refresh()` after fonts/images. tsc + eslint clean, browser-verified. Awaiting merge into `feat/animations`.
- Meta: equipped the GSAP/scroll skill library (25 SKILL.md + reference files) with a "Perceptibility" doctrine so future motion isn't sub-threshold. See memory `animation-must-be-perceptible`.
- Phase 3: confirm Vercel env vars; set up GA4 (env-gated). Resend domain / Google Sheet / booking URL provisioning in real environments still pending.

## Blockers

- None. Resolved: the site is live on Vercel and the Vercel CLI is present (the earlier "pending user login" blocker no longer applies). The only gate to shipping the latest animation work is merging PR #2 into `feat/animations`.

## Next Milestone (planned, not started): v2.0 Interactive AI Layer

Roadmap extended with four new phases (see ROADMAP.md + `phases/05..08/*-SPEC.md`):

- **05 GSAP Signature Motion** — deferred ktg.one-style pinned scroll choreography. No external deps; ships first.
- **06 Voice I/O for the Concierge (TTS/STT)** — ElevenLabs voice on the existing guardrailed chat. Needs `ELEVENLABS_API_KEY`.
- **07 Demo Voice Agent + Phone Number** — ElevenLabs Conversational AI on a real phone number. Longest external lead time (account, number, AU recording consent) — provision day 1.
- **08 Web Analyzer** — BLOCKED on scope confirmation (visitor-facing lead tool [assumed] vs internal site/SEO analyzer).

Sequencing: finish v1.0 (Phase 3 GA4/env, Phase 4 audit) first; build 05-08 on branches in parallel; external provisioning starts immediately. Cross-cutting: the `lib/chat.ts` compliance prompt is the single source of truth for anything any AI surface says.

Owner decisions pending: Web Analyzer scope (08), demo number public-vs-gated + budget + telephony provider (07), ElevenLabs voice selection (06).
