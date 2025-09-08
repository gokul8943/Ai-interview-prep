// useSpeechToText.ts
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

  const startListening = useCallback(() => {
    if (!browserSupportsSpeechRecognition) {
      setError("Your browser does not support speech recognition.");
      return;
    }
    if (!isMicrophoneAvailable) {
      setError("Microphone is not available.");
      return;
    }
    setError(null);
    SpeechRecognition.startListening({ continuous: true, language: "en-US" });
  }, [browserSupportsSpeechRecognition, isMicrophoneAvailable]);

  const stopListening = useCallback(() => {
    SpeechRecognition.stopListening();
  }, []);

  const reset = useCallback(() => {
    resetTranscript();
  }, [resetTranscript]);

  return {
    transcript,        // full transcript
    interimTranscript, // partial transcript while speaking
    finalTranscript,   // finalized part of speech
    listening,         // is mic active
    startListening,    // start speech recognition
    stopListening,     // stop speech recognition
    reset,             // clear transcript
    error,             // error messages if any
  };
}
