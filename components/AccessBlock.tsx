import Image from "next/image";
import { Reveal } from "./Reveal";
import type { ReactNode } from "react";

interface Channel {
  label: string;
  body: ReactNode;
}

interface AccessBlockProps {
  eyebrow?: string;
  heading: ReactNode;
  intro: ReactNode;
  channels: Channel[];
  imageSrc: string;
  imageAlt: string;
  imageMeta?: string;
}

/**
 * "Where Strategy Meets Access" section.
 * Editorial split: large environmental photo on left, channels list on right.
 * Compliance-safe: reads as relationships and coordination, not insider promises.
 */
export function AccessBlock({
  eyebrow = "Where strategy meets access",
  heading,
  intro,
  channels,
  imageSrc,
  imageAlt,
  imageMeta,
}: AccessBlockProps) {
  return (
    <section className="atmosphere-deep relative">
      <div className="rule-fade-soft" />
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-24 md:py-44">
        <div className="grid grid-cols-12 gap-6 md:gap-12 mb-16 md:mb-24">
          <div className="col-span-12 md:col-span-1">
            <Reveal>
              <div className="hidden md:block hero-rule h-16" aria-hidden />
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-9">
            <Reveal>
              <div className="flex items-center gap-4 mb-7">
                <span aria-hidden className="font-serif italic text-[14px] text-gold/75 tabular-nums">II.</span>
                <span aria-hidden className="h-px w-10 bg-gold/35" />
                <span className="text-[10px] uppercase tracking-[0.32em] text-gold/85">{eyebrow}</span>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display-lg max-w-3xl text-white mb-8">{heading}</h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-[17px] md:text-[18px] text-white/72 leading-[1.78] max-w-2xl">
                {intro}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-12 items-start">
          {/* Image column, slight stagger to break grid feel */}
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <figure className="group">
                <div className="relative aspect-[5/4] md:aspect-[4/3] overflow-hidden kismet-surface">
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover brightness-[0.88] saturate-[0.78] transition-[filter,transform] duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:brightness-[0.98] group-hover:saturate-90 group-hover:scale-[1.012]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-25"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(8, 21, 42, 0.4) 0%, transparent 35%, transparent 65%, rgba(8, 21, 42, 0.55) 100%)",
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent"
                  />
                </div>
                {imageMeta && (
                  <figcaption className="mt-5 text-[10px] uppercase tracking-[0.24em] text-white/40">
                    {imageMeta}
                  </figcaption>
                )}
              </figure>
            </Reveal>
          </div>

          {/* Channels column */}
          <div className="col-span-12 lg:col-span-5">
            <Reveal delay={0.12}>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-1 gap-x-8 gap-y-2 sm:divide-y-0 lg:divide-y lg:divide-white/[0.06]">
                {channels.map((c, i) => (
                  <li
                    key={i}
                    className="group/item py-6 sm:border-t sm:border-white/[0.06] lg:border-t-0 lg:first:pt-0 lg:last:pb-0 transition-colors duration-500"
                  >
                    <div className="flex items-start gap-5">
                      <span className="index-marker pt-1.5 flex-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1">
                        <h3 className="font-serif text-[1.2rem] md:text-[1.3rem] text-white tracking-[-0.005em] mb-2.5 leading-[1.25] transition-colors duration-500 group-hover/item:text-gold">
                          {c.label}
                        </h3>
                        <p className="text-[14.5px] text-white/65 leading-[1.7]">{c.body}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
