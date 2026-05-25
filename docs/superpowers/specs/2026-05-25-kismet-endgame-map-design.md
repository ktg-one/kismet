# Kismet Endgame Map Design

**Date:** 2026-05-25  
**Purpose:** Create a single source of truth that maps the project from its current state to launch, so remaining scope is visible end-to-end.

---

## 1. Problem

The project currently has three useful but partially overlapping planning artifacts:

1. `understand-everything/spec.md` describes the intended product and success criteria.
2. `understand-everything/plan.md` contains the original 18-task implementation plan.
3. `.planning/ROADMAP.md` contains the active 4-phase GSD roadmap.

Each document is valuable, but none by itself answers the practical question: **what is left between today and launch, and how much work is really still in there?**

---

## 2. Goal

Maintain an end-to-end map that:

- starts from the current shipped baseline
- shows every remaining work item between now and launch
- makes external gates obvious
- keeps the high-level phase view and the granular launch checklist in sync
- gives future sessions a reliable answer to "what is left?"

---

## 3. Approaches Considered

### Option A. Keep only the current 4-phase roadmap

**Pros**
- Simple
- Aligned with current GSD state

**Cons**
- Too coarse to answer how much work remains
- Hides launch gates like approvals, DNS, content inputs, and live verification

### Option B. Revert to the original 18-task implementation plan

**Pros**
- Most granular existing artifact
- Closer to a ship checklist

**Cons**
- Out of sync with the current GSD roadmap/state
- Blends already-shipped work with remaining work

### Option C. Hybrid endgame map (**recommended**)

Use the 4-phase roadmap as the top-level execution structure, but map each phase to a granular remaining-work inventory derived from the original 18-task plan and current repo state.

**Why this is the right choice**
- Preserves the current GSD operating model
- Makes remaining scope measurable
- Separates engineering work from external approval gates
- Gives a clean path from "today" to "live on domain"

---

## 4. Recommended Design

The project should treat the roadmap as the **control plane** and the endgame map as the **scope ledger**.

### 4.1 Control plane

`.planning/ROADMAP.md` remains the high-level source of truth for execution order.

### 4.2 Scope ledger

The endgame map tracks the remaining work under these buckets:

1. **Product polish and motion**
2. **Lead pipeline and environment verification**
3. **Deployment and analytics**
4. **Quality gates and CI**
5. **Content, proof, and business data**
6. **Launch approval and DNS cutover**

Each bucket must list:

- status: `done`, `in_progress`, `blocked`, `not_started`
- owner: `Claude`, `Shane`, or `shared`
- dependency type: `code`, `content`, `platform`, `approval`
- finish condition: one sentence describing what "done" means

---

## 5. Current-State Assessment

Based on the current repository and planning artifacts:

### Shipped or materially complete

- site foundation and dark-theme baseline
- core pages and content architecture
- lead route baseline
- security hardening and React 19 hook fixes
- initial GSD/project-planning scaffolding
- Hero hydration fix

### In progress

- motion/interactivity polish
- planning hygiene and roadmap alignment

### Clearly remaining

- Resend and Google Sheets environment verification
- broader `Reveal`/motion audit
- page transitions and magnetic CTA completion
- analytics setup
- CI and em-dash gate
- Vercel preview deployment
- live lead-pipeline test
- Lighthouse and accessibility pass
- Shane-voice copy finalisation from source material
- real stats, testimonials, ABN, and phone details
- newsletter provider decision and hookup
- Shane approval checkpoint
- DNS cutover

### External blockers or gates

- Vercel login/access
- Resend domain verification
- Google Sheet creation and service-account sharing
- real numbers/testimonials/business details from Shane
- final page-by-page sign-off
- DNS access and cutover timing

---

## 6. Endgame Map to Launch

### Milestone 1. Finish engineering hardening

**Outcome:** codebase is internally consistent and production-ready enough for preview deployment.

Remaining items:
- finalize Resend and Google Sheets helper/env usage
- complete motion audit for `Reveal` / `RevealWords`
- finish page transitions
- finish magnetic CTA behaviour

### Milestone 2. Add operational instrumentation

**Outcome:** preview environments are measurable and guarded.

Remaining items:
- add Vercel Analytics
- add GA4 env-gated integration
- add CI workflow
- add no-em-dash gate and align check scripts

### Milestone 3. Prove the preview environment

**Outcome:** the hosted preview behaves like the intended production site.

Remaining items:
- connect project to Vercel
- configure all preview/production environment variables
- deploy preview build
- run end-to-end lead submission test
- verify booking embed and page rendering

### Milestone 4. Replace all placeholder business inputs

**Outcome:** the site reads and looks like a real operating business, not a near-finished draft.

Remaining items:
- ingest Shane voice/source material and do copy pass
- replace placeholder stats
- replace testimonials with approved real ones
- replace ABN and phone placeholders
- confirm newsletter provider or explicitly defer it with a visible stub

### Milestone 5. Quality and launch gate

**Outcome:** the site is approved, performant, accessible, and safe to make live.

Remaining items:
- Lighthouse mobile performance pass
- accessibility pass
- final manual smoke test
- Shane sign-off on key pages
- DNS cutover
- live-domain smoke test

---

## 7. Exact Remaining Scope Ledger

This is the practical "how much is left?" view.

| Bucket | Remaining items | Primary owner | Hard gate? |
|---|---:|---|---|
| Engineering polish | 4 | Claude | No |
| Integrations/env verification | 3 | Claude | Yes |
| Deployment/platform setup | 3 | Shared | Yes |
| Analytics/CI/quality gates | 4 | Claude | No |
| Content and business proof | 5 | Shared | Yes |
| Launch approval and cutover | 3 | Shane / Shared | Yes |
| **Total** | **22** | Mixed | Mixed |

This count is intentionally based on **remaining launch-relevant work items**, not historic tasks already completed.

---

## 8. Mapping Rule Between Artifacts

To keep drift under control:

- `understand-everything/spec.md` defines the intended product.
- `understand-everything/plan.md` remains the historical full-build plan.
- `.planning/ROADMAP.md` defines current execution order.
- this endgame map defines the **remaining launch scope**.

When work completes:

1. update the relevant roadmap task
2. update the endgame map bucket status/counts
3. if the work changes product reality, update `.planning/PROJECT.md`

---

## 9. Success Condition for This Map

This map is doing its job if a future session can answer all three questions quickly:

1. **What is left?**  
   The remaining buckets and item counts are obvious.

2. **What is blocked on humans/platforms?**  
   External gates are clearly separated from coding work.

3. **How close are we to launch?**  
   The project can be discussed in milestones, not vague impressions.

---

## 10. Recommendation

Adopt the hybrid model immediately and use this endgame map as the planning bridge between the existing 4-phase roadmap and the original 18-task build plan.

In practice, that means:

- Phase 1 closes only when env/integration verification is done
- Phases 2-4 should be re-read as milestones toward preview, proof, and launch
- all future planning should report against the **22 remaining launch-relevant items**, not the old total task count

---

*Last updated: 2026-05-25 during end-of-project mapping review*
