import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';


interface OverviewTabProps {
  interviews: {
    _id?: string;
    title?: string;
    domain?: string;
    level?: string;
    createdAt?: string;
    finalized?: boolean;
  }[];
  skills?: { name: string; level: number }[];
}

const OverviewTab: React.FC<OverviewTabProps> = ({ interviews = []}) => {
  const recentInterviews = interviews.slice(0, 3);

  return (
    <div className="grid lg:grid-cols-1 gap-6">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Interviews</CardTitle>
          <CardDescription className="text-slate-300">
            Your latest interview attempts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentInterviews.length > 0 ? (
            <div className="space-y-4">
              {recentInterviews.map((interview) => (
                <div
                  key={interview._id}
                  className="flex items-center justify-between p-4 border border-slate-700 rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-slate-100">
                      {interview.title || 'Untitled Interview'}
                    </p>
                    <p className="text-sm text-slate-300">
                      {interview.domain || 'N/A'} • {interview.level || 'N/A'}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {interview.createdAt
                        ? new Date(interview.createdAt).toLocaleDateString()
                        : 'Unknown date'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* {interview.finalized ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )} */}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-sm">No recent interviews found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;
