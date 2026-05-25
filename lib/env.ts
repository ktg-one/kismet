import "server-only";

// Central server-side environment guard for the Kismet lead pipeline.
// Read required vars when helpers are invoked so build-time route evaluation
// does not fail in environments that do not carry production secrets.
// All six vars are still required for the live lead pipeline.
// Note: process.env reads are runtime in Next.js App Router API routes (not build time),
// so npm run build will succeed even if vars are absent from the build machine.
// In-memory rate limiter in app/api/lead/route.ts resets on serverless cold starts - known limitation for v1.

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `[kismet] Required environment variable "${name}" is not set. ` +
        `See .env.example for setup instructions.`
    );
  }
  return value;
}

export function getLeadEmailEnv() {
  return {
    resendApiKey: requireEnv("RESEND_API_KEY"),
    leadInboxTo: requireEnv("LEAD_INBOX_TO"),
    leadInboxFrom: requireEnv("LEAD_INBOX_FROM"),
  };
}

export function getLeadSheetsEnv() {
  return {
    googleSheetsId: requireEnv("GOOGLE_SHEETS_ID"),
    googleServiceAccountEmail: requireEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL"),
    // Value must be a single line with literal \n sequences. lib/sheets.ts converts them back.
    googleServiceAccountKey: requireEnv("GOOGLE_SERVICE_ACCOUNT_KEY"),
  };
}

// Booking widget (optional - BookingEmbed hides itself when blank)
export const NEXT_PUBLIC_BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ?? "";
