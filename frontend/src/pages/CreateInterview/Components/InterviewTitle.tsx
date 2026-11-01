import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  title: string
  onChange: (value: string) => void
}

const InterviewTitle: React.FC<Props> = ({ title, onChange }) => (
  <Card className={cn('card-elevated', 'shadow-lg border-0')}>
    <CardHeader className="bg-slate-50 border-b border-slate-200">
      <CardTitle className="flex items-center gap-2 text-slate-900">
        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <BookOpen className="w-5 h-5" />
        </div>
        Interview Details
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <Label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">Interview Title</Label>
      <Input
        id="title"
        placeholder="e.g., Senior React Developer Interview"
        value={title}
        onChange={(e) => onChange(e.target.value)}
        className="text-lg"
      />
    </CardContent>
  </Card>
)

export default InterviewTitle
