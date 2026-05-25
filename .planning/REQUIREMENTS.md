# Requirements: Kismet-site

## 1. Functional Requirements

### F1. Lead Generation Pipeline
- [x] POST handler in `app/api/lead/route.ts`.
- [x] Zod validation for name, email, phone, message.
- [x] Honeypot field to block spam.
- [x] IP-based rate limiting (5 leads / 15 mins).
- [x] Email notification to Shane via Resend.
- [x] Log entry to Google Sheet via Service Account.

### F2. Insights Section
- [x] Markdown-based article loading.
- [x] Index page listing all articles.
- [x] Dynamic routing for article pages.
- [x] Frontmatter validation (Zod).
- [x] Path-safety (no traversal).

### F3. Newsletter Signup
- [ ] Functional stub in footer.
- [ ] Configure action URL when provider is selected.

### F4. Contact & Booking
- [x] Contact form component.
- [x] Booking widget embed (Calendly).

## 2. Technical Requirements

### T1. Animations & Interactivity
- [ ] **Upgrade Animations:** Review and enhance `motion` (Framer Motion v12) usage across all components.
- [ ] **Fix Hydration Issues:** Ensure Hero headline animates correctly after hydration (no LCP delay).
- [x] **Performance:** Ensure `will-change` properties are dropped after animation.
- [ ] **Smooth Transitions:** Implement or refine page-level transitions.

### T2. Deployment
- [ ] Initialize Vercel project.
- [ ] Configure Environment Variables (Resend, Sheets, GA4).
- [ ] Trigger first successful deployment.
- [ ] (Future) DNS cutover for `kismetfinancegroup.com.au`.

### T3. AI Preparation
- [x] Initialize `.planning/` directory with GSD state.
- [x] Populate `understand-everything/` with spec and plan.
- [ ] Ensure `CLAUDE.md` and `GEMINI.md` (if used) have current context.
- [ ] Document symbol-search and memory-recall patterns for subagents.

## 3. Compliance & Standards

### C1. "Shane Rules"
- [x] Remove all em-dashes and en-dashes from source.
- [ ] Implement CI gate to prevent regression.
- [x] Sanitize About page for "Shane Voice" (human/Australian).

### C2. Regulatory
- [x] Compliance footer on every page.
- [x] "Introducer, not advisor" disclaimer.
