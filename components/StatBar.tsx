interface Stat { value: string; label: string; }

export function StatBar({ stats }: { stats: Stat[] }) {
  return (
    <section className="border-y border-white/10 bg-navy-deep/40">
      <div className="mx-auto max-w-5xl px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="font-serif text-[2rem] md:text-[2.5rem] text-gold leading-none">{s.value}</div>
            <div className="mt-2 text-xs uppercase tracking-[0.14em] text-white/55">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
