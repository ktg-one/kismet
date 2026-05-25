# Project: Kismet-site

## What This Is

Kismet-site is the marketing website for Kismet Finance Group, a boutique strategic-finance consultancy in Australia. It exists to quickly establish credibility with warm referrals, explain Kismet's role as a strategic finance coordinator, and convert qualified visitors into booked calls.

## Core Value

Make Kismet feel like a real, premium, trustworthy operation within the first 30 seconds so the right visitors book a call.

## Requirements

### Validated

- ✓ Dark, editorial marketing site for Kismet Finance Group exists in production — current live site baseline
- ✓ Core pages and lead capture flow are already implemented — existing site capability
- ✓ Phase 1 hardening is complete, including centralized lead pipeline env handling and a repeatable smoke script for `/api/lead`

### Active

- [ ] Refine premium presentation, motion, and credibility cues without harming clarity or performance
- [ ] Preserve compliance-safe messaging that positions Kismet as an introducer and coordinator, not an advisor
- [ ] Keep the site easy for AI agents to work in with reliable phase planning, verification, and handoff artifacts

### Out of Scope

- Light-theme redesign — conflicts with brand direction
- Financial-advice copy or positioning — conflicts with compliance and business positioning

## Mission
Finalize the boutique strategic-finance consultancy website for Kismet Finance Group, upgrading animations and interactivity, and deploying to Vercel. Ensure the project is optimized for AI-agent collaboration.

## Context
- **Owner:** Shane Hewson
- **Builder:** Claude (via Gemini CLI / Orca)
- **Domain:** kismetfinancegroup.com.au
- **Audience:** "John and Jenny" - Normal Australians looking for strategic finance coordination.

## Stack
- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind v4
- **Motion:** Framer Motion (Motion v12)
- **Integrations:** Resend, Google Sheets API
- **Deployment:** Vercel

## Brand Non-Negotiables
- **Zero em-dashes or en-dashes.** Use periods, commas, or parentheses.
- **No AI tells.** No "delve", "leverage", "unlock", etc. Voice must be human and Australian.
- **Premium Dark theme.** Navy (`#1E3A5F`) + Gold (`#D4AF37`).
- **Compliance.** "Introducer, not advisor" disclaimer on every page.

## AI Optimization
- Maintain `.understand-anything/` knowledge graph.
- Keep `understand-everything/` folder with updated spec and plan.
- Use structured GSD workflows for state management.
