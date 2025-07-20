import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface InterviewTimelineProps {
  timelineData: { phase: string; score: number; time: string }[];
}

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

const InterviewTimeline: React.FC<InterviewTimelineProps> = ({ timelineData }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-white">Interview Timeline Performance</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={timelineData}
              dataKey="score"
              nameKey="phase"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#3B82F6"
              label={(entry) => `${entry.phase} (${entry.score}%)`}
            >
              {timelineData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}%`, "Score"]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

export default InterviewTimeline;
