# Coding Conventions

**Analysis Date:** 2026-06-03

## Naming Patterns

**Files:**
- PascalCase for components: `Hero.tsx`, `SiteHeader.tsx`, `MagneticCTA.tsx`
- camelCase for lib utilities: `articles.ts`, `email.ts`, `sheets.ts`, `env.ts`
- kebab-case for CSS files: `globals.css`, `kismet-brand.css`
- PascalCase for route-level files is NOT used — Next App Router dirs use lowercase (`about/`, `approach/`, `contact/`)

**Functions / Exports:**
- Named exports only — no default exports on components (e.g., `export function Hero(...)`, `export function Reveal(...)`)
- Exception: Next.js page files use `export default function Home()` / `export default function RootLayout()`
- Utility functions in `lib/` are named exports with descriptive verb prefixes: `sendLeadEmail`, `appendLeadRow`, `listArticles`, `getArticle`
- Internal helper functions (not exported) use camelCase: `readArticleFile`, `requireEnv`, `buildParallax`

**Variables / Constants:**
- SCREAMING_SNAKE_CASE for module-level constants: `RATE_LIMIT_WINDOW`, `MAX_REQUESTS`, `MAX_TRAVEL`, `SHOW_SCROLL_MARKERS`, `SITE_URL`, `SITE_NAME`
- camelCase for local variables and state: `coarsePointer`, `scrolled`, `ipCache`
- Descriptive abbreviations acceptable: `mm` for `matchMedia`, `el` for element, `mq` for MediaQueryList

**Types / Interfaces:**
- PascalCase: `HeroProps`, `RevealProps`, `LeadEmailInput`, `ArticleMeta`, `Article`, `LeadRow`
- `interface` preferred over `type` for props and data shapes
- `type` used for union types: `type Status = "idle" | "loading" | "ok" | "error" | "fallback"`
- Props interfaces co-located immediately before the component in the same file

**CSS Classes:**
- Utility-first Tailwind — raw utilities in JSX, no separate class composition layers
- Named CSS classes use kebab-case with `kismet-` prefix for brand utilities: `kismet-surface-elevated`, `kismet-input`, `kismet-input-label`
- Animation/atmosphere classes use kebab-case with descriptive names: `hero-atmosphere`, `ambient-orb`, `smoke-gradient`, `card-lift-hover`
- GSAP targets use kebab-case selectors: `.hero-watermark`, `.hero-bg-image`

## Code Style

**Formatting:**
- No Prettier config detected — formatting enforced only by ESLint
- ESLint: `eslint-config-next/core-web-vitals` via `eslint.config.mjs`
- Imports use double quotes consistently
- Trailing commas in objects and arrays
- Semicolons present throughout

**Linting:**
- `eslint-config-next` (core-web-vitals preset) — config at `eslint.config.mjs`
- `scripts/` excluded from lint: `globalIgnores(["scripts/**"])`
- Lint runs automatically as a postbuild hook: `"postbuild": "npm run lint"`
- `npm run lint:fix` available for auto-fixable violations
- `npm run type-check` runs `tsc --noEmit` — strict mode enabled in `tsconfig.json`

## Import Organization

**Order (observed pattern):**
1. React/Next built-ins: `"use client"` directive first if needed, then `import type { Metadata } from "next"`, `import { useRef } from "react"`
2. Next.js imports: `import Image from "next/image"`, `import Link from "next/link"`
3. Third-party libraries: `gsap`, `motion/react`, `lenis/react`
4. Internal components with `@/` alias: `import { Reveal } from "./Reveal"` (relative for same-dir), `import { SiteHeader } from "@/components/SiteHeader"` (alias for cross-dir)
5. `import type` for type-only imports: `import type { ReactNode } from "react"`

**Path Aliases:**
- `@/*` resolves to repo root (`tsconfig.json` paths)
- Same-directory imports use relative paths (`./Reveal`, `./MagneticCTA`)
- Cross-directory always uses `@/`: `@/lib/articles`, `@/components/SiteHeader`

