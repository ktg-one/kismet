"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { BrandMark } from "./BrandMark";
import { BrandWordmark } from "./BrandWordmark";

import { MagneticCTA } from "./MagneticCTA";

const NAV = [
  { href: "/approach", label: "How We Work" },
  { href: "/pathways", label: "Strategic Pathways" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 24;
      setScrolled((prev) => (prev === next ? prev : next));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      closeRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${scrolled
            ? "bg-[#0a141e]/90 backdrop-blur-xl border-b-[0.5px] border-[#43474e]/40"
            : "bg-transparent backdrop-blur-0 border-b-[0.5px] border-transparent"}
        `}
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-16 py-5 flex items-center justify-between gap-6">
          {/* Brand lockup. Both elements use the official brand SVG — the
              tree-of-life mark and the KISMET wordmark with its designed
              letterforms — so the icon and wordmark sit as one designed piece
              per the brand guide, not as a mark next to typed text. */}
          <Link
            href="/"
            className="flex items-center gap-4 md:gap-5 group -my-2"
            onClick={close}
            aria-label="Kismet Finance Group, home"
          >
            <BrandMark className="vt-brand-mark w-20 h-20 md:w-24 md:h-24 text-[#D4AF37]" />
            <BrandWordmark className="h-6 md:h-7 w-auto text-[#D4AF37]" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-[12px] uppercase tracking-[0.16em]">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative group text-[#c4c6cf] hover:text-[#D4AF37] transition-colors duration-500"
              >
                {item.label}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-px w-0 bg-[#D4AF37] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
                />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <MagneticCTA href="/contact" className="!py-3 !px-6 !text-[11px]">
              <span>Enquire Now</span>
            </MagneticCTA>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 text-[#d9e3f2] hover:text-[#D4AF37] transition-colors"
            aria-label="Open navigation"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <line x1="3" y1="8" x2="21" y2="8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <line x1="3" y1="16" x2="21" y2="16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile fullscreen overlay backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-[100] bg-[#0a141e]/60 backdrop-blur-sm md:hidden"
          aria-hidden="true"
          onClick={close}
        />
      )}

      <div
        className={`
          fixed inset-0 z-[110] flex flex-col md:hidden
          transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        style={{
          background:
            "radial-gradient(ellipse 700px 600px at 80% 0%, rgba(212, 175, 55, 0.10), transparent 60%), linear-gradient(180deg, #0E2240 0%, #08152A 100%)",
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b-[0.5px] border-[#43474e]/40">
          <Link
            href="/"
            className="flex items-center gap-4"
            onClick={close}
            aria-label="Kismet Finance Group, home"
          >
            <BrandMark className="w-20 h-20 text-[#D4AF37]" />
            <BrandWordmark className="h-6 w-auto text-[#D4AF37]" />
          </Link>
          <button
            ref={closeRef}
            className="flex items-center justify-center w-10 h-10 text-[#d9e3f2] hover:text-[#D4AF37] transition-colors"
            aria-label="Close navigation"
            onClick={close}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <line x1="20" y1="4" x2="4" y2="20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 flex flex-col items-start justify-center gap-7 px-10">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-serif text-[28px] leading-tight tracking-[-0.01em] text-[#d9e3f2] hover:text-[#D4AF37] transition-colors duration-400"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 600ms cubic-bezier(0.16,1,0.3,1) ${120 + i * 60}ms, transform 600ms cubic-bezier(0.16,1,0.3,1) ${120 + i * 60}ms, color 400ms ease`,
              }}
              onClick={close}
            >
              <span className="font-serif italic text-[14px] text-[#D4AF37]/60 mr-4 align-baseline tabular-nums">
                0{i + 1}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="px-6 pb-10 pt-4 border-t-[0.5px] border-[#43474e]/40">
          <div onClick={close}>
            <MagneticCTA href="/contact" className="w-full">
              <span>Enquire Now</span>
              <span aria-hidden className="cta-arrow">&rarr;</span>
            </MagneticCTA>
          </div>
        </div>
      </div>
    </>
  );
}
