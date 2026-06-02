# Phase 2: Animations & Interactivity Upgrade - Context

**Gathered:** 2026-05-28
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 2 upgrades the site's motion and interaction quality without changing the information architecture, lead flow, compliance positioning, or core visual direction. The work should protect the current site baseline by splitting animation streams into isolated worktrees and integrating them back one at a time.

</domain>

<decisions>
## Implementation Decisions

### Priority Order
- **D-01:** Start with the lowest-risk Motion and CSS tasks before any new GSAP work.
- **D-02:** Implement animation work from lowest to highest complexity in this order: Reveal and RevealWords audit, card hover and reveal polish, MagneticCTA refinement, page transition refinement, then GSAP scroll or timeline work last.
- **D-03:** Treat card animations as their own stream because they touch repeated surfaces across pages and need visual consistency checks.
- **D-04:** Do not introduce new GSAP work in the first implementation wave. Existing GSAP in Hero and SmoothScroll may be audited, but GSAP expansion belongs at the end of Phase 2.

### Parallel Orchestration
- **D-05:** Parallelize exploration and implementation in separate worktrees or branches, one per animation stream, so the initial site remains protected.
- **D-06:** Recommended worktree lanes: `anim/reveal-audit`, `anim/card-polish`, `anim/magnetic-ctas`, `anim/page-transitions`, and `anim/gsap-final-pass`.
- **D-07:** Merge and verify sequentially even if the work is built in parallel. Integration order should follow the priority order above.
- **D-08:** Each lane must keep changes scoped to its animation surface and avoid broad style or component refactors.

### Motion Direction
- **D-09:** Use Motion v12 and existing CSS transitions for early lanes. Prefer transform and opacity based animation, restrained timing, and reduced-motion support.
- **D-10:** Keep the Kismet feel premium, calm, and editorial. Avoid loud, novelty, glitch, bouncy, or custom-cursor effects.
- **D-11:** Page transitions should be refined after component-level motion is stable because route transitions can affect perceived timing across the whole site.
- **D-12:** GSAP remains reserved for scroll-driven or timeline work where Motion or CSS is not enough.

### the agent's Discretion
- Exact easing and duration values may be tuned by the implementation agents as long as they stay within the current cinematic motion vocabulary.
- Implementation agents may decide whether a given card surface needs only CSS polish or a small Motion wrapper after inspecting the component.
- Implementation agents may skip an animation if it creates layout shift, harms readability, or feels heavier than the current premium baseline.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Direction
- `.planning/ROADMAP.md` - Phase 2 task scope and milestone ordering.
- `.planning/PROJECT.md` - Brand, audience, stack, and non-negotiables.
- `.planning/REQUIREMENTS.md` - Technical animation requirements and compliance constraints.
- `project-notes/DESIGN_GUIDE.md` - Visual direction and brand system.
- `project-notes/COPY_VOICE_GUIDE.md` - Voice constraints to preserve while changing motion.

### Animation Guidance
- `C:/Users/kevin/.agents/skills/awwwards-animations/SKILL.md` - Animation library decision matrix and performance rules.
- `C:/Users/kevin/.agents/skills/awwwards-animations/references/motion-patterns.md` - Motion patterns for reveal, gestures, and page transitions.
- `C:/Users/kevin/.agents/skills/awwwards-animations/references/performance.md` - 60fps constraints, transform and opacity guidance, cleanup requirements.
- `C:/Users/kevin/.agents/skills/awwwards-animations/references/gsap-react.md` - GSAP useGSAP and ScrollTrigger patterns for the final lane.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `components/Reveal.tsx`: Existing `Reveal` and `RevealWords` primitives already use Motion v12, reduced-motion checks, and the `immediate` prop for hero hydration safety.
- `components/MagneticCTA.tsx`: Existing magnetic CTA uses Motion motion values and springs with a restrained cursor pull.
- `components/PageTransition.tsx`: Existing page transition uses `AnimatePresence`, pathname keys, reduced motion, and a calm opacity, y, scale, and blur transition.
- `app/globals.css`: Existing `.kismet-surface`, `.glass-card`, and `.card-lift-hover` utilities already define card hover vocabulary.
- `components/Hero.tsx` and `components/SmoothScroll.tsx`: Existing GSAP and Lenis integration provide the baseline for any final scroll-driven pass.

### Established Patterns
- The site already favors subtle translate, opacity, shadow, border, and background transitions over showy animation.
- Reduced-motion handling is already present in Motion components and CSS.
- Cards are repeated across Insights, Strategic Pathways, ThreeStep, TeamPortraits, About, and Pathways, so card changes need broad visual review.

### Integration Points
- Reveal audit connects primarily through `components/Reveal.tsx` and components importing it.
- Card polish connects through `app/globals.css` utilities and repeated card components.
- Magnetic CTA refinement connects through `components/MagneticCTA.tsx` and CTA call sites.
- Page transition refinement connects through `components/PageTransition.tsx` and `app/layout.tsx`.
- GSAP final pass connects through `components/Hero.tsx`, `components/SmoothScroll.tsx`, and any future scroll-triggered sections.

</code_context>

<specifics>
## Specific Ideas

- User wants the simplest animation tasks implemented first.
- User wants parallelizable work split across agents or worktrees to avoid ruining the initial site.
- User explicitly wants card animations treated separately.
- User explicitly wants no new GSAP yet. GSAP should be last.

</specifics>

<deferred>
## Deferred Ideas

- New GSAP-heavy animation features are deferred until the final Phase 2 lane.
- Broad redesign, custom cursors, generative effects, and loud Awwwards-style effects are out of scope for this phase.

</deferred>

---

*Phase: 02-animations-interactivity-upgrade*
*Context gathered: 2026-05-28*
