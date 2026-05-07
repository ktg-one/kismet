"use client";

import { useState } from "react";

export function BookingEmbed() {
  const url = process.env.NEXT_PUBLIC_BOOKING_URL ?? "";
  const [loaded, setLoaded] = useState(false);

  if (!url) {
    return (
      <div className="kismet-surface p-10 md:p-12 min-h-[480px] flex flex-col items-start justify-center">
        <div className="eyebrow eyebrow-with-dot mb-7">
          <span className="eyebrow-dot" />
          <span>Calendar coming online</span>
        </div>
        <div className="font-serif text-[1.625rem] md:text-[1.875rem] leading-[1.18] tracking-[-0.008em] text-white mb-5 max-w-md">
          Booking link is being finalised.
        </div>
        <p className="text-[15px] text-white/65 leading-[1.78] max-w-md">
          Until then, send a note and we will reply within one business day with a time that suits.
        </p>
      </div>
    );
  }

  return (
    <div className="relative kismet-surface-elevated overflow-hidden">
      {/* Skeleton state, fades out once iframe loads */}
      <div
        aria-hidden
        className={`absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          loaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(212, 175, 55, 0.06), transparent 65%), linear-gradient(180deg, #0E2240 0%, #08152A 100%)",
        }}
      >
        <div className="flex flex-col items-center gap-5">
          <span className="relative inline-flex w-3 h-3">
            <span className="absolute inset-0 rounded-full bg-gold opacity-75 animate-ping" />
            <span className="relative inline-block w-3 h-3 rounded-full bg-gold" />
          </span>
          <span className="text-[10px] uppercase tracking-[0.28em] text-white/55">
            Loading the calendar
          </span>
        </div>
      </div>

      <iframe
        src={url}
        title="Book a Kismet strategy call"
        className="relative w-full h-[680px] bg-white"
        onLoad={() => setLoaded(true)}
        loading="lazy"
      />
    </div>
  );
}
