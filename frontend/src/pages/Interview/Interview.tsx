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

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const params = useParams<{ id: string }>();
  const interviewId = params?.id;

  loading && <p>Loading questions...</p>;
  // Fetch interview questions
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!interviewId) return;
      try {
        setLoading(true);
        console.log('Fetching questions for interview:', interviewId);
        const response = await getInterviewQuestionsById(interviewId);
        console.log('✅ Questions fetched:', response.data.interviewQuestions.questions);
        setQuestions(response.data.interviewQuestions.questions || []);
      } catch (err: any) {
        console.error('❌ Error fetching questions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [interviewId]);

  // Speech-to-text hook
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    startListening,
    stopListening,
    reset,
    error,
  } = useSpeechToText();

  // Watch speech updates
  useEffect(() => {
    if (isRecording) {
      console.log('🎤 Listening...');
      console.log('🟡 Interim Transcript:', interimTranscript);
      console.log('🟢 Transcript:', transcript);
    }
  }, [transcript, interimTranscript, isRecording]);

  // Setup MediaRecorder
  useEffect(() => {
    const setupRecorder = async () => {
      try {
        console.log('🎙 Requesting microphone access...');
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        console.log('✅ Microphone access granted.');
      } catch (err) {
        console.error('❌ Mic access error:', err);
      }
    };
    setupRecorder();
  }, []);

  // Handle timer
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

  // Combine speech and manual notes
  const combinedNotes =
    isRecording && (transcript || interimTranscript)
      ? `${notes ? notes + '\n' : ''}${transcript || interimTranscript}`
      : notes;

  const startRecording = () => {
    if (mediaRecorderRef.current) {
      console.log('▶️ Starting recording...');
      setRecordingTime(0);
      reset();
      setIsRecording(true);
      mediaRecorderRef.current.start();
      startListening();
    } else {
      console.warn('⚠️ MediaRecorder not initialized.');
    }
  };

  const stopRecording = () => {
    console.log('⏹️ Stopping recording...');
    mediaRecorderRef.current?.stop();
    stopListening();
    setIsRecording(false);

    // Final speech result
    console.log('📝 Final Transcript:', finalTranscript);
    console.log('📝 Current Transcript:', transcript);

    const finalText = finalTranscript || transcript;
    if (finalText?.trim()) {
      setNotes((prev) => {
        const updated = `${prev ? prev + '\n' : ''}${finalText}`;
        console.log('✅ Final Notes updated:', updated);
        return updated;
      });
    } else {
      console.warn('⚠️ No speech captured to add.');
    }
  };

  const saveAnswer = () => {
    console.log('💾 Saving answer...');
    const textToSave = notes.trim();
    if (textToSave && questions[currentQuestionIndex]) {
      setAnswers((prev) => {
        const updated = {
          ...prev,
          [questions[currentQuestionIndex].id]: textToSave,
        };
        console.log('✅ Answer saved:', updated);
        return updated;
      });
      setNotes('');
      reset();
    } else {
      console.warn('⚠️ Nothing to save (empty notes or invalid question).');
    }
  };

  const nextQuestion = () => {
    console.log('➡️ Next question...');
    saveAnswer();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      console.log('🚫 No more questions.');
    }
  };

  const prevQuestion = () => {
    console.log('⬅️ Previous question...');
    saveAnswer();
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else {
      console.log('🚫 Already at first question.');
    }
  };

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

        {/* ✅ Combined live + manual text */}
        <NotesSection
          notes={combinedNotes}
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
