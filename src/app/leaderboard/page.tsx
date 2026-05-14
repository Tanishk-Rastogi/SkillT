"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/components/layout/AuthProvider";
import { LeaderboardRow } from "@/components/social/LeaderboardRow";
import { ActivityFeed } from "@/components/social/ActivityFeed";
import { MOCK_PLAYERS, MOCK_FEED_EVENTS, computeUserPrestigeScore, LeaderboardEntry } from "@/data/social";
import { Trophy, Zap, Globe, Shield, Code2, Cpu, Users, Clock, TrendingUp } from "lucide-react";

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
      rank: 0, // will be computed below
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
      weeklyXp: user.xp, // simplified
      prestigeScore: score,
      avatarIcon: "Code2",
      themeColor: "cyan",
    };
  }, [user]);

  // Build full ranked list for the given tab
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
      // Show a handful of NPCs as "friends"
      base = base.slice(2, 8);
    }

    // Inject user
    const allEntries = userEntry ? [...base, userEntry] : base;
    const sorted = allEntries.sort((a, b) => {
      if (activeTab === "weekly") return b.weeklyXp - a.weeklyXp;
      return b.prestigeScore - a.prestigeScore;
    });

    return sorted.map((entry, i) => ({ ...entry, rank: i + 1 }));
  }, [activeTab, userEntry]);

  // Merge user feed events with mock feed
  const allFeedEvents = useMemo(() => {
    const userEvents = user?.feedEvents || [];
    return [...userEvents, ...MOCK_FEED_EVENTS]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 15);
  }, [user?.feedEvents]);

  return (
    <div className="min-h-screen bg-cyber-darker">
      {/* ── HEADER HERO ─────────────────────────────── */}
      <div className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-cyber-purple/10 via-cyber-cyan/5 to-transparent pointer-events-none" />
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 40px,rgba(255,255,255,.05) 40px,rgba(255,255,255,.05) 41px),repeating-linear-gradient(90deg,transparent,transparent 40px,rgba(255,255,255,.05) 40px,rgba(255,255,255,.05) 41px)'
        }} />
        <div className="container mx-auto px-6 py-12 max-w-6xl relative">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-8 h-8 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
            <h1 className="text-4xl font-black font-mono tracking-wider text-white">
              THE RANKINGS SANCTUM
            </h1>
          </div>
          <p className="text-cyber-muted font-mono text-sm ml-11">
            Compete. Rise. Dominate. — Global prestige rankings updated in real-time.
          </p>

          {/* Top 3 spotlight */}
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-2xl">
            {rankedList.slice(0, 3).map((entry, i) => {
              const isFirst = i === 0;
              const heights = ["h-28", "h-20", "h-16"];
              const colors = ["from-amber-500/30 to-amber-500/5 border-amber-400/60", "from-slate-400/20 to-slate-400/5 border-slate-400/40", "from-amber-800/20 to-amber-800/5 border-amber-700/40"];
              const textColors = ["text-amber-400", "text-slate-300", "text-amber-700"];

              return (
                <motion.div
                  key={entry.userId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`${i === 1 ? "order-first" : i === 2 ? "order-last" : ""} relative flex flex-col items-center justify-end ${heights[i]} rounded-t-xl border border-b-0 bg-gradient-to-t ${colors[i]} px-3 pb-2`}
                >
                  {isFirst && (
                    <div className="absolute -top-3 text-amber-400 text-xs font-black font-mono tracking-widest">★ #1 ★</div>
                  )}
                  <div className={`font-black font-mono text-sm ${textColors[i]} truncate max-w-full`}>{entry.username}</div>
                  <div className="text-[10px] text-cyber-muted font-mono">{entry.prestigeScore.toLocaleString()} pts</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────── */}
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT: Leaderboard */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all
                    ${activeTab === tab.id
                      ? "bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/30"
                      : "text-cyber-muted hover:text-white hover:bg-white/5 border border-transparent"
                    }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
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

          {/* RIGHT: Activity Feed */}
          <div className="space-y-4">
            <div className="bg-cyber-darker border border-white/10 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-mono font-bold text-cyber-muted tracking-widest flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> LIVE FEED
                </h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
                  <span className="text-[10px] text-cyber-green font-mono">LIVE</span>
                </div>
              </div>
              <ActivityFeed events={allFeedEvents} maxItems={12} />
            </div>

            {/* Quick Stats */}
            {user && (
              <div className="bg-cyber-darker border border-white/10 rounded-xl p-5">
                <h3 className="text-sm font-mono font-bold text-cyber-muted tracking-widest mb-4 flex items-center gap-2">
                  <Zap className="w-4 h-4" /> YOUR STANDING
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "Global Rank",    value: `#${rankedList.find(e => e.userId === user.id)?.rank || "?"}` },
                    { label: "Prestige Score", value: (userEntry?.prestigeScore || 0).toLocaleString() },
                    { label: "Verified Skills", value: user.verifications?.length || 0 },
                    { label: "Streak",          value: `${user.streakDays || 0} days` },
                  ].map(stat => (
                    <div key={stat.label} className="flex justify-between items-center text-sm">
                      <span className="text-cyber-muted font-mono text-xs">{stat.label}</span>
                      <span className="font-bold font-mono text-white">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
