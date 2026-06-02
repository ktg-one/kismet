# Changelog Summary

## Where this build started

The original Kismet web presence was a placeholder. The brief was to build a new website that would convince warm referrals, prospects, partners and recruits, within roughly 30 seconds, that Kismet is a real, premium, capable consultancy.

The build was anchored on a Stitch design export (`stitch_kismet_finance_digital_presence/`) which provided the dark navy editorial visual foundation. The Stitch tokens were navy-shifted to carry brand colour through the cards, the brand hex (`#1E3A5F` navy, `#D4AF37` gold) was made authoritative, and a production-maturity layer (compliance, AFG/HLS attribution, ABN, articles, JSON-LD, real photography) was layered on top.

## Branch

All development happened on `feat/stitch-redesign`, which branched off `feat/v1-build`.

## Major design decisions

- **Dark navy theme, no light mode.** Light themes for finance consultancies read generic. Dark navy + gold accents is part of how Kismet earns instant credibility on first scan.
- **Brand hex is authoritative.** Stitch design system surface colours were navy-shifted (`#18283d`, `#1e3450`, `#13243a`, `#26456a`) to carry the brand through cards instead of going neutral-grey.
- **Documentary frame on photography.** All photos pass through `.documentary-frame` (saturate 0.78, brightness 0.92, contrast 1.05, gold-tint multiply wash) to avoid stock-photo flatness.
- **Real photography wherever possible.** Shane and Josh's actual founders photo (sourced from HEIC original) is wired into the About page bento.
- **Asymmetric editorial rhythm.** Section padding standard `py-24 md:py-32`, max-width `1280px`, generous breathing space, no centred-everything.
- **Calm motion.** `motion/react` with cinema ease curves, low-opacity ambient orbs, 0.85s page transitions with subtle scale. Never bouncy.
- **Brand mark hierarchy.** The monogram + wordmark anchors site header, footer and page-end signoffs.

## Major copy decisions

- **John and Jenny voice.** Every word filtered through "would a normal Australian say this at the kitchen table?". No agency cleverness, no jargon, no private wealth language.
- **No em-dashes or en-dashes anywhere.** Hard rule. They are an AI tell that kills credibility.
- **Capability voice, not liability voice.** Kismet drives the strategy and connects the right people. Compliance language is quarantined to the dedicated Boundaries section on `/approach` and the `ComplianceLine` component.
- **CTA standardisation.** "Book a call" for primary action on home (was "Begin the Conversation"). "How We Work" for secondary. "Send Message" on the contact form.
- **Three-beat home positioning.** Hero sub explicitly hits the three core beats: see the bigger picture, connect with the right people, make the whole process feel clearer. These beats then unfold across BiggerPicture, StrategicPathways and Approach.

## Major commits (chronological highlights, most recent first)

| Hash | Note |
|---|---|
| `f5ee33d` | Home page John and Jenny copy polish (Hero, BiggerPicture, StrategicPathways, CTA labels) |
| `9809355` | Killed liability-voice site-wide. Lead with capability instead of disclaimer |
| `1429e41` | Full language and tone audit pass across every page |
| `95d3a02` | Pull back to operator voice on BiggerPicture and Coordination Hub |
| `6f84788` | Pull back from Amplify-flavoured phrasing, hold the principles in Kismet voice |
| `25a82b5` | Amplify-influenced outcome language without copying their salesy bits |
| `0d3bb6d` | Team heading: "The names that pick up when you call." to "The people you deal with." |
| `41f6f3e` | Refined CTA arrow, calmer hero orbs, named-only testimonials |
| `9cfd901` | Page transition feel + hero mobile typography retune |
| `6bb459c` | Section padding standardised, hover lift on clickable cards |
| `61c7f3a` | Fix 3CX hydration error, remove vitest scaffolding, cinematic image treatment |
| `22ecb70` | Drop LinkedIn from socials. Expand testimonials carousel with Google reviews |
| `2b923c2` | Contact email to admin@. Social media wired in |
| `fb344d0` | Launch QA pass + real Shane and Josh photo wired into About |
| `a27f0b5` | Hero contrast, John-and-Jenny copy, brand navy through cards, logo confidence |
| `a9b0f79` | Stitch design ported as new visual foundation (the foundational commit) |

## What's in the repo now

- 17 routes, all returning 200 in production build.
- Home, About, How We Work, Strategic Pathways, Insights (index + 5 articles), Contact, plus API route for the lead form, plus robots/sitemap/icon.
- Full SEO (per-article metadata, OG images, JSON-LD ProfessionalService schema, sitemap, robots.txt).
- Compliance line component, full AFG attribution, ABN, real phone (08 6285 8501), real address (52 Cooper Road, Cockburn Central WA 6164).
- 3 named Google reviews curated. Full review ingestion pipeline scaffolded but pending Google Business Profile export from Shane.
- Real photography of Shane and Josh on the About page founders bento.

## Key open items going into Vercel deploy

1. **Vercel CLI auth.** Project is linked but CLI is not authenticated in this session. Shane needs to run `vercel login` interactively. Once authenticated, deploy is `vercel --prod`.
2. **Full Google reviews ingestion.** Currently 3 named reviews on rotation. Full ingestion needs Shane to export from Google Business Profile dashboard into `public/data/reviews.json`.
3. **Domain config.** Production domain `kismetfinancegroup.com.au` needs to be pointed at Vercel after the first deploy succeeds.
4. **Booking integration.** `NEXT_PUBLIC_BOOKING_URL` is set to the Kismet strategy booking URL. Form fallback path works if the lead API route is unreachable.
5. **Open Graph image.** Currently `/photos/team-boardroom.jpg` (2400x1350). Could be replaced with a custom OG card if desired post-launch.

## Tech stack snapshot

- Next.js 16.2.5 (Turbopack), React 19, Tailwind CSS v4.
- TypeScript.
- `motion/react` for animations.
- `embla-carousel-react` + `embla-carousel-autoplay` for testimonials.
- `heic-convert` + `sharp` for HEIC photo conversion (used to process Shane and Josh's photo).
- Lead form POSTs to `/api/lead` with a 503 fallback path that surfaces an email CTA if the backend is unreachable.

## Things that were tried and rejected

- **Light theme variants.** Rejected. Generic for the category.
- **Inter / Roboto.** Rejected. AI-generic font tells.
- **Stock photos as the team.** Rejected after first review. Replaced with real Shane and Josh photo from HEIC original.
- **Boutique copywriter voice.** Killed. Drifted toward agency cleverness. Pulled back to operator voice.
- **Amplify Solutions Group phrasing.** Studied as a competitor reference but explicitly NOT copied. Where my copy drifted close to Amplify ("tailored to your circumstances", "Retain Full Control"), it was rewritten in Kismet voice.
- **Vitest.** Removed (Shane saw `vitest.config.ts` and read it as "you're using Vite". Was just leftover scaffolding). All test scripts removed.
- **LinkedIn icon in socials.** Dropped per Shane's preference. Instagram and Facebook only.

## Definition of "shipped"

This branch is feature-complete for v1. Final remaining task is the Vercel push. Once deployed, content updates (real Google reviews, additional articles, photo refreshes) can happen on small follow-up PRs.
