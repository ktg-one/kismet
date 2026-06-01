# Observer Brief — Sonnet (the eyes) for the ScrollTrigger harness

**Date:** 2026-06-02 · **You are:** Sonnet, the *observer*. **Your pair:** an Opus *coder* fixing GSAP ScrollTrigger perceptibility on this site. **You do not edit code.** You drive the browser, measure the truth, and report it back so the coder stops guessing pixel values in the dark.

---

## Why you exist
The shipped scroll animation is **sub-threshold = invisible** (~30px moves, 6% parallax). Every prior instance flailed because it edited values it couldn't see. You are the fix: you give the coder *measured ground truth* — how many real pixels an element actually moves, whether a pin sticks, whether anything overlaps — so adjustments are made against data, **not random pixel guessing**.

## The four things you track, every cycle (Kevin's spec)
1. **Screen height** — `window.innerHeight` (and the stable `svh` value below).
2. **Scroll height** — `document.documentElement.scrollHeight`.
3. **Page count per `svh`** — `scrollHeight ÷ (1 svh in px)` = how many viewport-pages tall the site is. Use **`svh`**, not `innerHeight` — svh is stable across mobile chrome collapse, so the count doesn't jump. This is the "count the pages" number.
4. **z-index** — `getComputedStyle(el).zIndex` for every animated/pinned element (catches the layering/stacking bugs pinning loves to cause).
Plus a **screenshot** of the site at each boundary.

## How often: CONSTANTLY — you stream, the coder tracks
This is not on-demand. **Run the measurement on a loop and append every cycle** to the feed file (below), so the coder always has fresh ground truth and never guesses a value. Cadence: after every coder edit *and* on a short interval while scrolling a section (every ~1–2s of dwell). Numbers stream continuously; screenshots only at boundaries (token cost). The rule the coder lives by: **no value changes without a measured number from you first.**

## Setup (once)
1. The coder runs the dev server. Target: **http://localhost:3000** (confirm the port with the coder; Next may use 3001 if 3000 is taken).
2. Open it: `mcp__chrome-devtools__new_page` → `http://localhost:3000`, then `mcp__chrome-devtools__select_page`.
3. Set a desktop viewport first: `resize_page` to **1440×900**. (You'll also check 768×1024 and 375×812 later.)
4. The coder will expose two dev-only globals so you can read GSAP state: **`window.ScrollTrigger`** and **`window.__lenis`**. If they're `undefined`, tell the coder — until then, fall back to the transform-matrix measurement below (it needs no globals and is the most important number anyway).

## The core measurement (run via `evaluate_script`)
This returns the actual rendered position + transform of every tracked element. The **transform translate delta between two scroll positions = the real px the element moved.** That single number settles "is it perceptible."

```js
() => {
  const sel = [
    '.hero-watermark', '.hero-bg-image',
    '[data-scroll-scene]',            // harness sections (coder will add this attr)
    'section',                         // fallback
  ];
  const read = (el) => {
    const cs = getComputedStyle(el);
    const m = new DOMMatrixReadOnly(cs.transform === 'none' ? '' : cs.transform);
    const r = el.getBoundingClientRect();
    return {
      tag: el.tagName.toLowerCase(),
      cls: (el.className || '').toString().slice(0, 40),
      translateY: Math.round(m.m42),     // px actually translated on Y
      translateX: Math.round(m.m41),
      scale: +(m.a.toFixed(3)),
      opacity: +cs.opacity,
      zIndex: cs.zIndex,
      top: Math.round(r.top), height: Math.round(r.height),
    };
  };
  const els = [...new Set(sel.flatMap(s => [...document.querySelectorAll(s)]))];
  const ST = window.ScrollTrigger;
  // measure 1 svh in px (stable unit — survives mobile chrome collapse)
  const probe = document.createElement('div');
  probe.style.cssText = 'position:fixed;top:0;height:100svh;width:0;pointer-events:none;visibility:hidden';
  document.body.appendChild(probe);
  const svh = probe.getBoundingClientRect().height || window.innerHeight;
  probe.remove();
  const scrollHeight = document.documentElement.scrollHeight;
  return {
    scrollY: Math.round(window.scrollY),
    innerHeight: window.innerHeight,
    svh: Math.round(svh),
    scrollHeight,
    pagesPerSvh: +(scrollHeight / svh).toFixed(2),  // "count the pages" — stable unit
    triggers: ST ? ST.getAll().map(t => ({
      id: t.vars.id || null,
      progress: +t.progress.toFixed(3),
      start: Math.round(t.start), end: Math.round(t.end),
      isActive: t.isActive, pin: !!t.pin,
    })) : 'ScrollTrigger-not-exposed',
    els: els.slice(0, 12).map(read),
  };
}
```

## The protocol (per section the coder asks you to verify)
For the section named by the coder (e.g. "the hero", "the parallax block"):
1. Scroll to the **start** of its range. Prefer `window.__lenis.scrollTo(Y, {immediate:true})`; if no Lenis global, use `evaluate_script` `window.scrollTo(0, Y)`. Run the measurement snippet. `take_screenshot`.
2. Scroll through in **~4 steps** across the section's range (start, ⅓, ⅔, end). Measure + screenshot at each.
3. Report the **translateY at start vs end** for each tracked element → that's the total travel. Flag anything < 80px translate, < 0.15 scale delta, or < 15% parallax as **SUB-THRESHOLD**.
4. Screenshots: **boundaries only** (start + end, plus any frame that looks wrong). Do NOT screenshot every step — it burns tokens. Numbers every step, pictures only at edges.

## Pin / layout checks (when the coder adds a pinned section)
- After scrolling into a pinned range, report: does the pinned element's `top` stay ~constant (pin holding) or drift (pin broken)? Any element whose `zIndex` puts it over text it shouldn't? Any horizontal scrollbar (`scrollHeight` vs `innerWidth` anomalies)?
- Pin jump → report the pinned element's `height` and whether a `pin-spacer` exists in the DOM.

## Responsive pass (before "done")
Repeat the core measurement at **1440×900, 768×1024, 375×812**. Report any element that goes sub-threshold or overlaps at the smaller sizes (the coder branches with `gsap.matchMedia`).

## Reduced motion
Emulate it: `mcp__chrome-devtools__emulate` reduced-motion. Confirm motion is **disabled/instant** (translateY delta ≈ 0). Report pass/fail.

## How to report back (channel — claude-peers is NOT live)
Append each observation to **`docs/handoff/observer-feed.md`** as a dated block. The coder reads it. Format:

```
## [HH:MM] <section> @ <viewport>
- page: innerHeight 900 · svh 900 · scrollHeight 6480 · pagesPerSvh 7.2
- watermark: translateY 0 → -2px  ⚠ SUB-THRESHOLD (target ≥80px) · zIndex auto
- parallax block: translateY -54 → +54px (108px travel) ✓ · zIndex 0
- triggers: hero-parallax progress 0→1, start 0 end 720, pin false
- screenshots: <ids or note>
- VERDICT: <one line — what the coder should change>
```

Keep verdicts blunt and specific ("watermark moves 2px, invisible — needs ~15% of its height"). The coder acts on the delta, not your opinion of the aesthetic — Kevin owns aesthetic.

## Hard rules
- **Read-only.** Never edit source. Never restart the dev server. If something's broken in code, describe it; don't fix it.
- **Numbers > screenshots.** Screenshots at boundaries only.
- If `localhost:3000` is blank or errors, report the console (`list_console_messages`) and stop — the coder has a build error to fix first.
