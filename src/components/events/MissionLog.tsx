'use client';

import React, { useState } from 'react';
import { useEventStore } from '@/store/eventStore';
import { Mission } from '@/types/events';
import { CheckCircle2, Circle, Target, Clock, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const MissionLog: React.FC = () => {
  const { dailyMissions, weeklyMissions, completeMission } = useEventStore();
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly'>('daily');

  const missions = activeTab === 'daily' ? dailyMissions : weeklyMissions;

  return (
    <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col h-full">
      <div className="flex items-center justify-between mb-5 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2">
          <Target className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-slate-100">Mission Log</h2>
        </div>
        <div className="flex space-x-1 bg-slate-800/50 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('daily')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
              activeTab === 'daily' 
                ? 'bg-indigo-500/20 text-indigo-300' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setActiveTab('weekly')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
              activeTab === 'weekly' 
                ? 'bg-purple-500/20 text-purple-300' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Weekly
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
        <AnimatePresence>
          {missions.map((mission) => (
            <MissionItem 
              key={mission.id} 
              mission={mission} 
              onComplete={() => completeMission(mission.id)} 
            />
          ))}
        </AnimatePresence>
        
        {missions.length === 0 && (
          <div className="text-center py-8 text-slate-500 text-sm">
            No missions available right now.
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-800 flex items-center text-xs text-slate-500">
        <Clock className="w-3.5 h-3.5 mr-1.5" />
        {activeTab === 'daily' ? 'Resets in 14h 22m' : 'Resets in 4d 14h 22m'}
      </div>
    </div>
  );
};

const MissionItem: React.FC<{ mission: Mission, onComplete: () => void }> = ({ mission, onComplete }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-3 rounded-lg border transition-all flex items-start gap-3 ${
        mission.isCompleted 
          ? 'bg-emerald-900/10 border-emerald-900/30 opacity-70' 
          : 'bg-slate-800/40 border-slate-700/50 hover:border-indigo-500/30'
      }`}
    >
      <button 
        onClick={onComplete}
        disabled={mission.isCompleted}
        className="mt-0.5 focus:outline-none"
      >
        {mission.isCompleted ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        ) : (
          <Circle className="w-5 h-5 text-slate-500 hover:text-indigo-400 transition-colors" />
        )}
      </button>
      
      <div className="flex-1 min-w-0">
        <h4 className={`text-sm font-semibold truncate ${mission.isCompleted ? 'text-emerald-400 line-through' : 'text-slate-200'}`}>
          {mission.title}
        </h4>
        <p className="text-xs text-slate-400 mt-1 line-clamp-2">
          {mission.description}
        </p>
      </div>

      <div className="flex items-center space-x-1 bg-indigo-500/10 text-indigo-300 px-2 py-1 rounded border border-indigo-500/20 text-xs font-mono">
        <Star className="w-3 h-3 text-indigo-400" />
        <span>{mission.xpReward}</span>
      </div>
    </motion.div>
  );
};
