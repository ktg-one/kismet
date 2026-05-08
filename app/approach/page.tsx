import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { PullQuote } from "@/components/PullQuote";
import { ComplianceLine } from "@/components/ComplianceLine";
import { MagneticCTA } from "@/components/MagneticCTA";
import { Photo } from "@/components/Photo";

export const metadata = {
  title: "How We Work | Kismet Finance Group",
  description:
    "Plain process. Real coordination. No pitch on the first call. No commissions you pay. Here is exactly what happens when you reach out.",
};

const steps = [
  {
    title: "A real conversation first",
    body: "We sit with you, on the phone or on Zoom, and listen. No pitch. No script. We map out where you are, where you want to be, and the gap in between. The first call costs you nothing and commits you to nothing.",
    caveat: "Not a sales call. Not a free quote. A conversation.",
  },
  {
    title: "The right specialists in the room",
    body: "Once we understand your position, we bring in the licensed people who actually do the regulated work. Brokers, accountants, SMSF administrators, property and project partners. We sit in the room while they do their job, so the right questions get asked and the right things get heard.",
  },
  {
    title: "We coordinate the moves",
    body: "Most people don't have a strategy problem. They have a coordination problem. Three or four good professionals who never talk to each other. We sit across the whole picture so the moves you start actually finish.",
  },
  {
    title: "You decide. Always.",
    body: "Nothing happens without your call. We surface options, explain the trade-offs in plain English, then step back. Your money. Your strategy. Your move.",
    caveat: "We don't pressure. We don't push. We don't follow up to twist your arm.",
  },
];

const negatives = [
  "We don't hold an AFSL",
  "We don't provide personal financial advice",
  "We don't sell financial products",
  "We don't take commissions from you",
  "We don't pressure you toward any provider",
];

export default function ApproachPage() {
  return (
    <>
      <Hero
        eyebrow="How we work"
        headline="Plain process. Real coordination."
        sub="No pitch on the first call. No commissions you pay. No middleman games. Here is exactly what happens when you reach out, and exactly what doesn't."
        ctaLabel="Book a private call"
        ctaHref="/contact"
        showScrollCue={false}
      />

      {/* Process timeline */}
      <ProcessTimeline
        eyebrow="The process"
        heading="Four steps. No surprises."
        steps={steps}
      />

      {/* Documentary moment, what it actually looks like */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-12 md:py-20">
          <Photo
            src="/photos/client-interaction.jpg"
            alt="Kismet sitting with a client during a strategy session"
            caption="What this actually looks like. A real conversation, before anything is signed."
            meta="Client session · Working through structure"
            aspect="16/9"
          />
        </div>
      </section>

      {/* Pull quote interrupt - grounded, not slogan */}
      <PullQuote attribution="Kismet operating principle">
        We don&rsquo;t replace qualified advice.
        <span className="block text-white/60 mt-2">We help you get to the right table.</span>
      </PullQuote>

      {/* Compliance fold */}
      <section className="atmosphere-deep">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-28 md:py-36">
          <div className="grid grid-cols-12 gap-6 md:gap-12">
            <div className="col-span-12 md:col-span-4 lg:col-span-3">
              <Reveal>
                <div className="md:sticky md:top-32">
                  <div className="flex items-center gap-4 mb-7">
                    <span aria-hidden className="font-serif italic text-[14px] text-gold/75 tabular-nums">II.</span>
                    <span aria-hidden className="h-px w-8 bg-gold/35" />
                    <span className="text-[10px] uppercase tracking-[0.32em] text-gold/85">Boundaries</span>
                  </div>
                  <h2 className="display-md text-white max-w-xs leading-[1.15]">
                    What we are. What we aren&rsquo;t.
                  </h2>
                </div>
              </Reveal>
            </div>

            <div className="col-span-12 md:col-span-8 lg:col-span-8 lg:col-start-5">
              <Reveal delay={0.1}>
                <p className="text-[17px] md:text-[18px] text-white/78 leading-[1.78] mb-8">
                  Kismet Finance Group operates as a strategic coordinator. On the finance side we are an authorised representative of Home Loan Solutions, a member of the Australian Finance Group aggregation network. That opens our broker partners&rsquo; panels to 70+ Australian lenders.
                </p>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="text-[17px] md:text-[18px] text-white/78 leading-[1.78] mb-12">
                  The licensed brokers, advisers and specialists you meet through us are independently regulated. Their advice is theirs. Ours is the coordination, before and after.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <ul className="grid gap-3 md:grid-cols-2 mb-14">
                  {negatives.map((line, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-[15px] text-white/72 leading-[1.65]"
                    >
                      <span aria-hidden className="mt-2 flex-none w-3 h-px bg-gold/55" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.26}>
                <div className="pt-8 border-t border-white/[0.06]">
                  <ComplianceLine />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Closing strip */}
      <section className="relative">
        <div className="rule-fade" />
        <div className="mx-auto max-w-4xl px-6 md:px-10 py-28 md:py-36 text-center">
          <Reveal>
            <p className="font-serif text-[2rem] md:text-[2.75rem] leading-[1.15] tracking-[-0.012em] text-white">
              It&rsquo;s not about money.
              <span className="block text-white/55 mt-3">It&rsquo;s about what money unlocks.</span>
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
