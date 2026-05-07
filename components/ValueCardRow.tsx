interface Card { title: React.ReactNode; body: React.ReactNode; }

export function ValueCardRow({ heading, cards }: { heading: React.ReactNode; cards: Card[] }) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 md:py-32">
      <h2 className="font-serif text-[1.75rem] md:text-[2.5rem] leading-[1.15] tracking-[-0.01em] mb-16 max-w-2xl">
        {heading}
      </h2>
      <div className="grid gap-8 md:gap-12 md:grid-cols-3">
        {cards.map((c, i) => (
          <div key={i} className="border-t border-white/10 pt-8">
            <h3 className="font-serif text-xl text-gold mb-4 leading-snug">{c.title}</h3>
            <p className="text-sm text-white/70 leading-[1.7]">{c.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
