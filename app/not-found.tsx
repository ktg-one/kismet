import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { MagneticCTA } from "@/components/MagneticCTA";

export const metadata = {
  title: "Not found | Kismet Finance Group",
  description: "The page you were looking for does not exist.",
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden hero-atmosphere">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="ambient-orb ambient-orb-gold"
          style={{ top: "-12%", right: "-8%", width: "62vw", height: "62vw", maxWidth: "900px", maxHeight: "900px" }}
          aria-hidden
        />
        <div
          className="ambient-orb ambient-orb-navy"
          style={{ bottom: "-18%", left: "-12%", width: "70vw", height: "70vw", maxWidth: "1000px", maxHeight: "1000px" }}
          aria-hidden
        />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 pt-28 md:pt-44 pb-28 md:pb-44 min-h-[80vh] flex flex-col">
        <div className="grid grid-cols-12 gap-6 flex-1 items-center">
          <div className="col-span-12 md:col-span-10 lg:col-span-9 flex flex-col">
            <Reveal>
              <span className="inline-flex items-center gap-3 text-[12px] font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-10">
                <span aria-hidden className="w-6 h-px bg-[#D4AF37]/60" />
                404
              </span>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="font-serif text-[44px] sm:text-[56px] md:text-[64px] lg:text-[72px] leading-[1.05] tracking-[-0.022em] text-[#d9e3f2] text-balance max-w-[20ch]">
                A path that doesn&rsquo;t lead anywhere.
              </h1>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-10 md:mt-12 text-[17px] md:text-[18px] text-[#c4c6cf] leading-[1.7] max-w-xl">
                The page you were after has moved or never existed. The rest of the picture is still here.
              </div>
            </Reveal>

            <Reveal delay={0.28}>
              <div className="mt-12 md:mt-14 flex flex-wrap items-center gap-x-6 gap-y-4">
                <MagneticCTA href="/">
                  <span>Back to home</span>
                  <span aria-hidden className="cta-arrow">&rarr;</span>
                </MagneticCTA>

                <Link href="/contact" className="cta-ghost">
                  <span>Or send us a note</span>
                  <span aria-hidden className="cta-arrow">&rarr;</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
