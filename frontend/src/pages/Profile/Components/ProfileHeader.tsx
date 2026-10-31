import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ProfileHeaderProps {
  user: {
    name: string;
    role?: string;
    createdAt?: string;
    profilePicture?: string;
    email?: string;
  };
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => (
  <Card className="mb-8 overflow-hidden bg-white border-slate-200 shadow-sm">
    <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600" />
    <CardContent className="relative pt-0 pb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-16 sm:-mt-12">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white flex items-center justify-center text-3xl sm:text-4xl font-bold text-blue-600 border-4 border-white shadow-lg">
          {user.profilePicture ? (
            <img src={user.profilePicture} alt="Profile" className="w-full h-full rounded-full object-cover" />
          ) : (
            <span>{user.name?.charAt(0).toUpperCase() || 'U'}</span>
          )}
        </div>
        <div className="flex-1 sm:mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">{user.name}</h2>
              <p className="text-slate-600">{user.role || 'Software Engineer'}</p>
              <p className="text-sm text-slate-500 mt-1">
                Member since: {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                  : 'Unknown date'}
              </p>
              {user.email && (
                <p className="text-sm text-slate-500 mt-1">{user.email}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default ProfileHeader;
