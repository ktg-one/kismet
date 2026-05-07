import type { Article } from "@/lib/articles";
import { ComplianceLine } from "./ComplianceLine";

export function ArticleLayout({ article }: { article: Article }) {
  return (
    <article className="mx-auto max-w-3xl px-6 pt-24 md:pt-32 pb-24 md:pb-36">
      <div className="text-[10px] uppercase tracking-[0.2em] text-gold/80 mb-6">
        {article.readMinutes} min read &middot; Kismet Insights
      </div>
      <h1 className="font-serif text-[2.25rem] md:text-[3.25rem] leading-[1.05] tracking-[-0.015em] mb-8">
        {article.title}
      </h1>
      <p className="text-[18px] md:text-[20px] text-white/70 leading-[1.55] mb-16 max-w-2xl">
        {article.summary}
      </p>
      <div
        className="prose prose-invert prose-lg max-w-none
                   prose-headings:font-serif prose-headings:text-white
                   prose-h2:mt-16 prose-h2:mb-6 prose-h2:text-[1.625rem] md:prose-h2:text-[2rem]
                   prose-p:text-white/80 prose-p:leading-[1.8] prose-p:text-[17px]
                   prose-strong:text-white prose-em:text-gold prose-em:not-italic
                   prose-a:text-gold prose-a:no-underline hover:prose-a:underline
                   prose-ul:text-white/80 prose-li:text-white/80 prose-blockquote:border-l-gold/40 prose-blockquote:text-white"
        dangerouslySetInnerHTML={{ __html: article.html }}
      />
      <div className="mt-20 pt-8 border-t border-white/[0.08]">
        <ComplianceLine />
      </div>
    </article>
  );
}
