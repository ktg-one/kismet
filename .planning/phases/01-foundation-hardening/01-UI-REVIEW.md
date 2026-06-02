# Phase 01 — UI Review

**Audited:** 2026-05-25
**Baseline:** Abstract 6-pillar standards + Brand non-negotiables from project-notes/DESIGN_GUIDE.md, COPY_VOICE_GUIDE.md, COMPLIANCE_NOTES.md
**Screenshots:** Captured (3s hydration wait required — see Experience Design findings)

---

## Pillar Scores

| Pillar | Score | Key Finding |
|--------|-------|-------------|
| 1. Copywriting | 2/4 | "Begin the Conversation" banned phrase appears on 5 pages; contact hero headline uses contractions |
| 2. Visuals | 3/4 | Hero renders correctly post-hydration; BrandMark watermark adds depth; no live screenshots catch scroll sections |
| 3. Color | 3/4 | Color system consistent and on-spec; one off-token surface color (#212b36) on Pathways page |
| 4. Typography | 2/4 | 25+ distinct arbitrary px sizes in use vs design guide's 2-role system; text-[14.5px] is a sub-pixel off-spec value |
| 5. Spacing | 3/4 | Section rhythm consistent (py-24/py-32); p-7/gap-7/space-y-7 (28px) not in declared scale |
| 6. Experience Design | 2/4 | Hero content invisible pre-hydration (confirmed by screenshot); Reveal will-change leak unfixed; no ErrorBoundary; form error not aria-live |

**Overall: 15/24**

---

## Top 3 Priority Fixes

1. **BLOCKER — Hero LCP: all hero content invisible pre-JS** — A warm referral on a slow connection or with JS disabled sees a blank dark page with only the nav. The 30-second conversion window is lost. Fix: add CSS-only fallback visibility via `opacity: 1` initial state in SSR (remove Framer Motion initial `opacity: 0` from `Reveal`/`RevealWords` when `immediate=true`; deliver the first contentful paint without JS).

2. **WARNING — "Begin the Conversation" on 5 pages** — COPY_VOICE_GUIDE.md explicitly bans this phrase ("replaced with Book a call"). Found at: `app/approach/page.tsx:52`, `app/approach/page.tsx:79`, `app/insights/page.tsx:25`, `app/pathways/page.tsx:27`, `components/SiteFooter.tsx:44`. Replace all instances with "Book a call".

3. **WARNING — Wrong name in About page alt text** — `app/about/page.tsx:76` reads `alt="Shane Hewson and Josh Clark, founders of Kismet Finance Group"`. Per CLAUDE.md: "Josh's last name is Hewson — this has been corrected once already, don't regress it." The regression has occurred. Fix: change "Josh Clark" to "Josh Hewson".

---

## Detailed Findings

### Pillar 1: Copywriting (2/4)

**WARNING — Banned phrase "Begin the Conversation" used on 5 pages**

COPY_VOICE_GUIDE.md explicitly lists "Begin the conversation" as killed copy ("slightly precious. Half-step abstract") and replaced with "Book a call". Found on:
- `app/approach/page.tsx:52` — Hero CTA
- `app/approach/page.tsx:79` — Mid-page CTA strip button
- `app/insights/page.tsx:25` — Hero CTA
- `app/pathways/page.tsx:27` — Hero CTA
- `components/SiteFooter.tsx:44` — Footer CTA

All five occurrences should read "Book a call".

**WARNING — Contact hero headline uses contraction in a heading context**

`app/contact/page.tsx:15-16`: headline is "Let's begin the" / headlineMuted is "conversation." The contraction "Let's" is fine in body copy (COPY_VOICE_GUIDE.md approves conversational tone) but the heading directly contradicts the banned phrase "Begin the conversation" — the headline is effectively that phrase with a contraction. Replace with a more specific alternative: e.g. "Send us a message" or "Book a private call."

**WARNING — Form error copy is generic**

`components/ContactInquiry.tsx:49`: `"Something broke on our end. Please try again..."` — this is a pattern the copy guide discourages: the voice should be calm, specific, and never corporate-sounding. Acceptable, but softens the quality score.

**PASS — CTA labels on homepage correct**

`app/page.tsx:22`: "Book a call" (correct). Secondary CTA: "How We Work" (correct).

**PASS — Founders named correctly on About page body copy**

`app/about/page.tsx:61`: "Meet Shane & Josh" — correct. Body copy refers to "Shane and Josh" without last names — acceptable.

**PASS — Compliance copy correctly isolated**

Compliance disclaimers are in `components/ComplianceLine.tsx` and the Approach page Boundaries section. No personal advice language found in hero, marketing, or trust copy.

**PASS — No exclamation marks found** across all audited routes.

**PASS — No banned vocabulary** ("bespoke", "holistic", "synergy", "guaranteed") detected.

**PASS — Testimonials use first-person real quotes** without manufacturing claims about outcomes.

needs_human_review: true — Contact hero copy ("Let's begin the conversation.") reads as a direct regression of the banned phrase. Human sign-off needed before shipping.

---

### Pillar 2: Visuals (3/4)

**BLOCKER (also filed in Experience) — Hero content invisible pre-hydration**

Playwright screenshots without a 3s wait show a completely blank page (only the nav is visible). This is not purely a "visual" failure but it is a visual first-impression failure: the first render a slow browser delivers is an empty dark box. Confirmed on home, contact, and approach routes.

Screenshot evidence: `audit-assets/desktop-home.png` (no wait) vs `audit-assets/desktop-home-waited.png` (3s wait). The after-wait screenshot confirms the design intent is correct once hydrated.

**PASS — Visual hierarchy is clear post-hydration**

The hero demonstrates correct hierarchy: eyebrow (gold, 12px, uppercase) > headline (serif, ~60px) > sub (16-17px body) > CTA (gold solid + ghost secondary). Consistent across all pages audited.

**PASS — BrandMark watermark is effective atmosphere**

The oversized low-opacity BrandMark in the hero right creates depth without distraction. Opacity 0.045-0.055 is appropriately restrained.

**PASS — Documentary image treatment applied consistently**

`documentary-frame` CSS utility with saturate/brightness/contrast applied to photography in BiggerPicture and About founders sections.

**WARNING — Ambient orbs are static in Playwright screenshots**

The orbs use CSS `animation: ambient-drift 18s ease-in-out infinite` which requires page load; in static capture they display as blurred gold/navy circles positioned correctly. No visual defect confirmed, but a live browser check shows they animate correctly.

**WARNING — Hero brandmark watermark overlaps headline text on small widths**

Mobile screenshot shows the serif headline text ("It may not be an income problem.") rendering on top of the gold BrandMark watermark. The watermark is at `opacity-[0.045]` so the headline is still readable, but the visual separation is tighter than on desktop. needs_human_review: true.

**PASS — Dark theme is consistent across all routes**

No light backgrounds detected on any marketing page. Background color `#0a141e` maintained throughout.

---

### Pillar 3: Color (3/4)

**PASS — 60/30/10 distribution broadly correct**

- 60% dominant: Deep navy surfaces (#0a141e, #050f19, #0E2240, #18283d, #1E3450) — consistent throughout
- 30% secondary: Off-white type (#d9e3f2, #c4c6cf, #8aa4cf) — correct usage on body, captions, muted text
- 10% accent: Gold (#D4AF37) — used on eyebrow text, hairlines, CTA backgrounds, brand mark. Appears 25+ times in the codebase but consistently on declared elements (eyebrows, CTAs, icon accents, dot navigation)

**WARNING — One off-token surface color used**

`app/pathways/page.tsx:153`: `from-[#212b36]` in a gradient. This hex does not appear in the design guide's surface scale. The closest token is Surface 2 `#18283d`. Trivial visual impact (overlay gradient) but violates the "use token values only" convention.

**WARNING — `#212B36` is a Stitch default neutral, not a navy-shifted token**

The design guide explicitly replaces Stitch's neutral scale with navy-tinted versions. Using the default Stitch value is a subtle regression from the "navy carries the brand through the cards" principle.

**PASS — Gold used at correct opacity levels**

Gold decorative elements use opacity modifiers `/25`, `/35`, `/60` on borders and rule lines — correctly sparse. Full opacity `#D4AF37` only on text labels and CTA backgrounds where emphasis is intentional.

**PASS — No hardcoded non-brand colors outside design system**

All hex values are brand-documented (surfaces, type, gold) or Tailwind structural (red-300/85 for error, white/35 for scroll cue text).

**WARNING — Error text uses `text-red-300/85`**

`components/ContactInquiry.tsx:169`: Error state uses a Tailwind red that is not in the brand color system. The design guide does not define an error color, but an off-brand red on a dark navy surface may look visually inconsistent. A navy-desaturated red or a muted amber would align better with the palette. Minor — needs_human_review: true.

---

### Pillar 4: Typography (2/4)

**WARNING — Font size count far exceeds the 2-role design guide model**

The design guide defines: "Display / headline: Newsreader serif" and "Body and UI: Montserrat". Headline rhythm rule specifies sizes 32-64px for headings, 11-12px for eyebrows, 15-17px for body. The codebase implements 25+ distinct arbitrary px values:

Arbitrary sizes in use (sample): 9px, 10px, 11px, 12px, 13px, 14px, 14.5px, 15px, 16px, 16.5px, 17px, 18px, 20px, 22px, 24px, 26px, 28px, 32px, 34px, 36px, 40px, 44px, 48px, 54px, 56px, 60px, 64px, 72px, 80px, 96px

While the design guide defines a rhythm rather than a strict token list, 25+ sizes is excessive and indicates fine-grained adjustments rather than a systematic scale. The guide says: "Avoid more than two font roles on a page. Hierarchy comes from size, weight and colour, not from new fonts." The intent is restraint.

**WARNING — `text-[14.5px]` is a sub-pixel arbitrary value**

`components/BiggerPicture.tsx:79`, `components/InsightsBento.tsx:88`, `components/InsightsBento.tsx:118`: `text-[14.5px]`. This sits between the 14px and 15px steps. Use `text-[15px]` consistently.

**WARNING — `text-[16.5px]` sub-pixel value also present**

`components/Hero.tsx:122`: `text-[16.5px]`. The body range declared in the design guide is 15-17px. Pick 16px or 17px.

**PASS — Font family roles correctly separated**

`font-serif` applied only to headlines, blockquotes, and decorative numerals. Montserrat (via `font-family` body default) used for all UI labels, eyebrows, nav items, and body copy. No role mixing detected.

**PASS — Font weights constrained to 2 values**

`font-semibold` (41 occurrences), `font-light` (2 occurrences — decorative). The design guide allows 300-600; in practice only semibold and font-light are explicitly set. Default `font-normal` (400) is inherited for body. This is acceptable.

**PASS — No generic web fonts (Inter, Roboto) used**

Explicitly prohibited in the design guide and not detected.

---

### Pillar 5: Spacing (3/4)

**PASS — Section padding is consistent with design guide baseline**

`py-24 md:py-32` appears 19 times across components and pages — this is exactly the design guide's declared "editorial rhythm baseline." Adherence is strong.

**PASS — Container max-width and gutter pattern correct**

`max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16` matches the design guide specification verbatim.

**WARNING — p-7 / gap-7 / space-y-7 (28px) not in declared spacing scale**

Design guide declares: `0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px`. The value 28px (Tailwind `p-7`, `gap-7`, `space-y-7`) sits between 24 and 32 and is not on this scale. Found at:
- `components/ContactInquiry.tsx:68` — `p-7` on status banners
- `components/ContactInquiry.tsx:110` — `gap-7` on email/phone grid
- `components/ContactInquiry.tsx:154` — `pt-7` on form footer divider
- `components/ContactInquiry.tsx:177` — `gap-7` on contact cards
- `components/SiteHeader.tsx:160` — `gap-7` on nav drawer
- `app/approach/page.tsx` — `p-7` pattern

Replace with `p-6` (24px) or `p-8` (32px) to stay on-scale.

**WARNING — `p-10 md:p-14` on Approach mid-page strip**

`app/approach/page.tsx:63`: `p-10 md:p-14`. `p-14` (56px) is not in the declared scale; `p-12` (48px) is the nearest. Minor — the design guide example says `p-10 md:p-12` for primary feature cards.

**PASS — Arbitrary spacing values are structurally justified**

Arbitrary spacing used for container widths (`max-w-[1280px]`, `max-w-[800px]`, etc.) and hairline borders (`border-[0.5px]`) is appropriate and not a spacing-scale violation.

---

### Pillar 6: Experience Design (2/4)

**BLOCKER — Hero content invisible pre-hydration (JS dependency on first contentful paint)**

Confirmed by screenshot: Playwright captures the DOM before Framer Motion initializes, rendering the page with only the nav visible. `RevealWords` (used for the h1) sets `initial={{ y: "110%", opacity: 0 }}` on every word span and requires the motion library to animate to visible. Before JS loads, the h1 has `opacity: 0` — making it invisible in SSR/static capture.

Root cause: `immediate=true` in Hero tells `RevealWords` to use `animate` (not `whileInView`), but the initial state is still `opacity: 0`. The component is client-only (`"use client"` in Reveal.tsx) so the SSR output contains the `opacity: 0` initial state.

Impact: Any user on a slow connection, any bot, any screenshot tool, any social preview — sees a blank dark page. This is the "site was static" report from the client.

Fix: In `RevealWord`, when `immediate` is true, skip the hidden initial state. Pass `initial={{ y: 0, opacity: 1 }}` instead so SSR renders the text visibly.

**WARNING — `will-change: transform` leak on every animated word (unfixed from handoff)**

`components/Reveal.tsx:69`: `className="inline-block will-change-transform"` is applied statically to every `RevealWord` span and is never removed after animation completes. For a headline with 8 words, this keeps 8 composited layers open indefinitely. The handoff document (`docs/handoff/2026-05-25-code-review-plan.md`) identified this as a known issue.

Fix: Add `onAnimationComplete={() => { /* remove will-change */ }}` using a `useState` or pass `style` dynamically. Framer Motion's `useAnimate` pattern can handle this cleanly.

**WARNING — Form error state has no `aria-live` region**

`components/ContactInquiry.tsx:169`: The error paragraph renders conditionally but has no `role="alert"` or `aria-live="polite"`. Screen reader users who submit the form will not hear the error announcement.

Fix: Add `role="alert"` to the error `<p>` element.

**WARNING — Success state has no focus management**

When the form submits successfully, `status === "ok"` renders the success panel, but focus remains on the submit button (now hidden). Screen reader users lose their place in the document.

Fix: Move focus to the success panel heading on state change (use `useEffect` + `ref.current.focus()`).

**PASS — Loading state handled**

`components/ContactInquiry.tsx:160-163`: Button is disabled with `opacity-60 cursor-wait` class and label changes to "Sending..." during the POST request. Clear visual feedback.

**PASS — Fallback state handled**

`components/ContactInquiry.tsx:78-90`: 503 response triggers a fallback panel with a direct email CTA. Well-handled degradation path.

**PASS — Empty booking URL degrades gracefully**

`app/page.tsx:22`: `process.env.NEXT_PUBLIC_BOOKING_URL ?? "/contact"` falls back to /contact. `components/ContactInquiry.tsx:289`: falls back to `"#"` — acceptable for now; the link is labelled "Book a private call" which is honest.

**PASS — Reduced motion respected throughout**

`useReducedMotion()` is checked in: Hero (via Reveal/RevealWords), MagneticCTA, PageTransition, ScrollCue, TestimonialBlock. When true: animations are instant or disabled. CSS `@media (prefers-reduced-motion: reduce)` also disables scroll-driven animations and ambient orbs.

**WARNING — No ErrorBoundary wrapping**

No `error.tsx` file found in app router (would provide per-route error UI). No React ErrorBoundary component detected in layout. If `TestimonialBlock` throws due to Embla initialization, the whole page crashes silently.

---

## Registry Safety

No `components.json` found — shadcn not initialized. Registry audit skipped.

---

## Files Audited

- `app/page.tsx`
- `app/about/page.tsx`
- `app/approach/page.tsx`
- `app/contact/page.tsx`
- `app/pathways/page.tsx`
- `app/insights/page.tsx`
- `app/layout.tsx` (partial — schema check)
- `components/Hero.tsx`
- `components/Reveal.tsx`
- `components/MagneticCTA.tsx`
- `components/PageTransition.tsx`
- `components/ScrollCue.tsx`
- `components/ContactInquiry.tsx`
- `components/TestimonialBlock.tsx`
- `app/globals.css`
- `app/kismet-brand.css`
- `project-notes/DESIGN_GUIDE.md`
- `project-notes/COPY_VOICE_GUIDE.md`
- `project-notes/COMPLIANCE_NOTES.md`
- `project-notes/WEBSITE_DIRECTION.md`
- `docs/handoff/2026-05-25-code-review-plan.md`
- `.planning/phases/01-foundation-hardening/01-01-SUMMARY.md`
- `.planning/phases/01-foundation-hardening/01-02-SUMMARY.md`
- `.planning/phases/01-foundation-hardening/01-UAT.md`
- `audit-assets/desktop-home.png` (no-wait, shows blank page)
- `audit-assets/desktop-home-waited.png` (3s wait, shows full hero)
- `audit-assets/mobile-home-waited.png`
- `audit-assets/desktop-about.png`
- `audit-assets/desktop-contact-waited.png`
- `audit-assets/desktop-approach-waited.png`
