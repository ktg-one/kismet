# Kismet Finance Group Website. Design Spec

**Date:** 2026-05-07
**Owner:** Shane Hewson (Founder/Director, Kismet Finance Group)
**Builder:** Claude (Opus 4.7)
**Domain:** kismetfinancegroup.com.au

---

## 1. Purpose

A **credibility, trust, and authority** site for Kismet Finance Group.

**Primary job:** when warm referrals, prospects, partners, or recruits Google Kismet, the site convinces them within 30 seconds that this is a real, premium, capable operator. They walk away ready to take a meeting, not bounce.

**Not the job:** cold-traffic conversion. That stays with the Million Dollar Funnels (Leticia) Clickfunnels stack. The brand site links into the funnel where appropriate but does not duplicate it.

## 2. Personality and voice

**Visual:** Premium Dark direction. Deep navy (`#1E3A5F` / `#0F2440`) with gold accents (`#D4AF37` and the brand gold gradient). Berlingske Serif for headlines, Montserrat for body. Soft gold glow on hero, gradient gold CTAs. Confident, premium, slightly aspirational. Members-club for finance.

**Copy voice:** trust + credibility + authority + **normal good humans**. Premium dark visual, warm conversational copy. Operators who know their stuff and talk like real people. Confident without being arrogant. Authoritative without being intimidating.

**Hard rules for all copy on this site (non-negotiable):**
- **Zero em-dashes or en-dashes anywhere.** Use periods, commas, or parentheses. This is a Shane-wide rule.
- **No AI tells.** No "delve", "leverage", "unlock", "in today's fast-paced world", "passionate about empowering", "navigate the complexities", three-item bulleted lists for the sake of it, hedge phrases, or any other LLM-default cadence. If a sentence reads like ChatGPT wrote it, rewrite it.
- Plain language, short sentences, "you" not "our clients".
- Specific numbers and stories over vague claims.
- Compliance line on every page: Kismet is an introducer, not a licensed advisor. No advice is given.

## 3. Sitemap

Five pages.

1. **Home** (`/`)
   - Premium Dark hero with primary CTA: book a call.
   - Three-stat social proof bar (intro volume, Aussies supported, lender network size). Real numbers to be confirmed by Shane before launch.
   - Three-card value section: what Kismet does, who it's for, what to expect.
   - Two to three short testimonial blocks (real names, real context).
   - Closing CTA + compliance footer.

2. **About** (`/about`)
   - Founder story (Shane + Josh). Real photos, not stock.
   - Why Kismet exists. The "we wanted to do this differently" angle.
   - Values stated as principles, not platitudes.
   - Light team intro: Shane, Josh, Amy (when she starts 2026-06-01). No formal Team page.

3. **How We Work** (`/approach`)
   - The introducer model explained in plain English. Kills the "what do you actually do" question.
   - The process: discovery call → connect with the right specialists (broker, property partner, etc.) → ongoing support, no commission games on you.
   - "We don't give advice. We open doors." line up top.
   - Compliance section explaining the licensing setup.

4. **Insights** (`/insights`)
   - 3 short articles at launch. Suggested topics:
     - "The 10-Minute Money Reset" (already a lead magnet, expand into article form).
     - "What everyday Aussies miss about borrowing power."
     - "SMSF property in plain English: the questions to ask before you start."
   - Index page + individual article pages. Author byline. Read time.
   - Articles authored as markdown files in the repo. No CMS.

