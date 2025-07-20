import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

interface PerformanceOverviewProps {
  performanceData: { category: string; score: number }[];
}

const PerformanceOverview: React.FC<PerformanceOverviewProps> = ({ performanceData }) => (
  <Card>
    <CardHeader>
      <CardTitle>Performance Overview</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={performanceData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" tick={{ fontSize: 10 }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
            <Radar
              name="Score"
              dataKey="score"
              stroke="#3B82F6"
              fill="#3B82F6"
              fillOpacity={0.3}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

export default PerformanceOverview;
