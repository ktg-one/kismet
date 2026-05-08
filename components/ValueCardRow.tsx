import { Reveal } from "./Reveal";
import type { ReactNode } from "react";

interface Card {
  title: ReactNode;
  body: ReactNode;
}

/**
 * Editorial principles layout. Vertical stacked, large indices, typography-led.
 * Replaces the templated 3-up grid. Reads as a manifesto, not a feature list.
 */
export function ValueCardRow({
  heading,
  cards,
  eyebrow,
}: {
  heading: ReactNode;
  cards: Card[];
  eyebrow?: string;
}) {
  return (
    <section className="atmosphere-soft relative">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-24 md:py-44">
        {/* Section header. Dropped eyebrow + dot here, keeps rhythm fresh. */}
        <div className="grid grid-cols-12 gap-6 items-end mb-24 md:mb-32">
          <div className="col-span-12 md:col-span-1">
            <Reveal>
              <div className="hidden md:block hero-rule h-16" aria-hidden />
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-10 lg:col-span-9">
            {eyebrow && (
              <Reveal>
                <div className="text-[10px] uppercase tracking-[0.32em] text-gold/75 mb-7">
                  {eyebrow}
                </div>
              </Reveal>
            )}
            <Reveal delay={0.06}>
              <h2 className="display-lg max-w-3xl text-white">{heading}</h2>
            </Reveal>
          </div>
        </div>

        {/* Manifesto rows. Each principle gets its own breath. */}
        <ol className="grid grid-cols-12 gap-y-16 md:gap-y-24">
          {cards.map((c, i) => {
            const indexLabel = String(i + 1).padStart(2, "0");
            return (
              <li key={i} className="col-span-12 contents">
                <Reveal delay={i * 0.08} className="col-span-12 md:col-start-2 md:col-span-10 lg:col-start-2 lg:col-span-9">
                  <div className="grid grid-cols-12 gap-6 md:gap-8 items-start group">
                    {/* Index column - ornamental */}
                    <div className="col-span-2 md:col-span-2 lg:col-span-1 pt-3">
                      <span className="font-serif italic text-[1.25rem] md:text-[1.5rem] text-gold/65 tracking-[0.04em] tabular-nums transition-colors duration-700 group-hover:text-gold/95">
                        {indexLabel}
                      </span>
                    </div>

                    {/* Title column */}
                    <div className="col-span-10 md:col-span-4 lg:col-span-4">
                      <h3 className="font-serif text-[1.5rem] md:text-[1.875rem] text-white tracking-[-0.012em] leading-[1.18]">
                        {c.title}
                      </h3>
                    </div>

                    {/* Body column */}
                    <div className="col-span-12 md:col-span-6 lg:col-start-7 lg:col-span-6 mt-2 md:mt-2">
                      <p className="text-[16px] md:text-[17px] text-white/72 leading-[1.78]">
                        {c.body}
                      </p>
                    </div>
                  </div>

                  {/* Hairline separator between rows, except last */}
                  {i < cards.length - 1 && (
                    <div
                      aria-hidden
                      className="mt-16 md:mt-24 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
                    />
                  )}
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
