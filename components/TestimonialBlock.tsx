interface Testimonial { quote: React.ReactNode; name: string; context: string; }

export function TestimonialBlock({ items }: { items: Testimonial[] }) {
  return (
    <section className="border-t border-white/5 bg-navy-deep/40">
      <div className="mx-auto max-w-5xl px-6 py-24 md:py-28 grid gap-12 md:gap-16 md:grid-cols-3">
        {items.map((t, i) => (
          <figure key={i} className="space-y-6">
            <blockquote className="font-serif text-lg leading-[1.55] text-white/85">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="text-xs uppercase tracking-[0.14em]">
              <div className="text-gold">{t.name}</div>
              <div className="text-white/50 mt-1 normal-case tracking-normal">{t.context}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
