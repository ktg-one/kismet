import Link from "next/link";
import { Reveal } from "./Reveal";
import type { ArticleMeta } from "@/lib/articles";

interface InsightsBentoProps {
  articles: ArticleMeta[];
}

/**
 * Insights index - Stitch-aligned bento.
 * First article = featured large quote card. Next two = smaller image-style + analysis cards.
 * Remaining articles cascade as standard rows below.
 */
export function InsightsBento({ articles }: InsightsBentoProps) {
  if (articles.length === 0) return null;

  const [hero, ...rest] = articles;
  const [secondary, tertiary, ...remaining] = rest;

  return (
    <section className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
      {/* Section header */}
      <Reveal>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 md:mb-14 border-b-[0.5px] border-[#43474e]/30 pb-6">
          <h2 className="font-serif text-[36px] md:text-[44px] leading-[1.15] tracking-[-0.014em] text-[#d9e3f2]">
            Recent reads
          </h2>
          <span className="text-[12px] font-semibold tracking-[0.2em] uppercase text-[#c4c6cf]/65">
            {articles.length} pieces
          </span>
        </div>
      </Reveal>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[minmax(280px,auto)] gap-5 md:gap-6">
        {/* Hero: large quote-style card */}
        <Reveal className="md:col-span-8 md:row-span-2">
          <Link
            href={`/insights/${hero.slug}`}
            className="group card-lift-hover bg-[#18283d] hover:bg-[#1e3450] flex flex-col justify-between p-8 md:p-12 relative overflow-hidden h-full rounded-lg"
          >
            <div
              aria-hidden
              className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-[#D4AF37]/50 to-transparent"
            />
            <span
              aria-hidden
              className="absolute -top-4 -left-4 font-serif text-[120px] leading-none text-[#D4AF37]/15 select-none"
            >
              &ldquo;
            </span>
            <div className="relative z-10">
              <span className="text-[12px] font-semibold tracking-[0.2em] uppercase text-[#c4c6cf]/85 mb-4 block">
                Featured · {hero.readMinutes} min
              </span>
              <h3 className="font-serif text-[28px] md:text-[34px] lg:text-[38px] leading-[1.18] tracking-[-0.012em] text-[#d9e3f2] mb-6 group-hover:text-[#D4AF37] transition-colors duration-500 text-balance">
                {hero.title}
              </h3>
              <p className="text-[15px] md:text-[16px] text-[#c4c6cf]/75 leading-[1.65] max-w-2xl">
                {hero.summary}
              </p>
            </div>
            <div className="relative z-10 flex items-center justify-between mt-10 md:mt-14 pt-6 border-t-[0.5px] border-[#43474e]/30">
              <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#D4AF37] inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                Read briefing <span aria-hidden>&rarr;</span>
              </span>
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#c4c6cf]/55">
                Kismet · {hero.readMinutes} min read
              </span>
            </div>
          </Link>
        </Reveal>

        {/* Secondary card */}
        {secondary && (
          <Reveal delay={0.08} className="md:col-span-4">
            <Link
              href={`/insights/${secondary.slug}`}
              className="group block card-lift-hover bg-[#1e3450] gold-edge-top hover:bg-[#26456a] p-7 md:p-8 h-full flex flex-col justify-between rounded-lg"
            >
              <div>
                <span className="text-[12px] font-semibold tracking-[0.2em] uppercase text-[#c4c6cf]/85 mb-4 block">
                  Analysis
                </span>
                <h3 className="font-serif text-[22px] md:text-[24px] leading-[1.22] tracking-[-0.008em] text-[#d9e3f2] mb-4 group-hover:text-[#D4AF37] transition-colors duration-500 text-balance">
                  {secondary.title}
                </h3>
                <p className="text-[14.5px] text-[#c4c6cf]/70 leading-[1.6] line-clamp-3">
                  {secondary.summary}
                </p>
              </div>
              <div className="mt-7 flex items-center justify-between border-t-[0.5px] border-[#43474e]/25 pt-4">
                <span className="text-[11px] tracking-[0.2em] uppercase text-[#c4c6cf]/55">
                  {secondary.readMinutes} min
                </span>
                <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#D4AF37]/80">
                  Read &rarr;
                </span>
              </div>
            </Link>
          </Reveal>
        )}

        {/* Tertiary card */}
        {tertiary && (
          <Reveal delay={0.14} className="md:col-span-4">
            <Link
              href={`/insights/${tertiary.slug}`}
              className="group block card-lift-hover bg-[#18283d] hover:bg-[#1e3450] p-7 md:p-8 h-full flex flex-col justify-between rounded-lg border border-[#43474e]/30"
            >
              <div>
                <span className="text-[12px] font-semibold tracking-[0.2em] uppercase text-[#c4c6cf]/85 mb-4 block">
                  Strategy
                </span>
                <h3 className="font-serif text-[22px] md:text-[24px] leading-[1.22] tracking-[-0.008em] text-[#d9e3f2] mb-4 group-hover:text-[#D4AF37] transition-colors duration-500 text-balance">
                  {tertiary.title}
                </h3>
                <p className="text-[14.5px] text-[#c4c6cf]/70 leading-[1.6] line-clamp-3">
                  {tertiary.summary}
                </p>
              </div>
              <div className="mt-7 flex items-center justify-between border-t-[0.5px] border-[#43474e]/25 pt-4">
                <span className="text-[11px] tracking-[0.2em] uppercase text-[#c4c6cf]/55">
                  {tertiary.readMinutes} min
                </span>
                <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#D4AF37]/80">
                  Read &rarr;
                </span>
              </div>
            </Link>
          </Reveal>
        )}
      </div>

      {/* Remaining articles as compact rows */}
      {remaining.length > 0 && (
        <div className="mt-12 md:mt-16 border-t-[0.5px] border-[#43474e]/30">
          {remaining.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.06}>
              <Link
                href={`/insights/${a.slug}`}
                className="group block py-8 md:py-10 border-b-[0.5px] border-[#43474e]/30 last:border-b-0 transition-colors duration-500"
              >
                <div className="grid grid-cols-12 gap-4 md:gap-6 items-baseline">
                  <span className="col-span-2 text-[11px] tracking-[0.2em] uppercase text-[#c4c6cf]/55 tabular-nums">
                    {String(i + 4).padStart(2, "0")} · {a.readMinutes} min
                  </span>
                  <h3 className="col-span-12 sm:col-span-7 font-serif text-[20px] md:text-[24px] leading-[1.25] tracking-[-0.008em] text-[#d9e3f2] group-hover:text-[#D4AF37] transition-colors duration-500">
                    {a.title}
                  </h3>
                  <span className="hidden sm:flex sm:col-span-3 justify-end items-baseline text-[11px] font-semibold tracking-[0.22em] uppercase text-[#D4AF37]/70 group-hover:text-[#D4AF37] transition-colors">
                    Read <span aria-hidden className="ml-2 transition-transform group-hover:translate-x-1">&rarr;</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
