# Phase 07 — Demo Voice Agent + Phone Number (ready to go)

**Milestone:** v2.0 Interactive AI Layer
**Status:** planned (next GSD step: gsd-discuss-phase, then gsd-plan-phase)
**Depends on:** Phase 06 voice understanding; same compliance prompt as `lib/chat.ts`.

## Goal

A real, callable demo: a Conversational AI voice agent on a real AU phone number. A visitor (or Shane in a pitch) dials the number and talks to the Kismet concierge live. "Ready to go" = provisioned, compliant, and surfaced on the site.

## Confirmed by owner

- **Number:** +61 8 7741 4191 (local: 08 7741 4191). AU 08 number, fits the WA base.
- **Stack (current):** Trillet AI front-end on the owner's **own Twilio backend**. Telephony cost is at Twilio cost price.
- **Budget reality:** ~$5/mo for the number. Owner's target is ~5-10c per call-minute; realistic all-in for a quality voice agent (telephony + STT + LLM + TTS + platform) is higher (see provider note) — set expectations and cap spend rather than assume 5-10c.
- **Voice:** reuse the owner's existing ElevenLabs voice IDs (BYO TTS; the IDs live in his ElevenLabs/Trillet account, not in this repo yet — see Phase 06).

## Provider decision (Trillet white-label vs Vapi vs Retell)

Owner asked whether to invest in the Trillet white-label ("white card") or switch to Vapi/Retell. Current data (June 2026, see reply on the issue for sources):

| Option | Platform fee | Per-min (BYO Twilio + ElevenLabs) | Best when |
|---|---|---|---|
| **Trillet white-label** | $99/mo (Studio, 3 sub-accts) – $299/mo (Agency, unlimited) | ~$0.09/min | You are **reselling** voice AI to multiple clients (agency model, 50-70% margin). Built-in ACMA/DNCR/TCPA/GDPR compliance + site-scrape agent training. |
| **Vapi** | $0.05/min base, no monthly minimum, ~1,000 free min/mo | ~$0.12-0.24/min all-in | A **single low-volume demo** — free tier covers demo traffic, pay-as-you-go, BYO Twilio + ElevenLabs. |
| **Retell** | ~$0.07/min base, tiny free tier (~60 min) | ~$0.11-0.15/min all-in | Slightly more turnkey single deployment; not materially better than Vapi for this use. |

**Recommendation for THIS use (one demo agent on one site):**
- The Trillet **white-label** plan is an agency-reseller play. For a single Kismet demo it is $99-299/mo of dead cost unless the owner is going to resell voice agents to other businesses. Staying on **plain Trillet (no white-label)** is fine if the current setup already works.
- If switching for cost/simplicity: **Vapi** is the strongest fit — lowest base, a free tier that absorbs demo volume (directly answers the "what if too many people call" worry), no monthly minimum, and BYO Twilio + BYO ElevenLabs so the existing number and voice IDs carry over. Retell is comparable but not "that much better."
- Net: don't buy the white-label card for a single demo. Keep Trillet-on-Twilio if it works; otherwise move the demo to Vapi pay-as-you-go. All three are BYO, so Twilio + ElevenLabs voices are reusable either way.

## Scope

In:
- Conversational AI agent (Trillet, or Vapi if switched) loaded with Kismet knowledge + the introducer-not-advisor compliance prompt.
- The confirmed number wired for inbound calls via the owner's Twilio.
- AU compliance: call-recording consent at call start, after-hours behaviour, graceful handoff (booking link / take-a-message) when the caller wants a human.
- On-site "call the concierge" CTA + the demo number, styled per brand.
- Spend/abuse caps (concurrency limit, monthly minute cap) so a traffic spike can't blow the budget.

Out:
- Outbound calling / dialer campaigns.
- White-label reseller setup (separate business decision, not this phase).
- CRM integration beyond the existing lead pipeline.

## Tasks

1. Confirm provider: keep Trillet-on-Twilio (if current setup works) vs move demo to Vapi pay-as-you-go. -> verify: owner picks; spend model written down.
2. Provision agent: load Kismet knowledge base, compliance system prompt, and the existing ElevenLabs voice. -> verify: test call answers in-brand and refuses advice correctly.
3. Telephony: confirm +61 8 7741 4191 routes inbound to the agent via Twilio. -> verify: dialling the number reaches the agent.
4. AU compliance: recording-consent greeting, after-hours message, escalate-to-human / booking handoff. -> verify: consent stated before recording; handoff works.
5. Spend/abuse caps: concurrency + monthly-minute cap; decide public number vs gated "request a call". -> verify: cap trips in test; over-cap calls degrade gracefully.
6. Site surface: "Call the concierge" CTA + number, dark/editorial, no exclamation. -> verify: owner approves placement and copy.

## Dependencies / risks

- External spend: Twilio number (~$5/mo) + per-minute (telephony + STT + LLM + TTS + platform). Realistic all-in ~$0.12-0.20/min, above the 5-10c target — cap it.
- Legal: AU two-party-consent / recording-disclosure (and ACMA/DNCR if any outbound later) — confirm wording before going live.
- Abuse/cost: a public demo number can be spammed; concurrency + minute caps are required, not optional, given the owner's capacity concern.
- Verify current Trillet/Vapi + Twilio telephony docs at implementation time (do not code from memory).

## Success criteria

- +61 8 7741 4191 answers as the Kismet concierge, states recording consent, stays inside compliance, hands off to booking, and cannot exceed the agreed monthly spend cap. Owner has signed off on provider, cost, and the AU consent wording.
