# Phase 2: Animations & Interactivity Upgrade - UI Spec

**Created:** 2026-05-28
**Status:** Ready for planning

## Visual Contract

Phase 2 must preserve the current Kismet direction: premium dark consultancy, calm editorial pacing, navy and gold palette, generous space, and subtle motion. Animation should feel like polish, not spectacle.

## Interaction Rules

- Motion must be restrained, readable, and purposeful.
- Hover motion should stay subtle. Card lift should remain around 2px unless a plan gives a specific reason.
- CTA motion should support the existing gold button pattern and not introduce cursor gimmicks.
- Page transitions should feel like a calm dissolve or settle, not a loading screen.
- GSAP work is last and should be used only for scroll or timeline behavior that needs it.

## Accessibility Rules

- Respect `prefers-reduced-motion`.
- Do not animate text in a way that blocks reading.
- Do not create focus traps, pointer-only behavior, or hover-only access to important information.
- Keep tap targets at least 44px high on mobile.
- Preserve existing focus states.

## Review Viewports

- Mobile: 375px wide.
- Tablet: 768px wide.
- Desktop: 1440px wide.

## Key Screens

- Home page.
- Approach page.
- Pathways page.
- Insights index.
- Article detail page.
- About page.
- Contact page.

## Non-Goals

- No broad redesign.
- No new custom cursor.
- No glitch, bouncy, or novelty animation.
- No new GSAP feature before the final pass.
- No new animation dependency.
