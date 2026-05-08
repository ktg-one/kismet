import Image from "next/image";
import { Reveal, RevealWords } from "./Reveal";
import { MagneticCTA } from "./MagneticCTA";
import { ScrollCue } from "./ScrollCue";
import { BrandMark } from "./BrandMark";
import type { ReactNode } from "react";

interface HeroProps {
  eyebrow: string;
  headline: string;
  /** Optional second-line text shown below the headline in muted blue. */
  headlineMuted?: string;
  sub: ReactNode;
  ctaLabel: string;
  ctaHref: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  showScrollCue?: boolean;
  /** Optional background image url (cinematic atmosphere). */
  bgImage?: string;
  bgAlt?: string;
}

/**
 * Cinematic hero. Stitch-aligned: background image with smoke gradient overlay,
 * editorial typography, primary gold CTA + ghost secondary.
 */
export function Hero({
  eyebrow,
  headline,
  headlineMuted,
  sub,
  ctaLabel,
  ctaHref,
  secondaryHref,
  secondaryLabel,
  showScrollCue = true,
  bgImage,
  bgAlt = "",
}: HeroProps) {
  return (
    <section className="relative overflow-hidden hero-atmosphere">
      {/* Background image layer (optional) */}
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage}
            alt={bgAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a141e] via-[#0a141e]/80 to-transparent" />
          <div className="absolute inset-0 smoke-gradient" />
        </div>
      )}

      {/* Ambient orbs - quieter on sub-pages */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="ambient-orb ambient-orb-gold"
          style={{
            top: "-12%",
            right: "-8%",
            width: showScrollCue ? "62vw" : "44vw",
            height: showScrollCue ? "62vw" : "44vw",
            maxWidth: showScrollCue ? "900px" : "640px",
            maxHeight: showScrollCue ? "900px" : "640px",
            opacity: showScrollCue ? 0.7 : 0.38,
          }}
          aria-hidden
        />
        <div
          className="ambient-orb ambient-orb-navy"
          style={{
            bottom: "-18%",
            left: "-12%",
            width: showScrollCue ? "70vw" : "50vw",
            height: showScrollCue ? "70vw" : "50vw",
            maxWidth: showScrollCue ? "1000px" : "720px",
            maxHeight: showScrollCue ? "1000px" : "720px",
            opacity: showScrollCue ? 0.65 : 0.32,
          }}
          aria-hidden
        />
        <BrandMark
          className={`absolute -right-[14%] top-[6%] md:-right-[8%] md:top-[2%] w-[110vw] md:w-[70vw] max-w-none md:max-w-[820px] aspect-square text-[#D4AF37] [filter:blur(0.4px)] ${
            showScrollCue ? "opacity-[0.045] md:opacity-[0.055]" : "opacity-[0.025] md:opacity-[0.035]"
          }`}
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 pt-28 md:pt-36 pb-20 md:pb-32 min-h-[80vh] md:min-h-[88vh] flex flex-col">
        <div className="grid grid-cols-12 gap-6 flex-1">
          <div className="col-span-12 lg:col-span-9 flex flex-col justify-center">
            <Reveal>
              <span className="inline-flex items-center gap-3 text-[12px] font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-8">
                <span aria-hidden className="w-8 h-px bg-[#D4AF37]" />
                {eyebrow}
              </span>
            </Reveal>

            <RevealWords
              text={headline}
              as="h1"
              className="font-serif text-[40px] sm:text-[52px] md:text-[64px] lg:text-[72px] leading-[1.05] tracking-[-0.022em] text-[#d9e3f2] text-balance max-w-[20ch]"
              delay={0.05}
              stagger={0.045}
            />

            {headlineMuted && (
              <Reveal delay={0.4}>
                <p className="font-serif text-[32px] sm:text-[44px] md:text-[58px] lg:text-[68px] leading-[1.08] tracking-[-0.02em] text-[#d9e3f2] text-balance mt-3 sm:mt-4 max-w-[22ch] italic font-light">
                  {headlineMuted}
                </p>
              </Reveal>
            )}

            <Reveal delay={0.55} y={18}>
              <div className="mt-10 md:mt-12 text-[17px] md:text-[18px] text-[#c4c6cf] leading-[1.7] max-w-2xl">
                {sub}
              </div>
            </Reveal>

            <Reveal delay={0.72} y={14}>
              <div className="mt-12 md:mt-14 flex flex-wrap items-center gap-x-6 gap-y-4">
                <MagneticCTA href={ctaHref}>
                  <span>{ctaLabel}</span>
                  <span aria-hidden className="cta-arrow">&rarr;</span>
                </MagneticCTA>
                {secondaryHref && secondaryLabel && (
                  <a href={secondaryHref} className="cta-ghost">
                    <span>{secondaryLabel}</span>
                    <span aria-hidden className="cta-arrow">&rarr;</span>
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </div>

        {showScrollCue && (
          <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2">
            <ScrollCue />
          </div>
        )}
      </div>
    </section>
  );
}
