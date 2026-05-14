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
  skill_unlock:         { icon: <Zap className="w-4 h-4" />,         label: "Skill Unlock" },
  title_unlock:         { icon: <Trophy className="w-4 h-4" />,       label: "Title Earned" },
  class_evolution:      { icon: <TrendingUp className="w-4 h-4" />,   label: "Class Evolved" },
  leaderboard_rank_change: { icon: <Sparkles className="w-4 h-4" />, label: "Rank Changed" },
  verification_complete: { icon: <ShieldCheck className="w-4 h-4" />, label: "Verified" },
  streak_milestone:     { icon: <Flame className="w-4 h-4" />,        label: "Streak" },
  rare_discovery:       { icon: <Search className="w-4 h-4" />,        label: "Rare Find" },
};

const RARITY_STYLES: Record<string, string> = {
  Legendary: "border-amber-400/40 bg-amber-400/5 shadow-[0_0_15px_rgba(251,191,36,0.1)]",
  Epic:      "border-cyber-purple/40 bg-cyber-purple/5 shadow-[0_0_15px_rgba(176,38,255,0.1)]",
  Rare:      "border-cyber-cyan/30 bg-cyber-cyan/5",
  Common:    "border-white/8 bg-white/2",
};

const RARITY_TEXT: Record<string, string> = {
  Legendary: "text-amber-400",
  Epic:      "text-cyber-purple",
  Rare:      "text-cyber-cyan",
  Common:    "text-white/70",
};

const RARITY_ICON_BG: Record<string, string> = {
  Legendary: "bg-amber-400/20 text-amber-400",
  Epic:      "bg-cyber-purple/20 text-cyber-purple",
  Rare:      "bg-cyber-cyan/20 text-cyber-cyan",
  Common:    "bg-white/10 text-white/60",
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
      <div className="text-center py-8 text-cyber-muted text-sm italic">
        No activity yet. Complete skills to generate events!
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <AnimatePresence>
        {displayed.map((event, i) => {
          const meta = EVENT_META[event.type];
          const rarity = event.rarity || "Common";
          const isNew = i === 0;

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`flex items-start gap-3 p-3 rounded-lg border transition-all
                ${RARITY_STYLES[rarity]} ${compact ? "py-2.5" : "p-3.5"}`}
            >
              {/* Icon */}
              <div className={`p-1.5 rounded-md shrink-0 mt-0.5 ${RARITY_ICON_BG[rarity]}`}>
                {meta.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-sm text-white font-mono">{event.username}</span>
                  <span className="text-[10px] text-cyber-muted font-mono">
                    Lv.{event.userLevel} {event.userClass}
                  </span>
                  {isNew && (
                    <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-cyber-cyan/20 text-cyber-cyan animate-pulse">
                      NEW
                    </span>
                  )}
                </div>
                <div className={`text-sm font-semibold mt-0.5 ${RARITY_TEXT[rarity]}`}>
                  {event.message}
                </div>
                {event.subtext && !compact && (
                  <div className="text-[11px] text-cyber-muted mt-0.5">{event.subtext}</div>
                )}
              </div>

              {/* Time */}
              <div className="text-[10px] text-cyber-muted font-mono shrink-0 mt-0.5">
                {timeAgo(event.timestamp)}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
