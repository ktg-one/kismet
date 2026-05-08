"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";

type Status = "idle" | "loading" | "ok" | "error" | "fallback";

/**
 * Stitch-aligned inquiry form. Bottom-border-only inputs with gold focus.
 * Pairs with a direct contact card + Perth office card on the right.
 */
export function ContactInquiry() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    let res: Response;
    try {
      res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      setErrorText("Connection failed. Please email hello@kismetfinancegroup.com.au.");
      setStatus("error");
      return;
    }

    if (res.ok) {
      setStatus("ok");
      form.reset();
      return;
    }
    if (res.status === 503) {
      setStatus("fallback");
      return;
    }
    if (res.status === 400) {
      setErrorText("Please check your details and try again.");
      setStatus("error");
      return;
    }
    setErrorText("Something broke on our end. Please try again, or email hello@kismetfinancegroup.com.au.");
    setStatus("error");
  }

  return (
    <section className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pb-24 md:pb-32">
      {/* Left: Inquiry form */}
      <Reveal className="lg:col-span-7">
        <div className="kismet-surface-elevated p-8 md:p-10 lg:p-12 relative h-full">
          {/* Subtle inner gold edge */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-lg border border-[#D4AF37]/10 pointer-events-none"
          />
          <h2 className="font-serif text-[26px] md:text-[32px] leading-[1.25] tracking-[-0.008em] text-[#d9e3f2] mb-8 relative z-10">
            Direct Inquiry
          </h2>

          {status === "ok" && (
            <div className="bg-[#D4AF37]/[0.05] border border-[#D4AF37]/30 rounded p-7 mb-6 relative z-10">
              <div className="font-serif text-[20px] text-[#D4AF37] mb-2 tracking-[-0.005em]">
                Got it.
              </div>
              <p className="text-[#c4c6cf]/85 leading-[1.65]">
                We will be in touch within one business day.
              </p>
            </div>
          )}

          {status === "fallback" && (
            <div className="bg-[#18283d]/60 border border-[#43474e]/40 rounded p-7 mb-6 relative z-10">
              <div className="font-serif text-[20px] text-[#d9e3f2] mb-2 tracking-[-0.005em]">
                The form is being wired up.
              </div>
              <p className="text-[#c4c6cf]/85 leading-[1.65] mb-5">
                Until then, the fastest way to reach us is a direct email.
              </p>
              <a href="mailto:hello@kismetfinancegroup.com.au" className="cta-gold">
                <span>Email us</span>
                <span aria-hidden className="cta-arrow">&rarr;</span>
              </a>
            </div>
          )}

          {status !== "ok" && status !== "fallback" && (
            <form onSubmit={onSubmit} className="space-y-7 relative z-10">
              <div>
                <label htmlFor="name" className="kismet-input-label">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  className="kismet-input"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                <div>
                  <label htmlFor="email" className="kismet-input-label">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="kismet-input"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="kismet-input-label">
                    Phone (Optional)
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="0400 000 000"
                    className="kismet-input"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="kismet-input-label">
                  How can we help?
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="A line or two is plenty. We will dig in on the call."
                  className="kismet-input resize-none"
                />
              </div>

              <div className="pt-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 border-t-[0.5px] border-[#43474e]/30">
                <span className="text-[13px] text-[#c4c6cf]/60">
                  Your information is handled with discretion.
                </span>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="cta-gold disabled:opacity-60 disabled:cursor-wait"
                >
                  <span>{status === "loading" ? "Sending..." : "Send Message"}</span>
                  <span aria-hidden className="cta-arrow">&rarr;</span>
                </button>
              </div>

              {status === "error" && (
                <p className="text-sm text-red-300/85 mt-3">{errorText}</p>
              )}
            </form>
          )}
        </div>
      </Reveal>

      {/* Right: direct contact + office */}
      <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-7">
        {/* Direct contact */}
        <Reveal delay={0.1}>
          <div className="bg-[#13243a] border border-[#43474e]/30 rounded-lg p-8">
            <h3 className="text-[12px] font-semibold tracking-[0.22em] uppercase text-[#D4AF37] mb-6">
              Direct Contact
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group">
                <div className="mt-0.5 w-10 h-10 rounded-full bg-[#26456a] flex items-center justify-center group-hover:bg-[#1E3A5F] transition-colors">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    className="text-[#D4AF37]"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#c4c6cf]/85 mb-1">
                    Phone
                  </p>
                  <a
                    href="tel:+61862858501"
                    className="text-[18px] text-[#d9e3f2] hover:text-[#D4AF37] transition-colors tabular-nums"
                  >
                    (08) 6285 8501
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="mt-0.5 w-10 h-10 rounded-full bg-[#26456a] flex items-center justify-center group-hover:bg-[#1E3A5F] transition-colors">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    className="text-[#D4AF37]"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#c4c6cf]/85 mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:hello@kismetfinancegroup.com.au"
                    className="text-[15px] text-[#d9e3f2] hover:text-[#D4AF37] transition-colors break-all"
                  >
                    hello@kismetfinancegroup.com.au
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="mt-0.5 w-10 h-10 rounded-full bg-[#26456a] flex items-center justify-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    className="text-[#D4AF37]"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#c4c6cf]/85 mb-1">
                    Office
                  </p>
                  <p className="text-[15px] text-[#d9e3f2] leading-[1.55]">
                    52 Cooper Road
                    <br />
                    Cockburn Central WA 6164
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </Reveal>

        {/* Booking strip */}
        <Reveal delay={0.18}>
          <div className="bg-[#18283d] border border-[#43474e]/30 rounded-lg p-8 flex flex-col gap-5">
            <h3 className="text-[12px] font-semibold tracking-[0.22em] uppercase text-[#D4AF37]">
              Book directly
            </h3>
            <p className="text-[15px] text-[#c4c6cf]/85 leading-[1.65]">
              Skip the form. Pick a 30-minute slot that suits you. The first call has no pitch and no
              obligation.
            </p>
            <a
              href={process.env.NEXT_PUBLIC_BOOKING_URL ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-gold w-full"
            >
              <span>Book a private call</span>
              <span aria-hidden className="cta-arrow">&rarr;</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
