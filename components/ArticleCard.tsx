import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";

interface ArticleCardProps {
  article: ArticleMeta;
  index?: number;
  featured?: boolean;
}

export function ArticleCard({ article, index, featured = false }: ArticleCardProps) {
  if (featured) {
    return (
      <Link
        href={`/insights/${article.slug}`}
        className="group block py-14 md:py-16 border-t border-white/[0.1] transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-gold/55"
      >
        <div className="grid grid-cols-12 gap-6 items-start">
          <div className="col-span-12 md:col-span-2 flex items-center gap-4">
            {typeof index === "number" && (
              <span className="index-marker">{String(index + 1).padStart(2, "0")}</span>
            )}
            <span className="text-[10px] uppercase tracking-[0.24em] text-gold/85">
              Featured · {article.readMinutes} min
            </span>
          </div>

          <div className="col-span-12 md:col-span-9">
            <h3 className="font-serif text-[2rem] md:text-[2.875rem] lg:text-[3.25rem] leading-[1.08] tracking-[-0.018em] mb-6 text-white transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-gold max-w-3xl">
              {article.title}
            </h3>
            <p className="text-[17px] md:text-[18px] text-white/72 leading-[1.7] max-w-2xl">
              {article.summary}
            </p>
            <div className="mt-8 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] font-semibold text-gold/85 border-b border-gold/35 pb-1.5 transition-all duration-500 group-hover:text-gold group-hover:border-gold group-hover:tracking-[0.28em]">
              <span>Read</span>
              <span aria-hidden>&rarr;</span>
            </div>
          </div>

          <div className="hidden md:flex col-span-1 justify-end items-center pt-4">
            <span
              aria-hidden
              className="inline-flex items-center justify-center text-gold/65 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-gold group-hover:translate-x-2"
            >
              <svg width="28" height="16" viewBox="0 0 22 14" fill="none">
                <path d="M1 7H21M21 7L15 1M21 7L15 13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/insights/${article.slug}`}
      className="group block py-10 md:py-12 border-t border-white/[0.07] transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-gold/40"
    >
      <div className="grid grid-cols-12 gap-6 items-start">
        <div className="col-span-12 md:col-span-2 flex items-center gap-4">
          {typeof index === "number" && (
            <span className="index-marker">{String(index + 1).padStart(2, "0")}</span>
          )}
          <span className="text-[10px] uppercase tracking-[0.22em] text-white/45">
            {article.readMinutes} min
          </span>
        </div>

        <div className="col-span-12 md:col-span-9">
          <h3 className="font-serif text-[1.5rem] md:text-[1.75rem] leading-[1.18] tracking-[-0.012em] mb-3 text-white transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-gold">
            {article.title}
          </h3>
          <p className="text-[15px] md:text-[16px] text-white/62 leading-[1.7] max-w-2xl">
            {article.summary}
          </p>
        </div>

        <div className="hidden md:flex col-span-1 justify-end items-center pt-3">
          <span
            aria-hidden
            className="inline-flex items-center justify-center text-gold/55 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-gold group-hover:translate-x-2"
          >
            <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
              <path d="M1 7H21M21 7L15 1M21 7L15 13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
