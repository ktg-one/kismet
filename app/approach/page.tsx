import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { ThreeStep } from "@/components/ThreeStep";
import { ComplianceLine } from "@/components/ComplianceLine";
import { Compass, Hub, Sail } from "@/components/Icons";

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
    caption: "your current position",
    body: "Before plotting a course, we set the coordinates. We start with a clear, uncompromising audit of where you are. Numbers, structures, hidden risks, and what prosperity actually looks like for you. We strip the noise back to the truth of your starting point.",
  },
  {
    number: "02",
    icon: <Hub className="w-7 h-7" />,
    title: "Coordinate",
    caption: "the right conversations",
    body: "Strategy is an ensemble, not a soloist. We act as the conductor for your financial ecosystem, coordinating the technical conversations between your accountants, brokers and specialists. By keeping that dialogue moving, strategy stops forming in silos and every professional aligns around your one objective.",
  },
  {
    number: "03",
    icon: <Sail className="w-7 h-7" />,
    title: "Navigate",
    caption: "the pathways forward",
    body: "With a clear map and a unified team, we execute. The Navigate phase is ongoing. Markets shift, legislation moves, your position changes. We stay in the room, recalibrating where needed and keeping execution clean. You retain the call. We hold the picture.",
  },
];

export default function ApproachPage() {
  return (
    <>
      <Hero
        eyebrow="How we work"
        headline="Clarity amidst"
        headlineMuted="complexity."
        sub={
          <>
            Strategy should not be overwhelming. We refined our approach into a predictable
            three-step methodology designed to provide profound clarity. A structured sanctuary for
            your strategy, where every decision is grounded in truth and executed with precision.
          </>
        }
        ctaLabel="Begin the Conversation"
        ctaHref="/contact"
        showScrollCue={false}
      />

      <ThreeStep steps={steps} />

      {/* Reassurance / mid-page CTA strip */}
      <section className="py-20 md:py-24 px-6 md:px-12 lg:px-16">
        <div className="max-w-[1280px] mx-auto">
          <Reveal>
            <div className="bg-[#1E3A5F]/30 border border-[#43474e]/30 rounded-2xl p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-10 relative overflow-hidden">
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-br from-[#0a141e]/50 to-transparent pointer-events-none"
              />
              <div className="max-w-xl relative z-10">
                <h3 className="font-serif text-[32px] md:text-[40px] leading-[1.18] tracking-[-0.012em] text-[#d9e3f2] mb-5 text-balance">
                  Practical intelligence.
                  <span className="block text-[#adc8f5]/85">Zero overwhelm.</span>
                </h3>
                <p className="text-[16px] md:text-[18px] text-[#c4c6cf] leading-[1.65] mb-8">
                  Our methodology is designed to absorb the complexity, presenting you only with
                  clear, actionable pathways. The relief of structured guidance.
                </p>
                <Link href="/contact" className="cta-gold">
                  <span>Commence Your Audit</span>
                  <span aria-hidden className="cta-arrow">&rarr;</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Boundaries / what we are and aren't */}
      <section className="py-20 md:py-28 bg-[#050f19]">
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
