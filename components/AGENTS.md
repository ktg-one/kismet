# components/ — Agent Rules

Folder-level rules for all agents (Copilot, Codex, Claude, etc.) working in `components/`.

## Non-negotiable pre-commit gates

1. **ESLint must pass with zero warnings:**
   ```bash
   npx eslint . --ext .ts,.tsx --max-warnings 0
   ```
   Do not commit or open a PR until this exits 0. `npx next lint` is broken in PowerShell — always use the command above.

2. **react-doctor must be run before handoff:**
   ```bash
   npx react-doctor
   ```
   Score must be reported in the phase SUMMARY.md. Breaking this rule = work is wiped.

3. **TypeScript must type-check clean:**
   ```bash
   npx tsc --noEmit
   ```

## Card CSS vocabulary

Use the shared utility classes. Do not write bespoke hover transforms inline.

| Class | Purpose |
|---|---|
| `card-lift-hover` | Hover lift (+2px translate-Y), gold border-top, box-shadow. Use on all interactive bento/card surfaces. |
| `glass-card` | Frosted glass surface with border. |
| `kismet-surface` | Base dark surface token. |

**Anti-pattern** (do not write):
```tsx
// ❌ bespoke inline hover transforms
className="... hover:-translate-y-[2px] hover:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)] transition-[colors,transform,box-shadow] duration-500"

// ✅ shared utility
className="... card-lift-hover"
```

## Animation rules (ui-ux-pro-max Priority 7)

- Use `transform` / `opacity` only — never animate `width`, `height`, `top`, `left`
- Duration 150–300ms for micro-interactions; complex ≤400ms
- `prefers-reduced-motion` kill-switch is already global in `app/globals.css` — do not duplicate it per-component
- Every animation must express cause-and-effect; no decorative-only motion

## Branch conventions

Each Phase 2 animation lane runs on its own branch:

| Plan | Branch |
|---|---|
| 02-02 Card hover | `anim/card-polish` |
| 02-03 MagneticCTA | `anim/magnetic-ctas` |
| 02-04 Page transitions | `anim/page-transitions` |
| 02-05 GSAP final pass | `anim/gsap-final-pass` |

Merge sequentially in priority order after each lane is verified.
