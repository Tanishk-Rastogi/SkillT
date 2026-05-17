"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/components/layout/AuthProvider";
import { LeaderboardRow } from "@/components/social/LeaderboardRow";
import { ActivityFeed } from "@/components/social/ActivityFeed";
import { MOCK_PLAYERS, MOCK_FEED_EVENTS, computeUserPrestigeScore, LeaderboardEntry } from "@/data/social";
import { Trophy, Zap, Globe, Shield, Code2, Cpu, Users, Clock, TrendingUp, ShieldCheck, Sparkles, Network, Database, Lock, Brain, Terminal, FileCode, Server, Star, Crown, Award, Medal } from "lucide-react";

const AVATAR_ICONS: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="w-full h-full" />,
  ShieldCheck: <ShieldCheck className="w-full h-full" />,
  Sparkles: <Sparkles className="w-full h-full" />,
  Network: <Network className="w-full h-full" />,
  Database: <Database className="w-full h-full" />,
  TrendingUp: <TrendingUp className="w-full h-full" />,
  Code2: <Code2 className="w-full h-full" />,
  Globe: <Globe className="w-full h-full" />,
  Lock: <Lock className="w-full h-full" />,
  Brain: <Brain className="w-full h-full" />,
  Terminal: <Terminal className="w-full h-full" />,
  FileCode: <FileCode className="w-full h-full" />,
  Server: <Server className="w-full h-full" />,
  Star: <Star className="w-full h-full" />,
};

function PrestigeConstellation({ entries, step }: { entries: LeaderboardEntry[]; step: number }) {
  const p1 = entries[0];
  const p2 = entries[1];
  const p3 = entries[2];
  const p4 = entries[3];
  const p5 = entries[4];
  const p6 = entries[5];
  const p7 = entries[6];

  // Map coordinates to standard scale 1000 x 600
  const nodes = [
    { id: 1, x: 500, y: 140, entry: p1, color: "text-amber-400", glow: "rgba(251,191,36,0.6)", size: 9 },
    { id: 2, x: 310, y: 220, entry: p2, color: "text-cyan-400", glow: "rgba(34,211,238,0.5)", size: 7 },
    { id: 3, x: 690, y: 270, entry: p3, color: "text-purple-400", glow: "rgba(167,139,250,0.5)", size: 7 },
    { id: 4, x: 140, y: 350, entry: p4, color: "text-emerald-400", glow: "rgba(52,211,153,0.4)", size: 6 },
    { id: 5, x: 860, y: 380, entry: p5, color: "text-amber-500", glow: "rgba(245,158,11,0.4)", size: 6 },
    { id: 6, x: 80,  y: 120, entry: p6, color: "text-slate-400", glow: "rgba(255,255,255,0.2)", size: 4 },
    { id: 7, x: 920, y: 100, entry: p7, color: "text-slate-400", glow: "rgba(255,255,255,0.2)", size: 4 },
    // Auxiliary star points (non-players for structural completion)
    { id: 8, x: 260, y: 440, entry: null, color: "text-slate-600", glow: "rgba(255,255,255,0.1)", size: 3 },
    { id: 9, x: 740, y: 470, entry: null, color: "text-slate-600", glow: "rgba(255,255,255,0.1)", size: 3 },
    { id: 10, x: 500, y: 530, entry: null, color: "text-slate-600", glow: "rgba(255,255,255,0.1)", size: 3 },
  ];

  const constellationActive = step >= 1;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
      {/* Background Orbit Tracks (Slow rotating circles for space depth) */}
      <div 
        className="absolute inset-0 flex items-center justify-center transition-all duration-1000"
        style={{ opacity: constellationActive ? 0.25 : 0.05 }}
      >
        <div className="absolute w-[600px] h-[600px] border border-white/5 rounded-full animate-orbit-track-spin" />
        <div className="absolute w-[850px] h-[850px] border border-dashed border-white/5 rounded-full animate-orbit-track-spin" style={{ animationDuration: '140s', animationDirection: 'reverse' }} />
        <div className="absolute w-[1100px] h-[1100px] border border-double border-white/3 rounded-full animate-orbit-track-spin" style={{ animationDuration: '200s' }} />
      </div>

      {/* SVG Constellation Network */}
      <svg
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full mix-blend-screen transition-all duration-1000"
        style={{ opacity: constellationActive ? 0.45 : 0 }}
      >
        <defs>
          {/* Neon Glow Gradients */}
          <linearGradient id="path-gold-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffb547" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00e5a0" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="path-cyan-purple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00e5a0" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="path-purple-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffb547" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* CONNECTIVE PATHWAYS */}
        {constellationActive && (
          <>
            <path
              d="M 80 120 L 140 350 L 260 440 L 500 530 L 740 470 L 860 380 L 920 100"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1.2"
            />
            <path
              d="M 140 350 L 310 220 L 500 140 L 690 270 L 860 380"
              fill="none"
              stroke="url(#path-gold-cyan)"
              strokeWidth="1.8"
              strokeDasharray="8 15"
              className="animate-path-travel"
            />
            <path
              d="M 80 120 L 310 220 M 920 100 L 690 270"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1.2"
              strokeDasharray="5 10"
            />
            <path
              d="M 500 530 L 500 140"
              fill="none"
              stroke="url(#path-cyan-purple)"
              strokeWidth="1.5"
              strokeDasharray="6 20"
              className="animate-path-travel"
              style={{ animationDuration: '4s' }}
            />
            <path
              d="M 260 440 L 310 220 M 740 470 L 690 270"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1.2"
            />
          </>
        )}

        {/* GLOWING NODES */}
        {constellationActive && nodes.map(node => {
          const colorClass = node.color;
          return (
            <g key={node.id} className={colorClass}>
              {/* Outer soft glowing aura */}
              <circle
                cx={node.x}
                cy={node.y}
                r={node.size * 3}
                fill="currentColor"
                opacity="0.15"
                className="animate-node-glow-breath"
                style={{ animationDelay: `${node.id * 0.4}s` }}
              />
              {/* Mid glowing core */}
              <circle
                cx={node.x}
                cy={node.y}
                r={node.size * 1.5}
                fill="currentColor"
                opacity="0.3"
                className="animate-pulse"
                style={{ animationDelay: `${node.id * 0.2}s` }}
              />
              {/* Pinpoint core star */}
              <circle
                cx={node.x}
                cy={node.y}
                r={node.size * 0.6}
                fill="#ffffff"
                className="animate-ping"
                style={{ animationDuration: '4s', animationDelay: `${node.id * 0.5}s` }}
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={node.size * 0.6}
                fill="#ffffff"
              />

            </g>
          );
        })}
      </svg>
    </div>
  );
}

