import { Reveal } from "./Reveal";
import type { ReactNode } from "react";

interface Testimonial { quote: ReactNode; name: string; context: string; }

export function TestimonialBlock({ items }: { items: Testimonial[] }) {
  return (
    <section className="relative border-t border-white/[0.06] bg-[radial-gradient(ellipse_at_center,rgba(30,58,95,0.4),transparent_70%)]">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36 grid gap-14 md:gap-16 md:grid-cols-3">
        {items.map((t, i) => (
          <Reveal key={i} delay={i * 0.12}>
            <figure className="space-y-7">
              <div className="font-serif text-3xl text-gold/40 leading-none">&ldquo;</div>
              <blockquote className="font-serif text-[1.125rem] leading-[1.6] text-white/85">
                {t.quote}
              </blockquote>
              <figcaption className="pt-4 border-t border-white/[0.08]">
                <div className="text-[11px] uppercase tracking-[0.16em] text-gold">{t.name}</div>
                <div className="text-[12px] text-white/45 mt-1.5">{t.context}</div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
