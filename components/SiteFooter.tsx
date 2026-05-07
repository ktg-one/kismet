import Link from "next/link";
import { ComplianceLine } from "./ComplianceLine";
import { Reveal } from "./Reveal";
import { MagneticCTA } from "./MagneticCTA";

export function SiteFooter() {
  return (
    <footer className="relative mt-32 atmosphere-deep">
      <div className="rule-fade" />

      {/* Pre-footer statement */}
      <div className="mx-auto max-w-7xl px-6 md:px-10 pt-28 md:pt-36 pb-20 md:pb-24">
        <Reveal>
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-1">
              <div className="hidden md:block hero-rule h-20" aria-hidden />
            </div>
            <div className="col-span-12 md:col-span-8">
              <div className="eyebrow eyebrow-with-dot mb-8">
                <span className="eyebrow-dot" />
                <span>The right table</span>
              </div>
              <p className="font-serif text-[1.75rem] md:text-[2.5rem] leading-[1.15] tracking-[-0.012em] text-white/92 max-w-3xl">
                The right conversation, before the right decision.
                <span className="block text-white/55 mt-3">
                  Coordinated by people who already know who needs to be in the room.
                </span>
              </p>
              <div className="mt-12">
                <MagneticCTA href="/contact">
                  <span>Book a private call</span>
                  <span aria-hidden className="cta-arrow">&rarr;</span>
                </MagneticCTA>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="rule-fade-soft" />

      {/* Column grid */}
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-16 md:py-20">
        <div className="grid gap-12 md:gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" className="font-serif text-xl tracking-[0.22em] text-gold uppercase">
              Kismet
            </Link>
            <p className="mt-6 text-[15px] text-white/55 max-w-md leading-[1.7]">
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
