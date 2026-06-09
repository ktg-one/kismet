import Image from "next/image";
import { Reveal } from "./Reveal";
import { ScrollReveal } from "./ScrollReveal";

interface Person {
  name: string;
  role: string;
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: string;
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Documentary-style team portrait cards. Grayscale by default,
 * color-restores on hover. 3:4 aspect, captioned at the bottom.
 * Falls back to monogram darkroom plate when no imageSrc.
 */
export function TeamPortraits({
  eyebrow = "Leadership",
  heading = "Meet the Team",
  people,
  stagger = true,
}: {
  eyebrow?: string;
  heading?: string;
  people: Person[];
  stagger?: boolean;
}) {
  return (
    <section className="section-screen py-24 md:py-32 bg-[#13243a]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center mb-14 md:mb-20">
          <Reveal>
            <span className="inline-flex items-center gap-3 text-[12px] font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-5">
              <span aria-hidden className="w-6 h-px bg-[#D4AF37]/60" />
              {eyebrow}
              <span aria-hidden className="w-6 h-px bg-[#D4AF37]/60" />
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-serif text-[36px] md:text-[44px] lg:text-[48px] leading-[1.15] tracking-[-0.014em] text-[#d9e3f2]">
              {heading}
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {people.map((p, i) => (
            <ScrollReveal key={p.name}>
              <article
                className={`group relative overflow-hidden rounded-lg bg-[#18283d] aspect-[3/4] card-lift-hover ${
                  stagger && i % 2 === 1 ? "md:mt-12" : ""
                }`}
              >
                {p.imageSrc ? (
                  <Image
                    src={p.imageSrc}
                    alt={p.imageAlt ?? p.name}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    style={{ objectPosition: p.imagePosition ?? "50% 30%" }}
                    className="object-cover grayscale opacity-85 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                  />
                ) : (
                  <>
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(ellipse 70% 60% at 35% 28%, rgba(212, 175, 55, 0.14), transparent 72%), radial-gradient(ellipse 90% 80% at 70% 110%, rgba(40, 80, 140, 0.32), transparent 70%), linear-gradient(165deg, #122B4F 0%, #0a141e 60%, #060F1F 100%)",
                      }}
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(180deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 4px)",
                      }}
                    />
                    <div className="absolute inset-0 flex items-end p-8">
                      <span className="font-serif italic text-[80px] md:text-[96px] leading-none text-[#D4AF37]/40 tracking-[-0.02em] transition-colors duration-700 group-hover:text-[#D4AF37]/65">
                        {initials(p.name)}
                      </span>
                    </div>
                  </>
                )}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-[#0a141e] via-[#0a141e]/40 to-transparent opacity-90"
                />
                <div className="absolute bottom-0 left-0 p-7 md:p-8">
                  <h3 className="font-serif text-[26px] md:text-[28px] leading-[1.2] tracking-[-0.008em] text-[#d9e3f2] mb-1">
                    {p.name}
                  </h3>
                  <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-[#D4AF37]">
                    {p.role}
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