function LeaderboardPodium({ entries, step }: { entries: LeaderboardEntry[]; step: number }) {
  const rank1 = entries[0];
  const rank2 = entries[1];
  const rank3 = entries[2];

  const getRpgTier = (level: number) => {
    if (level >= 40) return { name: "Mythic Tier", color: "text-amber-400" };
    if (level >= 30) return { name: "Elite Tier", color: "text-cyber-purple" };
    if (level >= 20) return { name: "Expert Tier", color: "text-cyber-cyan" };
    if (level >= 10) return { name: "Adept Tier", color: "text-emerald-400" };
    return { name: "Initiate Tier", color: "text-slate-400" };
  };

  if (!rank1) return null;

  const showPodium = step >= 4;
  const isSettled = step >= 5;

  return (
    <div className="mt-14 mb-6 flex flex-col md:flex-row items-stretch md:items-end justify-center gap-6 md:gap-6 max-w-4xl mx-auto px-4 relative z-10 select-none">
      
      {/* ── RANK #2 pedestal (Left) ──────────────────────── */}
      {rank2 && (
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.92 }}
          animate={showPodium ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 80, scale: 0.92 }}
          whileHover={isSettled ? { y: -8, scale: 1.03 } : undefined}
          transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 90, damping: 15 }}
          className="order-2 md:order-1 flex-1 relative flex flex-col items-center justify-end min-h-[260px] rounded-t-2xl border border-b-0 border-slate-400/40 bg-gradient-to-t from-slate-900/90 via-slate-800/40 to-slate-500/10 px-4 pb-5 pt-8 shadow-[0_15px_40px_rgba(6,182,212,0.12)] group cursor-pointer"
        >
          {/* Subtle Cyber-Cyan Backlight */}
          <div className="absolute -inset-1 bg-gradient-to-t from-cyan-500/5 to-transparent blur-xl opacity-50 pointer-events-none rounded-t-2xl transition-all duration-300 group-hover:opacity-80" />

          {/* Pedestal Tag */}
          <div className="absolute top-3 right-3 text-[10px] font-black font-mono text-slate-300 tracking-wider bg-slate-300/10 border border-slate-300/30 px-2 py-0.5 rounded">
            RANK #2
          </div>

          {/* Avatar Structure */}
          <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 via-slate-300/40 to-transparent rounded-xl rotate-45 border border-slate-300/40 group-hover:rotate-90 transition-transform duration-700" />
            <div className="relative w-11 h-11 bg-cyber-dark border border-slate-400/50 rounded-lg flex items-center justify-center text-slate-300 shadow-[0_0_12px_rgba(148,163,184,0.3)]">
              {AVATAR_ICONS[rank2.avatarIcon] || <Code2 className="w-6 h-6" />}
            </div>
            <Award className="absolute -bottom-1 -right-1 w-5 h-5 text-slate-300 drop-shadow-[0_0_4px_rgba(226,232,240,0.6)]" />
          </div>

          {/* Identity details */}
          <h3 className="font-mono font-bold text-base text-slate-200 text-center truncate max-w-full">
            {rank2.username}
          </h3>
          <p className="text-[10px] font-mono text-cyber-cyan text-glow-cyan mt-0.5 tracking-wider uppercase">
            {rank2.specializationBadge}
          </p>

          <div className="text-[11px] font-bold font-display text-white/90 text-center mt-2 max-w-full px-2 truncate leading-snug">
            {rank2.dynamicSubtitle}
          </div>

          <div className="mt-1.5 text-[9px] font-mono text-slate-400 italic text-center max-w-full px-2 truncate">
            {rank2.recentFeat}
          </div>

          <div className="mt-3.5 flex items-center gap-2 text-[10px] font-mono text-cyber-muted bg-white/3 border border-white/5 px-2.5 py-1 rounded-md">
            <span className="text-cyan-400 font-bold uppercase">{getRpgTier(rank2.level).name.replace(" Tier", "")}</span>
            <span className="opacity-30">•</span>
            <span>{rank2.dominantDomain.split(' ')[0]}</span>
          </div>

          <div className="mt-4 text-center">
            <span className="text-lg font-black font-mono text-slate-300 tracking-wide">
              {rank2.prestigeScore.toLocaleString()}
            </span>
            <span className="block text-[8px] font-mono uppercase text-cyber-muted tracking-wider mt-0.5">Prestige Pts</span>
          </div>
        </motion.div>
      )}

      {/* ── RANK #1 pedestal (Center) ───────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 90, scale: 0.92 }}
        animate={showPodium ? { opacity: 1, y: -20, scale: 1.06 } : { opacity: 0, y: 90, scale: 0.92 }}
        whileHover={isSettled ? { y: -32, scale: 1.10 } : undefined}
        transition={{ duration: 0.7, delay: 0.1, type: "spring", stiffness: 90, damping: 15 }}
        className="order-1 md:order-2 flex-1 min-w-[280px] relative flex flex-col items-center justify-end min-h-[320px] rounded-t-3xl border-2 border-b-0 border-amber-400/50 bg-gradient-to-b from-amber-500/20 via-cyber-dark/95 to-cyber-darker px-5 pb-6 pt-10 shadow-[0_25px_80px_rgba(139,92,246,0.25),_0_0_120px_rgba(6,182,212,0.12)] group cursor-pointer z-20"
      >
        {/* Floating Crown Orbit */}
        {isSettled && (
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-20 h-20 pointer-events-none select-none">
            <div className="absolute inset-0 border border-dashed border-amber-400/40 rounded-full animate-spin-slow" style={{ transform: 'rotateX(68deg) rotateY(12deg)' }} />
            <div className="absolute inset-2 border-2 border-double border-purple-400/30 rounded-full animate-spin-reverse-slow" style={{ transform: 'rotateX(68deg) rotateY(12deg)' }} />
            <span className="absolute top-1 left-4 w-1 h-1 bg-amber-400 rounded-full animate-ping" />
            <span className="absolute bottom-1 right-4 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.7s' }} />
            <span className="absolute top-1/2 right-1 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '1.4s' }} />
          </div>
        )}

        {/* Floating Particle Beams inside Pedestal */}
        <div className="absolute inset-0 overflow-hidden rounded-t-3xl pointer-events-none">
          <div className="absolute -inset-4 bg-gradient-to-t from-purple-500/10 via-amber-500/10 to-transparent blur-3xl opacity-70 animate-beam-shimmer" />
          {isSettled && (
            <>
              <div className="absolute bottom-4 left-1/5 w-1.5 h-1.5 bg-amber-400/50 rounded-full animate-particle-rise-slow" />
              <div className="absolute bottom-4 left-2/5 w-1.5 h-1.5 bg-purple-400/30 rounded-full animate-particle-rise-fast" style={{ animationDelay: '2s' }} />
              <div className="absolute bottom-4 right-1/4 w-1.5 h-1.5 bg-cyan-400/50 rounded-full animate-particle-rise-slow" style={{ animationDelay: '4s' }} />
              <div className="absolute bottom-4 right-1/2 w-1.5 h-1.5 bg-amber-300/40 rounded-full animate-particle-rise-fast" style={{ animationDelay: '1s' }} />
            </>
          )}
        </div>

        {/* Crown of Supremacy Badge */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-purple-600 text-[10px] font-black font-mono text-white px-3 py-1 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.6)] border border-amber-300/40 tracking-wider flex items-center gap-1 uppercase select-none">
          <Crown className="w-3 h-3 text-amber-200 animate-bounce" /> SOVEREIGN
        </div>

        {/* Avatar Structure */}
        <div className="relative w-20 h-20 mb-4 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-purple-500 to-cyan-400 rounded-2xl rotate-45 animate-pulse border border-white/20 shadow-[0_0_20px_rgba(251,191,36,0.4)] group-hover:scale-105 duration-300" />
          <div className="absolute inset-1.5 bg-cyber-darker rounded-xl rotate-45" />
          <div className="relative w-13 h-13 bg-gradient-to-tr from-amber-500/10 to-purple-500/10 border border-amber-400/40 rounded-lg flex items-center justify-center text-amber-400 text-glow-accent">
            <div className="w-7 h-7">
              {AVATAR_ICONS[rank1.avatarIcon] || <Code2 className="w-full h-full" />}
            </div>
          </div>
          <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-amber-500 border border-amber-300 flex items-center justify-center text-[9px] font-black text-cyber-darker font-mono shadow-md">
            L{rank1.level}
          </div>
        </div>

        {/* Identity details */}
        <h3 className="font-mono font-black text-lg text-white text-center tracking-wide truncate max-w-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {rank1.username}
        </h3>
        
        <div className="mt-1.5 flex flex-col items-center">
          <p className="text-xs font-mono font-bold text-amber-400 text-glow-accent uppercase tracking-wider">
            {rank1.specializationBadge}
          </p>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded border border-amber-500/30 bg-amber-500/5 text-amber-300 font-bold uppercase tracking-wider mt-1">
            {rank1.activeTitle}
          </span>
        </div>

        <div className="text-sm font-bold font-display text-white text-center mt-3 max-w-full px-4 leading-snug drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
          {rank1.dynamicSubtitle}
        </div>

        <div className="mt-1.5 text-[10px] font-mono text-amber-300/80 italic text-center max-w-full px-4">
          ⚡ {rank1.recentFeat}
        </div>
        <div className="mt-1 text-[9px] font-mono text-purple-300 text-center max-w-full px-4">
          {rank1.milestoneLog}
        </div>

        <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-cyber-muted bg-white/5 border border-white/10 px-3 py-1 rounded-md">
          <span className="text-amber-400 font-black tracking-wider">{getRpgTier(rank1.level).name.toUpperCase()}</span>
          <span className="opacity-30">•</span>
          <span>{rank1.dominantDomain}</span>
          <span className="opacity-30">•</span>
          <span className="text-amber-400 font-bold">{rank1.verifiedSkillCount} VERIFIED</span>
        </div>

        <div className="mt-5 text-center relative z-10">
          <span className="text-2xl font-black font-mono text-amber-400 text-glow-accent tracking-wider">
            {rank1.prestigeScore.toLocaleString()}
          </span>
          <span className="block text-[9px] font-mono uppercase text-purple-300 tracking-wider mt-0.5 font-bold">Prestige Score</span>
        </div>
      </motion.div>

      {/* ── RANK #3 pedestal (Right) ─────────────────────── */}
      {rank3 && (
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.92 }}
          animate={showPodium ? { opacity: 1, y: 12, scale: 0.98 } : { opacity: 0, y: 80, scale: 0.92 }}
          whileHover={isSettled ? { y: 4, scale: 1.01 } : undefined}
          transition={{ duration: 0.7, delay: 0.3, type: "spring", stiffness: 90, damping: 15 }}
          className="order-3 flex-1 relative flex flex-col items-center justify-end min-h-[230px] rounded-t-2xl border border-b-0 border-amber-800/40 bg-gradient-to-t from-purple-900/20 via-cyber-dark/95 to-purple-500/10 px-4 pb-5 pt-7 shadow-[0_10px_35px_rgba(167,139,250,0.08)] group cursor-pointer"
        >
          {/* Subtle Deep Purple Backlight */}
          <div className="absolute -inset-1 bg-gradient-to-t from-purple-500/5 to-transparent blur-xl opacity-40 pointer-events-none rounded-t-2xl transition-all duration-300 group-hover:opacity-75" />

          {/* Pedestal Tag */}
          <div className="absolute top-3 right-3 text-[10px] font-black font-mono text-amber-700 tracking-wider bg-amber-700/10 border border-amber-700/25 px-2 py-0.5 rounded">
            RANK #3
          </div>

          {/* Avatar Structure */}
          <div className="relative w-14 h-14 mb-3.5 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 via-amber-800/40 to-transparent rounded-xl rotate-12 border border-amber-800/30 group-hover:rotate-45 transition-transform duration-700" />
            <div className="relative w-9.5 h-9.5 bg-cyber-dark border border-amber-800/40 rounded-lg flex items-center justify-center text-amber-600 shadow-[0_0_10px_rgba(180,83,9,0.2)]">
              {AVATAR_ICONS[rank3.avatarIcon] || <Code2 className="w-5 h-5" />}
            </div>
            <Medal className="absolute -bottom-1 -right-1 w-4.5 h-4.5 text-amber-700 drop-shadow-[0_0_3px_rgba(180,83,9,0.4)]" />
          </div>

          {/* Identity details */}
          <h3 className="font-mono font-bold text-sm text-slate-300 text-center truncate max-w-full">
            {rank3.username}
          </h3>
          <p className="text-[9px] font-mono text-cyber-purple text-glow-purple mt-0.5 tracking-wider uppercase">
            {rank3.specializationBadge}
          </p>

          <div className="text-[11px] font-bold font-display text-white/90 text-center mt-2 max-w-full px-2 truncate leading-snug">
            {rank3.dynamicSubtitle}
          </div>

          <div className="mt-1.5 text-[9px] font-mono text-slate-400 italic text-center max-w-full px-2 truncate">
            {rank3.recentFeat}
          </div>

          <div className="mt-3.5 flex items-center gap-2 text-[9px] font-mono text-cyber-muted bg-white/2 border border-white/5 px-2.5 py-0.5 rounded-md">
            <span className="text-purple-400 font-bold uppercase">{getRpgTier(rank3.level).name.replace(" Tier", "")}</span>
            <span className="opacity-30">•</span>
            <span>{rank3.dominantDomain.split(' ')[0]}</span>
          </div>

          <div className="mt-3.5 text-center">
            <span className="text-base font-black font-mono text-amber-700 tracking-wide">
              {rank3.prestigeScore.toLocaleString()}
            </span>
            <span className="block text-[8px] font-mono uppercase text-cyber-muted tracking-wider mt-0.5">Prestige Pts</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}

