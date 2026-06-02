import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { Building, ColumnsIcon, Network } from "@/components/Icons";

export const metadata = {
  title: "Strategic Pathways | Kismet Finance Group",
  description:
    "Property, lending and coordination. Three ways we help you see your options and get the right people in the room.",
};

export default function PathwaysPage() {
  return (
    <>
      <Hero
        eyebrow="Strategic Pathways"
        headline="Property, lending"
        headlineMuted="and coordination."
        sub={
          <>
            Three ways we help you see your options. We bring the right people to the table and run
            the strategy across all of them. The picture stays connected, so the moves you start
            actually finish.
          </>
        }
        ctaLabel="Book a call"
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
                How it fits together
              </span>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <Reveal delay={0.06}>
              <h2 className="font-serif text-[36px] md:text-[44px] lg:text-[48px] leading-[1.15] tracking-[-0.014em] text-[#d9e3f2] mb-7 text-balance">
                The bigger picture is the point. Not the product.
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="text-[16px] md:text-[17px] text-[#c4c6cf]/85 leading-[1.78] columns-1 md:columns-2 gap-10">
                <p className="mb-5 break-inside-avoid">
                  Most people don&rsquo;t need a new product. They need someone to see how the
                  property side, the lending side and the professional side fit together. That
                  picture is the actual work.
                </p>
                <p>
                  We pull it together. We bring the right specialists in, line up the right
                  conversations, and run the play across all of them. The pace stays calm. Nothing
                  falls between providers.
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
              <article className="relative rounded-lg overflow-hidden min-h-[480px] md:min-h-[500px] group border border-[#43474e]/30 card-lift-hover">
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
                    Property
                  </h3>
                  <p className="text-[15px] md:text-[16px] text-[#c4c6cf]/85 leading-[1.7] max-w-md">
                    Coordinated property conversations through partners we have known for years. We
                    help you see what is genuinely worth a look for someone in your position. We do
                    not sell you into anything.
                  </p>
                </div>
              </article>
            </Reveal>

            {/* Pathway 2: Lending */}
            <Reveal delay={0.1} className="md:col-span-4">
              <article className="bg-[#18283d] border border-[#43474e]/30 gold-edge-top rounded-lg p-10 md:p-12 flex flex-col justify-between h-full card-lift-hover">
                <div>
                  <span className="inline-flex items-center justify-center w-14 h-14 rounded text-[#D4AF37] mb-6">
                    <Building className="w-10 h-10" strokeWidth={1.2} />
                  </span>
                  <h3 className="font-serif text-[26px] md:text-[28px] leading-[1.22] tracking-[-0.008em] text-[#d9e3f2] mb-4">
                    Lending
                  </h3>
                </div>
                <p className="text-[15px] md:text-[16px] text-[#c4c6cf]/85 leading-[1.7]">
                  Around 70 Australian lenders on one panel through our Home Loan Solutions / AFG
                  broker partners. We line up the strategy and the right product. You get options
                  the high street doesn&rsquo;t put in front of you.
                </p>
              </article>
            </Reveal>

            {/* Pathway 3: Network coordination - wide horizontal */}
            <Reveal delay={0.18} className="md:col-span-12">
              <article className="bg-[#1e3450] border border-[#43474e]/30 rounded-lg flex flex-col md:flex-row items-stretch overflow-hidden card-lift-hover">
                <div className="w-full md:w-1/2 p-10 md:p-12 flex flex-col justify-center">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded bg-[#0a141e] border border-[#43474e]/40 text-[#D4AF37] mb-6">
                    <Network className="w-6 h-6" />
                  </span>
                  <h3 className="font-serif text-[26px] md:text-[32px] leading-[1.22] tracking-[-0.008em] text-[#d9e3f2] mb-4">
                    Coordination
                  </h3>
                  <p className="text-[15px] md:text-[16px] text-[#c4c6cf]/85 leading-[1.7] mb-7 max-w-xl">
                    Getting the right people in the room. We coordinate between your accountant,
                    SMSF administrator, broker and property partners so the strategy moves cleanly
                    across providers, not stuck between them.
                  </p>
                  <Link
                    href="/approach"
                    className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.22em] uppercase text-[#D4AF37] hover:text-[#d9e3f2] transition-colors"
                  >
                    See how it works
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
