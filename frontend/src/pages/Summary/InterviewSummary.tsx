import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StrengthsAndImprovements from "@/pages/Summary/Components/StrengthImprovements";
import FinalRecommendation from "@/pages/Summary/Components/FinalRecommendation";
import CandidateHeader from "@/pages/Summary/Components/CandiateHeader";
import { getSummaryByInterviewId } from "@/services/SummaryApi/SummaryApi";
import {  getUserById } from "@/services/UserAPi/AuthApi";
import useAuthStore from "@/store/AuthStrore";

interface SummaryData {
  communication: number;
  strengths: string[];
  areasForImprovement: string[];
  finalRecommendation: string;
  createdAt: string;
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
        setLoading(true);
        const res = await getUserById(userId) 
        setUser(res.data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);
;
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-blue-500">Loading interview summary...</p>
      </div>
    );
  }

  if (!summaryData || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">No summary or user data found for this interview.</p>
      </div>
    );
  }

  // Candidate data using actual user info
  const candidateData = {
    name: user.name,
    position: user.position || "Position not available",
    date: new Date(summaryData.createdAt).toLocaleDateString(),
    duration: "45 minutes", // you can replace with actual duration if availabl
  };

  console.log(candidateData);
  
  return (
    <div className="min-h-screen p-3">
      <h2 className="text-white font-bold shadow-2xl p-2.5">Summary</h2>
      <div className="max-w-7xl mx-auto space-y-6">
        <CandidateHeader {...candidateData} />

        <StrengthsAndImprovements
          strengths={summaryData.strengths || []}
          improvements={summaryData.areasForImprovement || []}
        />

        <FinalRecommendation
          recommendationText={summaryData.finalRecommendation}
        />
      </div>
    </div>
  );
};

export default InterviewSummary;
