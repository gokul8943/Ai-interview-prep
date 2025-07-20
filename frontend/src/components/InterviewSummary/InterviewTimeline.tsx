import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface InterviewTimelineProps {
  timelineData: { phase: string; score: number; time: string }[];
}

const InterviewTimeline: React.FC<InterviewTimelineProps> = ({ timelineData }) => (
  <Card>
    <CardHeader>
      <CardTitle>Interview Timeline Performance</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="phase" />
            <YAxis domain={[0, 100]} />
            <Tooltip
              formatter={(value) => [value + "%", "Score"]}
              labelFormatter={(label, payload) => {
                const data = payload?.[0]?.payload;
                return `${label} (${data?.time})`;
              }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ fill: "#3B82F6", strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

export default InterviewTimeline;