5. **Contact** (`/contact`)
   - Embedded booking widget (Calendly or current scheduler) as primary CTA.
   - Backup: short contact form (name, email, phone, what's on your mind). Posts to Shane's inbox + Google Sheet.
   - Email, phone, address. WhatsApp link.

**Explicitly out of scope:**
- Network/Partners page. Partnership network is growing but not at peak maturity yet (Dave, Zac, Larissa, Colliers, B1 Homes, more coming). Revisit later.
- Separate Team or Press pages.
- Case studies as a section (embed testimonials throughout instead).
- Client login portal, calculators, chatbots, popups, "limited spots" timers.

## 4. Integrations

| Integration | Purpose | Approach |
|---|---|---|
| Booking widget | Primary CTA, hands warm leads to the funnel/sales process | Embed Calendly or Shane's existing scheduler. Configurable via env var. |
| Lead capture form | Backup conversion when someone won't book | POSTs to a serverless route. Sends email to Shane via Resend (or similar) + appends row to a Google Sheet via service account. |
| Newsletter signup | Nurture warm Googlers, build mailing list asset | Mailchimp or ConvertKit form embed. Shane to confirm provider. |
| Insights content | Thought leadership without CMS overhead | Markdown files in `/content/insights/`. Rendered at build time. |
| Analytics | Know what traffic does | Vercel Analytics + Google Analytics 4. |
| Compliance/legal footer | Regulatory hygiene | Standard footer block on every page. ABN, "introducer not advisor" notice, privacy link. |

**Out of scope for v1:**
- CRM integration (Salesforce/Accelify still in eval; revisit when picked).
- Live chat / WhatsApp Business API.
- Multi-language.
- Member portal.

## 5. Stack and architecture

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) | Modern, fast, server components for SEO, easy for Claude to maintain. |
| Styling | Tailwind CSS + Kismet brand CSS variables | Brand tokens already exist (`kismet-brand.css`). Tailwind for layout. |
| Fonts | Montserrat (Google Fonts), Berlingske Serif (self-hosted webfont if licensed; Georgia fallback) | Per brand guide. |
| Content | Markdown (MDX optional) for Insights | No CMS overhead for v1. |
| Hosting | Vercel | Direct MCP access; preview URLs per branch; instant rollback. |
| Forms | Vercel serverless routes + Resend (email) + Google Sheets API | No third-party form provider needed. |
| Analytics | Vercel Analytics + GA4 | Both free tiers cover this. |
| Domain | kismetfinancegroup.com.au | Cutover via DNS once Shane signs off. Old site stays live until then. |
| Repo | `C:\Users\Shane\kismet-website` (local) + GitHub (private) | Source of truth. |

## 6. Components (high-level)

- `<SiteHeader>`: sticky nav, logo, primary nav links, CTA button.
- `<SiteFooter>`: compliance text, ABN, privacy, contact, social, newsletter signup.
- `<Hero>`: Premium Dark hero with gold gradient accent. Variant for non-home pages.
- `<StatBar>`: three-stat social proof row.
- `<ValueCardRow>`: three feature cards.
- `<TestimonialBlock>`: quote, name, context.
- `<ArticleCard>` / `<ArticleLayout>`: for Insights.
- `<BookingEmbed>`: wraps the scheduler iframe. Contact + Home CTA.
- `<LeadForm>`: name, email, phone, message. Client + server validation.
- `<ComplianceLine>`: reusable footer-able compliance disclaimer.

Each component lives in its own file under `components/`, has one purpose, and is independently understandable.

## 7. Content responsibilities

| Item | Owner |
|---|---|
| Founder story, mission, values, voice training | **Primary**: ChatGPT chat history export from Shane (Claude reads to absorb voice, business context, decision-making). **Backup**: 30 min call if export is incomplete or missing context. |
| Team bios | Shane |
| Real numbers for stat bar | Shane |
| Testimonial selections | Shane (already on current site; pick the strongest 3) |
| Insights articles (drafts) | Claude drafts, Shane reviews and signs off before publish |
| All page copy, layout, code, deployment | Claude |
| Domain DNS cutover | Shane (will be guided through it) |
| Final approval to publish | Shane |

## 8. Success criteria

The site is "done" for v1 when:

1. All 5 pages render on the live domain with no broken links, no Lorem ipsum, no placeholder numbers.
2. Booking CTA produces a real meeting in Shane's calendar end-to-end.
3. Lead capture form produces an email to Shane and a row in a Google Sheet end-to-end.
4. Site loads in under 1.5 seconds on a cold mobile connection (Lighthouse mobile performance ≥ 90).
5. Lighthouse accessibility ≥ 95.
6. Compliance footer appears on every page.
7. Shane has approved every page and signed off on the domain cutover.

## 9. What we're explicitly not doing in v1

- No backend database. No CRM hookup. No member accounts.
- No paid ad landing pages on this site (those live in Leticia's Clickfunnels).
- No A/B testing framework.
- No internationalisation.
- No fancy animation library beyond simple Tailwind transitions.

## 10. Risks and unknowns

- **Berlingske Serif licensing**: confirm Shane has a webfont licence. Fallback to Georgia until confirmed.
- **Real testimonial permissions**: current site uses repeated testimonials, suggesting weak source material. Shane to confirm authentic, fresh quotes.
- **Stat numbers**: placeholder values in mockup must be replaced with audited figures before launch.
- **Booking provider**: Calendly assumed but Shane to confirm what's actually being used in the existing flow.
- **DNS cutover risk**: old site stays up; new site goes live on a preview URL first; cutover only after Shane signs off.
- **Voice authenticity**: copy must not read AI-generated. Mitigation: ingest ChatGPT export when Shane provides it; draft copy in Shane's actual voice; Shane reviews every page before publish; explicit no-AI-tells checklist applied to every paragraph.
- **Email deliverability**: Resend (or chosen provider) must use authenticated `kismetfinancegroup.com.au` sending domain. Coordinate with whoever runs DNS.

---

## Approval

Shane to review and approve before implementation planning begins.
