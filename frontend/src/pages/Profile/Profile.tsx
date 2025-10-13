import { useState } from 'react';
import ProfileHeader from './Components/ProfileHeader';
import TabsSection from './Components/TabsSection';
import OverviewTab from './Components/OverviewTab';
import InterviewsTab from './Components/InterviewTab';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');

  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    role: 'Software Engineer',
    joinDate: 'January 2024',
    avatar: 'AJ',
    totalInterviews: 12,
    passRate: 75,
    averageScore: 82,
  };

  const interviews = [
    { id: 1, position: 'Senior Frontend Developer', company: 'TechCorp', date: '2024-03-15', status: 'passed', score: 88 },
    { id: 2, position: 'Full Stack Engineer', company: 'StartupXYZ', date: '2024-03-10', status: 'passed', score: 85 },
    { id: 3, position: 'React Developer', company: 'WebSolutions', date: '2024-03-05', status: 'failed', score: 68 },
    { id: 4, position: 'Software Engineer', company: 'CloudBase', date: '2024-02-28', status: 'passed', score: 90 },
  ];

  const skills = [
    { name: 'JavaScript', level: 90, interviews: 8 },
    { name: 'React', level: 85, interviews: 7 },
    { name: 'Node.js', level: 78, interviews: 5 },
    { name: 'Python', level: 72, interviews: 4 },
    { name: 'System Design', level: 80, interviews: 6 },
  ];


  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileHeader user={user} />
        <TabsSection activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'overview' && <OverviewTab interviews={interviews} skills={skills} />}
        {activeTab === 'interviews' && <InterviewsTab interviews={interviews} />}
      </div>
    </div>
  );
}
