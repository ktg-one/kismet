<!-- refreshed: 2026-06-03 -->
# Architecture

**Analysis Date:** 2026-06-03

## System Overview

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│                         Browser (Client)                                     │
│  SmoothScroll (Lenis root)  →  LenisGsapBridge  →  gsap.ticker              │
│  `components/SmoothScroll.tsx`                                               │
│                                                                              │
│  ┌──────────────┐  ┌────────────────┐  ┌────────────┐  ┌──────────────────┐ │
│  │  SiteHeader  │  │ PageTransition │  │  <main>    │  │   SiteFooter     │ │
│  │  (client SC) │  │ (Framer/motion)│  │  (pages)   │  │   (server SC)    │ │
│  └──────────────┘  └────────────────┘  └────────────┘  └──────────────────┘ │
│                                             │                                │
│                             ┌───────────────┴──────────────────┐             │
│                             │   Page Server Components          │             │
│                             │  app/page.tsx, about/, approach/, │             │
│                             │  contact/, pathways/, insights/   │             │
│                             └──────────────────────────────────┘             │
└──────────────────────────────────────────────────────────────────────────────┘
         │ fetch /api/lead                        │ fs read
         ▼                                        ▼
┌─────────────────────┐              ┌────────────────────────────┐
│  API Route (server) │              │  lib/articles.ts (server)  │
│  app/api/lead/      │              │  content/insights/*.md     │
│  route.ts           │              └────────────────────────────┘
└─────────────────────┘
         │
  ┌──────┴───────┐
  │              │
  ▼              ▼
Resend        Google Sheets
(email)       (googleapis)
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| `SmoothScroll` | Lenis root + GSAP bridge (single RAF source) | `components/SmoothScroll.tsx` |
| `LenisGsapBridge` | Hooks Lenis RAF into gsap.ticker; refreshes ScrollTrigger on font load + resize | `components/SmoothScroll.tsx` |
| `PageTransition` | AnimatePresence route-level cinematic dissolve | `components/PageTransition.tsx` |
| `SiteHeader` | Sticky nav, mobile fullscreen overlay, scroll-state backdrop blur | `components/SiteHeader.tsx` |
| `SiteFooter` | Footer links, compliance text | `components/SiteFooter.tsx` |
| `Hero` | Full-screen hero with GSAP parallax watermark, optional bg image | `components/Hero.tsx` |
| `Reveal` | Framer Motion viewport/mount reveal for inline elements | `components/Reveal.tsx` |
| `RevealWords` | Word-by-word stagger headline reveal (Framer Motion) | `components/Reveal.tsx` |
| `ScrollReveal` | GSAP scrub reveal for cards/photos; scroll-coupled (not one-shot) | `components/ScrollReveal.tsx` |
| `ScrollParallax` | GSAP parallax layer wrapper | `components/ScrollParallax.tsx` |
| `MagneticCTA` | Framer Motion spring magnetic pull on hover, disabled on touch | `components/MagneticCTA.tsx` |
| `HeroAmbient` | CSS ambient orbs with cursor drift (fine-pointer only) | `components/HeroAmbient.tsx` |
| `ScrollCue` | Animated scroll indicator on hero | `components/ScrollCue.tsx` |
| `GrainOverlay` | Fixed film grain texture over entire viewport | `components/GrainOverlay.tsx` |
| `CustomCursor` | Custom cursor replacement for fine-pointer devices | `components/CustomCursor.tsx` |
| `ChatWidget` | Floating AI chat widget | `components/ChatWidget.tsx` |
| `ContactInquiry` | Contact form — POSTs to `/api/lead`, handles status states | `components/ContactInquiry.tsx` |
| `ArticleLayout` | Server-rendered Markdown article template | `components/ArticleLayout.tsx` |
| `InsightsBento` | Bento grid layout for article listing | `components/InsightsBento.tsx` |
| `BiggerPicture` | Homepage 2-col section with bullets | `components/BiggerPicture.tsx` |
| `StrategicPathways` | Card grid with hub card (bento layout) | `components/StrategicPathways.tsx` |
| `TeamPortraits` | Founder photo pair section | `components/TeamPortraits.tsx` |
| `TestimonialBlock` | Embla carousel testimonials | `components/TestimonialBlock.tsx` |
| `ThreeStep` | Numbered 3-step process cards | `components/ThreeStep.tsx` |
| `ComplianceLine` | Compliance disclaimer text (server, no motion) | `components/ComplianceLine.tsx` |
| `BrandMark` | SVG brand mark (tree-of-life icon) | `components/BrandMark.tsx` |
| `BrandWordmark` | SVG KISMET wordmark | `components/BrandWordmark.tsx` |
| `Icons` | Named SVG icon exports | `components/Icons.tsx` |
| `Socials` | Social icon row | `components/Socials.tsx`, `components/social-links.tsx` |

## Pattern Overview

**Overall:** Next.js App Router — Server Components by default, `"use client"` added only for motion and interactivity. Flat component directory, no subdirectory grouping.

**Key Characteristics:**
- Pages are Server Components composing client components for motion/interaction
- Motion split: Framer Motion (`motion/react`) for mount/viewport reveals and page transitions; GSAP + ScrollTrigger for all scroll-driven sequences
- Single shared scroll source: Lenis RAF bridged into `gsap.ticker` in `SmoothScroll.tsx` — all GSAP ScrollTrigger work rides this; no competing RAF
- API surface is one route: `app/api/lead/route.ts`
- Content (articles) is filesystem Markdown, no CMS or database

## Layers

**Shell (app/layout.tsx):**
- Purpose: HTML document wrapper, global metadata, JSON-LD, font loading, shell components
- Location: `app/layout.tsx`
- Contains: `SmoothScroll`, `GrainOverlay`, `SiteHeader`, `PageTransition`, `SiteFooter`, `CustomCursor`, `ChatWidget`
- Depends on: `components/*`, `app/globals.css`
- Used by: All routes (wraps every page via Next.js App Router)

**Routes / Page Server Components:**
- Purpose: Per-page composition, SEO metadata export, server-side data fetching
- Location: `app/page.tsx`, `app/about/page.tsx`, `app/approach/page.tsx`, `app/contact/page.tsx`, `app/pathways/page.tsx`, `app/insights/page.tsx`, `app/insights/[slug]/page.tsx`
- Contains: Page composition using imported components; `export const metadata` or `generateMetadata`
- Depends on: `components/*`, `lib/articles` (insights only)
- Used by: Next.js App Router file-system routing

**UI Components:**
- Purpose: Page sections and shared primitives
- Location: `components/`
- Contains: All PascalCase `.tsx` components; mixed server/client (client components declare `"use client"`)
- Depends on: `motion/react`, `gsap`, `lenis/react`, `next/image`, `next/link`
- Used by: Page Server Components and other components

**API Route:**
- Purpose: Lead capture pipeline — rate limit, validate, fan-out to email + sheets
- Location: `app/api/lead/route.ts`
- Contains: In-memory IP rate limiter, Zod schema validation, `Promise.allSettled` dual-sink
- Depends on: `lib/email`, `lib/sheets`, `lib/env`
- Used by: `components/ContactInquiry.tsx` (client fetch to `/api/lead`)

**Server Utilities (lib/):**
- Purpose: Server-only helpers; never imported by client components
- Location: `lib/`
- Contains:
  - `lib/articles.ts` — Markdown file reading, gray-matter parse, Zod frontmatter validation, remark HTML render
  - `lib/email.ts` — Resend transactional email
  - `lib/sheets.ts` — Google Sheets append via googleapis
  - `lib/env.ts` — Lazy env var resolution (marked `server-only`, throws at request time if missing)
  - `lib/chat.ts` — AI chat handler
- Depends on: `server-only`, `gray-matter`, `remark`, `resend`, `googleapis`, `zod`
- Used by: `app/api/lead/route.ts`, `app/insights/[slug]/page.tsx`, `app/insights/page.tsx`

**Content:**
- Purpose: Markdown articles with YAML frontmatter
- Location: `content/insights/*.md`
- Contains: Articles with `title`, `summary`, `date`, `readMinutes` frontmatter validated by Zod
- Used by: `lib/articles.ts` → insight pages

**SEO:**
- Purpose: Code-generated sitemap and robots
- Location: `app/sitemap.ts`, `app/robots.ts`
- Note: New routes must be manually added to `app/sitemap.ts` — no auto-discovery

## Data Flow

### Contact Form Lead Pipeline

1. User submits `ContactInquiry` form (`components/ContactInquiry.tsx`)
2. Client POSTs JSON to `/api/lead` (`app/api/lead/route.ts`)
3. Route: IP rate check (in-memory Map, 5 req / 15 min) → honeypot reject → Zod parse
4. `Promise.allSettled([sendLeadEmail(data), appendLeadRow({...data, submittedAt})])`
5. Succeeds if either sink fulfils; 503 only if both fail due to missing env

### Article Rendering

1. `app/insights/[slug]/page.tsx` calls `getArticle(slug)` from `lib/articles.ts`
2. `lib/articles.ts` reads `content/insights/{slug}.md`, parses frontmatter with gray-matter + Zod, renders body with remark
3. Returns `Article` object (`slug`, `title`, `summary`, `date`, `readMinutes`, `html`)
4. `ArticleLayout` component renders the HTML string via `dangerouslySetInnerHTML`
5. `generateStaticParams` calls `listArticles()` so all slugs are statically generated at build

### Scroll Animation

1. `SmoothScroll` mounts `ReactLenis` root with `autoRaf: false`
2. `LenisGsapBridge` hooks `lenis.raf` into `gsap.ticker.add` — Lenis drives GSAP's tick
3. `ScrollReveal` / `Hero` GSAP animations use `ScrollTrigger` — reads smoothed scroll via the bridge
4. `document.fonts.ready` + `resize` events call `ScrollTrigger.refresh()` to recompute trigger positions after webfont load

### Page Navigation

1. Next.js Link triggers client-side navigation
2. `PageTransition` (`AnimatePresence mode="wait"`) exits old page (0.32s dissolve up)
3. New page enters (0.85s dissolve down with `--ease-cinema` cubic)
4. GSAP `ScrollTrigger.refresh()` fires on resize to re-synchronise after layout shift

## Key Abstractions

**Reveal (mount/viewport):**
- Purpose: One-shot reveal for inline elements on mount or first viewport entry
- Examples: `components/Reveal.tsx` — `Reveal` (block fade-up), `RevealWords` (word-by-word stagger)
- Pattern: Framer Motion `whileInView` / `animate` controlled by `immediate` prop
- Use when: Hero text, eyebrow labels, paragraph content, any element that should play once and stay

**ScrollReveal (scroll-coupled):**
- Purpose: Scroll-position-driven reveal for cards and photos — scrubs 1:1 with scroll position
- Examples: `components/ScrollReveal.tsx`
- Pattern: GSAP `fromTo` with `scrub: 1`, `invalidateOnRefresh: true`, `matchMedia` breakpoint split
- Use when: Card wrappers, photo tiles, anything that should un-resolve on scroll back

**MagneticCTA:**
- Purpose: Premium hover micro-interaction — spring pull toward cursor
- Examples: `components/MagneticCTA.tsx`
- Pattern: Framer Motion `useMotionValue` + `useSpring`, 6px max travel, disabled on coarse pointer

**Server-only utilities:**
- Purpose: Prevent accidental client import of secret-dependent modules
- Examples: `lib/env.ts` (imports `server-only`), `lib/email.ts`, `lib/sheets.ts`
- Pattern: `import "server-only"` at file top; throws if imported in a client bundle

## Entry Points

**Root Layout:**
- Location: `app/layout.tsx`
- Triggers: Every page render
- Responsibilities: HTML shell, font loading, metadata, JSON-LD, shell components

**Homepage:**
- Location: `app/page.tsx`
- Triggers: `/` route
- Responsibilities: Compose Hero, BiggerPicture, StrategicPathways, TeamPortraits, TestimonialBlock

**Lead API:**
- Location: `app/api/lead/route.ts`
- Triggers: `POST /api/lead` from ContactInquiry
- Responsibilities: Rate limit, validate, fan-out to Resend + Google Sheets

**Article Dynamic Route:**
- Location: `app/insights/[slug]/page.tsx`
- Triggers: `/insights/:slug`
- Responsibilities: Static generation via `generateStaticParams`, per-article metadata, article render

**SEO Generation:**
- Location: `app/sitemap.ts`, `app/robots.ts`
- Triggers: Build time / `GET /sitemap.xml`, `GET /robots.txt`

## Architectural Constraints

- **Threading:** Single-threaded client; Lenis + GSAP share one RAF loop via `gsap.ticker`. Never add a second `ReactLenis` or competing `requestAnimationFrame` loop.
- **Global state:** No global React state (no Context, no Zustand). `ipCache` in `app/api/lead/route.ts` is a module-level Map — resets on serverless cold start.
- **Server boundary:** `lib/email.ts`, `lib/sheets.ts`, `lib/env.ts` are server-only. `lib/chat.ts` is server-only. Never import into client components.
- **Circular imports:** None detected.
- **Motion library lock:** Only `motion/react` (Framer Motion v12), `gsap` + `@gsap/react`, and `lenis/react`. Do not introduce a fourth motion library.
- **ScrollTrigger + Lenis:** All GSAP ScrollTrigger work must ride the Lenis bridge. Do not call `ScrollTrigger.refresh()` inside a `useGSAP` — call it in the `LenisGsapBridge` resize handler or at module level after font load.
- **Env vars:** Build succeeds without secrets. All six lead-pipeline vars are read lazily at request time via `lib/env.ts`.

## Anti-Patterns

### Competing RAF / Lenis re-init

**What happens:** Mounting a second `ReactLenis` root or calling `new Lenis()` anywhere else.
**Why it's wrong:** Two scroll loops produce conflicting `ScrollTrigger` positions — animations fire at wrong scroll offsets.
**Do this instead:** Use `useLenis()` inside the existing `SmoothScroll` tree to read Lenis state; never mount a second root.

### Importing server-only lib in client components

**What happens:** Importing `lib/email`, `lib/sheets`, or `lib/env` from a `"use client"` file.
**Why it's wrong:** Secrets leak into the client bundle; `server-only` throws a build-time error.
**Do this instead:** All secret-dependent logic stays in `app/api/` routes or Server Components.

### One-shot Framer reveal on scroll-coupled elements

**What happens:** Wrapping cards or photos in `Reveal` (Framer) instead of `ScrollReveal` (GSAP scrub).
**Why it's wrong:** Framer `whileInView` fires once and plays a fixed tween — it does not un-resolve on scroll up, breaking the "scroll IS the animation" contract for cards.
**Do this instead:** Use `ScrollReveal` for card/photo wrappers; use `Reveal` only for text and inline elements that should fire once.

### Adding new routes without updating sitemap

**What happens:** Adding a new `app/newpage/page.tsx` without a corresponding entry in `app/sitemap.ts`.
**Why it's wrong:** The route is invisible to search engines.
**Do this instead:** Add the URL to the `sitemap()` array in `app/sitemap.ts`.

## Error Handling

**Strategy:** Errors surfaced to users via UI state (ContactInquiry status machine: `idle | loading | ok | error | fallback`). Server errors logged to console. API route uses structured JSON error codes.

**Patterns:**
- Lead route: `try/catch` around `req.json()`, Zod `safeParse`, `Promise.allSettled` for dual-sink resilience
- Articles: `try/catch` in `getArticle` returns `null` → `notFound()` in page
- Env: `requireEnv` throws with descriptive message at request time if var missing

## Cross-Cutting Concerns

**Logging:** `console.warn` / `console.error` in `app/api/lead/route.ts` for sink failures. No structured logging framework.
**Validation:** Zod at two boundaries — API route body (`Schema` in `route.ts`) and article frontmatter (`MetaSchema` in `lib/articles.ts`).
**Authentication:** None — public marketing site.
**Typography:** Berlingske Serif via `@font-face` in `app/globals.css`; Montserrat via `next/font/google`. Never substitute another serif.
**SEO:** Per-page `export const metadata` or `generateMetadata` in each `page.tsx`; root metadata + JSON-LD in `app/layout.tsx`.

---

*Architecture analysis: 2026-06-03*
