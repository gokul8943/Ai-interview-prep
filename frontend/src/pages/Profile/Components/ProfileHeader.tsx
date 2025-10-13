import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ProfileHeaderProps {
  user: {
    name: string;
    role: string;
    joinDate: string;
    avatar: string;
  };
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => (
  <Card className="mb-8 overflow-hidden">
    <div className="h-32 bg-gradient-to-r from-slate-400 to-blue-400" />
    <CardContent className="relative pt-0 pb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-16 sm:-mt-12">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white flex items-center justify-center text-3xl sm:text-4xl font-bold text-blue-600 border-4 border-white shadow-lg">
          {user.avatar}
        </div>
        <div className="flex-1 sm:mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">{user.name}</h2>
              <p className="text-slate-300">{user.role}</p>
              <p className="text-sm text-slate-300">Member since {user.joinDate}</p>
            </div>
            {/* <button className="flex items-center gap-2 px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Edit2 className="w-4 h-4" /> Edit Profile
            </button> */}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default ProfileHeader;
