import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';


interface OverviewTabProps {
  interviews: {
    _id?: string;
    title?: string;
    domain?: string;
    level?: string;
    createdAt?: string;
    finalized?: boolean;
  }[];
}

const OverviewTab: React.FC<OverviewTabProps> = ({ interviews = [] }) => {
  const interviewsArray = Array.isArray(interviews) ? interviews : [];
  const recentInterviews = interviewsArray.slice(0, 3);

  return (
    <div className="grid lg:grid-cols-1 gap-6">
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-slate-900">Recent Interviews</CardTitle>
          <CardDescription className="text-slate-500">
            Your latest interview attempts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentInterviews.length > 0 ? (
            <div className="space-y-4">
              {recentInterviews.map((interview) => (
                <div
                  key={interview._id}
                  className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all bg-white"
                >
                  <div>
                    <p className="font-semibold text-slate-900">
                      {interview.title || 'Untitled Interview'}
                    </p>
                    <p className="text-sm text-slate-600">
                      {interview.domain || 'N/A'} • {interview.level || 'N/A'}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {interview.createdAt
                        ? new Date(interview.createdAt).toLocaleDateString()
                        : 'Unknown date'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {interview.finalized ? (
                      <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                        <CheckCircle className="w-4 h-4" /> Completed
                      </span>
                    ) : (
                      <span className="text-amber-600 text-sm font-medium">In Progress</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-sm">No recent interviews found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;
