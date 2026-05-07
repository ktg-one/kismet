import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";

export const metadata = {
  title: "About | Kismet Finance Group",
  description:
    "Kismet exists because most Australians get sold products instead of getting strategy. We sit between you and the licensed specialists you actually need.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Hero
        eyebrow="About Kismet"
        headline="Built so the picture finally hangs together."
        sub="Most Australians get sold products instead of getting strategy. We sit between you and the licensed specialists you actually need, so the moves you've started actually finish."
        ctaLabel="Book a private call"
        ctaHref="/contact"
      />

      {/* Story 1: Why Kismet exists */}
      <Reveal as="section" className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal delay={0.06}>
            <h2 className="font-serif text-[1.875rem] md:text-[2.5rem] leading-[1.15] tracking-[-0.012em] text-white mb-10">
              The reason we built this
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="space-y-6 text-[17px] md:text-[18px] leading-[1.75] text-white/80">
              <p>
                Most Australians don't have a strategy problem. They have a
                coordination problem. They have a broker, an accountant, maybe a
                financial planner, and none of them talk to each other. Everyone
                is doing their bit. Nobody is holding the picture together.
              </p>
              <p>
                That's where Kismet comes in. We don't sell anything. We don't
                hold an AFSL. What we do is sit across the whole picture and
                coordinate the moves between the licensed specialists who
                actually do the regulated work. Broker, accountant, SMSF
                administrator, property partner. We make sure they're pointing
                in the same direction, at the same time, for you.
              </p>
              <p>
                It's not about money. It's about what money unlocks. And for
                most people, the gap between where they are and where they want
                to be isn't a product gap. It's a clarity gap. That's what we
                close.
              </p>
            </div>
          </Reveal>
        </div>
      </Reveal>

      {/* Story 2: How we operate */}
      <Reveal as="section" className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal delay={0.06}>
            <h2 className="font-serif text-[1.875rem] md:text-[2.5rem] leading-[1.15] tracking-[-0.012em] text-white mb-10">
              How we work, in plain English
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="space-y-6 text-[17px] md:text-[18px] leading-[1.75] text-white/80">
              <p>
                The first call is a real conversation. No pitch, no product, no
                homework to prep beforehand. We listen, ask questions, and figure
                out where you actually are. Most people leave that call feeling
                clearer than they have in years, just from having someone ask the
                right questions.
              </p>
              <p>
                From there we bring in the right specialists. Brokers,
                accountants, SMSF administrators, property partners. The licensed
                people who handle the regulated work. We sit in the room with you
                while they do it, so nothing falls between the cracks and nothing
                gets lost in translation.
              </p>
              <p>
                We stay in the picture for the long haul. Our work doesn't end at
                the introduction. We follow up, coordinate, and keep things
                moving. The clients we work with are typically Australians who
                have built something real and want to make sure it's working as
                hard as they have.
              </p>
            </div>
          </Reveal>

          {/* Who you'll work with */}
          <Reveal delay={0.2}>
            <div className="mt-16 border-t border-white/10 pt-10">
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/40 mb-8">
                Who you'll work with
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="font-serif text-lg text-white">Shane Hewson</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-gold">
                    Founder &amp; Director
                  </p>
                </div>
                <div>
                  <p className="font-serif text-lg text-white">Josh Clark</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-gold">
                    Business Partner
                  </p>
                </div>
                <div>
                  <p className="font-serif text-lg text-white">Amy Stoddart</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-gold/60">
                    Executive Assistant (joining June 2026)
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Reveal>

      {/* Closing strip */}
      <Reveal as="section" className="py-24 md:py-36">
        <div
          className="relative py-20 md:py-28 px-6"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 70%)",
          }}
        >
          <div className="mx-auto max-w-3xl text-center">
            <Reveal delay={0.06}>
              <p className="font-serif text-[2rem] md:text-[2.5rem] leading-[1.2] text-white">
                Most people don't fail because they made the wrong move. They
                fail because they made no move at all.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 text-[17px] md:text-[18px] leading-[1.75] text-white/65">
                Book a private call when you're ready to make a move.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-10">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] font-semibold pl-7 pr-6 py-4 rounded-sm bg-gold-gradient text-navy-deep shadow-[0_10px_40px_-10px_rgba(212,175,55,0.45)] transition-shadow duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_18px_60px_-12px_rgba(212,175,55,0.6)]"
                >
                  <span>Book a private call</span>
                  <span
                    aria-hidden
                    className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </Reveal>
    </>
  );
}
