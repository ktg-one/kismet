# Kismet Finance Group - Tech Stack

## Authoritative Stack (CLAUDE.md is source of truth)

| Technology | Version | Notes |
|---|---|---|
| Next.js | 16.2.5 | Turbopack enabled |
| React | 19.2 | React 19 patterns, no legacy APIs |
| TypeScript | strict mode | `tsconfig.json` enforces strict |
| Tailwind CSS | v4 | Config via CSS custom properties ONLY |
| Framer Motion | v12 | Package is `motion`, import from `motion/react` |
| Embla Carousel | latest | Used for testimonials carousel |

**CRITICAL**: The plans doc references Next.js 15 and "Berlingske Serif" - these are WRONG. CLAUDE.md is authoritative: Next.js 16.2.5 and Newsreader font.

## Package Names (import paths matter)

```ts
// Framer Motion v12 - package is `motion`, NOT `framer-motion`
import { motion, AnimatePresence } from "motion/react";
// NOT: import { motion } from "framer-motion"

// Embla Carousel
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
```

## Fonts

- **Body / UI**: Montserrat (Google Font, variable)
- **Display serif / headings**: Newsreader (Google Font, variable)
- **Never**: Berlingske Serif (not licensed), Inter, Roboto (AI-generic tells)

Font loading: Next.js `next/font/google` in `app/layout.tsx`.

## Tailwind v4 Configuration

Tailwind v4 does NOT use `tailwind.config.js` for theme extension. Use CSS custom properties in `globals.css`:

```css
/* globals.css - correct Tailwind v4 pattern */
@theme {
  --color-brand-navy: #1E3A5F;
  --color-brand-gold: #D4AF37;
}
```

**Do NOT** add theme values to `tailwind.config.js` extend object - that is the Tailwind v3 pattern.

## Design Token CSS Variables

```css
/* Surface scale (darkest to lightest) */
--surface-deepest: #050f19;
--surface-base:    #0a1929;
--surface-card:    #112240;
--surface-raised:  #1a304f;
--surface-high:    #26456a;

/* Brand */
--color-brand-navy: #1E3A5F;
--color-brand-gold: #D4AF37;
```

## Key Components

| Component | Location | Purpose |
|---|---|---|
| `ComplianceLine` | `components/ComplianceLine.tsx` | Mandatory compliance footer on all Insights articles |
| `MagneticCTA` | `components/MagneticCTA.tsx` | Primary gold CTA button |
| `GhostCTA` | `components/GhostCTA.tsx` | Secondary outlined CTA button |

## Animation Conventions (Framer Motion v12)

```ts
// Standard spring config
const spring = { type: "spring", stiffness: 120, damping: 20 };

// Page transition
{ duration: 0.85, scale: subtle }

// Standard element animation range
{ duration: 0.3 } // fast interactions
{ duration: 0.6 } // section entrances

// Ambient orb animations - CALM (no bounce above 10%)
```

**Never use `opacity-0` on page-level elements** - causes hydration flash.

## MCP Servers (`.mcp.json`)

- `figma` - Figma design access
- `vercel` - Vercel deployment
- `next-devtools` - Next.js diagnostics
- `serena` - Semantic code intelligence
- `pal` - Unknown (project-specific)
- `jcodemunch` - Code analysis
- `agentmemory` - Semantic memory recall (separate from in-memoria)
- `in-memoria` - Local knowledge indexing (run via `npx in-memoria server`)

## Photography Processing

- Real founders photo (Shane and Josh) used on About page
- Original was HEIC format; converted via `heic-convert` + `sharp`
- All photos pass through `.documentary-frame` CSS class:
  ```css
  .documentary-frame {
    filter: saturate(0.78) brightness(0.92) contrast(1.05);
    /* + gold-tint multiply wash overlay */
  }
  ```

## No Test Framework

Vitest was removed (Shane misread its presence as "using Vite"). No testing scripts exist. Do NOT add vitest, jest, or any test runner unless explicitly asked.

## Lead Form

- Contact form POSTs to `/api/lead`
- 503 fallback path shows email CTA if backend unreachable
- `NEXT_PUBLIC_BOOKING_URL` env var controls strategy booking link

## SEO

- Per-article `generateMetadata()` in each Insights article
- OG images wired per page
- JSON-LD `ProfessionalService` schema on home/about
- `sitemap.xml` and `robots.txt` routes registered
