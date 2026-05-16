'use client';

import React from 'react';
import { UserState } from '@/components/layout/AuthProvider';
import { Zap, Clock, Trophy, ChevronRight } from 'lucide-react';

export function MissionControl({ user }: { user: UserState }) {
  // Mock active missions if none exist in user state
  const activeMissions = [
    { id: 'm1', title: 'Build an API dashboard', reward: '+500 XP', deadline: '2d left', type: 'Project', icon: Zap, color: 'text-accent' },
    { id: 'm2', title: 'Solve 5 TypeScript Katas', reward: '+250 XP', deadline: '12h left', type: 'Challenge', icon: Trophy, color: 'text-color-purple' },
    { id: 'm3', title: 'Defeat Frontend Boss: Auth', reward: '+1000 XP', deadline: 'End of Season', type: 'Boss', icon: Zap, color: 'text-color-amber' },
  ];

  return (
    <div className="card-surface p-6 flex flex-col bg-bg-card/50">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded bg-accent/10 border border-accent/20">
          <Zap size={16} className="text-accent" />
        </div>
        <h2 className="text-[10px] font-black tracking-[0.2em] text-text-primary uppercase font-display">
          Objective Matrix
        </h2>
      </div>

      <div className="flex-1 space-y-3">
        {activeMissions.map((mission) => (
          <div 
            key={mission.id} 
            className="group/item flex items-center gap-4 p-3 rounded-xl bg-bg-elevated/40 border border-border hover:border-border-accent transition-all cursor-pointer"
          >
            <div className={`w-10 h-10 shrink-0 rounded-lg bg-bg-base border border-border flex items-center justify-center ${mission.color}`}>
              <mission.icon size={18} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-bold text-text-primary uppercase truncate tracking-tight mb-1">
                {mission.title}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-medium font-mono text-accent/80 tracking-widest uppercase">{mission.reward}</span>
                <span className="text-[11px] text-text-muted flex items-center gap-1.5 opacity-60">
                  <Clock size={12} /> {mission.deadline}
                </span>
              </div>
            </div>

            <ChevronRight size={14} className="text-text-muted group-hover/item:text-text-primary group-hover/item:translate-x-0.5 transition-all" />
          </div>
        ))}
      </div>

      <button className="mt-8 py-4 rounded-xl border border-border-mid text-[11px] font-bold text-text-secondary uppercase tracking-[0.15em] transition-all duration-250 ease-in-out hover:border-accent hover:text-accent hover:bg-accent/5 active:scale-[0.98]">
        View All Missions
      </button>
    </div>
  );
}
