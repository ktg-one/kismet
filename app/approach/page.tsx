import { MagneticCTA } from "@/components/MagneticCTA";
import { ComplianceLine } from "@/components/ComplianceLine";
import { Hero } from "@/components/Hero";
import { Compass, Hub, Sail } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { ThreeStep } from "@/components/ThreeStep";

export const metadata = {
  title: "How We Work | Kismet Finance Group",
  description:
    "Plain process. Real coordination. Three steps: Understand, Coordinate, Navigate. No pitch on the first call. No commissions you pay.",
};

const steps = [
  {
    number: "01",
    icon: <Compass className="w-7 h-7" />,
    title: "Understand",
    caption: "where you are",
    body: "Before we map the road, we work out the starting point. We go through what is there: the numbers, the structures, the things that have been put off. No jargon, no judgement. Just an honest read of your position and what you actually want from the next ten years.",
  },
  {
    number: "02",
    icon: <Hub className="w-7 h-7" />,
    title: "Coordinate",
    caption: "the right conversations",
    body: "Strategy falls apart when no one is coordinating. We get your accountant, broker and specialists in the same conversation and run the play across all of them. We translate where needed and we keep the timing tight. You stop hearing three different versions of the same answer.",
  },
  {
    number: "03",
    icon: <Sail className="w-7 h-7" />,
    title: "Navigate",
    caption: "the path forward",
    body: "With a clear picture and a connected team, you can move. The Navigate part keeps going. Markets shift, legislation changes, your position changes. We stay close and adjust course when it makes sense. You make the calls. We keep the strategy moving.",
  },
];

export default function ApproachPage() {
  return (
    <>
      <Hero
        eyebrow="How we work"
        headline="Clarity, not"
        headlineMuted="complexity."
        sub={
          <>
            Finance should not be overwhelming. Our approach is three steps. Understand where you
            are. Coordinate the right people. Move forward together. Plain English, calm pace,
            real progress.
          </>
        }
        ctaLabel="Book a call"
        ctaHref="https://calendar.app.google/gBTNh7XSxQXxiXZF7"
        showScrollCue={false}
      />

      <ThreeStep steps={steps} />

      {/* Reassurance / mid-page CTA strip */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16 section-blend-top">
        <div className="max-w-[1280px] mx-auto">
          <Reveal>
            <div className="bg-[#1E3A5F]/30 border border-[#43474e]/30 rounded-2xl p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-10 relative overflow-hidden">
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-br from-[#0a141e]/50 to-transparent pointer-events-none"
              />
              <div className="max-w-xl relative z-10">
                <h3 className="font-serif text-[32px] md:text-[40px] leading-[1.18] tracking-[-0.012em] text-[#d9e3f2] mb-5 text-balance">
                  Plain process.
                  <span className="block text-[#adc8f5]/85">Real coordination.</span>
                </h3>
                <p className="text-[16px] md:text-[18px] text-[#c4c6cf] leading-[1.65] mb-8">
                  We deal with the complicated bits so you don&rsquo;t have to. You get clear
                  options, the right people in the room, and a steady pace. No pressure, no
                  jargon.
                </p>
                <MagneticCTA href="https://calendar.app.google/gBTNh7XSxQXxiXZF7">
                  <span>Book a call</span>
                  <span aria-hidden className="cta-arrow">&rarr;</span>
                </MagneticCTA>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Boundaries / what we are and aren't */}
      <section className="py-24 md:py-32 bg-[#050f19] section-blend-top">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
            <div className="md:col-span-4">
              <Reveal>
                <div className="md:sticky md:top-32">
                  <span className="inline-flex items-center gap-3 text-[12px] font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-5">
                    <span aria-hidden className="w-6 h-px bg-[#D4AF37]/60" />
                    Boundaries
                  </span>
                  <h2 className="font-serif text-[28px] md:text-[32px] leading-[1.2] tracking-[-0.008em] text-[#d9e3f2] max-w-xs">
                    What we are. What we aren&rsquo;t.
                  </h2>
                </div>
              </Reveal>
            </div>

            <div className="md:col-span-8">
              <Reveal delay={0.08}>
                <p className="text-[17px] md:text-[18px] text-[#c4c6cf] leading-[1.75] mb-6">
                  Kismet operates as a strategic coordinator. On the finance side we operate as
                  authorised representatives within the Home Loan Solutions / Australian Finance
                  Group network (AFG, Australian Credit Licence 389087). That gives the brokers we
                  introduce access to AFG&rsquo;s panel of approximately 70 Australian lenders.
                </p>
              </Reveal>

              <Reveal delay={0.14}>
                <p className="text-[17px] md:text-[18px] text-[#c4c6cf] leading-[1.75] mb-10">
                  The licensed brokers, advisers and specialists you meet through us are
                  independently regulated. Their advice is theirs. Ours is the coordination, before
                  and after.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <ul className="grid gap-3 sm:grid-cols-2 mb-12">
                  {[
                    "We don't hold our own AFSL or Australian Credit Licence",
                    "We don't provide personal financial, credit or tax advice",
                    "We don't sell financial products",
                    "We don't take fees or commissions from you",
                    "We don't pressure you toward any specific provider",
                  ].map((line, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-[15px] text-[#c4c6cf]/85 leading-[1.65]"
                    >
                      <span aria-hidden className="mt-2 flex-none w-3 h-px bg-[#D4AF37]/60" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.26}>
                <div className="pt-8 border-t-[0.5px] border-[#43474e]/30">
                  <ComplianceLine />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
