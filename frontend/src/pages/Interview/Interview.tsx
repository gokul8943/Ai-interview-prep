import AudioRecorder from '@/pages/Interview/InterviewSection/AudioRecorder';
import NotesSection from '@/pages/Interview/InterviewSection/NoteSection';
import QuestionCard from '@/pages/Interview/InterviewSection/QuestionCard';
import React, { useState, useRef, useEffect } from 'react';
import NavigationButtons from './InterviewSection/NavigationButton';
import { useSpeechToText } from '@/hooks/useSpeechToText';
import { getInterviewQuestionsById, saveAnswer } from '@/services/InterviewApi/CreateInterviewApi';
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

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const params = useParams<{ id: string }>();
  const interviewId = params?.id;

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    startListening,
    stopListening,
    reset,
    error,
  } = useSpeechToText();

  // Fetch interview questions
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!interviewId) return;
      try {
        setLoading(true);
        const response = await getInterviewQuestionsById(interviewId);
        const data = response.data?.interviewQuestions?.questions || [];
        setQuestions(data);
      } catch (err) {
        console.error('❌ Error fetching questions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [interviewId]);

  // Setup mic
  useEffect(() => {
    const setupRecorder = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
      } catch (err) {
        console.error('❌ Mic access error:', err);
      }
    };
    setupRecorder();
  }, []);

  // Timer
  useEffect(() => {
    if (isRecording) {
      intervalRef.current = setInterval(() => setRecordingTime((t) => t + 1), 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRecording]);

  // Combine notes + live transcript
  const combinedNotes =
    isRecording && (transcript || interimTranscript)
      ? `${notes ? notes + '\n' : ''}${transcript || interimTranscript}`
      : notes;

  const startRecording = () => {
    if (!mediaRecorderRef.current) return;
    setRecordingTime(0);
    reset();
    setIsRecording(true);
    mediaRecorderRef.current.start();
    startListening();
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    stopListening();
    setIsRecording(false);

    const finalText = finalTranscript || transcript;
    if (finalText?.trim()) {
      setNotes((prev) => `${prev ? prev + '\n' : ''}${finalText}`);
    }
  };

  /** ✅ Save the current answer to backend */
  const handleSave = async () => {
    const textToSave = notes.trim();
    const currentQuestion = questions[currentQuestionIndex];
    if (!interviewId || !currentQuestion || !textToSave) return;

    try {
      const questionId = currentQuestion.id;
      const updatedAnswers = {
        ...answers,
        [questionId]: textToSave,
      };
      setAnswers(updatedAnswers);

      console.log('💾 Saving to backend...', { interviewId, questionId, answer: textToSave });
      await saveAnswer(interviewId, { questionId, answer: textToSave });
      console.log('✅ Answer saved successfully');
      setNotes('');
      reset();
    } catch (err) {
      console.error('❌ Failed to save answer:', err);
    }
  };

  /** ✅ Next question handler */
  const nextQuestion = async () => {
    await handleSave();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
    }
  };

  /** ✅ Previous question handler */
  const prevQuestion = async () => {
    await handleSave();
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((i) => i - 1);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading questions...</p>;

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
          notes={combinedNotes}
          setNotes={setNotes}
          saveAnswer={handleSave}
          currentAnswer={answers[questions[currentQuestionIndex]?.id]}
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
