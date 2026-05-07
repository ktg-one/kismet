import { Reveal } from "./Reveal";
import type { ReactNode } from "react";

interface Testimonial {
  quote: ReactNode;
  name: string;
  context: string;
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "K";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function TestimonialBlock({
  items,
  eyebrow = "In their words",
  heading,
}: {
  items: Testimonial[];
  eyebrow?: string;
  heading?: ReactNode;
}) {
  return (
    <section className="atmosphere-deep relative">
      <div className="rule-fade-soft" />
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-32 md:py-40">
        <div className="grid grid-cols-12 gap-6 mb-20 md:mb-28">
          <div className="col-span-12 md:col-span-7">
            <Reveal>
              <div className="eyebrow eyebrow-with-dot mb-7">
                <span className="eyebrow-dot" />
                <span>{eyebrow}</span>
              </div>
            </Reveal>
            {heading && (
              <Reveal delay={0.08}>
                <h2 className="display-lg max-w-2xl text-white">{heading}</h2>
              </Reveal>
            )}
          </div>
        </div>

        <div className="grid gap-12 lg:gap-10 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t, i) => (
            <Reveal key={i} delay={i * 0.14}>
              <figure className="group flex flex-col h-full">
                <div
                  aria-hidden
                  className="font-serif text-6xl text-gold/30 leading-none mb-6 transition-colors duration-700 group-hover:text-gold/55"
                >
                  &ldquo;
                </div>
                <blockquote className="font-serif text-[1.2rem] md:text-[1.25rem] leading-[1.55] text-white/88 tracking-[-0.005em] flex-1">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-10 pt-7 border-t border-white/[0.07] flex items-center gap-4">
                  <span
                    aria-hidden
                    className="flex items-center justify-center w-11 h-11 rounded-full border border-gold/35 bg-gold/[0.04] font-serif text-[13px] text-gold tracking-[0.05em]"
                  >
                    {initials(t.name)}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-white/85">{t.name}</span>
                    <span className="text-[11px] text-white/45 mt-1.5">{t.context}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
