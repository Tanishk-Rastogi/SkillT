'use client';

import React from 'react';
import { UserState } from '@/components/layout/AuthProvider';
import { BarChart3, Star, CheckCircle2, Award, Zap, Target, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export function StatsVisualizer({ user }: { user: UserState }) {
  const stats = [
    { label: 'Neural Matrix', value: user.xp, icon: Zap, color: 'text-accent' },
    { label: 'Mastery Nodes', value: user.skills.filter(s => s.status === 'Completed').length, icon: Target, color: 'text-text-primary' },
    { label: 'Evolution Level', value: user.level, icon: Award, color: 'text-color-purple' },
    { label: 'Uptime Streak', value: user.streakDays, icon: Flame, color: 'text-color-red' },
  ];

  return (
    <div className="surface-passive p-5 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded bg-blue-500/10 border border-blue-500/20">
          <BarChart3 size={16} className="text-blue-400" />
        </div>
        <h2 className="text-[10px] font-black tracking-[0.2em] text-text-primary uppercase font-display">
          System Metrics
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, i) => (
          <div key={stat.label} className="p-4 rounded-xl bg-bg-elevated/20 border border-border flex flex-col items-center justify-center text-center group/stat hover:border-accent/40 transition-colors">
            <stat.icon size={20} className={`${stat.color} mb-3 group-hover/stat:scale-110 transition-transform`} />
            <div className="text-xl font-bold text-text-primary font-display leading-none mb-2">
              {typeof stat.value === 'number' && stat.value === 0 
                ? '000,000' 
                : stat.value.toString().padStart(6, '0').replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </div>
            <div className="text-[10px] font-medium text-text-muted uppercase tracking-widest opacity-60 font-display">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Compact Rank Indicator */}
      <div className="mt-6 pt-6 border-t border-border-mid">
        <div className="flex items-center justify-between">
          <div className="text-[10px] font-medium text-text-muted uppercase tracking-widest font-display">Global Standing</div>
          <div className="text-xl font-bold text-text-primary tracking-tight font-display">#12,501</div>
        </div>
      </div>
    </div>
  );
}
