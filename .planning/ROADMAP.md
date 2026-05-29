# Roadmap: Kismet-site

## Phase 1: Foundation & Hardening (Complete)
*Hardening the existing codebase and finalizing initial integrations.*

- [x] Task 1.1: Initialize .planning and GSD workflow.
- [x] Task 1.2: Implement API Security (Honeypot, Rate Limiting).
- [x] Task 1.3: Fix React 19 hook violations in carousel.
- [x] Task 1.4: Sanitize Shane Voice on About page.
- [x] Task 1.5: Finalize Resend & Google Sheets helpers (verify ENV usage).
  - **Plans:** 2 plans
  - [x] 01-01-PLAN.md -- Env contract: create lib/env.ts, wire lib/email.ts + lib/sheets.ts, annotate .env.example
  - [x] 01-02-PLAN.md -- Smoke script: create scripts/smoke-lead.mjs, close external gates checkpoint

## Phase 2: Animations & Interactivity Upgrade (Current)
*Enhancing the visual experience with Motion v12.*

**Execution priority (lowest to highest complexity):**
1. Reveal and RevealWords audit.
2. Card hover and reveal polish.
3. Magnetic CTA refinement.
4. Page-level transition refinement.
5. GSAP scroll or timeline final pass.

**Orchestration:** Explore and implement animation lanes in separate worktrees or branches, then merge sequentially in the priority order above. Do not introduce new GSAP work until the final lane.

- [x] Task 2.1: Audit all `Reveal` and `RevealWords` components.
- [x] Task 2.2: Fix Hero headline hydration delay. (Fixed: added `immediate` prop to `Reveal` components)
- [ ] Task 2.3: Implement smooth page-level transitions.
- [ ] Task 2.4: Add magnetic CTA effects to primary buttons.
- [ ] Task 2.5: Polish card hover and reveal animations as a separate lane.
- [ ] Task 2.6: Audit existing GSAP scroll effects and reserve any new GSAP work for the final pass.
  - **Plans:** 1/5 plans executed
  - [x] 02-01-PLAN.md -- Reveal and RevealWords audit on `anim/reveal-audit`
  - [x] 02-02-PLAN.md -- Card hover and reveal polish on `anim/card-polish`
  - [ ] 02-03-PLAN.md -- Magnetic CTA refinement on `anim/magnetic-ctas`
  - [ ] 02-04-PLAN.md -- Page transition refinement on `anim/page-transitions`
  - [ ] 02-05-PLAN.md -- GSAP final pass on `anim/gsap-final-pass`

## Phase 3: Deployment & Analytics
*Shipping the site to Vercel and setting up tracking.*

- [ ] Task 3.1: Initialize Vercel project and link repo.
- [ ] Task 3.2: Configure Environment Variables in Vercel.
- [ ] Task 3.3: Set up Google Analytics 4 (GA4) with environment gating.
- [ ] Task 3.4: Perform first production build and preview deploy.

## Phase 4: AI Preparation & Final Audit
*Optimizing for future collaboration and site quality.*

- [ ] Task 4.1: Automate em-dash grep CI gate.
- [ ] Task 4.2: Update `.understand-anything` knowledge graph.
- [ ] Task 4.3: Final Lighthouse performance & a11y pass.
- [ ] Task 4.4: Document AI collaboration guidelines in CLAUDE.md.