## Client / Server Boundary

**Server-only modules:**
- `lib/email.ts`, `lib/sheets.ts`, `lib/env.ts` — each begins with `import "server-only"` which throws at build time if imported from a client component
- `lib/articles.ts` — server-only by convention (uses `fs`, no `"use client"`)
- `app/api/lead/route.ts` — the sole API route; imports only from server-safe modules

**Client components:**
- Marked with `"use client"` as the first line before all imports
- All interactive, motion-bearing, or browser-API components are client: `Hero.tsx`, `SmoothScroll.tsx`, `Reveal.tsx`, `ScrollReveal.tsx`, `MagneticCTA.tsx`, `SiteHeader.tsx`, `ContactInquiry.tsx`, `PageTransition.tsx`
- Server components (no directive): `InsightsBento.tsx`, `app/page.tsx`, route `page.tsx` files

## Error Handling

**API Routes (`app/api/lead/route.ts`):**
- `try/catch` around `req.json()` — returns `400 invalid_json` on parse failure
- Zod `safeParse` for validation — returns `400 invalid_input` without throwing
- `Promise.allSettled` for dual-sink writes — partial failure is logged and tolerated if any sink fulfils
- Explicit error codes in JSON responses: `"invalid_json"`, `"invalid_input"`, `"spam_detected"`, `"rate_limit_exceeded"`, `"service_unconfigured"`, `"server_error"`

**Server utilities (`lib/`):**
- `requireEnv` in `lib/env.ts` throws a descriptive `Error` with the var name and `.env.example` reference
- `getArticle` in `lib/articles.ts` catches filesystem errors and returns `null` rather than propagating
- Path traversal prevention: slug validated against `..`, `/`, `\` before filesystem read

**Client components:**
- `ContactInquiry.tsx` uses status state machine (`"idle" | "loading" | "ok" | "error" | "fallback"`) — no unhandled promise rejections
- `fetch` calls wrapped in `try/catch` for network errors; HTTP error codes mapped to status states
- `catch` blocks with empty binding (`catch {}`) used in Zod parse — TypeScript `strict` mode requires this

**GSAP / motion:**
- `useGSAP` cleanup via `return () => mm.revert()` in every `matchMedia` block
- Event listener cleanup in every `useEffect` return function
- `ScrollTrigger.invalidateOnRefresh: true` on all scroll triggers to handle resize

## Logging

**Pattern:** `console.warn` / `console.error` only in server-side API route error paths — prefixed with `[lead]` or `[chat]` namespace:
- `console.warn("[lead] All sinks unconfigured, lead dropped:", data)` — `app/api/lead/route.ts:62`
- `console.warn("[lead] Partial sink failure", results)` — `app/api/lead/route.ts:68`
- `console.error("[lead] All sinks failed", results)` — `app/api/lead/route.ts:73`
- `console.error("[chat] stream error", err)` — `app/api/chat/route.ts:99`

No `console.log` in the codebase. No client-side logging. Dev-only state exposed via `window.__lenis` / `window.ScrollTrigger` behind `process.env.NODE_ENV !== "production"` guard in `SmoothScroll.tsx`.

## Comments

**When to Comment:**
- JSDoc blocks on exported components and utility functions explaining the "why" and key tradeoffs, not the "what"
- Inline comments for non-obvious decisions (e.g., GSAP/Lenis bridge rationale, single-line `\n` encoding for Google service account key)
- CSS section headers use `── NAME ──` delimiter pattern with uppercase names

**JSDoc examples observed:**
```tsx
/**
 * Cinematic hero. Stitch-aligned: background image with smoke gradient overlay,
 * editorial typography, primary gold CTA + ghost secondary.
 */
export function Hero({ ... }) { ... }

/**
 * Bridges Lenis's RAF into GSAP's ticker so ScrollTrigger reads the
 * smoothed scroll position. Without this, ScrollTrigger calculations
 * drift against the visual scroll.
 */
