'use client';

import React from 'react';
import { UserState } from '@/components/layout/AuthProvider';
import { Award, Trophy, Medal, Star } from 'lucide-react';

export function AchievementsShowcase({ user }: { user: UserState }) {
  const titles = user.unlockedTitles.slice(0, 4);
  const classes = user.unlockedClasses.slice(0, 2);

  return (
    <div className="surface-prestige p-5 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded bg-amber-500/10 border border-amber-500/20">
          <Award size={16} className="text-amber-400" />
        </div>
        <h2 className="text-[10px] font-black tracking-[0.2em] text-text-primary uppercase font-display">
          Mastery & Identity
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Active Title Card */}
        <div className="p-4 rounded-xl bg-bg-elevated/40 border border-accent/20 relative overflow-hidden group/title">
          {/* Ambient Breathing Glow */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 blur-2xl ambient-breathing -mr-12 -mt-12 pointer-events-none" />
          
          <div className="absolute top-0 right-0 p-3 opacity-5 group-hover/title:opacity-10 transition-opacity">
            <Trophy size={40} className="text-accent" />
          </div>
          
          <div className="text-[9px] font-medium text-accent uppercase tracking-widest mb-2 font-display">Equipped Title</div>
          <div className="text-[15px] font-bold text-text-primary uppercase tracking-tight mb-1 font-display">
             {user.activeTitle?.name || 'Silent Pathmaker'}
          </div>
          <div className="text-[12px] text-text-secondary leading-tight opacity-60 font-reading">
            {user.activeTitle?.description || 'Awaiting your first milestone.'}
          </div>
        </div>

        {/* Milestone Badges */}
        <div className="md:col-span-1 lg:col-span-2 flex flex-wrap gap-3 items-center">
          {titles.filter(t => t.id !== user.activeTitle?.id).map((title) => (
             <div key={title.id} className="group relative">
               <div className="w-11 h-11 rounded-lg bg-bg-card border border-border flex items-center justify-center text-text-secondary hover:border-accent hover:text-accent transition-all">
                 <Medal size={20} />
               </div>
               <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-bg-elevated border border-border rounded-lg text-[10px] font-bold uppercase whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-all z-20 pointer-events-none">
                 {title.name}
               </div>
             </div>
          ))}
          
          {/* Anticipation Slots */}
          {[...Array(3)].map((_, i) => (
            <div key={i} className="group relative">
              <div className="w-11 h-11 rounded-lg border border-dashed border-border flex items-center justify-center text-text-muted opacity-20 hover:opacity-40 transition-opacity cursor-help">
                <Star size={18} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
