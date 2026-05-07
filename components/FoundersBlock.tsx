import Image from "next/image";
import { Reveal } from "./Reveal";
import type { ReactNode } from "react";

interface Founder {
  name: string;
  role: string;
  bring: ReactNode;
  /** Optional. When supplied, used as portrait. Until then, treated monogram. */
  imageSrc?: string;
  /** Object-position for cropping (CSS object-position value), e.g. "50% 30%". */
  imagePosition?: string;
  status?: "active" | "incoming";
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function FoundersBlock({
  eyebrow = "The people",
  heading,
  founders,
}: {
  eyebrow?: string;
  heading?: ReactNode;
  founders: Founder[];
}) {
  return (
    <section className="atmosphere-soft">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-32 md:py-40">
        <div className="grid grid-cols-12 gap-6 mb-20 md:mb-24">
          <div className="col-span-12 md:col-span-1">
            <Reveal>
              <div className="hidden md:block hero-rule h-16" aria-hidden />
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-9">
            <Reveal>
              <div className="eyebrow eyebrow-with-dot mb-7">
                <span className="eyebrow-dot" />
                <span>{eyebrow}</span>
              </div>
            </Reveal>
            {heading && (
              <Reveal delay={0.08}>
                <h2 className="display-lg max-w-3xl text-white">{heading}</h2>
              </Reveal>
            )}
          </div>
        </div>

        <div className="grid gap-12 lg:gap-10 md:grid-cols-2 lg:grid-cols-3">
          {founders.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.12}>
              <article className="group flex flex-col h-full">
                <div className="relative aspect-[4/5] overflow-hidden kismet-surface mb-7">
                  {f.imageSrc ? (
                    <>
                      <Image
                        src={f.imageSrc}
                        alt={f.name}
                        fill
                        sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
                        style={{ objectPosition: f.imagePosition ?? "50% 30%" }}
                        className="object-cover brightness-[0.88] saturate-[0.7] transition-[filter,transform] duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:brightness-100 group-hover:saturate-100 group-hover:scale-[1.015]"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-25 transition-opacity duration-1000 group-hover:opacity-10"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(8, 21, 42, 0.35) 0%, transparent 30%, transparent 65%, rgba(8, 21, 42, 0.55) 100%)",
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <div
                        className="absolute inset-0 transition-opacity duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-90"
                        style={{
                          background:
                            "radial-gradient(ellipse at 30% 20%, rgba(212, 175, 55, 0.18), transparent 65%), radial-gradient(ellipse at 70% 100%, rgba(45, 90, 150, 0.4), transparent 70%), linear-gradient(135deg, #0F2440 0%, #08152A 100%)",
                        }}
                        aria-hidden
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-serif text-[6rem] md:text-[5rem] lg:text-[6rem] text-gold/35 tracking-[0.06em] transition-colors duration-700 group-hover:text-gold/55">
                          {initials(f.name)}
                        </span>
                      </div>
                    </>
                  )}

                  {f.status === "incoming" && (
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-sm bg-navy-deep/85 backdrop-blur-sm border border-gold/30 text-[9px] uppercase tracking-[0.22em] text-gold/85">
                      Joining 2026
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                </div>

                <div className="flex-1">
                  <h3 className="font-serif text-[1.4rem] text-white mb-1.5 tracking-[-0.005em]">
                    {f.name}
                  </h3>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-gold/85 mb-5">
                    {f.role}
                  </p>
                  <p className="text-[15px] text-white/65 leading-[1.75]">{f.bring}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
