'use client';

import React from 'react';
import { UserState } from '@/components/layout/AuthProvider';
import { Shield, Zap, Award, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export function IdentityHeader({ user }: { user: UserState }) {
  const xpProgress = (user.xp % 100);
  const xpNeeded = 100;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8 animate-fade-in">
      {/* Identity Profile */}
      <div className="flex items-center gap-6">
        <div className="relative group">
          <div className="w-24 h-24 rounded-2xl bg-bg-elevated border border-border-mid flex items-center justify-center relative z-10 overflow-hidden group-hover:border-accent transition-colors">
            {/* Holographic background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Shield className="w-10 h-10 text-text-secondary group-hover:text-accent transition-colors relative z-10" />
            
            {/* Ambient Breathing Core */}
            <div className="absolute inset-2 rounded-full bg-accent/20 blur-2xl ambient-breathing z-0" />
          </div>
          {/* Rank Glow */}
          <div className="absolute -inset-1 bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-[28px] font-bold tracking-[-0.03em] leading-[1.05] text-text-primary uppercase font-display">
              {user.username}
            </h1>
            {user.streakDays > 0 && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-color-red-dim border border-color-red/20 text-color-red text-[10px] font-black font-display tracking-widest">
                <Flame size={12} fill="currentColor" /> {user.streakDays} DAY STREAK
              </div>
            )}
          </div>
          
          {/* Tier 2/3: Identity Context */}
          <div className="flex items-center gap-3">
            <span className="text-[14px] font-semibold font-display tracking-[0.08em] text-accent uppercase">
              {user.activeClass?.name || 'Systems Architect'}
            </span>
            <span className="w-1 h-1 rounded-full bg-border-accent opacity-30" />
            <span className="text-[13px] text-text-secondary font-medium font-reading opacity-60">
              {user.activeTitle?.name || 'Digital Sovereign'}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Vitals */}
      <div className="flex gap-4 w-full md:w-auto">
        {/* Level Box */}
        <div className="flex flex-col items-center justify-center px-8 py-3 bg-bg-card border border-border rounded-xl min-w-[120px]">
          <span className="text-[11px] font-medium font-display tracking-widest text-text-muted uppercase mb-1">Level</span>
          <span className="text-3xl font-bold text-text-primary font-display leading-none">{user.level}</span>
        </div>

        {/* XP Progress Box (Tier 4 Metadata) */}
        <div className="flex-1 md:w-64 px-6 py-3 bg-bg-card border border-border rounded-xl flex flex-col justify-center">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[11px] font-medium font-display tracking-widest text-text-muted uppercase">XP SYNC</span>
            <span className="text-xs font-display font-bold text-text-secondary">{xpProgress}/{xpNeeded}</span>
          </div>
          <div className="progress-track w-full">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(xpProgress / xpNeeded) * 100}%` }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className="progress-fill" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
