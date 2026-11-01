import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PlayCircle, Loader2, Loader, Sparkles } from 'lucide-react'
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
    <div className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden py-4 sm:py-6 lg:py-8">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-white" />
        <div className="absolute inset-0 bg-[url('/pattern.png')] bg-top bg-no-repeat opacity-30" />
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        
        <div className="section-container relative">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              CREATE NEW INTERVIEW
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-2 text-balance">
              Create Your Interview
            </h1>
          </div>
        </div>
      </section>

      <section className="py-4 sm:py-6 lg:py-8">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            {loading && (
              <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
                <Loader className="w-12 h-12 text-blue-600 animate-spin" />
              </div>
            )}

            <div className="space-y-4 animate-slide-up">
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
                  disabled={!isFormValid || loading}
                  onClick={handleCreateInterview}
                  className="btn-primary text-lg px-8 py-3"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
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

              <p className="text-center text-sm text-slate-500 mt-6">
                No credit card required • Cancel anytime • 10,000+ interviews completed
              </p>
            </div>
          </div>
        </div>
      </section>

      <InstructionModal
        isOpen={isModalOpen}
        onClose={handleClose}
        type="pre-interview"
      />
    </div>
  )
}

export default CreateInterview
