'use client';

import React from 'react';
import { UserState } from '@/components/layout/AuthProvider';
import { Trophy, Users, Globe } from 'lucide-react';

export function SocialRankings({ user }: { user: UserState }) {
  const ranks = [
    { label: 'Regional Node: Delhi', rank: '#12', icon: Trophy, color: 'text-accent' },
    { label: 'Global Matrix: JS', rank: '#4,521', icon: Globe, color: 'text-text-secondary' },
    { label: 'Guild Standing: Private', rank: '#3', icon: Users, color: 'text-color-purple' },
  ];

  return (
    <div className="surface-passive p-5 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded bg-purple-500/10 border border-purple-500/20">
          <Trophy size={16} className="text-purple-400" />
        </div>
        <h2 className="text-[10px] font-black tracking-[0.2em] text-text-primary uppercase font-display">
          Network Standing
        </h2>
      </div>

      <div className="flex-1 space-y-3">
        {ranks.map((item) => (
          <div key={item.label} className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <item.icon size={14} className={`${item.color} opacity-60`} />
              <div className="text-[10px] font-bold text-text-secondary uppercase tracking-wider group-hover:text-text-primary transition-colors">
                {item.label}
              </div>
            </div>
            <div className="text-sm font-black text-text-primary font-mono group-hover:text-accent transition-colors">
              {item.rank}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-3 rounded-lg bg-accent/5 border border-accent/10 flex items-center justify-center">
        <div className="text-[9px] font-bold text-accent uppercase tracking-widest text-center">
          Top 5% of all Frontend Builders
        </div>
      </div>
    </div>
  );
}
