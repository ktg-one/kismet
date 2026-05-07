import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";

export function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link
      href={`/insights/${article.slug}`}
      className="group block py-8 border-t border-white/[0.08] transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-gold/40"
    >
      <div className="text-[10px] uppercase tracking-[0.2em] text-gold/80 mb-4">{article.readMinutes} min read</div>
      <h3 className="font-serif text-[1.5rem] md:text-[1.75rem] leading-[1.2] mb-4 transition-colors duration-300 group-hover:text-gold">
        {article.title}
      </h3>
      <p className="text-[15px] text-white/65 leading-[1.7] max-w-2xl">{article.summary}</p>
    </Link>
  );
}
