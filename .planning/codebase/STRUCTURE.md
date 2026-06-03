# Codebase Structure

**Analysis Date:** 2026-06-03

## Directory Layout

```
kismet-website/
├── app/                        # Next.js App Router — routes + API
│   ├── layout.tsx              # Root layout: shell, fonts, metadata, JSON-LD
│   ├── page.tsx                # Homepage (Server Component)
│   ├── globals.css             # @font-face (Berlingske), easing tokens, design tokens
│   ├── kismet-brand.css        # Brand-specific CSS rules
│   ├── not-found.tsx           # Styled 404 page
│   ├── robots.ts               # /robots.txt generator
│   ├── sitemap.ts              # /sitemap.xml generator (manual — add new routes here)
│   ├── about/page.tsx          # /about route
│   ├── approach/page.tsx       # /approach route
│   ├── contact/page.tsx        # /contact route
│   ├── pathways/page.tsx       # /pathways route
│   ├── insights/
│   │   ├── page.tsx            # /insights listing
│   │   └── [slug]/page.tsx     # Dynamic article route (static generation)
│   └── api/
│       ├── lead/route.ts       # POST /api/lead — contact form pipeline
│       └── chat/               # AI chat API route
│
├── components/                 # All UI components (PascalCase .tsx, flat)
│   ├── SmoothScroll.tsx        # Lenis root + GSAP bridge (mount in layout only)
│   ├── PageTransition.tsx      # Framer Motion route transition
│   ├── SiteHeader.tsx          # Sticky nav (client, scroll-state backdrop)
│   ├── SiteFooter.tsx          # Footer
│   ├── GrainOverlay.tsx        # Fixed film grain overlay
│   ├── CustomCursor.tsx        # Custom cursor (fine-pointer only)
│   ├── ChatWidget.tsx          # Floating AI chat
│   ├── Hero.tsx                # Full-screen hero with GSAP parallax
│   ├── HeroAmbient.tsx         # Ambient orbs with cursor drift
│   ├── ScrollCue.tsx           # Scroll indicator on hero
│   ├── Reveal.tsx              # Framer Motion reveal (Reveal + RevealWords)
│   ├── ScrollReveal.tsx        # GSAP scrub reveal for cards/photos
│   ├── ScrollParallax.tsx      # GSAP parallax layer wrapper
│   ├── MagneticCTA.tsx         # Magnetic hover CTA (Framer Motion spring)
│   ├── BiggerPicture.tsx       # Homepage 2-col content section
│   ├── StrategicPathways.tsx   # Bento card grid with hub card
│   ├── TeamPortraits.tsx       # Founder photo pair
│   ├── TestimonialBlock.tsx    # Embla carousel testimonials
│   ├── ThreeStep.tsx           # Numbered 3-step process
│   ├── InsightsBento.tsx       # Article listing grid
│   ├── ArticleLayout.tsx       # Markdown article template
│   ├── ContactInquiry.tsx      # Contact form (client, fetches /api/lead)
│   ├── ComplianceLine.tsx      # Compliance disclaimer
│   ├── BrandMark.tsx           # SVG brand mark
│   ├── BrandWordmark.tsx       # SVG KISMET wordmark
│   ├── Icons.tsx               # Named SVG icon exports
│   ├── Socials.tsx             # Social icon row
│   └── social-links.tsx        # Social link data
│
├── lib/                        # Server-only utilities (never import in "use client")
│   ├── articles.ts             # Markdown article reader + Zod frontmatter validation
│   ├── email.ts                # Resend transactional email (server-only)
│   ├── sheets.ts               # Google Sheets append (server-only)
│   ├── env.ts                  # Lazy env var resolution (server-only guard)
│   └── chat.ts                 # AI chat handler (server-only)
│
├── content/
│   └── insights/               # Markdown articles with YAML frontmatter
│       └── *.md                # Fields: title, summary, date, readMinutes
│
├── public/
│   ├── fonts/                  # Self-hosted Berlingske Serif webfonts (eot/ttf/woff/woff2)
│   ├── photos/                 # Optimised site photos (jpg)
│   ├── brand/                  # Brand assets (SVG logo, icon, wordmark, zip archives)
│   └── data/
│       └── reviews.json        # Static review data
│
├── project-notes/              # Brand, voice, design, compliance, direction docs
│   ├── DESIGN_GUIDE.md
│   ├── COPY_VOICE_GUIDE.md
│   ├── WEBSITE_DIRECTION.md
│   └── COMPLIANCE_NOTES.md
│
├── scripts/                    # Dev-only Node scripts
│   └── optimize-photos.mjs     # Converts photos-raw/ → public/photos/
│
├── docs/                       # Long-form project context
│   ├── handoff/                # Session handoff plans
│   └── superpowers/            # Skill plans and specs
│
├── photos-raw/                 # Source photos (not shipped, gitignored)
│   ├── stitch/
│   └── stock/
│
├── next.config.ts              # Next.js config (Turbopack, allowedDevOrigins)
├── tailwind.config.ts          # Tailwind v4 config
├── postcss.config.mjs          # PostCSS config
├── tsconfig.json               # TypeScript strict, @/* alias to repo root
├── eslint.config.mjs           # ESLint (eslint-config-next)
├── package.json
└── CLAUDE.md                   # Project-level agent instructions
```

