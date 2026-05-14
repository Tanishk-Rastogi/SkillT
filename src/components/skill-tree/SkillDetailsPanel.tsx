"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, PlayCircle, Lock, Code2, Globe2, Network, ShieldCheck, 
  Briefcase, Check, Clock, Lightbulb, BookOpen, Video, 
  MonitorPlay, FileCode2, ExternalLink, Library, Rocket, Sword
} from "lucide-react";
import { Skill, ResourceItem } from "@/data/skills";
import { getChallengesForSkill, MASTERY_TIER_LABELS, MasteryTier } from "@/data/challenges";
import { useAuth } from "@/components/layout/AuthProvider";

interface SkillDetailsPanelProps {
  skill: Skill | null;
  onClose: () => void;
  onOpenChallenges: (skillId: string) => void;
}

const RARITY_COLORS = {
  Common: "text-gray-400 border-gray-400/20 bg-gray-400/5",
  Rare: "text-blue-400 border-blue-400/20 bg-blue-400/5",
  Epic: "text-purple-400 border-purple-400/20 bg-purple-400/5",
  Legendary: "text-amber-400 border-amber-400/20 bg-amber-400/5",
};

type TabType = "overview" | "challenges" | "applications" | "resources";

export function SkillDetailsPanel({ skill, onClose, onOpenChallenges }: SkillDetailsPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const { user } = useAuth();

  if (!skill) return null;

  const skillChallenges = getChallengesForSkill(skill.id);
  const currentMastery: MasteryTier = (user?.masteryTiers?.[skill.id] as MasteryTier) || 'Learned';
  const masteryMeta = MASTERY_TIER_LABELS[currentMastery];
  const TIER_ORDER: MasteryTier[] = ['Learned', 'Practiced', 'Applied', 'Mastered', 'Verified'];

  const renderResourceList = (title: string, icon: React.ReactNode, resources: ResourceItem[]) => {
    if (!resources || resources.length === 0) return null;
    return (
      <div className="mb-6">
        <h4 className="text-xs font-mono font-bold text-cyber-muted mb-3 flex items-center gap-2">
          {icon} {title}
        </h4>
        <div className="space-y-2">
          {resources.map((res, idx) => (
            <a 
              key={idx} 
              href={res.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:border-cyber-cyan hover:bg-cyber-cyan/10 transition-all group"
            >
              <div className="text-sm text-white/80 group-hover:text-cyber-cyan transition-colors truncate pr-4">
                {res.title}
              </div>
              <ExternalLink className="w-4 h-4 text-cyber-muted group-hover:text-cyber-cyan shrink-0" />
            </a>
          ))}
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md md:hidden"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ x: "100%", opacity: 0.5 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0.5 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 h-full w-full md:w-[600px] bg-cyber-darker/95 border-l border-white/10 z-50 flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.5)] backdrop-blur-xl overflow-hidden"
      >
        {/* Header */}
        <div className="relative shrink-0 border-b border-white/10 bg-black/20">
          <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] opacity-20 pointer-events-none ${skill.universalSkill ? 'bg-amber-500' : 'bg-cyber-cyan'}`} />
          
          <div className="p-6 relative z-10 flex items-start justify-between">
            <div className="flex gap-4">
              <div className={`p-4 rounded-2xl bg-black/50 border ${skill.status === 'Locked' ? 'border-cyber-muted/30 text-cyber-muted' : skill.universalSkill ? 'border-amber-500/30 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]' : 'border-cyber-cyan/30 text-cyber-cyan shadow-[0_0_20px_rgba(0,240,255,0.2)]'}`}>
                {skill.universalSkill ? <Globe2 className="w-10 h-10" /> : <Code2 className="w-10 h-10" />}
              </div>
              <div>
                <h2 className={`text-3xl font-black font-mono tracking-wider uppercase ${skill.universalSkill ? 'text-amber-400' : 'text-glow-cyan'}`}>
                  {skill.title}
                </h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-xs font-mono px-2 py-1 bg-white/5 border border-white/10 rounded text-cyber-muted">
                    {skill.category}
                  </span>
                  <span className={`text-xs font-mono px-2 py-1 rounded border ${RARITY_COLORS[skill.rarity]}`}>
                    {skill.rarity}
                  </span>
                  {skill.estimatedLearningTime && (
                    <span className="text-xs font-mono px-2 py-1 bg-white/5 border border-white/10 rounded text-cyber-muted flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {skill.estimatedLearningTime}
                    </span>
                  )}
                  {/* Mastery tier badge */}
                  <span className={`text-xs font-mono px-2 py-1 rounded border border-current bg-white/5 ${masteryMeta.color}`}>
                    ◆ {currentMastery}
                  </span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="p-2 text-cyber-muted hover:text-white rounded-lg hover:bg-white/5 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex px-6 gap-6 relative z-10 overflow-x-auto scrollbar-hide">
            {(['overview', 'challenges', 'applications', 'resources'] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 font-mono text-sm uppercase tracking-widest relative transition-colors whitespace-nowrap ${
                  activeTab === tab ? "text-white font-bold" : "text-cyber-muted hover:text-white/80"
                }`}
              >
                {tab}
                {tab === 'challenges' && skillChallenges.length > 0 && (
                  <span className="ml-1.5 text-[9px] bg-cyber-cyan/20 text-cyber-cyan rounded-full px-1.5 py-0.5 font-bold">
                    {skillChallenges.length}
                  </span>
                )}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className={`absolute bottom-0 left-0 right-0 h-0.5 ${skill.universalSkill ? 'bg-amber-400' : 'bg-cyber-cyan'}`}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <AnimatePresence mode="wait">

            {/* OVERVIEW */}
            {activeTab === 'overview' && (
              <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8 pb-10">
                {skill.universalSkill && (
                  <div className="px-5 py-4 border border-amber-500/30 bg-amber-500/10 rounded-xl flex items-start gap-4">
                    <Globe2 className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-bold text-amber-500 font-mono tracking-widest mb-1">UNIVERSAL SKILL</h3>
                      <p className="text-sm text-amber-500/80 leading-relaxed">This skill is foundational. Learning it here unlocks it permanently across all other domains and roles.</p>
                    </div>
                  </div>
                )}
                <div>
                  <h3 className="text-xs font-bold text-cyber-muted font-mono tracking-widest mb-3 flex items-center gap-2"><Code2 className="w-4 h-4" /> WHAT IT IS</h3>
                  <p className="text-white/90 leading-relaxed text-[15px]">{skill.description}</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-cyber-muted font-mono tracking-widest mb-3 flex items-center gap-2"><Lightbulb className="w-4 h-4" /> WHY IT EXISTS</h3>
                  <p className="text-white/80 leading-relaxed text-sm bg-white/5 p-4 rounded-xl border border-white/5">{skill.whyItExists}</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-cyber-muted font-mono tracking-widest mb-3 flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> WHY IT MATTERS</h3>
                  <p className="text-white/80 leading-relaxed text-[15px] italic border-l-2 border-cyber-purple pl-4">&ldquo;{skill.whyItMatters}&rdquo;</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                    <h4 className="text-xs font-mono text-cyber-muted mb-1">XP POTENTIAL</h4>
                    <div className="text-2xl font-black text-cyber-green">+{skill.xpValue}</div>
                  </div>
                  <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                    <h4 className="text-xs font-mono text-cyber-muted mb-1">DIFFICULTY</h4>
                    <div className="text-lg font-bold text-white">{skill.difficulty}</div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* CHALLENGES */}
            {activeTab === 'challenges' && (
              <motion.div key="challenges" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-5 pb-10">
                {/* Mastery Tier Bar */}
                <div className="p-4 bg-black/40 border border-white/8 rounded-xl">
                  <div className="text-xs font-mono font-bold text-cyber-muted tracking-widest mb-3">YOUR MASTERY TIER</div>
                  <div className="flex gap-1.5">
                    {TIER_ORDER.map(tier => {
                      const meta = MASTERY_TIER_LABELS[tier];
                      const isActive = tier === currentMastery;
                      const isPast = TIER_ORDER.indexOf(tier) < TIER_ORDER.indexOf(currentMastery);
                      return (
                        <div key={tier} className="flex-1 text-center">
                          <div className={`text-xs font-mono font-black py-1.5 rounded border transition-all
                            ${isActive ? `${meta.color} border-current bg-white/5` : isPast ? 'text-cyber-green/60 border-cyber-green/20 bg-cyber-green/5' : 'text-white/20 border-white/5'}`}>
                            {meta.shortLabel}
                          </div>
                          <div className="text-[8px] text-cyber-muted mt-1 hidden sm:block truncate">{tier}</div>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-xs text-cyber-muted mt-2">{masteryMeta.description}</p>
                </div>

                {skillChallenges.length === 0 ? (
                  <div className="text-center py-10">
                    <Sword className="w-10 h-10 text-cyber-muted mx-auto mb-3 opacity-40" />
                    <p className="text-sm text-cyber-muted italic">No challenges available yet for this skill.</p>
                  </div>
                ) : (
                  skillChallenges.map((ch, i) => {
                    const isDone = user?.completedChallenges?.some(c => c.challengeId === ch.id);
                    return (
                      <motion.div
                        key={ch.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        onClick={() => !isDone && onOpenChallenges(skill.id)}
                        className={`p-4 rounded-xl border transition-all
                          ${isDone ? 'opacity-50 border-white/8 cursor-default' : 'border-white/10 hover:border-cyber-cyan/40 hover:bg-cyber-cyan/5 cursor-pointer'}
                          ${ch.isBossChallenge ? 'bg-cyber-purple/5' : 'bg-black/20'}`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              {ch.isBossChallenge && <span className="text-amber-400">⚔</span>}
                              <span className="font-bold text-sm text-white font-mono">{ch.title}</span>
                            </div>
                            <p className="text-xs text-cyber-muted line-clamp-2">{ch.narrative}</p>
                            <div className="flex gap-1.5 mt-2 flex-wrap">
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-white/10 text-white/50">{ch.type.replace('_', ' ')}</span>
                              {ch.timeLimitMinutes && (
                                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-amber-400/30 text-amber-400 flex items-center gap-1">
                                  <Clock className="w-2.5 h-2.5" />{ch.timeLimitMinutes}min
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-sm font-black text-cyber-green font-mono">+{ch.xpReward}</div>
                            <div className="text-[9px] text-cyber-muted font-mono">XP</div>
                            {isDone && <div className="text-[10px] text-cyber-green font-mono mt-1">✓ Done</div>}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </motion.div>
            )}

            {/* APPLICATIONS */}
            {activeTab === 'applications' && (
              <motion.div key="applications" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8 pb-10">
                <div>
                  <h3 className="text-xs font-bold text-cyber-muted font-mono tracking-widest mb-3 flex items-center gap-2"><Globe2 className="w-4 h-4" /> REAL-WORLD USAGE</h3>
                  <p className="text-white/80 leading-relaxed text-[15px] bg-cyber-purple/5 border border-cyber-purple/20 p-4 rounded-xl">{skill.realWorldUsage}</p>
                </div>
                {skill.usedIn && skill.usedIn.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold text-cyber-muted font-mono tracking-widest mb-3 flex items-center gap-2"><Network className="w-4 h-4" /> COMMONLY USED IN</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {skill.usedIn.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-white/80 bg-white/5 px-3 py-2 rounded-lg border border-white/5">
                          <Check className="w-4 h-4 text-cyber-cyan" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {skill.recommendedProjects && skill.recommendedProjects.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold text-cyber-muted font-mono tracking-widest mb-3 flex items-center gap-2"><Rocket className="w-4 h-4" /> RECOMMENDED PROJECTS</h3>
                    <div className="space-y-3">
                      {skill.recommendedProjects.map((project, idx) => (
                        <div key={idx} className="bg-black/30 border border-white/10 p-4 rounded-xl text-sm text-white/90">{project}</div>
                      ))}
                    </div>
                  </div>
                )}
                {(skill.domainsUsedIn.length > 0 || skill.rolesUsedIn.length > 0) && (
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <h3 className="text-xs font-bold text-cyber-muted font-mono tracking-widest">GLOBAL PRESENCE MAP</h3>
                    {skill.domainsUsedIn.length > 0 && (
                      <div>
                        <h4 className="text-[10px] uppercase text-cyber-muted mb-2">Domains</h4>
                        <div className="flex flex-wrap gap-2">
                          {skill.domainsUsedIn.map(domain => (
                            <span key={domain} className="px-2 py-1 bg-cyber-purple/10 border border-cyber-purple/20 text-cyber-purple rounded text-xs font-mono">{domain}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {skill.rolesUsedIn.length > 0 && (
                      <div>
                        <h4 className="text-[10px] uppercase text-cyber-muted mb-2">Roles</h4>
                        <div className="flex flex-wrap gap-2">
                          {skill.rolesUsedIn.map(role => (
                            <span key={role} className="flex items-center gap-1 px-2 py-1 bg-white/5 border border-white/10 text-white/80 rounded text-xs">
                              <Briefcase className="w-3 h-3" /> {role}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* RESOURCES */}
            {activeTab === 'resources' && (
              <motion.div key="resources" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="pb-10">
                {renderResourceList("FREE COURSES", <MonitorPlay className="w-4 h-4" />, skill.learningResources?.freeCourses)}
                {renderResourceList("OFFICIAL DOCS", <BookOpen className="w-4 h-4" />, skill.documentationLinks)}
                {renderResourceList("YOUTUBE TUTORIALS", <Video className="w-4 h-4" />, skill.learningResources?.youtube)}
                {renderResourceList("INTERACTIVE PRACTICE", <FileCode2 className="w-4 h-4" />, skill.practicePlatforms)}
                {renderResourceList("GITHUB REPOSITORIES", <Code2 className="w-4 h-4" />, skill.githubRepos)}
                {renderResourceList("ARTICLES & GUIDES", <Library className="w-4 h-4" />, skill.learningResources?.articles)}
                {renderResourceList("PREMIUM COURSES", <BookOpen className="w-4 h-4" />, skill.learningResources?.paidCourses)}
                {(!skill.learningResources?.freeCourses?.length && !skill.documentationLinks?.length && !skill.learningResources?.youtube?.length) && (
                  <div className="text-center py-12 px-6 border border-white/5 rounded-xl bg-white/5">
                    <BookOpen className="w-12 h-12 text-cyber-muted mx-auto mb-4 opacity-50" />
                    <h3 className="text-white/80 font-bold mb-2">No Curated Resources Yet</h3>
                    <p className="text-sm text-cyber-muted">We&apos;re still compiling the best materials for this skill. Check back later!</p>
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Footer CTA */}
        <div className="p-6 border-t border-white/10 bg-black/60 backdrop-blur-xl shrink-0 z-20">
          {skill.status === "Completed" ? (
            <div className="flex flex-col gap-2">
              <div className="w-full py-3 px-6 bg-cyber-green/10 border border-cyber-green/30 text-cyber-green text-center rounded-lg font-mono font-bold tracking-widest flex items-center justify-center gap-2">
                <Check className="w-5 h-5" /> SKILL ACQUIRED
              </div>
              {skillChallenges.length > 0 && (
                <button
                  onClick={() => onOpenChallenges(skill.id)}
                  className="w-full py-2 px-6 border border-cyber-cyan/30 text-cyber-cyan text-center rounded-lg font-mono text-sm hover:bg-cyber-cyan/10 transition-all flex items-center justify-center gap-2"
                >
                  <Sword className="w-4 h-4" /> VIEW CHALLENGES ({skillChallenges.length})
                </button>
              )}
            </div>
          ) : skill.status === "Locked" ? (
            <div className="w-full py-4 px-6 bg-cyber-darker border border-cyber-muted/30 text-cyber-muted text-center rounded-lg font-mono font-bold tracking-widest flex items-center justify-center gap-2">
              <Lock className="w-5 h-5" /> PREREQUISITES NOT MET
            </div>
          ) : (
            <button
              onClick={() => onOpenChallenges(skill.id)}
              className={`w-full py-4 px-6 ${skill.universalSkill ? 'bg-amber-400 hover:bg-white' : 'bg-cyber-cyan hover:bg-white'} text-black text-center rounded-lg font-mono font-bold tracking-widest flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] group`}
            >
              <Sword className="w-5 h-5 group-hover:scale-110 transition-transform" /> 
              ACCEPT A CHALLENGE
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
