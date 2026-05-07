"use client";
import { useState } from "react";

type Status = "idle" | "loading" | "ok" | "error" | "fallback";

export function LeadForm() {
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

    if (res.ok) { setStatus("ok"); form.reset(); return; }
    if (res.status === 503) { setStatus("fallback"); return; }
    if (res.status === 400) { setErrorText("Please check your details and try again."); setStatus("error"); return; }
    setErrorText("Something broke on our end. Please try again, or email hello@kismetfinancegroup.com.au.");
    setStatus("error");
  }

  if (status === "ok") {
    return (
      <div className="border border-gold/30 bg-gold/[0.04] p-8 text-left">
        <div className="font-serif text-xl text-gold mb-3">Got it.</div>
        <p className="text-white/75 leading-relaxed">We will be in touch within one business day.</p>
      </div>
    );
  }

  if (status === "fallback") {
    return (
      <div className="border border-white/10 bg-white/[0.02] p-8">
        <div className="font-serif text-xl text-white mb-3">The form is being wired up.</div>
        <p className="text-white/75 leading-relaxed mb-4">
          Until then, the fastest way to reach us is a direct email.
        </p>
        <a
          href="mailto:hello@kismetfinancegroup.com.au"
          className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] font-semibold pl-7 pr-6 py-4 rounded-sm bg-gold-gradient text-navy-deep shadow-[0_10px_40px_-10px_rgba(212,175,55,0.45)] transition-shadow duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_18px_60px_-12px_rgba(212,175,55,0.6)]"
        >
          Email hello@kismetfinancegroup.com.au
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Field label="Name" name="name" type="text" autoComplete="name" />
      <Field label="Email" name="email" type="email" autoComplete="email" />
      <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
      <div>
        <label htmlFor="message" className="block text-[10px] uppercase tracking-[0.2em] text-gold/80 mb-3">
          What&apos;s on your mind?
        </label>
        <textarea
          id="message" name="message" required rows={5}
          className="w-full bg-white/[0.03] border border-white/10 rounded-sm px-4 py-3.5 text-[15px] text-white placeholder-white/30 focus:border-gold/50 focus:bg-white/[0.05] outline-none transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] leading-relaxed"
          placeholder="A line or two is plenty. We will dig in on the call."
        />
      </div>
      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] font-semibold pl-7 pr-6 py-4 rounded-sm bg-gold-gradient text-navy-deep shadow-[0_10px_40px_-10px_rgba(212,175,55,0.45)] transition-shadow duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_18px_60px_-12px_rgba(212,175,55,0.6)] disabled:opacity-60 disabled:cursor-wait"
        >
          {status === "loading" ? "Sending..." : "Send"}
        </button>
        {status === "error" && (
          <p className="mt-4 text-sm text-red-300/80">{errorText}</p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type,
  autoComplete,
}: {
  label: string;
  name: string;
  type: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-[10px] uppercase tracking-[0.2em] text-gold/80 mb-3">
        {label}
      </label>
      <input
        id={name} name={name} type={type} required autoComplete={autoComplete}
        className="w-full bg-white/[0.03] border border-white/10 rounded-sm px-4 py-3.5 text-[15px] text-white placeholder-white/30 focus:border-gold/50 focus:bg-white/[0.05] outline-none transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
      />
    </div>
  );
}
