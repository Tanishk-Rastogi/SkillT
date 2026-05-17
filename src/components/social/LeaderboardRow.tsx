"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LeaderboardEntry } from "@/data/social";
import {
  Cpu, ShieldCheck, Sparkles, Network, Database, TrendingUp, Code2,
  Globe, Lock, Brain, Terminal, FileCode, Server, Star, Crown, Award, Medal, Zap
} from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Network: <Network className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Code2: <Code2 className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
  Lock: <Lock className="w-5 h-5" />,
  Brain: <Brain className="w-5 h-5" />,
  Terminal: <Terminal className="w-5 h-5" />,
  FileCode: <FileCode className="w-5 h-5" />,
  Server: <Server className="w-5 h-5" />,
};

const THEME_COLORS: Record<string, { border: string; glow: string; text: string; bg: string }> = {
  cyan:    { border: "border-cyber-cyan/60",   glow: "shadow-[0_0_20px_rgba(0,240,255,0.2)]",   text: "text-cyber-cyan",   bg: "bg-cyber-cyan/10" },
  purple:  { border: "border-cyber-purple/60", glow: "shadow-[0_0_20px_rgba(176,38,255,0.2)]", text: "text-cyber-purple", bg: "bg-cyber-purple/10" },
  amber:   { border: "border-amber-400/60",    glow: "shadow-[0_0_20px_rgba(251,191,36,0.2)]",  text: "text-amber-400",    bg: "bg-amber-400/10" },
  emerald: { border: "border-emerald-400/60",  glow: "shadow-[0_0_20px_rgba(52,211,153,0.2)]",  text: "text-emerald-400",  bg: "bg-emerald-400/10" },
  rose:    { border: "border-rose-400/60",     glow: "shadow-[0_0_20px_rgba(251,113,133,0.2)]", text: "text-rose-400",     bg: "bg-rose-400/10" },
};

const RARITY_BADGE: Record<string, string> = {
  Legendary: "text-amber-400 border-amber-400/40 bg-amber-400/10",
  Epic:      "text-cyber-purple border-cyber-purple/40 bg-cyber-purple/10",
  Rare:      "text-cyber-cyan border-cyber-cyan/40 bg-cyber-cyan/10",
  Common:    "text-gray-400 border-gray-400/30 bg-gray-400/10",
};

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <div className="relative flex items-center justify-center w-10 h-10 shrink-0">
        <motion.div
          animate={{ rotate: [0, 6, -6, 0] }}
          transition={{ repeat: Infinity, duration: 3.5 }}
        >
          <Crown className="w-8 h-8 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
        </motion.div>
        <span className="absolute -bottom-1 text-[9px] font-black text-amber-400 font-mono tracking-tighter">#1</span>
      </div>
    );
  }
  if (rank === 2) {
    return (
      <div className="flex items-center justify-center w-10 h-10 shrink-0">
        <div className="flex flex-col items-center">
          <Award className="w-7 h-7 text-slate-300 drop-shadow-[0_0_6px_rgba(226,232,240,0.6)]" />
          <span className="text-[9px] font-black text-slate-300 font-mono -mt-1">#2</span>
        </div>
      </div>
    );
  }
  if (rank === 3) {
    return (
      <div className="flex items-center justify-center w-10 h-10 shrink-0">
        <div className="flex flex-col items-center">
          <Medal className="w-7 h-7 text-amber-700 drop-shadow-[0_0_4px_rgba(180,83,9,0.5)]" />
          <span className="text-[9px] font-black text-amber-700 font-mono -mt-1">#3</span>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center w-10 h-10 shrink-0">
      <span className="text-sm font-black font-mono text-white/30">#{rank}</span>
    </div>
  );
}

function getRpgTier(level: number) {
  if (level >= 40) return { name: "Mythic Tier", color: "text-amber-400 border-amber-400/20 bg-amber-400/5" };
  if (level >= 30) return { name: "Elite Tier", color: "text-cyber-purple border-cyber-purple/20 bg-cyber-purple/5" };
  if (level >= 20) return { name: "Expert Tier", color: "text-cyber-cyan border-cyber-cyan/20 bg-cyber-cyan/5" };
  if (level >= 10) return { name: "Adept Tier", color: "text-emerald-400 border-emerald-400/20 bg-emerald-400/5" };
  return { name: "Initiate Tier", color: "text-slate-400 border-slate-400/20 bg-slate-400/5" };
}

