import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PlayCircle } from 'lucide-react'
import { domains, levels, type DomainId } from '@/helpers/InterviewData'
import InterviewTitle from '@/pages/CreateInterview/Components/InterviewTitle'
import DomainSelector from '@/pages/CreateInterview/Components/DomainSelector'
import TopicsSelector from '../components/CreateInterview/TopicSelector'
import LevelSelector from '@/pages/CreateInterview/Components/LevelSelector'
import QuestionsSlider from '@/pages/CreateInterview/Components/QuestionSelector'
import { useNavigate } from 'react-router-dom'

const CreateInterview: React.FC = () => {
  const [interviewTitle, setInterviewTitle] = useState('')
  const [selectedDomain, setSelectedDomain] = useState('')
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [selectedLevel, setSelectedLevel] = useState('')
  const [numberOfQuestions, setNumberOfQuestions] = useState([10])

  const navigate = useNavigate()

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    )
  }

  const isFormValid = Boolean(interviewTitle && selectedDomain && selectedLevel && selectedTopics.length > 0)

  const handleCreateInterview = () => {
    const interviewData = {
      title: interviewTitle,
      domain: selectedDomain,
      level: selectedLevel,
      topics: selectedTopics,
      numberOfQuestions: numberOfQuestions[0]
    }
    if(interviewData){
      navigate('/interview')
    }
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto grid gap-6">
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-white">Create New Interview</h1>
          <p className="text-gray-600 text-lg">Design your perfect technical interview experience</p>
        </div>

        <InterviewTitle title={interviewTitle} onChange={setInterviewTitle} />
        <DomainSelector domains={domains} selectedDomain={selectedDomain} onSelect={setSelectedDomain} />
        {selectedDomain && (
          <TopicsSelector
            domainId={selectedDomain as DomainId}
            selectedTopics={selectedTopics}
            onToggle={handleTopicToggle}
          />
        )}
        <LevelSelector selectedLevel={selectedLevel} onChange={setSelectedLevel} levels={levels} />
        <QuestionsSlider value={numberOfQuestions} onChange={setNumberOfQuestions} />

        <div className="flex justify-center pt-4">
          <Button
            disabled={!isFormValid}
            onClick={handleCreateInterview}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 text-lg font-medium rounded-lg shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PlayCircle className="w-5 h-5 mr-2" />
            Create Interview
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreateInterview
