import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  value: number[]
  onChange: (value: number[]) => void
}

const QuestionsSlider: React.FC<Props> = ({ value, onChange }) => (
  <Card className={cn('card-elevated', 'shadow-lg border-0')}>
    <CardHeader className="bg-slate-50 border-b border-slate-200">
      <CardTitle className="flex items-center gap-2 text-slate-900">
        <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
          <HelpCircle className="w-5 h-5" />
        </div>
        Number of Questions
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-slate-700">Questions: {value[0]}</Label>
          <span className="text-sm text-slate-500">
            Estimated time: ~{Math.ceil(value[0] * 2.5)} minutes
          </span>
        </div>
        <Slider
          value={value}
          onValueChange={onChange}
          max={20}
          min={5}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-slate-400">
          <span>5</span>
          <span>10</span>
          <span>15</span>
          <span>20</span>
        </div>
      </div>
    </CardContent>
  </Card>
)

export default QuestionsSlider
