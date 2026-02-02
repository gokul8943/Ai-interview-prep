import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PlayCircle, Loader2, Loader } from 'lucide-react'
import { domains, levels, type DomainId } from '@/helpers/InterviewData'
import InterviewTitle from '@/pages/CreateInterview/Components/InterviewTitle'
import DomainSelector from '@/pages/CreateInterview/Components/DomainSelector'
import LevelSelector from '@/pages/CreateInterview/Components/LevelSelector'
import QuestionsSlider from '@/pages/CreateInterview/Components/QuestionSelector'
import TopicsSelector from './Components/TopicSelector'
import InstructionModal from '@/components/modal/InstructionModa'

import useAuthStore from '@/store/AuthStrore';

import { createInterview } from '../../services/InterviewApi/CreateInterviewApi'
import { useNavigate } from 'react-router-dom'

const CreateInterview: React.FC = () => {
  const [interviewTitle, setInterviewTitle] = useState('')
  const [selectedDomain, setSelectedDomain] = useState('')
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [selectedLevel, setSelectedLevel] = useState('')
  const [numberOfQuestions, setNumberOfQuestions] = useState([10])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { authState } = useAuthStore()
  const userId = authState.user?._id

  const navigate = useNavigate()


  const handleClose = () => setIsModalOpen(false)

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    )
  }

  const isFormValid = Boolean(
    interviewTitle && selectedDomain && selectedLevel && selectedTopics.length > 0
  )

  const handleCreateInterview = async () => {
    try {
      setLoading(true)
      const payload = {
        userId: userId,
        title: interviewTitle,
        domain: selectedDomain,
        topics: selectedTopics,
        level: selectedLevel,
        questionCount: numberOfQuestions[0],
      }

      const response = await createInterview(payload)

      const interviewId = response?.data?.newInterview?._id;
      if (interviewId) {
        navigate(`/interview/${interviewId}`);
      } else {
        console.error("Interview ID missing in response", response?.data);
      }
    } catch (error) {
      console.error('Error creating interview:', error)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-4">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <Loader className="w-12 h-12 text-white animate-spin" />
        </div>
      )}
      <div className="max-w-4xl mx-auto grid gap-6">
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-white">Create New Interview</h1>
          <p className="text-gray-600 text-lg">
            Design your perfect technical interview experience
          </p>
        </div>

        <InterviewTitle title={interviewTitle} onChange={setInterviewTitle} />
        <DomainSelector
          domains={domains}
          selectedDomain={selectedDomain}
          onSelect={setSelectedDomain}
        />
        {selectedDomain && (
          <TopicsSelector
            domainId={selectedDomain as DomainId}
            selectedTopics={selectedTopics}
            onToggle={handleTopicToggle}
          />
        )}
        <LevelSelector
          selectedLevel={selectedLevel}
          onChange={setSelectedLevel}
          levels={levels}
        />
        <QuestionsSlider value={numberOfQuestions} onChange={setNumberOfQuestions} />

        <div className="flex justify-center pt-4">
          <Button
            disabled={!isFormValid}
            onClick={handleCreateInterview}
            className="bg-gradient-to-r from-blue-600 to-blue-300 hover:from-blue-700 hover:to-blue-300 text-white px-8 py-3 text-lg font-medium rounded-lg shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" /> {/* 👈 spinner */}
                Creating...
              </>
            ) : (
              <>
                <PlayCircle className="w-5 h-5 mr-2" />
                Create Interview
              </>
            )}
          </Button>
        </div>
      </div>

      <InstructionModal
        isOpen={isModalOpen}
        onClose={handleClose}
        type="pre-interview"
      />
    </div>
  )
}

export default CreateInterview
