"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Challenge, ChallengeType, MASTERY_TIER_LABELS, getChallengesForSkill } from "@/data/challenges";
import {
  X, Sword, Timer, Bug, Crown, Zap, Clock, ChevronRight, Lock, Shield
} from "lucide-react";
import { useAuth } from "@/components/layout/AuthProvider";

const TYPE_META: Record<ChallengeType, { icon: React.ReactNode; label: string; color: string; description: string }> = {
  mini_project:      { icon: <Sword className="w-4 h-4" />,  label: "Mini Project",       color: "text-cyber-cyan border-cyber-cyan/40 bg-cyber-cyan/10",    description: "Build real applications" },
  timed_challenge:   { icon: <Timer className="w-4 h-4" />,  label: "Timed Challenge",    color: "text-amber-400 border-amber-400/40 bg-amber-400/10",       description: "Prove speed & fluency" },
  debugging_mission: { icon: <Bug className="w-4 h-4" />,    label: "Debug Mission",      color: "text-emerald-400 border-emerald-400/40 bg-emerald-400/10", description: "Technical detective work" },
  boss_battle:       { icon: <Crown className="w-4 h-4" />,  label: "Boss Battle",        color: "text-cyber-purple border-cyber-purple/40 bg-cyber-purple/10", description: "Multi-skill capstone trial" },
};

const RARITY_GLOW: Record<string, string> = {
  Legendary: "shadow-[0_0_30px_rgba(251,191,36,0.3)] border-amber-400/60",
  Epic:      "shadow-[0_0_20px_rgba(176,38,255,0.2)] border-cyber-purple/50",
  Rare:      "shadow-[0_0_15px_rgba(0,240,255,0.15)] border-cyber-cyan/40",
  Common:    "border-white/10",
};

const RARITY_BADGE: Record<string, string> = {
  Legendary: "text-amber-400 border-amber-400/40 bg-amber-400/10",
  Epic:      "text-cyber-purple border-cyber-purple/40 bg-cyber-purple/10",
  Rare:      "text-cyber-cyan border-cyber-cyan/40 bg-cyber-cyan/10",
  Common:    "text-gray-400 border-gray-400/30 bg-gray-400/10",
};

interface ChallengeHubProps {
  skillId: string;
  skillTitle: string;
  onClose: () => void;
  onAcceptChallenge: (challenge: Challenge) => void;
}

type TabFilter = 'all' | ChallengeType;

const TAB_FILTERS: { id: TabFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'mini_project', label: 'Projects' },
  { id: 'timed_challenge', label: 'Timed' },
  { id: 'debugging_mission', label: 'Debug' },
  { id: 'boss_battle', label: 'Boss' },
];

export function ChallengeHub({ skillId, skillTitle, onClose, onAcceptChallenge }: ChallengeHubProps) {
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState<TabFilter>('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const challenges = getChallengesForSkill(skillId);
  const completedIds = new Set(user?.completedChallenges?.map(c => c.challengeId) || []);

  const filtered = activeFilter === 'all' ? challenges : challenges.filter(c => c.type === activeFilter);

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
        className="fixed inset-x-4 bottom-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[720px] md:max-h-[85vh] z-[70] flex flex-col bg-cyber-darker/98 border border-white/10 rounded-t-2xl md:rounded-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative border-b border-white/10 p-6 bg-black/40 shrink-0">
          <div className="absolute inset-0 bg-gradient-to-r from-cyber-purple/10 via-transparent to-cyber-cyan/10 pointer-events-none" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyber-muted mb-1">
                <Shield className="w-3.5 h-3.5" /> CHALLENGE SYSTEM
              </div>
              <h2 className="text-2xl font-black font-mono tracking-wider text-white">
                PROVE <span className="text-cyber-cyan">{skillTitle.toUpperCase()}</span>
              </h2>
              <p className="text-sm text-cyber-muted mt-1">Select a mission to demonstrate real mastery. Completion earns XP and advances your mastery tier.</p>
            </div>
            <button onClick={onClose} className="p-2 text-cyber-muted hover:text-white rounded-lg hover:bg-white/5 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Type filter tabs */}
          <div className="flex gap-1 mt-4 overflow-x-auto scrollbar-hide">
            {TAB_FILTERS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all
                  ${activeFilter === tab.id
                    ? 'bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/30'
                    : 'text-cyber-muted hover:text-white hover:bg-white/5 border border-transparent'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Challenge list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-cyber-muted italic text-sm">No challenges in this category yet.</div>
          ) : (
            filtered.map((challenge, i) => {
              const meta = TYPE_META[challenge.type];
              const isCompleted = completedIds.has(challenge.id);
              const isBoss = challenge.isBossChallenge;

              return (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onMouseEnter={() => setHoveredId(challenge.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`relative p-4 rounded-xl border transition-all cursor-pointer
                    ${isCompleted ? 'opacity-60' : ''}
                    ${RARITY_GLOW[challenge.rarity]}
                    ${isBoss ? 'bg-cyber-purple/5' : 'bg-black/30'}
                    ${hoveredId === challenge.id && !isCompleted ? 'bg-white/5' : ''}`}
                  onClick={() => !isCompleted && onAcceptChallenge(challenge)}
                >
                  {/* Boss decoration */}
                  {isBoss && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyber-purple/10 via-amber-400/5 to-cyber-purple/10 rounded-xl pointer-events-none" />
                  )}

                  <div className="relative z-10 flex items-start gap-4">
                    {/* Type icon */}
                    <div className={`p-2.5 rounded-lg border shrink-0 mt-0.5 ${meta.color}`}>
                      {meta.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-bold text-white font-mono text-sm">{challenge.title}</span>
                        {isBoss && <Crown className="w-3.5 h-3.5 text-amber-400" />}
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-2">
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${RARITY_BADGE[challenge.rarity]}`}>
                          {challenge.rarity}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-white/60">
                          {meta.label}
                        </span>
                        {challenge.timeLimitMinutes && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-amber-400/30 bg-amber-400/10 text-amber-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {challenge.timeLimitMinutes}min
                          </span>
                        )}
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-white/5 bg-white/3 text-cyber-muted">
                          Unlocks: {MASTERY_TIER_LABELS[challenge.masteryAwarded].label}
                        </span>
                      </div>

                      <p className="text-xs text-cyber-muted leading-relaxed line-clamp-2">{challenge.narrative}</p>
                    </div>

                    {/* XP + Action */}
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <div className="text-right">
                        <div className="text-lg font-black text-cyber-green font-mono">+{challenge.xpReward}</div>
                        <div className="text-[9px] text-cyber-muted font-mono">XP REWARD</div>
                      </div>
                      {isCompleted ? (
                        <div className="flex items-center gap-1 text-[10px] text-cyber-green font-mono">
                          <Zap className="w-3 h-3" /> Done
                        </div>
                      ) : (
                        <motion.div
                          animate={hoveredId === challenge.id ? { x: 3 } : { x: 0 }}
                          className="text-cyber-cyan"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}

          {challenges.length === 0 && (
            <div className="text-center py-12">
              <Lock className="w-10 h-10 text-cyber-muted mx-auto mb-3 opacity-40" />
              <p className="text-sm text-cyber-muted italic">No challenges available for this skill yet.</p>
              <p className="text-xs text-cyber-muted/60 mt-1">Check back as the challenge library expands.</p>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
