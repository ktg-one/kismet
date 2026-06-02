---
phase: 01-foundation-hardening
plan: 01
subsystem: infra
tags: [nextjs, resend, googleapis, env, server-only]
requires: []
provides:
  - Central server-side env access for the lead pipeline
  - Shared Resend and Google Sheets credential loading
  - Annotated environment setup guide for lead pipeline provisioning
affects: [api, deployment, verification]
tech-stack:
  added: []
  patterns: [server-only env module, lazy required env resolution]
key-files:
  created: [lib/env.ts]
  modified: [lib/email.ts, lib/sheets.ts, .env.example]
key-decisions:
  - "Centralized lead-pipeline env access in lib/env.ts instead of inline process.env reads."
  - "Resolved required env vars lazily inside helper calls so next build passes without live secrets."
patterns-established:
  - "Server-only helpers should import env access from a shared lib/env.ts module."
  - "Required runtime secrets should throw descriptive errors when a request actually needs them."
requirements-completed: [TASK-1.5, F1-email, F1-sheets]
duration: 25min
completed: 2026-05-25
---

# Phase 1: Foundation & Hardening Summary

**Lead pipeline env handling is now centralized through a server-only env module, with documented provisioning steps for Resend and Google Sheets.**

## Performance

- **Duration:** 25 min
- **Started:** 2026-05-25T08:45:00Z
- **Completed:** 2026-05-25T09:10:00Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Created `lib/env.ts` as the single server-only source of truth for lead pipeline env access.
- Rewired `lib/email.ts` and `lib/sheets.ts` to consume shared env helpers instead of inline `process.env` reads.
- Rewrote `.env.example` so Resend, Google Sheets, and booking setup steps are explicit and usable.

## Task Commits

Each task was committed atomically:

1. **Task 1: Create lib/env.ts and wire email.ts + sheets.ts** - `e3137ca` (feat)
2. **Task 2: Rewrite .env.example with full annotations** - `9d39219` (docs)

## Files Created/Modified
- `lib/env.ts` - server-only env helper module for lead pipeline runtime configuration
- `lib/email.ts` - Resend helper now reads credentials through `@/lib/env`
- `lib/sheets.ts` - Google Sheets helper now reads credentials through `@/lib/env`
- `.env.example` - annotated setup template for all lead-pipeline credentials and booking URL

## Decisions Made
- Centralized secret handling in one server-only module to keep env usage consistent across helpers.
- Deferred required env resolution until helper invocation because Next.js evaluates the route module during build.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Deferred required env reads until runtime**
- **Found during:** Task 1 (Create lib/env.ts and wire email.ts + sheets.ts)
- **Issue:** The original plan assumed required env constants could be resolved at module load time without affecting `npm run build`, but Next.js evaluated the API route during build and failed on missing secrets.
- **Fix:** Switched `lib/env.ts` from exported required constants to `getLeadEmailEnv()` and `getLeadSheetsEnv()` functions that validate secrets when helper functions are called.
- **Files modified:** `lib/env.ts`, `lib/email.ts`, `lib/sheets.ts`
- **Verification:** `npm run type-check` and `npm run build` both passed after the change.
- **Committed in:** `e3137ca` (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** The central env contract stayed intact, but it had to be evaluated lazily to preserve buildability.

## Issues Encountered
- `npm run build` failed when `lib/env.ts` threw on missing `RESEND_API_KEY` during route-module evaluation. Adjusting env access to runtime helper calls resolved it cleanly.

## User Setup Required

**External services require manual configuration.** See `.env.example` for:
- Resend domain verification and sender setup
- Google Sheet, service account, and key formatting steps
- Booking widget URL configuration

## Next Phase Readiness
- Phase 1 code now has a stable env contract for the lead pipeline.
- The remaining closeout work is the smoke script and explicit tracking of external provisioning gates.

---
*Phase: 01-foundation-hardening*
*Completed: 2026-05-25*
