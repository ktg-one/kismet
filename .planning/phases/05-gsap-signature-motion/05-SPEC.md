# Phase 05 — GSAP Signature Motion

**Milestone:** v2.0 Interactive AI Layer
**Status:** planned (next GSD step: gsd-discuss-phase, then gsd-plan-phase)
**Depends on:** v1.0 Phase 2/3 animation work merged (PR #2 into `feat/animations`).

## Goal

Add the deferred "ktg.one-style" pinned scroll choreography. One or two high-impact moments that make the site feel crafted, without harming clarity or performance. Pure frontend, no external services, so it ships value before the voice/analyzer provisioning lands.

## Why now

Phase 2/3 deliberately deferred heavy pinned choreography to a separate owner. This is that owner pass. It is the lowest-risk v2.0 phase (no API keys, no compliance surface) and a good warm-up while ElevenLabs/phone provisioning runs in parallel.

## Scope

In:
- 1-2 pinned/scrubbed sequences on the homepage (candidate: Hero to BiggerPicture handoff, or StrategicPathways reveal).
- Reduced-motion and coarse-pointer fallbacks.

Out:
- Any new motion library (Framer Motion + GSAP + Lenis only, per CLAUDE.md).
- Re-animating already-shipped reveals from Phase 2/3.

## Tasks

1. Choose the moment(s) and storyboard the scrub timeline. -> verify: agreed with owner before building.
2. Implement with `useGSAP` + ScrollTrigger pin/scrub, scroll read through the Lenis bridge in `SmoothScroll.tsx` only. -> verify: ScrollTrigger start/end markers align after scrolling halfway down.
3. Reduced-motion path (static end-state, no scrub) + mobile guard. -> verify: `prefers-reduced-motion` shows final state, no pin jump.
4. Perf pass: `will-change` applied only while active, `force3D`, no layout thrash. -> verify: Lighthouse no regression vs current.

## Dependencies / risks

- Must not re-init Lenis or run a competing RAF loop (CONCERNS.md: SmoothScroll is the single point of failure for all GSAP scroll work).
- Pinning interacts with the smooth-scroll source; test on a long page.

## Success criteria

- The chosen moment reads as intentional, premium motion at perceptible magnitude (per the "animation-must-be-perceptible" doctrine).
- No reduced-motion or mobile breakage. `npm run build` clean (lint via postbuild). Browser-verified.
