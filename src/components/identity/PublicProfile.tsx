'use client';

import React from 'react';
import { UserState } from '@/components/layout/AuthProvider';
import { SkillRadarChart } from './SkillRadarChart';
import { ProgressionTimeline } from './ProgressionTimeline';
import { VerificationBadge } from './VerificationBadge';
import { Shield, Zap, Target, GitCommit, Users, Flame, ExternalLink } from 'lucide-react';

interface PublicProfileProps {
  user: UserState;
}

export const PublicProfile: React.FC<PublicProfileProps> = ({ user }) => {
  // Compute Behavioral Metrics (Simulated from user data)
  const behavioralData = [
    { axis: 'Consistency', value: Math.min(100, user.streakDays * 5 + 40) },
    { axis: 'Execution', value: Math.min(100, user.completedChallenges.length * 10 + 30) },
    { axis: 'Collaboration', value: user.guildId ? 85 : 40 },
    { axis: 'Leadership', value: Math.min(100, user.mentorRating * 20 + 20) },
    { axis: 'Problem Solving', value: Math.min(100, user.level * 8 + 30) },
  ];

  // Map verifiable skills (In a real app, this joins user.verifications with user.skills)
  // For UI MVP, we'll generate a few mock verifications based on completed skills
  const completedSkills = user.skills.filter(s => s.status === 'Completed');
  const mockVerifications = completedSkills.map((s, i) => ({
    skillId: s.id,
    skillName: s.title,
    level: (i % 4) + 1 as 1 | 2 | 3 | 4,
    evidenceType: i % 2 === 0 ? 'challenge' : 'repository'
  })).sort((a, b) => b.level - a.level); // Highest level first

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header Profile */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between relative z-10">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-2xl border-2 border-cyan-500/50 bg-slate-900 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              <span className="text-4xl">🤖</span>
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-4xl font-black text-white tracking-tight">{user.username}</h1>
                {user.activeTitle && (
                  <span className="bg-purple-500/20 border border-purple-500/30 text-purple-300 px-2 py-1 rounded text-xs font-mono font-bold uppercase">
                    {user.activeTitle.name}
                  </span>
                )}
              </div>
              <p className="text-slate-400 font-mono mt-1">Level {user.level} {user.activeClass?.name || 'Builder'} • {user.dominantDomain}</p>
            </div>
          </div>
          
          <div className="mt-6 md:mt-0 flex flex-wrap gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700">
            <div className="text-center px-4 border-r border-slate-700">
              <div className="text-2xl font-black text-white font-mono">{user.xp.toLocaleString()}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">Total XP</div>
            </div>
            <div className="text-center px-4 border-r border-slate-700">
              <div className="text-2xl font-black text-emerald-400 font-mono flex items-center justify-center">
                <Flame className="w-5 h-5 mr-1" /> {user.streakDays}
              </div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">Day Streak</div>
            </div>
            <div className="text-center px-4">
              <div className="text-2xl font-black text-cyan-400 font-mono">{completedSkills.length}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">Skills Verified</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Metrics & Graph */}
        <div className="space-y-8">
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center">
              <Target className="w-4 h-4 mr-2 text-cyan-400" /> Behavioral Metrics
            </h3>
            <SkillRadarChart data={behavioralData} size={280} />
          </div>

          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center">
              <Shield className="w-4 h-4 mr-2 text-purple-400" /> Connected Platforms
            </h3>
            {user.connectedPlatforms.length > 0 ? (
              <div className="space-y-3">
                {user.connectedPlatforms.map(p => (
                  <div key={p.platformId} className="flex items-center justify-between p-3 bg-slate-800/50 rounded border border-slate-700">
                    <span className="font-semibold text-slate-300 capitalize flex items-center">
                      <GitCommit className="w-4 h-4 mr-2 text-slate-400" /> {p.platformId}
                    </span>
                    <a href={p.profileUrl} target="_blank" rel="noreferrer" className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center">
                      {p.username} <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 italic">No external platforms connected.</p>
            )}
          </div>
        </div>

        {/* Middle/Right Column: Verifications & Timeline */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Proof of Skill */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center">
              <Zap className="w-4 h-4 mr-2 text-amber-400" /> Proof of Skill
            </h3>
            <p className="text-xs text-slate-500 mb-6">Verified capabilities derived from completed content, challenges, and peer endorsements.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mockVerifications.map((mv, i) => (
                <VerificationBadge 
                  key={i} 
                  level={mv.level} 
                  skillName={mv.skillName} 
                  evidenceType={mv.evidenceType} 
                />
              ))}
              {mockVerifications.length === 0 && (
                <p className="text-sm text-slate-500 italic col-span-2">No skills verified yet.</p>
              )}
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center">
              <Users className="w-4 h-4 mr-2 text-emerald-400" /> Evolution Timeline
            </h3>
            <div className="max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
              <ProgressionTimeline events={user.feedEvents} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
