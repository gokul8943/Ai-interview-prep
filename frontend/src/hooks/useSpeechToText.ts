import { useState, useCallback } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

export function useSpeechToText() {
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  const [error, setError] = useState<string | null>(null);

  const startListening = useCallback(async () => {
    if (!browserSupportsSpeechRecognition) {
      setError("Your browser does not support speech recognition.");
      console.error("❌ SpeechRecognition not supported.");
      return;
    }
    if (!isMicrophoneAvailable) {
      setError("Microphone is not available.");
      console.error("❌ Microphone unavailable.");
      return;
    }

    setError(null);
    try {
      console.log("🎙 Starting speech recognition...");
      await SpeechRecognition.startListening({
        continuous: false, // try false first
        interimResults: true,
        language: "en-US",
      });
      console.log("✅ Speech recognition started.");
    } catch (err) {
      console.error("❌ Error starting listening:", err);
      setError("Failed to start listening. Check permissions.");
    }
  }, [browserSupportsSpeechRecognition, isMicrophoneAvailable]);

  const stopListening = useCallback(() => {
    console.log("🛑 Stopping speech recognition...");
    SpeechRecognition.stopListening();
  }, []);

  const reset = useCallback(() => {
    resetTranscript();
  }, [resetTranscript]);

  return {
    transcript,
    interimTranscript,
    finalTranscript,
    listening,
    startListening,
    stopListening,
    reset,
    error,
  };
}
