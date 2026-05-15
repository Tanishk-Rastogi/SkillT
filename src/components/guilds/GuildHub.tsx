'use client';

import React from 'react';
import { useGuildStore } from '@/store/guildStore';
import { useAuth } from '@/components/layout/AuthProvider';
import { Shield, Users, Star, Trophy, Activity, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const GuildHub: React.FC = () => {
  const { currentGuild, availableGuilds, joinGuild } = useGuildStore();
  const { user } = useAuth();

  // If no current guild, show the recruitment board
  if (!currentGuild) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-3 mb-6">
          <Shield className="w-6 h-6 text-indigo-400" />
          <h2 className="text-2xl font-bold font-mono text-slate-100">Guild Recruitment</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {availableGuilds.map((guild) => (
            <div key={guild.id} className="bg-slate-900/60 border border-slate-700/50 rounded-xl overflow-hidden shadow-xl flex flex-col group hover:border-indigo-500/50 transition-colors">
              <div className={`h-24 ${guild.banner} relative`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-4 left-4 flex items-end space-x-4">
                  <div className="w-12 h-12 bg-slate-900 rounded-lg border-2 border-white/20 flex items-center justify-center shadow-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white drop-shadow-md">{guild.name}</h3>
                    <p className="text-xs text-white/80 font-mono">Level {guild.level} • {guild.reputation} Rep</p>
                  </div>
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <p className="text-sm text-slate-300 mb-4 line-clamp-2">{guild.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {guild.specialization.map(spec => (
                    <span key={spec} className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300 border border-slate-700">
                      {spec}
                    </span>
                  ))}
                </div>
                
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center text-slate-400 text-sm">
                    <Users className="w-4 h-4 mr-2" />
                    {guild.members.length} Members
                  </div>
                  
                  <button 
                    onClick={() => user && joinGuild(guild.id, user.id, user.username)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-semibold text-sm transition-colors flex items-center"
                  >
                    Apply <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Active Guild View
  return (
    <div className="bg-slate-900/60 border border-slate-700 rounded-xl overflow-hidden shadow-2xl relative">
      {/* Dynamic Aura Background */}
      <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] opacity-20 pointer-events-none ${
        currentGuild.unlockedRewards.includes('aura-neon') ? 'bg-indigo-500' : 'bg-emerald-500'
      }`} />

      <div className={`h-32 ${currentGuild.banner} relative border-b border-white/10`}>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
        <div className="absolute -bottom-10 left-8 flex items-end space-x-6">
          <div className="w-24 h-24 bg-slate-900 rounded-2xl border-4 border-slate-800 flex items-center justify-center shadow-2xl z-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <Shield className="w-12 h-12 text-white" />
          </div>
          <div className="pb-2 z-10">
            <h2 className="text-3xl font-black text-white tracking-tight">{currentGuild.name}</h2>
            <div className="flex items-center space-x-4 text-sm font-mono mt-1 text-slate-300">
              <span className="flex items-center"><Star className="w-4 h-4 mr-1 text-amber-400" /> Lvl {currentGuild.level}</span>
              <span className="flex items-center"><Activity className="w-4 h-4 mr-1 text-indigo-400" /> {currentGuild.reputation} Rep</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-16 p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        
        {/* Left Column: Progress & Info */}
        <div className="space-y-6">
          <div className="bg-slate-800/50 rounded-lg p-5 border border-slate-700">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Guild Progress</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-slate-300 font-mono">
                <span>{currentGuild.xp.toLocaleString()} XP</span>
                <span>{(currentGuild.level * 5000).toLocaleString()} XP</span>
              </div>
              <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-[60%]" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-5 border border-slate-700">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Recent Achievements</h3>
            <div className="space-y-3">
              {currentGuild.achievements.map((ach, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <Trophy className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-slate-300">{ach}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Roster */}
        <div className="lg:col-span-2">
          <div className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden flex flex-col h-full">
            <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-800/80">
              <h3 className="text-sm font-bold text-slate-200 flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Active Roster ({currentGuild.members.length})
              </h3>
              <button className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold">Manage Roles</button>
            </div>
            
            <div className="p-0 overflow-y-auto max-h-64 custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-900/50 text-xs text-slate-500 uppercase font-mono">
                  <tr>
                    <th className="py-3 px-4 font-medium">Member</th>
                    <th className="py-3 px-4 font-medium">Role</th>
                    <th className="py-3 px-4 font-medium text-right">Contribution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50 text-sm">
                  {currentGuild.members.map((member) => (
                    <motion.tr 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      key={member.userId} 
                      className="hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="py-3 px-4 font-semibold text-slate-200">
                        {member.username}
                        {member.userId === user?.id && <span className="ml-2 text-xs bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded">You</span>}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded font-medium border ${
                          member.role === 'Leader' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                          member.role === 'Strategist' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                          'bg-slate-700/50 text-slate-400 border-slate-600/50'
                        }`}>
                          {member.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-emerald-400">
                        {member.contributionXp.toLocaleString()} XP
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
