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
      <div className="kismet-surface-elevated p-8">
        <div className="font-serif text-[1.5rem] text-gold mb-3 tracking-[-0.005em]">Got it.</div>
        <p className="text-white/72 leading-[1.7]">We will be in touch within one business day.</p>
      </div>
    );
  }

  if (status === "fallback") {
    return (
      <div className="kismet-surface p-8">
        <div className="font-serif text-[1.5rem] text-white mb-3 tracking-[-0.005em]">The form is being wired up.</div>
        <p className="text-white/72 leading-[1.7] mb-6">
          Until then, the fastest way to reach us is a direct email.
        </p>
        <a
          href="mailto:hello@kismetfinancegroup.com.au"
          className="cta-gold"
        >
          <span>Email us</span>
          <span aria-hidden className="cta-arrow">&rarr;</span>
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-7">
      <Field label="Name" name="name" type="text" autoComplete="name" />
      <Field label="Email" name="email" type="email" autoComplete="email" />
      <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
      <div>
        <label htmlFor="message" className="block text-[10px] uppercase tracking-[0.24em] text-gold/85 mb-3">
          What&rsquo;s on your mind?
        </label>
        <textarea
          id="message" name="message" required rows={5}
          className="kismet-input resize-y"
          placeholder="A line or two is plenty. We will dig in on the call."
        />
      </div>
      <div className="pt-3">
        <button
          type="submit"
          disabled={status === "loading"}
          className="cta-gold disabled:opacity-60 disabled:cursor-wait"
        >
          <span>{status === "loading" ? "Sending..." : "Send"}</span>
          <span aria-hidden className="cta-arrow">&rarr;</span>
        </button>
        {status === "error" && (
          <p className="mt-5 text-sm text-red-300/80">{errorText}</p>
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
      <label htmlFor={name} className="block text-[10px] uppercase tracking-[0.24em] text-gold/85 mb-3">
        {label}
      </label>
      <input
        id={name} name={name} type={type} required autoComplete={autoComplete}
        className="kismet-input"
      />
    </div>
  );
}
