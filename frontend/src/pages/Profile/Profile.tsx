import { useEffect, useState } from 'react';
import ProfileHeader from './Components/ProfileHeader';
import TabsSection from './Components/TabsSection';
import OverviewTab from './Components/OverviewTab';
import InterviewsTab from './Components/InterviewTab';
import useAuthStore from '@/store/AuthStrore';
import { getUserByInterviews } from '@/services/UserAPi/AuthApi';

interface ProfileUser {
  name: string;
  role?: string;
  createdAt?: string;
  profilePicture?: string;
  email?: string;
}

interface ProfileInterview {
  _id?: string;
  title?: string;
  domain?: string;
  level?: string;
  createdAt?: string;
  finalized?: boolean;
  status?: string;
  score?: number;
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [interviews, setInterviews] = useState<ProfileInterview[]>([]);
  const [loading, setLoading] = useState(true);

  const authState = useAuthStore();
  const user = authState.authState.user;
  const userId = user?._id;

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      try {
        setLoading(true);
        const response = await getUserByInterviews(userId);
        setInterviews(response.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setInterviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-lg text-red-500">User not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileHeader user={user} />
        <TabsSection activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'overview' && <OverviewTab interviews={interviews} />}
        {activeTab === 'interviews' && <InterviewsTab interviews={interviews} />}
      </div>
    </div>
  );
}
