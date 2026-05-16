'use client';

import React from 'react';
import { UserState } from '@/components/layout/AuthProvider';
import { Network, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export function SkillTreeMini({ user }: { user: UserState }) {
  const displaySkills = user.skills.slice(0, 15); // Show first few for preview

  return (
    <div className="card-surface p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-purple-500/10 border border-purple-500/20">
            <Network size={16} className="text-purple-400" />
          </div>
          <h2 className="text-[10px] font-black tracking-[0.2em] text-text-primary uppercase font-mono">
            Tree Preview
          </h2>
        </div>
        <Link 
          href="/" 
          className="text-[9px] font-black tracking-widest text-text-muted hover:text-accent uppercase transition-colors flex items-center gap-1.5"
        >
          Expand Fully <ExternalLink size={10} />
        </Link>
      </div>

      <div className="flex-1 relative overflow-hidden flex items-center justify-center py-4">
        {/* Simplified Node Mesh */}
        <div className="grid grid-cols-5 gap-3 max-w-[240px]">
          {displaySkills.map((skill, i) => {
            const isCompleted = skill.status === 'Completed';
            const isAvailable = skill.status === 'Available';
            
            return (
              <div 
                key={skill.id}
                title={skill.title}
                className={`w-10 h-10 rounded-lg border transition-all flex items-center justify-center
                  ${isCompleted 
                    ? 'bg-accent/20 border-accent/40 text-accent shadow-[0_0_15px_rgba(0,229,160,0.2)]' 
                    : isAvailable 
                    ? 'bg-bg-elevated border-accent animate-pulse-slow text-accent' 
                    : 'bg-bg-elevated border-border text-text-muted opacity-40'
                  }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${isCompleted ? 'bg-accent' : isAvailable ? 'bg-accent' : 'bg-text-muted'}`} />
              </div>
            );
          })}
        </div>
        
        {/* Connection Lines (Aesthetic only) */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
           <svg className="w-full h-full" viewBox="0 0 200 200">
             <line x1="20" y1="20" x2="180" y2="180" stroke="currentColor" strokeWidth="0.5" />
             <line x1="180" y1="20" x2="20" y2="180" stroke="currentColor" strokeWidth="0.5" />
             <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="4" />
           </svg>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-border flex justify-around">
        <div className="flex flex-col items-center">
          <span className="text-[14px] font-black text-text-primary font-mono">{user.skills.filter(s => s.status === 'Completed').length}</span>
          <span className="text-[8px] font-black text-text-muted uppercase tracking-tighter">Unlocked</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[14px] font-black text-accent font-mono">{user.skills.filter(s => s.status === 'Available').length}</span>
          <span className="text-[8px] font-black text-text-muted uppercase tracking-tighter">Reachable</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[14px] font-black text-text-secondary font-mono">{user.skills.filter(s => s.status === 'Locked').length}</span>
          <span className="text-[8px] font-black text-text-muted uppercase tracking-tighter">Locked</span>
        </div>
      </div>
    </div>
  );
}
