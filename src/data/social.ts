// ============================================================
// SOCIAL DATA MODELS
// The foundation for the multiplayer progression ecosystem
// ============================================================

export type FeedEventType =
  | 'skill_unlock'
  | 'title_unlock'
  | 'class_evolution'
  | 'leaderboard_rank_change'
  | 'verification_complete'
  | 'streak_milestone'
  | 'rare_discovery';

export interface FeedEvent {
  id: string;
  type: FeedEventType;
  username: string;
  userClass: string;
  userLevel: number;
  message: string;
  subtext?: string;
  rarity?: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  timestamp: string; // ISO string
  metadata?: Record<string, unknown>;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  level: number;
  xp: number;
  activeClass: string;
  activeTitle: string;
  titleRarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  dominantDomain: string;
  verifiedSkillCount: number;
  streakDays: number;
  weeklyXp: number;
  // Weighted prestige score combining all factors
  prestigeScore: number;
  // Visual
  avatarIcon: string; // lucide icon name
  themeColor: 'cyan' | 'purple' | 'amber' | 'emerald' | 'rose';
}

// ============================================================
// MOCK NPC PLAYERS (15 rich fictional builds)
// These populate leaderboards and the activity feed
// ============================================================

export const MOCK_PLAYERS: LeaderboardEntry[] = [
  {
    rank: 1,
    userId: 'npc-1',
    username: 'NeuralNomad',
    level: 47,
    xp: 4650,
    activeClass: 'AI Architect',
    activeTitle: 'Reality Weaver',
    titleRarity: 'Legendary',
    dominantDomain: 'AI / Machine Learning',
    verifiedSkillCount: 18,
    streakDays: 84,
    weeklyXp: 320,
    prestigeScore: 9820,
    avatarIcon: 'Cpu',
    themeColor: 'purple',
  },
  {
    rank: 2,
    userId: 'npc-2',
    username: 'VaultBreaker',
    level: 41,
    xp: 4100,
    activeClass: 'Shadow Hacker',
    activeTitle: 'Zero-Day Prophet',
    titleRarity: 'Epic',
    dominantDomain: 'Cybersecurity',
    verifiedSkillCount: 15,
    streakDays: 61,
    weeklyXp: 290,
    prestigeScore: 8740,
    avatarIcon: 'ShieldCheck',
    themeColor: 'emerald',
  },
  {
    rank: 3,
    userId: 'npc-3',
    username: 'PixelForge',
    level: 38,
    xp: 3800,
    activeClass: 'UI Architect',
    activeTitle: 'UI Alchemist',
    titleRarity: 'Epic',
    dominantDomain: 'Web Development',
    verifiedSkillCount: 12,
    streakDays: 45,
    weeklyXp: 260,
    prestigeScore: 7910,
    avatarIcon: 'Sparkles',
    themeColor: 'cyan',
  },
  {
    rank: 4,
    userId: 'npc-4',
    username: 'K8sOverlord',
    level: 36,
    xp: 3600,
    activeClass: 'Infrastructure Architect',
    activeTitle: 'Infrastructure Warden',
    titleRarity: 'Rare',
    dominantDomain: 'DevOps',
    verifiedSkillCount: 14,
    streakDays: 52,
    weeklyXp: 210,
    prestigeScore: 7450,
    avatarIcon: 'Network',
    themeColor: 'amber',
  },
  {
    rank: 5,
    userId: 'npc-5',
    username: 'QuerySlayer',
    level: 33,
    xp: 3300,
    activeClass: 'Backend Engineer',
    activeTitle: 'Database Whisperer',
    titleRarity: 'Rare',
    dominantDomain: 'Web Development',
    verifiedSkillCount: 11,
    streakDays: 38,
    weeklyXp: 195,
    prestigeScore: 6830,
    avatarIcon: 'Database',
    themeColor: 'cyan',
  },
  {
    rank: 6,
    userId: 'npc-6',
    username: 'AlgoHunter',
    level: 31,
    xp: 3100,
    activeClass: 'Algorithm Specialist',
    activeTitle: 'Graph Traverser',
    titleRarity: 'Rare',
    dominantDomain: 'AI / Machine Learning',
    verifiedSkillCount: 9,
    streakDays: 29,
    weeklyXp: 180,
    prestigeScore: 6220,
    avatarIcon: 'TrendingUp',
    themeColor: 'purple',
  },
  {
    rank: 7,
    userId: 'npc-7',
    username: 'ReactSorcerer',
    level: 29,
    xp: 2900,
    activeClass: 'Frontend Builder',
    activeTitle: 'Component Crafter',
    titleRarity: 'Common',
    dominantDomain: 'Web Development',
    verifiedSkillCount: 8,
    streakDays: 21,
    weeklyXp: 165,
    prestigeScore: 5710,
    avatarIcon: 'Code2',
    themeColor: 'cyan',
  },
  {
    rank: 8,
    userId: 'npc-8',
    username: 'CloudDrifter',
    level: 27,
    xp: 2700,
    activeClass: 'Cloud Engineer',
    activeTitle: 'API Ranger',
    titleRarity: 'Common',
    dominantDomain: 'DevOps',
    verifiedSkillCount: 10,
    streakDays: 16,
    weeklyXp: 150,
    prestigeScore: 5340,
    avatarIcon: 'Globe',
    themeColor: 'emerald',
  },
  {
    rank: 9,
    userId: 'npc-9',
    username: 'ByteWarden',
    level: 25,
    xp: 2500,
    activeClass: 'Security Analyst',
    activeTitle: 'Cipher Knight',
    titleRarity: 'Rare',
    dominantDomain: 'Cybersecurity',
    verifiedSkillCount: 7,
    streakDays: 33,
    weeklyXp: 140,
    prestigeScore: 5010,
    avatarIcon: 'Lock',
    themeColor: 'emerald',
  },
  {
    rank: 10,
    userId: 'npc-10',
    username: 'TensorRider',
    level: 24,
    xp: 2400,
    activeClass: 'ML Engineer',
    activeTitle: 'Data Shaman',
    titleRarity: 'Common',
    dominantDomain: 'AI / Machine Learning',
    verifiedSkillCount: 6,
    streakDays: 14,
    weeklyXp: 135,
    prestigeScore: 4780,
    avatarIcon: 'Brain',
    themeColor: 'purple',
  },
  {
    rank: 11,
    userId: 'npc-11',
    username: 'NixPhantom',
    level: 22,
    xp: 2200,
    activeClass: 'DevOps Specialist',
    activeTitle: 'Shell Phantom',
    titleRarity: 'Common',
    dominantDomain: 'DevOps',
    verifiedSkillCount: 8,
    streakDays: 9,
    weeklyXp: 120,
    prestigeScore: 4390,
    avatarIcon: 'Terminal',
    themeColor: 'amber',
  },
  {
    rank: 12,
    userId: 'npc-12',
    username: 'TypeScriptor',
    level: 20,
    xp: 2000,
    activeClass: 'Frontend Builder',
    activeTitle: 'Type Enforcer',
    titleRarity: 'Common',
    dominantDomain: 'Web Development',
    verifiedSkillCount: 5,
    streakDays: 7,
    weeklyXp: 110,
    prestigeScore: 3970,
    avatarIcon: 'FileCode',
    themeColor: 'cyan',
  },
  {
    rank: 13,
    userId: 'npc-13',
    username: 'GingerNode',
    level: 18,
    xp: 1800,
    activeClass: 'Builder',
    activeTitle: 'API Ranger',
    titleRarity: 'Common',
    dominantDomain: 'Web Development',
    verifiedSkillCount: 4,
    streakDays: 5,
    weeklyXp: 95,
    prestigeScore: 3520,
    avatarIcon: 'Server',
    themeColor: 'cyan',
  },
  {
    rank: 14,
    userId: 'npc-14',
    username: 'SoloCoder',
    level: 14,
    xp: 1400,
    activeClass: 'Builder',
    activeTitle: 'Novice Coder',
    titleRarity: 'Common',
    dominantDomain: 'Undecided',
    verifiedSkillCount: 2,
    streakDays: 3,
    weeklyXp: 70,
    prestigeScore: 2810,
    avatarIcon: 'Code2',
    themeColor: 'cyan',
  },
  {
    rank: 15,
    userId: 'npc-15',
    username: 'DevNewbie',
    level: 8,
    xp: 800,
    activeClass: 'Builder',
    activeTitle: 'Novice Coder',
    titleRarity: 'Common',
    dominantDomain: 'Web Development',
    verifiedSkillCount: 1,
    streakDays: 1,
    weeklyXp: 40,
    prestigeScore: 1650,
    avatarIcon: 'Star',
    themeColor: 'cyan',
  },
];

