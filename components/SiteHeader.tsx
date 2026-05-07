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
  const closeRef = useRef<HTMLButtonElement>(null);

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
      <header className="sticky top-0 z-50 bg-navy-deep/80 backdrop-blur-md border-b border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between gap-6">
          {/* Wordmark */}
          <Link href="/" className="font-serif text-lg tracking-[0.18em] text-gold uppercase" onClick={close}>
            Kismet
          </Link>

          {/* Desktop nav (md+) */}
          <nav className="hidden md:flex items-center gap-9 text-[11px] uppercase tracking-[0.14em] text-white/75">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-gold transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA (md+) */}
          <Link
            href="/contact"
            className="hidden md:inline-flex text-[11px] uppercase tracking-[0.14em] font-semibold px-5 py-2.5 rounded-sm bg-gold-gradient text-navy-deep shadow-[0_4px_20px_rgba(212,175,55,0.18)] hover:shadow-[0_6px_24px_rgba(212,175,55,0.32)] transition-shadow"
          >
            Book a private call
          </Link>

          {/* Mobile burger (below md) */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 text-white/80 hover:text-gold transition-colors"
            aria-label="Open navigation"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <line x1="3" y1="8" x2="21" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="3" y1="16" x2="21" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile fullscreen overlay */}
      {open && (
        /* Backdrop: clicking outside the panel closes */
        <div
          className="fixed inset-0 z-[100] bg-navy-deep/60 backdrop-blur-sm md:hidden"
          aria-hidden="true"
          onClick={close}
        />
      )}

      <div
        className={`
          fixed inset-0 z-[110] flex flex-col bg-navy-deep md:hidden
          transition-opacity duration-200
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Panel header row: wordmark + close button */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <Link
            href="/"
            className="font-serif text-lg tracking-[0.18em] text-gold uppercase"
            onClick={close}
          >
            Kismet
          </Link>
          <button
            ref={closeRef}
            className="flex items-center justify-center w-10 h-10 text-white/80 hover:text-gold transition-colors"
            aria-label="Close navigation"
            onClick={close}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="20" y1="4" x2="4" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Nav links: centered, large type */}
        <nav className="flex-1 flex flex-col items-center justify-center gap-10">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[28px] font-serif tracking-[0.12em] uppercase text-white/80 hover:text-gold transition-colors"
              onClick={close}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA pinned to bottom */}
        <div className="px-6 pb-12 flex justify-center">
          <Link
            href="/contact"
            className="text-[11px] uppercase tracking-[0.14em] font-semibold px-8 py-3.5 rounded-sm bg-gold-gradient text-navy-deep shadow-[0_4px_20px_rgba(212,175,55,0.18)] hover:shadow-[0_6px_24px_rgba(212,175,55,0.32)] transition-shadow"
            onClick={close}
          >
            Book a private call
          </Link>
        </div>
      </div>
    </>
  );
}
