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
  /** Right-side vertical tag, e.g. "Australia · Est. 2024". Optional. */
  meta?: string;
  showScrollCue?: boolean;
}

/**
 * Cinematic hero. Editorial composition with ambient gold drift,
 * word-stagger headline, magnetic CTA, scroll cue.
 *
 * Restraint: max two animation systems firing at once. Calm easing.
 * No flashy effects. Designed to feel "established", not "launched".
 */
export function Hero({
  eyebrow,
  headline,
  sub,
  ctaLabel,
  ctaHref,
  meta = "Australia · Est. 2024",
  showScrollCue = true,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden hero-atmosphere">
      {/* Ambient atmosphere layer, slow drift. Behind everything. */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="ambient-orb ambient-orb-gold"
          style={{ top: "-12%", right: "-8%", width: "62vw", height: "62vw", maxWidth: "900px", maxHeight: "900px" }}
          aria-hidden
        />
        <div
          className="ambient-orb ambient-orb-navy"
          style={{ bottom: "-18%", left: "-12%", width: "70vw", height: "70vw", maxWidth: "1000px", maxHeight: "1000px" }}
          aria-hidden
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 pt-32 md:pt-44 pb-24 md:pb-44 min-h-[78vh] md:min-h-[90vh] flex flex-col">
        <div className="grid grid-cols-12 gap-6 flex-1">
          {/* Left vertical rule */}
          <div className="hidden md:flex col-span-1 justify-center pt-3">
            <div className="hero-rule h-44" />
          </div>

          {/* Main content column */}
          <div className="col-span-12 md:col-span-9 lg:col-span-8 flex flex-col">
            <Reveal>
              <div className="eyebrow eyebrow-with-dot mb-12">
                <span className="eyebrow-dot" />
                <span>{eyebrow}</span>
              </div>
            </Reveal>

            <RevealWords
              text={headline}
              as="h1"
              className="display-xl text-white max-w-[19ch]"
              delay={0.05}
              stagger={0.055}
            />

            <Reveal delay={0.55} y={18}>
              <div className="mt-12 md:mt-14 text-base md:text-lg text-white/65 max-w-xl leading-[1.78]">
                {sub}
              </div>
            </Reveal>

            <Reveal delay={0.72} y={14}>
              <div className="mt-14 md:mt-16 flex flex-wrap items-center gap-8">
                <MagneticCTA href={ctaHref}>
                  <span>{ctaLabel}</span>
                  <span aria-hidden className="cta-arrow">&rarr;</span>
                </MagneticCTA>

                <a href="/approach" className="cta-ghost">
                  How we work
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right meta column, asymmetric balance */}
          <div className="hidden lg:flex col-span-3 flex-col items-end justify-between pt-2">
            <Reveal delay={0.8} y={0}>
              <span className="vertical-tag">{meta}</span>
            </Reveal>
          </div>
        </div>

        {/* Scroll cue, pinned to bottom of hero */}
        {showScrollCue && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <ScrollCue />
          </div>
        )}
      </div>

      {/* Bottom hairline transition into next section */}
      <div className="rule-fade" />
    </section>
  );
}
