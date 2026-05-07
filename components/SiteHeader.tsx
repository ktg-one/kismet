"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/approach", label: "How we work" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Scroll-driven header opacity. Only flips state at threshold to avoid re-renders.
  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 24;
      setScrolled((prev) => (prev === next ? prev : next));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while panel is open
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

  // Close on Escape key
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
            ? "bg-[#0A1A32]/85 backdrop-blur-xl border-b border-white/[0.07]"
            : "bg-transparent backdrop-blur-0 border-b border-transparent"}
        `}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-5 flex items-center justify-between gap-6">
          {/* Wordmark */}
          <Link
            href="/"
            className="font-serif text-lg tracking-[0.22em] text-gold uppercase relative group"
            onClick={close}
          >
            <span>Kismet</span>
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-px w-0 bg-gold/60 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.18em]">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative group text-white/70 hover:text-white transition-colors duration-500"
              >
                {item.label}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
                />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden md:inline-flex cta-gold !py-3 !px-6 !text-[10px]"
          >
            <span>Book a private call</span>
            <span aria-hidden className="cta-arrow">&rarr;</span>
          </Link>

          {/* Mobile burger */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 text-white/85 hover:text-gold transition-colors"
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

      {/* Mobile fullscreen overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[100] bg-navy-deep/60 backdrop-blur-sm md:hidden"
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
            "radial-gradient(ellipse 700px 600px at 80% 0%, rgba(212, 175, 55, 0.14), transparent 60%), linear-gradient(180deg, #0E2240 0%, #08152A 100%)",
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
          <Link
            href="/"
            className="font-serif text-lg tracking-[0.22em] text-gold uppercase"
            onClick={close}
          >
            Kismet
          </Link>
          <button
            ref={closeRef}
            className="flex items-center justify-center w-10 h-10 text-white/85 hover:text-gold transition-colors"
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
              className="font-serif text-[34px] leading-tight tracking-[-0.01em] text-white/85 hover:text-gold transition-colors duration-400"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 600ms cubic-bezier(0.16,1,0.3,1) ${120 + i * 60}ms, transform 600ms cubic-bezier(0.16,1,0.3,1) ${120 + i * 60}ms, color 400ms ease`,
              }}
              onClick={close}
            >
              <span className="index-marker not-italic mr-4 align-baseline">0{i + 1}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="px-6 pb-10 pt-4 border-t border-white/[0.06]">
          <Link
            href="/contact"
            className="cta-gold w-full justify-center"
            onClick={close}
          >
            <span>Book a private call</span>
            <span aria-hidden className="cta-arrow">&rarr;</span>
          </Link>
        </div>
      </div>
    </>
  );
}
