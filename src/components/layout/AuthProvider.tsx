"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { INITIAL_SKILLS, Skill, SkillStatus } from "@/data/skills";
import { ProgressionEngine } from "@/lib/ProgressionEngine";
import { CharacterClass } from "@/data/classes";
import { Title, ProgressionStyle } from "@/data/titles";
import { VerificationRecord, ConnectedPlatform } from "@/data/verifications";
import { VerificationEngine } from "@/lib/VerificationEngine";
import { FeedEvent } from "@/data/social";
import { ChallengeSubmission, MasteryTier, Challenge } from "@/data/challenges";
import { AIReviewEngine } from "@/lib/AIReviewEngine";

export interface UserState {
  id: string;
  username: string;
  xp: number;
  level: number;
  skills: Skill[];
  activeClass: CharacterClass | null;
  unlockedClasses: CharacterClass[];
  activeTitle: Title | null;
  unlockedTitles: Title[];
  dominantDomain: string;
  progressionStyle: ProgressionStyle;
  connectedPlatforms: ConnectedPlatform[];
  verifications: VerificationRecord[];
  feedEvents: FeedEvent[];
  streakDays: number;
  completedChallenges: ChallengeSubmission[];
  masteryTiers: Record<string, MasteryTier>;
  guildId: string | null;
  partyId: string | null;
  mentorRating: number;
}

