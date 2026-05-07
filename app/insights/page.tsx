import { Hero } from "@/components/Hero";
import { ArticleCard } from "@/components/ArticleCard";
import { Reveal } from "@/components/Reveal";
import { listArticles } from "@/lib/articles";

export default async function Insights() {
  const articles = await listArticles();
  return (
    <>
      <Hero
        eyebrow="Insights"
        headline="What we tell people, before they’re clients."
        sub="Short reads on the things most Australians never get told about money, lending, and property. General information only. Not advice."
        ctaLabel="Book a private call"
        ctaHref="/contact"
        showScrollCue={false}
      />

      <section className="atmosphere-soft">
        <div className="mx-auto max-w-7xl px-6 md:px-10 pb-32 md:pb-40 pt-12 md:pt-16">
          <div className="grid grid-cols-12 gap-6 mb-12 md:mb-16">
            <div className="col-span-12 md:col-span-1">
              <Reveal>
                <div className="hidden md:block hero-rule h-12" aria-hidden />
              </Reveal>
            </div>
            <div className="col-span-12 md:col-span-9">
              <Reveal>
                <div className="eyebrow eyebrow-with-dot">
                  <span className="eyebrow-dot" />
                  <span>The library</span>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="hidden md:block col-span-1" aria-hidden />
            <div className="col-span-12 md:col-span-10">
              <div className="border-b border-white/[0.07]">
                {articles.map((a, i) => (
                  <Reveal key={a.slug} delay={i * 0.06}>
                    <ArticleCard article={a} index={i} />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
