import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Badge } from '@/components/ui/badge'
import type { Level } from '@/helpers/InterviewData'
import { cn } from '@/lib/utils'

interface Props {
  selectedLevel: string
  onChange: (levelId: string) => void
  levels: Level[]
}

const LevelSelector: React.FC<Props> = ({ selectedLevel, onChange, levels }) => (
  <Card className={cn('card-elevated', 'shadow-lg border-0')}>
    <CardHeader className="bg-slate-50 border-b border-slate-200">
      <CardTitle className="flex items-center gap-2 text-slate-900">
        <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        Difficulty Level
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <RadioGroup value={selectedLevel} onValueChange={onChange}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {levels.map(level => (
            <button
              key={level.id}
              type="button"
              onClick={() => onChange(level.id)}
              className={cn(
                'p-4 rounded-xl cursor-pointer transition-all duration-200 border-2',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2',
                selectedLevel === level.id
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              )}
            >
              <div className="flex items-start gap-3">
                <RadioGroupItem
                  value={level.id}
                  id={level.id}
                  checked={selectedLevel === level.id}
                  className="pointer-events-none mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={cn(level.color, 'text-sm')}>{level.name}</Badge>
                  </div>
                  <p className="text-sm text-slate-600">{level.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </RadioGroup>
    </CardContent>
  </Card>
)

export default LevelSelector
