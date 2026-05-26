# Kismet Finance Group — Website

Marketing site for **Kismet Finance Group** (Cockburn Central, WA). A credibility surface for a boutique strategic-finance consultancy. The job of every page is to convince a warm referral inside 30 seconds that this is a real, premium, capable operation worth booking a call with. **Conversion happens on the call, not the page.**

Live: https://kismetfinancegroup.com.au

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js **16.2.5** App Router, Turbopack |
| Runtime | React **19.2** |
| Language | TypeScript **strict**, `@/*` paths to repo root |
| Styling | Tailwind **v4** (`@tailwindcss/postcss`) + custom CSS in `app/globals.css` + `app/kismet-brand.css` |
| Type | Montserrat (body) + Newsreader (display serif), both via `next/font/google` |
| Motion | `motion` (Framer Motion v12) for page transitions and reveals |
| Carousel | `embla-carousel-react` + autoplay plugin |
| Content | Markdown insights in `content/insights/` via `gray-matter` + `remark` |
| Forms | Resend for transactional email; Google Sheets via `googleapis` |
| Validation | Zod at route boundaries |
| Image tooling | `sharp`, `heic-convert`, Playwright (scraping) — dev only |

## Layout

```
app/                Next App Router — about, approach, contact, insights, pathways, api
components/         Page sections + shared UI (PascalCase .tsx)
content/insights/   Markdown articles, ingested by lib/articles.ts
lib/                Server utilities (articles, email, sheets)
public/             Static assets — fonts go in public/fonts
scripts/            One-off Node scripts (photo optimisation, scraping)
project-notes/      Brand, voice, design, compliance, direction — READ THESE
docs/superpowers/   Skill plans and specs
photos-raw/         Source photos (not shipped; converted via scripts/)
```

Path alias: `@/*` resolves to repo root. Use `@/components/Foo`, `@/lib/articles`, etc.

## Brand non-negotiables

Read `project-notes/DESIGN_GUIDE.md`, `COPY_VOICE_GUIDE.md`, and `WEBSITE_DIRECTION.md` before changing copy or visuals. Short version:

- **Audience: John and Jenny.** Normal Australians, decent income, not finance pros. If a sentence can't be read at a backyard BBQ, it doesn't belong on the site.
- **Dark theme only.** Brand navy `#1E3A5F` is the dominant surface. Gold `#D4AF37` is the accent — hairlines, CTAs, brand mark, eyebrow text. Use sparingly. Off-white type.
- **No light theme. No emoji. No exclamation marks.** Calm, editorial, confident.
- **Positioning:** strategic finance *coordinator* — not broker, not planner. Three beats: see the bigger picture, connect the right people, make the process clearer.
- **Compliance:** see `COMPLIANCE_NOTES.md`. Kismet does not give personal financial, tax, legal, or accounting advice. Don't write copy that implies otherwise.
- **Founders:** Shane Hewson and Josh Hewson are both Directors. Josh's title is "Director" — this has been corrected once already, don't regress it.

## Conventions

- Components are PascalCase, one default export per file, colocated with sections they belong to.
- Server-only modules (`lib/email.ts`, `lib/sheets.ts`) must not be imported from client components.
- No new top-level docs in repo root — long-form context lives in `project-notes/` or `docs/`.
- Match existing motion: `motion/react` with the easing tokens already defined in `globals.css` (`--ease-soft`, `--ease-cinema`, etc.). Don't introduce a new animation library.
- Avoid adding dependencies for things React 19 + Tailwind v4 already do.

## Scripts

```bash
npm run dev    # next dev (Turbopack)
npm run build  # next build
npm run start  # next start
```

No lint or type-check script defined in `package.json` yet. Run `npx tsc --noEmit` for type-check; `npx next lint` for lint.

## Shell

User's `~/.bashrc` is configured and should be sourced when running interactive bash. Primary shell is PowerShell on Windows; the Bash tool is available for POSIX work.

## Gotchas

- `in-memoria.db` in repo root is local MCP state and is gitignored — leave it alone.
- `.mcp.json` is gitignored — local MCP config, don't commit.
- Photos in `photos-raw/` are source masters. The optimised versions in `public/photos/` are what the site ships; regenerate via `scripts/optimize-photos.mjs`.
- The Berlingske Serif headline font referenced in `README.md` was never licensed — we ship Newsreader as the display serif instead. Don't reintroduce Berlingske.

## Memory recall

At session start, run this to pull project context from previous sessions:

```
memory_recall query="kismet gsd-init hardening nextjs16-react19 ship-ready"
```

Anchor terms used in saved memories: **kismet, code-review, gsd-code-review, handoff, ship-checklist, priority-targets, branding, design-tokens, founders, next.js, tailwind-v4, agentmemory, mem0-deprecated**.

The handoff plan is in `docs/handoff/2026-05-25-code-review-plan.md`. Read it before touching the lead form, TestimonialBlock, or Hero.
