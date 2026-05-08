import { Reveal } from "./Reveal";
import type { ReactNode } from "react";

interface Step {
  title: ReactNode;
  body: ReactNode;
  /** Optional aside, e.g. "What this is not". Kept brief, italic. */
  caveat?: ReactNode;
}

/**
 * Vertical editorial process timeline.
 * Each step has a large index number on the left rail, content on the right,
 * a connecting gradient line that reveals on scroll, and a calm reveal animation.
 */
export function ProcessTimeline({
  eyebrow = "The process",
  heading,
  steps,
}: {
  eyebrow?: string;
  heading?: ReactNode;
  steps: Step[];
}) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-24 md:py-40">
        {heading && (
          <div className="grid grid-cols-12 gap-6 mb-24 md:mb-32">
            <div className="col-span-12 md:col-span-1">
              <Reveal>
                <div className="hidden md:block hero-rule h-16" aria-hidden />
              </Reveal>
            </div>
            <div className="col-span-12 md:col-span-9">
              <Reveal>
                <div className="eyebrow eyebrow-with-dot mb-7">
                  <span className="eyebrow-dot" />
                  <span>{eyebrow}</span>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display-lg max-w-3xl text-white">{heading}</h2>
              </Reveal>
            </div>
          </div>
        )}

        <div className="grid grid-cols-12 gap-6">
          {/* Left rail spacer */}
          <div className="hidden md:block col-span-1" aria-hidden />

          {/* Steps column */}
          <div className="col-span-12 md:col-span-10 lg:col-span-9 relative">
            {/* Vertical connecting gradient. Visible on mobile (left rail) and desktop (centred under markers). */}
            <div
              aria-hidden
              className="absolute left-5 md:left-[2.5rem] top-2 bottom-2 w-px bg-gradient-to-b from-gold/40 via-gold/15 to-transparent"
            />

            <ol className="space-y-20 md:space-y-24">
              {steps.map((step, i) => {
                const indexLabel = String(i + 1).padStart(2, "0");
                return (
                  <Reveal key={i} delay={i * 0.06}>
                    <li className="relative pl-12 md:pl-24">
                      {/* Index marker, sits on top of the connecting line */}
                      <div className="absolute left-0 md:left-0 top-0 flex items-start">
                        <span className="relative flex items-center justify-center w-10 h-10 md:w-[5rem] md:h-[5rem] rounded-full bg-navy-deep border border-gold/30">
                          <span className="font-serif italic text-[1rem] md:text-[1.5rem] text-gold/85 tracking-[0.05em]">
                            {indexLabel}
                          </span>
                          <span
                            aria-hidden
                            className="absolute inset-0 rounded-full"
                            style={{
                              boxShadow: "0 0 0 1px rgba(212, 175, 55, 0.05), 0 12px 36px -12px rgba(212, 175, 55, 0.35)",
                            }}
                          />
                        </span>
                      </div>

                      <div className="md:pl-2">
                        <h3 className="font-serif text-[1.5rem] md:text-[1.875rem] text-white tracking-[-0.008em] leading-[1.2] mb-5">
                          {step.title}
                        </h3>
                        <p className="text-[16px] md:text-[17px] text-white/72 leading-[1.78] max-w-2xl">
                          {step.body}
                        </p>
                        {step.caveat && (
                          <p className="mt-5 text-[14px] italic font-serif text-white/40 leading-[1.7] max-w-2xl">
                            {step.caveat}
                          </p>
                        )}
                      </div>
                    </li>
                  </Reveal>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
