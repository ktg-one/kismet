import { NextResponse } from "next/server";
import { z } from "zod";
import { generateSpeechStream } from "@/lib/elevenlabs";
import { getElevenLabsEnv } from "@/lib/env";

export const runtime = "nodejs";

const Schema = z.object({
  text: z.string().min(1).max(2000),
  voice: z.enum(["shane", "amy"]).default("shane"),
});

/**
 * ElevenLabs Speech API route.
 *
 * Receives text and a voice selection, returns an MPEG audio stream.
 * Gated by ELEVENLABS_API_KEY being present.
 */
export async function POST(req: Request) {
  try {
    let apiKey: string;
    let shaneVoiceId: string;
    let amyVoiceId: string;

    try {
      const env = getElevenLabsEnv();
      apiKey = env.apiKey;
      shaneVoiceId = env.shaneVoiceId;
      amyVoiceId = env.amyVoiceId;
    } catch {
      return NextResponse.json({ error: "service_unconfigured" }, { status: 503 });
    }

    const body = await req.json();
    const parsed = Schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "invalid_input" }, { status: 400 });
    }

    const voiceId = parsed.data.voice === "amy" ? amyVoiceId : shaneVoiceId;

    const stream = await generateSpeechStream(parsed.data.text, voiceId);

    if (!stream) {
      return NextResponse.json({ error: "empty_stream" }, { status: 500 });
    }

    return new Response(stream, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[speech] route error:", err);
    return NextResponse.json({ error: "tts_failed" }, { status: 500 });
  }
}
