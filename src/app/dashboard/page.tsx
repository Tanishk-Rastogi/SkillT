"use client";

import { useAuth } from "@/components/layout/AuthProvider";
import { Shield, Zap, Target, Award } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { SeasonProgressionPanel } from "@/components/events/SeasonProgressionPanel";
import { CommunityGoalTracker } from "@/components/events/CommunityGoalTracker";
import { MissionLog } from "@/components/events/MissionLog";
import { RegionalLeaderboards } from "@/components/events/RegionalLeaderboards";
import { useLiveEvents } from "@/hooks/useLiveEvents";

export default function DashboardPage() {
  const { user } = useAuth();
  useLiveEvents(); // Initialize live events loop for the dashboard

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <h1 className="text-3xl font-mono text-cyber-cyan mb-4">ACCESS DENIED</h1>
        <p className="text-cyber-muted mb-8">Please initiate login to access your dashboard.</p>
        <Link href="/" className="px-6 py-2 border border-cyber-cyan text-cyber-cyan rounded hover:bg-cyber-cyan hover:text-black transition-all">
          Return to Hub
        </Link>
      </div>
    );
  }

  const completedSkills = user.skills.filter(s => s.status === "Completed");
  const availableSkills = user.skills.filter(s => s.status === "Available");

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-16 h-16 rounded-full bg-cyber-dark border border-cyber-purple flex items-center justify-center shadow-[0_0_20px_rgba(176,38,255,0.3)]">
          <Shield className="w-8 h-8 text-cyber-purple" />
        </div>
        <div>
          <h1 className="text-3xl font-bold font-mono tracking-wider">{user.username}</h1>
          <p className="text-cyber-muted font-mono">Cyber Developer</p>
        </div>
      </div>

      <div className="mb-12">
        <SeasonProgressionPanel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <div className="lg:col-span-2 space-y-6">
          <CommunityGoalTracker />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-cyber-dark border border-white/10 p-6 rounded relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap className="w-24 h-24 text-cyber-cyan" />
              </div>
              <div className="text-cyber-muted font-mono text-sm mb-2">CURRENT LEVEL</div>
              <div className="text-5xl font-bold text-glow-cyan text-cyber-cyan">{user.level}</div>
              <div className="mt-4 w-full h-1 bg-white/10 rounded overflow-hidden">
                <div className="h-full bg-cyber-cyan w-[40%]" />
              </div>
              <div className="text-xs text-cyber-muted mt-2 text-right">{user.xp} / {(user.level) * 100} XP</div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-cyber-dark border border-white/10 p-6 rounded relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Target className="w-24 h-24 text-cyber-purple" />
              </div>
              <div className="text-cyber-muted font-mono text-sm mb-2">SKILLS UNLOCKED</div>
              <div className="text-5xl font-bold text-glow-purple text-cyber-purple">{completedSkills.length}</div>
              <div className="mt-4 text-sm text-cyber-muted">
                Out of {user.skills.length} total skills
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-cyber-dark border border-white/10 p-6 rounded relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Award className="w-24 h-24 text-cyber-green" />
              </div>
              <div className="text-cyber-muted font-mono text-sm mb-2">NEXT TARGETS</div>
              <div className="text-5xl font-bold text-glow-green text-cyber-green">{availableSkills.length}</div>
              <div className="mt-4 text-sm text-cyber-muted flex gap-2 overflow-hidden whitespace-nowrap">
                {availableSkills.slice(0, 3).map(s => (
                  <span key={s.id} className="bg-white/5 px-2 py-1 rounded text-xs truncate">
                    {s.title}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="space-y-6">
          <MissionLog />
          <RegionalLeaderboards />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-mono font-bold mb-6 text-white border-b border-white/10 pb-2">Recent Achievements</h2>
          <div className="space-y-4">
            {completedSkills.length === 0 ? (
              <div className="p-6 border border-white/5 rounded text-center text-cyber-muted bg-white/[0.02]">
                No skills unlocked yet. Head to the SkillTree to begin!
              </div>
            ) : (
              completedSkills.map((skill, i) => (
                <div key={skill.id} className="flex justify-between items-center p-4 border border-white/5 rounded bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="text-cyber-green">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold">{skill.title}</div>
                      <div className="text-xs text-cyber-muted">{skill.category}</div>
                    </div>
                  </div>
                  <div className="text-cyber-cyan font-mono text-sm">+{skill.xpValue} XP</div>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-mono font-bold mb-6 text-white border-b border-white/10 pb-2">Career Path Progress</h2>
          <div className="p-6 border border-white/5 rounded bg-white/[0.02] mb-4">
            <div className="flex justify-between items-end mb-2">
              <div>
                <h3 className="font-bold text-lg text-cyber-cyan">Frontend Developer</h3>
                <p className="text-sm text-cyber-muted">Master HTML, CSS, JavaScript, and React.</p>
              </div>
              <span className="text-cyber-cyan font-mono font-bold">
                {Math.round((completedSkills.length / user.skills.length) * 100)}%
              </span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded overflow-hidden">
              <div 
                className="h-full bg-cyber-cyan" 
                style={{ width: `${(completedSkills.length / user.skills.length) * 100}%` }} 
              />
            </div>
          </div>
          
          <div className="p-6 border border-white/5 rounded bg-white/[0.02] opacity-50">
            <div className="flex justify-between items-end mb-2">
              <div>
                <h3 className="font-bold text-lg text-cyber-purple flex items-center gap-2">
                  {/* @ts-expect-error type conflict with react 19 */}
                  <Lock className="w-4 h-4" /> Fullstack Developer
                </h3>
                <p className="text-sm text-cyber-muted">Requires Frontend + Backend Mastery.</p>
              </div>
              <span className="text-cyber-purple font-mono font-bold">0%</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded overflow-hidden">
              <div className="h-full bg-cyber-purple w-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
