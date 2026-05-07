import { Reveal } from "./Reveal";
import type { ReactNode } from "react";

interface Card {
  title: ReactNode;
  body: ReactNode;
}

export function ValueCardRow({
  heading,
  cards,
  eyebrow = "Principles",
}: {
  heading: ReactNode;
  cards: Card[];
  eyebrow?: string;
}) {
  return (
    <section className="atmosphere-soft relative">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-32 md:py-44">
        {/* Section header, asymmetric editorial */}
        <div className="grid grid-cols-12 gap-6 items-end mb-24 md:mb-32">
          <div className="col-span-12 md:col-span-1">
            <Reveal>
              <div className="hidden md:block hero-rule h-16" aria-hidden />
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-8">
            <Reveal>
              <div className="eyebrow eyebrow-with-dot mb-8">
                <span className="eyebrow-dot" />
                <span>{eyebrow}</span>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display-lg max-w-3xl text-white">{heading}</h2>
            </Reveal>
          </div>
        </div>

        {/* Cards. Editorial cards, indexed, soft elevation, gold halo on hover. */}
        <div className="grid gap-10 md:gap-8 lg:gap-10 md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <article className="group kismet-surface gold-halo p-8 md:p-10 h-full flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[3px]">
                <div className="flex items-center justify-between mb-8">
                  <span className="index-marker">0{i + 1}</span>
                  <span
                    aria-hidden
                    className="h-px w-10 bg-gold/40 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-16 group-hover:bg-gold/80"
                  />
                </div>
                <h3 className="font-serif text-[1.4rem] md:text-[1.5rem] text-white mb-5 leading-[1.2] tracking-[-0.005em]">
                  {c.title}
                </h3>
                <p className="text-[15px] text-white/65 leading-[1.78]">{c.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
