import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { Building, ColumnsIcon, Network } from "@/components/Icons";

export const metadata = {
  title: "Strategic Pathways | Kismet Finance Group",
  description:
    "Architecting financial trajectories. Property, lending and professional network coordination, brought into one connected picture.",
};

export default function PathwaysPage() {
  return (
    <>
      <Hero
        eyebrow="Strategic Pathways"
        headline="Architecting financial"
        headlineMuted="trajectories."
        sub={
          <>
            We orchestrate complex elements, from property positioning to lending structures, into
            one cohesive forward-looking strategy. Pathways are curated to align with your overarching
            ambitions, so every step is purposeful.
          </>
        }
        ctaLabel="Begin the Conversation"
        ctaHref="/contact"
        showScrollCue={false}
      />

      {/* Editorial intro */}
      <section className="py-24 md:py-32 bg-[#050f19]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-4">
            <Reveal>
              <span className="inline-flex items-center gap-3 text-[12px] font-semibold tracking-[0.2em] uppercase text-[#D4AF37]">
                <span aria-hidden className="w-6 h-px bg-[#D4AF37]/60" />
                The Orchestration
              </span>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <Reveal delay={0.06}>
              <h2 className="font-serif text-[32px] md:text-[40px] leading-[1.2] tracking-[-0.012em] text-[#d9e3f2] mb-7 text-balance">
                Beyond transactions, we coordinate sophisticated conversations across multiple
                financial domains.
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="text-[16px] md:text-[17px] text-[#c4c6cf]/85 leading-[1.78] columns-1 md:columns-2 gap-10">
                <p className="mb-5 break-inside-avoid">
                  At Kismet, we believe real momentum requires more than isolated decisions. It
                  requires a panoramic view of your current position and a clear mapping of the road
                  ahead. We do not pitch piecemeal solutions; we curate defined pathways that line
                  up lending, property and professional networks.
                </p>
                <p>
                  By acting as the central coordinator, we make sure the disparate elements of your
                  financial ecosystem are working in harmony toward one objective. This is not about
                  rapid action, but calculated, long-term positioning.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Asymmetric Pathways Bento */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
            {/* Pathway 1: Property (large feature) */}
            <Reveal className="md:col-span-8">
              <article className="relative rounded-lg overflow-hidden min-h-[480px] md:min-h-[500px] group border border-[#43474e]/30">
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/photos/map-strategy.jpg"
                    alt="Hands working on architectural plans at a wooden desk"
                    fill
                    sizes="(min-width: 768px) 66vw, 100vw"
                    className="object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-700"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-[#0a141e] via-[#0a141e]/80 to-transparent"
                  />
                </div>
                <div className="relative z-10 h-full flex flex-col justify-end p-10 md:p-12">
                  <div aria-hidden className="w-12 h-px bg-[#D4AF37] mb-6" />
                  <h3 className="font-serif text-[28px] md:text-[34px] leading-[1.18] tracking-[-0.012em] text-[#d9e3f2] mb-4">
                    Property Investment Structuring
                  </h3>
                  <p className="text-[15px] md:text-[16px] text-[#c4c6cf]/85 leading-[1.7] max-w-md">
                    Coordinating the deliberate expansion of asset positions. We work alongside the
                    intricate layers of structuring required for significant property activity, so
                    decisions line up with long-term portfolio goals.
                  </p>
                </div>
              </article>
            </Reveal>

            {/* Pathway 2: Lending */}
            <Reveal delay={0.1} className="md:col-span-4">
              <article className="bg-[#17202b] border border-[#43474e]/30 gold-edge-top rounded-lg p-10 md:p-12 flex flex-col justify-between h-full">
                <div>
                  <span className="inline-flex items-center justify-center w-14 h-14 rounded text-[#D4AF37] mb-6">
                    <Building className="w-10 h-10" strokeWidth={1.2} />
                  </span>
                  <h3 className="font-serif text-[26px] md:text-[28px] leading-[1.22] tracking-[-0.008em] text-[#d9e3f2] mb-4">
                    Strategic Lending
                  </h3>
                </div>
                <p className="text-[15px] md:text-[16px] text-[#c4c6cf]/85 leading-[1.7]">
                  Capital deployment, properly framed. Through our authorised representative
                  arrangement within the Home Loan Solutions / AFG aggregation network, our broker
                  partners can draw on a panel of approximately 70 Australian lenders. We sit in the
                  room while they do the regulated work.
                </p>
              </article>
            </Reveal>

            {/* Pathway 3: Network coordination - wide horizontal */}
            <Reveal delay={0.18} className="md:col-span-12">
              <article className="bg-[#212b36] border border-[#43474e]/30 rounded-lg flex flex-col md:flex-row items-stretch overflow-hidden">
                <div className="w-full md:w-1/2 p-10 md:p-12 flex flex-col justify-center">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded bg-[#0a141e] border border-[#43474e]/40 text-[#D4AF37] mb-6">
                    <Network className="w-6 h-6" />
                  </span>
                  <h3 className="font-serif text-[26px] md:text-[32px] leading-[1.22] tracking-[-0.008em] text-[#d9e3f2] mb-4">
                    Professional Network Coordination
                  </h3>
                  <p className="text-[15px] md:text-[16px] text-[#c4c6cf]/85 leading-[1.7] mb-7 max-w-xl">
                    The synthesis of expertise. Complex strategies require multifaceted execution.
                    We act as the central conduit, coordinating between specialist accountants,
                    SMSF administrators, brokers and project partners so the master strategy moves
                    cleanly across providers.
                  </p>
                  <Link
                    href="/approach"
                    className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.22em] uppercase text-[#D4AF37] hover:text-[#d9e3f2] transition-colors"
                  >
                    See how the coordination works
                    <span aria-hidden>&rarr;</span>
                  </Link>
                </div>
                <div className="w-full md:w-1/2 h-64 md:h-auto min-h-[320px] relative">
                  <Image
                    src="/photos/team-boardroom.jpg"
                    alt="A working session in a modern boardroom"
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover opacity-50 mix-blend-luminosity"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-r from-[#212b36] via-transparent to-transparent"
                  />
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
