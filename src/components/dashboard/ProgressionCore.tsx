'use client';

import React from 'react';
import { UserState } from '@/components/layout/AuthProvider';
import { Target, ArrowRight, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { NeuralConstellation } from './NeuralConstellation';

export function ProgressionCore({ user }: { user: UserState }) {
  const completedSkills = user.skills.filter(s => s.status === 'Completed');
  const completionRate = Math.round((completedSkills.length / user.skills.length) * 100);
  
  // Find next available skills that are locked but have prerequisites met
  const nextUnlock = user.skills.find(s => s.status === 'Available') || user.skills[0];

  return (
    <div className="surface-interactive p-6 relative overflow-hidden group">
      {/* Signature System: Neural Constellation (Living Progression Architecture) */}
      <div className="absolute top-0 right-0 w-[60%] h-full opacity-30 pointer-events-none">
        <NeuralConstellation user={user} />
        {/* Masking gradient to blend constellation with content */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg-card via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
            <Target size={18} className="text-accent" />
          </div>
          <h2 className="text-sm font-black tracking-[0.15em] text-text-primary uppercase font-display">
            Active Directive
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Path Info (Tier 1 & 3) */}
          <div className="flex flex-col">
            <div className="text-[11px] font-medium text-text-muted uppercase tracking-[0.1em] mb-2 font-display">System Roadmap</div>
            <h3 className="text-[24px] font-bold tracking-[-0.03em] leading-[1.05] text-text-primary uppercase font-display mb-4">
              {user.dominantDomain} <br/>Architect
            </h3>
            <p className="text-[14px] leading-[1.6] text-text-secondary max-w-[32ch] opacity-70 font-reading">
              You are evolving into a high-tier system operator. Mastery of current nodes will trigger advanced evolution paths.
            </p>

            <div className="mt-auto pt-8 space-y-3">
              <div className="flex justify-between items-end">
                <div className="text-[11px] font-medium text-text-muted uppercase tracking-widest font-display">Roadmap Synchronization</div>
                <div className="text-lg font-bold text-accent font-display">{completionRate}%</div>
              </div>
              <div className="progress-track w-full h-1">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${completionRate}%` }}
                  transition={{ duration: 2, ease: "circOut" }}
                  className="progress-fill h-full" 
                />
              </div>
            </div>
          </div>

          {/* Next Milestone (Tier 2 Action) */}
          <div className="bg-bg-elevated/40 border border-border-mid rounded-2xl p-6 flex flex-col relative overflow-hidden">
            {/* Ambient Breathing Background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[80px] ambient-breathing -mr-32 -mt-32 pointer-events-none" />
            
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="text-[14px] font-semibold text-accent uppercase tracking-[0.08em] font-display">
                Pending Evolution
              </div>
              <div className="px-2 py-0.5 rounded bg-border-mid text-[10px] font-medium text-text-muted font-display tracking-widest">
                EST. {nextUnlock?.estimatedLearningTime || '20h'}
              </div>
            </div>
            
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-bg-base border border-border-accent flex items-center justify-center text-accent shadow-[0_0_20px_rgba(0,229,160,0.1)]">
                <Lock size={20} />
              </div>
              <div>
                <div className="text-lg font-bold text-text-primary uppercase tracking-tight mb-1 font-display">
                  {nextUnlock?.title}
                </div>
                <div className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] font-display">
                  {nextUnlock?.category} Domain
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="text-[11px] font-medium text-text-muted uppercase tracking-widest font-display">Initial Requirements</div>
              <div className="flex flex-wrap gap-2">
                {nextUnlock?.prerequisites.map(preId => (
                  <div key={preId} className="px-3 py-1.5 rounded-lg bg-bg-base border border-border text-[11px] font-display text-text-secondary opacity-70">
                    {preId}
                  </div>
                )) || <span className="text-xs italic text-text-muted font-reading">None — Ready to initialize</span>}
              </div>
            </div>

            <button className="mt-auto group/btn flex items-center justify-center gap-3 w-full py-4 bg-accent text-bg-base font-bold text-[13px] uppercase tracking-[0.2em] rounded-xl transition-all duration-250 ease-in-out hover:bg-white hover:shadow-[0_0_20px_rgba(0,229,160,0.3)] active:scale-[0.97] font-display">
              Initialize Evolution 
              <ArrowRight size={16} className="transition-transform duration-250 ease-in-out group-hover/btn:translate-x-1.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
