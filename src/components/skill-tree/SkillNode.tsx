"use client";

import { memo } from "react";
import { Handle, Position, NodeProps, Node } from "@xyflow/react";
import { motion } from "framer-motion";
import { Lock, Check, Code2, Globe2, ShieldCheck } from "lucide-react";
import { Skill } from "@/data/skills";
import { useAuth } from "@/components/layout/AuthProvider";
import { MASTERY_TIER_LABELS, MasteryTier } from "@/data/challenges";

const RARITY_COLORS = {
  Common: "text-gray-400",
  Rare: "text-blue-400",
  Epic: "text-purple-400",
  Legendary: "text-amber-400",
};

export const SkillNode = memo(({ data, selected }: NodeProps<Node<Skill>>) => {
  const { user } = useAuth();
  
  const isLocked = data.status === "Locked";
  const isCompleted = data.status === "Completed";
  const isAvailable = data.status === "Available";
  const isUniversal = data.universalSkill;

  // Check verification
  const verification = user?.verifications?.find(v => v.skillId === data.id);
  const isVerified = verification?.level === 3;

  // Mastery tier
  const masteryTier = user?.masteryTiers?.[data.id] as MasteryTier | undefined;
  const masteryMeta = masteryTier ? MASTERY_TIER_LABELS[masteryTier] : null;

  let statusStyles = "";
  let icon = isUniversal ? <Globe2 className="w-5 h-5" /> : <Code2 className="w-5 h-5" />;

  if (isLocked) {
    statusStyles = isUniversal 
      ? "bg-cyber-darker border-amber-900/30 text-amber-900/50" 
      : "bg-cyber-darker border-cyber-muted/30 text-cyber-muted";
    icon = <Lock className="w-5 h-5" />;
  } else if (isVerified) {
    statusStyles = "bg-amber-500/10 border-amber-400 text-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.6)] animate-pulse-slow";
    icon = <ShieldCheck className="w-5 h-5" />;
  } else if (isCompleted) {
    statusStyles = isUniversal
      ? "bg-cyber-dark border-amber-400 text-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.4)]"
      : "bg-cyber-dark border-cyber-green text-cyber-green text-glow-green";
    icon = <Check className="w-5 h-5" />;
  } else if (isAvailable) {
    statusStyles = isUniversal
      ? "bg-cyber-dark border-amber-500 text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.5)]"
      : "bg-cyber-dark border-cyber-cyan text-cyber-cyan text-glow-cyan shadow-[0_0_15px_rgba(0,240,255,0.3)]";
  }

  return (
    <motion.div
      whileHover={!isLocked ? { scale: 1.05 } : {}}
      whileTap={!isLocked ? { scale: 0.95 } : {}}
      className={`relative px-4 py-3 min-w-[200px] rounded border ${statusStyles} cursor-pointer backdrop-blur-sm transition-colors duration-300 ${
        selected && !isLocked ? "ring-2 ring-cyber-purple" : ""
      } ${isUniversal ? "border-2 rounded-xl" : "rounded-md"}`}
    >
      {/* Target handle for incoming connections */}
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-none" />

      {isUniversal && !isVerified && (
        <div className="absolute -top-3 -right-3">
          <span className="flex h-6 w-6 relative">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isLocked ? 'bg-amber-900' : 'bg-amber-400'}`}></span>
            <span className={`relative inline-flex rounded-full h-6 w-6 items-center justify-center text-[10px] font-bold text-black ${isLocked ? 'bg-amber-900' : 'bg-amber-400'}`}>
              U
            </span>
          </span>
        </div>
      )}

      {isVerified && (
        <div className="absolute -top-3 -right-3">
          <span className="flex h-6 w-6 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-100 bg-amber-400"></span>
            <span className="relative inline-flex rounded-full h-6 w-6 items-center justify-center text-[10px] font-bold text-black bg-amber-400">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </span>
        </div>
      )}

      <div className="flex items-center gap-3">
        <div className={`p-2 rounded bg-black/40 ${isAvailable && !isUniversal ? "animate-pulse-fast" : ""} ${isUniversal && isAvailable ? "animate-pulse" : ""}`}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="font-mono font-bold text-sm uppercase truncate max-w-[130px]">
            {data.title}
          </div>
          <div className="text-[10px] uppercase font-mono flex justify-between mt-1 items-center">
            <span className={RARITY_COLORS[data.rarity] || "text-cyber-muted"}>{data.rarity}</span>
            {masteryMeta ? (
              <span className={`font-bold ${masteryMeta.color}`}>{masteryMeta.shortLabel}</span>
            ) : isCompleted ? <span className="opacity-70">+{data.xpValue}XP</span> : null}
          </div>
        </div>
      </div>

      {/* Source handle for outgoing connections */}
      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-none" />
    </motion.div>
  );
});

SkillNode.displayName = "SkillNode";
