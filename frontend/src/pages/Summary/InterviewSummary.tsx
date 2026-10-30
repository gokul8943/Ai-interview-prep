import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader, FileText, Award } from "lucide-react";
import StrengthsAndImprovements from "@/pages/Summary/Components/StrengthImprovements";
import FinalRecommendation from "@/pages/Summary/Components/FinalRecommendation";
import CandidateHeader from "@/pages/Summary/Components/CandiateHeader";
import SkillsBreakdown from "@/pages/Summary/Components/SkillsBreakdown";
import PerformanceOverview from "@/pages/Summary/Components/PerformanceOverview";
import { getSummaryByInterviewId } from "@/services/SummaryApi/SummaryApi";
import { getMe } from "@/services/UserAPi/AuthApi";
import useAuthStore from "@/store/AuthStrore";

interface SummaryData {
  communication: number;
  strengths: string[];
  areasForImprovement: string[];
  finalRecommendation: string;
  createdAt: string;
  technicalDepth?: number;
  structure?: number;
  skillScores?: { skill: string; score: number }[];
  performanceData?: { category: string; score: number }[];
}

interface UserData {
  name: string;
  position: string;
}

const InterviewSummary = () => {
  const { id } = useParams<{ id: string }>();
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const interviewId = id;
  const authState = useAuthStore();
  const userId = authState.authState.user?._id;
  

  // Fetch interview summary
  useEffect(() => {
    const fetchSummary = async () => {
      if (!interviewId) return;
      try {
        setLoading(true);
        const res = await getSummaryByInterviewId(interviewId);
        setSummaryData(res.data?.data?.summary || res.data?.summary);
      } catch (err) {
        console.error("Failed to fetch summary:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [interviewId]);
  

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;
      try {
        const res = await getMe()
        setUser(res.data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, [userId]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center animate-slide-up">
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
            <Loader className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
          <p className="text-slate-600 text-lg">Loading interview summary...</p>
          <p className="text-slate-400 text-sm mt-1">Analyzing your interview performance</p>
        </div>
      </div>
    );
  }

  if (!summaryData || !user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center animate-slide-up">
          <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-amber-600" />
          </div>
          <p className="text-slate-600 text-lg">No summary found</p>
          <p className="text-slate-400 text-sm mt-1">Interview data not available for this session</p>
        </div>
      </div>
    );
  }

  // Candidate data using actual user info
  const candidateData = {
    name: user.name,
    position: user.position || "Position not available",
    date: new Date(summaryData.createdAt).toLocaleDateString(),
    duration: "45 minutes",
    communication: summaryData.communication || 0,
    technicalDepth: summaryData.technicalDepth || 0,
    structure: summaryData.structure || 0,
  };
  
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden py-8 sm:py-12 lg:py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-white" />
        <div className="absolute inset-0 bg-[url('/pattern.png')] bg-top bg-no-repeat opacity-30" />
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        
        <div className="section-container relative">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-4">
              <FileText className="w-4 h-4" />
              INTERVIEW SUMMARY
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-2 text-balance">
              {candidateData.name}'s Interview Report
            </h1>
            
            <p className="text-slate-600 leading-relaxed max-w-xl mx-auto">
              {candidateData.position} • {candidateData.date}
            </p>

            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Communication: {candidateData.communication}%</span>
              </div>
              <div className="w-px h-6 bg-slate-200" />
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-teal-500" />
                <span>Technical: {candidateData.technicalDepth}%</span>
              </div>
              <div className="w-px h-6 bg-slate-200" />
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-500" />
                <span>Structure: {candidateData.structure}%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-4 sm:py-6 lg:py-8">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4 animate-slide-up">
              <CandidateHeader {...candidateData} />
              
              {(summaryData.skillScores && summaryData.skillScores.length > 0) && (
                <SkillsBreakdown 
                  skillScores={summaryData.skillScores} 
                  getScoreColor={(score: number) => 
                    score >= 80 ? 'text-green-600' : score >= 60 ? 'text-amber-600' : 'text-red-600'
                  }
                />
              )}
              
              {(summaryData.performanceData && summaryData.performanceData.length > 0) && (
                <PerformanceOverview performanceData={summaryData.performanceData} />
              )}
              
              <StrengthsAndImprovements
                strengths={summaryData.strengths || []}
                improvements={summaryData.areasForImprovement || []}
              />
              
              <FinalRecommendation
                recommendationText={summaryData.finalRecommendation}
              />
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 text-center">
              <p className="text-sm text-slate-500">
                Generated by AI Interview Prep • {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InterviewSummary;