interface AuthContextType {
  user: UserState | null;
  login: (username: string) => void;
  logout: () => void;
  completeSkill: (skillId: string) => void;
  connectPlatform: (platformId: 'github' | 'leetcode' | 'gfg', username: string) => Promise<void>;
  submitChallenge: (challenge: Challenge, submissionText: string) => Promise<ChallengeSubmission>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserState | null>(null);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("skilltree_user");
    if (saved) {
      setUser(JSON.parse(saved));
    } else {
      // Default mock user for testing if none exists
      const defaultUser: UserState = {
        id: "mock-user-1",
        username: "CyberDev",
        xp: 0,
        level: 1,
        skills: INITIAL_SKILLS,
        activeClass: null,
        unlockedClasses: [],
        activeTitle: null,
        unlockedTitles: [],
        dominantDomain: "Undecided",
        progressionStyle: "Generalist",
        connectedPlatforms: [],
        verifications: [],
        feedEvents: [],
        streakDays: 0,
        completedChallenges: [],
        masteryTiers: {},
        guildId: null,
        partyId: null,
        mentorRating: 0,
      };
      // Run the initial evaluation just in case the mock has some completed skills
      const completedSkillIds = defaultUser.skills.filter(s => s.status === 'Completed').map(s => s.id);
      defaultUser.unlockedClasses = ProgressionEngine.evaluateClasses(completedSkillIds, defaultUser.level);
      defaultUser.unlockedTitles = ProgressionEngine.evaluateTitles(completedSkillIds, defaultUser.level);
      if (defaultUser.unlockedClasses.length > 0) defaultUser.activeClass = defaultUser.unlockedClasses[defaultUser.unlockedClasses.length - 1];
      if (defaultUser.unlockedTitles.length > 0) defaultUser.activeTitle = defaultUser.unlockedTitles[defaultUser.unlockedTitles.length - 1];

      setUser(defaultUser);
      localStorage.setItem("skilltree_user", JSON.stringify(defaultUser));
    }
  }, []);

  // Save to local storage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("skilltree_user", JSON.stringify(user));
    }
  }, [user]);

  const login = (username: string) => {
    setUser({
      id: Math.random().toString(36).substr(2, 9),
      username,
      xp: 0,
      level: 1,
      skills: INITIAL_SKILLS,
      activeClass: null,
      unlockedClasses: ProgressionEngine.evaluateClasses([], 1),
      activeTitle: null,
      unlockedTitles: ProgressionEngine.evaluateTitles([], 1),
      dominantDomain: "Undecided",
      progressionStyle: "Generalist",
      connectedPlatforms: [],
      verifications: [],
      feedEvents: [],
      streakDays: 0,
      completedChallenges: [],
      masteryTiers: {},
      guildId: null,
      partyId: null,
      mentorRating: 0,
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("skilltree_user");
  };

  const completeSkill = (skillId: string) => {
    if (!user) return;

    setUser((prev) => {
      if (!prev) return prev;

      let gainedXp = 0;
      
      const newSkills = prev.skills.map((skill) => {
        if (skill.id === skillId) {
          gainedXp = skill.xpValue as number;
          return { ...skill, status: "Completed" as SkillStatus };
        }
        return skill;
      });

      // Update available skills based on connections
      // (For MVP, we can just unlock everything that has its prerequisites completed)
      // Actually, we'll do this in the component level or a specific hook, 
      // but for simplicity let's handle basic unlocking here.
      
      const newXp = prev.xp + gainedXp;
      const newLevel = Math.floor(newXp / 100) + 1; // Simple leveling: 100 XP per level

      // Identity Calculation
      const completedSkills = newSkills.filter(s => s.status === 'Completed');
      const completedSkillIds = completedSkills.map(s => s.id);
      
      const unlockedClasses = ProgressionEngine.evaluateClasses(completedSkillIds, newLevel);
      const unlockedTitles = ProgressionEngine.evaluateTitles(completedSkillIds, newLevel);
      const dominantDomain = ProgressionEngine.computeDominantDomain(completedSkills);
      const progressionStyle = ProgressionEngine.computeProgressionStyle(completedSkills);

      // Auto-equip the latest class and title if unlocked
      let newActiveClass = prev.activeClass;
      if (unlockedClasses.length > prev.unlockedClasses.length || !newActiveClass) {
        newActiveClass = unlockedClasses[unlockedClasses.length - 1] || null;
      }

      let newActiveTitle = prev.activeTitle;
      if (unlockedTitles.length > prev.unlockedTitles.length || !newActiveTitle) {
        newActiveTitle = unlockedTitles[unlockedTitles.length - 1] || null;
      }

      // Generate feed event
      const skill = prev.skills.find(s => s.id === skillId);
      const newFeedEvent: FeedEvent = {
        id: `feed-${Date.now()}`,
        type: 'skill_unlock',
        username: prev.username,
        userClass: newActiveClass?.name || 'Builder',
        userLevel: newLevel,
        message: `Unlocked: ${skill?.title || skillId}`,
        subtext: `+${skill?.xpValue || 0} XP · ${skill?.category || ''} domain`,
        rarity: skill?.rarity as FeedEvent['rarity'] || 'Common',
        timestamp: new Date().toISOString(),
      };

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        skills: newSkills,
        unlockedClasses,
        unlockedTitles,
        activeClass: newActiveClass,
        activeTitle: newActiveTitle,
        dominantDomain,
        progressionStyle,
        feedEvents: [newFeedEvent, ...prev.feedEvents].slice(0, 50),
      };
    });
  };

  const connectPlatform = async (platformId: 'github' | 'leetcode' | 'gfg', username: string) => {
    if (!user) return;

    try {
      const { platform, newVerifications } = await VerificationEngine.simulateConnection(platformId, username);
      
      setUser((prev) => {
        if (!prev) return prev;
        
        // Merge platforms
        const existingPlatformIndex = prev.connectedPlatforms.findIndex(p => p.platformId === platformId);
        let updatedPlatforms = [...prev.connectedPlatforms];
        if (existingPlatformIndex >= 0) {
          updatedPlatforms[existingPlatformIndex] = platform;
        } else {
          updatedPlatforms.push(platform);
        }

        // Merge verifications and auto-complete skills if verified
        let updatedVerifications = [...prev.verifications];
        let updatedSkills = [...prev.skills];
        let gainedXp = 0;

        newVerifications.forEach(newV => {
          const existingV = updatedVerifications.findIndex(v => v.skillId === newV.skillId);
          if (existingV >= 0) {
             updatedVerifications[existingV] = newV;
          } else {
             updatedVerifications.push(newV);
          }

          // If it's highly verified, ensure the skill is marked as completed
          if (newV.level === 3) {
            updatedSkills = updatedSkills.map(skill => {
              if (skill.id === newV.skillId && skill.status !== 'Completed') {
                gainedXp += skill.xpValue as number;
                return { ...skill, status: 'Completed' as SkillStatus };
              }
              return skill;
            });
          }
        });

        const newXp = prev.xp + gainedXp;
        const newLevel = Math.floor(newXp / 100) + 1;

        // Re-evaluate Identity
        const completedSkills = updatedSkills.filter(s => s.status === 'Completed');
        const completedSkillIds = completedSkills.map(s => s.id);
        
        const unlockedClasses = ProgressionEngine.evaluateClasses(completedSkillIds, newLevel);
        const unlockedTitles = ProgressionEngine.evaluateTitles(completedSkillIds, newLevel);
        const dominantDomain = ProgressionEngine.computeDominantDomain(completedSkills);
        const progressionStyle = ProgressionEngine.computeProgressionStyle(completedSkills);

        let newActiveClass = prev.activeClass;
        if (unlockedClasses.length > prev.unlockedClasses.length || !newActiveClass) {
          newActiveClass = unlockedClasses[unlockedClasses.length - 1] || null;
        }

        let newActiveTitle = prev.activeTitle;
        if (unlockedTitles.length > prev.unlockedTitles.length || !newActiveTitle) {
          newActiveTitle = unlockedTitles[unlockedTitles.length - 1] || null;
        }

        return {
          ...prev,
          xp: newXp,
          level: newLevel,
          skills: updatedSkills,
          connectedPlatforms: updatedPlatforms,
          verifications: updatedVerifications,
          unlockedClasses,
          unlockedTitles,
          activeClass: newActiveClass,
          activeTitle: newActiveTitle,
          dominantDomain,
          progressionStyle,
        };
      });
    } catch (error) {
      console.error("Failed to connect platform", error);
    }
  };

  const submitChallenge = async (challenge: Challenge, submissionText: string): Promise<ChallengeSubmission> => {
    // Run AI review
    const aiFeedback = await AIReviewEngine.simulateReview(challenge);

    const submission: ChallengeSubmission = {
      id: `sub-${Date.now()}`,
      challengeId: challenge.id,
      skillId: challenge.skillId,
      challengeTitle: challenge.title,
      challengeType: challenge.type,
      submittedAt: new Date().toISOString(),
      status: 'reviewed',
      aiFeedback,
      xpEarned: challenge.xpReward,
    };

    setUser((prev) => {
      if (!prev) return prev;

      const newXp = prev.xp + challenge.xpReward;
      const newLevel = Math.floor(newXp / 100) + 1;

      // Update mastery tier
      const updatedMasteryTiers = { ...prev.masteryTiers };
      const currentTier = prev.masteryTiers[challenge.skillId];
      const newTier = aiFeedback.masteryUnlocked;
      const tierOrder = ['Learned', 'Practiced', 'Applied', 'Mastered', 'Verified'];
      if (!currentTier || tierOrder.indexOf(newTier) > tierOrder.indexOf(currentTier)) {
        updatedMasteryTiers[challenge.skillId] = newTier;
      }

      // Mark skill as completed if challenge awarded Applied or higher
      let updatedSkills = prev.skills;
      if (['Applied', 'Mastered', 'Verified'].includes(newTier)) {
        updatedSkills = prev.skills.map(s =>
          s.id === challenge.skillId && s.status !== 'Completed'
            ? { ...s, status: 'Completed' as SkillStatus }
            : s
        );
      }

      // Re-evaluate identity
      const completedSkills = updatedSkills.filter(s => s.status === 'Completed');
      const completedSkillIds = completedSkills.map(s => s.id);
      const unlockedClasses = ProgressionEngine.evaluateClasses(completedSkillIds, newLevel);
      const unlockedTitles = ProgressionEngine.evaluateTitles(completedSkillIds, newLevel);
      const dominantDomain = ProgressionEngine.computeDominantDomain(completedSkills);
      const progressionStyle = ProgressionEngine.computeProgressionStyle(completedSkills);

      let newActiveClass = prev.activeClass;
      if (unlockedClasses.length > prev.unlockedClasses.length || !newActiveClass) {
        newActiveClass = unlockedClasses[unlockedClasses.length - 1] || null;
      }
      let newActiveTitle = prev.activeTitle;
      if (unlockedTitles.length > prev.unlockedTitles.length || !newActiveTitle) {
        newActiveTitle = unlockedTitles[unlockedTitles.length - 1] || null;
      }

      // Feed event
      const feedRarity = challenge.isBossChallenge ? 'Legendary' : challenge.rarity as FeedEvent['rarity'];
      const feedEvent: FeedEvent = {
        id: `feed-challenge-${Date.now()}`,
        type: challenge.isBossChallenge ? 'rare_discovery' : 'skill_unlock',
        username: prev.username,
        userClass: newActiveClass?.name || 'Builder',
        userLevel: newLevel,
        message: challenge.isBossChallenge
          ? `Completed Boss Trial: ${challenge.title}`
          : `Completed challenge: ${challenge.title}`,
        subtext: `+${challenge.xpReward} XP · ${aiFeedback.proficiencyEstimate} · ${newTier} tier`,
        rarity: feedRarity,
        timestamp: new Date().toISOString(),
      };

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        skills: updatedSkills,
        completedChallenges: [submission, ...prev.completedChallenges],
        masteryTiers: updatedMasteryTiers,
        unlockedClasses,
        unlockedTitles,
        activeClass: newActiveClass,
        activeTitle: newActiveTitle,
        dominantDomain,
        progressionStyle,
        feedEvents: [feedEvent, ...prev.feedEvents].slice(0, 50),
      };
    });

    return submission;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, completeSkill, connectPlatform, submitChallenge }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
