import Link from "next/link";
import { ComplianceLine } from "./ComplianceLine";
import { Reveal } from "./Reveal";

export function SiteFooter() {
  return (
    <footer className="mt-32 bg-navy-deep">
      {/* hairline gradient rule, replaces hard border-t */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      {/* pre-footer CTA block */}
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-16">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8 pb-16 border-b border-white/[0.06]">
            <div className="max-w-md">
              <p className="font-serif text-[1.25rem] md:text-[1.5rem] leading-snug text-white/80">
                Most people don't fail because they made the wrong move. They fail because they made no move at all.
              </p>
              <p className="mt-3 text-sm text-white/45">Book a private call when you're ready.</p>
            </div>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] font-semibold pl-7 pr-6 py-4 rounded-sm bg-gold-gradient text-navy-deep shadow-[0_10px_40px_-10px_rgba(212,175,55,0.35)] transition-shadow duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_18px_60px_-12px_rgba(212,175,55,0.55)] whitespace-nowrap"
            >
              <span>Book a private call</span>
              <span aria-hidden className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </div>
        </Reveal>

        {/* column grid */}
        <div className="pt-14 grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="font-serif text-lg tracking-[0.18em] text-gold uppercase">Kismet</Link>
            <p className="mt-4 text-sm text-white/55 max-w-sm leading-relaxed">
              Strategic finance coordination for Australians who want their money working harder than they do.
            </p>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.18em] text-white/40 mb-4">Site</h4>
            <ul className="space-y-3 text-sm text-white/75">
              <li><Link href="/about" className="hover:text-gold transition-colors">About</Link></li>
              <li><Link href="/approach" className="hover:text-gold transition-colors">How we work</Link></li>
              <li><Link href="/insights" className="hover:text-gold transition-colors">Insights</Link></li>
              <li><Link href="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.18em] text-white/40 mb-4">Reach us</h4>
            <ul className="space-y-3 text-sm text-white/75">
              <li><a href="mailto:hello@kismetfinancegroup.com.au" className="hover:text-gold transition-colors">hello@kismetfinancegroup.com.au</a></li>
              <li className="text-white/45">ABN to confirm</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <ComplianceLine />
        </div>
      </div>
    </footer>
  );
}
