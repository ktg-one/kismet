---
phase: 1
slug: foundation-hardening
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-05-25
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None installed yet — TypeScript + Next build + manual smoke |
| **Config file** | none |
| **Quick run command** | `npm run type-check` |
| **Full suite command** | `npm run build` |
| **Estimated runtime** | ~20 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run type-check`
- **After every plan wave:** Run `npm run build`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01 | 1 | Environment contract is explicit and server-only | compile / static | `npm run type-check` | ❌ W0 | ⬜ pending |
| 1-01-02 | 02 | 1 | Integration helpers and route read validated env contract | build | `npm run build` | ❌ W0 | ⬜ pending |
| 1-02-01 | 03 | 2 | Manual lead-pipeline smoke path is documented and runnable | manual smoke | `node scripts/smoke-lead.mjs` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `lib/env.ts` — central server-side env parser/guard for lead pipeline credentials
- [ ] `scripts/smoke-lead.mjs` — manual end-to-end lead submission smoke script
- [ ] `.env.example` — annotated to match the env contract and external setup steps

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Resend sends to Shane successfully | Lead pipeline email delivery | Requires live API key and verified sending domain | Run `npm run dev`, then `node scripts/smoke-lead.mjs` with real env vars and confirm inbox delivery |
| Google Sheets append succeeds | Lead pipeline sheet logging | Requires real Google Sheet and service account access | Use the same smoke script and confirm a new row appears in the `Leads` tab |
| Booking / business env values are ready for later phases | External integration readiness | Depends on Shane-provided values and third-party dashboards | Verify `.env.example` instructions, available credentials, and known missing values before phase close |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
