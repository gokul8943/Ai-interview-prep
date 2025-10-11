import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SkillsBreakdown from "@/pages/Summary/Components/SkillsBreakdown";
import PerformanceOverview from "@/pages/Summary/Components/PerformanceOverview";
import StrengthsAndImprovements from "@/pages/Summary/Components/StrengthImprovements";
import InterviewTimeline from "@/pages/Summary/Components/InterviewTimeline";
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

  const candidateData = {
    name: "Candidate",
    position: "Frontend Developer",
    date: new Date().toLocaleDateString(),
    duration: "45 minutes",
    finalScore: summaryData?.communication || 0,
    overallRating:
      summaryData?.communication && summaryData.communication >= 80
        ? "Excellent"
        : summaryData?.communication >= 70
        ? "Good"
        : "Needs Improvement",
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  useEffect(() => {
    const fetchSummary = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const res = await getSummaryByInterviewId(id);
        console.log('res',res);
        
        setSummaryData(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch summary:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [id]);

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
    <div className="min-h-screen p-3">
      <h2 className="text-white font-bold shadow-2xl p-2.5">Summary</h2>
      <div className="max-w-7xl mx-auto space-y-6">
        <CandidateHeader {...candidateData} getScoreBadge={getScoreBadge} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SkillsBreakdown
            skillScores={[
              { skill: "Communication", score: summaryData.communication },
              { skill: "Technical Skills", score: 80 },
              { skill: "Problem Solving", score: 75 },
              { skill: "Confidence", score: 70 },
            ]}
            getScoreColor={getScoreColor}
          />
          <PerformanceOverview
            performanceData={[
              { category: "Technical", score: 80 },
              { category: "Problem Solving", score: 75 },
              { category: "Communication", score: summaryData.communication },
              { category: "Confidence", score: 70 },
            ]}
          />
        </div>

        <StrengthsAndImprovements
          strengths={summaryData.strengths || []}
          improvements={summaryData.areasForImprovement || []}
        />

        <InterviewTimeline
          timelineData={[
            { phase: "Introduction", score: 75, time: "0–5 min" },
            { phase: "Q&A Session", score: 80, time: "5–25 min" },
            { phase: "Wrap-up", score: 70, time: "25–45 min" },
          ]}
        />

        <FinalRecommendation
          name={candidateData.name}
          position={candidateData.position}
          recommendationText={summaryData.finalRecommendation}
        />
      </div>
    </div>
  );
};

export default InterviewSummary;
