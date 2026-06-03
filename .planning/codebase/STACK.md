# Technology Stack

**Analysis Date:** 2026-06-03

## Languages

**Primary:**
- TypeScript 5.x (strict mode) — all application code under `app/`, `components/`, `lib/`, `hooks/`

**Secondary:**
- JavaScript (`.mjs`) — build scripts in `scripts/`, config files (`postcss.config.mjs`, `eslint.config.mjs`)

## Runtime

**Environment:**
- Node.js 26.2.0 (active on dev machine; no `.nvmrc` or `.node-version` pinned)

**Package Manager:**
- npm (lockfile: `package-lock.json` — present, committed)
- Module type: `"type": "module"` (ESM throughout)

## Frameworks

**Core:**
- Next.js 16.2.5 (App Router, Turbopack in dev via `next.config.ts` `turbopack.root`) — full-stack framework, SSR/SSG + API routes
- React 19.2.4 — UI rendering; Server Components by default, `"use client"` only for interactive/motion sections

**Build/Dev:**
- Turbopack — configured in `next.config.ts`, used via `npm run dev`
- TypeScript compiler (`tsc --noEmit`) — type checking via `npm run type-check`
- ESLint 9.x + `eslint-config-next` 16.2.6 + `eslint-config-next/core-web-vitals` — linting (runs automatically as `postbuild` hook)
- PostCSS via `@tailwindcss/postcss` — configured in `postcss.config.mjs`

**Testing:**
- No test runner configured. `npm run build` → auto-runs lint (`postbuild`). Build success = lint clean.

## Key Dependencies

**Critical (production):**
- `motion` 12.38.0 (Framer Motion v12) — page transitions, reveal animations; `motion/react` API
- `gsap` 3.15.0 + `@gsap/react` 2.1.2 — scroll-driven animation via `ScrollTrigger`; registered in `components/SmoothScroll.tsx`
- `lenis` 1.3.23 — smooth scroll wrapper (`lenis/react`); RAF bridged to GSAP ticker in `components/SmoothScroll.tsx`
- `embla-carousel-react` 8.6.0 + `embla-carousel-autoplay` 8.6.0 — carousel component
- `zod` 4.4.3 — runtime schema validation at all API route boundaries
- `resend` 6.12.3 — transactional email for lead notifications (server-only, `lib/email.ts`)
- `googleapis` 171.4.0 — Google Sheets API v4 for lead row appending (server-only, `lib/sheets.ts`)
- `gray-matter` 4.0.3 — Markdown frontmatter parsing for `content/insights/`
- `remark` 15.0.1 + `remark-html` 16.0.1 — Markdown-to-HTML for insights articles (`lib/articles.ts`)
- `@anthropic-ai/sdk` 0.100.1 — Claude AI SDK for the chat assistant (`app/api/chat/route.ts`, `lib/chat.ts`)

**Dev-only:**
- `tailwindcss` 4.x + `@tailwindcss/postcss` + `@tailwindcss/typography` — utility CSS
- `sharp` 0.34.5 — image optimisation (scripts only)
- `heic-convert` 2.1.0 — HEIC-to-JPEG conversion (scripts only)
- `playwright` 1.59.1 — headless scraping (dev scripts only)
- `@types/node` 20, `@types/react` 19, `@types/react-dom` 19 — TypeScript definitions

## Styling

**Framework:** Tailwind CSS v4 (PostCSS plugin `@tailwindcss/postcss`)

**Custom CSS:**
- `app/globals.css` — `@font-face` blocks for Berlingske Serif (self-hosted in `public/fonts/`), easing design tokens (`--ease-soft`, `--ease-cinema`), base design tokens
- `app/kismet-brand.css` — brand-specific CSS rules

**Typography:**
- Body: Montserrat (variable weight 300/400/500/600) via `next/font/google`, CSS var `--font-montserrat`
- Headlines: Berlingske Serif, self-hosted webfonts at `public/fonts/`, declared via `@font-face` in `globals.css`. Fallback: Georgia, serif. Do NOT substitute any other serif font.

## Configuration

**Environment:**
- Secrets loaded lazily at request time via `lib/env.ts` (not at build time — `npm run build` succeeds without secrets)
- Required env vars: `RESEND_API_KEY`, `LEAD_INBOX_TO`, `LEAD_INBOX_FROM`, `GOOGLE_SHEETS_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_SERVICE_ACCOUNT_KEY`, `ANTHROPIC_API_KEY`
- Optional: `NEXT_PUBLIC_BOOKING_URL` (booking widget embed URL), `CHAT_MODEL` (defaults to `claude-opus-4-8`)
- Template: `.env.example` — never commit `.env.local`

**Build:**
- `next.config.ts` — Turbopack root, allowed dev origins
- `postcss.config.mjs` — `@tailwindcss/postcss` plugin only
- `eslint.config.mjs` — `eslint-config-next/core-web-vitals`, ignores `.next/`, `out/`, `build/`, `node_modules/`, `public/`, `scripts/`
- `tsconfig.json` — strict, ES2017 target, `moduleResolution: bundler`, path alias `@/*` → repo root

## Platform Requirements

**Development:**
- Node.js 26.x (current dev machine)
- npm (included with Node)
- No Docker, no local database

**Production:**
- Deployment target: Vercel (inferred from `next.config.ts`, `eslint-config-next`, and live URL `kismetfinancegroup.com.au`)
- Serverless API routes (rate limiter resets on cold start — known v1 limitation)
- All six lead pipeline env vars plus `ANTHROPIC_API_KEY` must be set in Vercel project settings

---

*Stack analysis: 2026-06-03*
