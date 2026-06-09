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

## Phase 2: Animations & Interactivity Upgrade (Current)
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

## Phase 3: Deployment & Analytics
*Shipping the site to Vercel and setting up tracking.*

- [x] Task 3.1: Initialize Vercel project and link repo. (Site is live on Vercel; Vercel CLI present.)
- [ ] Task 3.2: Configure Environment Variables in Vercel.
- [ ] Task 3.3: Set up Google Analytics 4 (GA4) with environment gating.
- [x] Task 3.4: Perform first production build and preview deploy. (Deployed; merge PR #2 to ship the latest animation fixes.)

## Phase 4: AI Preparation & Final Audit
*Optimizing for future collaboration and site quality.*

- [ ] Task 4.1: Automate em-dash grep CI gate.
- [ ] Task 4.2: Update `.understand-anything` knowledge graph.
- [ ] Task 4.3: Final Lighthouse performance & a11y pass.
- [ ] Task 4.4: Document AI collaboration guidelines in CLAUDE.md.

---

# Milestone v2.0: Interactive AI Layer

*Layer voice, a callable demo agent, signature motion, and an interactive analyzer onto the credibility site. Every talking surface keeps the "introducer, not advisor" compliance line, the dark/editorial brand, and the performance budget. Builds on the existing guardrailed concierge (`lib/chat.ts`, `app/api/chat/route.ts`) and the Lenis + GSAP/ScrollTrigger bridge.*

**Prereq:** finish v1.0 Phase 3 (merge PR #2, GA4, Vercel env) before shipping v2.0 surfaces to production. Phases 05-08 can be built on branches in parallel; external provisioning (ElevenLabs account, phone number) starts day 1 regardless of code order.

**Cross-cutting constraint:** voice and analyzer outputs are generated speech/text to the public, so the compliance system prompt in `lib/chat.ts` is the single source of truth for what any AI surface may say. No new surface gets its own looser prompt.

## Phase 5: GSAP Signature Motion
*The deferred ktg.one-style pinned scroll choreography. Pure frontend, no external deps, ships visible value first.*

- [ ] Task 5.1: Pick 1-2 hero moments for pinned/scrubbed sequences (Hero handoff to BiggerPicture, or StrategicPathways reveal).
- [ ] Task 5.2: Build via `useGSAP` + ScrollTrigger pin/scrub, reading scroll through the existing Lenis bridge only.
- [ ] Task 5.3: Reduced-motion fallback (static end-state, no scrub) and mobile/coarse-pointer guard.
- [ ] Task 5.4: Perf check — `will-change` lifecycle, no layout thrash, Lighthouse no regression. SPEC: `phases/05-gsap-signature-motion/05-SPEC.md`

## Phase 6: Voice I/O for the Concierge (TTS / STT)
*Add push-to-talk and spoken replies to the existing chat widget via ElevenLabs. Same guardrails, new modality.*

- [ ] Task 6.1: STT — mic capture + ElevenLabs speech-to-text, transcript feeds the existing `/api/chat` flow unchanged.
- [ ] Task 6.2: TTS — stream ElevenLabs speech for assistant replies; play/pause/mute controls; respects autoplay policies.
- [ ] Task 6.3: Server route(s) proxy ElevenLabs with lazy `ELEVENLABS_API_KEY` (mirror `lib/env.ts` pattern); 503 when unset so build passes.
- [ ] Task 6.4: Brand-fit voice selection + UI (dark, calm, no emoji); a11y + reduced-motion. SPEC: `phases/06-voice-concierge/06-SPEC.md`

## Phase 7: Demo Voice Agent + Phone Number (ready to go)
*An ElevenLabs Conversational AI agent on a real phone number. Visitors call and talk to the Kismet concierge. Longest external lead time — provision early.*

- [ ] Task 7.1: Provision ElevenLabs Conversational AI agent; load Kismet knowledge + the compliance prompt.
- [ ] Task 7.2: Acquire phone number and wire telephony (ElevenLabs native / Twilio); inbound call routing.
- [ ] Task 7.3: AU compliance — call-recording consent notice, after-hours behaviour, escalate-to-human / booking handoff.
- [ ] Task 7.4: On-site "call the concierge" CTA + demo number surfaced per brand. SPEC: `phases/07-demo-voice-agent-phone/07-SPEC.md`

## Phase 8: Web Analyzer (lead tool) — SCOPE TO CONFIRM
*Interactive lead-magnet. Working assumption (pending owner confirmation): a visitor submits a URL or short situation, gets an AI-generated, compliance-safe "strategic snapshot" ending in a booking CTA.*

- [ ] Task 8.1: Confirm scope — visitor-facing lead tool vs internal site/SEO analyzer (blocks the rest).
- [ ] Task 8.2: Input + analysis route (reuse Anthropic SDK + guardrails + rate limit pattern).
- [ ] Task 8.3: Result UI with booking CTA; capture lead into existing pipeline.
- [ ] Task 8.4: Compliance review — output must not read as personal financial advice. SPEC: `phases/08-web-analyzer/08-SPEC.md`
