import React from "react";
import { Badge } from "@/components/ui/badge";

interface CandidateHeaderProps {
  name: string;
  position: string;
  date: string;
  duration: string;
  finalScore: number;
  overallRating: string;
  getScoreBadge: (score: number) => string;
}

const CandidateHeader: React.FC<CandidateHeaderProps> = ({
  name,
  position,
  date,
  duration,
  finalScore,
  overallRating,
  getScoreBadge,
}) => (
  <div className="bg-white/15 rounded-lg shadow-sm border p-6">
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-3xl font-bold text-white">{name}</h1>
        <p className="text-lg text-white">{position}</p>
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
          <span>Date: {date}</span>
          <span>Duration: {duration}</span>
        </div>
      </div>
      <div className="text-right">
        <div className="flex items-center gap-2">
          <span className="text-4xl font-bold text-blue-600">{finalScore}</span>
          <span className="text-gray-500">/100</span>
        </div>
        <Badge className={getScoreBadge(finalScore)}>
          {overallRating}
        </Badge>
      </div>
    </div>
  </div>
);

export default CandidateHeader;