## Directory Purposes

**`app/`:**
- Purpose: All Next.js App Router routes, API routes, and global styles
- Contains: Page Server Components, API route handlers, CSS, metadata generators
- Key files: `layout.tsx` (shell), `page.tsx` (homepage), `sitemap.ts` (must be updated for new routes), `api/lead/route.ts` (lead pipeline)

**`components/`:**
- Purpose: All UI — page sections, shared primitives, motion wrappers
- Contains: Flat directory of PascalCase `.tsx` files; mix of Server and Client components
- Key files: `SmoothScroll.tsx` (Lenis+GSAP bridge), `Reveal.tsx` (Framer), `ScrollReveal.tsx` (GSAP scrub), `Hero.tsx`, `MagneticCTA.tsx`
- Note: No subdirectories — all components are colocated at this level

**`lib/`:**
- Purpose: Server-side helpers used by API routes and Server Components
- Contains: Article parsing, email, sheets, env guard, chat
- Constraint: All files are server-only — never import from `"use client"` components

**`content/insights/`:**
- Purpose: Source Markdown for all articles
- Contains: `.md` files with YAML frontmatter (`title`, `summary`, `date`, `readMinutes`)
- Processed by: `lib/articles.ts` → `app/insights/[slug]/page.tsx`

**`public/`:**
- Purpose: Static assets served at root `/`
- Contains: Berlingske Serif webfonts (all weights), optimised photos, brand SVGs, static data
- Key: `public/fonts/` webfonts declared via `@font-face` in `app/globals.css` — match that pattern for any new weight

**`project-notes/`:**
- Purpose: Brand, voice, design system, compliance guidance
- Read before: Changing copy, visuals, or compliance-adjacent content

## Key File Locations

**Entry Points:**
- `app/layout.tsx`: Root layout — shell components, global metadata, Berlingske `@font-face`
- `app/page.tsx`: Homepage composition
- `app/api/lead/route.ts`: Contact form lead capture API

**Configuration:**
- `next.config.ts`: Next.js + Turbopack config
- `tailwind.config.ts`: Tailwind v4 config
- `tsconfig.json`: `@/*` alias resolves to repo root
- `app/globals.css`: Berlingske `@font-face`, easing tokens (`--ease-soft`, `--ease-cinema`), design tokens

**Core Motion System:**
- `components/SmoothScroll.tsx`: Lenis root + `LenisGsapBridge` — the single scroll source
- `components/Reveal.tsx`: Framer Motion `Reveal` + `RevealWords` primitives
- `components/ScrollReveal.tsx`: GSAP scrub reveal primitive
- `components/PageTransition.tsx`: Framer Motion route transition

**Content Pipeline:**
- `lib/articles.ts`: Article reader (filesystem → Zod → remark → HTML)
- `content/insights/*.md`: Article sources
- `app/insights/[slug]/page.tsx`: Dynamic article route
- `app/sitemap.ts`: Sitemap — add new routes here manually

