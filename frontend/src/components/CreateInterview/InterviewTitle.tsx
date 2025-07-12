import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BookOpen } from 'lucide-react'

interface Props {
  title: string
  onChange: (value: string) => void
}

const InterviewTitle: React.FC<Props> = ({ title, onChange }) => (
  <Card className="shadow-lg border-0">
    <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <CardTitle className="flex items-center gap-2">
        <BookOpen className="w-5 h-5" />
        Interview Details
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <Label htmlFor="title" className="text-sm font-medium">Interview Title</Label>
      <Input
        id="title"
        placeholder="e.g., Senior React Developer Interview"
        value={title}
        onChange={(e) => onChange(e.target.value)}
        className="text-lg mt-2"
      />
    </CardContent>
  </Card>
)

export default InterviewTitle
