import OpenAI from "openai";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // ONLY for dev/testing, never in production
});

export async function transcribeAudio(file: File) {
  const response = await client.audio.transcriptions.create({
    file,
    model: "whisper-1"
  });

  return response.text;
}
