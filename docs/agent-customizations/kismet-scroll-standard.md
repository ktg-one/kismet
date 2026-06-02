# Kismet — Viewport & ScrollTrigger Standard

> **One-sentence rule:** Section heights are `100svh`; scroll distances are viewport-height multiples (`+=100/150/200/300%`) via function-based values, never pixel literals; branch with `matchMedia` at Tailwind breakpoints; refresh after load.

---

## Section heights — use these, not arbitrary vh

| Purpose | Unit | Why |
|---|---|---|
| Full-screen section / hero | `100svh` | `svh` = small viewport height; survives mobile address-bar collapse. **Never plain `100vh`** — it overflows on mobile when the bar shows. |
| "Just over one screen" feel | `100dvh` | dynamic vh; adjusts as chrome shows/hides |
| Standard content section | `auto` (content-driven) or `min-h-[80svh]` | let content set height; don't pin a number |
| Pinned scroll-story beat | viewport **multiples** (below) | never raw pixels |

---

## Scroll-distance multiples — the "definitive multiples" for pinned/scrubbed sections

Express ScrollTrigger `end` as a **multiple of viewport height**, never a pixel literal:

| `end` value | Meaning | Use for |
|---|---|---|
| `"+=100%"` | 1 screen-height of scroll | single fade/parallax beat |
| `"+=150%"` | 1.5 screens | one pin with a bit of dwell |
| `"+=200%"` | 2 screens | pinned section, two phases |
| `"+=300%"` | 3 screens | multi-step pinned narrative |
| `"bottom top"` | until element exits viewport | content-driven parallax (self-scaling) |

---

## Width breakpoints (Tailwind standard — branch animations here)

| Name | Min width | Device |
|---|---|---|
| (base) | 0 | mobile portrait |
| `sm` | 640px | large phone |
| `md` | 768px | tablet |
| `lg` | 1024px | laptop |
| `xl` | 1280px | desktop |
| `2xl` | 1536px | large desktop |

---

## Height reference points (for matchMedia branching)

| Range | Treat as |
|---|---|
| `< 600px` tall | short / landscape mobile — reduce/disable pins |
| `~700–800px` | laptop — default |
| `~900–1080px+` | desktop — full effects |

---

## Non-negotiable GSAP rules

1. **Never hardcode pixel scroll distances.** Use `+=%` of viewport or `"bottom top"` style keyword anchors.

2. **Height-dependent values must be functions**, recomputed on refresh:
   ```js
   end: () => "+=" + window.innerHeight * 1.5,
   y: () => -(el.scrollHeight - window.innerHeight),
   ```

3. **`ScrollTrigger.refresh()`** after fonts/images load and on resize — recalculates against real measured layout.

4. **Branch per breakpoint with `gsap.matchMedia()`**, don't write one config and hope:
   ```js
   const mm = gsap.matchMedia();
   mm.add("(min-width: 768px)", () => { /* desktop triggers */ });
   mm.add("(max-width: 767px)", () => { /* mobile: lighter/none */ });
   ```

5. **Full-screen sections use `svh`/`dvh`, never `vh`.**

6. **Develop with `markers: true`, strip before commit.**
