import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Badge } from '@/components/ui/badge'
import type { Level } from '@/helpers/InterviewData'

interface Props {
  selectedLevel: string
  onChange: (levelId: string) => void
  levels: Level[]
}

const LevelSelector: React.FC<Props> = ({ selectedLevel, onChange, levels }) => (
  <Card className="shadow-lg border-0">
    <CardHeader className="bg-gradient-to-r text-white">
      <CardTitle>Difficulty Level</CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <RadioGroup value={selectedLevel} onValueChange={onChange}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {levels.map(level => (
            <div
              key={level.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                selectedLevel === level.id
                  ? 'border-blue-500 bg-slate-600'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3 md:space-x-1">
                <RadioGroupItem value={level.id} id={level.id} />
                <div className="flex-1 pl-2">
                  <div className="flex items-center gap-2 mb-1 ">
                    <Badge className={level.color}>{level.name}</Badge>
                  </div>
                  <p className="text-sm text-gray-200">{level.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </RadioGroup>
    </CardContent>
  </Card>
)

export default LevelSelector
