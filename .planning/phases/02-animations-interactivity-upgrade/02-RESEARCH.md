# Phase 2: Animations & Interactivity Upgrade - Research

**Researched:** 2026-05-28
**Status:** Ready for planning

## Research Question

What does the planner need to know to upgrade Kismet's animations without damaging the current premium site baseline?

## Findings

### Existing Animation Surface

- `components/Reveal.tsx` already centralizes scroll reveal and headline word reveal through Motion v12.
- `components/MagneticCTA.tsx` already implements a restrained magnetic pull through Motion motion values and springs.
- `components/PageTransition.tsx` already wraps route content in `AnimatePresence` and keys transitions by pathname.
- `app/globals.css` already contains the core card hover vocabulary: `.kismet-surface`, `.glass-card`, and `.card-lift-hover`.
- `components/Hero.tsx` and `components/SmoothScroll.tsx` already use GSAP, ScrollTrigger, and Lenis integration.

### Recommended Library Use

- Use Motion v12 for React-native animation tasks: reveal tuning, CTA motion, and page transitions.
- Use CSS transitions for the simplest card hover polish when the existing utility class is enough.
- Reserve GSAP for scroll-driven or timeline work that needs ScrollTrigger-level control.
- Do not add Anime.js or another animation dependency for Phase 2. The current stack already covers the phase.

### Orchestration Model

- Parallel work is safe for exploration and implementation when each stream is isolated in its own worktree or branch.
- Integration should be sequential because several streams may touch shared timing, card styling, route wrappers, or global motion vocabulary.
- The safest sequence is:
  1. Reveal and RevealWords audit.
  2. Card hover and reveal polish.
  3. MagneticCTA refinement.
  4. Page transition refinement.
  5. GSAP scroll and timeline final pass.

### Performance Rules

- Animate `transform` and `opacity` first.
- Avoid layout-affecting animation such as width, height, top, left, margin, or padding.
- Use `will-change` sparingly and remove or avoid it for idle elements.
- Respect `prefers-reduced-motion` in every component-level and route-level animation.
- Do not add animation that causes layout shift, unreadable text during entry, or delayed hero LCP.

## Validation Architecture

Phase 2 validation should combine static checks, build checks, and browser review:

- Run `npm run type-check`.
- Run `npm run lint`.
- Run `npm run build` after integration.
- Use browser review at mobile and desktop widths on home, approach, pathways, insights, about, contact, and at least one article page.
- Check reduced-motion behavior using browser emulation.
- Confirm no new em-dashes or en-dashes were introduced.
- Confirm no new GSAP work lands before the final lane.

## Risks

- Page transitions can visually overlap with page content or reset scroll in a way that feels broken.
- Card animation changes may look good on one section but inconsistent across repeated surfaces.
- GSAP and Lenis changes can create scroll jank if ScrollTrigger cleanup and refresh behavior are not scoped.
- Reveal tuning can accidentally reintroduce the hero hydration delay that Phase 1 already fixed.

## Research Complete

This phase has enough research to plan. No external network research is required because the repo already includes Motion v12, GSAP, Lenis, and the relevant local animation guidance.
