# Handoff — ScrollTrigger Harness (kismet-website)

**Date:** 2026-06-02 · **For:** the next instance · **Box:** 30 min, fresh context.

## Objective
Implement a *real* ScrollTrigger harness. The current scroll animation is **sub-threshold = effectively non-existent** (moving ~30px over ~1s — invisible at normal scroll speed). Make it perceptible.

## ⚠️ READ THIS FIRST — the docs lie
`.planning/STATE.md` and `.planning/phases/02-animations-interactivity-upgrade/PHASE-COMPLETION-SUMMARY.md` claim the animation is "complete," at "perceptible magnitudes (y 120px, scale 0.9, parallax 18%)," and "browser-verified." **It is not.** The shipped values are ~30px / 1s — invisible. The previous instance (me) trusted these docs instead of reading the actual animation values and reported finished work that isn't.
**Do not trust the GSD log. Open the components and read the real numbers. Verify in a browser, not on paper.**

## Equip FIRST (non-negotiable — Kevin's rule)
No code until these are loaded. Coding GSAP blind for someone to fix later is pure waste.
1. `gsap-scrolltrigger` (skill)
2. `implement_lenis_scroll` (`~/.agents/skills/implement_lenis_scroll`)
3. Project skills in `skills-lock.json` (awwwards-animations, gsap-awwwards-website, impeccable, etc.) — register them (`scripts/require-skill.ps1`).

## Stack (already installed — verified in package.json)
`lenis ^1.3.23` · `gsap ^3.15.0` · `@gsap/react ^2.1.2` · `next 16.2.5` · `tailwindcss ^4`

## Current state — what NOT to redo
- **Lenis IS already wired** in `components/SmoothScroll.tsx` (Lenis↔GSAP integration exists). Do **not** rebuild smooth scroll. The problem is the **trigger values**, not the plumbing.
- Audit these for sub-threshold numbers: `components/SmoothScroll.tsx`, `Hero.tsx`, `ScrollParallax.tsx`, `Card.tsx`, `Reveal.tsx`, and any `ScrollReveal`.

## The fix — perceptibility floor (from the skills)
- Translate **≥ 80px, typically 100–200px**. (30px = nothing.)
- Scale delta **≥ 0.15–0.25** (e.g. 0.8→1.0). 0.9→1.0 is invisible.
- Parallax drift **≥ 15–25%** of element height. 5–6% is invisible.
- Rotation ≥ 4–8°. Opacity 0→1 always paired with a translate (give motion direction).
- **Pacing:** resolve a reveal within ~30–50% of a viewport height of scroll. Don't smear a small move over 1000px.
- Ship-check: *would a non-dev, scrolling normally, obviously notice it without being told to look?*

## Discipline (mechanism — get this right blind)
- Distances in **vh-multiples + function-based values**, NOT pixels: `end: "+=150%"`, `y: () => -(content.scrollHeight - innerHeight)`. GSAP recomputes functions on `refresh()`.
- `ScrollTrigger.refresh()` after fonts/images load.
- `markers: true` during dev (strip before demo). `scrub: 1` to start.
- React cleanup via `useGSAP()` (@gsap/react is installed) or `gsap.context()` revert.
- Responsive branches via `gsap.matchMedia()` (NOT the deprecated `ScrollTrigger.matchMedia()`).
- Lenis↔ScrollTrigger wiring (confirm it's present in SmoothScroll.tsx): `lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add(t => lenis.raf(t*1000))` + `gsap.ticker.lagSmoothing(0)`.
- ScrollTrigger goes on the **timeline / top-level tween**, never a child tween. Don't `scrub` + `toggleActions` on the same trigger.

## No-blind-flailing contract (Kevin's, non-negotiable)
You **cannot see the screen** — Kevin can. So:
- Do NOT guess feel-numbers (no 1.2→1.3 scrub theater). If it depends on feel, say so.
- Build structure correct, set `scrub: 1` + `markers: true`, then **Kevin scrolls and calls it** ("slower," "fires too early," "pin jumps") and you adjust to *that*.
- Pin jank → check pinned element height + `pinSpacing` first, not scrub.
- (Future fix, deferred: a chrome-devtools observer agent that records scroll/coords/`ScrollTrigger.getAll()` state and feeds the coder ground truth. Not built yet — until then, Kevin is the eyes.)

## GSD context
Phase 03, ~71%. PR #2 (`anim/scroll-reveal` → `feat/animations`) is "awaiting merge" per STATE — but since the animation is sub-threshold, treat "complete" as suspect; verify before merging. Phase 3 remainder: Vercel env vars + GA4 (env-gated). Heavy pinned ktg.one-style choreography is explicitly deferred — not this box.

## First moves for the next instance
1. Equip the skills above.
2. Open `SmoothScroll.tsx` + the component list; read the **actual** translate/scale/scrub values. Confirm the ~30px/1s.
3. Bump to perceptible magnitudes (vh-relative, function-based), `markers: true`, `scrub: 1`.
4. Hand the scroll to Kevin to calibrate feel. Do not guess it.

## Observer agent spec (Kevin's design — build this to kill the blind-flailing)
A **separate subagent** drives chrome-devtools while the **main agent codes** — gives the blind coder eyes so it stops guessing.

- **Trigger:** either a **PostToolUse hook** (fires after the main agent edits/runs) OR an **interval** (every N seconds) while the main agent works. Hook is cheaper; interval is for live watching.
- **Each run** (against the running dev server, via chrome-devtools MCP):
  - `take_screenshot` at the current/boundary scroll state.
  - `evaluate_script` to record three things Kevin wants tracked:
    1. **screen height** — `window.innerHeight`
    2. **scroll height** — `document.documentElement.scrollHeight` (÷ innerHeight ≈ number of viewport-pages = "count the pages")
    3. **z-index** — `getComputedStyle(el).zIndex` for positioned/pinned/animated elements (catches layering/stacking bugs that ScrollTrigger pinning loves to cause)
  - Optionally: each tracked element's `getBoundingClientRect()` + `ScrollTrigger.getAll()` progress/start/end/pin state.
- **Feeds the data back to the main coding agent** as ground truth → coder diffs observed-vs-intended instead of guessing scrub/offsets.
- **Mechanism notes:** Claude Code PostToolUse hooks can spawn the subagent; chrome-devtools MCP provides `take_screenshot` + `evaluate_script`; the dev server must be running first. Continuous *data* is cheap (numbers via evaluate_script); *screenshots* should be sampled at boundaries, not every frame (token cost).
- **Status:** designed, not built. This is the real fix for the 30px-in-the-dark problem. Until it exists, Kevin is the eyes.
