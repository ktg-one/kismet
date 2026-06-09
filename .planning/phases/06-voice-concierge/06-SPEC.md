# Phase 06 — Voice I/O for the Concierge (TTS / STT)

**Milestone:** v2.0 Interactive AI Layer
**Status:** planned (next GSD step: gsd-discuss-phase, then gsd-plan-phase)
**Depends on:** existing guardrailed concierge (`lib/chat.ts`, `app/api/chat/route.ts`, branch `feat/chatbot-guardrailed`).

## Goal

Give the existing text concierge a voice: push-to-talk speech input and spoken replies, using ElevenLabs (the owner's chosen STT/TTS stack). New modality, same brain, same compliance guardrails.

## Why now

The chat assistant already exists with a compliance-hardened system prompt and rate-limited route. Voice is an additive layer on top of that proven flow, not a rebuild. It is the prerequisite understanding for the phone agent (Phase 07).

## Scope

In:
- STT: mic capture in the chat widget -> ElevenLabs speech-to-text -> transcript enters the existing `/api/chat` request unchanged.
- TTS: stream ElevenLabs speech for assistant replies; play / pause / mute; honour browser autoplay policies (user-gesture gated).
- A new server route (or extension) proxying ElevenLabs so the API key never reaches the client.

Out:
- Telephony / phone numbers (that is Phase 07).
- Changing the chat system prompt, model, or guardrail limits.

## Tasks

1. Server: ElevenLabs proxy route(s) for STT and TTS streaming. Lazy `ELEVENLABS_API_KEY` via the `lib/env.ts` pattern; return 503 when unset so `next build` passes without the secret. -> verify: build succeeds with no key; 503 on call.
2. STT client: mic permission, record, send audio, receive transcript, feed existing chat flow. -> verify: spoken question produces same answer path as typed.
3. TTS client: stream + play assistant reply, with mute/stop; user-gesture gate. -> verify: audio plays only after interaction, mute works.
4. UI/voice fit: dark, calm controls (no emoji, no exclamation), brand-appropriate ElevenLabs voice; a11y labels; reduced-motion. -> verify: owner approves voice + control look.

## Dependencies / risks

- `ELEVENLABS_API_KEY` (new env var; add to `.env.example` and Vercel in Phase 3 env task).
- **Voice IDs:** owner says the ElevenLabs voice IDs already exist — they are NOT in this repo (`.env.example` has no voice entry). They live in his ElevenLabs / Trillet account. Action: get the chosen voice ID(s) from the owner and add `ELEVENLABS_VOICE_ID` to `.env.example`. Same voice carries to the Phase 07 phone agent (BYO TTS).
- Streaming audio on serverless — confirm route runtime and timeout (verify current ElevenLabs Next.js streaming guidance at build time via context7/official docs before coding).
- Cost: TTS is per-character; gate behind the existing chat rate limit.

## Success criteria

- A visitor can ask by voice and hear a compliant spoken reply, with the same guardrails as text.
- Key absent -> graceful text-only fallback, build still green.
