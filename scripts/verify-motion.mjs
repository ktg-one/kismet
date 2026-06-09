// Throwaway verification harness (NOT shipped). Drives real Chromium via
// Playwright (Chrome DevTools protocol) against the local dev server and applies
// the kismet-observer methodology: Lenis-synced scroll, DOMMatrix translateY/
// scale reads, and the >=80px / >=0.15 perceptibility thresholds. Proves the
// section-height standardisation and that scroll reveals actually travel.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const URL = process.env.VERIFY_URL || "http://localhost:3001";
const OUT = "docs/handoff";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(900);

const globals = await page.evaluate(() => ({
  lenis: typeof window.__lenis,
  ST: typeof window.ScrollTrigger,
}));
console.log("globals:", JSON.stringify(globals));

// svh probe (matches the standard we set: min-height:100svh)
const svh = await page.evaluate(() => {
  const p = document.createElement("div");
  p.style.cssText = "position:fixed;top:0;height:100svh;width:0;visibility:hidden";
  document.body.appendChild(p);
  const h = Math.round(p.getBoundingClientRect().height);
  p.remove();
  return h;
});
console.log(`svh = ${svh}px\n`);

// 1) SECTION HEIGHT STANDARDISATION
const sections = await page.evaluate(() =>
  Array.from(document.querySelectorAll("section")).map((s, i) => {
    const r = s.getBoundingClientRect();
    return {
      i,
      h: Math.round(r.height),
      screen: s.classList.contains("section-screen"),
      cls: (s.className || "").toString().replace(/\s+/g, " ").slice(0, 48),
    };
  })
);
console.log("SECTIONS (height vs svh):");
for (const s of sections) {
  console.log(`  #${s.i} ${String(s.h).padStart(5)}px  ${(s.h / svh).toFixed(2)}x  screen=${s.screen}  [${s.cls}]`);
}

// scroll helper — Lenis if present (keeps ScrollTrigger in sync), else fallback
async function scrollTo(y) {
  await page.evaluate((Y) => {
    if (window.__lenis) {
      window.__lenis.scrollTo(Y, { immediate: true });
      window.__lenis.raf(performance.now());
    } else {
      window.scrollTo(0, Y);
    }
  }, y);
  await page.waitForTimeout(450);
}

// read transformed elements (tY, scale, opacity) — the GSAP-driven ones
async function readAnimated() {
  return page.evaluate(() => {
    const read = (el) => {
      const m = new DOMMatrixReadOnly(getComputedStyle(el).transform || "");
      return {
        cls: (el.className || "").toString().slice(0, 34),
        tY: Math.round(m.m42),
        scale: +m.a.toFixed(3),
        op: +getComputedStyle(el).opacity,
      };
    };
    const animated = [...document.querySelectorAll("*")].filter((el) => {
      const t = getComputedStyle(el).transform;
      return t && t !== "none" && t !== "matrix(1, 0, 0, 1, 0, 0)";
    });
    return animated
      .filter((el) => !el.className?.toString().includes("fixed"))
      .slice(0, 8)
      .map(read);
  });
}

// 2) SCROLL TRAVEL across the page; track per-class min/max tY to get real delta
console.log("\nSCROLL TRAVEL (tY by element class, across the page):");
const travel = {}; // cls -> {min,max,scaleMin,scaleMax}
const pageH = await page.evaluate(() => document.documentElement.scrollHeight);
const steps = 12;
for (let i = 0; i <= steps; i++) {
  const y = Math.round((pageH - svh) * (i / steps));
  await scrollTo(y);
  const els = await readAnimated();
  for (const e of els) {
    const t = (travel[e.cls] = travel[e.cls] || { min: e.tY, max: e.tY, sMin: e.scale, sMax: e.scale });
    t.min = Math.min(t.min, e.tY);
    t.max = Math.max(t.max, e.tY);
    t.sMin = Math.min(t.sMin, e.scale);
    t.sMax = Math.max(t.sMax, e.scale);
  }
  if (i === 0 || i === Math.floor(steps / 2) || i === steps) {
    await page.screenshot({ path: `${OUT}/kismet-motion-${i}.png` });
  }
}

console.log("\nTRAVEL SUMMARY (delta = max-min tY; scale delta):");
for (const [cls, t] of Object.entries(travel)) {
  const dY = t.max - t.min;
  const dS = +(t.sMax - t.sMin).toFixed(3);
  const verdict = dY >= 80 || dS >= 0.15 ? "PERCEPTIBLE" : "sub-threshold";
  console.log(`  ${cls.padEnd(36)} dY=${String(dY).padStart(4)}px  dScale=${dS}  -> ${verdict}`);
}

await browser.close();
console.log(`\nscreenshots: ${OUT}/kismet-motion-{0,6,12}.png`);
