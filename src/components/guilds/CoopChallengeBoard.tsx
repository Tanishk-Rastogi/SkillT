'use client';

import React from 'react';
import { useGuildStore } from '@/store/guildStore';
import { Network, Star, ArrowRight } from 'lucide-react';

export const CoopChallengeBoard: React.FC = () => {
  const { coopChallenges, activeParty } = useGuildStore();

  return (
    <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-xl p-6 shadow-xl h-full flex flex-col">
      <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2">
          <Network className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-slate-100">Co-op Challenges</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
        {coopChallenges.map((challenge) => {
          // Check if party meets requirements (simplified check for MVP)
          const meetsRequirements = activeParty && activeParty.members.length >= challenge.rolesRequired.length;

          return (
            <div 
              key={challenge.id} 
              className="bg-slate-800/40 border border-slate-700/50 rounded-lg overflow-hidden group hover:border-emerald-500/30 transition-colors flex flex-col"
            >
              <div className="p-4 flex-1">
                <h3 className="font-bold text-slate-200 mb-1">{challenge.title}</h3>
                <p className="text-xs text-slate-400 mb-4">{challenge.description}</p>
                
                <div className="mb-4">
                  <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Required Composition</div>
                  <div className="flex flex-wrap gap-1">
                    {challenge.rolesRequired.map(role => (
                      <span key={role} className="text-[10px] px-1.5 py-0.5 bg-slate-900 border border-slate-700 rounded text-emerald-300">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-900/50 p-3 flex justify-between items-center border-t border-slate-700/50">
                <div className="flex space-x-3">
                  <div className="flex items-center text-xs text-slate-300 font-mono">
                    <Star className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                    {challenge.xpReward} XP / ea
                  </div>
                  <div className="flex items-center text-xs text-slate-300 font-mono">
                    <ShieldIcon className="w-3.5 h-3.5 mr-1 text-indigo-400" />
                    +{challenge.guildPrestige} Rep
                  </div>
                </div>
                
                <button 
                  disabled={!meetsRequirements}
                  className={`flex items-center text-xs px-3 py-1.5 rounded font-semibold transition-colors ${
                    meetsRequirements 
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white' 
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  }`}
                >
                  {meetsRequirements ? (
                    <>Start Trial <ArrowRight className="w-3 h-3 ml-1" /></>
                  ) : (
                    'Party Required'
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Simple inline SVG for shield
function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  );
}
