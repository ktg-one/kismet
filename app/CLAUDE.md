# CLAUDE.md — `app/` (Next App Router)

Scoped context for the route tree. Inherits the repo-root `CLAUDE.md`; this only adds what is specific to `app/`.

## How routing works here

- Each route is a folder with a `page.tsx` (`about/`, `approach/`, `contact/`, `insights/`, `pathways/`). `insights/[slug]/page.tsx` is the only dynamic route — it renders Markdown via `@/lib/articles`.
- Components are **Server Components by default**. Add `"use client"` only to interactive/motion sections; keep server data-fetching (`lib/articles`) out of client files.
- `not-found.tsx` is the styled 404.

## `layout.tsx` owns the shell — touch with care

- `<html lang="en-AU">` + Montserrat `--font-montserrat` variable. Body wraps everything in `SmoothScroll` (Lenis) → `GrainOverlay`, `SiteHeader`, `PageTransition`, `SiteFooter`. Don't add a second scroll container or page-transition wrapper.
- `metadata` (title template, OpenGraph, Twitter, robots, canonical) and the `ProfessionalService` **JSON-LD** block live here. The JSON-LD carries the live ABN, address, phone, email and founder — keep it factually correct and in sync with `project-notes/` (do not invent business details).
- Per-page SEO: export `metadata` (or `generateMetadata`) from the route's `page.tsx`; the title template appends `· Kismet Finance Group`.

## SEO is code-generated

`robots.ts` and `sitemap.ts` produce `/robots.txt` and `/sitemap.xml`. **Add new routes to `sitemap.ts`** — there is no filesystem auto-discovery.

## Server boundary

- `api/lead/route.ts` is the only API route — the lead pipeline (see root `CLAUDE.md`). It is server-only and reads secrets lazily through `@/lib/env`.
- Never import `@/lib/email` or `@/lib/sheets` (server-only) into a client component.

## Styling

`globals.css` defines the Berlingske `@font-face` blocks, the easing tokens (`--ease-soft`, `--ease-cinema`), and design tokens used by `motion`/GSAP. `app/kismet-brand.css` holds brand-specific rules. Copy is **en-AU** spelling.
