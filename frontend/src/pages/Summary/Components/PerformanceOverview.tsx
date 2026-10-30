import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

interface PerformanceOverviewProps {
  performanceData: { category: string; score: number }[];
}

const PerformanceOverview: React.FC<PerformanceOverviewProps> = ({ performanceData }) => (
  <Card className={cn('card-elevated')}>
    <CardHeader className="bg-slate-50 border-b border-slate-200">
      <CardTitle className="flex items-center gap-2 text-slate-900">
        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        Performance Overview
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={performanceData}>
            <PolarGrid 
              gridType="polygon" 
              radialLines={true}
              stroke="#E2E8F0"
              strokeDasharray="4 4"
            />
            <PolarAngleAxis 
              dataKey="category" 
              tick={{ fontSize: 11, fill: '#64748B', fontWeight: 500 }}
              fontSize={11}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]} 
              tick={false}
              axisLine={false}
            />
            <Radar
              name="Score"
              dataKey="score"
              stroke="#2563EB"
              fill="#2563EB"
              fillOpacity={0.15}
              strokeWidth={2}
              dot={{ r: 4, fill: '#2563EB', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#2563EB', strokeWidth: 2 }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

export default PerformanceOverview;
