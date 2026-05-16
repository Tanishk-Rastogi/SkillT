'use client';

import React from 'react';
import { UserState } from '@/components/layout/AuthProvider';
import { Sparkles, Plus } from 'lucide-react';

export function SmartRecommendations({ user }: { user: UserState }) {
  // Mock recommendations based on dominant domain
  const recommendations = [
    { title: 'TypeScript Mastery', desc: 'Type-safe infrastructure patterns.', xp: '+200 XP' },
    { title: 'API Design Patterns', desc: 'High-performance architectural foundations.', xp: '+150 XP' },
    { title: 'Framer Motion', desc: 'Premium cinematic interaction layers.', xp: '+180 XP' },
  ];

  return (
    <div className="surface-interactive p-5 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded bg-cyan-500/10 border border-cyan-500/20">
          <Sparkles size={16} className="text-cyan-400" />
        </div>
        <h2 className="text-[10px] font-black tracking-[0.2em] text-text-primary uppercase font-display">
          Optimization Paths
        </h2>
      </div>

      <div className="flex-1 space-y-3">
        {recommendations.map((rec) => (
          <div 
            key={rec.title} 
            className="p-4 rounded-xl bg-bg-elevated/30 border border-border hover:bg-bg-elevated/50 transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-[13px] font-bold text-text-primary uppercase tracking-tight group-hover:text-accent transition-colors font-display">
                {rec.title}
              </div>
              <div className="w-7 h-7 rounded-lg bg-bg-base border border-border flex items-center justify-center text-text-muted transition-all duration-250 ease-in-out group-hover:border-accent group-hover:text-accent group-hover:scale-110 group-hover:rotate-90 group-hover:shadow-[0_0_15px_rgba(0,229,160,0.2)]">
                <Plus size={14} />
              </div>
            </div>
            <p className="text-[13px] leading-relaxed text-text-secondary opacity-60 mb-3 font-reading">
              {rec.desc}
            </p>
            <div className="text-[11px] font-medium font-display text-accent/80 tracking-widest uppercase">
              {rec.xp}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
