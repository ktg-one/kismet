# Kismet Finance Group Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and ship a 5-page Premium Dark brand website for Kismet Finance Group at kismetfinancegroup.com.au, deployed on Vercel, hitting credibility/trust/authority + normal-good-humans positioning.

**Architecture:** Next.js 15 App Router static site. Server components for SEO, client components only where interactive (form, booking embed). Markdown-based content for Insights. Brand tokens from `kismet-brand.css` exposed as Tailwind theme. One serverless route for the lead form (Resend email + Google Sheets append). Deploy via Vercel with preview URLs per branch.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, Resend, Google Sheets API, Vercel, Vercel Analytics, GA4. No CMS. No database.

**Spec:** `docs/superpowers/specs/2026-05-07-kismet-website-design.md`

---

## File Structure

```
kismet-website/
├── app/
│   ├── layout.tsx                    Root layout, fonts, analytics, header, footer
│   ├── page.tsx                      Home page
│   ├── globals.css                   Tailwind base + Kismet brand variables
│   ├── about/page.tsx                About page
│   ├── approach/page.tsx             How We Work page
│   ├── insights/
│   │   ├── page.tsx                  Article index
│   │   └── [slug]/page.tsx           Article renderer
│   ├── contact/page.tsx              Contact + booking
│   └── api/
│       └── lead/route.ts             Lead form serverless POST
├── components/
│   ├── SiteHeader.tsx
│   ├── SiteFooter.tsx
│   ├── ComplianceLine.tsx
│   ├── Hero.tsx
│   ├── StatBar.tsx
│   ├── ValueCardRow.tsx
│   ├── TestimonialBlock.tsx
│   ├── ArticleCard.tsx
│   ├── ArticleLayout.tsx
│   ├── BookingEmbed.tsx
│   ├── LeadForm.tsx
│   └── NewsletterSignup.tsx
├── content/
│   └── insights/
│       ├── 10-minute-money-reset.md
│       ├── borrowing-power-myths.md
│       └── smsf-property-plain-english.md
├── lib/
│   ├── articles.ts                   Markdown loader for Insights
│   ├── sheets.ts                     Google Sheets append helper
│   └── email.ts                      Resend send helper
├── public/
│   ├── kismet-brand.css              Brand tokens (copied from existing)
│   ├── images/                       Logo, founders, etc.
│   └── fonts/                        Berlingske Serif if licensed
├── tests/
│   ├── lead-route.test.ts            Lead form route handler tests
│   └── articles.test.ts              Markdown loader tests
├── e2e/
│   └── critical-flows.spec.ts        Playwright: lead form end-to-end
├── .env.example                      Documented env vars
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

**Why this layout:** App Router pages map 1:1 to sitemap. Components stay small and single-purpose. Content lives outside `app/` so editing copy never touches code. `lib/` holds the only side-effecting code (Sheets, Resend) so it can be tested in isolation.

---

## Conventions

- **No em-dashes or en-dashes anywhere.** Including in code comments, commit messages, and copy. CI grep gate enforces this.
- **No AI-tells in copy.** Never publish copy that smells like ChatGPT. Real Shane voice or no go.
- **Brand tokens only.** Never hardcode hex values in components. Use `var(--kismet-*)` or Tailwind theme keys.
- **Server components by default.** Client components only when interactivity required.
- **Commit after every passing task.** Conventional commit prefix (`feat:`, `chore:`, `fix:`).

### Quality bar (non-negotiable)

**Benchmark:** a polished boutique strategic finance consultancy. Not a lead-gen site. Not a funnel template. Not a generic finance site.

Every page must pass this self-check before being marked complete:
1. Does this look 8.5/10 or better?
2. Premium, calm, trustworthy?
3. Spacing clean and intentional?
4. Typography polished, hierarchy obvious?
5. Mobile layout genuinely strong (test on a real phone-width view)?
6. Single clear CTA per surface?
7. Copy sounds human and Australian (not AI)?
8. Zero AI-tells, generic finance wording, marketing-speak?
9. Frames Kismet as **strategic coordinators**, not middlemen ("connect you", "open doors" is middleman)?
10. Would a high-earner trust this enough to book?

**Always favour:** white space, restraint, outcome-led headlines, specific proof, single CTA per surface, mobile-first.

**Always avoid:** stock-photo feel, generic sections, fake luxury, overdesign, funnel urgency, animated counters, bullet-point reflex.

**Placeholder copy rule:** when Shane's voice copy is not yet available, ship explicit `[VOICE PLACEHOLDER: <one-line brief>]` blocks with the dashed-gold dev outline. Never ship marketing-speak filler that could be mistaken for finished work. The placeholder must read as obviously unfinished.

---

## Task 1: Scaffold Next.js project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `.gitignore`, `README.md`

- [ ] **Step 1: Initialize Next.js with TypeScript**

Run from `C:\Users\Shane\kismet-website`:
```bash
npx create-next-app@latest . --typescript --tailwind --app --src-dir false --import-alias "@/*" --no-eslint --no-git --use-npm --yes
```
Expected: Project files generated. If prompted about non-empty dir, accept overwrite (the spec doc and `.git` are preserved by `create-next-app`).

- [ ] **Step 2: Verify dev server boots**

Run:
```bash
npm run dev
```
Expected: Server starts on http://localhost:3000 with default Next.js page. Stop with Ctrl+C.

- [ ] **Step 3: Add the brand CSS file to app/**

Copy `C:\Users\Shane\Downloads\kismet-brand.css` to `app/kismet-brand.css`. Then replace `app/globals.css` with:

```css
@import "tailwindcss";
@config "../tailwind.config.ts";
@import "./kismet-brand.css";

:root {
  color-scheme: dark;
}

body {
  background: var(--kismet-primary);
  color: var(--kismet-secondary);
  font-family: var(--kismet-font-secondary);
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4 {
  font-family: var(--kismet-font-primary);
  font-weight: var(--kismet-font-primary-weight);
}
```

Note: keep an additional copy in `public/kismet-brand.css` so brand collateral pages or external tools can reference it as a static file. They diverge only if Shane changes the brand. Both files copy from Shane's master in Drive.

- [ ] **Step 4: Configure Tailwind theme to expose brand tokens**

Replace `tailwind.config.ts` (or create if missing):

```typescript
import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{md,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#1E3A5F", deep: "#0F2440" },
        gold: { DEFAULT: "#D4AF37", light: "#FFE884", mid: "#FADD63", deep: "#A47308" },
        cream: "#FAF8F4",
        neutral: "#D3D3D3",
      },
      fontFamily: {
        serif: ["Georgia", "serif"],
        sans: ["Montserrat", "Arial", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(180deg, #FFD956 0%, #A47308 35%, #FADD63 65%, #FFE884 100%)",
      },
    },
  },
} satisfies Config;
```

- [ ] **Step 5: Replace default app/page.tsx and app/layout.tsx with empty shells**

`app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kismet Finance Group",
  description: "Strategic introductions for Australians who want their money to do more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

