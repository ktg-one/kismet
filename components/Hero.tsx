import Link from "next/link";
import { Reveal } from "./Reveal";
import type { ReactNode } from "react";

interface HeroProps {
  eyebrow: ReactNode;
  headline: ReactNode;
  sub: ReactNode;
  ctaLabel: string;
  ctaHref: string;
}

export function Hero({ eyebrow, headline, sub, ctaLabel, ctaHref }: HeroProps) {
  return (
    <section className="relative overflow-hidden hero-atmosphere">
      {/* atmospheric light pool, layered radial gradients are in .hero-atmosphere */}
      <div className="relative mx-auto max-w-6xl px-6 pt-28 md:pt-40 pb-24 md:pb-36">
        <div className="grid grid-cols-12 gap-6">
          {/* left rule */}
          <div className="hidden md:flex col-span-1 justify-center">
            <div className="hero-rule h-32 mt-3" />
          </div>

          {/* content, anchored to left two-thirds */}
          <div className="col-span-12 md:col-span-8">
            <Reveal>
              <div className="text-[10px] uppercase tracking-[0.28em] text-gold/80 mb-10">
                {eyebrow}
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="font-serif text-[2.5rem] sm:text-[3rem] md:text-[4.25rem] leading-[1.02] tracking-[-0.015em] max-w-[18ch]">
                {headline}
              </h1>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-10 text-base md:text-lg text-white/65 max-w-xl leading-[1.7]">
                {sub}
              </div>
            </Reveal>
            <Reveal delay={0.26}>
              <div className="mt-14">
                <Link
                  href={ctaHref}
                  className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] font-semibold pl-7 pr-6 py-4 rounded-sm bg-gold-gradient text-navy-deep shadow-[0_10px_40px_-10px_rgba(212,175,55,0.45)] transition-shadow duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_18px_60px_-12px_rgba(212,175,55,0.6)]"
                >
                  <span>{ctaLabel}</span>
                  <span aria-hidden className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                    &rarr;
                  </span>
                </Link>
              </div>
            </Reveal>
          </div>

          {/* right negative space - intentional, holds ambient light from hero-atmosphere */}
          <div className="hidden md:block col-span-3" aria-hidden />
        </div>
      </div>
    </section>
  );
}
