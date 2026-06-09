# Phase 07 — Demo Voice Agent + Phone Number (ready to go)

**Milestone:** v2.0 Interactive AI Layer
**Status:** planned (next GSD step: gsd-discuss-phase, then gsd-plan-phase)
**Depends on:** Phase 06 voice understanding; same compliance prompt as `lib/chat.ts`.

## Goal

A real, callable demo: an ElevenLabs Conversational AI agent on a phone number. A visitor (or Shane in a pitch) dials the number and talks to the Kismet concierge live. "Ready to go" = provisioned, compliant, and surfaced on the site.

## Why now

This is the longest external lead time in v2.0 (account, agent config, phone-number purchase, telephony routing, AU consent). Provisioning must start day 1 of the milestone even though it ships after Phases 05/06.

## Scope

In:
- ElevenLabs Conversational AI agent loaded with Kismet knowledge + the introducer-not-advisor compliance prompt.
- A phone number wired for inbound calls (ElevenLabs native telephony or Twilio).
- AU compliance: call-recording consent notice at call start, after-hours behaviour, and a graceful handoff (booking link / take-a-message) when the caller wants a human.
- On-site "call the concierge" CTA + the demo number, styled per brand.

Out:
- Outbound calling / dialer campaigns.
- CRM integration beyond the existing lead pipeline.

## Tasks

1. Provision agent: create the ElevenLabs Conversational AI agent, load knowledge base, set the compliance system prompt and voice. -> verify: test call answers in-brand and refuses advice correctly.
2. Phone + telephony: acquire number, connect inbound routing (confirm ElevenLabs native vs Twilio current capability + AU number availability). -> verify: dialling the number reaches the agent.
3. AU compliance: recording-consent greeting, after-hours message, escalate-to-human / booking handoff path. -> verify: consent stated before recording; handoff works.
4. Site surface: "Call the concierge" CTA + number, dark/editorial, no exclamation. -> verify: owner approves placement and copy.

## Dependencies / risks

- External: ElevenLabs Conversational AI plan, phone-number cost (monthly + per-minute), possible Twilio account. Owner decision + spend needed.
- Legal: AU two-party-consent / recording-disclosure rules — confirm before going live.
- Abuse/cost: a public demo number can be spammed; consider call caps or a gated "request the number" flow.
- Verify current ElevenLabs telephony + phone-number docs at implementation time (do not code from memory).

## Success criteria

- A published demo number answers as the Kismet concierge, states recording consent, stays inside compliance, and can hand off to booking. Owner has signed off on cost and the AU consent wording.

## Open questions for owner

- Public number on the site, or a private "request a demo call" gate (cost/abuse control)?
- Budget ceiling for number + per-minute usage?
- ElevenLabs native telephony vs existing/Twilio account?
