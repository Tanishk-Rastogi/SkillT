'use client';

import React from 'react';
import { useAuth } from '@/components/layout/AuthProvider';
import { HeartHandshake, ShieldCheck, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// Dummy data for mentorship requests
const pendingRequests = [
  { id: 'req-1', user: 'NewbieDev', topic: 'React Context API', bounty: 50 },
  { id: 'req-2', user: 'CSS_Struggler', topic: 'Flexbox alignment issues', bounty: 20 },
];

export const MentorshipPanel: React.FC = () => {
  const { user } = useAuth();
  
  const mentorRating = user?.mentorRating || 0;
  const isEligibleMentor = (user?.level || 1) >= 5;

  return (
    <div className="bg-slate-900/50 backdrop-blur-md border border-rose-500/20 rounded-xl p-6 shadow-xl h-full flex flex-col">
      <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2">
          <HeartHandshake className="w-5 h-5 text-rose-400" />
          <h2 className="text-lg font-bold text-slate-100">Mentorship</h2>
        </div>
        
        {isEligibleMentor && (
          <div className="flex items-center space-x-1 bg-rose-500/10 text-rose-300 px-2 py-1 rounded text-xs font-mono font-bold border border-rose-500/20">
            <ShieldCheck className="w-3 h-3 mr-1" />
            Mentor Rating: {mentorRating.toFixed(1)}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
        {isEligibleMentor ? (
          <>
            <p className="text-sm text-slate-400 mb-4">You are eligible to mentor junior developers. Help them to earn Mentor Prestige.</p>
            {pendingRequests.map((req) => (
              <div key={req.id} className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-4 hover:border-rose-500/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    <HelpCircle className="w-4 h-4 text-slate-400" />
                    <h3 className="font-bold text-slate-200">{req.user}</h3>
                  </div>
                  <span className="text-xs text-rose-400 font-mono">+{req.bounty} Rep</span>
                </div>
                <p className="text-xs text-slate-400 mb-4">Needs help with: <span className="text-slate-300 font-medium">{req.topic}</span></p>
                <div className="flex justify-end">
                  <button className="bg-rose-600/20 hover:bg-rose-600/40 border border-rose-500/50 text-rose-300 text-xs px-3 py-1.5 rounded font-semibold transition-colors">
                    Offer Help
                  </button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto bg-slate-800 rounded-full flex items-center justify-center mb-4">
              <ShieldCheck className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-slate-300 font-bold mb-2">Reach Level 5</h3>
            <p className="text-xs text-slate-500 px-4">Level up your profile to unlock Mentorship capabilities and earn the Mentor title.</p>
          </div>
        )}
      </div>
      
      {!isEligibleMentor && (
        <div className="mt-4 pt-4 border-t border-slate-800">
           <button className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-3 py-2 rounded font-semibold transition-colors border border-slate-700">
             Request a Mentor
           </button>
        </div>
      )}
    </div>
  );
};
