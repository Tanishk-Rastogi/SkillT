'use client';

import React from 'react';
import { UserState } from '@/components/layout/AuthProvider';
import { Activity, Radio } from 'lucide-react';
import { motion } from 'framer-motion';

export function LiveActivityFeed({ user }: { user: UserState }) {
  const events = user.feedEvents.slice(0, 5);

  return (
    <div className="surface-passive p-5 flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-green-500/10 border border-green-500/20">
            <Activity size={16} className="text-green-400" />
          </div>
          <h2 className="text-[10px] font-black tracking-[0.2em] text-text-primary uppercase font-display">
            Activity Matrix
          </h2>
        </div>
        <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-accent/10 text-[9px] font-bold text-accent font-display tracking-widest uppercase">
          <div className="w-1 h-1 rounded-full bg-accent live-dot" />
          Live
        </div>
      </div>

      <div className="flex-1 space-y-3">
        {events.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-40">
            <div className="text-[14px] font-bold text-accent font-display mb-2 tracking-[0.2em]">000.000</div>
            <p className="text-[11px] font-medium font-reading text-text-muted uppercase tracking-widest max-w-[20ch] leading-relaxed">
              Network Anticipation: <br/>Awaiting first pulse signal
            </p>
            <div className="mt-6 w-12 h-px bg-border-mid relative overflow-hidden">
              <div className="absolute inset-0 bg-accent/40 translate-x-[-100%] animate-[shimmer-sweep_4s_infinite]" />
            </div>
          </div>
        ) : (
          events.map((event, i) => (
            <div key={event.id} className="flex items-start gap-3 group">
              <div className="mt-1 w-1.5 h-1.5 rounded-full bg-border-mid group-hover:bg-accent transition-colors" />
              <div className="flex-1">
                <div className="text-[13px] text-text-secondary leading-snug font-reading">
                  <span className="font-bold text-text-primary uppercase font-display text-[11px] mr-2 tracking-tight">
                    {event.username}
                  </span>
                  {event.message}
                </div>
                <div className="text-[9px] font-bold text-text-muted mt-1 uppercase tracking-widest font-display">
                  {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {event.userClass}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
