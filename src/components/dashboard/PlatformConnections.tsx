'use client';

import React from 'react';
import { UserState } from '@/components/layout/AuthProvider';
import { GitBranch, Code, Terminal, CheckCircle2 } from 'lucide-react';

export function PlatformConnections({ user }: { user: UserState }) {
  const platforms = [
    { id: 'github', name: 'GitHub', icon: GitBranch, color: 'text-white' },
    { id: 'leetcode', name: 'LeetCode', icon: Code, color: 'text-amber-500' },
    { id: 'gfg', name: 'GeeksforGeeks', icon: Terminal, color: 'text-green-500' },
  ];

  return (
    <div className="card-surface p-6 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-[10px] font-black tracking-[0.2em] text-text-primary uppercase font-mono">
          Verified Nodes
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {platforms.map((platform) => {
          const isConnected = user.connectedPlatforms.some(p => p.platformId === platform.id);
          
          return (
            <div 
              key={platform.id}
              className={`p-4 rounded-xl border flex items-center justify-between transition-all
                ${isConnected 
                  ? 'bg-accent/5 border-accent/20' 
                  : 'bg-bg-elevated/20 border-border opacity-60 hover:opacity-100 hover:bg-bg-elevated/40'
                }`}
            >
              <div className="flex items-center gap-3">
                <platform.icon size={18} className={platform.color} />
                <span className="text-xs font-bold text-text-primary uppercase tracking-tight">{platform.name}</span>
              </div>
              
              {isConnected ? (
                <CheckCircle2 size={14} className="text-accent" />
              ) : (
                <button className="text-[9px] font-black text-text-muted hover:text-text-primary uppercase tracking-widest px-2 py-1 border border-border rounded-md transition-colors">
                  Sync
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
