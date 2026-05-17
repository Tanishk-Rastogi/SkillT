'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/components/layout/AuthProvider';
import { Crown, Sparkles, Zap } from 'lucide-react';

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
      setTimeout(() => setLevelUpFlash(false), 1200);
      setTimeout(() => setBadgePulse(false), 2000);
    }
    prevXp.current = user.xp;
    prevLevel.current = user.level;
  }, [user?.xp, user?.level]);

  if (!user) return null;

  const rank = getRank(user.level);
  const { inLevel, pct } = getProgress(user.xp);

  // Dynamic state configurations based on level tier
  const level = user.level;
  let tierName = "Beginner";
  let tierColor = "text-slate-400";
  let fillGradient = "linear-gradient(90deg, #6c63ff, #8b5cf6)"; // Beginner: Indigo/Purple
  let badgeBorder = "rgba(255,255,255,0.08)";
  let badgeGlow = "0 0 10px rgba(0,0,0,0.4)";
  let barGlow = "rgba(108,99,255,0.15)";
  let activeIcon = <Zap size={10} className="text-slate-400/50" />;

  if (level >= 40) {
    tierName = "Legendary";
    tierColor = "text-amber-400 font-extrabold text-glow-gold";
    fillGradient = "linear-gradient(90deg, #fbbf24 0%, #f59e0b 50%, #fbbf24 100%)"; // Gold-Bronze
    badgeBorder = "rgba(251,191,36,0.5)";
    badgeGlow = "0 0 20px 2px rgba(251,191,36,0.35)";
    barGlow = "rgba(251,191,36,0.3)";
    activeIcon = <Crown size={10} className="text-amber-400 animate-bounce" />;
  } else if (level >= 20) {
    tierName = "Elite";
    tierColor = "text-cyber-purple font-bold text-glow-purple";
    fillGradient = "linear-gradient(90deg, #a78bfa 0%, #c084fc 50%, #f43f5e 100%)"; // Violet-Rose
    badgeBorder = "rgba(167,139,250,0.4)";
    badgeGlow = "0 0 16px 2px rgba(167,139,250,0.28)";
    barGlow = "rgba(167,139,250,0.25)";
    activeIcon = <Sparkles size={10} className="text-cyber-purple animate-pulse" />;
  } else if (level >= 10) {
    tierName = "Advanced";
    tierColor = "text-cyber-cyan text-glow-cyan";
    fillGradient = "linear-gradient(90deg, #06b6d4 0%, #34d399 100%)"; // Cyan-Emerald
    badgeBorder = "rgba(6,182,212,0.4)";
    badgeGlow = "0 0 12px 1px rgba(6,182,212,0.25)";
    barGlow = "rgba(6,182,212,0.2)";
    activeIcon = <Zap size={10} className="text-cyber-cyan animate-pulse" />;
  }

  return (
    <div className="relative flex items-center gap-4 w-full">

      {/* ── LEVEL BADGE ── Evolving visual style and icons ── */}
      <div
        className="relative flex flex-col items-center justify-center w-11 h-11 shrink-0 rounded-xl select-none transition-all duration-500 overflow-hidden"
        style={{
          background: 'var(--bg-elevated)',
          border: `1px solid ${badgeBorder}`,
          boxShadow: badgePulse ? badgeGlow : '0 0 8px rgba(0,0,0,0.4)',
          transform: badgePulse ? 'scale(1.06)' : 'scale(1)',
        }}
      >
        <span className="text-[8px] font-mono font-bold leading-none mb-0.5 opacity-40">LV</span>
        <span className="text-[15px] font-black leading-none text-white relative z-10">{user.level}</span>
        
        {/* Floating background active icon sigil */}
        <div className="absolute -bottom-1 -right-1 opacity-25 z-0 animate-pulse">
          {activeIcon}
        </div>

        {/* Ambient pulse decoration ring */}
        <div className="absolute inset-0 rounded-xl border border-white/5 opacity-20 animate-pulse pointer-events-none" />

        {/* Surgical expanding level-up surges */}
        {levelUpFlash && (
          <>
            <div
              className="absolute inset-0 rounded-xl pointer-events-none z-20"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.75) 0%, transparent 80%)',
                animation: 'xp-flash 1.2s cubic-bezier(0.1, 0.8, 0.3, 1) forwards'
              }}
            />
            <div 
              className="absolute -inset-2 rounded-xl border-2 border-white/40 pointer-events-none z-20"
              style={{
                animation: 'xp-ripple 1s cubic-bezier(0.1, 0.8, 0.2, 1) forwards'
              }}
            />
          </>
        )}
      </div>

      {/* ── PROGRESS SECTION ── */}
      <div className="flex-1 flex flex-col justify-center gap-1 min-w-0 relative">
        {levelUpFlash && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(6,182,212,0.15) 0%, transparent 85%)',
              animation: 'xp-flash 1.2s ease-out forwards'
            }}
          />
        )}

        {/* Labels: Dynamic Rank Tier & Subtitles */}
        <div className="flex items-baseline justify-between px-0.5 select-none">
          <span className="text-[12px] font-mono font-bold tracking-wider uppercase text-white/90 flex items-center gap-1.5">
            <span className={`${tierColor}`}>{rank.name}</span>
            <span className="text-[8px] px-1 py-0.5 rounded bg-white/5 text-white/40 tracking-widest font-normal">
              {tierName.toUpperCase()}
            </span>
          </span>
          <span className="text-[10px] font-mono font-bold shrink-0 ml-4 text-white/50">
            {inLevel}<span className="opacity-40"> / {XP_PER_LEVEL} XP</span>
          </span>
        </div>

        {/* Progress track ── Taller with dynamic visual response ── */}
        <div 
          style={{ 
            height: 9, 
            background: 'rgba(9,11,16,0.92)', 
            borderRadius: 4, 
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.7)'
          }}
          className="relative group/track"
        >
          <div
            className="relative h-full transition-all duration-700"
            style={{
              width: `${pct * 100}%`,
              background: fillGradient,
              borderRadius: 4,
              boxShadow: `0 0 12px ${barGlow}`,
            }}
          >
            {/* Elegant slow wave animation pass */}
            <div 
              className="absolute inset-0 opacity-15"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                width: '60%',
                animation: 'xp-wave 3.5s linear infinite'
              }}
            />
            
            {/* Lead edge shimmer particle sweep */}
            <div
              style={{
                position: 'absolute', right: 0, top: 0, bottom: 0, width: 6,
                background: 'rgba(255,255,255,0.6)', borderRadius: 3,
                boxShadow: '0 0 10px #ffffff, 0 0 4px var(--accent)',
                animation: 'xp-shimmer 1.5s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </div>

      {/* ── +XP TOAST FEED ── */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col-reverse items-center gap-1 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] font-mono font-black whitespace-nowrap shadow-2xl transition-all duration-300"
            style={{
              background: 'var(--bg-elevated)',
              border: `1px solid ${badgeBorder}`,
              color: 'var(--accent)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.6)',
              animation: 'xp-toast-in 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28), xp-toast-out 0.4s ease-in 2.2s forwards',
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
            +{toast.amount} XP RECVD
          </div>
        ))}
      </div>

      {/* ── KEYFRAMES FOR progression core animations ── */}
      <style>{`
        @keyframes xp-flash {
          0%   { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.4); }
        }
        @keyframes xp-ripple {
          0%   { transform: scale(0.9); opacity: 1; }
          100% { transform: scale(1.6); opacity: 0; border-color: rgba(255,255,255,0); }
        }
        @keyframes xp-shimmer {
          0%, 100% { opacity: 0.5; filter: brightness(1); }
          50%       { opacity: 0.9; filter: brightness(1.25); }
        }
        @keyframes xp-wave {
          from { transform: translateX(-100%); }
          to   { transform: translateX(250%); }
        }
        @keyframes xp-toast-in {
          from { opacity: 0; transform: translateY(12px) scale(0.85); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes xp-toast-out {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-8px); }
        }
        @keyframes xp-dot-blink {
          0%, 100% { opacity: 1; transform: scale(1.1); }
          50%       { opacity: 0.4; transform: scale(0.9); }
        }
      `}</style>
    </div>
  );
}
