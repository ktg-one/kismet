"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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
 */
export function TestimonialBlock({
  items,
  eyebrow = "In their words",
  heading,
  viewAllHref = "https://www.google.com/search?q=Kismet+Finance+Group+Cockburn+Central+reviews",
  viewAllLabel = "Read all reviews on Google",
}: {
  items: Testimonial[];
  eyebrow?: string;
  heading?: ReactNode;
  viewAllHref?: string;
  viewAllLabel?: string;
}) {
  const plugins = useMemo(
    () => [
      Autoplay({
        delay: 6500,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
        stopOnFocusIn: true,
      }),
    ],
    []
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      duration: 35,
    },
    plugins
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (i: number) => emblaApi && emblaApi.scrollTo(i),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const handleInit = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
    };

    const handleSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    handleInit();
    handleSelect();

    emblaApi.on("reInit", handleInit);
    emblaApi.on("select", handleSelect);

    return () => {
      emblaApi.off("reInit", handleInit);
      emblaApi.off("select", handleSelect);
    };
  }, [emblaApi]);

  return (
    <section className="relative bg-[#050f19]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-12 gap-6 mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-8">
            <Reveal>
              <span className="inline-flex items-center gap-3 text-[12px] font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-6">
                <span aria-hidden className="w-6 h-px bg-[#D4AF37]/60" />
                {eyebrow}
              </span>
            </Reveal>
            {heading && (
              <Reveal delay={0.08}>
                <h2 className="font-serif text-[36px] md:text-[44px] lg:text-[48px] leading-[1.15] tracking-[-0.014em] text-[#d9e3f2] max-w-2xl text-balance">
                  {heading}
                </h2>
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
                  <figure className="group h-full flex flex-col bg-[#18283d] rounded-lg p-8 border-t-[0.5px] border-[#43474e]/40">
                    <div
                      aria-hidden
                      className="font-serif text-[64px] text-[#D4AF37]/25 leading-none mb-5 transition-colors duration-700 group-hover:text-[#D4AF37]/55"
                    >
                      &ldquo;
                    </div>
                    <blockquote className="font-serif text-[18px] md:text-[20px] leading-[1.55] text-[#d9e3f2]/90 tracking-[-0.005em] flex-1">
                      {t.quote}
                    </blockquote>
                    <figcaption className="mt-8 pt-6 border-t-[0.5px] border-[#43474e]/30 flex items-center gap-4">
                      <span
                        aria-hidden
                        className="flex items-center justify-center w-11 h-11 rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/[0.04] font-serif text-[13px] text-[#D4AF37] tracking-[0.05em]"
                      >
                        {initials(t.name)}
                      </span>
                      <span className="flex flex-col">
                        <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#d9e3f2]/90">
                          {t.name}
                        </span>
                        <span className="text-[11px] text-[#c4c6cf]/60 mt-1.5">{t.context}</span>
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
                  className="group/dot inline-flex items-center justify-center min-w-[44px] min-h-[44px] -m-3 p-3"
                >
                  <span
                    className={`block h-px transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      i === selectedIndex
                        ? "w-12 bg-[#D4AF37]"
                        : "w-6 bg-[#c4c6cf]/25 group-hover/dot:bg-[#c4c6cf]/55"
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#c4c6cf]/55 tabular-nums">
              <span className="text-[#D4AF37]">{String(selectedIndex + 1).padStart(2, "0")}</span>
              <span className="mx-2">·</span>
              <span>{String(scrollSnaps.length).padStart(2, "0")}</span>
            </div>
          </div>
        )}

        {/* View all on Google */}
        {viewAllHref && (
          <Reveal delay={0.2}>
            <div className="mt-12 md:mt-14 flex items-center justify-center">
              <a
                href={viewAllHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 text-[12px] font-semibold tracking-[0.22em] uppercase text-[#c4c6cf]/85 hover:text-[#D4AF37] transition-colors duration-400 border-b-[0.5px] border-[#43474e]/50 hover:border-[#D4AF37]/60 pb-2"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-[#D4AF37]"
                  aria-hidden
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor" />
                </svg>
                <span>{viewAllLabel}</span>
                <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">&rarr;</span>
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
