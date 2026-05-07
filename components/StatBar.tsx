import { Reveal } from "./Reveal";

interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

export function StatBar({ stats, eyebrow }: { stats: Stat[]; eyebrow?: string }) {
  return (
    <section className="relative">
      <div className="rule-fade" />
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-20 md:py-24">
        {eyebrow && (
          <Reveal>
            <div className="eyebrow mb-10 text-white/45">{eyebrow}</div>
          </Reveal>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="group">
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-[2.6rem] md:text-[3.2rem] text-white leading-none tracking-[-0.02em] transition-colors duration-500 group-hover:text-gold">
                    {s.value}
                  </span>
                  {s.suffix && (
                    <span className="font-serif text-2xl text-gold/70">{s.suffix}</span>
                  )}
                </div>
                <div className="mt-4 text-[11px] uppercase tracking-[0.22em] text-white/55">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <div className="rule-fade" />
    </section>
  );
}
