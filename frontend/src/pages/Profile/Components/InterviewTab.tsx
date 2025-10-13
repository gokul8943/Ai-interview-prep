import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Briefcase, Calendar } from 'lucide-react';

interface InterviewsTabProps {
  interviews: { id: number; position: string; company: string; date: string; status: string; score: number }[];
}

const InterviewsTab: React.FC<InterviewsTabProps> = ({ interviews }) => (
  <Card>
    <CardHeader>
      <CardTitle className='text-white'>Interview History</CardTitle>
      <CardDescription>Complete list of your interview attempts</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {interviews.map(interview => (
          <div key={interview.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <p className="font-semibold text-slate-50">{interview.position}</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-100">
                <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" />{interview.company}</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{interview.date}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{interview.score}</p>
              <p className="text-xs text-slate-100">Score</p>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default InterviewsTab;
