/**
 * smoke-lead.mjs
 * Manual end-to-end smoke test for the lead form pipeline.
 *
 * Prerequisites:
 *   1. npm run dev is running in another terminal (port 3000)
 *   2. .env.local has real values for RESEND_API_KEY, LEAD_INBOX_TO, LEAD_INBOX_FROM,
 *      GOOGLE_SHEETS_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_SERVICE_ACCOUNT_KEY
 *
 * Run:
 *   node scripts/smoke-lead.mjs
 *
 * What it tests:
 *   - Zod validation accepts a well-formed payload
 *   - Honeypot field (empty string) passes the spam check
 *   - Resend sends a notification email to LEAD_INBOX_TO
 *   - Google Sheets appends a row to the Leads tab
 *   - Response is HTTP 200 { ok: true }
 *
 * Expected results after running:
 *   - Shane's inbox receives "New Kismet lead: Smoke Test"
 *   - A new row appears in the Leads tab of the Google Sheet
 *
 * Known limitations:
 *   - If Resend domain is not verified, email will fail but Sheets may still succeed (partial ok).
 *   - If .env.local is missing vars, the route returns 503 service_unconfigured.
 *   - In-memory rate limiter: running this script more than 5 times in 15 min will return 429.
 *     Restart the dev server to reset.
 */

const BASE_URL = process.env.SMOKE_BASE_URL || "http://localhost:3000";

const payload = {
  name: "Smoke Test",
  email: "smoke@example.com",
  phone: "0400000000",
  message: "Automated smoke test from scripts/smoke-lead.mjs. Safe to ignore.",
  honeypot: "",
};

console.log(`[smoke-lead] POST ${BASE_URL}/api/lead`);
console.log("[smoke-lead] Payload:", JSON.stringify(payload, null, 2));

let res;
try {
  res = await fetch(`${BASE_URL}/api/lead`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
} catch (err) {
  const message = err instanceof Error ? err.message : String(err);
  console.error("[smoke-lead] FAIL -- could not reach dev server:", message);
  console.error("[smoke-lead] Is npm run dev running on port 3000?");
  process.exit(1);
}

let body;
try {
  body = await res.json();
} catch {
  body = { raw: await res.text() };
}

console.log(`[smoke-lead] Status: ${res.status}`);
console.log("[smoke-lead] Body:", JSON.stringify(body, null, 2));

if (res.status === 200 && body.ok === true) {
  console.log("[smoke-lead] PASS -- lead accepted. Check Shane inbox and Google Sheet.");
  process.exit(0);
}

if (res.status === 503) {
  console.warn("[smoke-lead] WARN -- 503 service_unconfigured.");
  console.warn("[smoke-lead] Check .env.local: all six lead pipeline vars must be set.");
  process.exit(1);
}

if (res.status === 429) {
  console.warn("[smoke-lead] WARN -- 429 rate_limit_exceeded.");
  console.warn("[smoke-lead] Restart npm run dev to reset the in-memory rate limiter.");
  process.exit(1);
}

console.error(`[smoke-lead] FAIL -- unexpected status ${res.status}`);
process.exit(1);
