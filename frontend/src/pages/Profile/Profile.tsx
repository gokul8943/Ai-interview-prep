import { useEffect, useState } from 'react';
import ProfileHeader from './Components/ProfileHeader';
import TabsSection from './Components/TabsSection';
import OverviewTab from './Components/OverviewTab';
import InterviewsTab from './Components/InterviewTab';
import useAuthStore from '@/store/AuthStrore';
import { getUserByInterviews } from '@/services/UserAPi/AuthApi';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');
 const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const authState = useAuthStore();
  const userId = authState.authState.user?._id;

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      try {
        setLoading(true);
        const response = await getUserByInterviews(userId);
        setData(response.data.interviews);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-red-500">No data found.</p>
      </div>
    );
  }

  const { user, interview:interviews } = data;

console.log('data',data);


  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileHeader user={user} />
        <TabsSection activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'overview' && <OverviewTab interviews={interviews}  />}
        {activeTab === 'interviews' && <InterviewsTab interviews={interviews} />}
      </div>
    </div>
  );
}
