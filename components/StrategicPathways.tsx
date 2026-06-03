"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Reveal } from "./Reveal";
import { ScrollReveal } from "./ScrollReveal";
import type { ReactNode } from "react";

interface PathwayCard {
  icon: ReactNode;
  title: string;
  body: string;
  size?: "lg" | "md";
  bgImage?: string;
  goldEdge?: boolean;
}

interface StrategicPathwaysProps {
  eyebrow?: string;
  heading: string;
  cards: PathwayCard[];
  hubLabel: string;
  hubBody: string;
  hubCta: string;
  hubHref: string;
  hubIcon: ReactNode;
}

/**
 * Strategic Pathways bento - asymmetric grid.
 * Large feature card + smaller cards + wide horizontal hub strip below.
 * ScrollReveal (GSAP scrub) drives the entrance — correctly sets autoAlpha:0
 * on mount so the reveal is visible. motion.article keeps hover only.
 */
export function StrategicPathways({
  eyebrow = "Our Services",
  heading,
  cards,
  hubLabel,
  hubBody,
  hubCta,
  hubHref,
  hubIcon,
}: StrategicPathwaysProps) {
  const hover = { y: -10, boxShadow: "0 30px 80px -28px rgba(212, 175, 55, 0.38)" };

  return (
    <section className="relative py-24 md:py-32 bg-[#0a141e] section-blend-top">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center mb-14 md:mb-20">
          <Reveal>
            <span className="inline-flex items-center justify-center gap-3 text-[12px] font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-5">
              <span aria-hidden className="w-6 h-px bg-[#D4AF37]/60" />
              {eyebrow}
              <span aria-hidden className="w-6 h-px bg-[#D4AF37]/60" />
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-serif text-[36px] md:text-[44px] lg:text-[48px] leading-[1.15] tracking-[-0.014em] text-[#d9e3f2] text-balance">
              {heading}
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {cards.map((c, i) => (
            <ScrollReveal
              key={i}
              className={`h-full ${c.size === "lg" ? "md:col-span-2" : "md:col-span-1"}`}
            >
              <motion.article
                whileHover={hover}
                className={`glass-card p-8 md:p-10 flex flex-col justify-end min-h-[360px] md:min-h-[400px] relative overflow-hidden group h-full ${
                  c.goldEdge ? "gold-edge-left" : ""
                }`}
              >
                {c.bgImage && (
                  <>
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-cover bg-center opacity-15 group-hover:opacity-25 transition-opacity duration-700"
                      style={{ backgroundImage: `url(${c.bgImage})` }}
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-[#0a141e]/95 via-[#0a141e]/70 to-transparent"
                    />
                  </>
                )}
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded bg-[#18283d]/50 border border-[#43474e]/40 flex items-center justify-center mb-6 text-[#D4AF37] group-hover:scale-110 group-hover:border-[#D4AF37]/50 group-hover:bg-[#1E3A5F]/60 transition-all duration-500">
                    {c.icon}
                  </div>
                  <h3 className="font-serif text-[26px] md:text-[28px] leading-[1.2] tracking-[-0.008em] text-[#d9e3f2] mb-3 group-hover:text-[#D4AF37] transition-colors duration-500">
                    {c.title}
                  </h3>
                  <p className="text-[15px] md:text-[16px] text-[#c4c6cf]/85 leading-[1.65] max-w-md">
                    {c.body}
                  </p>
                </div>
              </motion.article>
            </ScrollReveal>
          ))}

          {/* Coordination Hub - wide strip below */}
          <ScrollReveal className="md:col-span-3">
            <motion.article
              whileHover={{ y: -6 }}
              className="glass-card p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-10 group h-full"
            >
              <div className="flex-1">
                <h3 className="font-serif text-[24px] md:text-[28px] leading-[1.25] tracking-[-0.008em] text-[#d9e3f2] mb-3 flex items-center gap-4 group-hover:text-[#D4AF37] transition-colors duration-500">
                  <span className="text-[#D4AF37] group-hover:scale-110 transition-transform duration-500">{hubIcon}</span>
                  {hubLabel}
                </h3>
                <p className="text-[15px] md:text-[16px] text-[#c4c6cf]/85 leading-[1.7] max-w-2xl">
                  {hubBody}
                </p>
              </div>
              <Link
                href={hubHref}
                className="cta-ghost whitespace-nowrap !py-3 !px-6 !text-[11px]"
              >
                <span>{hubCta}</span>
                <span aria-hidden className="cta-arrow">&rarr;</span>
              </Link>
            </motion.article>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
