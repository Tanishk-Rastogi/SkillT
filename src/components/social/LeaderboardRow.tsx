"use client";

import { motion } from "framer-motion";
import { LeaderboardEntry } from "@/data/social";
import {
  Cpu, ShieldCheck, Sparkles, Network, Database, TrendingUp, Code2,
  Globe, Lock, Brain, Terminal, FileCode, Server, Star, Crown, Award, Medal
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
  Star: <Star className="w-5 h-5" />,
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
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <Crown className="w-8 h-8 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
        </motion.div>
        <span className="absolute -bottom-1 text-[9px] font-black text-amber-400 font-mono">#1</span>
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
      <span className="text-lg font-black font-mono text-white/30">#{rank}</span>
    </div>
  );
}

interface LeaderboardRowProps {
  entry: LeaderboardEntry;
  isCurrentUser?: boolean;
  index: number;
}

export function LeaderboardRow({ entry, isCurrentUser, index }: LeaderboardRowProps) {
  const theme = THEME_COLORS[entry.themeColor] || THEME_COLORS.cyan;
  const rarityBadge = RARITY_BADGE[entry.titleRarity] || RARITY_BADGE.Common;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 cursor-pointer
        ${isCurrentUser
          ? `${theme.border} ${theme.glow} ${theme.bg} ring-1 ring-inset ring-white/10`
          : "border-white/5 bg-white/2 hover:border-white/15 hover:bg-white/5"
        }`}
    >
      {/* Rank */}
      <RankBadge rank={entry.rank} />

      {/* Avatar */}
      <div className={`w-10 h-10 rounded-lg border ${theme.border} ${theme.bg} flex items-center justify-center shrink-0 ${theme.text}`}>
        {ICON_MAP[entry.avatarIcon] || <Code2 className="w-5 h-5" />}
      </div>

      {/* Identity */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`font-bold font-mono text-sm truncate ${isCurrentUser ? theme.text : "text-white"}`}>
            {entry.username}
          </span>
          {isCurrentUser && (
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white/60">YOU</span>
          )}
          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${rarityBadge}`}>
            {entry.activeTitle}
          </span>
        </div>
        <div className="text-[11px] text-cyber-muted font-mono mt-0.5 flex items-center gap-2">
          <span>{entry.activeClass}</span>
          <span className="opacity-40">·</span>
          <span>{entry.dominantDomain}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="hidden md:flex items-center gap-5 shrink-0 text-right">
        <div>
          <div className="text-xs font-bold text-white font-mono">{entry.level}</div>
          <div className="text-[9px] text-cyber-muted font-mono uppercase">Lvl</div>
        </div>
        <div>
          <div className="text-xs font-bold text-white font-mono">{entry.verifiedSkillCount}</div>
          <div className="text-[9px] text-cyber-muted font-mono uppercase">Verified</div>
        </div>
        <div>
          <div className="text-xs font-bold text-amber-400 font-mono">{entry.streakDays}d</div>
          <div className="text-[9px] text-cyber-muted font-mono uppercase">Streak</div>
        </div>
        <div className="min-w-[80px]">
          <div className={`text-sm font-black font-mono ${entry.rank <= 3 ? "text-amber-400" : theme.text}`}>
            {entry.prestigeScore.toLocaleString()}
          </div>
          <div className="text-[9px] text-cyber-muted font-mono uppercase">Prestige</div>
        </div>
      </div>
    </motion.div>
  );
}
