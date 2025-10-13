import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';

interface OverviewTabProps {
  interviews: { id: number; position: string; company: string; date: string; status: string; score: number; }[];
  skills: { name: string; level: number; }[];
}

const OverviewTab: React.FC<OverviewTabProps> = ({ interviews }) => (
  <div className="grid lg:grid-cols-1 gap-6">
    <Card>
      <CardHeader>
        <CardTitle className='text-white'>Recent Interviews</CardTitle>
        <CardDescription>Your latest interview attempts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {interviews.slice(0, 3).map(interview => (
            <div key={interview.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-semibold text-slate-100">{interview.position}</p>
                <p className="text-sm text-slate-100">{interview.company}</p>
                <p className="text-xs text-slate-200 mt-1">{interview.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-white">{interview.score}</span>
                {interview.status === 'passed' ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export default OverviewTab;
