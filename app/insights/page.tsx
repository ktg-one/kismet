import { Hero } from "@/components/Hero";
import { ArticleCard } from "@/components/ArticleCard";
import { listArticles } from "@/lib/articles";

export default async function Insights() {
  const articles = await listArticles();
  return (
    <>
      <Hero
        eyebrow="Insights"
        headline={<>What we tell people, before they&apos;re clients.</>}
        sub="Short reads on the things most Australians never get told about money, lending, and property. General information only. Not advice."
        ctaLabel="Book a private call"
        ctaHref="/contact"
      />
      <section className="mx-auto max-w-3xl px-6 pb-28 md:pb-36">
        <div className="border-b border-white/[0.08]">
          {articles.map((a) => <ArticleCard key={a.slug} article={a} />)}
        </div>
      </section>
    </>
  );
}
