'use client';

import React from 'react';
import { useEventStore } from '@/store/eventStore';
import { motion } from 'framer-motion';
import { Globe, Users, Unlock } from 'lucide-react';

export const CommunityGoalTracker: React.FC = () => {
  const { communityGoals } = useEventStore();
  
  if (!communityGoals || communityGoals.length === 0) return null;

  const activeGoal = communityGoals[0];
  const progressPercent = Math.min((activeGoal.currentCount / activeGoal.targetCount) * 100, 100);

  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-emerald-500/20 rounded-xl p-5 shadow-lg relative overflow-hidden group">
      {/* Background glow */}
      <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-emerald-500/20 rounded-lg">
          <Globe className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h3 className="text-xs text-emerald-400/80 font-bold uppercase tracking-widest">Global Community Goal</h3>
          <p className="text-sm font-semibold text-slate-100">{activeGoal.title}</p>
        </div>
      </div>

      <div className="space-y-2 relative">
        <div className="flex justify-between text-xs text-slate-400 font-mono">
          <span>{activeGoal.currentCount.toLocaleString()}</span>
          <span>{activeGoal.targetCount.toLocaleString()}</span>
        </div>
        
        {/* Collaborative Energy Meter */}
        <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden relative border border-slate-700/50">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-600 via-teal-400 to-emerald-400 relative overflow-hidden"
          >
            {/* Shimmer effect */}
            <motion.div 
              animate={{ x: ['-100%', '200%'] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
            />
          </motion.div>
        </div>
      </div>

      {/* Rewards preview */}
      <div className="mt-4 flex items-center space-x-2 text-xs text-slate-400">
        <Unlock className="w-4 h-4 text-slate-500" />
        <span>Unlocks: </span>
        <span className="text-emerald-300 font-medium">{activeGoal.rewardUnlocks.join(', ').replace(/-/g, ' ')}</span>
      </div>
    </div>
  );
};
