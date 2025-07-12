import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Settings } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { topicsByDomain, type DomainId } from '@/helpers/InterviewData'

interface Props {
  domainId: DomainId
  selectedTopics: string[]
  onToggle: (topic: string) => void
}

const TopicsSelector: React.FC<Props> = ({ domainId, selectedTopics, onToggle }) => (
  <Card className="shadow-lg border-0">
    <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
      <CardTitle className="flex items-center gap-2">
        <Settings className="w-5 h-5" />
        Select Topics
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {topicsByDomain[domainId].map(topic => (
            <div
              key={topic}
              onClick={() => onToggle(topic)}
              className={`px-4 py-2 rounded-full cursor-pointer transition-all duration-200 ${
                selectedTopics.includes(topic)
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {topic}
            </div>
          ))}
        </div>
        {selectedTopics.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Selected Topics:</p>
            <div className="flex flex-wrap gap-2">
              {selectedTopics.map(topic => (
                <Badge key={topic} variant="secondary" className="bg-blue-100 text-blue-800">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
)

export default TopicsSelector
