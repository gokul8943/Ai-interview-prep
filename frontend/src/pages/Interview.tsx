import React from 'react'
import HeaderSection from '@/components/InterviewSection/HeaderSection'
import QuestionCard from '@/components/InterviewSection/QuestionCard'
import AudioRecorder from '@/components/InterviewSection/AudioRecorder'
import NotesSection from '@/components/InterviewSection/NoteSection'


const Interview: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <HeaderSection />
        <QuestionCard />
        <AudioRecorder />
        <NotesSection />
      </div>
    </div>
  )
}

export default Interview