function LenisGsapBridge() { ... }
```

**Dev-only markers:**
- `const SHOW_SCROLL_MARKERS = process.env.NODE_ENV !== "production"` — in `Hero.tsx` and `ScrollReveal.tsx`; passed as `markers:` to every `ScrollTrigger` config

## Function Design

**Size:** Components are single-purpose and fit within 100–225 lines. No component exceeds 300 lines.

**Props pattern:**
- Destructured in function signature
- Optional props with default values inline: `showScrollCue = true`, `y = 120`, `className = ""`
- `ReactNode` for flexible child content
- Required vs optional clearly expressed via TypeScript interface (no runtime guards needed)

**Return values:**
- Components return JSX; early returns for guard cases: `if (articles.length === 0) return null`
- Server utilities return typed values or `null` (never `undefined`) on not-found
- API route handlers return `NextResponse.json(...)` with explicit status codes

## Module Design

**Exports:**
- Barrel files: none — every import references the specific file directly
- Named exports throughout; default export only on Next.js page/layout files (required by framework)
- `lib/` exports are function-level (not object/class-based): `export async function sendLeadEmail(...)`

**GSAP plugin registration:**
- `gsap.registerPlugin(ScrollTrigger, useGSAP)` at module scope in every file that uses ScrollTrigger — repeated registration is idempotent in GSAP

## Motion Conventions

**Two animation systems, strict separation:**
- `motion/react` (Framer Motion v12) — for one-shot `whileInView` reveals and page transitions: `Reveal.tsx`, `PageTransition.tsx`, `MagneticCTA.tsx`
- GSAP + `ScrollTrigger` via `useGSAP` — for scroll-driven/scrub animations: `Hero.tsx`, `ScrollReveal.tsx`, `ScrollParallax.tsx`
- Lenis (`SmoothScroll.tsx`) — smooth scroll only; RAF bridged to `gsap.ticker` so both systems share one scroll source

**`useGSAP` usage:**
- Always scoped: `{ scope: ref, dependencies: [...] }`
- Always uses `gsap.matchMedia()` for breakpoint variants with `mm.revert()` cleanup
- Never initialised outside a component or in a `useEffect` — always `useGSAP`

**Easing tokens** (defined in `app/globals.css` `:root`):
- `--ease-soft: cubic-bezier(0.22, 1, 0.36, 1)`
- `--ease-cinema: cubic-bezier(0.16, 1, 0.3, 1)` — most common in components
- `--ease-glide: cubic-bezier(0.65, 0, 0.35, 1)`
- `--ease-spring: cubic-bezier(0.34, 1.36, 0.64, 1)`

In code, easing is passed as array literal matching `--ease-cinema`: `ease: [0.16, 1, 0.3, 1] as const`

## Typography Conventions

**Headlines:** `font-family: "Berlingske Serif", Georgia, serif` — must match exactly. Applied via Tailwind `font-serif` utility (configured in `tailwind.config.ts`). Never substitute another serif.

**Body:** Montserrat via CSS variable `--font-montserrat`, applied as `font-sans` class on `<body>`.

**Colour literals used inline** (not via CSS vars in JSX):
- Gold accent: `#D4AF37`
- Primary text: `#d9e3f2`
- Secondary text: `#c4c6cf`
- Navy deep bg: `#0a141e`
- Card surface: `#13243a`, `#18283d`

## SEO and Metadata

- Per-page `export const metadata: Metadata` in each `page.tsx` — title uses template `%s · Kismet Finance Group`
- Canonical URL, OpenGraph, Twitter card all set at root layout (`app/layout.tsx`)
- JSON-LD `ProfessionalService` schema lives in `app/layout.tsx` — must remain factually accurate
- New routes must be manually added to `app/sitemap.ts` (no filesystem autodiscovery)

---

*Convention analysis: 2026-06-03*
