import Image from "next/image";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { Forum, Architecture, Eye } from "@/components/Icons";

export const metadata = {
  title: "About | Kismet Finance Group",
  description:
    "Kismet exists because everyday Australians get sold products instead of getting strategy. We pull the strategy together and bring the right specialists into the room with you.",
};

const principles = [
  {
    icon: <Forum className="w-7 h-7" />,
    eyebrow: "Right People, Right Room",
    body: "We orchestrate the moves between your accountant, broker and partners. You stop being the one translating between three different conversations. We run the play. The picture stays connected.",
    highlight: false,
  },
  {
    icon: <Architecture className="w-7 h-7" />,
    eyebrow: "Approachable Authority",
    body: "Strategy delivered like a conversation, not a pitch. We take the intimidation out of finance so you can make decisions with a calm head.",
    highlight: true,
  },
  {
    icon: <Eye className="w-7 h-7" />,
    eyebrow: "The Long View",
    body: "We focus on the years ahead, not just the next move. Steady pathways that protect what you have built and keep growing what you put in.",
    highlight: false,
  },
];

export default function AboutPage() {
  return (
    <>
      <Hero
        eyebrow="About Kismet"
        headline="Seeing the"
        headlineMuted="Bigger Picture."
        sub={
          <>
            Real strategy should not be reserved for the wealthy few. Kismet brings the right
            people into the room and the right conversations into motion, so everyday Australians
            stop running their finances on hope and start running them on a plan.
          </>
        }
        ctaLabel="Begin the Conversation"
        ctaHref="/contact"
        showScrollCue={false}
      />

      {/* Founders intro - bento split */}
      <section className="py-24 md:py-32 bg-[#050f19]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Reveal className="md:col-span-2">
              <div className="bg-[#18283d] gold-edge-top rounded-lg overflow-hidden h-full">
                <div className="h-full flex flex-col md:flex-row">
                  <div className="w-full md:w-1/2 p-10 md:p-12 flex flex-col justify-center">
                    <h2 className="font-serif text-[28px] md:text-[32px] leading-[1.25] tracking-[-0.008em] text-[#D4AF37] mb-5">
                      Meet Shane &amp; Josh
                    </h2>
                    <p className="text-[15px] md:text-[16px] text-[#c4c6cf]/85 leading-[1.7] mb-5">
                      Shane and Josh started Kismet around a simple gap: everyday Australians
                      were getting sold products instead of getting strategy. The kind of joined-up
                      thinking that big firms reserve for corporates was nowhere for normal people.
                    </p>
                    <p className="text-[15px] md:text-[16px] text-[#c4c6cf]/85 leading-[1.7]">
                      Their approach is straightforward. Real conversations in plain English. Right
                      people in the room. Steady pace. The picture stays connected.
                    </p>
                  </div>
                  <div className="documentary-frame w-full md:w-1/2 h-[420px] md:h-auto md:min-h-[520px] relative bg-[#0a141e]">
                    <Image
                      src="/photos/shane-josh.jpg"
                      alt="Shane Hewson and Josh Clark, founders of Kismet Finance Group"
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      style={{ objectPosition: "50% 35%" }}
                      className="object-cover"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#18283d]/70 z-[4]"
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="bg-[#1e3450] gold-edge-top rounded-lg p-10 flex flex-col justify-between h-full">
                <div>
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded bg-[#0a141e] border border-[#43474e]/40 text-[#D4AF37] mb-6">
                    <Architecture className="w-6 h-6" />
                  </span>
                  <h3 className="font-serif text-[24px] md:text-[28px] leading-[1.25] tracking-[-0.008em] text-[#d9e3f2] mb-4">
                    Architects, not salespeople.
                  </h3>
                  <p className="text-[15px] text-[#c4c6cf]/85 leading-[1.7]">
                    We don&rsquo;t sell products. We help you see the whole picture before any
                    specialist gets involved. Every decision lines up with where you actually want
                    to be in ten or twenty years.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The Kismet Philosophy - 3 principle cards */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center mb-14 md:mb-20">
            <Reveal>
              <h2 className="font-serif text-[36px] md:text-[44px] lg:text-[48px] leading-[1.15] tracking-[-0.014em] text-[#d9e3f2]">
                The Kismet Philosophy
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="w-12 h-px bg-[#D4AF37] mx-auto mt-6" />
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {principles.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <article
                  className={`rounded-lg p-8 md:p-10 h-full relative overflow-hidden ${
                    p.highlight
                      ? "bg-[#1E3A5F] gold-edge-top shadow-[0_10px_30px_rgba(30,58,95,0.4)]"
                      : "bg-[#0a141e] gold-edge-top border border-[#43474e]/30 shadow-[0_10px_30px_rgba(15,30,46,0.5)]"
                  }`}
                >
                  {p.highlight && (
                    <div
                      aria-hidden
                      className="absolute -right-10 -top-10 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl"
                    />
                  )}
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded text-[#D4AF37] mb-6">
                    {p.icon}
                  </span>
                  <h4 className="text-[12px] font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-4">
                    {p.eyebrow}
                  </h4>
                  <p
                    className={`text-[15px] md:text-[16px] leading-[1.7] ${
                      p.highlight ? "text-[#8aa4cf]" : "text-[#c4c6cf]/85"
                    }`}
                  >
                    {p.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Network credentials */}
      <section className="py-24 md:py-32 bg-[#050f19]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-4">
              <Reveal>
                <span className="inline-flex items-center gap-3 text-[12px] font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-5">
                  <span aria-hidden className="w-6 h-px bg-[#D4AF37]/60" />
                  On the network
                </span>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="font-serif text-[28px] md:text-[32px] leading-[1.25] tracking-[-0.008em] text-[#d9e3f2] max-w-md">
                  The network behind the strategy.
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <Reveal delay={0.12}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-7 mb-8">
                  <div>
                    <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#c4c6cf]/55 block mb-2">
                      Established
                    </span>
                    <span className="text-[16px] text-[#d9e3f2]">1994 · ASX-listed since 2015</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#c4c6cf]/55 block mb-2">
                      Scale
                    </span>
                    <span className="text-[16px] text-[#d9e3f2]">
                      Approx. 3,500 brokers Australia-wide
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#c4c6cf]/55 block mb-2">
                      Lender panel
                    </span>
                    <span className="text-[16px] text-[#d9e3f2]">
                      Approximately 70 Australian lenders
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#c4c6cf]/55 block mb-2">
                      Licence
                    </span>
                    <span className="text-[16px] text-[#d9e3f2] tabular-nums">
                      Australian Finance Group Ltd · ACL 389087
                    </span>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="text-[14px] italic font-serif text-[#c4c6cf]/55 leading-[1.7] max-w-2xl">
                  Kismet operates as an authorised representative within the Home Loan Solutions /
                  AFG network. The brokers in our network hold their own credentials. We bring the
                  strategy and the relationships, they bring the lender access.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
