'use client';

import React from 'react';
import { useEventStore } from '@/store/eventStore';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Zap, Award } from 'lucide-react';

export const SeasonProgressionPanel: React.FC = () => {
  const { activeSeason } = useEventStore();
  
  // Dummy user XP state (could also come from an xpStore)
  const currentXP = 3200; 

  if (!activeSeason) return null;

  const currentLevelIndex = activeSeason.progressionTrack.levels.findIndex(l => currentXP < l.xpRequired);
  const currentLevel = currentLevelIndex === -1 ? activeSeason.progressionTrack.levels.length : currentLevelIndex;
  
  const nextLevelDef = activeSeason.progressionTrack.levels[currentLevel];
  const prevLevelDef = activeSeason.progressionTrack.levels[currentLevel - 1];
  
  const xpBase = prevLevelDef ? prevLevelDef.xpRequired : 0;
  const xpTarget = nextLevelDef ? nextLevelDef.xpRequired : currentXP;
  
  const progressPercent = nextLevelDef 
    ? ((currentXP - xpBase) / (xpTarget - xpBase)) * 100 
    : 100;

  return (
    <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700/50 rounded-xl p-6 shadow-xl relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -z-10 pointer-events-none" />
      
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 mb-1">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Active Season</span>
          </div>
          <h2 className="text-2xl font-black text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
            {activeSeason.title}
          </h2>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-slate-400 font-mono">SEASON LEVEL</span>
          <span className="text-3xl font-black text-white">{currentLevel}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between text-sm text-slate-300 font-mono">
          <span>{currentXP} XP</span>
          <span>{nextLevelDef ? `${xpTarget} XP` : 'MAX'}</span>
        </div>
        
        {/* Progress Bar */}
        <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden relative">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
          />
        </div>

        {/* Rewards Preview */}
        {nextLevelDef && (
          <div className="mt-6 pt-6 border-t border-slate-700/50">
            <h3 className="text-sm text-slate-400 mb-3 flex items-center">
              <Zap className="w-4 h-4 mr-2 text-amber-400" /> 
              Next Unlock
            </h3>
            <div className="flex gap-3">
              {nextLevelDef.rewards.map((reward, i) => (
                <div key={i} className="px-3 py-2 bg-slate-800 rounded-lg border border-slate-600/50 flex items-center space-x-2 shadow-sm">
                  <Award className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-medium text-slate-200 capitalize">{reward.replace(/-/g, ' ')}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
