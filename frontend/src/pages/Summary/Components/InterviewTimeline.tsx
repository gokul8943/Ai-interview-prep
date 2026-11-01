import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

interface InterviewTimelineProps {
  timelineData: { phase: string; score: number; time: string }[];
}

const COLORS = ["#2563EB", "#0D9488", "#F59E0B", "#EF4444"];

const InterviewTimeline: React.FC<InterviewTimelineProps> = ({ timelineData }) => (
  <Card className={cn('card-elevated')}>
    <CardHeader className="bg-slate-50 border-b border-slate-200">
      <CardTitle className="flex items-center gap-2 text-slate-900">
        <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        Interview Timeline
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={timelineData}
              dataKey="score"
              nameKey="phase"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              label={({ phase, score }) => `${phase}: ${score}%`}
              labelLine={false}
            >
              {timelineData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value}%`, "Score"]}
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Legend 
              layout="vertical"
              align="right"
              verticalAlign="middle"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ paddingTop: '20px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

export default InterviewTimeline;
