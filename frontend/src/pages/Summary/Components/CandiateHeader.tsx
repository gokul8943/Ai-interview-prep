import React from "react";

interface CandidateHeaderProps {
  name: string;
  position: string;
  date: string;
  duration: string;
}

const CandidateHeader: React.FC<CandidateHeaderProps> = ({
  name,
  position,
  date,

}) => (
  <div className="bg-white/15 rounded-lg shadow-sm border p-6">
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-3xl font-bold text-white">{name}</h1>
        <p className="text-lg text-white">{position}</p>
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
          <span>Date: {date}</span>
        </div>
      </div>
      <div className="text-right">
        {/* <div className="flex items-center gap-2">
          <span className="text-4xl font-bold text-blue-600">{finalScore}</span>
          <span className="text-gray-500">/100</span>
        </div> */}
      </div>
    </div>
  </div>
);

export default CandidateHeader;
