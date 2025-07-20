import SkillsBreakdown from "@/components/InterviewSummary/SkillsBreakdown";
import CandidateHeader from "./CandidateHeader";
import PerformanceOverview from "@/components/InterviewSummary/PerformanceOverview";
import StrengthsAndImprovements from "@/components/InterviewSummary/StrengthImprovements";
import InterviewTimeline from "@/components/InterviewSummary/InterviewTimeline";
import FinalRecommendation from "@/components/InterviewSummary/FinalRecommendation";


const InterviewSummary = () => {
  const candidateData = {
    name: "John Smith",
    position: "Senior Frontend Developer",
    date: "2025-01-15",
    duration: "45 minutes",
    finalScore: 78,
    overallRating: "Good",
  };

  const skillScores = [
    { skill: "Technical Skills", score: 85 },
    { skill: "Problem Solving", score: 75 },
    { skill: "Communication", score: 70 },
    { skill: "Leadership", score: 65 },
    { skill: "Cultural Fit", score: 80 },
  ];

  const strengths = [
    "Strong technical foundation in React and TypeScript",
    "Excellent problem-solving approach with clear methodology",
    "Good understanding of system design principles",
    "Proactive communication during technical discussions",
  ];

  const improvements = [
    "Could improve confidence in presenting solutions",
    "Needs more experience with advanced testing strategies",
    "Should work on explaining complex concepts more simply",
    "Could benefit from more leadership experience",
  ];

  const performanceData = [
    { category: "Technical", score: 85 },
    { category: "Problem Solving", score: 75 },
    { category: "Communication", score: 70 },
    { category: "Leadership", score: 65 },
    { category: "Cultural Fit", score: 80 },
  ];

  const timelineData = [
    { phase: "Introduction", score: 75, time: "0-5 min" },
    { phase: "Technical Q&A", score: 85, time: "5-20 min" },
    { phase: "Coding Challenge", score: 80, time: "20-35 min" },
    { phase: "Cultural Fit", score: 70, time: "35-45 min" },
  ];

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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <CandidateHeader {...candidateData} getScoreBadge={getScoreBadge} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SkillsBreakdown skillScores={skillScores} getScoreColor={getScoreColor} />
          <PerformanceOverview performanceData={performanceData} />
        </div>
        <StrengthsAndImprovements strengths={strengths} improvements={improvements} />
        <InterviewTimeline timelineData={timelineData} />
        <FinalRecommendation name={candidateData.name} position={candidateData.position} />
      </div>
    </div>
  );
};

export default InterviewSummary;