interface LeaderboardRowProps {
  entry: LeaderboardEntry;
  isCurrentUser?: boolean;
  index: number;
}

export function LeaderboardRow({ entry, isCurrentUser, index }: LeaderboardRowProps) {
  const [isHovered, setIsHovered] = useState(false);

  const theme = THEME_COLORS[entry.themeColor] || THEME_COLORS.cyan;
  const rarityBadge = RARITY_BADGE[entry.titleRarity] || RARITY_BADGE.Common;
  const tier = getRpgTier(entry.level);

  const isRank1 = entry.rank === 1;
  const isRank2 = entry.rank === 2;
  const isRank3 = entry.rank === 3;
  const isLegendary = isRank1 || isRank2 || isRank3;

  // Determine material classes
  let materialClasses = "";
  if (isLegendary) {
    if (isRank1) {
      materialClasses = `border-l-4 border-l-amber-400 border-t border-r border-b ${isHovered ? 'border-amber-400/50 shadow-[0_0_24px_rgba(251,191,36,0.22)] bg-gradient-to-r from-amber-500/15' : 'border-amber-400/25 bg-gradient-to-r from-amber-500/10'} via-cyber-darker to-cyber-darker relative overflow-hidden transition-all duration-300`;
    } else if (isRank2) {
      materialClasses = `border-l-4 border-l-slate-300 border-t border-r border-b ${isHovered ? 'border-slate-300/40 shadow-[0_0_20px_rgba(148,163,184,0.15)] bg-gradient-to-r from-slate-300/12' : 'border-slate-300/20 bg-gradient-to-r from-slate-300/8'} via-cyber-darker to-cyber-darker relative overflow-hidden transition-all duration-300`;
    } else {
      materialClasses = `border-l-4 border-l-amber-700 border-t border-r border-b ${isHovered ? 'border-amber-700/40 shadow-[0_0_20px_rgba(180,83,9,0.15)] bg-gradient-to-r from-amber-800/12' : 'border-amber-700/20 bg-gradient-to-r from-amber-800/8'} via-cyber-darker to-cyber-darker relative overflow-hidden transition-all duration-300`;
    }
  } else if (isCurrentUser) {
    materialClasses = `border ${isHovered ? 'border-cyber-cyan shadow-[0_0_32px_rgba(0,240,255,0.35)] bg-gradient-to-r from-cyber-cyan/20' : 'border-cyber-cyan/70 bg-gradient-to-r from-cyber-cyan/15'} via-cyber-purple/10 to-cyber-darker shadow-[0_0_22px_rgba(0,240,255,0.22)] ring-1 ring-white/10 relative overflow-hidden transition-all duration-300`;
  } else {
    // Holographic Glass
    materialClasses = `backdrop-blur-md bg-slate-950/20 border ${isHovered ? 'border-cyber-cyan/45 bg-white/5 shadow-[0_8px_30px_rgba(0,240,255,0.08)]' : 'border-white/5 shadow-[0_4px_24px_rgba(0,0,0,0.25)]'} transition-all duration-300`;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{
        x: 4,
        scale: 1.01,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 cursor-pointer ${materialClasses}`}
    >
      {/* Energy Sweep Beam for Elite & Legendary / Current User Rows */}
      {isHovered && (isLegendary || isCurrentUser) && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none -skew-x-12 select-none z-10"
        />
      )}

      {/* Ambient background constellation pulse for Sovereign Rank 1 */}
      {isRank1 && (
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-25 pointer-events-none overflow-hidden select-none">
          <svg className="w-full h-full text-amber-400" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M 100 0 L 70 40 L 90 70 L 60 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              animate={isHovered ? { strokeDashoffset: [100, 0] } : {}}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            />
            <motion.circle
              cx="70" cy="40" r="2" fill="currentColor"
              animate={isHovered ? { r: [2, 4, 2], opacity: [0.7, 1, 0.7] } : {}}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
            <motion.circle
              cx="90" cy="70" r="1.5" fill="currentColor"
              animate={isHovered ? { r: [1.5, 3, 1.5], opacity: [0.7, 1, 0.7] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </svg>
        </div>
      )}

      {/* Ambient rising embers for Sovereign Rank 1 */}
      {isHovered && isRank1 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: "110%", x: `${20 + i * 20 + Math.random() * 10}%`, opacity: 0 }}
              animate={{ y: "-10%", opacity: [0, 0.8, 0] }}
              transition={{
                duration: 1.8 + Math.random() * 0.8,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeOut"
              }}
              className="absolute w-1 h-1 rounded-full bg-amber-400/60 blur-[0.5px]"
            />
          ))}
        </div>
      )}

      {/* Dynamic Background Accents for Legendary / Energy materials */}
      {isRank1 && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_rgba(251,191,36,0.15),_transparent_40%)] pointer-events-none select-none" />
      )}
      {isCurrentUser && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_rgba(6,182,212,0.15),_transparent_40%)] pointer-events-none select-none" />
      )}

      {/* Dynamic flowing highlights on Energy Cards */}
      {isCurrentUser && (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyber-cyan via-cyber-purple to-transparent opacity-80 animate-pulse" />
      )}

      {/* Rank Badge */}
      <RankBadge rank={entry.rank} />

      {/* Avatar (Enhanced Frame depending on Material) */}
      <div className="relative shrink-0">
        {isRank1 && (
          <div className="absolute -inset-1 bg-amber-400/35 rounded-lg blur-sm animate-pulse" />
        )}
        <div className={`relative w-10 h-10 rounded-lg border flex items-center justify-center
          ${isLegendary
            ? isRank1
              ? "border-amber-400/60 bg-amber-400/10 text-amber-400"
              : isRank2
                ? "border-slate-300/60 bg-slate-300/10 text-slate-300"
                : "border-amber-700/60 bg-amber-700/10 text-amber-600"
            : isCurrentUser
              ? "border-cyber-cyan bg-cyber-cyan/15 text-cyber-cyan"
              : `border-white/10 bg-white/5 text-cyber-muted`
          }`}
        >
          {ICON_MAP[entry.avatarIcon] || <Code2 className="w-5 h-5" />}
        </div>
      </div>

      {/* Identity Block (Mini Character Summary) */}
      <div className="flex-1 min-w-0">
        {/* Row 1: Username + Specialization Capsule + Title Rarity Badge */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`font-bold font-mono text-sm truncate
            ${isRank1
              ? "text-amber-400 text-glow-gold font-extrabold"
              : isCurrentUser
                ? "text-cyber-cyan text-glow-cyan"
                : "text-white"
            }`}
          >
            {entry.username}
          </span>
          {isCurrentUser && (
            <span className="text-[8px] font-black font-mono px-1.5 py-0.5 rounded bg-cyber-cyan/20 border border-cyber-cyan/40 text-cyber-cyan uppercase select-none animate-pulse">
              Active Build
            </span>
          )}
          <motion.span
            animate={isHovered ? {
              boxShadow: [
                "0 0 0px rgba(0,0,0,0)",
                isRank1
                  ? "0 0 10px rgba(251,191,36,0.4)"
                  : isCurrentUser
                    ? "0 0 10px rgba(6,182,212,0.4)"
                    : "0 0 8px rgba(255,255,255,0.3)",
                "0 0 0px rgba(0,0,0,0)"
              ],
              opacity: [1, 0.8, 1]
            } : {}}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className={`text-[9px] font-bold font-mono px-2 py-0.5 rounded-full border ${rarityBadge} select-none`}
          >
            {entry.activeTitle}
          </motion.span>
          <span className="text-[9px] font-bold font-mono px-1.5 py-0.5 rounded border border-cyber-cyan/20 bg-cyber-cyan/5 text-cyber-cyan uppercase select-none">
            {entry.specializationBadge}
          </span>
        </div>

        {/* Row 2: Dynamic Storytelling Subtitle (Primary Narrative Reading Anchor) */}
        <div className="text-sm font-semibold tracking-wider text-white/90 mt-1 flex items-center gap-2 flex-wrap">
          <span>{entry.dynamicSubtitle}</span>
          <span className="text-white/40 font-mono text-xs select-none">·</span>
          <span className="text-cyber-muted text-xs font-mono">{entry.activeClass}</span>
          <span className="text-white/20 font-mono text-xs select-none">|</span>
          <span className="text-white/50 text-[11px] font-mono">{entry.dominantDomain}</span>
        </div>

        {/* Row 3: Historic Milestone Log / Recent Feat */}
        <div className="text-[10px] text-cyber-muted font-mono mt-1 flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded border border-white/5">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyber-cyan"></span>
            </span>
            <span className="text-white/70">Recent Feat:</span>
            <span className="text-cyber-cyan/90">{entry.recentFeat}</span>
          </span>
          <span className="opacity-30">|</span>
          <span className="text-white/60">{entry.milestoneLog}</span>
        </div>
      </div>

      {/* RPG Attribute Grid (Supporting Hard Metrics) */}
      <div className="hidden lg:flex items-center gap-4 shrink-0 text-right">
        {/* RPG Tier */}
        <div className="px-2.5 py-1 rounded border border-white/5 bg-slate-900/30 text-center min-w-[110px]">
          <div className={`text-[10px] font-black font-mono uppercase tracking-wider ${tier.color.split(' ')[0]}`}>
            {tier.name.replace(" Tier", "")}
          </div>
          <div className="text-[9px] text-cyber-muted font-mono mt-0.5">Lvl {entry.level}</div>
        </div>

        {/* Verified Skills */}
        <div className="px-2 py-1 rounded border border-white/5 bg-slate-900/30 text-center min-w-[85px]">
          <div className="text-xs font-bold text-white font-mono">{entry.verifiedSkillCount}</div>
          <div className="text-[8px] text-cyber-muted font-mono uppercase tracking-wider mt-0.5">Verified</div>
        </div>

        {/* Streak */}
        <div className="px-2 py-1 rounded border border-white/5 bg-slate-900/30 text-center min-w-[75px]">
          <div className="text-xs font-bold text-amber-500 font-mono flex items-center justify-center gap-0.5">
            <Zap className="w-3 h-3 text-amber-500 fill-amber-500/20" />
            {entry.streakDays}d
          </div>
          <div className="text-[8px] text-cyber-muted font-mono uppercase tracking-wider mt-0.5">Streak</div>
        </div>

        {/* Prestige Score */}
        <div className="min-w-[100px] px-2 py-1 rounded border border-white/5 bg-slate-950/40 text-center relative overflow-hidden transition-all duration-300">
          <motion.div
            animate={isHovered ? {
              scale: 1.05,
              textShadow: isRank1
                ? "0 0 12px rgba(251,191,36,0.8)"
                : isRank2
                  ? "0 0 12px rgba(226,232,240,0.6)"
                  : isRank3
                    ? "0 0 12px rgba(180,83,9,0.6)"
                    : isCurrentUser
                      ? "0 0 12px rgba(0,240,255,0.8)"
                      : "0 0 8px rgba(255,255,255,0.5)",
            } : {}}
            transition={{ duration: 0.2 }}
            className={`text-xs font-black font-mono relative z-10
              ${isRank1
                ? "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                : isRank2
                  ? "text-slate-300"
                  : isRank3
                    ? "text-amber-700"
                    : isCurrentUser
                      ? "text-cyber-cyan text-glow-cyan"
                      : "text-white/90"
              }`}
          >
            {entry.prestigeScore.toLocaleString()}
          </motion.div>

          {/* Subtle text shimmer on hover */}
          {isHovered && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none mix-blend-overlay z-0"
            />
          )}

          <div className="text-[8px] text-cyber-muted font-mono uppercase tracking-wider mt-0.5 relative z-10">Prestige</div>
        </div>
      </div>
    </motion.div>
  );
}