`app/page.tsx`:
```tsx
export default function Home() {
  return <main>Kismet (under construction)</main>;
}
```

- [ ] **Step 6: Run build to confirm clean compile**

Run:
```bash
npm run build
```
Expected: Build succeeds with no errors.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js app with Kismet brand tokens"
```

---

## Task 2: Install fonts and confirm visual baseline

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Add Montserrat via next/font**

Update `app/layout.tsx` head section:
```tsx
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"], display: "swap", variable: "--font-montserrat" });

export const metadata: Metadata = {
  title: "Kismet Finance Group",
  description: "Strategic introductions for Australians who want their money to do more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Note Berlingske Serif unavailability**

Add to `README.md`:
```markdown
## Fonts

- Body: Montserrat (Google Fonts, loaded via `next/font`).
- Headlines: Berlingske Serif per brand guide. License not yet confirmed. Falls back to Georgia until Shane provides webfont files. Drop `.woff2` files in `public/fonts/` and add `@font-face` block in `app/globals.css` when available.
```

- [ ] **Step 3: Verify fonts load**

Run `npm run dev`, open http://localhost:3000, confirm Montserrat visible. Stop server.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: load Montserrat via next/font, document Berlingske status"
```

---

## Task 3: Build SiteHeader and SiteFooter shell

**Files:**
- Create: `components/SiteHeader.tsx`, `components/SiteFooter.tsx`, `components/ComplianceLine.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create ComplianceLine component**

`components/ComplianceLine.tsx`:
```tsx
export function ComplianceLine({ className = "" }: { className?: string }) {
  return (
    <p className={`text-xs text-neutral/70 leading-relaxed ${className}`}>
      Kismet Finance Group is an introducer. We are not licensed financial advisors and
      do not provide personal financial advice. Information here is general only.
      Always seek advice from a licensed professional before making financial decisions.
    </p>
  );
}
```

- [ ] **Step 2: Create SiteHeader**

`components/SiteHeader.tsx`:
```tsx
import Link from "next/link";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/approach", label: "How we work" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-navy-deep/80 backdrop-blur border-b border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-serif text-xl tracking-wide text-gold">
          KISMET
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-wider text-white/80">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-gold transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="text-xs uppercase tracking-wider font-semibold px-5 py-2.5 rounded bg-gold-gradient text-navy-deep shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-shadow"
        >
          Book a call
        </Link>
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Create SiteFooter**

`components/SiteFooter.tsx`:
```tsx
import Link from "next/link";
import { ComplianceLine } from "./ComplianceLine";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-navy-deep border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <Link href="/" className="font-serif text-xl text-gold">KISMET</Link>
          <p className="mt-3 text-sm text-white/60">
            Strategic introductions for Australians who want their money to do more.
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-wider text-gold mb-3">Site</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/approach">How we work</Link></li>
            <li><Link href="/insights">Insights</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-wider text-gold mb-3">Get in touch</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><a href="mailto:hello@kismetfinancegroup.com.au">hello@kismetfinancegroup.com.au</a></li>
            <li><a href="tel:+61000000000">(phone TBC)</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-wider text-gold mb-3">Legal</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link href="/privacy">Privacy</Link></li>
            <li>ABN: (TBC)</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <ComplianceLine />
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Wire header and footer into root layout**

Update `app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"], display: "swap", variable: "--font-montserrat" });

export const metadata: Metadata = {
  title: "Kismet Finance Group",
  description: "Strategic introductions for Australians who want their money to do more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="font-sans bg-navy-deep text-white min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Visual check**

Run `npm run dev`, visit http://localhost:3000. Confirm header is sticky navy with gold logo + Book a call button, footer has 4 columns + compliance line.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add SiteHeader, SiteFooter, ComplianceLine"
```

---

## Task 4: Build Hero and Home page

**Files:**
- Create: `components/Hero.tsx`, `components/StatBar.tsx`, `components/ValueCardRow.tsx`, `components/TestimonialBlock.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create Hero component**

`components/Hero.tsx`:
```tsx
import Link from "next/link";

interface HeroProps {
  eyebrow: string;
  headline: React.ReactNode;
  sub: string;
  ctaLabel: string;
  ctaHref: string;
}

export function Hero({ eyebrow, headline, sub, ctaLabel, ctaHref }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.18),transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-24">
        <span className="inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-wider bg-gold/15 text-gold border border-gold/40 mb-6">
          {eyebrow}
        </span>
        <h1 className="font-serif text-4xl md:text-6xl leading-tight max-w-4xl">{headline}</h1>
        <p className="mt-6 text-lg text-white/75 max-w-2xl leading-relaxed">{sub}</p>
        <Link
          href={ctaHref}
          className="inline-block mt-10 text-xs uppercase tracking-wider font-semibold px-7 py-3.5 rounded bg-gold-gradient text-navy-deep shadow-lg shadow-gold/25 hover:shadow-gold/45 transition-shadow"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create StatBar component**

`components/StatBar.tsx`:
```tsx
interface Stat { value: string; label: string; }

export function StatBar({ stats }: { stats: Stat[] }) {
  return (
    <section className="border-y border-white/10 bg-navy-deep/60">
      <div className="mx-auto max-w-6xl px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="font-serif text-3xl text-gold">{s.value}</div>
            <div className="mt-1 text-sm text-white/65">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create ValueCardRow component**

`components/ValueCardRow.tsx`:
```tsx
interface Card { title: string; body: string; }

export function ValueCardRow({ heading, cards }: { heading: string; cards: Card[] }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="font-serif text-3xl md:text-4xl mb-12 max-w-2xl">{heading}</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((c) => (
          <div key={c.title} className="rounded-lg border border-white/10 bg-white/5 p-6 hover:border-gold/40 transition-colors">
            <h3 className="font-serif text-xl text-gold mb-3">{c.title}</h3>
            <p className="text-sm text-white/75 leading-relaxed">{c.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create TestimonialBlock component**

`components/TestimonialBlock.tsx`:
```tsx
interface Testimonial { quote: string; name: string; context: string; }

export function TestimonialBlock({ items }: { items: Testimonial[] }) {
  return (
    <section className="bg-navy-deep border-y border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-20 grid gap-10 md:grid-cols-3">
        {items.map((t, i) => (
          <figure key={i} className="space-y-4">
            <blockquote className="font-serif text-lg leading-relaxed text-white/90">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="text-sm">
              <div className="text-gold">{t.name}</div>
              <div className="text-white/55">{t.context}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Compose home page**

All copy below is explicitly marked as voice-placeholder. The structure is what we are testing here, not the words. Shane's real voice replaces every placeholder block in Task 16.

Replace `app/page.tsx`:
```tsx
import { Hero } from "@/components/Hero";
import { StatBar } from "@/components/StatBar";
import { ValueCardRow } from "@/components/ValueCardRow";
import { TestimonialBlock } from "@/components/TestimonialBlock";

export default function Home() {
  return (
    <>
      <Hero
        eyebrow="[VOICE PLACEHOLDER: short eyebrow line, max 4 words, positioning Kismet as strategic coordinator. Avoid 'Strategic Connections', too generic.]"
        headline={<span className="placeholder-copy">[VOICE PLACEHOLDER: outcome-led headline. One sentence. Not punchy marketing speak. Boutique consultancy tone.]</span>}
        sub="[VOICE PLACEHOLDER: 1-2 sentence subhead. Speaks to a specific kind of Australian (e.g. someone earning well but not yet investing strategically). No 'most people' generalities.]"
        ctaLabel="Book a private call"
        ctaHref="/contact"
      />
      {/* StatBar deliberately omitted from v1 home page until Shane provides audited, source-able numbers.
          Manufactured stats erode trust on a boutique consultancy site. Re-add in Task 17 if numbers exist. */}
      <ValueCardRow
        heading="[VOICE PLACEHOLDER: section header. One short line. Replace; not 'What Kismet does'.]"
        cards={[
          { title: "[VOICE PLACEHOLDER: 2-3 word title]", body: "[VOICE PLACEHOLDER: 1-2 sentences. Position as orchestrator/coordinator, not connector or middleman. No 'we open doors' framing.]" },
          { title: "[VOICE PLACEHOLDER: 2-3 word title]", body: "[VOICE PLACEHOLDER: 1-2 sentences.]" },
          { title: "[VOICE PLACEHOLDER: 2-3 word title]", body: "[VOICE PLACEHOLDER: 1-2 sentences.]" },
        ]}
      />
      <TestimonialBlock
        items={[
          { quote: "[VOICE PLACEHOLDER: real testimonial copy from current site, picked by Shane in Task 17]", name: "[Name]", context: "[Context]" },
          { quote: "[VOICE PLACEHOLDER]", name: "[Name]", context: "[Context]" },
          { quote: "[VOICE PLACEHOLDER]", name: "[Name]", context: "[Context]" },
        ]}
      />
    </>
  );
}
```

**StatBar is deliberately omitted from the home page composition for v1.** Manufactured stats erode trust on a boutique consultancy site. The component still exists for use elsewhere if Shane provides audited, source-able numbers. Re-evaluate in Task 17.

- [ ] **Step 6: Visual check**

Run `npm run dev`, visit http://localhost:3000. Confirm hero with gold gradient headline, stat bar, three value cards with hover, three testimonials.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: build home page with Hero, StatBar, ValueCardRow, TestimonialBlock"
```

---

## Checkpoint A: Design quality review (Home page)

**Hard gate before Task 5 begins.** No more pages get built until the home page passes this review.

- [ ] **Step 1: Push a Vercel preview deploy of just the home page**

Push the current branch to Vercel (preview env). Capture the preview URL.

- [ ] **Step 2: Self-audit against the quality bar**

Run the 10-point self-check in the Conventions section against the live preview. For each "no", fix it before showing Shane.

Specifically check on a real phone-width view (375px and 414px):
- Hero headline does not break awkwardly mid-line
- Vertical spacing rhythm is consistent (no random tight/loose blocks)
- Typography hierarchy is unmistakable (eyebrow vs headline vs subhead vs CTA)
- CTA is single, prominent, and obvious
- Value cards stack cleanly with proper padding, not cramped
- Testimonial blocks have breathing room
- Footer compliance line is readable, not squashed

- [ ] **Step 3: Self-audit against AI-tells**

Search the rendered home page for any of these and remove if found:
- "delve", "leverage", "unlock", "navigate", "in today's", "passionate", "empower", "harness", "robust", "seamless", "cutting-edge"
- Any three-bullet list that exists for symmetry rather than substance
- Any sentence Shane would not actually say out loud

(All copy is voice-placeholder at this stage. The check applies once Shane's voice replaces the placeholders in Task 16, but run it now on the placeholder text to confirm nothing snuck in.)

- [ ] **Step 4: Hand the preview URL to Shane**

Send Shane the preview URL with a one-liner: "Home page preview. Open on your phone first. Tell me what to fix before I build the rest."

Wait for Shane's response. Possible outcomes:
- **Approved**: proceed to Task 5.
- **Specific fixes**: implement them, redeploy preview, hand back. Repeat until approved.
- **Direction shift**: stop. Revisit the design spec with Shane before continuing.

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git commit -m "refine: home page design pass per Shane review"
```

Do not skip this checkpoint. Building 4 more pages on a home page Shane has not approved guarantees rework.

---

## Task 5: Build About page

**Files:**
- Create: `app/about/page.tsx`

- [ ] **Step 1: Compose About page**

All copy below is voice-placeholder. Structure only. Real Shane voice replaces every block in Task 16.

`app/about/page.tsx`:
```tsx
import { Hero } from "@/components/Hero";

export default function About() {
  return (
    <>
      <Hero
        eyebrow="About"
        headline={<span className="placeholder-copy">[VOICE PLACEHOLDER: about-page headline. One sentence. Anchored in Shane and Josh as operators, not branded "founders". No "two operators, one mission" cliche.]</span>}
        sub="[VOICE PLACEHOLDER: 1-2 sentence subhead. Why Kismet exists, in Shane's words. No 'we believe', 'we are passionate', 'we wanted to flip'.]"
        ctaLabel="Book a private call"
        ctaHref="/contact"
      />
      <section className="mx-auto max-w-3xl px-6 py-20 prose prose-invert prose-headings:font-serif prose-headings:text-gold prose-a:text-gold">
        <h2>[VOICE PLACEHOLDER: section heading]</h2>
        <p className="placeholder-copy">[VOICE PLACEHOLDER: founder origin in Shane's voice. Concrete, specific. What he did before, what he saw, what he chose to build instead. From ChatGPT export.]</p>

        <h2>[VOICE PLACEHOLDER: section heading, e.g. "Who we built this for"]</h2>
        <p className="placeholder-copy">[VOICE PLACEHOLDER: target client described in plain language. Specific, not "high net worth" or "everyday Australians". A person Shane has actually sat across the table from.]</p>

        <h2>[VOICE PLACEHOLDER: section heading, e.g. "How we operate"]</h2>
        <p className="placeholder-copy">[VOICE PLACEHOLDER: short paragraph framing Kismet as strategic coordinators sitting above the network. Mentions Shane, Josh, Amy (joining 2026-06-01) by first name. No "the team" reflex header.]</p>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Add a small CSS hook for placeholder visibility (dev only)**

Append to `app/globals.css`:
```css
.placeholder-copy {
  outline: 1px dashed rgba(212,175,55,0.4);
  outline-offset: 4px;
}
```
Note: this is intentional. Anything still wearing this dashed gold outline at sign-off time has not been replaced with real Shane copy yet.

- [ ] **Step 3: Visual check**

Run `npm run dev`, visit http://localhost:3000/about. Confirm page renders, placeholder blocks visibly outlined.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: scaffold About page (copy placeholders pending ChatGPT export)"
```

---

## Task 6: Build How We Work (Approach) page

**Files:**
- Create: `app/approach/page.tsx`

- [ ] **Step 1: Compose Approach page**

All copy below is voice-placeholder. Structure only.

`app/approach/page.tsx`:
```tsx
import { Hero } from "@/components/Hero";
import { ComplianceLine } from "@/components/ComplianceLine";

export default function Approach() {
  return (
    <>
      <Hero
        eyebrow="How we work"
        headline={<span className="placeholder-copy">[VOICE PLACEHOLDER: approach-page headline. One sentence. Frames Kismet as the strategic coordinator clients keep across multiple partners over years. NOT 'we open doors'.]</span>}
        sub="[VOICE PLACEHOLDER: 1-2 sentence subhead. Sets the expectation that this is a long-term coordination relationship, not a one-shot referral.]"
        ctaLabel="Book a private call"
        ctaHref="/contact"
      />

      <section className="mx-auto max-w-3xl px-6 py-20 space-y-12">
        {[
          { n: "01", title: "[VOICE PLACEHOLDER: step title]", body: "[VOICE PLACEHOLDER: 2-3 sentences in Shane's voice. Discovery / intake step.]" },
          { n: "02", title: "[VOICE PLACEHOLDER: step title]", body: "[VOICE PLACEHOLDER: 2-3 sentences. Strategy/coordination step. Frame as Shane convening the right specialists, not 'connecting' them.]" },
          { n: "03", title: "[VOICE PLACEHOLDER: step title]", body: "[VOICE PLACEHOLDER: 2-3 sentences. Ongoing oversight step.]" },
          { n: "04", title: "[VOICE PLACEHOLDER: step title]", body: "[VOICE PLACEHOLDER: 2-3 sentences. Decision-rights/compliance posture.]" },
        ].map((s) => (
          <div key={s.n} className="grid grid-cols-[auto_1fr] gap-6 placeholder-copy">
            <div className="font-serif text-3xl text-gold">{s.n}</div>
            <div>
              <h2 className="font-serif text-2xl mb-2">{s.title}</h2>
              <p className="text-white/80 leading-relaxed">{s.body}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="bg-navy-deep border-y border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <h2 className="font-serif text-2xl text-gold mb-4">A note on what we are, and aren't</h2>
          <p className="text-white/80 leading-relaxed mb-4">
            Kismet Finance Group is a strategic introducer and coordinator. We do not
            hold an Australian Financial Services Licence. We do not provide personal
            financial advice. We do not sell financial products. The licensed brokers,
            advisers and specialists you meet through us are independently regulated.
            Their advice is theirs.
          </p>
          <ComplianceLine />
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Visual check**

Run dev server, visit /approach. Confirm 4-step layout with gold numbers and the compliance section at the bottom.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: scaffold Approach (How We Work) page"
```

---

## Task 7: Build Insights index and article rendering

**Files:**
- Create: `lib/articles.ts`, `app/insights/page.tsx`, `app/insights/[slug]/page.tsx`, `components/ArticleCard.tsx`, `components/ArticleLayout.tsx`, `content/insights/10-minute-money-reset.md`, `content/insights/borrowing-power-myths.md`, `content/insights/smsf-property-plain-english.md`
- Test: `tests/articles.test.ts`

- [ ] **Step 1: Install markdown dependencies**

Run:
```bash
npm install gray-matter remark remark-html
npm install -D vitest @vitest/ui
```

- [ ] **Step 2: Add a vitest config and npm script**

Create `vitest.config.ts`:
```typescript
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
  test: { environment: "node" },
});
```

Add to `package.json` scripts:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Write the failing test for the article loader**

`tests/articles.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import { listArticles, getArticle } from "@/lib/articles";

describe("articles loader", () => {
  it("lists all articles with metadata", async () => {
    const articles = await listArticles();
    expect(articles.length).toBeGreaterThanOrEqual(3);
    expect(articles[0]).toMatchObject({
      slug: expect.any(String),
      title: expect.any(String),
      summary: expect.any(String),
      date: expect.any(String),
      readMinutes: expect.any(Number),
    });
  });

  it("returns a single article with rendered HTML", async () => {
    const articles = await listArticles();
    const first = await getArticle(articles[0].slug);
    expect(first).toBeTruthy();
    expect(first!.html).toContain("<");
    expect(first!.title).toBe(articles[0].title);
  });

  it("returns null for unknown slug", async () => {
    const result = await getArticle("does-not-exist");
    expect(result).toBeNull();
  });
});
```

- [ ] **Step 4: Run test, confirm it fails**

```bash
npm test
```
Expected: 3 failures (module `@/lib/articles` not found).

- [ ] **Step 5: Create three starter article files**

`content/insights/10-minute-money-reset.md`:
```markdown
---
title: "The 10-Minute Money Reset"
summary: "[PLACEHOLDER] A short read on the questions to ask yourself before you do anything else."
date: "2026-05-07"
readMinutes: 8
---

[PLACEHOLDER, REPLACE WITH SHANE-VOICE COPY FROM CHATGPT EXPORT OR THE EXISTING LEAD MAGNET PDF.]

This article walks through the 10-minute money reset. Replace this body with the
actual content sourced from the existing lead magnet, rewritten in Shane's voice.
```

`content/insights/borrowing-power-myths.md`:
```markdown
---
title: "What everyday Aussies miss about borrowing power"
summary: "[PLACEHOLDER] The three things lenders actually look at, in plain English."
date: "2026-05-07"
readMinutes: 6
---

[PLACEHOLDER, REPLACE WITH SHANE-VOICE COPY.]

The most common misconceptions about borrowing power, explained without the jargon.
```

`content/insights/smsf-property-plain-english.md`:
```markdown
---
title: "SMSF property in plain English"
summary: "[PLACEHOLDER] What it is, who it's for, and the questions to ask before you start."
date: "2026-05-07"
readMinutes: 7
---

[PLACEHOLDER, REPLACE WITH SHANE-VOICE COPY.]

A primer on using a self-managed super fund to hold property. General information only,
not advice.
```

- [ ] **Step 6: Implement the article loader**

`lib/articles.ts`:
```typescript
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const ARTICLES_DIR = path.join(process.cwd(), "content", "insights");

export interface ArticleMeta {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readMinutes: number;
}

export interface Article extends ArticleMeta {
  html: string;
}

async function readArticleFile(filename: string): Promise<Article> {
  const slug = filename.replace(/\.md$/, "");
  const raw = await fs.readFile(path.join(ARTICLES_DIR, filename), "utf8");
  const parsed = matter(raw);
  const data = parsed.data as Omit<ArticleMeta, "slug">;
  const rendered = await remark().use(html).process(parsed.content);
  return {
    slug,
    title: data.title,
    summary: data.summary,
    date: data.date,
    readMinutes: data.readMinutes,
    html: String(rendered),
  };
}

export async function listArticles(): Promise<ArticleMeta[]> {
  const files = await fs.readdir(ARTICLES_DIR);
  const articles = await Promise.all(files.filter((f) => f.endsWith(".md")).map(readArticleFile));
  return articles
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(({ html: _html, ...meta }) => meta);
}

export async function getArticle(slug: string): Promise<Article | null> {
  try {
    return await readArticleFile(`${slug}.md`);
  } catch {
    return null;
  }
}
```

- [ ] **Step 7: Run test, confirm pass**

```bash
npm test
```
Expected: 3 passing.

- [ ] **Step 8: Create ArticleCard and ArticleLayout components**

`components/ArticleCard.tsx`:
```tsx
import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";

export function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link
      href={`/insights/${article.slug}`}
      className="block rounded-lg border border-white/10 bg-white/5 p-6 hover:border-gold/40 transition-colors"
    >
      <div className="text-xs uppercase tracking-wider text-gold mb-3">{article.readMinutes} min read</div>
      <h3 className="font-serif text-xl mb-3">{article.title}</h3>
      <p className="text-sm text-white/70 leading-relaxed">{article.summary}</p>
    </Link>
  );
}
```

`components/ArticleLayout.tsx`:
```tsx
import type { Article } from "@/lib/articles";
import { ComplianceLine } from "./ComplianceLine";

export function ArticleLayout({ article }: { article: Article }) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <div className="text-xs uppercase tracking-wider text-gold mb-4">
        {article.readMinutes} min read
      </div>
      <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-6">{article.title}</h1>
      <p className="text-lg text-white/75 mb-12">{article.summary}</p>
      <div
        className="prose prose-invert prose-headings:font-serif prose-headings:text-gold prose-a:text-gold max-w-none"
        dangerouslySetInnerHTML={{ __html: article.html }}
      />
      <div className="mt-16 pt-8 border-t border-white/10">
        <ComplianceLine />
      </div>
    </article>
  );
}
```

- [ ] **Step 9: Install Tailwind typography plugin**

```bash
npm install -D @tailwindcss/typography
```

Add to `tailwind.config.ts` plugins array:
```typescript
import typography from "@tailwindcss/typography";
// ...
  plugins: [typography],
```

- [ ] **Step 10: Build the Insights index page**

`app/insights/page.tsx`:
```tsx
import { Hero } from "@/components/Hero";
import { ArticleCard } from "@/components/ArticleCard";
import { listArticles } from "@/lib/articles";

export default async function Insights() {
  const articles = await listArticles();
  return (
    <>
      <Hero
        eyebrow="Insights"
        headline={<>What we tell people <span className="bg-gold-gradient bg-clip-text text-transparent italic">over coffee.</span></>}
        sub="Short reads on the things most Australians never get told about money, lending, and property."
        ctaLabel="Book a strategy call"
        ctaHref="/contact"
      />
      <section className="mx-auto max-w-6xl px-6 py-20 grid gap-6 md:grid-cols-3">
        {articles.map((a) => <ArticleCard key={a.slug} article={a} />)}
      </section>
    </>
  );
}
```

- [ ] **Step 11: Build the article page**

`app/insights/[slug]/page.tsx`:
```tsx
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/ArticleLayout";
import { getArticle, listArticles } from "@/lib/articles";

export async function generateStaticParams() {
  const articles = await listArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();
  return <ArticleLayout article={article} />;
}
```

- [ ] **Step 12: Visual check**

Run dev server, visit /insights, confirm 3 cards. Click into one, confirm article renders with placeholder body.

- [ ] **Step 13: Commit**

```bash
git add -A
git commit -m "feat: insights index, markdown article loader, 3 starter articles"
```

---

## Task 8: Build Lead form route handler with tests

**Files:**
- Create: `lib/email.ts`, `lib/sheets.ts`, `app/api/lead/route.ts`, `tests/lead-route.test.ts`, `.env.example`

- [ ] **Step 1: Install dependencies**

```bash
npm install resend googleapis zod
```

- [ ] **Step 2: Document required env vars**

`.env.example`:
```
RESEND_API_KEY=re_xxx
LEAD_INBOX_TO=shane@kismetfinancegroup.com.au
LEAD_INBOX_FROM=hello@kismetfinancegroup.com.au

GOOGLE_SHEETS_ID=
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_SERVICE_ACCOUNT_KEY=

NEXT_PUBLIC_BOOKING_URL=https://calendly.com/kismet/strategy-call
NEXT_PUBLIC_GA_ID=G-XXXXXXX
```

- [ ] **Step 3: Write failing tests for the lead route**

`tests/lead-route.test.ts`:
```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "@/app/api/lead/route";

vi.mock("@/lib/email", () => ({ sendLeadEmail: vi.fn().mockResolvedValue({ id: "msg_1" }) }));
vi.mock("@/lib/sheets", () => ({ appendLeadRow: vi.fn().mockResolvedValue(true) }));

import { sendLeadEmail } from "@/lib/email";
import { appendLeadRow } from "@/lib/sheets";

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/lead", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/lead", () => {
  beforeEach(() => vi.clearAllMocks());

  it("rejects empty body", async () => {
    const res = await POST(makeRequest({}));
    expect(res.status).toBe(400);
  });

  it("rejects bad email", async () => {
    const res = await POST(makeRequest({ name: "X", email: "not-an-email", phone: "0400000000", message: "hi" }));
    expect(res.status).toBe(400);
  });

  it("accepts valid lead, calls email + sheet", async () => {
    const res = await POST(makeRequest({ name: "Daniel", email: "d@example.com", phone: "0400000000", message: "Tell me more" }));
    expect(res.status).toBe(200);
    expect(sendLeadEmail).toHaveBeenCalledOnce();
    expect(appendLeadRow).toHaveBeenCalledOnce();
  });

  it("returns 500 if email fails", async () => {
    vi.mocked(sendLeadEmail).mockRejectedValueOnce(new Error("resend down"));
    const res = await POST(makeRequest({ name: "Daniel", email: "d@example.com", phone: "0400000000", message: "Tell me more" }));
    expect(res.status).toBe(500);
  });
});
```

- [ ] **Step 4: Run test, confirm 4 failures (modules missing)**

```bash
npm test
```
Expected: 4 failing.

- [ ] **Step 5: Implement email helper**

`lib/email.ts`:
```typescript
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface LeadEmailInput {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export async function sendLeadEmail(input: LeadEmailInput) {
  const to = process.env.LEAD_INBOX_TO!;
  const from = process.env.LEAD_INBOX_FROM!;
  return resend.emails.send({
    to,
    from,
    replyTo: input.email,
    subject: `New Kismet lead: ${input.name}`,
    text: [
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      `Phone: ${input.phone}`,
      "",
      "Message:",
      input.message,
    ].join("\n"),
  });
}
```

- [ ] **Step 6: Implement sheets helper**

`lib/sheets.ts`:
```typescript
import { google } from "googleapis";

export interface LeadRow {
  name: string;
  email: string;
  phone: string;
  message: string;
  submittedAt: string;
}

export async function appendLeadRow(row: LeadRow): Promise<boolean> {
  const auth = new google.auth.JWT(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    undefined,
    process.env.GOOGLE_SERVICE_ACCOUNT_KEY?.replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/spreadsheets"]
  );
  const sheets = google.sheets({ version: "v4", auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: "Leads!A:E",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[row.submittedAt, row.name, row.email, row.phone, row.message]],
    },
  });
  return true;
}
```

- [ ] **Step 7: Implement the route handler**

`app/api/lead/route.ts`:
```typescript
import { NextResponse } from "next/server";
import { z } from "zod";
import { sendLeadEmail } from "@/lib/email";
import { appendLeadRow } from "@/lib/sheets";

const Schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(6),
  message: z.string().min(1),
});

export async function POST(req: Request) {
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "invalid json" }, { status: 400 }); }
  const parsed = Schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "invalid input" }, { status: 400 });

  try {
    await Promise.all([
      sendLeadEmail(parsed.data),
      appendLeadRow({ ...parsed.data, submittedAt: new Date().toISOString() }),
    ]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("lead route failed", err);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
```

- [ ] **Step 8: Run tests, confirm pass**

```bash
npm test
```
Expected: 4 passing.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: lead form API route with Resend + Google Sheets"
```

---

## Task 9: Build LeadForm and BookingEmbed components, Contact page

**Files:**
- Create: `components/LeadForm.tsx`, `components/BookingEmbed.tsx`, `app/contact/page.tsx`

- [ ] **Step 1: Build LeadForm (client component)**

`components/LeadForm.tsx`:
```tsx
"use client";
import { useState } from "react";

type Status = "idle" | "loading" | "ok" | "error";

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    setStatus(res.ok ? "ok" : "error");
    if (res.ok) (e.target as HTMLFormElement).reset();
  }

  if (status === "ok") {
    return (
      <div className="rounded-lg border border-gold/40 bg-gold/5 p-6 text-center">
        <p className="font-serif text-xl text-gold mb-2">Got it.</p>
        <p className="text-white/80">We will be in touch within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Field label="Name" name="name" type="text" required />
      <Field label="Email" name="email" type="email" required />
      <Field label="Phone" name="phone" type="tel" required />
      <div>
        <label htmlFor="message" className="block text-xs uppercase tracking-wider text-gold mb-2">
          What's on your mind?
        </label>
        <textarea
          id="message" name="message" required rows={4}
          className="w-full bg-white/5 border border-white/15 rounded p-3 text-sm text-white focus:border-gold focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full text-xs uppercase tracking-wider font-semibold px-7 py-3.5 rounded bg-gold-gradient text-navy-deep shadow-lg shadow-gold/25 hover:shadow-gold/45 transition-shadow disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Send"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-400">Something broke on our end. Try again or email hello@kismetfinancegroup.com.au.</p>
      )}
    </form>
  );
}

function Field({ label, name, type, required }: { label: string; name: string; type: string; required?: boolean; }) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs uppercase tracking-wider text-gold mb-2">{label}</label>
      <input
        id={name} name={name} type={type} required={required}
        className="w-full bg-white/5 border border-white/15 rounded p-3 text-sm text-white focus:border-gold focus:outline-none"
      />
    </div>
  );
}
```

- [ ] **Step 2: Build BookingEmbed**

`components/BookingEmbed.tsx`:
```tsx
export function BookingEmbed() {
  const url = process.env.NEXT_PUBLIC_BOOKING_URL ?? "";
  if (!url) {
    return (
      <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-sm text-white/70">
        Booking link not configured. Set <code className="text-gold">NEXT_PUBLIC_BOOKING_URL</code> to enable the embed.
      </div>
    );
  }
  return (
    <iframe
      src={url}
      title="Book a Kismet strategy call"
      className="w-full h-[700px] rounded-lg border border-white/10 bg-white"
    />
  );
}
```

- [ ] **Step 3: Compose Contact page**

`app/contact/page.tsx`:
```tsx
import { Hero } from "@/components/Hero";
import { BookingEmbed } from "@/components/BookingEmbed";
import { LeadForm } from "@/components/LeadForm";

export default function Contact() {
  return (
    <>
      <Hero
        eyebrow="Contact"
        headline={<>Pick a time, <span className="bg-gold-gradient bg-clip-text text-transparent italic">or send a note.</span></>}
        sub="Fastest way to a real conversation is to book directly. Prefer to write? Drop a message below and we will respond within one business day."
        ctaLabel="Skip to the form"
        ctaHref="#message"
      />

      <section className="mx-auto max-w-6xl px-6 py-16 grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-2xl text-gold mb-6">Book a strategy call</h2>
          <BookingEmbed />
        </div>
        <div id="message">
          <h2 className="font-serif text-2xl text-gold mb-6">Or send a message</h2>
          <LeadForm />
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 4: Visual check**

Run dev, visit /contact. Confirm two-column layout. Booking shows "not configured" message until env var is set. Form renders.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: Contact page with LeadForm + BookingEmbed"
```

---

## Task 10: Newsletter signup component

**Files:**
- Create: `components/NewsletterSignup.tsx`
- Modify: `components/SiteFooter.tsx`

- [ ] **Step 1: Build NewsletterSignup as a deferred-provider stub**

`components/NewsletterSignup.tsx`:
```tsx
"use client";
import { useState } from "react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const action = process.env.NEXT_PUBLIC_NEWSLETTER_ACTION;

  if (!action) {
    return (
      <p className="text-xs text-white/50 italic">
        Newsletter signup goes here. Configure <code className="text-gold">NEXT_PUBLIC_NEWSLETTER_ACTION</code> when Shane picks Mailchimp / ConvertKit / Beehiiv.
      </p>
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch(action!, {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ email }).toString(),
      });
      setStatus(res.ok ? "ok" : "error");
      if (res.ok) setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") return <p className="text-sm text-gold">Thanks. Keep an eye on your inbox.</p>;

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
        placeholder="Email" className="flex-1 bg-white/5 border border-white/15 rounded px-3 py-2 text-sm text-white"
      />
      <button type="submit" className="text-xs uppercase tracking-wider font-semibold px-4 rounded bg-gold-gradient text-navy-deep">Join</button>
    </form>
  );
}
```

- [ ] **Step 2: Add it into the footer**

In `components/SiteFooter.tsx`, replace the "Get in touch" column with:
```tsx
        <div>
          <h4 className="text-xs uppercase tracking-wider text-gold mb-3">Get in touch</h4>
          <ul className="space-y-2 text-sm text-white/70 mb-4">
            <li><a href="mailto:hello@kismetfinancegroup.com.au">hello@kismetfinancegroup.com.au</a></li>
            <li><a href="tel:+61000000000">(phone TBC)</a></li>
          </ul>
          <NewsletterSignup />
        </div>
```
And add `import { NewsletterSignup } from "./NewsletterSignup";` at the top.

- [ ] **Step 3: Visual check**

Confirm footer shows the placeholder italics line until provider chosen.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: newsletter signup stub (provider TBD)"
```

---

## Task 11: Analytics

**Files:**
- Modify: `app/layout.tsx`, `package.json`

- [ ] **Step 1: Install Vercel Analytics**

```bash
npm install @vercel/analytics
```

- [ ] **Step 2: Add Analytics + GA4 to root layout**

Update `app/layout.tsx` body:
```tsx
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

// inside RootLayout body:
<body className="font-sans bg-navy-deep text-white min-h-screen flex flex-col">
  <SiteHeader />
  <main className="flex-1">{children}</main>
  <SiteFooter />
  <Analytics />
  {process.env.NEXT_PUBLIC_GA_ID && (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
      `}</Script>
    </>
  )}
</body>
```

- [ ] **Step 3: Build to confirm clean compile**

```bash
npm run build
```
Expected: success.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: Vercel Analytics + GA4 (gated on env var)"
```

---

## Task 12: CI gates: typecheck, lint, em-dash grep

**Files:**
- Create: `scripts/check-no-emdash.sh`, `.github/workflows/ci.yml`
- Modify: `package.json`

- [ ] **Step 1: Create the em-dash check script**

`scripts/check-no-emdash.sh`:
```bash
#!/usr/bin/env bash
set -euo pipefail
# Fail if any em-dash or en-dash appears in app, components, content, or lib code.
if grep -RIn $'[–—]' app components content lib 2>/dev/null; then
  echo ""
  echo "ERROR: Found em-dash or en-dash. Replace with period, comma, or parentheses."
  exit 1
fi
echo "OK: no em-dashes found."
```
Make executable: `chmod +x scripts/check-no-emdash.sh`

- [ ] **Step 2: Add npm scripts**

In `package.json` scripts:
```json
"typecheck": "tsc --noEmit",
"check:emdash": "bash scripts/check-no-emdash.sh",
"check": "npm run typecheck && npm run check:emdash && npm test"
```

- [ ] **Step 3: Run the full check locally**

```bash
npm run check
```
Expected: all pass.

- [ ] **Step 4: Add GitHub Actions workflow**

`.github/workflows/ci.yml`:
```yaml
name: CI
on:
  push: { branches: [main] }
  pull_request:
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "20", cache: "npm" }
      - run: npm ci
      - run: npm run check
      - run: npm run build
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: CI with typecheck, em-dash gate, tests, build"
```

---

## Task 13: Vercel project setup and preview deploy

**Files:**
- Create: `vercel.json` (optional)

- [ ] **Step 1: Push the repo to GitHub**

Manual step for Shane (or done via gh CLI when available):
```bash
gh repo create kismetfinancegroup/kismet-website --private --source=. --remote=origin --push
```
If `gh` is not installed, create a private repo on GitHub manually, then `git remote add origin <url> && git push -u origin main`.

- [ ] **Step 2: Connect Vercel project via MCP**

Use the Vercel MCP `deploy_to_vercel` flow against the GitHub repo. Confirm framework auto-detected as Next.js.

- [ ] **Step 3: Set environment variables in Vercel dashboard**

Add (Production + Preview):
- `RESEND_API_KEY`
- `LEAD_INBOX_TO` = shane@kismetfinancegroup.com.au
- `LEAD_INBOX_FROM` = hello@kismetfinancegroup.com.au (must be on a verified Resend domain)
- `GOOGLE_SHEETS_ID`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_SERVICE_ACCOUNT_KEY` (paste full key with literal `\n` for newlines)
- `NEXT_PUBLIC_BOOKING_URL`
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_NEWSLETTER_ACTION` (when chosen)

- [ ] **Step 4: Trigger preview deploy**

Push a branch (e.g. `feat/preview-deploy`) and confirm Vercel produces a preview URL. Open it. Confirm:
- All 5 pages load.
- Footer shows compliance line.
- Lead form posts (use a test entry, confirm email arrives, confirm sheet row appears).
- Booking iframe renders if URL configured.

- [ ] **Step 5: Commit any Vercel config**

```bash
git add -A
git commit -m "chore: Vercel deploy config"
```

---

## Task 14: Resend + Google Sheets end-to-end live test

This is a manual checkpoint task. Do not skip.

- [ ] **Step 1: Verify Resend domain**

In Resend dashboard, confirm `kismetfinancegroup.com.au` is verified for sending. If not, add SPF/DKIM/DMARC records to DNS and verify before continuing.

- [ ] **Step 2: Create Google Sheet and share with service account**

Create a new sheet "Kismet Website Leads", create a sheet/tab named "Leads" with columns: `submittedAt | name | email | phone | message`. Share the spreadsheet (Editor) with the service account email.

- [ ] **Step 3: Submit a real test lead from preview URL**

Submit name "Test Submission", your own email, your own phone, message "Live e2e test". Confirm:
- Email lands in Shane's inbox.
- Row appears in the Google Sheet within 5 seconds.

- [ ] **Step 4: Document outcome**

Append result to `README.md` under a "Live test log" section with date and notes.

- [ ] **Step 5: Commit**

```bash
git add README.md
git commit -m "docs: log live e2e test pass for lead pipeline"
```

---

## Task 15: Lighthouse and accessibility pass

- [ ] **Step 1: Run Lighthouse on preview URL**

In Chrome DevTools, run Lighthouse mobile against the preview URL home page.

- [ ] **Step 2: Document baseline**

Append to `README.md`:
```markdown
## Lighthouse baseline (preview)

Date: YYYY-MM-DD
- Performance: NN
- Accessibility: NN
- Best Practices: NN
- SEO: NN
```

- [ ] **Step 3: Triage any score below target**

Targets: Performance ≥ 90 (mobile), Accessibility ≥ 95.

Common fixes if needed: image dimensions explicit, alt text, font preload, eliminate render-blocking scripts. Apply minimal targeted fixes only. Do not refactor for fun.

- [ ] **Step 4: Re-run, document final scores**

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: Lighthouse pass, document baseline"
```

---

## Task 16: ChatGPT export ingestion and copy pass

This task is gated on Shane delivering the ChatGPT export.

**Files:**
- Modify: any file containing `placeholder-copy` class or `[PLACEHOLDER` text

- [ ] **Step 1: Locate the export Shane provides**

Expected location: `C:\Users\Shane\Downloads\chatgpt-export.zip` or similar. Unzip and read `conversations.json`.

- [ ] **Step 2: Build a Shane-voice profile**

Read enough of the export to extract:
- Recurring phrases, sentence rhythm, opener patterns.
- Stories, anecdotes, founder narrative.
- Stated values and beliefs.
- How he describes the business, the team, partners.

Save a `voice-notes.md` working file in the project (gitignored) for reference while writing.

- [ ] **Step 3: Replace each placeholder block in the codebase**

Search for `placeholder-copy` and `[PLACEHOLDER` and replace with real Shane-voice copy. After each page, run the no-AI-tells checklist:
- No em-dashes or en-dashes
- No "delve", "leverage", "unlock", "navigate", "in today's...", "passionate about empowering"
- No three-item bulleted lists for the sake of it
- Reads like Shane wrote it (use the voice notes)

- [ ] **Step 4: Remove the dashed-outline dev hint**

Remove the `.placeholder-copy { outline ... }` block from `app/globals.css`.

- [ ] **Step 5: Run full check**

```bash
npm run check
```
Expected: pass.

- [ ] **Step 6: Visual check every page on preview deploy**

Confirm zero visible dashed gold outlines. Confirm copy reads as Shane.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: replace all placeholder copy with Shane-voice content"
```

---

## Task 17: Final review, real numbers, real testimonials

This task is gated on Shane providing real data.

- [ ] **Step 1: Replace stat bar placeholders**

In `app/page.tsx`, replace the three placeholder stat values with audited numbers from Shane.

- [ ] **Step 2: Replace home page testimonials**

Replace the three placeholder testimonials with the strongest 3 real ones (sourced from current site or fresh from Shane). Include real name, real context (suburb, project type if they consent).

- [ ] **Step 3: Replace footer ABN and phone**

In `components/SiteFooter.tsx`, replace `(TBC)` placeholders.

- [ ] **Step 4: Run full check**

```bash
npm run check && npm run build
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: real stats, testimonials, ABN, phone"
```

---

## Task 18: DNS cutover (gated by Shane sign-off)

Do not begin this task without an explicit "go" from Shane in the conversation.

- [ ] **Step 1: Confirm preview URL has been Shane-approved page-by-page**

Get a thumbs-up from Shane on Home, About, Approach, Insights index, one Insights article, Contact (after submitting a real lead).

- [ ] **Step 2: Add custom domain in Vercel**

In Vercel dashboard for the project, add `kismetfinancegroup.com.au` and `www.kismetfinancegroup.com.au` as custom domains.

- [ ] **Step 3: Update DNS records**

At Shane's DNS provider (likely the existing host of the current Clickfunnels site or a registrar), update:
- A record for apex `@` to Vercel IP (`76.76.21.21` or per Vercel guidance).
- CNAME for `www` to `cname.vercel-dns.com`.

Note: this swaps the live site. Coordinate timing. Do this off-peak.

- [ ] **Step 4: Wait for SSL cert issuance**

Vercel auto-issues. Confirm the domain shows green check in dashboard. Visit https://kismetfinancegroup.com.au and confirm new site loads with a valid cert.

- [ ] **Step 5: Smoke test the live site**

Run through the same checklist as preview: every page, lead form submits, booking iframe loads, analytics fires.

- [ ] **Step 6: Commit a final marker**

```bash
git tag -a v1.0.0 -m "Kismet website v1 live on kismetfinancegroup.com.au"
git push origin v1.0.0
```

---

## Done state

When all 18 tasks are checked off:
- Five pages live at kismetfinancegroup.com.au with Premium Dark visual, Shane-voice copy, real numbers and testimonials.
- Lead form working end-to-end into Shane's inbox and a Google Sheet.
- Booking widget hands warm leads into the existing scheduler.
- Newsletter capture in footer (provider configured).
- Analytics firing.
- Compliance line on every page.
- Lighthouse mobile performance ≥ 90, accessibility ≥ 95.
- CI gate enforces no em-dashes, typechecks, runs tests, builds.
