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

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 pt-28 md:pt-44 pb-28 md:pb-44 min-h-[80vh] flex flex-col">
        <div className="grid grid-cols-12 gap-6 flex-1 items-center">
          <div className="hidden md:flex col-span-1 justify-center pt-3">
            <div className="hero-rule h-44" />
          </div>

          <div className="col-span-12 md:col-span-9 lg:col-span-8 flex flex-col">
            <Reveal>
              <div className="eyebrow eyebrow-with-dot mb-12">
                <span className="eyebrow-dot" />
                <span>404</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="display-xl text-white max-w-[19ch]">
                A path that doesn&rsquo;t lead anywhere.
              </h1>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-12 md:mt-14 text-base md:text-lg text-white/65 max-w-xl leading-[1.78]">
                The page you were after has moved or never existed. The rest of the picture is still here.
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mt-14 md:mt-16 flex flex-wrap items-center gap-8">
                <MagneticCTA href="/">
                  <span>Back to home</span>
                  <span aria-hidden className="cta-arrow">&rarr;</span>
                </MagneticCTA>

                <Link href="/contact" className="cta-ghost">
                  Or send us a note
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="rule-fade" />
    </section>
  );
}
