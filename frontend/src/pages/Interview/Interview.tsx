import AudioRecorder from '@/pages/Interview/InterviewSection/AudioRecorder';
import NotesSection from '@/pages/Interview/InterviewSection/NoteSection';
import QuestionCard from '@/pages/Interview/InterviewSection/QuestionCard';
import React, { useState, useRef, useEffect } from 'react';
import NavigationButtons from './InterviewSection/NavigationButton';
import { useSpeechToText } from '@/hooks/useSpeechToText';
import { getInterviewQuestionsById, saveAnswer } from '@/services/InterviewApi/CreateInterviewApi';
import { generateSummary } from '@/services/SummaryApi/SummaryApi';
import { useNavigate, useParams } from 'react-router-dom';

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
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const params = useParams<{ id: string }>();
  const interviewId = params?.id;
  const navigate = useNavigate();

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    startListening,
    stopListening,
    reset,
    error,
  } = useSpeechToText();

 
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!interviewId) return;
      try {
        setLoading(true);
        const response = await getInterviewQuestionsById(interviewId);
        const data = response.data?.interviewQuestions?.questions || [];
        setQuestions(data);
      } catch (err) {
        console.error(' Error fetching questions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [interviewId]);



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

  const combinedNotes =
    isRecording && (transcript || interimTranscript)
      ? `${notes ? notes + '\n' : ''}${transcript || interimTranscript}`
      : notes;

  const startRecording = () => {
  reset();                     
  setRecordingTime(0);
  setIsRecording(true);
  startListening();             // start speech recognition

  intervalRef.current = setInterval(() => {
    setRecordingTime((t) => t + 1);
  }, 1000);
};

const stopRecording = () => {
  stopListening();              // stop speech recognition
  setIsRecording(false);

  if (intervalRef.current) {
    clearInterval(intervalRef.current);
  }

  // Take the final transcript and add it to notes
  const finalText = finalTranscript || transcript || interimTranscript;
  if (finalText?.trim()) {
    setNotes((prev) => `${prev ? prev + '\n' : ''}${finalText}`);
  }
};


  const handleSave = async () => {
    const textToSave = notes.trim();
    const currentQuestion = questions[currentQuestionIndex];
    if (!interviewId || !currentQuestion || !textToSave) return;

    try {
      const questionId = currentQuestion.id;
      const updatedAnswers = { ...answers, [questionId]: textToSave };
      setAnswers(updatedAnswers);
      await saveAnswer(interviewId, { questionId, answer: textToSave });
      setNotes('');
      reset();
    } catch (err) {
      console.error(' Failed to save answer:', err);
    }
  };

  /** ⏭ Next question */
  const nextQuestion = async () => {
    await handleSave();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      await handleFinishInterview();
    }
  };

  /** ⏮ Previous question */
  const prevQuestion = async () => {
    await handleSave();
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((i) => i - 1);
    }
  };

  /** 🧾 Generate Summary after interview ends */
  const handleFinishInterview = async () => {
    console.log('id',interviewId);
    
    if (!interviewId) return;
    try {
      setIsGeneratingSummary(true);
      const res = await generateSummary(interviewId);
      navigate(`/summary/${interviewId}`);
      setSummary(res.data.summary);
      console.log('✅ Summary generated:', res.data.summary);
    } catch (err) {
      console.error('Failed to generate summary:', err);
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  useEffect(() => {
  if (isRecording && (transcript || interimTranscript)) {
    setNotes(`${transcript || interimTranscript}`);
  }
}, [transcript, interimTranscript, isRecording]);

  if (loading) return <p className="text-center mt-10">Loading questions...</p>;

  return (
    <div className="min-h-screen p-5">
      <div className="max-w-4xl mx-auto space-y-6">
        {summary ? (
          <div className="bg-gray-50 border rounded-2xl p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-3">Interview Summary</h2>
            <p className="text-gray-700 whitespace-pre-line">{summary}</p>
          </div>
        ) : (
          <>
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
              onFinish={handleFinishInterview}
            />
          </>
        )}

        {isGeneratingSummary && (
          <p className="text-center text-blue-500">⏳ Generating summary, please wait...</p>
        )}
      </div>
    </div>
  );
};

export default Interview;
