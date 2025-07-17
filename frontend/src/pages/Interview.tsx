import AudioRecorder from '@/components/InterviewSection/AudioRecorder';
import NotesSection from '@/components/InterviewSection/NoteSection';
import QuestionCard from '@/components/InterviewSection/QuestionCard';
import React, { useState, useRef, useEffect } from 'react';


interface Question {
  id: number;
  text: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const Interview: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [notes, setNotes] = useState('');
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const questions: Question[] = [
    { id: 1, text: 'Tell me about yourself...', category: 'General', difficulty: 'Easy' },
    { id: 2, text: 'What is your experience with React...', category: 'Technical', difficulty: 'Medium' },
    { id: 3, text: 'Describe a challenging project...', category: 'Behavioral', difficulty: 'Medium' },
    { id: 4, text: 'How would you optimize performance...', category: 'Technical', difficulty: 'Hard' },
    { id: 5, text: 'Where do you see yourself...', category: 'General', difficulty: 'Easy' }
  ];

  // Recorder init + timer logic
  useEffect(() => {
    const setupRecorder = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) audioChunksRef.current.push(e.data);
        };
        recorder.onstop = () => {
          const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          setAudioBlob(blob);
          audioChunksRef.current = [];
        };
        mediaRecorderRef.current = recorder;
      } catch (err) {
        console.error('Mic access error:', err);
      }
    };
    setupRecorder();
  }, []);

  useEffect(() => {
    if (isRecording) {
      intervalRef.current = setInterval(() => setRecordingTime((prev) => prev + 1), 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, [isRecording]);

  const startRecording = () => {
    if (mediaRecorderRef.current) {
      setRecordingTime(0);
      audioChunksRef.current = [];
      setAudioBlob(null);
      mediaRecorderRef.current.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const playAudio = () => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      audioRef.current = new Audio(url);
      audioRef.current.play();
      setIsPlaying(true);
      audioRef.current.onended = () => setIsPlaying(false);
    }
  };

  const pauseAudio = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const formatTime = (sec: number) => `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;

  const saveAnswer = () => {
    setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: notes }));
    setNotes('');
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <QuestionCard
          currentQuestion={currentQuestion}
          currentIndex={currentQuestionIndex}
          total={questions.length}
          answers={answers}
        />
        <AudioRecorder
          isRecording={isRecording}
          startRecording={startRecording}
          stopRecording={stopRecording}
          recordingTime={recordingTime}
          audioBlob={audioBlob}
          isPlaying={isPlaying}
          playAudio={playAudio}
          pauseAudio={pauseAudio}
          formatTime={formatTime}
        />
        <NotesSection
          notes={notes}
          setNotes={setNotes}
          saveAnswer={saveAnswer}
          currentAnswer={answers[currentQuestionIndex]}
        />
        {/* <NavigationButtons
          currentIndex={currentQuestionIndex}
          total={questions.length}
          setCurrentIndex={setCurrentQuestionIndex}
        /> */}
      </div>
    </div>
  );
};

export default Interview;
