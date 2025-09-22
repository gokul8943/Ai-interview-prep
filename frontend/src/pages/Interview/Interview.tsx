// Interview.tsx
import AudioRecorder from '@/pages/Interview/InterviewSection/AudioRecorder';
import NotesSection from '@/pages/Interview/InterviewSection/NoteSection';
import QuestionCard from '@/pages/Interview/InterviewSection/QuestionCard';
import React, { useState, useRef, useEffect } from 'react';
import NavigationButtons from './InterviewSection/NavigationButton';
import { useSpeechToText } from '@/hooks/useSpeechToText';
import { getInterviewQuestionsById } from '@/services/InterviewApi/CreateInterviewApi';
import { useParams } from 'react-router-dom';

interface Question {
  id: number;
  question: string;
}

const Interview: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [notes, setNotes] = useState('');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  console.log(loading);


  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const params = useParams<{ id: string }>();
  const interviewId = params?.id;

  // 👇 speech-to-text hook
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    startListening,
    stopListening,
    reset,
    error,
  } = useSpeechToText();

  // fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!interviewId) return;
      try {
        setLoading(true);
        const response = await getInterviewQuestionsById(interviewId);
        setQuestions(response.data.interviewQuestions.questions || []);
        setLoading(false);
      } catch (err: any) {
        console.error('Error fetching questions:', err);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [interviewId]);

  // setup recorder
  useEffect(() => {
    const setupRecorder = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;
      } catch (err) {
        console.error('Mic access error:', err);
      }
    };
    setupRecorder();
  }, []);

  // timer handling
  useEffect(() => {
    if (isRecording) {
      intervalRef.current = setInterval(() => setRecordingTime((prev) => prev + 1), 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRecording]);

  // keep transcript flowing into notes live
  if (interimTranscript || transcript) {
    setNotes((prev) => {
      if (prev.trim().length > 0 && prev !== transcript) {
        return prev;
      }
      return transcript || interimTranscript;
    });
  }


  const startRecording = () => {
    if (mediaRecorderRef.current) {
      setRecordingTime(0);
      setNotes('');
      mediaRecorderRef.current.start();
      setIsRecording(true);
      startListening(); // 👈 start speech recognition
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    stopListening();

    // persist final transcript as notes
    if (finalTranscript.trim() || transcript.trim()) {
      setNotes(finalTranscript || transcript);
    }
  };

  const saveAnswer = () => {
    const textToSave = (notes || transcript || finalTranscript).trim();
    if (textToSave && questions[currentQuestionIndex]) {
      setAnswers((prev) => ({
        ...prev,
        [questions[currentQuestionIndex].id]: textToSave,
      }));
      reset(); // ✅ clear transcript after saving
    }
  };


  const nextQuestion = () => {
    saveAnswer();
    reset(); // 👈 clear transcript when moving
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const prevQuestion = () => {
    saveAnswer();
    reset(); // 👈 clear transcript when moving
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
  console.log("Transcript:", transcript);
  console.log("Interim:", interimTranscript);
  console.log("Final:", finalTranscript);
  console.log("Notes:", notes);
}, [transcript, interimTranscript, finalTranscript, notes]);

  return (
    <div className="min-h-screen p-5">
      <div className="max-w-4xl mx-auto space-y-6">
        <QuestionCard
          currentQuestion={questions[currentQuestionIndex]}
          currentIndex={currentQuestionIndex}
          total={questions.length}
          answers={answers}
        />

        <AudioRecorder
          isRecording={isRecording}
          startRecording={startRecording}
          stopRecording={stopRecording}
          recordingTime={recordingTime}
        />

        <NotesSection
          notes={notes || transcript || interimTranscript}
          setNotes={setNotes}
          saveAnswer={saveAnswer}
          currentAnswer={answers[currentQuestionIndex]}
        />


        {error && <p className="text-red-500">{error}</p>}

        <NavigationButtons
          currentIndex={currentQuestionIndex}
          total={questions.length}
          onNext={nextQuestion}
          onPrev={prevQuestion}
        />
      </div>
    </div>
  );
};

export default Interview;
