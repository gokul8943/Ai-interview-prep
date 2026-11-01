import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Briefcase, Calendar, CheckCircle, Clock } from 'lucide-react';

interface Interview {
  _id?: string;
  domain?: string;
  title?: string;
  createdAt?: string;
  status?: string;
  score?: number;
  finalized?: boolean;
  level?: string;
}

interface InterviewsTabProps {
  interviews: Interview[];
}

const InterviewsTab: React.FC<InterviewsTabProps> = ({ interviews }) => {
  const interviewsArray = Array.isArray(interviews) ? interviews : [];
  
  if (interviewsArray.length === 0) {
    return (
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-slate-900">Interview History</CardTitle>
          <CardDescription className="text-slate-500">No interviews found yet. Create your first interview!</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const getStatusBadge = (interview: Interview) => {
    if (interview.finalized) {
      return (
        <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
          <CheckCircle className="w-4 h-4" /> Completed
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 text-amber-600 text-sm font-medium">
        <Clock className="w-4 h-4" /> In Progress
      </span>
    );
  };

  return (
    <Card className="bg-white border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-slate-900">Interview History</CardTitle>
        <CardDescription className="text-slate-500">Complete list of your interview attempts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {interviewsArray.map((interview, index) => (
            <div
              key={interview._id ?? `${interview.title ?? 'interview'}-${index}`}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all bg-white"
            >
              <div className="flex-1 mb-3 sm:mb-0">
                <p className="font-semibold text-slate-900">
                  {interview.title || 'Untitled Interview'}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mt-1">
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    {interview.domain || 'N/A'}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                      {interview.level || 'N/A'}
                    </span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {interview.createdAt ? new Date(interview.createdAt).toLocaleDateString() : 'Unknown date'}
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:items-end gap-2">
                <div className="w-full sm:w-auto">
                  {getStatusBadge(interview)}
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
