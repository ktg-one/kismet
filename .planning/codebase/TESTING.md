# Testing Patterns

**Analysis Date:** 2026-06-03

## Test Framework

**Runner:** None configured.

No Jest, Vitest, Playwright test runner, or any test framework is installed or configured. No `*.test.*` or `*.spec.*` files exist anywhere in the repository.

**Lint (the only automated quality gate):**
- ESLint via `eslint-config-next/core-web-vitals` — config at `eslint.config.mjs`
- Runs automatically via `postbuild` hook: `"postbuild": "npm run lint"`

**Type checking:**
- `tsc --noEmit` via `npm run type-check` — TypeScript strict mode (`"strict": true` in `tsconfig.json`)
- A passing `npm run build` implies both type-checking (Next.js build-time) and lint pass

**Run Commands:**
```bash
npm run build        # Build + lint (postbuild hook)
npm run lint         # ESLint only
npm run lint:fix     # ESLint with auto-fix
npm run type-check   # tsc --noEmit (standalone type check)
```

## Test File Organization

No test files exist. The existing `VALIDATION.md` in the repo root is a manual test checklist (not executable), formatted as pass/fail checkboxes last updated 2026-05-30 with status "Not Started."

## Manual Validation Coverage

`VALIDATION.md` documents the intended (but unimplemented) test plan covering:

**API Endpoint scenarios defined (not automated):**
- Valid/invalid form submissions → `app/api/lead/route.ts`
- Email format validation, missing fields, honeypot, malformed JSON
- Rate limiting: 5 req / 15 min per IP, 6th returns 429
- Partial/full integration sink failures
- All-unconfigured env → 503 response

**Frontend component scenarios defined (not automated):**
- `ContactInquiry` form states: idle, loading, ok, error, fallback
- Testimonial carousel auto-rotation (6.5s), manual nav, hover-pause
- `prefers-reduced-motion` compliance

**UI/UX scenarios defined (not automated):**
- Responsive breakpoints: mobile, tablet, desktop
- Keyboard navigation, screen reader labels, colour contrast
- Cross-browser: Chrome, Firefox, Safari, Edge

## Validation Logic That Exists (Without Tests)

Although no test runner exists, the codebase has testable validation logic in these files:

**`app/api/lead/route.ts`:**
- Zod schema: `z.object({ name: z.string().min(1), email: z.string().email(), phone: z.string().min(6), message: z.string().min(1), honeypot: z.string().optional() })`
- In-memory rate limiter: `Map<string, { count: number; expires: number }>`, window 15 min, max 5 requests per IP
- Honeypot check: rejects if `body.honeypot` is truthy
- `Promise.allSettled` dual-sink logic: succeeds if either email OR sheets fulfils

**`lib/articles.ts`:**
- Zod frontmatter schema: `z.object({ title, summary, date, readMinutes })`
- Path traversal guard: slug validated against `..`, `/`, `\` before filesystem access

**`lib/env.ts`:**
- `requireEnv(name)` throws descriptive error with var name when env var is absent
- Env read is deferred to request time (not build time) — `npm run build` passes without secrets

## Coverage

**Requirements:** None enforced — no coverage tooling installed.

**Gaps (all functionality):**
- `app/api/lead/route.ts` — rate limiting, Zod validation, honeypot, dual-sink allSettled logic
- `lib/articles.ts` — slug validation, Zod frontmatter parse, sort order
- `lib/env.ts` — requireEnv throw behaviour
- `lib/email.ts` — Resend integration (external)
- `lib/sheets.ts` — Google Sheets JWT auth + append (external)
- All client components — no React Testing Library or component test harness
- All animation behaviour — no Playwright or visual regression tests

## Test Types

**Unit Tests:** Not implemented. Recommended targets if added:
- Zod schema validation in `app/api/lead/route.ts`
- Rate limit logic (pure Map-based, easily unit-testable)
- `requireEnv` throw in `lib/env.ts`
- `getArticle` null-return on bad slug in `lib/articles.ts`

**Integration Tests:** Not implemented. Recommended targets:
- Full POST to `/api/lead` with mocked Resend + googleapis
- `Promise.allSettled` partial-failure path
- `appendLeadRow` with mocked Google JWT

**E2E Tests:** Playwright is installed as a devDependency (`"playwright": "^1.59.1"`) for the photo optimisation scripts (`scripts/`), not for browser testing. No Playwright test files exist.

## Recommended Test Setup (if adding tests)

The VALIDATION.md recommends Jest + Playwright + Lighthouse. Given the stack (Next.js 16, React 19, ESM `"type": "module"`), the practical setup would be:

```bash
# Unit/integration
npm install -D vitest @vitejs/plugin-react

# Component testing
npm install -D @testing-library/react @testing-library/user-event jsdom

# E2E (Playwright already installed)
# npx playwright install
```

No test infrastructure exists yet — any addition starts from zero.

---

*Testing analysis: 2026-06-03*
