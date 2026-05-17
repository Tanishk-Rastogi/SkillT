"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FeedEvent } from "@/data/social";
import {
  Zap, Trophy, TrendingUp, ShieldCheck, Flame, Search, Sparkles
} from "lucide-react";

function timeAgo(iso: string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

const EVENT_META: Record<FeedEvent["type"], { icon: React.ReactNode; label: string }> = {
  skill_unlock:         { icon: <Zap className="w-3.5 h-3.5" />,         label: "Skill Unlock" },
  title_unlock:         { icon: <Trophy className="w-3.5 h-3.5" />,       label: "Title Earned" },
  class_evolution:      { icon: <TrendingUp className="w-3.5 h-3.5" />,   label: "Class Evolved" },
  leaderboard_rank_change: { icon: <Sparkles className="w-3.5 h-3.5" />, label: "Rank Changed" },
  verification_complete: { icon: <ShieldCheck className="w-3.5 h-3.5" />, label: "Verified" },
  streak_milestone:     { icon: <Flame className="w-3.5 h-3.5" />,        label: "Streak" },
  rare_discovery:       { icon: <Search className="w-3.5 h-3.5" />,        label: "Rare Find" },
};

// MATTE SECTION THEME: Clean, restrained border & flat backgrounds to provide visual rest
const RARITY_MATTE_STYLES: Record<string, string> = {
  Legendary: "border-amber-500/20 bg-slate-900/60",
  Epic:      "border-cyber-purple/20 bg-slate-900/60",
  Rare:      "border-cyber-cyan/15 bg-slate-900/40",
  Common:    "border-white/5 bg-slate-950/20",
};

const RARITY_TEXT: Record<string, string> = {
  Legendary: "text-amber-400 font-bold",
  Epic:      "text-cyber-purple font-bold",
  Rare:      "text-cyber-cyan font-bold",
  Common:    "text-white/80",
};

const RARITY_ICON_BG: Record<string, string> = {
  Legendary: "bg-amber-500/10 text-amber-400 border border-amber-500/25",
  Epic:      "bg-cyber-purple/10 text-cyber-purple border border-cyber-purple/25",
  Rare:      "bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20",
  Common:    "bg-slate-800 text-white/55 border border-white/5",
};

interface ActivityFeedProps {
  events: FeedEvent[];
  maxItems?: number;
  compact?: boolean;
}

export function ActivityFeed({ events, maxItems = 10, compact = false }: ActivityFeedProps) {
  const displayed = events.slice(0, maxItems);

  if (displayed.length === 0) {
    return (
      <div className="text-center py-8 text-cyber-muted text-xs italic font-mono select-none">
        No activity yet. Complete skills to generate events!
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <AnimatePresence>
        {displayed.map((event, i) => {
          const meta = EVENT_META[event.type];
          const rarity = event.rarity || "Common";
          const isNew = i === 0;

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: -6, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ delay: i * 0.02 }}
              className={`flex items-start gap-3 rounded-lg border transition-colors duration-200 hover:border-white/10
                ${RARITY_MATTE_STYLES[rarity]} ${compact ? "py-2 px-2.5" : "p-3"}`}
            >
              {/* Solid Matte Icon Holder */}
              <div className={`p-1.5 rounded shrink-0 mt-0.5 flex items-center justify-center ${RARITY_ICON_BG[rarity]}`}>
                {meta?.icon || <Zap className="w-3.5 h-3.5" />}
              </div>

              {/* High-Readability Typography Focus */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap leading-none">
                  <span className="font-bold text-xs text-white/95 font-mono">{event.username}</span>
                  <span className="text-[9px] text-cyber-muted font-mono uppercase tracking-wider">
                    Lvl.{event.userLevel} {event.userClass}
                  </span>
                  {isNew && (
                    <span className="text-[8px] font-black font-mono px-1 py-0.5 rounded bg-cyber-cyan/15 border border-cyber-cyan/35 text-cyber-cyan select-none animate-pulse">
                      NEW
                    </span>
                  )}
                </div>
                <div className={`text-xs mt-1 leading-relaxed ${RARITY_TEXT[rarity]}`}>
                  {event.message}
                </div>
                {event.subtext && !compact && (
                  <div className="text-[10px] text-cyber-muted font-mono mt-1 border-t border-white/5 pt-1">
                    {event.subtext}
                  </div>
                )}
              </div>

              {/* Flat, Calm Time Marker */}
              <div className="text-[9px] text-cyber-muted font-mono shrink-0 mt-0.5 select-none">
                {timeAgo(event.timestamp)}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
