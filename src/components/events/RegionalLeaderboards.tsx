'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Swords, MapPin } from 'lucide-react';

// Simulated dummy data for regional leaderboard
const dummyLeaderboard = [
  { id: '1', name: 'MIT', score: 145200, trend: 'up' },
  { id: '2', name: 'Stanford', score: 138900, trend: 'up' },
  { id: '3', name: 'CMU', score: 125400, trend: 'down' },
  { id: '4', name: 'UC Berkeley', score: 112000, trend: 'neutral' },
  { id: '5', name: 'Georgia Tech', score: 98500, trend: 'up' },
];

export const RegionalLeaderboards: React.FC = () => {
  return (
    <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-xl p-5 shadow-xl">
      <div className="flex items-center justify-between mb-5 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2">
          <Swords className="w-5 h-5 text-rose-400" />
          <h2 className="text-lg font-bold text-slate-100">College Wars</h2>
        </div>
        <div className="px-2 py-1 bg-rose-500/10 text-rose-300 border border-rose-500/20 rounded text-xs font-semibold flex items-center">
          <MapPin className="w-3 h-3 mr-1" />
          Global Top 5
        </div>
      </div>

      <div className="space-y-2">
        {dummyLeaderboard.map((entity, index) => (
          <motion.div 
            key={entity.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center justify-between p-3 rounded-lg border ${
              index === 0 
                ? 'bg-amber-500/10 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.1)]' 
                : 'bg-slate-800/30 border-slate-700/30'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                index === 0 ? 'bg-amber-500 text-amber-950' : 
                index === 1 ? 'bg-slate-300 text-slate-900' :
                index === 2 ? 'bg-amber-700 text-amber-100' :
                'bg-slate-700 text-slate-300'
              }`}>
                {index + 1}
              </div>
              <span className={`font-semibold ${index === 0 ? 'text-amber-400' : 'text-slate-200'}`}>
                {entity.name}
              </span>
            </div>
            
            <div className="flex items-center space-x-2 font-mono text-sm">
              <Trophy className={`w-3.5 h-3.5 ${index === 0 ? 'text-amber-500' : 'text-slate-500'}`} />
              <span className="text-slate-300">{entity.score.toLocaleString()}</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-2 text-xs font-semibold text-slate-400 hover:text-rose-400 transition-colors border border-dashed border-slate-700 rounded-lg hover:border-rose-500/30 hover:bg-rose-500/5">
        View Full Rankings
      </button>
    </div>
  );
};
