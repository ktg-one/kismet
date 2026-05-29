# Kismet Finance Group - Agent Operating Rules

## Source of Truth Priority

When sources conflict, use this hierarchy (highest wins):
1. `CLAUDE.md` in project root
2. Files in `project-notes/`
3. Files in `docs/superpowers/` (plans + specs)
4. Code comments

**Important**: The `docs/superpowers/plans/` document references Next.js 15 and Berlingske Serif. Both are wrong. CLAUDE.md confirms: **Next.js 16.2.5** and **Newsreader** font. Always use CLAUDE.md.

## The 30-Minute Rule (`.claude/rules/30-min-max.md`)

Any task that involves multiple files or unknowns uses this loop:

```
PLAN → GAUGE → SCOPE → EXECUTE → HANDOFF
```

1. **PLAN**: Understand what needs doing and what you don't know yet
2. **GAUGE**: Estimate how long this actually takes (realistic, not optimistic)
3. **SCOPE**: If >30 min estimate, cut scope or split the task
4. **EXECUTE**: Do the scoped work
5. **HANDOFF**: Leave a clear trail for the next agent or session (update docs, leave comments)

**Do not** push past a natural 30-minute checkpoint into declining-quality work. Stop, hand off, surface what remains.

## Verify First (`.claude/rules/verify-first.md`)

Never claim something is done based on memory. After every edit:
1. Re-read the file with a view tool
2. Trace the changed code path in your head
3. If it involves a visual or runtime result, instruct how to verify or verify via available tools

**Do not** say "this should work" - say "I read the file back and confirmed X".

## Find Skills First (`.claude/rules/find-skills-first.md`)

Before executing a multi-step or cross-domain task:
1. Check `.github/skills/` for any relevant skill files
2. Check `.github/agents/` for relevant agent definitions
3. Load all relevant skills before beginning work
4. Multi-domain tasks (e.g., design + code + copy) need multiple skills loaded

**Do not** start executing until you have checked for available skills.

## Project-Specific Gotchas

### Next.js Hydration Flash
Never use `opacity-0` on page-level elements or container components. This causes a visible hydration flash where the element briefly appears at opacity 0 before React hydrates. Use animation variants with `initial` state that doesn't modify opacity at the layout level.

### Framer Motion Import
```ts
// CORRECT - package is named `motion`, import from `motion/react`
import { motion, AnimatePresence } from "motion/react";

// WRONG - this package name/path does not exist in this project
import { motion } from "framer-motion";
```

### Tailwind v4 Config
```css
/* CORRECT - Tailwind v4 uses CSS custom properties in globals.css */
@theme {
  --color-brand-navy: #1E3A5F;
  --color-brand-gold: #D4AF37;
}
```
```js
// WRONG - Do NOT extend in tailwind.config.js for theme variables
// tailwind.config.js `extend` object is NOT used for theme customisation in v4
```

### Font Names
```
CORRECT: Montserrat, Newsreader
WRONG: Berlingske Serif (never licensed), Inter, Roboto
```
Berlingske was evaluated and rejected. Do not suggest it. Do not use it.

### No Test Framework
Vitest was removed. No test framework is installed. **Do not add any testing tools** unless explicitly instructed. Running `npx vitest` or `npx jest` will fail.

### Dark Theme Only
No light theme exists. Do not add light-mode CSS variables, conditional colour logic, or any `dark:` prefix variants that assume a light base. Everything assumes dark.

## MCP Servers Available

The project has these MCP servers configured (`.mcp.json` or `CLAUDE.md`):
- **agentmemory** - semantic recall; call `recall_memory` at session start
- **in-memoria** - project knowledge base; call `search_knowledge` for domain queries
- **sequential-thinking** - for complex multi-step reasoning

**Always call `recall_memory` at session start** to load relevant context from agentmemory.

## Component Conventions

```
app/                 # Next.js App Router pages and layouts
components/          # Shared and page-level components
components/ui/       # Primitive / atomic UI components  
lib/                 # Utility functions, constants, helpers
hooks/               # Custom React hooks
```

### Naming
- Page components: `PascalCase` matching route (e.g., `HomeHero.tsx`)
- Server components: default (no `"use client"` directive)
- Client components: `"use client"` at top of file, named with `Client` suffix or clear interactive purpose

### Importing from aliases
```ts
import { SomeComponent } from "@/components/SomeComponent";
import { someUtil } from "@/lib/utils";
```

## Known Open Items (Do Not "Fix" Without Instruction)

- Vercel deployment: not yet live on production domain
- `StrategicPartnerships` section: content placeholder pending
- Team/founders bios: drafts pending final Shane + Josh approval
- Insights articles: 1 published placeholder, more pending
- `agentmemory` database: populated; `in-memoria` database: populated via this customization run

## Git Conventions

- Branch naming: `feat/`, `fix/`, `chore/`, `docs/`, `agents/` prefixes
- Commits: conventional commits preferred (`feat:`, `fix:`, `chore:`, `docs:`)
- Worktrees: feature work in main worktree; agent customizations in `agents/` worktree

## What Requires Explicit Sign-off Before Changing

1. Any compliance-related text (footer, ComplianceLine, warnings)
2. CTA labels (standardised; see copy guide)
3. Font choices
4. Brand colour hex values
5. AFG attribution text
6. Shane or Josh's titles (both "Director" - never "co-founder", "CEO", etc.)
