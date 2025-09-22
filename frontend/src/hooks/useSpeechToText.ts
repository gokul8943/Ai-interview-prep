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
  console.log("🎤 Starting listening...");
  SpeechRecognition.startListening({
    continuous: true,
    interimResults: true,
    language: "en-US",
  });
}, []);
  ;

  const stopListening = useCallback(() => {
    SpeechRecognition.stopListening();
  }, []);

  const reset = useCallback(() => {
    resetTranscript();
  }, [resetTranscript]);

  console.log("Browser supports SR:", browserSupportsSpeechRecognition);
  console.log("Mic available:", isMicrophoneAvailable);

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
