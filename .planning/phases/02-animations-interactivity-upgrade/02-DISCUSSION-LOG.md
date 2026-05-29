# Phase 2: Animations & Interactivity Upgrade - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md. This log preserves the alternatives considered.

**Date:** 2026-05-28T17:28:59+08:00
**Phase:** 02-animations-interactivity-upgrade
**Areas discussed:** animation priority, parallel orchestration, GSAP timing

---

## Animation Priority

| Option | Description | Selected |
|--------|-------------|----------|
| Lowest complexity first | Start with simple Motion and CSS work, then move toward route and GSAP work. | yes |
| Highest impact first | Start with page transitions or GSAP scroll work. | |
| Library-first rewrite | Normalize all animation behind a new abstraction before tuning surfaces. | |

**User's choice:** Lowest complexity first.
**Notes:** User asked for the simplest animation tasks first and for priority from lowest to highest complexity.

---

## Parallel Orchestration

| Option | Description | Selected |
|--------|-------------|----------|
| Parallel worktrees, sequential merges | Agents can work in isolated branches or worktrees, then integrate one lane at a time. | yes |
| Fully sequential implementation | One agent implements every animation lane in one branch. | |
| Fully parallel merges | Agents work and merge at the same time. | |

**User's choice:** Parallelize work while protecting the initial site.
**Notes:** The safest plan is parallel exploration and implementation, with sequential verification and merge order.

---

## GSAP Timing

| Option | Description | Selected |
|--------|-------------|----------|
| Leave GSAP until last | Use Motion and CSS first, then audit or expand GSAP only at the end. | yes |
| Use GSAP immediately | Move early lanes into GSAP timelines. | |
| Remove existing GSAP | Replace current GSAP usage before other motion work. | |

**User's choice:** GSAP last.
**Notes:** Existing GSAP in Hero and SmoothScroll can remain. New GSAP work is deferred to the final lane.

---

## Priority Captured

1. Reveal and RevealWords audit.
2. Card hover and reveal polish.
3. MagneticCTA refinement.
4. Page transition refinement.
5. GSAP scroll or timeline final pass.

## Deferred Ideas

- New GSAP-heavy animation features.
- Broad Awwwards-style spectacle outside Kismet's premium editorial tone.
