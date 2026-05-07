import { Reveal } from "./Reveal";
import type { ReactNode } from "react";

interface Card { title: ReactNode; body: ReactNode; }

export function ValueCardRow({ heading, cards }: { heading: ReactNode; cards: Card[] }) {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-28 md:py-40">
      <div className="grid grid-cols-12 gap-6 items-end mb-20 md:mb-28">
        <div className="col-span-12 md:col-span-7">
          <Reveal>
            <h2 className="font-serif text-[1.875rem] md:text-[2.75rem] leading-[1.12] tracking-[-0.01em] max-w-2xl">
              {heading}
            </h2>
          </Reveal>
        </div>
      </div>
      <div className="grid gap-12 md:gap-16 md:grid-cols-3">
        {cards.map((c, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className="group">
              <div className="h-px w-12 bg-gold/60 mb-8 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-20 group-hover:bg-gold" />
              <h3 className="font-serif text-[1.375rem] text-white mb-5 leading-snug">{c.title}</h3>
              <p className="text-[15px] text-white/65 leading-[1.75]">{c.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
