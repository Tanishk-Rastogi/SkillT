"use client";

import React from 'react';
import { XPDisplay } from '@/components/ui/XPDisplay';
import { useAuth } from './AuthProvider';
import Link from 'next/link';

/** Slim top bar — XP only. Fixed at 56px offset. */
export function Navbar() {
  const { user } = useAuth();
  const level = user?.level || 1;

  // Tier specific configurations
  let ambientBg = 'rgba(9,11,16,0.85)';
  let borderBottomColor = 'rgba(255,255,255,0.08)';
  let showPrestigeShimmer = false;
  let customPulse = "";

  if (level >= 40) {
    // Legendary: Rich gold/dark gradient
    ambientBg = 'linear-gradient(90deg, rgba(251,191,36,0.09) 0%, rgba(9,11,16,0.96) 60%, rgba(251,191,36,0.04) 100%)';
    borderBottomColor = 'rgba(251,191,36,0.3)';
    showPrestigeShimmer = true;
    customPulse = "shadow-[0_1px_15px_rgba(251,191,36,0.1)]";
  } else if (level >= 20) {
    // Elite: Violet/purple gradient
    ambientBg = 'linear-gradient(90deg, rgba(167,139,250,0.09) 0%, rgba(9,11,16,0.96) 60%, rgba(167,139,250,0.04) 100%)';
    borderBottomColor = 'rgba(167,139,250,0.25)';
    showPrestigeShimmer = true;
  } else if (level >= 10) {
    // Advanced: Cyber cyan gradient
    ambientBg = 'linear-gradient(90deg, rgba(6,182,212,0.08) 0%, rgba(9,11,16,0.96) 60%, rgba(6,182,212,0.03) 100%)';
    borderBottomColor = 'rgba(6,182,212,0.22)';
  } else {
    // Beginner: Minimalist slate
    ambientBg = 'linear-gradient(90deg, rgba(255,255,255,0.01) 0%, rgba(9,11,16,0.95) 70%, rgba(255,255,255,0.01) 100%)';
    borderBottomColor = 'rgba(255,255,255,0.06)';
  }

  return (
    <header
      className={`fixed top-0 right-0 z-[60] h-16 flex items-center px-4 transition-all duration-500 overflow-hidden ${customPulse}`}
      style={{
        left: 56,
        background: ambientBg,
        borderBottom: `1px solid ${borderBottomColor}`,
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* Slow, diffused Prestige Shimmer Sweep (8-12 seconds) */}
      {showPrestigeShimmer && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.07]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 20%, rgba(255,255,255,0.8) 25%, rgba(255,255,255,0.6) 30%, transparent 100%)',
            width: '200%',
            height: '100%',
            top: 0,
            left: 0,
            transform: 'skewX(-20deg)',
            animation: 'prestige-sweep-header 10s cubic-bezier(0.4, 0, 0.2, 1) infinite',
          }}
        />
      )}

      {/* Left spacer */}
      <div className="flex-1" />

      {/* Center — XP bar, constrained width */}
      <div className="w-full max-w-sm px-2">
        {user ? (
          <XPDisplay />
        ) : (
          <Link
            href="/"
            className="text-xs font-mono px-3 py-1.5 rounded-full"
            style={{ color: 'var(--accent)', background: 'var(--accent-dim)', border: '1px solid var(--accent-border)' }}
          >
            INITIATE
          </Link>
        )}
      </div>

      {/* Right spacer */}
      <div className="flex-1" />

      {/* Embedded keyframe styles for prestige header shimmer */}
      <style>{`
        @keyframes prestige-sweep-header {
          0%   { transform: translateX(-150%) skewX(-20deg); }
          40%, 100% { transform: translateX(180%) skewX(-20deg); }
        }
      `}</style>
    </header>
  );
}
