# 02-02 Summary: Card Hover & Reveal Polish

**Branch:** `anim/card-polish`
**Status:** ✅ Complete

## What Changed

`components/InsightsBento.tsx` — all three bento card surfaces normalized to the shared `card-lift-hover` utility:

| Card | Before | After |
|---|---|---|
| Hero (line ~40) | `hover:-translate-y-[2px] hover:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)] transition-[colors,transform,box-shadow] duration-500` | `card-lift-hover` |
| Secondary (line ~79) | `hover:-translate-y-[2px] hover:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)] transition-[colors,transform,box-shadow] duration-500` | `card-lift-hover` |
| Tertiary (line ~109) | `hover:-translate-y-[2px] hover:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)] transition-[colors,transform,box-shadow] duration-500` | `card-lift-hover` |

Row links (line ~142) were audited and left unchanged — `transition-colors` only is correct there.

## Why

Bespoke inline hover transforms were duplicated across all three cards with no single source of truth. `card-lift-hover` (`app/globals.css` ~line 309) centralizes the lift, shadow, and gold border-top into one utility. Future changes to card hover behavior now require editing one line.

`prefers-reduced-motion` is handled globally in `app/globals.css` lines 322–329 and 111–118 — no per-component override needed.

## Verification

| Check | Result |
|---|---|
| `npx tsc --noEmit` | ✅ exit 0 |
| `npx eslint . --ext .ts,.tsx --max-warnings 0` | ✅ exit 0 |
| `npx react-doctor` | ✅ **90/100 "Great"** (69 advisory warnings, none blocking) |
| Em-dash grep | ✅ Clean |

## Files Modified

- `components/InsightsBento.tsx`

## Files Created

- `components/AGENTS.md` — folder-level rules for ESLint gate, react-doctor gate, card CSS vocabulary

## Next

**02-03** — MagneticCTA refinement on branch `anim/magnetic-ctas`.
