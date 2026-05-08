import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { FoundersBlock } from "@/components/FoundersBlock";
import { PullQuote } from "@/components/PullQuote";
import { MagneticCTA } from "@/components/MagneticCTA";
import { Photo } from "@/components/Photo";

export const metadata = {
  title: "About | Kismet Finance Group",
  description:
    "Kismet exists because most Australians get sold products instead of getting strategy. We coordinate the picture before the licensed specialists step in.",
};

export default function AboutPage() {
  return (
    <>
      <Hero
        eyebrow="About Kismet"
        headline="Built so the picture finally hangs together."
        sub="Most Australians get sold products instead of getting strategy. We coordinate the whole picture, then bring in the licensed specialists who do the regulated work, so the moves you have started actually finish."
        ctaLabel="Book a private call"
        ctaHref="/contact"
        showScrollCue={false}
      />

      {/* Story 1 */}
      <section className="atmosphere-soft">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-28 md:py-36">
          <div className="grid grid-cols-12 gap-6 md:gap-12">
            <div className="col-span-12 md:col-span-4 lg:col-span-3">
              <Reveal>
                <div className="md:sticky md:top-32">
                  <div className="flex items-center gap-4 mb-7">
                    <span aria-hidden className="font-serif italic text-[14px] text-gold/75 tabular-nums">I.</span>
                    <span aria-hidden className="h-px w-8 bg-gold/35" />
                    <span className="text-[10px] uppercase tracking-[0.32em] text-gold/85">The reason</span>
                  </div>
                  <h2 className="display-md text-white max-w-xs leading-[1.15]">
                    Why we built this
                  </h2>
                </div>
              </Reveal>
            </div>

            <div className="col-span-12 md:col-span-8 lg:col-span-8 lg:col-start-5">
              <Reveal delay={0.1}>
                <div className="space-y-7 text-[17px] md:text-[18px] leading-[1.78] text-white/78">
                  <p>
                    Most Australians don&rsquo;t have a strategy problem. They have a coordination problem. They have a broker, an accountant, maybe a financial planner, and none of them talk to each other. Everyone is doing their bit. Nobody is holding the picture together.
                  </p>
                  <p>
                    That is where Kismet comes in. We don&rsquo;t hold an AFSL and we don&rsquo;t replace your specialists. What we do is sit across the whole picture and coordinate the moves between the licensed people who do the regulated work. Broker, accountant, SMSF specialist, property partner. We make sure they are pointing in the same direction, at the same time, for you.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Documentary photo, mid-page interrupt */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-12 md:py-20">
          <Photo
            src="/photos/team-focused.jpg"
            alt="Kismet Finance Group team at work"
            caption="The work happens in the room, before anything goes to a specialist."
            meta="Brisbane · Working session"
            aspect="16/9"
          />
        </div>
      </section>

      {/* Pull quote interrupt */}
      <PullQuote attribution="Shane Hewson, Founder">
        It&rsquo;s not about money. It&rsquo;s about what money unlocks.
      </PullQuote>

      {/* Story 2 */}
      <section className="atmosphere-deep">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-28 md:py-36">
          <div className="grid grid-cols-12 gap-6 md:gap-12">
            <div className="col-span-12 md:col-span-4 lg:col-span-3">
              <Reveal>
                <div className="md:sticky md:top-32">
                  <div className="flex items-center gap-4 mb-7">
                    <span aria-hidden className="font-serif italic text-[14px] text-gold/75 tabular-nums">II.</span>
                    <span aria-hidden className="h-px w-8 bg-gold/35" />
                    <span className="text-[10px] uppercase tracking-[0.32em] text-gold/85">How we operate</span>
                  </div>
                  <h2 className="display-md text-white max-w-xs leading-[1.15]">
                    In plain English
                  </h2>
                </div>
              </Reveal>
            </div>

            <div className="col-span-12 md:col-span-8 lg:col-span-8 lg:col-start-5">
              <Reveal delay={0.1}>
                <div className="space-y-7 text-[17px] md:text-[18px] leading-[1.78] text-white/78">
                  <p>
                    The first call is a real conversation. No pitch, no product, no homework to prep beforehand. We listen, ask questions, and figure out where you actually are. Most people leave that call clearer than they have been in years, just from having someone ask the right questions.
                  </p>
                  <p>
                    From there we bring in the right specialists. Brokers, accountants, SMSF administrators, property and project partners. The licensed people who handle the regulated work. We sit in the room while they do it, so the right things get heard and nothing falls between the cracks.
                  </p>
                  <p>
                    On the finance side, we operate as authorised representatives within the Home Loan Solutions / Australian Finance Group network. That gives the brokers we introduce access to AFG&rsquo;s panel of approximately 70 Australian lenders. We are not the broker, and we don&rsquo;t hold our own credit licence. Our role is making sure the right broker is in the room, then staying in the room with you while they do their regulated work.
                  </p>
                  <p>
                    We stay in the picture for the long haul. Our work doesn&rsquo;t end at the introduction. We follow up, coordinate, and keep things moving. The clients we work with are typically Australians who have built something real and want to make sure it is working as hard as they have.
                  </p>
                </div>
              </Reveal>

              {/* Network credentials - authority by attribution, not by claim */}
              <Reveal delay={0.18}>
                <aside className="mt-14 md:mt-16 pt-10 border-t border-white/[0.08]">
                  <div className="flex items-center gap-4 mb-6">
                    <span aria-hidden className="font-serif italic text-[14px] text-gold/75 tabular-nums">·</span>
                    <span aria-hidden className="h-px w-8 bg-gold/35" />
                    <span className="text-[10px] uppercase tracking-[0.32em] text-gold/85">On the network</span>
                  </div>
                  <h3 className="font-serif text-[1.5rem] md:text-[1.75rem] tracking-[-0.012em] text-white leading-[1.2] mb-5 max-w-2xl">
                    What sits behind the introductions.
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-x-10 gap-y-3 text-[14px] md:text-[15px] text-white/65 leading-[1.7] mb-6">
                    <div>
                      <span className="text-white/40 text-[10px] uppercase tracking-[0.24em] block mb-1.5">Established</span>
                      <span>1994 · ASX-listed since 2015</span>
                    </div>
                    <div>
                      <span className="text-white/40 text-[10px] uppercase tracking-[0.24em] block mb-1.5">Scale</span>
                      <span>Approx. 3,500 brokers Australia-wide</span>
                    </div>
                    <div>
                      <span className="text-white/40 text-[10px] uppercase tracking-[0.24em] block mb-1.5">Lender panel</span>
                      <span>Approximately 70 Australian lenders</span>
                    </div>
                    <div>
                      <span className="text-white/40 text-[10px] uppercase tracking-[0.24em] block mb-1.5">Licence</span>
                      <span className="tabular-nums">Australian Finance Group Ltd · ACL 389087</span>
                    </div>
                  </div>
                  <p className="text-[13.5px] md:text-[14px] text-white/45 italic font-serif leading-[1.75] max-w-2xl">
                    Our authorised representative arrangement sits within this network. Kismet does not hold its own credit licence; the regulated work is done by the licensed brokers in the AFG network we introduce you to.
                  </p>
                </aside>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Founders */}
      <FoundersBlock
        eyebrow="The people"
        heading="The names that pick up when you call."
        founders={[
          {
            name: "Shane Hewson",
            role: "Founder · Director",
            bring:
              "Works across the clients and the business. Shapes the strategy, the partnerships, the opportunities and the systems that run Kismet. Steps in directly when the bigger picture needs mapping.",
            status: "active",
          },
          {
            name: "Josh Clark",
            role: "Business Partner",
            bring:
              "Sits closest to the clients. Guides the relationship from the first conversation through to the next step, coordinates with the right specialists, and keeps people supported the whole way through.",
            status: "active",
          },
          {
            name: "Amy Stoddart",
            role: "Executive Assistant",
            bring:
              "Joining mid-2026. Keeps every moving piece on track so nothing gets dropped between the calls, the partners, and the follow-throughs.",
            status: "incoming",
          },
        ]}
      />

      {/* Closing strip */}
      <section className="relative">
        <div className="rule-fade" />
        <div className="mx-auto max-w-4xl px-6 md:px-10 py-28 md:py-36 text-center">
          <Reveal>
            <p className="font-serif text-[2rem] md:text-[2.75rem] leading-[1.15] tracking-[-0.012em] text-white">
              Most people don&rsquo;t fail because they made the wrong move.
              <span className="block text-white/55 mt-3">
                They fail because they made no move at all.
              </span>
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-12">
              <MagneticCTA href="/contact">
                <span>Sit with us</span>
                <span aria-hidden className="cta-arrow">&rarr;</span>
              </MagneticCTA>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
