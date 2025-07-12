import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

interface Props {
  value: number[]
  onChange: (value: number[]) => void
}

const QuestionsSlider: React.FC<Props> = ({ value, onChange }) => (
  <Card className="shadow-lg border-0">
    <CardHeader className="bg-gradient-to-r text-white">
      <CardTitle>Number of Questions</CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-white">Questions: {value[0]}</Label>
          <span className="text-sm text-gray-400">
            Estimated time: {Math.ceil(value[0] * 2.5)} minutes
          </span>
        </div>
        <Slider value={value} onValueChange={onChange} max={50} min={5} step={5} className="w-full" />
        <div className="flex justify-between text-xs text-gray-400">
          <span>5</span>
          <span>25</span>
          <span>50</span>
        </div>
      </div>
    </CardContent>
  </Card>
)

export default QuestionsSlider
