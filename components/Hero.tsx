import Link from "next/link";

interface HeroProps {
  eyebrow: React.ReactNode;
  headline: React.ReactNode;
  sub: React.ReactNode;
  ctaLabel: string;
  ctaHref: string;
}

export function Hero({ eyebrow, headline, sub, ctaLabel, ctaHref }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.16),transparent_60%)]"
      />
      <div className="relative mx-auto max-w-5xl px-6 pt-24 md:pt-32 pb-20 md:pb-28">
        <div className="text-[10px] uppercase tracking-[0.22em] text-gold/80 mb-8">
          {eyebrow}
        </div>
        <h1 className="font-serif text-[2.25rem] md:text-[3.75rem] leading-[1.05] tracking-[-0.01em] max-w-4xl">
          {headline}
        </h1>
        <div className="mt-8 text-base md:text-lg text-white/70 max-w-2xl leading-[1.65]">
          {sub}
        </div>
        <div className="mt-12">
          <Link
            href={ctaHref}
            className="inline-flex items-center text-[11px] uppercase tracking-[0.18em] font-semibold px-7 py-4 rounded-sm bg-gold-gradient text-navy-deep shadow-[0_4px_24px_rgba(212,175,55,0.22)] hover:shadow-[0_6px_28px_rgba(212,175,55,0.38)] transition-shadow"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
