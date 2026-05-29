# Kismet Finance Group - Brand & Design System

## Brand Colours (Authoritative Hex Values)

```
Brand Navy:  #1E3A5F  (primary brand colour)
Brand Gold:  #D4AF37  (accent, CTAs, highlights)
```

## Surface Scale (Dark Theme Only - No Light Mode)

The surface scale runs from deepest background to highest elevation:

```
#050f19  --surface-deepest  (page background, hero backdrop)
#0a1929  --surface-base     (default surface)
#112240  --surface-card     (card backgrounds)
#1a304f  --surface-raised   (raised panels, modals)
#26456a  --surface-high     (topmost elevated elements)
```

**Why navy-shifted**: Stitch design system surfaces were shifted from neutral-grey to navy to carry brand colour through cards. Never revert to grey surfaces.

## Typography

### Fonts
- **Body / UI text**: Montserrat (variable, Google Font)
- **Display / headings / editorial**: Newsreader (variable, Google Font, italic variant for emphasis)
- **Forbidden**: Berlingske Serif (not licensed), Inter, Roboto (AI-generic tells that kill brand credibility)

### Type Scale Intent
- Newsreader used for hero headlines, section headings, editorial pull-quotes
- Montserrat used for body copy, UI labels, navigation, CTAs
- Italic Newsreader for featured quotes, testimonial attribution

## Layout & Spacing

```
Base spacing unit: 8px
Section padding:   py-20 md:py-32  (standard for all full-width sections)
Hero padding:      py-32 md:py-40  (hero sections get extra space)
Container:         max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  (1280px max-width)
```

**Layout philosophy**: Asymmetric editorial rhythm. Not centred-everything. Generous breathing space. Premium whitespace signals confidence.

## CTA Button Variants

| Component | Variant | Appearance |
|---|---|---|
| `MagneticCTA` | Primary | Gold background, dark text, magnetic hover effect |
| `GhostCTA` | Secondary | Transparent with gold border, gold text |

CTA labels are standardised (see copy guide). Never invent new CTA label text.

## Photography Treatment

All photos must pass through `.documentary-frame` class:
```css
.documentary-frame {
  filter: saturate(0.78) brightness(0.92) contrast(1.05);
  /* Plus gold-tint overlay at ~8% opacity in multiply blend mode */
}
```

Purpose: Prevents stock-photo flatness. Creates visual cohesion across diverse source images. The gold tint pulls brand colour into photography.

**Real photography rule**: Shane and Josh's actual founders photo is authoritative on the About page. Never replace with stock imagery.

## Motion System

### Spring Physics
```ts
const spring = { type: "spring", stiffness: 120, damping: 20 };
```

### Duration Range
```
0.3s - Fast interactions (hover, click feedback)
0.6s - Section content entrances
0.85s - Page transitions (with subtle scale)
```

### Motion Rules
- **No bounce above 10%** - Kismet motion is calm, cinematic. Not bouncy.
- **Never `opacity-0` on page-level elements** - causes hydration flash in Next.js
- Ambient orbs: low-opacity, slow drift, gold-tinted - create depth without distraction
- Hover lift on clickable cards: subtle `translateY(-2px)` or `translateY(-4px)`

### Import (Framer Motion v12)
```ts
import { motion, AnimatePresence } from "motion/react";
// Package name: `motion` NOT `framer-motion`
```

## Design Identity Principles

1. **Dark navy + gold = instant credibility** for finance category. Never proposed for change.
2. **Asymmetric editorial grid** preferred over symmetrical layouts
3. **Calm motion** - cinema ease curves, not UI-kit spring defaults
4. **Brand mark hierarchy** - monogram + wordmark in header, footer, and page-end signoffs
5. **Documentary photography** - real people, treated to reduce stock flatness

## Bento Grid (About Page)

The About page uses a bento-grid layout featuring:
- Shane and Josh founders photo (converted from HEIC, real photo)
- Company story / approach cards
- Contact / booking CTA card
- Key metrics or highlights

## What Was Rejected

- Light theme (generic for finance category, rejected permanently)
- Grey-neutral surfaces (replaced with navy-shifted surfaces)
- Bouncy animations (pulled back to calm spring physics)
- Stock team photography (replaced with real founders photo)
- Centred, symmetrical layouts (replaced with editorial asymmetry)
