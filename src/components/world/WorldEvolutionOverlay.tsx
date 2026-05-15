'use client';

import React from 'react';
import { useEventStore } from '@/store/eventStore';

export const WorldEvolutionOverlay: React.FC = () => {
  const { activeWorldChanges, activeSeason } = useEventStore();

  if (!activeWorldChanges || activeWorldChanges.length === 0) return null;

  // We map different themes to different CSS classes for full-screen visual overlays.
  // In a real implementation, this might affect standard background components or 3D scenes.
  
  const isNeonTheme = activeSeason?.theme === 'cyber-neon';
  const isDarkCyber = activeSeason?.theme === 'dark-cyber';

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {isNeonTheme && (
        <>
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_20%,transparent_100%)]" />
          {/* Ambient glow */}
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]" />
          <div className="absolute top-[60%] -right-[10%] w-[40%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px]" />
        </>
      )}

      {isDarkCyber && (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_10%,transparent_100%)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[2px] bg-emerald-500/20 blur-[2px] shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
        </>
      )}
    </div>
  );
};