type LeaderboardTab = "global" | "webdev" | "ai" | "cyber" | "devops" | "weekly" | "friends";

const TABS: { id: LeaderboardTab; label: string; icon: React.ReactNode }[] = [
  { id: "global",  label: "Global",      icon: <Globe className="w-4 h-4" /> },
  { id: "webdev",  label: "Web Dev",     icon: <Code2 className="w-4 h-4" /> },
  { id: "ai",      label: "AI / ML",     icon: <Cpu className="w-4 h-4" /> },
  { id: "cyber",   label: "Cyber",       icon: <Shield className="w-4 h-4" /> },
  { id: "devops",  label: "DevOps",      icon: <Zap className="w-4 h-4" /> },
  { id: "weekly",  label: "Weekly",      icon: <Clock className="w-4 h-4" /> },
  { id: "friends", label: "Friends",     icon: <Users className="w-4 h-4" /> },
];

const DOMAIN_FILTER: Partial<Record<LeaderboardTab, string>> = {
  webdev: "Web Development",
  ai:     "AI / Machine Learning",
  cyber:  "Cybersecurity",
  devops: "DevOps",
};

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<LeaderboardTab>("global");
  const [step, setStep] = useState(0);

  // Prestige Choreography Timing Sequence
  useEffect(() => {
    // 0ms: Dimming world
    const t1 = setTimeout(() => setStep(1), 500);   // 500ms: Connect constellation
    const t2 = setTimeout(() => setStep(2), 1400);  // 1400ms: Energy Sweep across viewport
    const t3 = setTimeout(() => setStep(3), 2300);  // 2300ms: Converging progress sparks
    const t4 = setTimeout(() => setStep(4), 3200);  // 3200ms: Materialize pedestals slide-up
    const t5 = setTimeout(() => setStep(5), 4400);  // 4400ms: Stabilize glows & load list
    const t6 = setTimeout(() => setStep(6), 5200);  // 5200ms: Calm complete interactive state

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, []);

  // Build the current user's leaderboard entry
  const userEntry: LeaderboardEntry | null = useMemo(() => {
    if (!user) return null;
    const score = computeUserPrestigeScore(
      user.xp,
      user.level,
      user.verifications?.length || 0,
      user.streakDays || 0,
      user.activeTitle?.rarity || "Common",
      user.unlockedClasses?.length || 0,
    );
    return {
      rank: 0,
      userId: user.id,
      username: user.username,
      level: user.level,
      xp: user.xp,
      activeClass: user.activeClass?.name || "Builder",
      activeTitle: user.activeTitle?.name || "Novice Coder",
      titleRarity: (user.activeTitle?.rarity || "Common") as LeaderboardEntry["titleRarity"],
      dominantDomain: user.dominantDomain || "Undecided",
      verifiedSkillCount: user.verifications?.length || 0,
      streakDays: user.streakDays || 0,
      weeklyXp: user.xp,
      prestigeScore: score,
      avatarIcon: "Code2",
      themeColor: "cyan",
      specializationBadge: user.activeClass?.name || "Neural Driver",
      dynamicSubtitle: `Evolved in ${user.dominantDomain || "Neural Systems"}`,
      recentFeat: "Synchronized local workspace nodes",
      milestoneLog: "Initiated progression protocol",
    };
  }, [user]);

  // Build ranked list
  const rankedList = useMemo(() => {
    let base = [...MOCK_PLAYERS];

    if (activeTab === "weekly") {
      base = base.sort((a, b) => b.weeklyXp - a.weeklyXp);
    }

    const domainFilter = DOMAIN_FILTER[activeTab];
    if (domainFilter) {
      base = base.filter(p => p.dominantDomain === domainFilter);
    }

    if (activeTab === "friends") {
      base = base.slice(2, 8);
    }

    const allEntries = userEntry ? [...base, userEntry] : base;
    const sorted = allEntries.sort((a, b) => {
      if (activeTab === "weekly") return b.weeklyXp - a.weeklyXp;
      return b.prestigeScore - a.prestigeScore;
    });

    return sorted.map((entry, i) => ({ ...entry, rank: i + 1 }));
  }, [activeTab, userEntry]);

  // Merge user feed events
  const allFeedEvents = useMemo(() => {
    const userEvents = user?.feedEvents || [];
    return [...userEvents, ...MOCK_FEED_EVENTS]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 15);
  }, [user?.feedEvents]);

  const settled = step >= 5;

  return (
    <div className="min-h-screen bg-cyber-darker relative overflow-x-hidden">
      
      {/* ── HEADER HERO (Cinematic Layering with boot sequences) ── */}
      <div className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-cyber-darker via-cyber-dark to-cyber-darker py-10 md:py-16 transition-all duration-1000"
        style={{ filter: step === 0 ? "brightness(0.4) contrast(1.1)" : "brightness(1) contrast(1)" }}
      >
        
        {/* === BACKGROUND LAYER === */}
        <div className="absolute inset-0 opacity-5 pointer-events-none select-none" style={{
          backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 40px,rgba(255,255,255,.05) 40px,rgba(255,255,255,.05) 41px),repeating-linear-gradient(90deg,transparent,transparent 40px,rgba(255,255,255,.05) 40px,rgba(255,255,255,.05) 41px)'
        }} />
        
        {/* Deep prestige glow core */}
        <div className="absolute -top-[30%] left-1/2 -translate-x-1/2 w-[130%] h-[150%] bg-[radial-gradient(circle_at_top,_var(--prestige-gold-dim)_0%,_var(--accent-dim)_25%,_transparent_65%)] opacity-70 blur-3xl pointer-events-none select-none transition-all duration-[2000ms]"
          style={{ opacity: step >= 5 ? 0.7 : 0.15 }}
        />
        
        {/* Ambient floating sparks */}
        {settled && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            <div className="absolute top-[20%] left-[10%] w-1.5 h-1.5 bg-amber-400/25 rounded-full animate-float-gentle" style={{ animationDelay: '0.5s' }} />
            <div className="absolute top-[45%] right-[12%] w-2 h-2 bg-purple-400/15 rounded-full animate-float-gentle" style={{ animationDelay: '2.5s' }} />
            <div className="absolute bottom-[25%] left-[18%] w-1 h-1 bg-cyan-400/25 rounded-full animate-float-gentle" style={{ animationDelay: '1.2s' }} />
          </div>
        )}

        {/* === MIDGROUND LAYER (Prestige Constellation) === */}
        <PrestigeConstellation entries={rankedList} step={step} />

        {/* === FOREGROUND LAYER (Title + Podium Grid) === */}
        <div className="container mx-auto px-6 max-w-6xl relative z-20">
          


          {/* Horizontal energy sweep scan line */}
          {step === 2 && (
            <div 
              className="absolute left-0 right-0 h-1 z-40 pointer-events-none select-none opacity-0"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.9), rgba(167,139,250,0.9), rgba(6,182,212,0.9), transparent)',
                boxShadow: '0 0 15px 3px rgba(6,182,212,0.7)',
                animation: 'energy-sweep-across 0.9s cubic-bezier(0.4, 0, 0.2, 1) forwards',
              }}
            />
          )}

          {/* Converging progress sparks emitter */}
          {step === 3 && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-30 select-none">
              <div className="absolute top-[10%] left-[10%] w-2.5 h-2.5 bg-amber-400 rounded-full blur-[0.5px] animate-converge-1" />
              <div className="absolute top-[85%] left-[85%] w-2 h-2 bg-purple-400 rounded-full blur-[0.5px] animate-converge-2" />
              <div className="absolute top-[15%] right-[10%] w-2.5 h-2.5 bg-cyan-400 rounded-full blur-[0.5px] animate-converge-3" />
              <div className="absolute top-[75%] left-[15%] w-2 h-2 bg-emerald-400 rounded-full blur-[0.5px] animate-converge-4" />
              <div className="absolute top-[5%] left-[60%] w-2 h-2 bg-pink-400 rounded-full blur-[0.5px] animate-converge-5" />
              <div className="absolute bottom-[5%] left-[40%] w-2.5 h-2.5 bg-amber-300 rounded-full blur-[0.5px] animate-converge-6" />
            </div>
          )}

          {/* Enhanced Holographic Title Block */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8 mb-6 transition-all duration-1000 transform"
            style={{ opacity: step >= 1 ? 1 : 0.05, transform: step >= 1 ? "translateY(0)" : "translateY(-10px)" }}
          >
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="relative shrink-0">
                  <Trophy className="w-8 h-8 text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.9)] animate-pulse" />
                  <div className="absolute inset-0 w-8 h-8 bg-amber-400/20 blur-md rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                </div>
                <div>
                  <span className="text-[9px] font-black font-mono tracking-[0.08em] text-amber-500 uppercase block leading-none mb-1 select-none">
                    SEASON 04 · NEON ASCENSION
                  </span>
                  <h1 className="text-3xl md:text-4xl font-black font-mono tracking-wider text-white uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                    RANKINGS SANCTUM
                  </h1>
                </div>
              </div>
              <p className="text-cyber-muted font-mono text-xs md:text-sm ml-11 max-w-xl">
                Ascend the living mastery network. Dominance and public prestige updated in real-time.
              </p>
            </div>

            {/* Seasonal Dashboard Stats */}
            <div className="flex items-center gap-4 bg-slate-900/40 border border-white/5 rounded-xl p-3 backdrop-blur-md relative z-20 shrink-0 font-mono text-[9px] select-none transition-all duration-1000"
              style={{ opacity: settled ? 1 : 0 }}
            >
              <div>
                <div className="text-cyber-muted uppercase tracking-wider text-[8px]">Active Masters</div>
                <div className="text-xs font-bold text-white mt-0.5">15 Active</div>
              </div>
              <div className="w-px h-6 bg-white/10" />
              <div>
                <div className="text-cyber-muted uppercase tracking-wider text-[8px]">Network Load</div>
                <div className="text-xs font-bold text-cyan-400 flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  ONLINE
                </div>
              </div>
              <div className="w-px h-6 bg-white/10" />
              <div>
                <div className="text-cyber-muted uppercase tracking-wider text-[8px]">Total Pool</div>
                <div className="text-xs font-bold text-amber-400 mt-0.5">91,840 PTS</div>
              </div>
            </div>
          </div>

          {/* Top 3 Handcrafted Elite Podium */}
          <LeaderboardPodium entries={rankedList} step={step} />
        </div>
      </div>

      {/* ── MAIN CONTENT ── Fades in calmly as sequence settles ── */}
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <div className={`transition-all duration-[1200ms] transform ${settled ? "opacity-100 translate-y-0 filter blur-0" : "opacity-0 translate-y-8 filter blur-[6px]"}`}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT: Leaderboard */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tabs */}
              <div className="bg-slate-900/95 border border-slate-700/60 p-1.5 rounded-xl flex gap-1.5 overflow-x-auto scrollbar-hide shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] select-none">
                {TABS.map(tab => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all duration-300
                        ${isActive
                          ? "bg-gradient-to-b from-slate-700 to-slate-800 text-white border border-slate-500/50 shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
                          : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                        }`}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Rank cards */}
              <div className="space-y-2">
                {rankedList.length === 0 ? (
                  <div className="text-center py-12 text-cyber-muted italic text-sm">
                    No players in this category yet.
                  </div>
                ) : (
                  rankedList.map((entry, i) => (
                    <LeaderboardRow
                      key={entry.userId}
                      entry={entry}
                      isCurrentUser={entry.userId === user?.id}
                      index={i}
                    />
                  ))
                )}
              </div>
            </div>

            {/* RIGHT: Activity Feed & Standing widgets */}
            <div className="space-y-6">
              
              {/* Live Feed */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-slate-700/50 rounded-xl p-5 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.06),_0_12px_36px_rgba(0,0,0,0.4)] relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-600/30 to-transparent" />
                
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-mono font-bold text-slate-300 tracking-[0.06em] flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-cyber-cyan" /> LIVE SYSTEM FEED
                  </h3>
                  <div className="flex items-center gap-2 bg-slate-950/40 border border-slate-700/40 px-2.5 py-0.5 rounded-full select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
                    <span className="text-[9px] text-cyber-green font-bold font-mono tracking-wider">LIVE</span>
                  </div>
                </div>
                
                <ActivityFeed events={allFeedEvents} maxItems={10} />
              </div>

              {/* Standing Widget */}
              {user && (
                <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-slate-700/50 rounded-xl p-5 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.06),_0_12px_36px_rgba(0,0,0,0.4)] relative overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-600/30 to-transparent" />
                  
                  <h3 className="text-xs font-mono font-bold text-slate-300 tracking-[0.06em] mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500" /> SYSTEM STANDING
                  </h3>
                  <div className="space-y-2.5">
                    {[
                      { label: "Global Rank",    value: `#${rankedList.find(e => e.userId === user.id)?.rank || "?"}` },
                      { label: "Prestige Score", value: (userEntry?.prestigeScore || 0).toLocaleString() },
                      { label: "Verified Skills", value: user.verifications?.length || 0 },
                      { label: "Streak",          value: `${user.streakDays || 0} days` },
                    ].map(stat => (
                      <div key={stat.label} className="flex justify-between items-center text-xs border-b border-slate-700/50 pb-2.5 last:border-0 last:pb-0 font-mono">
                        <span className="text-slate-400 uppercase tracking-wider text-[9px]">{stat.label}</span>
                        <span className="font-bold text-white text-xs tracking-wider">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* ── KEYFRAMES FOR PRESTIGE CHOREOGRAPHY ANIMATIONS ── */}
      <style>{`
        @keyframes energy-sweep-across {
          0%   { top: 0%; opacity: 0; }
          15%  { opacity: 0.9; }
          85%  { opacity: 0.9; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes converge-1 {
          0%   { transform: translate(0, 0); opacity: 0; }
          15%  { opacity: 0.9; }
          100% { transform: translate(400px, 200px); opacity: 0; scale: 0.4; }
        }
        @keyframes converge-2 {
          0%   { transform: translate(0, 0); opacity: 0; }
          15%  { opacity: 0.9; }
          100% { transform: translate(-350px, -200px); opacity: 0; scale: 0.4; }
        }
        @keyframes converge-3 {
          0%   { transform: translate(0, 0); opacity: 0; }
          15%  { opacity: 0.9; }
          100% { transform: translate(-400px, 150px); opacity: 0; scale: 0.4; }
        }
        @keyframes converge-4 {
          0%   { transform: translate(0, 0); opacity: 0; }
          15%  { opacity: 0.9; }
          100% { transform: translate(350px, -250px); opacity: 0; scale: 0.4; }
        }
        @keyframes converge-5 {
          0%   { transform: translate(0, 0); opacity: 0; }
          15%  { opacity: 0.9; }
          100% { transform: translate(-100px, 250px); opacity: 0; scale: 0.4; }
        }
        @keyframes converge-6 {
          0%   { transform: translate(0, 0); opacity: 0; }
          15%  { opacity: 0.9; }
          100% { transform: translate(100px, -250px); opacity: 0; scale: 0.4; }
        }
        @keyframes orbit-track-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes path-travel {
          from { strokeDashoffset: 100; }
          to   { strokeDashoffset: 0; }
        }
        @keyframes node-glow-breath {
          0%, 100% { opacity: 0.12; transform: scale(1.0); }
          50%       { opacity: 0.22; transform: scale(1.15); }
        }
        @keyframes spin-slow {
          from { transform: rotateX(68deg) rotateY(12deg) rotate(0deg); }
          to   { transform: rotateX(68deg) rotateY(12deg) rotate(360deg); }
        }
        @keyframes spin-reverse-slow {
          from { transform: rotateX(68deg) rotateY(12deg) rotate(360deg); }
          to   { transform: rotateX(68deg) rotateY(12deg) rotate(0deg); }
        }
        @keyframes beam-shimmer {
          0%, 100% { opacity: 0.5; filter: brightness(1); }
          50%       { opacity: 0.8; filter: brightness(1.2); }
        }
        @keyframes particle-rise-slow {
          0%   { transform: translateY(0) scale(1); opacity: 0; }
          20%  { opacity: 0.6; }
          80%  { opacity: 0.6; }
          100% { transform: translateY(-160px) scale(0.6); opacity: 0; }
        }
        @keyframes particle-rise-fast {
          0%   { transform: translateY(0) scale(1); opacity: 0; }
          25%  { opacity: 0.5; }
          75%  { opacity: 0.5; }
          100% { transform: translateY(-180px) scale(0.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
