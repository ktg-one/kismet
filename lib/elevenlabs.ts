import "server-only";
import { getElevenLabsEnv } from "./env";

/**
 * ElevenLabs TTS utility for Kismet.
 *
 * Provides streaming text-to-speech using the Eleven v3 model.
 * Recommended Australian voices: Lee (Shane) and Emma (Amy).
 */

const MODEL_ID = "eleven_v3";

export async function generateSpeechStream(text: string, voiceId: string) {
  const { apiKey } = getElevenLabsEnv();

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: MODEL_ID,
        voice_settings: {
          stability: 0.7,
          similarity_boost: 0.8,
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    console.error("[elevenlabs] TTS error:", response.status, error);
    throw new Error(`ElevenLabs TTS failed: ${response.statusText}`);
  }

  return response.body;
}
