import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { ComplianceLine } from "@/components/ComplianceLine";

export const metadata = {
  title: "How We Work | Kismet Finance Group",
  description:
    "Plain process. Real coordination. No pitch on the first call. No commissions you pay. Here is exactly what happens when you reach out.",
};

const steps = [
  {
    number: "01",
    title: "A real conversation first",
    body: "We sit with you, on the phone or on Zoom, and listen. No pitch. No script. We map out where you are, where you want to be, and the gap in between. The first call costs you nothing and commits you to nothing.",
  },
  {
    number: "02",
    title: "The right specialists in the room",
    body: "Once we understand your position, we bring in the licensed people who actually do the regulated work. Brokers, accountants, SMSF administrators, property partners. We sit in the room with you while they do their job, so the right questions get asked and the right things get heard.",
  },
  {
    number: "03",
    title: "We coordinate the moves",
    body: "Most people don't have a strategy problem. They have a coordination problem. Three or four good professionals who never talk to each other. We sit across the whole picture so the moves you start actually finish.",
  },
  {
    number: "04",
    title: "You decide. Always.",
    body: "Nothing happens without your call. We surface options, explain the trade-offs in plain English, then step back. Your money. Your strategy. Your move.",
  },
];

export default function ApproachPage() {
  return (
    <>
      {/* Hero */}
      <Hero
        eyebrow="How we work"
        headline="Plain process. Real coordination."
        sub="No pitch on the first call. No commissions you pay. No middleman games. Here is exactly what happens when you reach out, and exactly what doesn't."
        ctaLabel="Book a private call"
        ctaHref="/contact"
      />

      {/* Four-step process */}
      <Reveal as="section" className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6">
          {steps.map((step, i) => {
            const isLast = i === steps.length - 1;
            const delay = i * 0.08;
            return (
              <Reveal key={step.number} delay={delay}>
                <div
                  className={`grid grid-cols-[auto_1fr] gap-6 md:gap-10${isLast ? "" : " border-b border-white/[0.06] pb-12 mb-2"}`}
                >
                  {/* Step number */}
                  <div className="pt-1">
                    <span className="font-serif text-3xl md:text-[2.75rem] text-gold leading-none select-none">
                      {step.number}
                    </span>
                  </div>

                  {/* Step content */}
                  <div className="pb-12">
                    <h2 className="font-serif text-[1.375rem] md:text-2xl text-white mb-3">
                      {step.title}
                    </h2>
                    <p className="text-[16px] md:text-[17px] text-white/75 leading-[1.75]">
                      {step.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Reveal>

      {/* Compliance fold */}
      <Reveal
        as="section"
        className="bg-navy-deep border-t border-white/[0.06] py-20 md:py-24"
      >
        <div className="mx-auto max-w-3xl px-6">
          <Reveal delay={0.06}>
            <h2 className="font-serif text-[1.5rem] md:text-2xl text-gold mb-6">
              What we are, and aren't
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="text-[16px] md:text-[17px] text-white/75 leading-[1.75] mb-8">
              Kismet Finance Group is a strategic introducer and coordinator. We
              do not hold an Australian Financial Services Licence. We do not
              provide personal financial advice. We do not sell financial
              products. The licensed brokers, advisers and specialists you meet
              through us are independently regulated. Their advice is theirs.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <ComplianceLine />
          </Reveal>
        </div>
      </Reveal>

      {/* Closing strip */}
      <Reveal as="section" className="py-28 md:py-36">
        <div
          className="relative py-20 md:py-28 px-6"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 70%)",
          }}
        >
          <div className="mx-auto max-w-3xl px-6 text-center">
            <Reveal delay={0.06}>
              <p className="font-serif text-[2rem] md:text-[2.5rem] leading-[1.2] text-white">
                It's not about money. It's about what money unlocks.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 text-[14px] uppercase tracking-[0.2em] text-white/55">
                Book a private call when you're ready to start.
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