// ============================================================
// MOCK FEED EVENTS (seeded activity stream)
// ============================================================

const now = new Date();
const minsAgo = (m: number) => new Date(now.getTime() - m * 60000).toISOString();

export const MOCK_FEED_EVENTS: FeedEvent[] = [
  {
    id: 'feed-1',
    type: 'title_unlock',
    username: 'NeuralNomad',
    userClass: 'AI Architect',
    userLevel: 47,
    message: 'Discovered hidden title: Reality Weaver',
    subtext: 'Legendary title unlocked through rare cross-domain mastery',
    rarity: 'Legendary',
    timestamp: minsAgo(3),
  },
  {
    id: 'feed-2',
    type: 'leaderboard_rank_change',
    username: 'VaultBreaker',
    userClass: 'Shadow Hacker',
    userLevel: 41,
    message: 'Entered Top 5 in Cybersecurity Rankings',
    subtext: '#2 Global · Cybersecurity Domain',
    rarity: 'Epic',
    timestamp: minsAgo(12),
  },
  {
    id: 'feed-3',
    type: 'verification_complete',
    username: 'K8sOverlord',
    userClass: 'Infrastructure Architect',
    userLevel: 36,
    message: 'Verified Kubernetes Mastery via GitHub',
    subtext: '14 skills now externally verified · Confidence: 97%',
    rarity: 'Rare',
    timestamp: minsAgo(28),
  },
  {
    id: 'feed-4',
    type: 'class_evolution',
    username: 'PixelForge',
    userClass: 'UI Architect',
    userLevel: 38,
    message: 'Evolved class: Frontend Builder → UI Architect',
    subtext: 'Tier 3 unlocked · Visual mastery confirmed',
    rarity: 'Epic',
    timestamp: minsAgo(45),
  },
  {
    id: 'feed-5',
    type: 'streak_milestone',
    username: 'NeuralNomad',
    userClass: 'AI Architect',
    userLevel: 47,
    message: 'Reached 84-day learning streak 🔥',
    subtext: 'Consistency bonus: +500 prestige score',
    rarity: 'Rare',
    timestamp: minsAgo(61),
  },
  {
    id: 'feed-6',
    type: 'skill_unlock',
    username: 'AlgoHunter',
    userClass: 'Algorithm Specialist',
    userLevel: 31,
    message: 'Unlocked: Advanced Dynamic Programming',
    subtext: 'Solved 200+ DP problems on LeetCode',
    rarity: 'Rare',
    timestamp: minsAgo(90),
  },
  {
    id: 'feed-7',
    type: 'rare_discovery',
    username: 'ByteWarden',
    userClass: 'Security Analyst',
    userLevel: 25,
    message: 'Discovered hidden synergy: Cipher Knight',
    subtext: 'Rare title unlocked via Crypto + Networking combination',
    rarity: 'Rare',
    timestamp: minsAgo(120),
  },
  {
    id: 'feed-8',
    type: 'verification_complete',
    username: 'ReactSorcerer',
    userClass: 'Frontend Builder',
    userLevel: 29,
    message: 'Connected GitHub · 8 skills auto-verified',
    subtext: 'React, TypeScript, CSS, Git · All verified Level 3',
    rarity: 'Common',
    timestamp: minsAgo(145),
  },
  {
    id: 'feed-9',
    type: 'class_evolution',
    username: 'CloudDrifter',
    userClass: 'Cloud Engineer',
    userLevel: 27,
    message: 'Evolved class: Builder → Cloud Engineer',
    subtext: 'Docker + Kubernetes + AWS pathway unlocked',
    rarity: 'Common',
    timestamp: minsAgo(200),
  },
  {
    id: 'feed-10',
    type: 'skill_unlock',
    username: 'TensorRider',
    userClass: 'ML Engineer',
    userLevel: 24,
    message: 'Unlocked: Neural Networks & Deep Learning',
    subtext: '+180 XP · AI / Machine Learning domain',
    rarity: 'Common',
    timestamp: minsAgo(240),
  },
];

// Helper: compute prestige score for the current user to inject into leaderboard
export function computeUserPrestigeScore(
  xp: number,
  level: number,
  verifiedSkillCount: number,
  streakDays: number,
  titleRarity: string,
  classCount: number
): number {
  const rarityBonus =
    titleRarity === 'Legendary' ? 2000 :
    titleRarity === 'Epic' ? 1000 :
    titleRarity === 'Rare' ? 500 : 0;

  return (
    xp * 1.5 +
    level * 80 +
    verifiedSkillCount * 150 +
    streakDays * 20 +
    classCount * 200 +
    rarityBonus
  );
}
