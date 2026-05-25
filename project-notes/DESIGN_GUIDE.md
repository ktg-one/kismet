# Design Guide

## The visual feeling

Premium dark consultancy. Confident. Calm. Editorial. Generous space. Subtle motion. The kind of site that looks like a place where serious people work, but never feels stuffy or corporate.

If the copy is "trusted friend who knows finance", the visual is "boutique consultancy in a converted warehouse with good lighting".

## Theme

Dark navy is the dominant surface. Gold is the accent. Off-white is the type. There is no light theme.

This is a deliberate choice. Light themes for finance consultancies are everywhere and immediately read as generic. The dark theme is part of how Kismet earns instant credibility on first scan.

## Brand colours

These are authoritative. They override Stitch design system variants. Anywhere these are referenced in code, use the exact hex.

| Role | Hex | Notes |
|---|---|---|
| Brand navy | `#1E3A5F` | Primary brand. Hero overlays, surface tints, focus. |
| Brand gold | `#D4AF37` | Accent. Hairlines, CTA, brand mark, eyebrow text. Use sparingly. |

## Surface hierarchy (Stitch tokens, navy-shifted)

The site uses a surface scale. Lower numbers are darker (deeper background), higher numbers are lighter (raised cards).

| Token | Hex | Use |
|---|---|---|
| Page bg deep | `#050f19` | Section bands behind hero, section breaks. |
| Page bg | `#0a141e` | Default page background. |
| Surface 1 | `#13243a` | Subtle elevation. |
| Surface 2 | `#18283d` | Default card. |
| Surface 3 | `#1e3450` | Highlighted card. |
| Surface 4 | `#26456a` | Featured / hover. |

These are the navy-tinted replacements for Stitch's neutral surface scale (`#17202b`, `#212b36`, etc.). The navy tint is intentional. It carries the brand through the cards instead of going black-heavy.

## Type tokens (Stitch foreground)

| Token | Hex | Use |
|---|---|---|
| `#d9e3f2` | Default body and headlines on dark surfaces. |
| `#c4c6cf` | Secondary body text (paragraph, captions). |
| `#8aa4cf` | Tertiary / muted on highlight surfaces. |
| `#43474e` | Hairline borders, dividers (use at 25 to 40 percent opacity). |

## Typography

- Display / headline: serif. The display family is set in `app/layout.tsx` via Google Fonts. Used for hero headlines, section headings, article titles.
- Body and UI: Montserrat (Google Fonts, weights 300 to 600). Used for body, eyebrow, navigation, buttons, captions.

Headline rhythm rules:

- Hero headlines: large serif, tight tracking (around `-0.018em`), balanced via `text-balance`.
- Section headings: serif at 32 to 48px, slightly tighter tracking on display weights.
- Eyebrows: 11 to 12px Montserrat semibold, uppercase, letter-spacing around `0.2em` to `0.22em`, often gold.
- Body: 15 to 17px Montserrat 400, line-height 1.65 to 1.78.

Avoid more than two font roles on a page. Hierarchy comes from size, weight and colour, not from new fonts.

## Logo and brand mark

- The brand mark (`BrandMark` component) is the small monogram. It anchors the site header, footer, and page-end signoffs.
- The wordmark is "KISMET" in serif caps at 0.2em letter spacing, gold.
- Both are paired in the SiteHeader and SiteFooter for hierarchy.
- The mark gets a subtle 8 degree rotate on hover with a long ease curve. No bouncy motion.

## Spacing

Section padding standard is `py-24 md:py-32`. This is the editorial rhythm baseline. Do not break it without a reason.

Container max width is `1280px` with `px-6 md:px-12 lg:px-16` gutters.

Cards inside sections use `p-7 md:p-8` for compact, `p-10 md:p-12` for primary feature cards.

Spacing scale (px): `0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128`. Pick from the scale. Avoid one-off values.

## Hairlines and borders

Borders are mostly absent. Where used, they are 0.5px (Tailwind `border-[0.5px]`) at low opacity (`border-[#43474e]/30`) so they read as hairlines, not boxes. Heavy borders are forbidden.

A `gold-edge-top` utility adds a 1px gold hairline across the top of feature cards for emphasis. Use it sparingly.

## Motion

The site uses `motion/react` (Framer Motion's new package) and small CSS-only effects. Motion is intentional and calm. Never bouncy. Never excessive.

Defaults:

- Page transition: `0.85s` cinema ease (`cubic-bezier(0.16, 1, 0.3, 1)`) with subtle scale 0.992 to 1.
- Hero ambient orbs: low opacity (0.65 to 0.7) to avoid distraction.
- Reveal-on-scroll: 0.6s ease-out, 12px translate, staggered children at 0.06 to 0.18s delays.
- Hover lifts on cards: `-translate-y-[2px]` plus a soft shadow at 30 to 80px blur.

Reduced motion: respect `prefers-reduced-motion`. Autoplay carousels pause, page transitions become instant.

## Photography

Documentary frame, never raw stock. The `.documentary-frame` CSS utility applies `saturate(0.78) brightness(0.92) contrast(1.05)` plus a subtle gold-tint multiply wash. Apply it to any photo on the site that would otherwise look too clean and stock-like.

Real photography (Shane and Josh in the founders bento, real office shots) is preferred wherever available.

## CTA buttons

Two variants:

- Gold solid (`cta-gold`): primary action. Used for "Book a call", "Send Message", "Book a private call".
- Ghost outline: secondary action. Used for "How We Work" and similar second-priority CTAs.

Both have the gold arrow that translates 6px on hover. Subtle, not jumpy. Focus state is a two-tone ring (gold inner, navy outer).

## Mobile-first rules

- Mobile is the primary breakpoint. Design for 375px first, scale up.
- Hero headline drops from 64px desktop to around 40px mobile, muted line tracks similarly.
- Stack on mobile, columns on tablet, grid on desktop. Do not flip the order.
- Tap targets are minimum 44px tall. CTAs should fit one-thumb width naturally.
- Never let a card body wrap to fewer than 4 to 5 lines on mobile, or it loses presence. Adjust max-width if needed.
- Navigation collapses to a hamburger drawer below `md`. The drawer reuses the same dark surface scale.

## Accessibility

- Focus state is a two-tone ring (gold + navy) on all interactive elements.
- Skip-to-content link in `app/globals.css`.
- Compliance line text is bumped to a higher opacity for contrast.
- Body text targets 4.5:1 contrast. Display text targets 3:1.
- All `tel:` and `mailto:` anchors carry `suppressHydrationWarning` to handle 3CX browser extension rewrites.
- Alt text describes the image, never claims a stock photo is the Kismet team.

## Things that look generic and have been deliberately avoided

- White backgrounds anywhere on marketing pages.
- Purple gradients.
- Heavy drop shadows.
- Tilted hero cards.
- Inter or Roboto.
- Bouncy spring animations.
- Stock-photo people pretending to be the team.
- Centred everything (the site has asymmetric editorial rhythm).
