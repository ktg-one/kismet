// Fine-grained re-measure of the StrategicPathways card reveals (the coarse
// pass undersampled their ~405px scrub window). Steps in small increments and
// records true min/max translateY + scale per card wrapper.
import { chromium } from "playwright";

const URL = process.env.VERIFY_URL || "http://localhost:3001";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(900);

const svh = await page.evaluate(() => window.innerHeight);
const pageH = await page.evaluate(() => document.documentElement.scrollHeight);

async function scrollTo(y) {
  await page.evaluate((Y) => {
    if (window.__lenis) { window.__lenis.scrollTo(Y, { immediate: true }); window.__lenis.raf(performance.now()); }
    else window.scrollTo(0, Y);
  }, y);
  await page.waitForTimeout(120);
}

const track = {}; // cls -> {min,max,sMin,sMax}
const STEP = 40;
for (let y = 0; y <= pageH - svh; y += STEP) {
  await scrollTo(y);
  const els = await page.evaluate(() => {
    const want = [...document.querySelectorAll('[class*="col-span"]')];
    return want.map((el) => {
      const m = new DOMMatrixReadOnly(getComputedStyle(el).transform || "");
      return { cls: (el.className || "").toString().slice(0, 30), tY: Math.round(m.m42), scale: +m.a.toFixed(3) };
    });
  });
  for (const e of els) {
    const t = (track[e.cls] = track[e.cls] || { min: e.tY, max: e.tY, sMin: e.scale, sMax: e.scale });
    t.min = Math.min(t.min, e.tY); t.max = Math.max(t.max, e.tY);
    t.sMin = Math.min(t.sMin, e.scale); t.sMax = Math.max(t.sMax, e.scale);
  }
}

console.log(`fine scan: step=${STEP}px over ${pageH - svh}px\n`);
console.log("CARD WRAPPER TRUE TRAVEL:");
for (const [cls, t] of Object.entries(track)) {
  const dY = t.max - t.min;
  const dS = +(t.sMax - t.sMin).toFixed(3);
  const verdict = dY >= 80 || dS >= 0.15 ? "PERCEPTIBLE" : "SUB-THRESHOLD";
  console.log(`  ${cls.padEnd(32)} tY ${String(t.min).padStart(4)}->${String(t.max).padStart(4)} (d=${dY}px)  scale ${t.sMin}->${t.sMax} (d=${dS})  ${verdict}`);
}
await browser.close();
