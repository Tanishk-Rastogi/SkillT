'use client';

import { useAuth } from '@/components/layout/AuthProvider';
import { PublicProfile } from '@/components/identity/PublicProfile';
import { useParams } from 'next/navigation';

export default function ProfilePage() {
  const { user } = useAuth();
  const params = useParams();
  
  // In a real app, we would fetch the user by username from the DB.
  // For this MVP, if the username matches the logged in user, show them.
  // Otherwise, simulate a loading state or "User not found".
  
  const isCurrentUser = user && user.username.toLowerCase() === (params.username as string).toLowerCase();

  if (!isCurrentUser) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] text-slate-500 font-mono">
        <div className="text-center">
          <div className="text-4xl mb-4">404</div>
          <div>User profile not found in the simulation database.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <PublicProfile user={user} />
    </div>
  );
}
