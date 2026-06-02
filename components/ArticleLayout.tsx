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
            style={{
              top: "-10%",
              right: "-6%",
              width: "55vw",
              height: "55vw",
              maxWidth: "780px",
              maxHeight: "780px",
              opacity: 0.55,
            }}
            aria-hidden
          />
        </div>

        <div className="relative max-w-[1100px] mx-auto px-6 md:px-12 lg:px-16 pt-28 md:pt-40 pb-16 md:pb-24">
          <Reveal>
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase text-[#c4c6cf]/65 hover:text-[#D4AF37] transition-colors duration-500 mb-12"
            >
              <span aria-hidden>&larr;</span>
              <span>Back to Insights</span>
            </Link>
          </Reveal>

          <Reveal>
            <span className="inline-flex items-center gap-3 text-[12px] font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-8">
              <span aria-hidden className="w-6 h-px bg-[#D4AF37]/60" />
              {article.readMinutes} min read · Kismet Insights
            </span>
          </Reveal>

          <RevealWords
            text={article.title}
            as="h1"
            className="font-serif text-[36px] sm:text-[44px] md:text-[56px] lg:text-[64px] leading-[1.06] tracking-[-0.018em] text-[#d9e3f2] max-w-[20ch] text-balance"
            delay={0.05}
            stagger={0.045}
          />

          <Reveal delay={0.28}>
            <p className="mt-8 md:mt-10 text-[18px] md:text-[20px] text-[#c4c6cf]/85 leading-[1.6] max-w-2xl">
              {article.summary}
            </p>
          </Reveal>
        </div>
      </header>

      {/* Article body */}
      <article className="bg-[#050f19]">
        <div className="max-w-[800px] mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-20 md:pb-28">
          <Reveal>
            <div
              className="prose prose-invert prose-lg max-w-none
                         prose-headings:font-serif prose-headings:text-[#d9e3f2] prose-headings:tracking-[-0.012em]
                         prose-h2:mt-16 prose-h2:mb-7 prose-h2:text-[28px] md:prose-h2:text-[36px] prose-h2:leading-[1.2]
                         prose-h3:mt-12 prose-h3:mb-5 prose-h3:text-[22px] md:prose-h3:text-[26px] prose-h3:leading-[1.25]
                         prose-p:text-[#c4c6cf] prose-p:leading-[1.8] prose-p:text-[16px] md:prose-p:text-[18px]
                         prose-strong:text-[#d9e3f2] prose-strong:font-semibold
                         prose-em:text-[#D4AF37] prose-em:not-italic
                         prose-a:text-[#D4AF37] prose-a:no-underline prose-a:border-b prose-a:border-[#D4AF37]/40 hover:prose-a:border-[#D4AF37]
                         prose-ul:text-[#c4c6cf] prose-ul:my-7
                         prose-li:text-[#c4c6cf] prose-li:leading-[1.8] prose-li:my-2
                         prose-blockquote:border-l-[#D4AF37]/50 prose-blockquote:text-[#d9e3f2]/85 prose-blockquote:font-serif prose-blockquote:not-italic prose-blockquote:text-[20px] prose-blockquote:leading-[1.5] prose-blockquote:pl-7"
              dangerouslySetInnerHTML={{ __html: article.html }}
            />
          </Reveal>

          <Reveal>
            <div className="mt-20 pt-10 border-t-[0.5px] border-[#43474e]/30">
              <ComplianceLine />
            </div>
          </Reveal>
        </div>
      </article>

      {/* Closing CTA */}
      <section className="relative bg-[#1e3450] overflow-hidden">
        <div className="absolute inset-0 smoke-gradient opacity-50" />
        <div className="relative max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32 text-center">
          <Reveal>
            <h2 className="font-serif text-[28px] md:text-[40px] leading-[1.18] tracking-[-0.012em] text-[#d9e3f2] max-w-2xl mx-auto text-balance">
              The point of all this is the conversation it leads to.
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-10">
              <MagneticCTA href="https://calendar.app.google/gBTNh7XSxQXxiXZF7">
                <span>Open the conversation</span>
                <span aria-hidden className="cta-arrow">&rarr;</span>
              </MagneticCTA>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
