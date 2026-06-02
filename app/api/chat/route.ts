import { NextResponse } from "next/server";
import { z } from "zod";
import Anthropic from "@anthropic-ai/sdk";
import {
  CHAT_MODEL,
  CHAT_LIMITS,
  CHAT_SYSTEM_PROMPT,
  getAnthropicApiKey,
} from "@/lib/chat";

export const runtime = "nodejs";

// Simple in-memory rate limiter, same shape as the lead route. Resets on
// serverless cold start — acceptable for a low-stakes public widget; revisit
// with a shared store (KV/Redis) if abuse becomes a problem.
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 30;
const ipCache = new Map<string, { count: number; expires: number }>();

const Schema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(CHAT_LIMITS.maxCharsPerMessage),
      })
    )
    .min(1)
    .max(CHAT_LIMITS.maxMessages)
    // The Messages API requires the conversation to start with a user turn and
    // we only ever generate in response to one, so the last turn must be user.
    .refine((m) => m[0].role === "user", "conversation must start with a user message")
    .refine((m) => m[m.length - 1].role === "user", "last message must be from the user"),
});

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const now = Date.now();
  const record = ipCache.get(ip);

  if (record && now < record.expires) {
    if (record.count >= MAX_REQUESTS) {
      return NextResponse.json({ error: "rate_limit_exceeded" }, { status: 429 });
    }
    record.count++;
  } else {
    ipCache.set(ip, { count: 1, expires: now + RATE_LIMIT_WINDOW });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  let apiKey: string;
  try {
    apiKey = getAnthropicApiKey();
  } catch {
    // Key absent — the assistant is intentionally unconfigured (e.g. preview
    // build with no secret). Tell the client so the widget can hide gracefully.
    return NextResponse.json({ error: "service_unconfigured" }, { status: 503 });
  }

  const client = new Anthropic({ apiKey });

  const stream = client.messages.stream({
    model: CHAT_MODEL,
    max_tokens: CHAT_LIMITS.maxOutputTokens,
    // Disabled for latency: a concierge FAQ does not need extended reasoning,
    // and the system prompt instructs answer-only output to avoid leakage.
    thinking: { type: "disabled" },
    // Frozen, prompt-cached system contract carrying the compliance guardrails.
    system: [
      { type: "text", text: CHAT_SYSTEM_PROMPT, cache_control: { type: "ephemeral" } },
    ],
    messages: parsed.data.messages,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch (err) {
        console.error("[chat] stream error", err);
        controller.enqueue(
          encoder.encode(
            "\n\nSorry, something went wrong on our end. Please try again, or reach us on the contact page."
          )
        );
      } finally {
        controller.close();
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}