**Lead Pipeline:**
- `app/api/lead/route.ts`: POST handler (rate limit → honeypot → Zod → dual-sink)
- `lib/email.ts`: Resend email sink
- `lib/sheets.ts`: Google Sheets sink
- `lib/env.ts`: Lazy env var resolution (server-only)
- `components/ContactInquiry.tsx`: Form UI that POSTs to `/api/lead`

**Brand Assets:**
- `public/fonts/`: Self-hosted Berlingske Serif webfonts
- `public/photos/`: Optimised photos (generate from `photos-raw/` via `scripts/optimize-photos.mjs`)
- `public/brand/`: SVG brand assets
- `components/BrandMark.tsx`: SVG mark component
- `components/BrandWordmark.tsx`: SVG wordmark component

## Naming Conventions

**Files:**
- Components: PascalCase — `SiteHeader.tsx`, `ScrollReveal.tsx`
- Utilities: camelCase — `articles.ts`, `email.ts`, `env.ts`
- CSS: kebab-case — `globals.css`, `kismet-brand.css`
- Next.js reserved: lowercase — `page.tsx`, `layout.tsx`, `route.ts`, `sitemap.ts`, `robots.ts`
- One exception: `social-links.tsx` (kebab) alongside `Socials.tsx`

**Directories:**
- Routes: lowercase — `about/`, `approach/`, `contact/`, `insights/`, `pathways/`
- Dynamic segments: bracket syntax — `[slug]/`
- Utilities: lowercase — `lib/`, `hooks/`, `content/`, `scripts/`

**Component exports:**
- Named exports only: `export function Hero(...)`, `export function SmoothScroll(...)`
- No default exports from component files (verified across Hero, SmoothScroll, Reveal, ScrollReveal, SiteHeader)

## Where to Add New Code

**New Page / Route:**
1. Create `app/{routename}/page.tsx` as a Server Component
2. Export `metadata` or `generateMetadata` from the page file
3. Add the route URL to `app/sitemap.ts`
4. Import and compose components from `components/`

**New Page Section Component:**
1. Add `components/{ComponentName}.tsx` — flat, no subdirectory
2. Use `"use client"` only if the component uses motion, state, or browser APIs
3. Use `ScrollReveal` wrapper for card/photo containers; use `Reveal`/`RevealWords` for text elements
4. Export as named function: `export function ComponentName(...)`

**New Markdown Article:**
1. Add `content/insights/{slug}.md` with frontmatter: `title`, `summary`, `date` (ISO), `readMinutes`
2. The route and sitemap entry are auto-generated — no code changes needed

**New Webfont Weight:**
1. Place font files in `public/fonts/`
2. Add `@font-face` block in `app/globals.css` following the existing Berlingske pattern

**New Server Utility:**
1. Add `lib/{name}.ts`
2. Add `import "server-only"` at the top
3. Never import from client components

**New API Route:**
1. Add `app/api/{name}/route.ts`
2. Use Zod for input validation
3. Read secrets lazily via `lib/env.ts`

**Shared Static Data:**
- `public/data/*.json` — served statically, fetched client-side or imported server-side

## Special Directories

**`.planning/`:**
- Purpose: GSD planning documents and codebase maps
- Generated: Manually by `/gsd:map-codebase` and `/gsd:plan-phase`
- Committed: Yes

**`.planning/phases/`:**
- Purpose: Per-phase implementation plans
- Generated: By `/gsd:plan-phase`
- Committed: Yes

**`.agents/skills/` and `.claude/skills/`:**
- Purpose: Project-specific agent skill libraries
- Committed: Yes — loaded by coding agents before executing tasks

**`project-notes/`:**
- Purpose: Brand canon, voice guide, design system, compliance notes
- Read these before: Any copy or visual change
- Committed: Yes

**`photos-raw/`:**
- Purpose: Source photo masters (stitch + stock subfolders)
- Generated: No (manually curated)
- Committed: No (gitignored); regenerate optimised versions via `scripts/optimize-photos.mjs`

**`.next/`:**
- Purpose: Next.js build output
- Generated: Yes
- Committed: No

**`in-memoria.db`, `in-memoria-vectors.db/`:**
- Purpose: Local MCP state
- Committed: No (gitignored) — do not modify

---

*Structure analysis: 2026-06-03*
