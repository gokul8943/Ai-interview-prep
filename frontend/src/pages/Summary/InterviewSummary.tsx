import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StrengthsAndImprovements from "@/pages/Summary/Components/StrengthImprovements";
import FinalRecommendation from "@/pages/Summary/Components/FinalRecommendation";
import CandidateHeader from "@/pages/Summary/Components/CandiateHeader";
import { getSummaryByInterviewId } from "@/services/SummaryApi/SummaryApi";

interface SummaryData {
  communication: number;
  strengths: string[];
  areasForImprovement: string[];
  finalRecommendation: string;
  createdAt: string;
}

const InterviewSummary = () => {
  const { id } = useParams<{ id: string }>();
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);

  const interviewId = id; 
  
  const candidateData = {
    name: "Candidate",
    position: "Frontend Developer",
    date: new Date().toLocaleDateString(),
    duration: "45 minutes",
    finalScore: summaryData?.communication || 0,
    overallRating:
      summaryData?.communication && summaryData.communication >= 80
        ? "Excellent"
        : summaryData?.communication && summaryData.communication >= 70
          ? "Good"
          : "Needs Improvement",
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  useEffect(() => {
    const fetchSummary = async () => {
      if (!interviewId) return;
      try {
        setLoading(true);
        const res = await getSummaryByInterviewId(interviewId);
        setSummaryData(res.data?.data?.summary || res.data?.summary)
      } catch (err) {
        console.error("Failed to fetch summary:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [interviewId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-blue-500">Loading interview summary...</p>
      </div>
    );
  }

  if (!summaryData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">No summary found for this interview.</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen p-3">
        <h2 className="text-white font-bold shadow-2xl p-2.5">Summary</h2>
        <div className="max-w-7xl mx-auto space-y-6">
          <CandidateHeader {...candidateData} getScoreBadge={getScoreBadge} />

          <StrengthsAndImprovements
            strengths={summaryData.strengths || []}
            improvements={summaryData.areasForImprovement || []}
          />

          <FinalRecommendation
            recommendationText={summaryData.finalRecommendation}
          />
        </div>
      </div>
    </>
  );
};

export default InterviewSummary;
