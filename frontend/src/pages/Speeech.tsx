import React from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const SpeechTest: React.FC = () => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  return (
    <div>
      <p>Listening: {listening ? "Yes" : "No"}</p>
      <button onClick={() => SpeechRecognition.startListening({ continuous: true, interimResults: true })}>
        Start Listening
      </button>
      <button className="bg-red-500" onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>Transcript: {transcript}</p>
    </div>
  );
};

export default SpeechTest;
