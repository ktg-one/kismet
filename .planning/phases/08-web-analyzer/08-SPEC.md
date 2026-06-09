# Phase 08 — Web Analyzer (premium market-research lead tool)

**Milestone:** v2.0 Interactive AI Layer
**Status:** planned, gated on capacity/cost design (next GSD step: gsd-discuss-phase, then gsd-plan-phase)
**Depends on:** Anthropic SDK + guardrails in `lib/chat.ts`; existing lead pipeline (`app/api/lead`).

## Goal (scope confirmed by owner)

This is **not** a run-of-the-mill web analyzer. The owner positions the output as genuine market research — the kind of deliverable a business would pay a research firm for. A visitor submits an input (URL / business / situation) and a multi-step AI workflow returns a high-value, compliance-safe market/strategic snapshot that drives a booking.

Two things make or break it (owner's words): **getting the whole workflow working**, and **capacity** — if too many people use it, the cost/quality won't hold. So this phase is gated on a workflow that is good enough to feel premium and a usage model that controls volume.

## Defining constraints

- **Premium, not a freebie widget.** Output quality must justify "worth paying a research company for." That implies a deeper multi-step pipeline (research + synthesis), not a single prompt.
- **Capacity-controlled.** Volume must be gated so cost and quality stay viable: e.g. gated access (waitlist / invite / email-gate), limited free runs, a queue, or a paid tier. The gate is a first-class requirement, not an afterthought.
- **Compliance.** Market/strategic research is fine; personal financial/tax/legal/credit advice is not. Same hard line as every other AI surface.

## Tasks

1. Define the workflow: input -> research steps -> synthesis -> deliverable format. Decide what "premium" output looks like (sections, depth, length). -> verify: owner approves a sample deliverable on real input before any UI build.
2. Decide the capacity/access model: gate type (email-gate / invite / paid / run-cap), per-user limits, queue vs realtime, and the monthly spend ceiling. -> verify: model written down with a hard cost cap.
3. Build the analysis pipeline: reuse the Anthropic SDK + compliance prompt; add a real rate-limit/quota (the current in-memory limiter resets on cold start per CONCERNS.md — use a durable store if this gates paid/limited access). -> verify: a run produces the deliverable; quota holds across cold starts.
4. Result UI + lead capture: deliver the snapshot, capture the user into the existing lead pipeline (Resend + Sheets) with a booking CTA. -> verify: a run produces a lead row/email.
5. Compliance review on sample outputs. -> verify: compliance owner signs off; no output reads as personal advice.

## Dependencies / risks

- **Cost is the central risk.** A premium multi-step pipeline per visitor is expensive; an ungated public tool can run away. Capacity gating + a hard monthly cap are required before launch.
- Reuses `ANTHROPIC_API_KEY`; confirm budget for a deeper, multi-call workflow (much pricier than the chat widget per use).
- If input is a URL to fetch, add SSRF / timeout / size guards.
- Durable quota store likely needed (Vercel KV / Upstash) — the in-memory limiter is not sufficient for a gated/paid tool.

## Open question for owner

- Access model: email-gate + limited free runs, invite-only, or a paid tier? This sets the build (auth/quota/billing surface) and the cost ceiling.

## Success criteria

- A capacity-gated tool produces a premium, on-brand, advice-free market-research deliverable that drives bookings and is captured as a lead, and cannot exceed the agreed monthly spend. Owner has signed off on a sample deliverable and the access model.
