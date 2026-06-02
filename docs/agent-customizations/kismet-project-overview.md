# Kismet Finance Group - Project Overview

## What is Kismet Finance Group?

Kismet Finance Group is a mortgage broking and finance consultancy based in Perth, Western Australia. It is **not** a financial advisory firm. It helps everyday Australians navigate home loans, investment lending, and commercial finance by connecting them with the right lenders from a panel of approximately 70 Australian lenders.

## Founders

- **Shane Hewson** - Director (co-founder)
- **Josh Hewson** - Director (co-founder)

Both are titled "Director". Both must always be named together when referring to the founders. The real founders photo (Shane and Josh together) is used on the About page bento grid.

## Business Entity

- **Entity name**: Kismet Finance Group Pty Ltd
- **ABN**: 17 665 148 390
- **Phone**: 08 6285 8501
- **Email**: admin@kismetfinancegroup.com.au
- **Address**: 52 Cooper Road, Cockburn Central WA 6164
- **Social**: Instagram and Facebook only (no LinkedIn - dropped per Shane's preference)

## What the Website Does

The website targets warm referrals, prospects, partners, and recruits. Its one job: convince a first-time visitor within 30 seconds that Kismet is a real, premium, capable consultancy. The site runs on Vercel and is the primary marketing surface.

## Routes (all return 200 in production build)

- `/` - Home
- `/about` - About (founders bento, team section)
- `/how-we-work` - How We Work (approach page)
- `/strategic-pathways` - Strategic Pathways (services overview)
- `/insights` - Insights index
- `/insights/[slug]` - 5 articles (all with ComplianceLine component)
- `/contact` - Contact form
- `/api/lead` - Lead form POST endpoint (503 fallback to email CTA)
- `robots.txt`, `sitemap.xml`, favicon

## Key CTAs (standardised - do NOT change these without explicit instruction)

- Primary CTA: **"Book a call"** (not "Begin the Conversation", not "Get Started")
- Secondary CTA: **"How We Work"**
- Contact form submit: **"Send Message"**

## Open Items (as of v1 handoff)

1. Vercel CLI auth - Shane needs `vercel login`, then `vercel --prod`
2. Full Google reviews - 3 curated now; Shane to export full Business Profile reviews
3. Domain config - `kismetfinancegroup.com.au` needs DNS pointing to Vercel
4. Booking integration - `NEXT_PUBLIC_BOOKING_URL` env var set to strategy booking URL
5. OG image - currently `/photos/team-boardroom.jpg` (2400x1350); optional custom card post-launch

## What Was Tried and Rejected

- Light theme variants (rejected - generic for finance category)
- Inter / Roboto fonts (rejected - AI-generic font tells)
- Stock team photos (replaced with real Shane and Josh photo)
- Vitest (removed - all test scripts removed, no testing framework in the project)
- LinkedIn icon (dropped per Shane's preference)
- Boutique copywriter / agency voice (killed - pulled back to operator voice)

## Branch History

- All development on `feat/stitch-redesign` branched from `feat/v1-build`
- Design foundation: Stitch design export (`stitch_kismet_finance_digital_presence/`), navy-shifted surface colours
- This branch is feature-complete for v1

## Memory Recall Anchors

For in-memoria / agentmemory recall:
```
query: "kismet gsd-init hardening nextjs16-react19 ship-ready"
anchor terms: kismet, branding, founders, compliance, tech-stack, next.js, tailwind-v4, agentmemory
```
