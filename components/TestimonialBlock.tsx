"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Reveal } from "./Reveal";
import type { ReactNode } from "react";

interface Testimonial {
  quote: ReactNode;
  name: string;
  context: string;
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "K";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Rotating testimonial carousel.
 * One quote at a time on mobile (full-width), three on lg.
 * Auto-advance with 6s pause, dot navigation, swipe support, paused on hover.
 * Respects prefers-reduced-motion (Embla handles this implicitly via reduced animation).
 */
export function TestimonialBlock({
  items,
  eyebrow = "In their words",
  heading,
}: {
  items: Testimonial[];
  eyebrow?: string;
  heading?: ReactNode;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      duration: 35,
    },
    [
      Autoplay({
        delay: 6500,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
        stopOnFocusIn: true,
      }),
    ]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (i: number) => emblaApi && emblaApi.scrollTo(i),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <section className="atmosphere-deep relative">
      <div className="rule-fade-soft" />
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-24 md:py-40">
        <div className="grid grid-cols-12 gap-6 mb-16 md:mb-24">
          <div className="col-span-12 md:col-span-7">
            <Reveal>
              <div className="eyebrow eyebrow-with-dot mb-7">
                <span className="eyebrow-dot" />
                <span>{eyebrow}</span>
              </div>
            </Reveal>
            {heading && (
              <Reveal delay={0.08}>
                <h2 className="display-lg max-w-2xl text-white">{heading}</h2>
              </Reveal>
            )}
          </div>
        </div>

        {/* Carousel */}
        <Reveal>
          <div
            className="overflow-hidden -mx-3 md:-mx-4"
            ref={emblaRef}
          >
            <div className="flex">
              {items.map((t, i) => (
                <div
                  key={i}
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 px-3 md:px-4"
                >
                  <figure className="group h-full flex flex-col">
                    <div
                      aria-hidden
                      className="font-serif text-6xl text-gold/30 leading-none mb-6 transition-colors duration-700 group-hover:text-gold/55"
                    >
                      &ldquo;
                    </div>
                    <blockquote className="font-serif text-[1.2rem] md:text-[1.25rem] leading-[1.55] text-white/88 tracking-[-0.005em] flex-1">
                      {t.quote}
                    </blockquote>
                    <figcaption className="mt-10 pt-7 border-t border-white/[0.07] flex items-center gap-4">
                      <span
                        aria-hidden
                        className="flex items-center justify-center w-11 h-11 rounded-full border border-gold/35 bg-gold/[0.04] font-serif text-[13px] text-gold tracking-[0.05em]"
                      >
                        {initials(t.name)}
                      </span>
                      <span className="flex flex-col">
                        <span className="text-[11px] uppercase tracking-[0.2em] text-white/85">
                          {t.name}
                        </span>
                        <span className="text-[11px] text-white/45 mt-1.5">{t.context}</span>
                      </span>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Dot navigation */}
        {scrollSnaps.length > 1 && (
          <div
            className="mt-14 flex items-center justify-between gap-6"
            role="tablist"
            aria-label="Testimonials"
          >
            <div className="flex items-center gap-3">
              {scrollSnaps.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === selectedIndex}
                  aria-label={`Show testimonial ${i + 1}`}
                  onClick={() => scrollTo(i)}
                  className="group/dot p-2 -m-2"
                >
                  <span
                    className={`block h-px transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      i === selectedIndex
                        ? "w-12 bg-gold"
                        : "w-6 bg-white/20 group-hover/dot:bg-white/45"
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="text-[10px] uppercase tracking-[0.24em] text-white/35 tabular-nums">
              <span className="text-gold/85">{String(selectedIndex + 1).padStart(2, "0")}</span>
              <span className="mx-2">·</span>
              <span>{String(scrollSnaps.length).padStart(2, "0")}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
