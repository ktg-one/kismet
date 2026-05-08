import { Reveal, RevealWords } from "./Reveal";
import { MagneticCTA } from "./MagneticCTA";
import { ScrollCue } from "./ScrollCue";
import type { ReactNode } from "react";

interface HeroProps {
  eyebrow: string;
  headline: string;
  sub: ReactNode;
  ctaLabel: string;
  ctaHref: string;
  /** Secondary ghost CTA. Defaults to How We Work. */
  secondaryHref?: string;
  secondaryLabel?: string;
  showScrollCue?: boolean;
}

/**
 * Editorial cinema hero. Restraint over flash.
 *
 * - One signature line headline, word-stagger reveal on calm cinematic ease
 * - One subhead, one primary CTA, one secondary ghost CTA
 * - Ambient gold + navy orb drift behind
 * - No vertical right-rail tag (was templated, now SignatureStrip handles authority anchoring)
 * - Hairline editorial rule on the left
 */
export function Hero({
  eyebrow,
  headline,
  sub,
  ctaLabel,
  ctaHref,
  secondaryHref = "/approach",
  secondaryLabel = "How we work",
  showScrollCue = true,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden hero-atmosphere">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="ambient-orb ambient-orb-gold"
          style={{
            top: "-12%",
            right: "-8%",
            width: "62vw",
            height: "62vw",
            maxWidth: "900px",
            maxHeight: "900px",
          }}
          aria-hidden
        />
        <div
          className="ambient-orb ambient-orb-navy"
          style={{
            bottom: "-18%",
            left: "-12%",
            width: "70vw",
            height: "70vw",
            maxWidth: "1000px",
            maxHeight: "1000px",
          }}
          aria-hidden
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 pt-32 md:pt-44 pb-24 md:pb-44 min-h-[78vh] md:min-h-[88vh] flex flex-col">
        <div className="grid grid-cols-12 gap-6 flex-1">
          <div className="hidden md:flex col-span-1 justify-center pt-3">
            <div className="hero-rule h-44" />
          </div>

          <div className="col-span-12 md:col-span-10 lg:col-span-9 flex flex-col">
            <Reveal>
              <div className="text-[10px] uppercase tracking-[0.32em] text-gold/85 mb-12">
                {eyebrow}
              </div>
            </Reveal>

            <RevealWords
              text={headline}
              as="h1"
              className="display-xl text-white max-w-[20ch]"
              delay={0.05}
              stagger={0.055}
            />

            <Reveal delay={0.55} y={18}>
              <div className="mt-12 md:mt-14 text-base md:text-lg text-white/65 max-w-xl leading-[1.78]">
                {sub}
              </div>
            </Reveal>

            <Reveal delay={0.72} y={14}>
              <div className="mt-14 md:mt-16 flex flex-wrap items-center gap-x-10 gap-y-6">
                <MagneticCTA href={ctaHref}>
                  <span>{ctaLabel}</span>
                  <span aria-hidden className="cta-arrow">&rarr;</span>
                </MagneticCTA>

                {secondaryHref && (
                  <a href={secondaryHref} className="cta-ghost">
                    {secondaryLabel}
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </div>

        {showScrollCue && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <ScrollCue />
          </div>
        )}
      </div>
    </section>
  );
}
