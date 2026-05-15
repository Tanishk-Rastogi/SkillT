'use client';

import React, { useState } from 'react';
import { useGuildStore } from '@/store/guildStore';
import { useAuth } from '@/components/layout/AuthProvider';
import { Users, Search, Plus, Crosshair } from 'lucide-react';
import { motion } from 'framer-motion';

export const PartyFinder: React.FC = () => {
  const { availableParties, activeParty, joinParty, leaveParty } = useGuildStore();
  const { user } = useAuth();
  const [roleToFill, setRoleToFill] = useState('');

  if (activeParty) {
    return (
      <div className="bg-slate-900/80 backdrop-blur-md border border-indigo-500/30 rounded-xl p-6 shadow-[0_0_20px_rgba(99,102,241,0.1)] relative">
        <div className="absolute top-0 right-0 p-4">
          <button 
            onClick={leaveParty}
            className="text-xs text-red-400 hover:text-red-300 border border-red-500/30 bg-red-500/10 px-3 py-1 rounded"
          >
            Leave Party
          </button>
        </div>
        
        <div className="flex items-center space-x-3 mb-6">
          <Users className="w-6 h-6 text-indigo-400" />
          <div>
            <h2 className="text-xl font-bold text-white">{activeParty.name}</h2>
            <p className="text-sm text-indigo-300">Active Party</p>
          </div>
        </div>

        <div className="bg-slate-800/50 p-4 rounded-lg mb-6 border border-slate-700">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center mb-2">
            <Crosshair className="w-4 h-4 mr-2 text-rose-400" />
            Current Objective
          </h3>
          <p className="text-sm text-slate-200">{activeParty.objective}</p>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Party Roster</h3>
          <div className="space-y-2">
            {activeParty.members.map((member, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-slate-800 rounded border border-slate-700">
                <span className="font-semibold text-slate-200 flex items-center">
                  {member.username} 
                  {member.userId === activeParty.leaderId && <span className="ml-2 text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/30">LEADER</span>}
                  {member.userId === user?.id && <span className="ml-2 text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded">YOU</span>}
                </span>
                <span className="text-xs font-mono text-emerald-400 uppercase bg-emerald-900/30 px-2 py-1 rounded">{member.roleFilled}</span>
              </div>
            ))}
            {activeParty.lookingFor.map((role, i) => (
              <div key={`empty-${i}`} className="flex justify-between items-center p-3 bg-slate-900/50 border border-dashed border-slate-600 rounded">
                <span className="text-slate-500 italic text-sm">Empty Slot</span>
                <span className="text-xs font-mono text-slate-400 uppercase">Looking for: {role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-xl p-6 shadow-xl h-full flex flex-col">
      <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2">
          <Search className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-bold text-slate-100">Party Finder</h2>
        </div>
        <button className="flex items-center space-x-1 text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded transition-colors font-semibold">
          <Plus className="w-3 h-3" />
          <span>Create Party</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
        {availableParties.map((party) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={party.id} 
            className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-4 hover:border-cyan-500/30 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-slate-200">{party.name}</h3>
              <span className="text-xs text-slate-400 font-mono">{party.members.length} / {party.members.length + party.lookingFor.length} Players</span>
            </div>
            
            <p className="text-xs text-slate-400 mb-4 line-clamp-2">{party.objective}</p>
            
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Needed Roles</div>
                <div className="flex flex-wrap gap-1">
                  {party.lookingFor.map(role => (
                    <span key={role} className="text-[10px] px-1.5 py-0.5 bg-slate-900 border border-slate-700 rounded text-cyan-300 uppercase">
                      {role}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <select 
                  className="bg-slate-900 border border-slate-700 text-xs text-slate-300 rounded px-2 py-1 focus:outline-none focus:border-cyan-500"
                  onChange={(e) => setRoleToFill(e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled>Select Role...</option>
                  {party.lookingFor.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
                <button 
                  onClick={() => {
                    if (roleToFill && user) joinParty(party.id, user.id, user.username, roleToFill);
                  }}
                  disabled={!roleToFill}
                  className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs px-3 py-1 rounded font-semibold transition-colors"
                >
                  Join
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {availableParties.length === 0 && (
          <div className="text-center py-10 text-slate-500 text-sm">
            No active parties looking for members.
          </div>
        )}
      </div>
    </div>
  );
};
