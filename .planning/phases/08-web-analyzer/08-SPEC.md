# Phase 08 — Web Analyzer (lead tool)

**Milestone:** v2.0 Interactive AI Layer
**Status:** BLOCKED on scope confirmation (next GSD step: gsd-spec-phase / owner answer, then gsd-plan-phase)
**Depends on:** Anthropic SDK + guardrails already in `lib/chat.ts`; existing lead pipeline (`app/api/lead`).

## Goal (working assumption — CONFIRM BEFORE BUILDING)

An interactive lead-magnet: a visitor submits a URL or a short description of their situation and receives an AI-generated, compliance-safe "strategic snapshot" that ends in a booking CTA. The point is engagement that converts to a call, not advice.

## Scope ambiguity (must resolve first)

"Web Analyzer" has at least two readings. Task 8.1 is to pick one:

- **(A) Visitor-facing lead tool** *(assumed)* — visitor inputs something, gets a tailored, non-advisory insight + booking CTA. Lives on the public site.
- **(B) Internal site/SEO/analytics analyzer** — a tool for the Kismet team to audit the site itself (perf, SEO, content). Not visitor-facing.

These are different products. The tasks below assume (A); if (B), this SPEC is rewritten.

## Tasks (assuming reading A)

1. Confirm scope (A vs B) with owner. -> verify: owner picks one. BLOCKS 8.2+.
2. Input UI + analysis route: reuse Anthropic SDK, the compliance system prompt, and the in-memory rate-limit pattern (note CONCERNS.md: limiter resets on cold start). -> verify: submitting input returns a snapshot; rate limit holds best-effort.
3. Result UI with prominent booking CTA; capture the lead into the existing pipeline (Resend + Sheets) so analyzer users become tracked leads. -> verify: a run produces a lead row/email.
4. Compliance review: output must read as a general strategic snapshot, never personal financial/tax/legal/credit advice. -> verify: compliance owner signs off on sample outputs.

## Dependencies / risks

- Reuses `ANTHROPIC_API_KEY` (already present for chat) — confirm budget for a second AI surface.
- If input is a URL to fetch and analyze, add SSRF/timeout/size guards on the fetch.
- Compliance is the hard constraint: an "analysis" of someone's finances is exactly the line Kismet must not cross. Keep it strategic/educational, advice-free.

## Success criteria

- Scope confirmed; a visitor gets a useful, on-brand, advice-free snapshot that drives a booking and is captured as a lead. Compliance signed off.
