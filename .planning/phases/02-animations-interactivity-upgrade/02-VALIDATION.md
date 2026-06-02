---
phase: 2
slug: animations-interactivity-upgrade
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-05-28
---

# Phase 2 - Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | TypeScript, ESLint, Next build, browser review |
| **Config file** | `package.json`, `eslint.config.mjs`, `tsconfig.json` |
| **Quick run command** | `npm run type-check` |
| **Full suite command** | `npm run lint && npm run build` |
| **Estimated runtime** | ~60 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run type-check`
- **After every plan wave:** Run `npm run lint && npm run build`
- **Before `$gsd-verify-work`:** Full suite and browser review must be green
- **Max feedback latency:** 90 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 2-01-01 | 01 | 1 | Reveal primitives stay hydration-safe and reduced-motion safe | compile / browser | `npm run type-check` | yes | pending |
| 2-02-01 | 02 | 1 | Card animation polish is consistent and does not shift layout | compile / browser | `npm run type-check` | yes | pending |
| 2-03-01 | 03 | 1 | Magnetic CTA remains accessible and restrained | compile / keyboard | `npm run type-check` | yes | pending |
| 2-04-01 | 04 | 2 | Page transitions are smooth without blank frames | build / browser | `npm run lint && npm run build` | yes | pending |
| 2-05-01 | 05 | 3 | GSAP final pass is scoped, cleaned up, and reduced-motion safe | build / browser | `npm run lint && npm run build` | yes | pending |

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Visual motion quality | Premium editorial animation | Requires human judgment | Review key pages at 375px, 768px, and 1440px |
| Reduced-motion behavior | Accessibility | Browser preference emulation required | Enable reduced motion and confirm movement is disabled or instant |
| Route transition feel | Smooth transitions | Requires navigation review | Click between home, approach, pathways, insights, article, about, and contact |
| Scroll smoothness | GSAP and Lenis stability | Requires browser scroll review | Scroll hero and long pages on mobile and desktop |

---

## Validation Sign-Off

- [x] All plans include automated verification
- [x] Sampling continuity: every plan includes at least `npm run type-check`
- [x] Wave 0 covers all missing references
- [x] No watch-mode flags
- [x] Feedback latency target is under 90 seconds
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved 2026-05-28
