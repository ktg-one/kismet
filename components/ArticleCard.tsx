import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";

export function ArticleCard({ article, index }: { article: ArticleMeta; index?: number }) {
  return (
    <Link
      href={`/insights/${article.slug}`}
      className="group block py-12 md:py-14 border-t border-white/[0.07] transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-gold/40"
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
          <h3 className="font-serif text-[1.625rem] md:text-[2rem] leading-[1.15] tracking-[-0.012em] mb-4 text-white transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-gold">
            {article.title}
          </h3>
          <p className="text-[15px] md:text-[16px] text-white/65 leading-[1.75] max-w-2xl">
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
