import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Briefcase, Calendar } from 'lucide-react';

interface Interview {
  _id: string;
  domain?: string;
  title?: string;
  createdAt?: string;
  status?: string;
  score?: number;
}

interface InterviewsTabProps {
  interviews: Interview[];
}

const InterviewsTab: React.FC<InterviewsTabProps> = ({ interviews }) => {
  if (!interviews || interviews.length === 0) {
    
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-white">Interview History</CardTitle>
          <CardDescription>No interviews found yet.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-white">Interview History</CardTitle>
        <CardDescription>Complete list of your interview attempts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {interviews.map((interview) => (
            <div
              key={interview._id}
              className="flex items-center justify-between p-4 border border-slate-700 rounded-lg hover:border-blue-400 hover:shadow-md transition-all bg-slate-900"
            >
              <div className="flex-1">
                <p className="font-semibold text-slate-100">
                  {interview.title || 'Untitled Interview'}
                </p>
                <div className="flex items-center gap-4 text-sm text-slate-300 mt-1">
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    {interview.domain || 'domain not found'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(interview.createdAt || '').toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-xl font-bold text-white">
                  {/* {interview.score !== undefined ? interview.score : '-'} */}
                </p>
                <div className="flex items-center mt-1">
                  {/* {interview.status === 'passed' ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : interview.status === 'failed' ? (
                    <XCircle className="w-5 h-5 text-red-500" />
                  ) : (
                    <span className="text-xs text-slate-400">Pending</span>
                  )} */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewsTab;
