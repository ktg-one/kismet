"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/**
 * Kismet website assistant — a floating concierge widget.
 *
 * Talks to the guardrailed /api/chat route (streamed text/plain). Compliance
 * lives server-side in the system prompt; this component is presentation only.
 *
 * Gated behind NEXT_PUBLIC_CHAT_ENABLED so the widget stays dark until the owner
 * explicitly turns it on — a finance assistant should not appear live without a
 * licensed review of its guardrails. Renders nothing unless the flag is "true".
 */

type Turn = { role: "user" | "assistant"; content: string };

const GREETING =
  "Hi, I'm Kismet's assistant. I can explain how Kismet works and point you in the right direction. What brings you in today?";

const ENABLED = process.env.NEXT_PUBLIC_CHAT_ENABLED === "true";

function SpeakerIcon({ playing }: { playing?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      {playing ? (
        <>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </>
      ) : (
        <line x1="23" y1="9" x2="17" y2="15" />
      )}
    </svg>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [turns, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  if (!ENABLED) return null;

  async function speak(text: string, id: number) {
    if (!voiceEnabled) return;
    
    // Stop current audio if any
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    setPlayingId(id);

    try {
      const res = await fetch("/api/speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, voice: "shane" }),
      });

      if (!res.ok) throw new Error("TTS failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      
      audio.onended = () => {
        setPlayingId(null);
        URL.revokeObjectURL(url);
        audioRef.current = null;
      };

      await audio.play();
    } catch (err) {
      console.error("[chat] speech error:", err);
      setPlayingId(null);
    }
  }

  async function send() {
    const text = input.trim();
    if (!text || busy) return;

    const next: Turn[] = [...turns, { role: "user", content: text }];
    setTurns([...next, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (res.status === 503) {
        setUnavailable(true);
        setOpen(false);
        return;
      }
      if (res.status === 429) {
        replaceLast("We have had a lot of messages from here recently. Please give it a few minutes, or reach us on the contact page.");
        return;
      }
      if (!res.ok || !res.body) {
        replaceLast("Sorry, something went wrong. Please try again, or use the contact page.");
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        replaceLast(acc);
      }
      
      // Auto-speak the final response if enabled
      if (voiceEnabled) {
        speak(acc, turns.length + 1);
      }
    } catch {
      replaceLast("Sorry, the connection dropped. Please try again, or use the contact page.");
    } finally {
      setBusy(false);
    }
  }

  function replaceLast(content: string) {
    setTurns((prev) => {
      const copy = [...prev];
      copy[copy.length - 1] = { role: "assistant", content };
      return copy;
    });
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  if (unavailable) return null;

  const transition = { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const };
  const messages: Turn[] = [{ role: "assistant", content: GREETING }, ...turns];

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.section
            key="kismet-chat-panel"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={transition}
            role="dialog"
            aria-label="Chat with Kismet's assistant"
            className="fixed bottom-24 right-4 z-50 flex h-[520px] max-h-[70vh] w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-xl border border-white/10 bg-surface-container shadow-2xl backdrop-blur"
          >
            <header className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex flex-col">
                <span className="font-serif text-[15px] font-semibold text-white">Kismet assistant</span>
                <span className="text-[11px] uppercase tracking-[0.14em] text-gold/80">Here to help you get oriented</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  title={voiceEnabled ? "Disable voice" : "Enable voice"}
                  className={`grid h-8 w-8 place-items-center rounded-full transition-colors ${
                    voiceEnabled ? "bg-gold/10 text-gold" : "text-on-surface-variant hover:bg-white/5"
                  }`}
                >
                  <SpeakerIcon playing={voiceEnabled} />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="grid h-8 w-8 place-items-center rounded-full text-on-surface-variant transition-colors hover:bg-white/5 hover:text-white"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </header>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
                >
                  <div className={`relative group ${m.role === "user" ? "max-w-[85%]" : "max-w-[90%]"}`}>
                    <p
                      className={
                        m.role === "user"
                          ? "rounded-lg rounded-br-sm bg-navy px-3.5 py-2.5 text-[14px] leading-relaxed text-white"
                          : "rounded-lg rounded-bl-sm bg-white/[0.04] px-3.5 py-2.5 text-[14px] leading-relaxed text-on-surface"
                      }
                    >
                      {m.content || (busy && i === messages.length - 1 ? <TypingDots /> : "")}
                    </p>
                    {m.role === "assistant" && m.content && (
                      <button
                        onClick={() => speak(m.content, i)}
                        className={`absolute -right-8 top-1 p-1.5 rounded-full transition-opacity opacity-0 group-hover:opacity-100 hover:bg-white/5 ${
                          playingId === i ? "text-gold opacity-100" : "text-on-surface-variant"
                        }`}
                        title="Play audio"
                      >
                        <SpeakerIcon playing={playingId === i} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 p-3">
              <div className="flex items-end gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  maxLength={2000}
                  placeholder="Ask a general question…"
                  aria-label="Type your message"
                  className="flex-1 rounded-md border border-white/10 bg-surface-container-low px-3 py-2.5 text-[14px] text-white placeholder:text-on-surface-variant/60 focus:border-gold/50 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={send}
                  disabled={busy || !input.trim()}
                  aria-label="Send message"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-gold-gradient text-navy-deep transition-opacity disabled:opacity-40"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M2 9h11M9 4l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <p className="mt-2 px-1 text-[10px] leading-snug text-on-surface-variant/60">
                General information only — not personal financial, credit, tax or legal advice.
              </p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat with Kismet's assistant"}
        aria-expanded={open}
        className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-gold-gradient text-navy-deep shadow-[0_12px_40px_-12px_rgba(212,175,55,0.5)] transition-transform hover:scale-105 active:scale-95"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M3 5.5A1.5 1.5 0 014.5 4h13A1.5 1.5 0 0119 5.5v8A1.5 1.5 0 0117.5 15H8l-4 3v-3H4.5A1.5 1.5 0 013 13.5v-8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    </>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex gap-1 align-middle" aria-label="Assistant is typing">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="inline-block h-1.5 w-1.5 rounded-full bg-on-surface-variant"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
        />
      ))}
    </span>
  );
}
