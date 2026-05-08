import { Hero } from "@/components/Hero";
import { ArticleCard } from "@/components/ArticleCard";
import { Reveal } from "@/components/Reveal";
import { listArticles } from "@/lib/articles";

export const metadata = {
  title: "Insights | Kismet Finance Group",
  description:
    "Short, plain-English notes from operators on lending, structure, SMSF property and the conversations that change outcomes. General information only.",
};

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
                <div className="flex items-center gap-4">
                  <span aria-hidden className="font-serif italic text-[14px] text-gold/75 tabular-nums">I.</span>
                  <span aria-hidden className="h-px w-8 bg-gold/35" />
                  <span className="text-[10px] uppercase tracking-[0.32em] text-gold/85">The library</span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-serif text-[1.875rem] md:text-[2.5rem] leading-[1.15] tracking-[-0.012em] text-white max-w-2xl mt-7">
                  Short reads. Real questions.
                  <span className="block text-white/55 mt-2">
                    The kind of conversations clients have with us before they become clients.
                  </span>
                </h2>
              </Reveal>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="hidden md:block col-span-1" aria-hidden />
            <div className="col-span-12 md:col-span-10">
              <div className="border-b border-white/[0.07]">
                {articles.map((a, i) => (
                  <Reveal key={a.slug} delay={i * 0.06}>
                    <ArticleCard article={a} index={i} featured={i === 0} />
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
