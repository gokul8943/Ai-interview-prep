import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Settings, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { topicsByDomain, type DomainId } from '@/helpers/InterviewData'
import { cn } from '@/lib/utils'

interface Props {
  domainId: DomainId
  selectedTopics: string[]
  onToggle: (topic: string) => void
}

const TopicsSelector: React.FC<Props> = ({ domainId, selectedTopics, onToggle }) => (
  <Card className={cn('card-elevated', 'shadow-lg border-0')}>
    <CardHeader className="bg-slate-50 border-b border-slate-200">
      <CardTitle className="flex items-center gap-2 text-slate-900">
        <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
          <Settings className="w-5 h-5" />
        </div>
        Select Topics
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-3">
          {topicsByDomain[domainId].map(topic => (
            <button
              key={topic}
              type="button"
              onClick={() => onToggle(topic)}
              className={cn(
                'px-4 py-2.5 rounded-full cursor-pointer transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2',
                selectedTopics.includes(topic)
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              )}
            >
              {topic}
            </button>
          ))}
        </div>
        {selectedTopics.length > 0 && (
          <div className="pt-4 border-t border-slate-200">
            <p className="text-sm text-slate-600 mb-3">Selected Topics ({selectedTopics.length}):</p>
            <div className="flex flex-wrap gap-2">
              {selectedTopics.map(topic => (
                <Badge
                  key={topic}
                  variant="secondary"
                  className={cn(
                    'bg-blue-50 text-blue-700 border-blue-200 gap-1.5 px-3 py-1.5',
                    'hover:bg-blue-100 transition-colors'
                  )}
                >
                  {topic}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      onToggle(topic)
                    }}
                    className="w-4 h-4 rounded flex items-center justify-center hover:bg-blue-200 transition-colors"
                    aria-label={`Remove ${topic}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
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
