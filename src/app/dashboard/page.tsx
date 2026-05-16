"use client";

import { useAuth } from "@/components/layout/AuthProvider";
import Link from "next/link";
import { IdentityHeader } from "@/components/dashboard/IdentityHeader";
import { ProgressionCore } from "@/components/dashboard/ProgressionCore";
import { SkillTreeMini } from "@/components/dashboard/SkillTreeMini";
import { MissionControl } from "@/components/dashboard/MissionControl";
import { StatsVisualizer } from "@/components/dashboard/StatsVisualizer";
import { AchievementsShowcase } from "@/components/dashboard/AchievementsShowcase";

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-6">
        <div className="card-surface p-12 text-center max-w-md">
          <h1 className="text-2xl font-black font-mono tracking-widest text-accent mb-4 uppercase">ACCESS_DENIED</h1>
          <p className="text-text-secondary text-sm mb-8 leading-relaxed font-mono uppercase tracking-tight">
            Unauthorized terminal access attempt detected. Identity verification required.
          </p>
          <Link href="/" className="inline-flex px-8 py-3 bg-accent text-bg-base font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(0,229,160,0.2)]">
            Initialize Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-20 lg:px-12 stagger-children relative">
      {/* Atmospheric Particles */}
      <div className="particle-drift top-[20%] left-[10%]" />
      <div className="particle-drift top-[60%] left-[80%] [animation-delay:2s]" />
      <div className="particle-drift top-[80%] left-[30%] [animation-delay:5s]" />
      <div className="particle-drift top-[10%] left-[90%] [animation-delay:8s]" />

      {/* 1. TOP: PLAYER IDENTITY */}
      <IdentityHeader user={user} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* 2, 3, 6. LEFT/CENTER: MAIN PROGRESSION + SKILL TREE + ACHIEVEMENTS */}
        <div className="lg:col-span-8 space-y-8">
          <ProgressionCore user={user} />
          <div className="h-[400px]">
             <SkillTreeMini user={user} />
          </div>
          <AchievementsShowcase user={user} />
        </div>

        {/* 4, 5, 7, 8. RIGHT: MISSIONS + STATS + RANKINGS + RECOMMENDATIONS */}
        <div className="lg:col-span-4 space-y-8">
          <StatsVisualizer user={user} />
          <MissionControl user={user} />
        </div>
      </div>

      {/* Footer Quote / Tip */}
      <div className="mt-20 text-center">
         <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.4em] opacity-40">
           BUILD PROOF. NOT CLAIMS. // SKILLT ECOSYSTEM V3.0
         </p>
      </div>
    </div>
  );
}
