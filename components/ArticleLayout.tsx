import Link from "next/link";
import type { Article } from "@/lib/articles";
import { ComplianceLine } from "./ComplianceLine";
import { Reveal, RevealWords } from "./Reveal";
import { MagneticCTA } from "./MagneticCTA";

export function ArticleLayout({ article }: { article: Article }) {
  return (
    <>
      {/* Article hero */}
      <header className="relative overflow-hidden hero-atmosphere">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="ambient-orb ambient-orb-gold"
            style={{ top: "-10%", right: "-6%", width: "55vw", height: "55vw", maxWidth: "780px", maxHeight: "780px", opacity: 0.6 }}
            aria-hidden
          />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 md:px-10 pt-32 md:pt-44 pb-20 md:pb-28">
          <Reveal>
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-white/55 hover:text-gold transition-colors duration-500 mb-12"
            >
              <span aria-hidden>&larr;</span>
              <span>Back to Insights</span>
            </Link>
          </Reveal>

          <Reveal>
            <div className="eyebrow eyebrow-with-dot mb-10">
              <span className="eyebrow-dot" />
              <span>{article.readMinutes} min read · Kismet Insights</span>
            </div>
          </Reveal>

          <RevealWords
            text={article.title}
            as="h1"
            className="font-serif text-[2.25rem] sm:text-[2.75rem] md:text-[3.5rem] lg:text-[4rem] leading-[1.06] tracking-[-0.018em] text-white max-w-[20ch]"
            delay={0.05}
            stagger={0.045}
          />

          <Reveal delay={0.5}>
            <p className="mt-10 text-[18px] md:text-[20px] text-white/72 leading-[1.6] max-w-2xl">
              {article.summary}
            </p>
          </Reveal>
        </div>
        <div className="rule-fade" />
      </header>

      {/* Article body */}
      <article className="atmosphere-soft">
        <div className="mx-auto max-w-3xl px-6 md:px-10 pt-20 md:pt-28 pb-24 md:pb-32">
          <Reveal>
            <div
              className="prose prose-invert prose-lg max-w-none
                         prose-headings:font-serif prose-headings:text-white prose-headings:tracking-[-0.012em]
                         prose-h2:mt-20 prose-h2:mb-8 prose-h2:text-[1.875rem] md:prose-h2:text-[2.25rem] prose-h2:leading-[1.2]
                         prose-h3:mt-14 prose-h3:mb-5 prose-h3:text-[1.375rem] md:prose-h3:text-[1.625rem] prose-h3:leading-[1.25]
                         prose-p:text-white/80 prose-p:leading-[1.85] prose-p:text-[17px] md:prose-p:text-[18px]
                         prose-strong:text-white prose-strong:font-semibold
                         prose-em:text-gold prose-em:not-italic
                         prose-a:text-gold prose-a:no-underline prose-a:border-b prose-a:border-gold/40 hover:prose-a:border-gold
                         prose-ul:text-white/80 prose-ul:my-8
                         prose-li:text-white/80 prose-li:leading-[1.8] prose-li:my-2
                         prose-blockquote:border-l-gold/50 prose-blockquote:text-white/85 prose-blockquote:font-serif prose-blockquote:not-italic prose-blockquote:text-[1.25rem] prose-blockquote:leading-[1.5] prose-blockquote:pl-7"
              dangerouslySetInnerHTML={{ __html: article.html }}
            />
          </Reveal>

          <Reveal>
            <div className="mt-24 pt-10 border-t border-white/[0.07]">
              <ComplianceLine />
            </div>
          </Reveal>
        </div>
      </article>

      {/* Closing CTA */}
      <section className="relative atmosphere-deep">
        <div className="rule-fade" />
        <div className="mx-auto max-w-4xl px-6 md:px-10 py-28 md:py-36 text-center">
          <Reveal>
            <p className="font-serif text-[1.75rem] md:text-[2.5rem] leading-[1.18] tracking-[-0.012em] text-white max-w-2xl mx-auto">
              The point of all this is the conversation it leads to.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-12">
              <MagneticCTA href="/contact">
                <span>Book a private call</span>
                <span aria-hidden className="cta-arrow">&rarr;</span>
              </MagneticCTA>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
