---
phase: 02-animations-interactivity-upgrade
plan: 01
subsystem: animation
tags: [motion, reveal, reduced-motion, frontend]
requires:
  - phase: 02-animations-interactivity-upgrade
    provides: Phase 2 reveal audit plan and motion direction
provides:
  - Reveal and RevealWords usage inventory
  - Calmer central reveal timing defaults
  - Reduced long-delay call-site outliers
affects: [frontend, animation, ux]
tech-stack:
  added: []
  patterns: [motion-v12, reduced-motion, transform-opacity-animation]
key-files:
  created: []
  modified:
    - components/Reveal.tsx
    - components/Hero.tsx
    - components/ArticleLayout.tsx
    - components/StrategicPathways.tsx
    - app/not-found.tsx
    - app/approach/page.tsx
key-decisions:
  - "Reveal defaults now match the design guide baseline more closely: 0.6s duration and 12px movement."
  - "Persistent per-word will-change was removed so idle headline words do not hold unnecessary compositor hints."
  - "Hero immediate behavior was preserved while the longest supporting delays were shortened."
requirements-completed: [T1-animations, T1-performance]
duration: 24 min
completed: 2026-05-29
---

# Phase 2 Plan 01: Reveal and RevealWords Audit Summary

**Reveal motion is now calmer and closer to the Kismet design guide, with hero immediate rendering preserved and reduced-motion behavior verified.**

## Performance

- **Duration:** 24 min
- **Started:** 2026-05-29T13:10:00Z
- **Completed:** 2026-05-29T13:33:58Z
- **Tasks:** 4
- **Files modified:** 6

## Accomplishments

- Audited all `Reveal` and `RevealWords` call sites across `app/` and `components/`.
- Tuned `components/Reveal.tsx` defaults from heavier movement and timing to a calmer 12px, 0.6s reveal.
- Shortened `RevealWords` non-immediate word movement and duration while preserving the existing SSR-safe rendered tag strategy.
- Removed persistent `will-change-transform` from each revealed word to avoid idle compositor hints.
- Reduced obvious long-delay outliers in hero support copy, article summary reveal, StrategicPathways hub reveal, and the not-found CTA reveal.
- Added missing imports in `app/approach/page.tsx` so the reveal import site type-checks cleanly.

## Reveal Inventory

- **Hero:** `components/Hero.tsx` uses immediate `Reveal` and `RevealWords` for eyebrow, headline, muted headline, subcopy, and CTA. Left immediate behavior intact and shortened only supporting delays.
- **Article content:** `components/ArticleLayout.tsx` uses `RevealWords` for article titles plus `Reveal` for back link, metadata, summary, article body, compliance, and CTA.
- **Section headings and body blocks:** `components/BiggerPicture.tsx`, `app/approach/page.tsx`, `app/pathways/page.tsx`, `app/about/page.tsx`, `components/SiteFooter.tsx`, `components\TestimonialBlock.tsx`, and `components\ContactInquiry.tsx`.
- **Repeated cards:** `components/InsightsBento.tsx`, `components/StrategicPathways.tsx`, `components/ThreeStep.tsx`, `components/TeamPortraits.tsx`, and card sections in `app/about/page.tsx` and `app/pathways/page.tsx`. Card-specific motion was intentionally left for Plan 02.
- **CTA surfaces:** `components/Hero.tsx`, `components/ArticleLayout.tsx`, `components/SiteFooter.tsx`, `app/not-found.tsx`, and `components/ContactInquiry.tsx`.

## Task Commits

1. **Task 1 to 4: Reveal inventory and scoped timing tune** - `006d511` (`fix(02-01): tune reveal motion timing`)

## Files Created/Modified

- `components/Reveal.tsx` - central defaults reduced to 12px movement, 0.6s duration, 0.2 viewport amount, and lighter word reveal timing.
- `components/Hero.tsx` - supporting immediate reveal delays shortened while headline behavior stays immediate.
- `components/ArticleLayout.tsx` - article summary reveal delay shortened.
- `components/StrategicPathways.tsx` - hub strip reveal delay shortened.
- `app/not-found.tsx` - CTA reveal delay shortened.
- `app/approach/page.tsx` - missing imports restored for the existing component usage.

## Decisions Made

- Central defaults were changed because the previous `Reveal` default of 22px and 0.85s did not match the design guide baseline of subtle 12px reveal and 0.6s ease-out.
- No card-specific hover polish was implemented. Repeated card surfaces remain reserved for Plan 02.
- No GSAP work was added. GSAP remains reserved for the final Phase 2 lane.
- No copy was rewritten.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Missing imports in approach page**
- **Found during:** Verification setup for Task 4.
- **Issue:** `app/approach/page.tsx` used `Hero`, `Reveal`, `ThreeStep`, and `ComplianceLine` without imports.
- **Fix:** Restored the missing imports.
- **Files modified:** `app/approach/page.tsx`
- **Verification:** `npm run type-check` and `npm run lint` passed.
- **Committed in:** `006d511`

**2. [Scope Constraint] Isolated branch not created**
- **Found during:** Task 1.
- **Issue:** Codex worktree isolation is disabled for this project and the checkout already had unrelated dirty files.
- **Fix:** Stayed on the current branch and staged only the six Plan 02-01 production files for the implementation commit.
- **Files modified:** None for this deviation.
- **Verification:** `git status --short` was checked before and after. Unrelated `.claude` and planning files were not staged into the production commit.
- **Committed in:** Not applicable.

**Total deviations:** 1 auto-fixed blocker, 1 operational scope deviation. **Impact:** The reveal lane stayed scoped and verifiable.

## Verification

- `npm run type-check` passed.
- `npm run lint` passed.
- Browser review passed at 375px and 1440px for home, approach, pathways, insights, about, contact, and one article detail page.
- Reduced-motion browser emulation passed. The media query matched and no headline word spans remained hidden.
- Diff review confirmed no new em-dashes or en-dashes were introduced by this plan.

## Issues Encountered

- GSD state helper calls `state.advance-plan` and `state.update-progress` could not parse this repo's current STATE.md format. The roadmap progress is updated through `roadmap.update-plan-progress` after the summary lands.

## Follow-up Notes

- Plan 02 should handle repeated card hover and reveal polish. This plan intentionally did not tune card hover states.
- Existing em-dash and en-dash characters remain in comments outside this plan's diff.

## Self-Check: PASSED

- All `Reveal` and `RevealWords` usages were inventoried.
- Hero immediate behavior is preserved.
- Central reveal props remain backwards compatible.
- No card-specific polish was implemented.
- No GSAP work was added.
- Verification commands and browser checks passed.

## Next Phase Readiness

Ready for `02-02-PLAN.md`: card hover and reveal polish on `anim/card-polish`.
