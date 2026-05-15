'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/components/layout/AuthProvider';

// ── RANK LADDER ──────────────────────────────────────────────
const RANKS = [
  { minLevel: 1,  name: 'Novice',       next: 'Apprentice'   },
  { minLevel: 6,  name: 'Apprentice',   next: 'Practitioner' },
  { minLevel: 11, name: 'Practitioner', next: 'Engineer'     },
  { minLevel: 16, name: 'Engineer',     next: 'Senior'       },
  { minLevel: 21, name: 'Senior',       next: 'Architect'    },
  { minLevel: 31, name: 'Architect',    next: 'Master'       },
  { minLevel: 41, name: 'Master',       next: 'Sovereign'    },
  { minLevel: 51, name: 'Sovereign',    next: null           },
];

const getRank = (level: number) => {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (level >= RANKS[i].minLevel) return RANKS[i];
  }
  return RANKS[0];
};

const XP_PER_LEVEL = 100;
const getProgress = (xp: number) => ({
  inLevel: xp % XP_PER_LEVEL,
  pct: (xp % XP_PER_LEVEL) / XP_PER_LEVEL,
});

interface XPToast { id: number; amount: number }

export function XPDisplay() {
  const { user } = useAuth();
  const prevXp = useRef<number | null>(null);
  const prevLevel = useRef<number | null>(null);

  const [toasts, setToasts] = useState<XPToast[]>([]);
  const [levelUpFlash, setLevelUpFlash] = useState(false);
  const [badgePulse, setBadgePulse] = useState(false);

  useEffect(() => {
    if (!user) return;
    const didLevelUp = prevLevel.current !== null && user.level > prevLevel.current;
    const xpGained = prevXp.current !== null ? user.xp - prevXp.current : 0;

    if (xpGained > 0) {
      const toast: XPToast = { id: Date.now(), amount: xpGained };
      setToasts(prev => [...prev, toast]);
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== toast.id)), 2600);
    }
    if (didLevelUp) {
      setLevelUpFlash(true);
      setBadgePulse(true);
      setTimeout(() => setLevelUpFlash(false), 900);
      setTimeout(() => setBadgePulse(false), 1800);
    }
    prevXp.current = user.xp;
    prevLevel.current = user.level;
  }, [user?.xp, user?.level]);

  if (!user) return null;

  const rank = getRank(user.level);
  const { inLevel, pct } = getProgress(user.xp);

  // Use the surgical accent color for the fill
  const fillGradient = `linear-gradient(90deg, var(--accent), #34d399)`;

  return (
    <div className="relative flex items-center gap-4 w-full">

      {/* ── LEVEL BADGE ── Integrated with bg-elevated ── */}
      <div
        className="relative flex flex-col items-center justify-center w-11 h-11 shrink-0 rounded-xl select-none"
        style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-accent)',
          boxShadow: badgePulse 
            ? '0 0 20px 4px var(--accent-border)' 
            : '0 0 8px rgba(0,0,0,0.4)',
          transition: 'box-shadow 0.3s ease, transform 0.2s ease',
          transform: badgePulse ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        <span className="text-[10px] font-mono font-bold leading-none mb-0.5 opacity-50">LV</span>
        <span className="text-[16px] font-black leading-none" style={{ color: 'var(--text-primary)' }}>{user.level}</span>
        
        {/* Subtle idle pulse around the badge */}
        <div className="absolute inset-0 rounded-xl border border-[var(--accent-border)] opacity-20 animate-pulse pointer-events-none" />

        {/* Level-up flash */}
        {levelUpFlash && (
          <div
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 80%)', animation: 'xp-flash 0.9s ease-out forwards' }}
          />
        )}
      </div>

      {/* ── PROGRESS SECTION ── Integrated with bg-card ── */}
      <div className="flex-1 flex flex-col justify-center gap-1.5 min-w-0 relative">
        {levelUpFlash && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, var(--accent-dim) 0%, transparent 70%)', animation: 'xp-flash 0.9s ease-out forwards' }}
          />
        )}

        {/* Labels: Rank (Secondary) + XP (Muted) */}
        <div className="flex items-baseline justify-between px-0.5">
          <span className="text-[13px] font-mono font-bold tracking-tight uppercase" style={{ color: 'var(--text-secondary)' }}>
            {rank.name}
            {rank.next && (
              <span className="ml-3 opacity-30 font-normal text-[11px]">NEXT: {rank.next}</span>
            )}
          </span>
          <span className="text-[11px] font-mono font-bold shrink-0 ml-4" style={{ color: 'var(--text-muted)' }}>
            {inLevel}<span style={{ opacity: 0.4 }}> / {XP_PER_LEVEL} XP</span>
          </span>
        </div>

        {/* Progress track ── Taller but integrated with bg-card ── */}
        <div 
          style={{ 
            height: 8, 
            background: 'var(--bg-card)', 
            borderRadius: 4, 
            overflow: 'hidden',
            border: '1px solid var(--border)',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)'
          }}
        >
          <div
            className="relative h-full"
            style={{
              width: `${pct * 100}%`,
              background: fillGradient,
              borderRadius: 4,
              transition: 'width 0.8s cubic-bezier(0.16,1,0.3,1)',
              boxShadow: '0 0 10px var(--accent-dim)',
            }}
          >
            {/* Very subtle wave animation */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                background: 'linear-gradient(90deg, transparent, white, transparent)',
                width: '50%',
                animation: 'xp-wave 3s linear infinite'
              }}
            />
            
            {/* Shimmer lead edge */}
            <div
              style={{
                position: 'absolute', right: 0, top: 0, bottom: 0, width: 8,
                background: 'rgba(255,255,255,0.4)', borderRadius: 4,
                boxShadow: '0 0 8px white',
                animation: 'xp-shimmer 1.2s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </div>

      {/* ── +XP TOAST ── Surgical Accent color ── */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col-reverse items-center gap-1 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] font-mono font-black whitespace-nowrap shadow-xl"
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--accent-border)',
              color: 'var(--accent)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
              animation: 'xp-toast-in 0.3s cubic-bezier(0.17,0.67,0.83,0.67), xp-toast-out 0.4s ease-in 2.2s forwards',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: 'var(--accent)',
                boxShadow: '0 0 8px var(--accent)',
                animation: 'xp-dot-blink 0.5s ease-in-out infinite',
              }}
            />
            +{toast.amount} XP
          </div>
        ))}
      </div>

      {/* ── KEYFRAMES ── */}
      <style>{`
        @keyframes xp-flash {
          0%   { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.3); }
        }
        @keyframes xp-shimmer {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.8; }
        }
        @keyframes xp-wave {
          from { transform: translateX(-100%); }
          to   { transform: translateX(300%); }
        }
        @keyframes xp-toast-in {
          from { opacity: 0; transform: translateY(10px) scale(0.9); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes xp-toast-out {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-6px); }
        }
        @keyframes xp-dot-blink {
          0%, 100% { opacity: 1; transform: scale(1.1); }
          50%       { opacity: 0.4; transform: scale(0.9); }
        }
      `}</style>
    </div>
  );
}
