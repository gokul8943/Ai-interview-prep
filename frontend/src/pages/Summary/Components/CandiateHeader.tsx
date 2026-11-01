import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CandidateHeaderProps {
  name: string;
  position: string;
  date: string;
  duration: string;
  communication: number;
  technicalDepth: number;
  structure: number;
}

const CandidateHeader: React.FC<CandidateHeaderProps> = ({
  name,
  position,
  date,
  duration,
  communication,
  technicalDepth,
  structure,
}) => (
  <Card className={cn('card-elevated')}>
    <CardHeader className="bg-slate-50 border-b border-slate-200">
      <CardTitle className="flex items-center gap-2 text-slate-900">
        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        Candidate Overview
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{name}</h1>
          <p className="text-lg text-slate-600">{position}</p>
          <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
            <span>Date: {date}</span>
            <span>Duration: {duration}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center p-4 bg-slate-50 rounded-xl">
            <p className="text-3xl font-bold text-slate-900">{communication}%</p>
            <p className="text-xs text-slate-500">Communication</p>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-xl">
            <p className="text-3xl font-bold text-slate-900">{technicalDepth}%</p>
            <p className="text-xs text-slate-500">Technical Depth</p>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-xl">
            <p className="text-3xl font-bold text-slate-900">{structure}%</p>
            <p className="text-xs text-slate-500">Structure</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricBar label="Communication" value={communication} color="blue" />
        <MetricBar label="Technical Depth" value={technicalDepth} color="teal" />
        <MetricBar label="Structure" value={structure} color="amber" />
      </div>
    </CardContent>
  </Card>
);

function MetricBar({ label, value, color }: { label: string; value: number; color: 'blue' | 'teal' | 'amber' }) {
  const colors = {
    blue: 'bg-blue-500',
    teal: 'bg-teal-500',
    amber: 'bg-amber-500',
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="font-bold text-slate-900">{value}%</span>
      </div>
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <div 
          className={cn('h-full rounded-full transition-all duration-1000', colors[color])} 
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default CandidateHeader;
