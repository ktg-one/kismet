import Link from "next/link";
import { ComplianceLine } from "./ComplianceLine";
import { Reveal } from "./Reveal";
import { BrandMark } from "./BrandMark";

interface NextStepProps {
  index: string;
  label: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  meta?: string;
  isPrimary?: boolean;
}

function NextStep({ index, label, title, body, cta, href, meta, isPrimary }: NextStepProps) {
  return (
    <Link
      href={href}
      className={`group relative col-span-12 md:col-span-3 lg:col-span-3 flex flex-col h-full p-7 md:p-8 transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isPrimary
          ? "kismet-surface-elevated"
          : "kismet-surface"
      }`}
    >
      <div className="flex items-center gap-4 mb-7">
        <span className="font-serif italic text-[14px] text-gold/75 tabular-nums">{index}.</span>
        <span aria-hidden className="h-px w-6 bg-gold/35" />
        <span className="text-[10px] uppercase tracking-[0.28em] text-white/55">{label}</span>
      </div>

      <h3 className="font-serif text-[1.25rem] md:text-[1.4rem] leading-[1.2] tracking-[-0.008em] text-white mb-4">
        {title}
      </h3>

      <p className="text-[14.5px] text-white/65 leading-[1.7] mb-7 flex-1">
        {body}
      </p>

      <div className="flex flex-wrap items-baseline gap-x-3">
        <span
          className={`inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-semibold border-b pb-1.5 transition-all duration-500 ${
            isPrimary
              ? "text-gold border-gold/60 group-hover:tracking-[0.26em] group-hover:border-gold"
              : "text-white/85 border-white/25 group-hover:text-gold group-hover:border-gold/60"
          }`}
        >
          <span>{cta}</span>
          <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">&rarr;</span>
        </span>
        {meta && (
          <span className="text-[11px] text-white/35 tracking-[0.04em]">{meta}</span>
        )}
      </div>
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative mt-32 atmosphere-deep">
      <div className="rule-fade" />

      {/* Pre-footer statement + three calm next-step options */}
      <div className="mx-auto max-w-7xl px-6 md:px-10 pt-20 md:pt-36 pb-16 md:pb-24">
        <Reveal>
          <div className="grid grid-cols-12 gap-6 items-end mb-14 md:mb-20">
            <div className="col-span-12 md:col-span-1">
              <div className="hidden md:block hero-rule h-20" aria-hidden />
            </div>
            <div className="col-span-12 md:col-span-8">
              <div className="text-[10px] uppercase tracking-[0.32em] text-gold/75 mb-8">
                Three ways forward
              </div>
              <p className="font-serif text-[1.875rem] md:text-[2.75rem] leading-[1.12] tracking-[-0.014em] text-white/95 max-w-3xl">
                By appointment, not advertising.
                <span className="block text-white/55 mt-3">
                  The line is kept clear for the right calls.
                </span>
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="grid grid-cols-12 gap-6 md:gap-8">
            <div className="hidden md:block col-span-1" aria-hidden />
            <NextStep
              index="01"
              label="Primary"
              title="Request a private strategy conversation"
              body="Thirty minutes, no pitch, no obligation. We listen first, ask the right questions, and tell you what we see."
              cta="Book the call"
              href="/contact"
              isPrimary
            />
            <NextStep
              index="02"
              label="Soft step"
              title="Read the brief"
              body="Three short reads on the questions clients have with us before they become clients. Plain English. General information only."
              cta="Open Insights"
              href="/insights"
            />
            <NextStep
              index="03"
              label="Direct"
              title="Speak with the team"
              body="If a written note or call works better, the line and the inbox are both monitored Australia-wide business hours."
              cta="(08) 6285 8501"
              href="tel:+61862858501"
              meta="hello@kismetfinancegroup.com.au"
            />
          </div>
        </Reveal>
      </div>

      <div className="rule-fade-soft" />

      {/* Column grid */}
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-16 md:py-20">
        <div className="grid gap-12 md:gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <BrandMark className="w-9 h-9 text-gold/95 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[8deg]" />
              <span className="font-serif text-xl tracking-[0.22em] text-gold uppercase">
                Kismet
              </span>
            </Link>
            <p className="mt-7 text-[15px] text-white/55 max-w-md leading-[1.7]">
              Strategic finance coordination for Australians who want their money working harder than they do.
            </p>
            <p className="mt-4 text-[13px] text-white/35 italic font-serif max-w-md">
              Boutique by design. Not for everyone. That&rsquo;s the point.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[10px] uppercase tracking-[0.24em] text-white/35 mb-5">Site</h4>
            <ul className="space-y-3.5 text-[15px] text-white/75">
              <li>
                <Link href="/about" className="hover:text-gold transition-colors duration-400">
                  About
                </Link>
              </li>
              <li>
                <Link href="/approach" className="hover:text-gold transition-colors duration-400">
                  How we work
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-gold transition-colors duration-400">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold transition-colors duration-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-[10px] uppercase tracking-[0.24em] text-white/35 mb-5">Reach us</h4>
            <ul className="space-y-3.5 text-[15px] text-white/75">
              <li>
                <a
                  href="mailto:hello@kismetfinancegroup.com.au"
                  className="hover:text-gold transition-colors duration-400"
                >
                  hello@kismetfinancegroup.com.au
                </a>
              </li>
              <li>
                <a
                  href="tel:+61862858501"
                  className="hover:text-gold transition-colors duration-400 tabular-nums"
                >
                  (08) 6285 8501
                </a>
              </li>
              <li className="text-white/55 leading-[1.6] text-[14px]">
                52 Cooper Road
                <br />
                Cockburn Central WA 6164
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-8 flex flex-col md:flex-row md:items-start md:justify-between gap-5">
          <ComplianceLine className="md:max-w-3xl" />
          <div className="flex flex-col md:items-end gap-1 text-[10px] uppercase tracking-[0.22em] text-white/35 whitespace-nowrap">
            <span>&copy; {new Date().getFullYear()} Kismet Finance Group Pty Ltd</span>
            <span className="text-white/30 normal-case tracking-[0.18em]">
              ABN 17 665 148 390
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
