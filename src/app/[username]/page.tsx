"use client";

import { useMemo } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/components/layout/AuthProvider";
import { MOCK_PLAYERS, computeUserPrestigeScore } from "@/data/social";
import {
  ShieldCheck, Code2, GitBranch, Trophy, Zap, Globe, Cpu, Network,
  Sparkles, TrendingUp, ExternalLink, Lock, Star
} from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="w-14 h-14" />,
  ShieldCheck: <ShieldCheck className="w-14 h-14" />,
  Sparkles: <Sparkles className="w-14 h-14" />,
  Network: <Network className="w-14 h-14" />,
  Code2: <Code2 className="w-14 h-14" />,
  Globe: <Globe className="w-14 h-14" />,
  Lock: <Lock className="w-14 h-14" />,
  TrendingUp: <TrendingUp className="w-14 h-14" />,
  Star: <Star className="w-14 h-14" />,
};

const DOMAIN_GRADIENTS: Record<string, string> = {
  "Web Development":      "from-cyber-cyan/30 via-cyber-cyan/5 to-transparent",
  "AI / Machine Learning": "from-cyber-purple/30 via-cyber-purple/5 to-transparent",
  "Cybersecurity":        "from-emerald-500/30 via-emerald-500/5 to-transparent",
  "DevOps":               "from-amber-500/30 via-amber-500/5 to-transparent",
  "Game Development":     "from-rose-500/30 via-rose-500/5 to-transparent",
  "Undecided":            "from-white/10 via-white/5 to-transparent",
};

const THEME_CLASSES: Record<string, { text: string; border: string; bg: string; glow: string }> = {
  cyan:    { text: "text-cyber-cyan",   border: "border-cyber-cyan",   bg: "bg-cyber-cyan/10",   glow: "shadow-[0_0_40px_rgba(0,240,255,0.3)]" },
  purple:  { text: "text-cyber-purple", border: "border-cyber-purple", bg: "bg-cyber-purple/10", glow: "shadow-[0_0_40px_rgba(176,38,255,0.3)]" },
  amber:   { text: "text-amber-400",    border: "border-amber-400",    bg: "bg-amber-400/10",    glow: "shadow-[0_0_40px_rgba(251,191,36,0.3)]" },
  emerald: { text: "text-emerald-400",  border: "border-emerald-400",  bg: "bg-emerald-400/10",  glow: "shadow-[0_0_40px_rgba(52,211,153,0.3)]" },
  rose:    { text: "text-rose-400",     border: "border-rose-400",     bg: "bg-rose-400/10",     glow: "shadow-[0_0_40px_rgba(251,113,133,0.3)]" },
};

const RARITY_BADGE: Record<string, string> = {
  Legendary: "text-amber-400 border-amber-400/40 bg-amber-400/10",
  Epic:      "text-cyber-purple border-cyber-purple/40 bg-cyber-purple/10",
  Rare:      "text-cyber-cyan border-cyber-cyan/40 bg-cyber-cyan/10",
  Common:    "text-gray-400 border-gray-400/30 bg-gray-400/10",
};

interface Props {
  params: { username: string };
}

