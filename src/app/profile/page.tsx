"use client";

import { useAuth } from "@/components/layout/AuthProvider";
import { Share2, Code2, Globe, Sparkles, ShieldCheck, Cpu, Network, Briefcase, Zap, Trophy, Link as LinkIcon, RefreshCw, GitBranch } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ProfilePage() {
  const { user, connectPlatform } = useAuth();
  const [isSyncing, setIsSyncing] = useState(false);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <h1 className="text-3xl font-mono text-cyber-cyan mb-4">IDENTITY NOT FOUND</h1>
      </div>
    );
  }

  const completedSkills = user.skills.filter(s => s.status === "Completed");
  
  // Theme styling based on active title/class (fallback to cyan if none)
  const getThemeColor = () => {
    if (user.activeTitle?.visualTheme === 'amber') return 'text-amber-400 border-amber-400/30 bg-amber-400/10 shadow-[0_0_50px_rgba(245,158,11,0.15)]';
    if (user.activeTitle?.visualTheme === 'purple') return 'text-cyber-purple border-[var(--color-cyber-purple)]/30 bg-cyber-purple/10 shadow-[0_0_50px_rgba(176,38,255,0.15)]';
    if (user.activeTitle?.visualTheme === 'emerald') return 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10 shadow-[0_0_50px_rgba(52,211,153,0.15)]';
    return 'text-cyber-cyan border-cyber-cyan/30 bg-cyber-cyan/10 shadow-[0_0_50px_rgba(0,240,255,0.15)]';
  };

  const getAuraColor = () => {
    if (user.activeTitle?.visualTheme === 'amber') return 'from-amber-500/20 via-amber-500/5 to-transparent';
    if (user.activeTitle?.visualTheme === 'purple') return 'from-cyber-purple/20 via-cyber-purple/5 to-transparent';
    if (user.activeTitle?.visualTheme === 'emerald') return 'from-emerald-500/20 via-emerald-500/5 to-transparent';
    return 'from-cyber-cyan/20 via-cyber-cyan/5 to-transparent';
  };

  const activeClassName = user.activeClass ? user.activeClass.name : 'Unassigned';
  const activeTitleName = user.activeTitle ? user.activeTitle.name : 'No Title Equipped';
  const rarityColor = user.activeTitle?.rarity === 'Legendary' ? 'text-amber-400' :
                      user.activeTitle?.rarity === 'Epic' ? 'text-cyber-purple' :
                      user.activeTitle?.rarity === 'Rare' ? 'text-cyber-cyan' : 'text-gray-400';

  const handleConnect = async (platformId: 'github' | 'leetcode') => {
    setIsSyncing(true);
    await connectPlatform(platformId, user.username);
    setIsSyncing(false);
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-5xl">
      {/* IDENTITY CODEX HEADER */}
      <div className={`bg-cyber-darker border rounded-xl overflow-hidden relative mb-8 ${getThemeColor().replace(/text-\S+/, '')}`}>
        <div className={`h-40 bg-gradient-to-b ${getAuraColor()} relative`}>
          <button className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 hover:bg-black border border-white/20 px-4 py-2 rounded text-sm transition-colors text-white/80 hover:text-white">
            <Share2 className="w-4 h-4" /> Export Identity
          </button>
        </div>
        
        <div className="px-8 pb-8 relative flex flex-col md:flex-row gap-8">
          {/* Avatar / Badge */}
          <div className="relative -mt-16 shrink-0">
            <motion.div 
              animate={{ boxShadow: user.activeTitle?.auraEffect === 'pulse' ? ['0 0 20px rgba(0,255,102,0.5)', '0 0 40px rgba(0,255,102,0.8)', '0 0 20px rgba(0,255,102,0.5)'] : '0 0 20px rgba(0,240,255,0.5)' }}
              transition={{ repeat: Infinity, duration: 2 }}
              className={`w-32 h-32 bg-black border-2 rounded-xl flex items-center justify-center transform rotate-3 ${getThemeColor().split(' ')[0]} ${getThemeColor().split(' ')[1]}`}
            >
              <div className="transform -rotate-3">
                {user.activeTitle?.badgeStyle === 'Sparkles' ? <Sparkles className="w-12 h-12" /> :
                 user.activeTitle?.badgeStyle === 'ShieldCheck' ? <ShieldCheck className="w-12 h-12" /> :
                 user.activeTitle?.badgeStyle === 'Network' ? <Network className="w-12 h-12" /> :
                 user.activeTitle?.badgeStyle === 'Cpu' ? <Cpu className="w-12 h-12" /> :
                 <Code2 className="w-12 h-12" />}
              </div>
            </motion.div>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div>
                <h1 className="text-4xl font-black font-mono tracking-wider mb-1 text-white">
                  {user.username}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-sm font-mono mt-2">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-cyber-muted" /> 
                    <span className="font-bold text-white/90">{activeClassName}</span>
                  </span>
                  <span className={`px-3 py-1 bg-white/5 border border-white/10 rounded-full flex items-center gap-2 ${rarityColor}`}>
                    <Trophy className="w-4 h-4" /> 
                    <span className="font-bold">{activeTitleName}</span>
                  </span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="text-center px-6 py-3 bg-black/40 rounded-lg border border-white/5">
                  <div className="text-3xl font-bold text-white">{user.level}</div>
                  <div className="text-[10px] text-cyber-muted font-mono tracking-widest mt-1">LEVEL</div>
                </div>
                <div className="text-center px-6 py-3 bg-black/40 rounded-lg border border-white/5">
                  <div className="text-3xl font-bold text-cyber-cyan text-glow-cyan">{user.xp}</div>
                  <div className="text-[10px] text-cyber-muted font-mono tracking-widest mt-1">TOTAL XP</div>
                </div>
              </div>
            </div>
            
            {user.activeTitle?.loreText && (
              <p className="mt-6 text-sm text-cyber-muted italic border-l-2 pl-4 border-white/20">
                "{user.activeTitle.loreText}"
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: BUILD STATS & EVOLUTION */}
        <div className="md:col-span-1 space-y-8">
          
          <div className="bg-cyber-darker border border-white/10 rounded-xl p-6">
            <h3 className="text-sm font-mono font-bold text-cyber-muted tracking-widest border-b border-white/10 pb-3 mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4" /> BUILD PROFILE
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-cyber-muted font-mono mb-1">Dominant Domain</div>
                <div className="text-sm font-bold text-white bg-white/5 p-2 rounded border border-white/5">
                  {user.dominantDomain || 'Undecided'}
                </div>
              </div>
              <div>
                <div className="text-xs text-cyber-muted font-mono mb-1">Progression Style</div>
                <div className="text-sm font-bold text-white bg-white/5 p-2 rounded border border-white/5">
                  {user.progressionStyle || 'Generalist'}
                </div>
              </div>
              <div>
                <div className="text-xs text-cyber-muted font-mono mb-1">Class Evolutions</div>
                <div className="space-y-2 mt-2">
                  {user.unlockedClasses && user.unlockedClasses.length > 0 ? (
                    user.unlockedClasses.map((cls, idx) => (
                      <div key={cls.id} className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${idx === user.unlockedClasses.length - 1 ? 'bg-cyber-cyan shadow-[0_0_10px_rgba(0,240,255,0.8)]' : 'bg-white/20'}`} />
                        <div className={`text-sm ${idx === user.unlockedClasses.length - 1 ? 'text-white font-bold' : 'text-cyber-muted'}`}>
                          {cls.name} <span className="text-xs font-mono opacity-50 ml-2">T{cls.tier}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-cyber-muted italic">No classes unlocked yet.</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-cyber-darker border border-white/10 rounded-xl p-6">
            <h3 className="text-sm font-mono font-bold text-cyber-muted tracking-widest border-b border-white/10 pb-3 mb-4 flex items-center gap-2">
              <LinkIcon className="w-4 h-4" /> CONNECTED PLATFORMS
            </h3>
            
            <div className="space-y-3">
              {/* GITHUB */}
              <div className="flex items-center justify-between bg-white/5 border border-white/5 p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-white/10 p-2 rounded-md"><GitBranch className="w-5 h-5 text-white" /></div>
                  <div>
                    <div className="text-sm font-bold text-white">GitHub</div>
                    <div className="text-[10px] text-cyber-muted font-mono">
                      {user.connectedPlatforms.find(p => p.platformId === 'github') ? 'Connected' : 'Not Connected'}
                    </div>
                  </div>
                </div>
                {user.connectedPlatforms.find(p => p.platformId === 'github') ? (
                  <button onClick={() => handleConnect('github')} disabled={isSyncing} className="p-2 bg-cyber-cyan/10 hover:bg-cyber-cyan/20 border border-cyber-cyan/30 text-cyber-cyan rounded transition-colors disabled:opacity-50">
                    <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                  </button>
                ) : (
                  <button onClick={() => handleConnect('github')} disabled={isSyncing} className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs font-bold text-white rounded transition-colors disabled:opacity-50">
                    Connect
                  </button>
                )}
              </div>

              {/* LEETCODE */}
              <div className="flex items-center justify-between bg-white/5 border border-white/5 p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-500/10 p-2 rounded-md"><Code2 className="w-5 h-5 text-amber-500" /></div>
                  <div>
                    <div className="text-sm font-bold text-white">LeetCode</div>
                    <div className="text-[10px] text-cyber-muted font-mono">
                      {user.connectedPlatforms.find(p => p.platformId === 'leetcode') ? 'Connected' : 'Not Connected'}
                    </div>
                  </div>
                </div>
                {user.connectedPlatforms.find(p => p.platformId === 'leetcode') ? (
                   <button onClick={() => handleConnect('leetcode')} disabled={isSyncing} className="p-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-500 rounded transition-colors disabled:opacity-50">
                     <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                   </button>
                ) : (
                  <button onClick={() => handleConnect('leetcode')} disabled={isSyncing} className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs font-bold text-white rounded transition-colors disabled:opacity-50">
                    Connect
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: TITLES & SKILLS */}
        <div className="md:col-span-2 space-y-8">
          
          <div className="bg-cyber-darker border border-white/10 rounded-xl p-6">
            <h3 className="text-sm font-mono font-bold text-cyber-muted tracking-widest border-b border-white/10 pb-3 mb-4 flex items-center gap-2">
              <Trophy className="w-4 h-4" /> EARNED TITLES
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {user.unlockedTitles && user.unlockedTitles.length > 0 ? (
                user.unlockedTitles.map(title => (
                  <div key={title.id} className="bg-black/30 border border-white/5 p-4 rounded-lg relative overflow-hidden group">
                    {title.rarity === 'Legendary' && <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />}
                    {title.rarity === 'Epic' && <div className="absolute inset-0 bg-gradient-to-r from-cyber-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />}
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-1">
                        <div className="font-bold text-white text-sm">{title.name}</div>
                        <div className={`text-[10px] font-mono px-2 py-0.5 rounded border 
                          ${title.rarity === 'Legendary' ? 'text-amber-400 border-amber-400/30 bg-amber-400/10' :
                            title.rarity === 'Epic' ? 'text-cyber-purple border-cyber-purple/30 bg-cyber-purple/10' :
                            title.rarity === 'Rare' ? 'text-cyber-cyan border-cyber-cyan/30 bg-cyber-cyan/10' :
                            'text-gray-400 border-gray-400/30 bg-gray-400/10'}`}>
                          {title.rarity}
                        </div>
                      </div>
                      <div className="text-xs text-cyber-muted">{title.description}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-cyber-muted italic text-sm">No titles earned yet. Complete skills to unlock your first title!</div>
              )}
            </div>
          </div>

          <div className="bg-cyber-darker border border-white/10 rounded-xl p-6">
            <h3 className="text-sm font-mono font-bold text-cyber-muted tracking-widest border-b border-white/10 pb-3 mb-4 flex items-center gap-2">
              <Code2 className="w-4 h-4" /> SPECIALIZATION MAP
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {completedSkills.length === 0 ? (
                <div className="col-span-full text-cyber-muted italic text-sm">No skills completed yet.</div>
              ) : (
                completedSkills.map(skill => {
                  const verification = user.verifications?.find(v => v.skillId === skill.id);
                  const isVerified = verification?.level === 3;

                  return (
                    <div key={skill.id} className={`p-3 rounded-lg border transition-colors relative overflow-hidden group
                      ${isVerified ? 'bg-amber-500/10 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]' : 'bg-white/5 border-white/5 hover:border-cyber-cyan/50'}`}>
                      
                      <div className="flex justify-between items-start">
                        <div className={`font-bold text-sm truncate ${isVerified ? 'text-amber-400' : skill.universalSkill ? 'text-white/90' : 'text-white/80'}`}>
                          {skill.title}
                        </div>
                        {isVerified && (
                          <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0 ml-2 drop-shadow-[0_0_5px_rgba(245,158,11,0.8)]" />
                        )}
                      </div>
                      
                      <div className={`text-[10px] font-mono mt-1 uppercase ${isVerified ? 'text-amber-500/70' : 'text-cyber-muted'}`}>
                        {skill.category}
                      </div>

                      {isVerified && (
                        <div className="mt-2 text-[9px] font-mono text-amber-400/80 bg-amber-500/10 px-1 py-0.5 rounded inline-block">
                          Verified: {verification.verifiedBy}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
