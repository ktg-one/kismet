"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Reveal, RevealWords } from "./Reveal";
import { MagneticCTA } from "./MagneticCTA";
import { HeroAmbient } from "./HeroAmbient";
import { ScrollCue } from "./ScrollCue";
import { BrandMark } from "./BrandMark";
import type { ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SHOW_SCROLL_MARKERS = process.env.NODE_ENV !== "production";

interface HeroProps {
  eyebrow: string;
  headline: string;
  /** Optional second-line text shown below the headline in muted blue. */
  headlineMuted?: string;
  sub: ReactNode;
  ctaLabel: string;
  ctaHref: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  showScrollCue?: boolean;
  /** Optional background image url (cinematic atmosphere). */
  bgImage?: string;
  bgAlt?: string;
}

/**
 * Cinematic hero. Stitch-aligned: background image with smoke gradient overlay,
 * editorial typography, primary gold CTA + ghost secondary.
 */
export function Hero({
  eyebrow,
  headline,
  headlineMuted,
  sub,
  ctaLabel,
  ctaHref,
  secondaryHref,
  secondaryLabel,
  showScrollCue = true,
  bgImage,
  bgAlt = "",
}: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  // Parallax the gold watermark + the optional bg image as the user scrolls
  // the hero out of view. The CSS scroll-timeline rule for .hero-watermark
  // has been removed in favour of this (single source of truth).
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      const buildParallax = (cfg: {
        watermarkFrom: number;
        watermarkTo: number;
        bgFrom: number;
        bgTo: number;
        end: string;
      }) => {
        gsap.fromTo(
          ".hero-watermark",
          { yPercent: cfg.watermarkFrom, opacity: 1 },
          {
            yPercent: cfg.watermarkTo,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: () => cfg.end,
              scrub: 1,
              invalidateOnRefresh: true,
              markers: SHOW_SCROLL_MARKERS,
            },
          }
        );

        if (bgImage) {
          gsap.fromTo(
            ".hero-bg-image",
            { yPercent: cfg.bgFrom },
            {
              yPercent: cfg.bgTo,
              ease: "none",
              scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: () => cfg.end,
                scrub: 1,
                invalidateOnRefresh: true,
                markers: SHOW_SCROLL_MARKERS,
              },
            }
          );
        }
      };

      mm.add("(max-width: 767px)", () => {
        buildParallax({
          watermarkFrom: -7,
          watermarkTo: 14,
          bgFrom: -8,
          bgTo: 10,
          end: "+=100%",
        });
      });

      mm.add("(min-width: 768px)", () => {
        buildParallax({
          watermarkFrom: -10,
          watermarkTo: 22,
          bgFrom: -12,
          bgTo: 16,
          end: "+=150%",
        });
      });

      return () => mm.revert();
    },
    { scope: heroRef, dependencies: [bgImage] }
  );

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden hero-atmosphere hero-scroll-fade vt-hero"
    >
      {/* Background image layer (optional). Wrapped in .hero-bg-image so
          the parallax tween can target it without touching gradients. */}
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <div className="hero-bg-image absolute inset-0 will-change-transform">
            <Image
              src={bgImage}
              alt={bgAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-30 scale-110"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a141e] via-[#0a141e]/80 to-transparent" />
          <div className="absolute inset-0 smoke-gradient" />
        </div>
      )}

      {/* Ambient orbs - drift gently with the cursor on fine-pointer devices */}
      <HeroAmbient prominent={showScrollCue} />

      {/* Gold brand-mark watermark - scroll-parallaxed by GSAP via .hero-watermark */}
      <div className="absolute inset-0 pointer-events-none">
        <BrandMark
          className={`hero-watermark will-change-transform absolute -right-[14%] top-[6%] md:-right-[8%] md:top-[2%] w-[110vw] md:w-[70vw] max-w-none md:max-w-[820px] aspect-square text-[#D4AF37] [filter:blur(0.4px)] ${
            showScrollCue ? "opacity-[0.045] md:opacity-[0.055]" : "opacity-[0.025] md:opacity-[0.035]"
          }`}
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 pt-28 md:pt-36 pb-20 md:pb-32 min-h-[100svh] flex flex-col">
        <div className="grid grid-cols-12 gap-6 flex-1">
          <div className="col-span-12 lg:col-span-9 flex flex-col justify-center">
            <Reveal immediate>
              <span className="inline-flex items-center gap-3 text-[12px] font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-8">
                <span aria-hidden className="w-8 h-px bg-[#D4AF37]" />
                {eyebrow}
              </span>
            </Reveal>

            <RevealWords
              text={headline}
              as="h1"
              className="font-serif text-[36px] sm:text-[44px] md:text-[54px] lg:text-[60px] leading-[1.06] tracking-[-0.02em] text-[#d9e3f2] text-balance max-w-[22ch]"
              delay={0.05}
              stagger={0.045}
              immediate
            />

            {headlineMuted && (
              <Reveal delay={0.28} immediate>
                <p className="font-serif text-[28px] sm:text-[36px] md:text-[46px] lg:text-[52px] leading-[1.1] tracking-[-0.018em] text-[#d9e3f2] text-balance mt-3 sm:mt-4 max-w-[24ch] italic font-light">
                  {headlineMuted}
                </p>
              </Reveal>
            )}

            <Reveal delay={0.38} y={12} immediate>
              <div className="mt-10 md:mt-12 text-[16.5px] md:text-[17px] text-[#c4c6cf] leading-[1.65] max-w-xl">
                {sub}
              </div>
            </Reveal>

            <Reveal delay={0.5} y={10} immediate>
              <div className="mt-12 md:mt-14 flex flex-wrap items-center gap-x-6 gap-y-4">
                <MagneticCTA href={ctaHref}>
                  <span>{ctaLabel}</span>
                  <span aria-hidden className="cta-arrow">&rarr;</span>
                </MagneticCTA>
                {secondaryHref && secondaryLabel && (
                  <a href={secondaryHref} className="cta-ghost">
                    <span>{secondaryLabel}</span>
                    <span aria-hidden className="cta-arrow">&rarr;</span>
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </div>

        {showScrollCue && (
          <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2">
            <ScrollCue />
          </div>
        )}
      </div>
    </section>
  );
}
