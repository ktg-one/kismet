# CLAUDE.md — `public/` (static assets)

Scoped context for shipped static files. Inherits the repo-root `CLAUDE.md`. Everything here is served verbatim from the web root (`/fonts/...`, `/photos/...`, `/data/...`) with **no build step** — what you commit is what ships, so keep it web-optimised.

## `fonts/` — licensed Berlingske Serif (58 files)

`woff2` / `woff` / `ttf` for each weight + italic. Declared via the `@font-face` blocks in `app/globals.css`. Do **not** rename these or the CSS `src` URLs break, and do not introduce a Google serif fallback beyond Georgia — Berlingske is a strict client constraint (see root `CLAUDE.md`).

## `photos/` — optimised, shipped images (5)

These are the **outputs**. Masters live in repo-root `photos-raw/` (not shipped). Regenerate with `scripts/optimize-photos.mjs` (`sharp` + `heic-convert`) rather than hand-editing. `team-boardroom.jpg` is the OpenGraph/JSON-LD image referenced in `app/layout.tsx`.

## `brand/` — source identity assets

`kismet-logo.svg` / `kismet-icon.svg` are the working marks — reference these. The `.zip` bundles are raw client deliverables (fonts, asset pack); leave them as archive, don't unpack into the shipped tree.

## `data/reviews.json`

Generated artifact from `scripts/scrape-google-reviews.mjs` (Google reviews scrape). Regenerate via the script; don't hand-edit.

## Misc

`kismet-brand.css` here mirrors `app/kismet-brand.css`. The `*.svg` (next, vercel, globe, window, file) are Next scaffold leftovers — safe to ignore, not part of the brand system.
