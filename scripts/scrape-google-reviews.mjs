/**
 * Scrape every Google review for Kismet Finance Group via Playwright.
 *
 * Run: node scripts/scrape-google-reviews.mjs [--headed] [--debug]
 *   --headed: open the browser visibly so you can see what's happening
 *   --debug:  also dump a screenshot at each stage to /tmp/kismet-scrape-*.png
 */
import { chromium } from "playwright";
import { promises as fs } from "node:fs";

const args = new Set(process.argv.slice(2));
const HEADED = args.has("--headed");
const DEBUG = args.has("--debug");

const SEARCH_URL =
  "https://www.google.com/maps/search/Kismet+Finance+Group/@-32.124566,115.836555,15z";

const browser = await chromium.launch({ headless: !HEADED });
const ctx = await browser.newContext({
  locale: "en-AU",
  timezoneId: "Australia/Perth",
  viewport: { width: 1400, height: 1000 },
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
});
const page = await ctx.newPage();

async function shot(label) {
  if (!DEBUG) return;
  await page.screenshot({ path: `/tmp/kismet-scrape-${label}.png`, fullPage: false });
}

console.log("Loading Google Maps search...");
await page.goto(SEARCH_URL, { waitUntil: "domcontentloaded", timeout: 60000 });
await shot("01-loaded");

// Dismiss consent
for (const txt of ["Accept all", "I agree", "Reject all", "Got it"]) {
  try {
    await page.getByRole("button", { name: new RegExp(txt, "i") }).first().click({ timeout: 3000 });
    console.log("Dismissed consent:", txt);
    await page.waitForTimeout(1500);
    break;
  } catch {}
}
await shot("02-after-consent");

await page.waitForTimeout(2500);

// If we landed on results list, click first place
try {
  const firstResult = page.locator('a.hfpxzc, a[href*="/maps/place/"]').first();
  if (await firstResult.count()) {
    await firstResult.click({ timeout: 5000 });
    await page.waitForTimeout(3000);
    console.log("Opened first place");
  }
} catch (e) {
  console.log("No list / already on place");
}
await shot("03-place-open");

// Try multiple ways to reach reviews
let foundReviews = false;
const reviewTabSelectors = [
  'button[role="tab"][aria-label*="Reviews" i]',
  'button[jsaction*="reviewChart"]',
  'a[href*="reviews"][role="tab"]',
  'div[role="tablist"] button:has-text("Reviews")',
];
for (const sel of reviewTabSelectors) {
  try {
    const btn = page.locator(sel).first();
    if (await btn.count()) {
      await btn.click({ timeout: 5000 });
      console.log("Clicked Reviews via:", sel);
      foundReviews = true;
      await page.waitForTimeout(2500);
      break;
    }
  } catch {}
}

if (!foundReviews) {
  // Try by visible text
  try {
    await page.getByText(/^Reviews$/i, { exact: false }).first().click({ timeout: 5000 });
    console.log("Clicked Reviews via text");
    foundReviews = true;
    await page.waitForTimeout(2500);
  } catch {}
}
await shot("04-reviews-tab");

// Scroll the reviews panel
let prev = 0;
for (let i = 0; i < 60; i++) {
  const count = await page.evaluate(() => {
    return document.querySelectorAll(
      'div[data-review-id], div[class*="jftiEf"], div[class*="GHT2ce"]'
    ).length;
  });
  if (count === prev && i > 4) {
    console.log(`Plateau at ${count} reviews after ${i} scrolls`);
    break;
  }
  prev = count;
  await page.evaluate(() => {
    // Scroll any visible scroll container
    const candidates = document.querySelectorAll(
      'div[class*="m6QErb"][class*="DxyBCb"], div[class*="HeZRrf"], div[role="main"] [tabindex]'
    );
    for (const el of candidates) {
      if (el.scrollHeight > el.clientHeight) {
        el.scrollTop = el.scrollHeight;
      }
    }
    window.scrollTo(0, document.body.scrollHeight);
  });
  await page.waitForTimeout(800);
}
await shot("05-scrolled");

// Click "More" on long reviews
try {
  const mores = await page.locator('button:has-text("More")').all();
  console.log(`Expanding ${mores.length} 'More' buttons`);
  for (const m of mores) {
    try {
      await m.click({ timeout: 1200 });
    } catch {}
  }
  await page.waitForTimeout(700);
} catch {}

// Extract
const reviews = await page.evaluate(() => {
  const cards = document.querySelectorAll(
    'div[data-review-id], div[class*="jftiEf"], div[class*="GHT2ce"]'
  );
  const out = [];
  cards.forEach((card) => {
    const author =
      card.querySelector('[class*="d4r55"]')?.textContent?.trim() ??
      card.querySelector('button[jsaction*="reviewerLink"]')?.textContent?.trim() ??
      card.querySelector('div[class*="WNxzHc"] span')?.textContent?.trim() ??
      null;
    const ratingLabel =
      card.querySelector('[role="img"][aria-label*="star" i]')?.getAttribute("aria-label") ??
      card.querySelector('[aria-label*="out of" i]')?.getAttribute("aria-label") ??
      "";
    const ratingMatch = ratingLabel.match(/(\d(?:[.,]\d)?)/);
    const rating = ratingMatch ? parseFloat(ratingMatch[1].replace(",", ".")) : null;
    const date =
      card.querySelector('[class*="rsqaWe"]')?.textContent?.trim() ??
      card.querySelector('span[class*="dehysf"]')?.textContent?.trim() ??
      null;
    const text =
      card.querySelector('[class*="wiI7pd"]')?.textContent?.trim() ??
      card.querySelector('span[class*="MyEned"]')?.textContent?.trim() ??
      "";
    if (text && text.length > 0) out.push({ author, rating, date, text });
  });
  return out;
});

console.log(`Extracted ${reviews.length} reviews`);
reviews.sort((a, b) => {
  const ra = a.rating ?? 0;
  const rb = b.rating ?? 0;
  if (rb !== ra) return rb - ra;
  return (b.text?.length ?? 0) - (a.text?.length ?? 0);
});

await fs.mkdir("public/data", { recursive: true });
await fs.writeFile("public/data/reviews.json", JSON.stringify(reviews, null, 2), "utf8");
console.log(`Wrote public/data/reviews.json (${reviews.length} reviews)`);

await browser.close();