export default function PublicProfilePage({ params }: Props) {
  const { user } = useAuth();
  const targetUsername = params.username.toLowerCase();

  // Check if viewing own profile or a mock NPC
  const isSelf = user?.username.toLowerCase() === targetUsername;
  const mockPlayer = MOCK_PLAYERS.find(p => p.username.toLowerCase() === targetUsername);

  // If neither self nor a known mock NPC, 404
  if (!isSelf && !mockPlayer) {
    notFound();
  }

  // Build the profile data object
  const profile = useMemo(() => {
    if (isSelf && user) {
      const prestigeScore = computeUserPrestigeScore(
        user.xp, user.level,
        user.verifications?.length || 0,
        user.streakDays || 0,
        user.activeTitle?.rarity || "Common",
        user.unlockedClasses?.length || 0,
      );
      return {
        username: user.username,
        level: user.level,
        xp: user.xp,
        activeClass: user.activeClass?.name || "Builder",
        activeTitle: user.activeTitle?.name || "Novice Coder",
        titleRarity: user.activeTitle?.rarity || "Common",
        dominantDomain: user.dominantDomain || "Undecided",
        progressionStyle: user.progressionStyle || "Generalist",
        verifiedSkillCount: user.verifications?.length || 0,
        streakDays: user.streakDays || 0,
        prestigeScore,
        themeColor: "cyan" as const,
        avatarIcon: "Code2",
        connectedPlatforms: user.connectedPlatforms || [],
        completedSkills: user.skills?.filter(s => s.status === "Completed") || [],
        verifications: user.verifications || [],
        unlockedClasses: user.unlockedClasses || [],
        unlockedTitles: user.unlockedTitles || [],
        isSelf: true,
      };
    }
    // NPC mock profile
    return {
      username: mockPlayer!.username,
      level: mockPlayer!.level,
      xp: mockPlayer!.xp,
      activeClass: mockPlayer!.activeClass,
      activeTitle: mockPlayer!.activeTitle,
      titleRarity: mockPlayer!.titleRarity,
      dominantDomain: mockPlayer!.dominantDomain,
      progressionStyle: "Specialist",
      verifiedSkillCount: mockPlayer!.verifiedSkillCount,
      streakDays: mockPlayer!.streakDays,
      prestigeScore: mockPlayer!.prestigeScore,
      themeColor: mockPlayer!.themeColor,
      avatarIcon: mockPlayer!.avatarIcon,
      connectedPlatforms: [] as { platformId: string; username: string; profileUrl: string }[],
      completedSkills: [] as { id: string; title: string; category: string }[],
      verifications: [] as { skillId: string; verifiedBy: string }[],
      unlockedClasses: [{ id: '1', name: mockPlayer!.activeClass, tier: 3 }],
      unlockedTitles: [{ id: '1', name: mockPlayer!.activeTitle, rarity: mockPlayer!.titleRarity, description: "Earned through mastery." }],
      isSelf: false,
    };
  }, [isSelf, user, mockPlayer]);

  const theme = THEME_CLASSES[profile.themeColor] || THEME_CLASSES.cyan;
  const bannerGradient = DOMAIN_GRADIENTS[profile.dominantDomain] || DOMAIN_GRADIENTS.Undecided;
  const rarityBadge = RARITY_BADGE[profile.titleRarity] || RARITY_BADGE.Common;

  return (
    <div className="min-h-screen bg-cyber-darker">
      {/* ── BANNER ─────────────────────────────── */}
      <div className={`h-48 bg-gradient-to-b ${bannerGradient} relative overflow-hidden border-b border-white/5`}>
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,0.02) 30px, rgba(255,255,255,0.02) 31px)'
        }} />

        {/* Aura rings */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className={`absolute left-8 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-2 ${theme.border} opacity-20`}
        />
        <motion.div
          animate={{ scale: [1.1, 1.2, 1.1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
          className={`absolute left-6 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full border ${theme.border} opacity-10`}
        />
      </div>

      <div className="container mx-auto px-6 max-w-5xl">
        {/* ── PROFILE HEADER ─────────────────────────────── */}
        <div className="relative -mt-20 flex flex-col md:flex-row gap-6 items-start mb-8">
          {/* Avatar */}
          <motion.div
            animate={{ boxShadow: [`0 0 30px ${profile.themeColor === 'purple' ? 'rgba(176,38,255' : profile.themeColor === 'amber' ? 'rgba(251,191,36' : 'rgba(0,240,255'},0.5)`, `0 0 60px ${profile.themeColor === 'purple' ? 'rgba(176,38,255' : profile.themeColor === 'amber' ? 'rgba(251,191,36' : 'rgba(0,240,255'},0.8)`, `0 0 30px ${profile.themeColor === 'purple' ? 'rgba(176,38,255' : profile.themeColor === 'amber' ? 'rgba(251,191,36' : 'rgba(0,240,255'},0.5)`] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className={`w-32 h-32 rounded-2xl border-2 ${theme.border} ${theme.bg} flex items-center justify-center shrink-0 ${theme.text}`}
          >
            {ICON_MAP[profile.avatarIcon] || <Code2 className="w-14 h-14" />}
          </motion.div>

          {/* Identity Info */}
          <div className="flex-1 pt-4">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h1 className="text-3xl font-black font-mono tracking-wider text-white">{profile.username}</h1>
              {profile.isSelf && (
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/50 border border-white/10">YOUR PROFILE</span>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              <span className="flex items-center gap-1.5 text-xs font-mono px-2 py-1 rounded border border-white/10 bg-white/5 text-white/80">
                <Zap className="w-3 h-3" /> {profile.activeClass}
              </span>
              <span className={`flex items-center gap-1.5 text-xs font-mono px-2 py-1 rounded border ${rarityBadge}`}>
                <Trophy className="w-3 h-3" /> {profile.activeTitle}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-mono px-2 py-1 rounded border border-white/10 bg-white/5 text-white/80">
                <Globe className="w-3 h-3" /> {profile.dominantDomain}
              </span>
            </div>
          </div>

          {/* XP / Level / Prestige */}
          <div className="flex gap-3 pt-4 shrink-0">
            {[
              { label: "LEVEL", value: profile.level, color: "text-white" },
              { label: "XP",    value: profile.xp.toLocaleString(), color: theme.text },
              { label: "PRESTIGE", value: profile.prestigeScore.toLocaleString(), color: "text-amber-400" },
            ].map(stat => (
              <div key={stat.label} className="text-center px-4 py-3 bg-black/40 border border-white/5 rounded-xl">
                <div className={`text-2xl font-black font-mono ${stat.color}`}>{stat.value}</div>
                <div className="text-[9px] text-cyber-muted font-mono tracking-widest mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── BODY ─────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-16">

          {/* LEFT COLUMN */}
          <div className="md:col-span-1 space-y-5">

            {/* Build Stats */}
            <div className="bg-black/30 border border-white/8 rounded-xl p-5">
              <h3 className="text-xs font-mono font-bold text-cyber-muted tracking-widest mb-4 flex items-center gap-2">
                <Zap className="w-3.5 h-3.5" /> BUILD PROFILE
              </h3>
              <div className="space-y-3">
                {[
                  { label: "Style",     value: profile.progressionStyle },
                  { label: "Streak",    value: `${profile.streakDays} days 🔥` },
                  { label: "Verified",  value: `${profile.verifiedSkillCount} skills` },
                  { label: "Classes",   value: `${profile.unlockedClasses.length} evolved` },
                ].map(stat => (
                  <div key={stat.label} className="flex justify-between items-center">
                    <span className="text-xs text-cyber-muted font-mono">{stat.label}</span>
                    <span className="text-sm font-bold text-white font-mono">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Class Evolution Path */}
            {profile.unlockedClasses.length > 0 && (
              <div className="bg-black/30 border border-white/8 rounded-xl p-5">
                <h3 className="text-xs font-mono font-bold text-cyber-muted tracking-widest mb-4 flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5" /> CLASS PATH
                </h3>
                <div className="space-y-2">
                  {profile.unlockedClasses.map((cls, idx) => (
                    <div key={cls.id} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full shrink-0 ${idx === profile.unlockedClasses.length - 1 ? `${theme.bg} border ${theme.border}` : 'bg-white/20'}`} />
                      <span className={`text-sm font-mono ${idx === profile.unlockedClasses.length - 1 ? `font-bold ${theme.text}` : 'text-cyber-muted'}`}>
                        {cls.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Connected Platforms */}
            <div className="bg-black/30 border border-white/8 rounded-xl p-5">
              <h3 className="text-xs font-mono font-bold text-cyber-muted tracking-widest mb-4 flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5" /> LINKED ACCOUNTS
              </h3>
              {profile.connectedPlatforms.length > 0 ? (
                <div className="space-y-2">
                  {profile.connectedPlatforms.map((p) => (
                    <a
                      key={p.platformId}
                      href={p.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-cyber-cyan hover:text-white transition-colors group"
                    >
                      <GitBranch className="w-4 h-4" />
                      <span className="font-mono">{p.username}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-cyber-muted italic">No accounts linked publicly.</div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="md:col-span-2 space-y-5">

            {/* Earned Titles */}
            <div className="bg-black/30 border border-white/8 rounded-xl p-5">
              <h3 className="text-xs font-mono font-bold text-cyber-muted tracking-widest mb-4 flex items-center gap-2">
                <Trophy className="w-3.5 h-3.5" /> EARNED TITLES
              </h3>
              {profile.unlockedTitles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {profile.unlockedTitles.map((title) => (
                    <div key={title.id} className={`p-3 rounded-lg border ${RARITY_BADGE[title.rarity] || RARITY_BADGE.Common} bg-black/30`}>
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-sm text-white">{title.name}</span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${RARITY_BADGE[title.rarity]}`}>
                          {title.rarity}
                        </span>
                      </div>
                      <p className="text-[11px] text-cyber-muted mt-1">{title.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-cyber-muted italic">No titles unlocked yet.</p>
              )}
            </div>

            {/* Specialization Map (completed skills) */}
            <div className="bg-black/30 border border-white/8 rounded-xl p-5">
              <h3 className="text-xs font-mono font-bold text-cyber-muted tracking-widest mb-4 flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5" /> SPECIALIZATION MAP
              </h3>
              {profile.completedSkills.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {profile.completedSkills.map((skill) => {
                    const isVerified = profile.verifications.some(v => v.skillId === skill.id);
                    return (
                      <div
                        key={skill.id}
                        className={`p-2.5 rounded-lg border transition-colors relative
                          ${isVerified
                            ? 'bg-amber-500/10 border-amber-500/40'
                            : 'bg-white/3 border-white/8 hover:border-white/20'}`}
                      >
                        <div className="flex justify-between items-center">
                          <span className={`text-xs font-bold font-mono truncate ${isVerified ? 'text-amber-400' : 'text-white/80'}`}>
                            {skill.title}
                          </span>
                          {isVerified && <ShieldCheck className="w-3 h-3 text-amber-400 shrink-0 ml-1" />}
                        </div>
                        <div className={`text-[9px] font-mono mt-0.5 uppercase ${isVerified ? 'text-amber-500/60' : 'text-cyber-muted'}`}>
                          {skill.category}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-xs text-cyber-muted italic">
                    {profile.isSelf ? "Complete skills on the Skill Tree to populate your map." : "No public skills to display."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
