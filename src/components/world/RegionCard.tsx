'use client';

import React from 'react';
import { Region } from '@/data/worldLore';
import { Users, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface RegionCardProps {
  region: Region;
  isActive?: boolean;
  onEnter?: (regionId: string) => void;
}

export const RegionCard: React.FC<RegionCardProps> = ({ region, isActive = false, onEnter }) => {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`relative rounded-2xl overflow-hidden border cursor-pointer group transition-all ${
        isActive
          ? 'border-white/30 shadow-[0_0_40px_var(--region-glow)]'
          : 'border-white/10 hover:border-white/20'
      }`}
      style={{ '--region-glow': region.visual.glowColor } as React.CSSProperties}
      onClick={() => onEnter?.(region.id)}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${region.visual.bgGradient} opacity-90`} />

      {/* Pattern overlay */}
      {region.visual.pattern === 'circuit' && (
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M0 20h15M25 20h15M20 0v15M20 25v15' stroke='%233b82f6' stroke-width='1'/%3E%3Ccircle cx='20' cy='20' r='3' fill='%233b82f6'/%3E%3C/svg%3E")`,
          }}
        />
      )}
      {region.visual.pattern === 'grid' && (
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Crect width='20' height='20' fill='none' stroke='%23ef4444' stroke-width='0.5'/%3E%3C/svg%3E")`,
          }}
        />
      )}

      {/* Active beacon pulse */}
      {isActive && (
        <div
          className="absolute top-4 right-4 w-3 h-3 rounded-full animate-pulse"
          style={{ backgroundColor: region.visual.primaryColor, boxShadow: `0 0 10px ${region.visual.primaryColor}` }}
        />
      )}

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-4xl mb-2">{region.visual.icon}</div>
            <h3 className="text-xl font-black text-white tracking-tight">{region.name}</h3>
            <p className="text-sm font-mono" style={{ color: region.visual.accentColor }}>
              {region.subtitle}
            </p>
          </div>
          {isActive && (
            <span className="text-[10px] font-bold font-mono uppercase px-2 py-1 rounded border"
              style={{
                color: region.visual.accentColor,
                borderColor: region.visual.primaryColor + '50',
                backgroundColor: region.visual.primaryColor + '20',
              }}>
              Current Region
            </span>
          )}
        </div>

        {/* Lore */}
        <p className="text-sm text-white/60 leading-relaxed mb-5 line-clamp-2">{region.lore}</p>

        {/* World State Events */}
        {region.worldStateEvents.length > 0 && (
          <div className="space-y-1 mb-5">
            {region.worldStateEvents.map((event, i) => (
              <div
                key={i}
                className="text-xs font-mono px-2.5 py-1.5 rounded-md inline-flex items-center mr-2"
                style={{
                  color: region.visual.accentColor,
                  backgroundColor: region.visual.primaryColor + '15',
                  borderLeft: `2px solid ${region.visual.primaryColor}`,
                }}
              >
                {event}
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-white/40">
            <Users className="w-3.5 h-3.5" />
            <span>{region.activeUsers.toLocaleString()} active</span>
          </div>
          <button
            className="flex items-center gap-1.5 text-xs font-bold font-mono px-3 py-1.5 rounded transition-all"
            style={{
              color: region.visual.accentColor,
              backgroundColor: region.visual.primaryColor + '20',
              border: `1px solid ${region.visual.primaryColor}40`,
            }}
          >
            Enter <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
