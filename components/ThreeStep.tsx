import { Reveal } from "./Reveal";
import type { ReactNode } from "react";

interface Step {
  number: string;
  icon: ReactNode;
  title: string;
  caption: string;
  body: string;
}

/**
 * Three-step process. Asymmetric staggered cards (Stitch how-we-work pattern).
 * Card 1 left, Card 2 indented right, Card 3 left again. Connecting vertical line behind.
 */
export function ThreeStep({ steps }: { steps: Step[] }) {
  return (
    <section className="relative py-24 md:py-32 section-blend-top">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative">
          {/* Connecting vertical line */}
          <div
            aria-hidden
            className="hidden md:block absolute left-1/2 top-24 bottom-24 w-[1px] bg-gradient-to-b from-transparent via-[#43474e]/40 to-transparent -translate-x-1/2 z-0"
          />

          {steps.map((step, i) => {
            const align =
              i === 0
                ? "md:col-start-1 md:col-span-10"
                : i === 1
                  ? "md:col-start-3 md:col-span-10"
                  : "md:col-start-1 md:col-span-10";
            const isHighlighted = i === 1; // middle step gets gold edge accent

            return (
              <Reveal
                key={i}
                delay={i * 0.08}
                className={`relative z-10 mb-6 md:mb-12 ${align}`}
              >
                <div
                  className={`bg-[#18283d] border border-[#43474e]/30 rounded-lg p-8 md:p-10 flex flex-col md:flex-row gap-6 md:gap-8 items-start group hover:bg-[#1e3450] transition-colors duration-500 relative overflow-hidden ${
                    isHighlighted ? "gold-edge-left" : ""
                  }`}
                >
                  <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#0a141e] border border-[#43474e]/40 flex items-center justify-center relative">
                    <span className="text-[#D4AF37] [&>svg]:w-6 [&>svg]:h-6 md:[&>svg]:w-7 md:[&>svg]:h-7">
                      {step.icon}
                    </span>
                    <span
                      aria-hidden
                      className="absolute -top-2 -left-2 w-full h-full border border-[#D4AF37]/15 rounded-full scale-110 group-hover:scale-125 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <div className="text-[12px] font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-3">
                      Step {step.number}
                    </div>
                    <h2 className="font-serif text-[24px] md:text-[28px] leading-[1.25] tracking-[-0.008em] text-[#d9e3f2] mb-2.5">
                      {step.title}
                      <span className="block sm:inline-block sm:ml-3 text-[16px] md:text-[20px] font-light text-[#c4c6cf]/85">
                        {step.caption}
                      </span>
                    </h2>
                    <p className="text-[15px] md:text-[16px] text-[#c4c6cf]/85 leading-[1.7] max-w-2xl mt-3">
                      {step.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
