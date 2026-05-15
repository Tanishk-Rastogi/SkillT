'use client';

import React, { useState, useMemo } from 'react';
import { REGIONS, AI_MENTORS, HIDDEN_PATHS } from '@/data/worldLore';
import { WorldEngine } from '@/lib/WorldEngine';
import { useAuth } from '@/components/layout/AuthProvider';
import { RegionCard } from './RegionCard';
import { MentorEncounter } from './MentorEncounter';
import { ProgressionTierBadge } from './ProgressionTierBadge';
import { Globe, Map, Sparkles, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export const WorldMap: React.FC = () => {
  const { user } = useAuth();
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);
  const [mentorOpen, setMentorOpen] = useState(false);

  const worldPosition = useMemo(() => {
    if (!user) return null;
    return WorldEngine.getWorldPosition(user);
  }, [user]);

  const selectedRegion = REGIONS.find(r => r.id === selectedRegionId);
  const selectedMentor = selectedRegion
    ? AI_MENTORS.find(m => m.regionId === selectedRegion.id)
    : null;

  const handleEnterRegion = (regionId: string) => {
    setSelectedRegionId(regionId);
    setMentorOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Header */}
      <div className="relative overflow-hidden border-b border-white/5">
        {/* Ambient background */}
        <div className="absolute inset-0 pointer-events-none">
          {worldPosition && (
            <div
              className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[150px] opacity-20"
              style={{ backgroundColor: worldPosition.currentRegion.visual.primaryColor }}
            />
          )}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-6 h-6 text-slate-400" />
                <span className="text-xs font-mono uppercase tracking-widest text-slate-500">The World of SkillT</span>
              </div>
              <h1 className="text-5xl font-black tracking-tight mb-3">
                Choose Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                  Region
                </span>
              </h1>
              <p className="text-slate-400 max-w-xl leading-relaxed">
                Each Region is a living civilization of skills, challenges, and mentors.
                Your progression determines where you belong. Your choices shape who you become.
              </p>
            </div>

            {/* World Position Panel */}
            {worldPosition && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900/80 border border-white/10 rounded-2xl p-5 shrink-0 min-w-[260px] backdrop-blur"
              >
                <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" /> Your World Position
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-3xl">{worldPosition.currentRegion.visual.icon}</div>
                  <div>
                    <div className="font-bold text-white">{worldPosition.currentRegion.name}</div>
                    <div className="text-xs font-mono" style={{ color: worldPosition.currentRegion.visual.accentColor }}>
                      {worldPosition.faction.name}
                    </div>
                  </div>
                </div>
                <div className="border-t border-white/5 pt-3">
                  <ProgressionTierBadge tier={worldPosition.tier} size="sm" />
                </div>
                {worldPosition.hiddenPaths.length > 0 && (
                  <div className="mt-3 border-t border-white/5 pt-3">
                    <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold font-mono">
                      <Sparkles className="w-3 h-3" />
                      {worldPosition.hiddenPaths.length} Hidden Path{worldPosition.hiddenPaths.length > 1 ? 's' : ''} Discovered!
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Region Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {REGIONS.map((region, i) => (
            <motion.div
              key={region.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <RegionCard
                region={region}
                isActive={worldPosition?.currentRegion.id === region.id}
                onEnter={handleEnterRegion}
              />
            </motion.div>
          ))}
        </div>

        {/* Hidden Paths Section */}
        {worldPosition && worldPosition.hiddenPaths.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl font-black text-white">Hidden Paths Discovered</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {worldPosition.hiddenPaths.map(path => (
                <div
                  key={path.id}
                  className="p-5 rounded-xl border border-amber-500/20 bg-amber-900/10"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-amber-400 font-bold">{path.name}</span>
                    <span className="text-[10px] text-amber-300/70 font-mono uppercase bg-amber-900/30 px-2 py-0.5 rounded border border-amber-500/20">
                      {path.rarity}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{path.description}</p>
                  <div className="mt-3 text-xs text-amber-400 font-mono">
                    → Unlocks: <span className="text-white">{path.unlocksTitle}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progression Hierarchy */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Map className="w-5 h-5 text-slate-400" />
            <h2 className="text-xl font-black text-white">Progression Hierarchy</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(['novice', 'adept', 'architect', 'sovereign'] as const).map(tierId => {
              const { PROGRESSION_TIERS } = require('@/data/worldLore');
              const tier = PROGRESSION_TIERS.find((t: any) => t.id === tierId);
              if (!tier) return null;
              const isCurrent = worldPosition?.tier.id === tierId;
              return (
                <div
                  key={tierId}
                  className={`p-5 rounded-xl border transition-all ${
                    isCurrent ? 'border-white/20 bg-white/5' : 'border-white/5 bg-white/[0.02] opacity-60'
                  }`}
                >
                  <ProgressionTierBadge tier={tier} size="sm" showPerks={isCurrent} />
                  {!isCurrent && (
                    <p className="text-xs text-slate-500 mt-3 font-mono">
                      Lv {tier.levelRange[0]}–{tier.levelRange[1]}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mentor Encounter Modal */}
      {selectedRegion && selectedMentor && (
        <MentorEncounter
          mentor={selectedMentor}
          region={selectedRegion}
          isOpen={mentorOpen}
          onClose={() => setMentorOpen(false)}
        />
      )}
    </div>
  );
};
