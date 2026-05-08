import Image from "next/image";
import { Reveal } from "./Reveal";
import type { ReactNode } from "react";

interface BulletItem {
  icon: ReactNode;
  title: string;
  body: string;
}

interface BiggerPictureProps {
  eyebrow?: string;
  heading: string;
  intro: ReactNode;
  body?: ReactNode;
  bullets: BulletItem[];
  imageSrc: string;
  imageAlt: string;
  /** Reverse the layout (image left, content right). */
  reversed?: boolean;
}

/**
 * "The Bigger Picture" section. Split content + image, with optional bullets.
 * Image carries a thin gold inner-frame for editorial weight.
 */
export function BiggerPicture({
  eyebrow = "The Why",
  heading,
  intro,
  body,
  bullets,
  imageSrc,
  imageAlt,
  reversed = false,
}: BiggerPictureProps) {
  return (
    <section className="relative bg-[#050f19] py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${reversed ? "lg:[&>div:first-child]:order-2" : ""}`}>
          {/* Content column */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-3 text-[12px] font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-6">
                <span aria-hidden className="w-6 h-px bg-[#D4AF37]/60" />
                {eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="font-serif text-[36px] md:text-[44px] lg:text-[48px] leading-[1.15] tracking-[-0.014em] text-[#d9e3f2] mb-7 text-balance">
                {heading}
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="text-[17px] md:text-[18px] text-[#c4c6cf] leading-[1.7] mb-5">
                {intro}
              </p>
            </Reveal>
            {body && (
              <Reveal delay={0.18}>
                <p className="text-[16px] text-[#c4c6cf]/80 leading-[1.7] mb-8">
                  {body}
                </p>
              </Reveal>
            )}

            {/* Bullets */}
            <div className="space-y-6 mt-8">
              {bullets.map((b, i) => (
                <Reveal key={i} delay={0.24 + i * 0.08}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1E3A5F] flex items-center justify-center">
                      <span className="text-[#adc8f5]">{b.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-serif text-[18px] text-[#d9e3f2] mb-1.5 tracking-[-0.005em]">
                        {b.title}
                      </h4>
                      <p className="text-[14.5px] text-[#c4c6cf]/85 leading-[1.65]">{b.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Image column */}
          <Reveal delay={0.16}>
            <figure className="relative">
              <div className="relative aspect-[4/5] glass-card p-2 overflow-hidden">
                <div className="relative w-full h-full overflow-hidden rounded">
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    sizes="(min-width: 1024px) 600px, (min-width: 768px) 90vw, 100vw"
                    className="object-cover"
                  />
                  {/* Inner gold frame for editorial weight */}
                  <div
                    aria-hidden
                    className="absolute inset-6 border border-[#D4AF37]/20 rounded pointer-events-none"
                  />
                </div>
              </div>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
