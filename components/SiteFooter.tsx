import Link from "next/link";
import { ComplianceLine } from "./ComplianceLine";
import { Reveal } from "./Reveal";
import { BrandMark } from "./BrandMark";
import { BrandWordmark } from "./BrandWordmark";
import { SocialIconRow } from "./Socials";

export function SiteFooter() {
  return (
    <footer className="relative bg-[#050f19] border-t-[0.5px] border-[#43474e]/30">
      {/* Page-ending sign-off - centered brand mark, hairline rules either side */}
      <div className="bg-[#0a141e] py-14 md:py-16">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
          <Reveal>
            <div className="flex items-center justify-center gap-6 md:gap-10">
              <span aria-hidden className="flex-1 max-w-[180px] md:max-w-[280px] h-px bg-gradient-to-r from-transparent via-[#43474e]/40 to-[#D4AF37]/30" />
              <Link href="/" className="group inline-flex flex-col items-center gap-3">
                <BrandMark className="w-14 h-14 md:w-16 md:h-16 text-[#D4AF37]" />
                <BrandWordmark className="h-3.5 md:h-4 w-auto text-[#D4AF37]/85" />
              </Link>
              <span aria-hidden className="flex-1 max-w-[180px] md:max-w-[280px] h-px bg-gradient-to-l from-transparent via-[#43474e]/40 to-[#D4AF37]/30" />
            </div>
          </Reveal>
        </div>
      </div>

      {/* Pre-footer CTA strip */}
      <section className="relative bg-[#1e3450] overflow-hidden">
        <div className="absolute inset-0 smoke-gradient opacity-50" />
        <div className="relative max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32 text-center">
          <Reveal>
            <h2 className="font-serif text-[32px] md:text-[48px] leading-[1.15] tracking-[-0.012em] text-[#d9e3f2] mb-6 max-w-3xl mx-auto text-balance">
              Ready for a different conversation?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[18px] text-[#c4c6cf] leading-[1.6] mb-10 max-w-2xl mx-auto">
              No pressure. No commitments. Just a transparent discussion about your current
              structure and where you want to go.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link href="/contact" className="cta-gold">
              <span>Book a call</span>
              <span aria-hidden className="cta-arrow">&rarr;</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Footer columns */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-4 flex flex-col">
            <Link href="/" className="inline-flex items-center gap-4 group">
              <BrandMark className="w-12 h-12 text-[#D4AF37]" />
              <BrandWordmark className="h-5 w-auto text-[#D4AF37]" />
            </Link>
            <p className="mt-7 text-[15px] text-[#c4c6cf]/85 leading-[1.7] max-w-md">
              Strategic finance coordination for everyday Australians who want their money working
              harder than they do.
            </p>
            <p className="mt-4 text-[13px] text-[#c4c6cf]/55 italic font-serif max-w-md">
              Coordinated, not advisory.
            </p>
            <div className="mt-8">
              <h4 className="text-[12px] uppercase tracking-[0.2em] font-semibold text-[#d9e3f2] mb-4">
                Follow
              </h4>
              <SocialIconRow variant="compact" />
            </div>
          </div>

          {/* Explore column */}
          <div className="md:col-span-2">
            <h4 className="text-[12px] uppercase tracking-[0.2em] font-semibold text-[#d9e3f2] mb-5">
              Explore
            </h4>
            <ul className="space-y-3.5 text-[15px] text-[#c4c6cf]/85">
              <li>
                <Link href="/approach" className="hover:text-[#D4AF37] transition-colors duration-400">
                  How We Work
                </Link>
              </li>
              <li>
                <Link href="/pathways" className="hover:text-[#D4AF37] transition-colors duration-400">
                  Strategic Pathways
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-[#D4AF37] transition-colors duration-400">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#D4AF37] transition-colors duration-400">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#D4AF37] transition-colors duration-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact column */}
          <div className="md:col-span-3">
            <h4 className="text-[12px] uppercase tracking-[0.2em] font-semibold text-[#d9e3f2] mb-5">
              Contact
            </h4>
            <ul className="space-y-3.5 text-[15px] text-[#c4c6cf]/85">
              <li>
                <a
                  href="mailto:admin@kismetfinancegroup.com.au"
                  className="hover:text-[#D4AF37] transition-colors duration-400"
                  suppressHydrationWarning
                >
                  admin@kismetfinancegroup.com.au
                </a>
              </li>
              <li>
                <a
                  href="tel:+61862858501"
                  className="hover:text-[#D4AF37] transition-colors duration-400 tabular-nums"
                  suppressHydrationWarning
                >
                  (08) 6285 8501
                </a>
              </li>
              <li className="text-[#c4c6cf]/60 leading-[1.6] text-[14px]">
                52 Cooper Road
                <br />
                Cockburn Central WA 6164
              </li>
            </ul>
          </div>

          {/* Legal column */}
          <div className="md:col-span-3">
            <h4 className="text-[12px] uppercase tracking-[0.2em] font-semibold text-[#d9e3f2] mb-5">
              Compliance
            </h4>
            <ul className="space-y-3.5 text-[15px] text-[#c4c6cf]/85">
              <li className="text-[14px] leading-[1.6] tabular-nums">
                ABN 17 665 148 390
              </li>
              <li className="text-[14px] leading-[1.6] text-[#c4c6cf]/65">
                Authorised representative within the Home Loan Solutions / Australian Finance Group
                network. AFG holds Australian Credit Licence 389087.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t-[0.5px] border-[#43474e]/30">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 py-8 flex flex-col md:flex-row md:items-start md:justify-between gap-5">
          <ComplianceLine className="md:max-w-3xl" />
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#c4c6cf]/45 whitespace-nowrap">
            &copy; {new Date().getFullYear()} Kismet Finance Group Pty Ltd
          </p>
        </div>
      </div>
    </footer>
  );
}
