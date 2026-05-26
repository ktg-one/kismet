---
status: testing
phase: 01-foundation-hardening
source:
  - 01-01-SUMMARY.md
  - 01-02-SUMMARY.md
started: 2026-05-25T01:14:30Z
updated: 2026-05-25T01:14:30Z
---

## Current Test

number: 1
name: Fresh Site Smoke Check
expected: |
  Start the app and open the key marketing routes. The homepage, About, Contact, and Insights pages should all render without a crash page, and the browser console should stay free of runtime errors while moving through those routes.
awaiting: user response

## Tests

### 1. Fresh Site Smoke Check
expected: Start the app and open the key marketing routes. The homepage, About, Contact, and Insights pages should all render without a crash page, and the browser console should stay free of runtime errors while moving through those routes.
result: pending

### 2. Contact Entry Surface
expected: On the Contact page, the page should load with the contact heading and visible inquiry path so a visitor can begin a lead submission flow without broken UI or missing form content.
result: pending

### 3. Lead Pipeline Smoke Script
expected: Running `node scripts/smoke-lead.mjs` against a configured local dev server should post one valid lead payload to `/api/lead` and finish with a clear success or failure message instead of hanging or failing silently.
result: pending

### 4. Missing Env Failure Mode
expected: If the lead pipeline is not configured, the smoke path should fail clearly with a descriptive configuration error that points back to `.env.example`, rather than crashing the app with an opaque server error.
result: pending

## Summary

total: 4
passed: 0
issues: 0
pending: 4
skipped: 0

## Gaps

[none yet]
