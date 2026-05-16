export type Season = {
  id: string;
  title: string;
  theme: string;
  startDate: string;
  endDate: string;
  featuredDomains: string[];
  eventChallenges: string[];
  seasonalRewards: string[];
  leaderboardRules: Record<string, any>;
  exclusiveTitles: string[];
  cosmetics: string[];
  progressionTrack: {
    levels: {
      level: number;
      xpRequired: number;
      rewards: string[];
    }[];
  };
};

export type GlobalEvent = {
  id: string;
  title: string;
  description: string;
  type: 'sprint' | 'raid' | 'arena' | 'trial';
  startDate: string;
  endDate: string;
  rewards: string[];
};

export type CommunityGoal = {
  id: string;
  title: string;
  targetCount: number;
  currentCount: number;
  rewardUnlocks: string[];
};

export type Mission = {
  id: string;
  title: string;
  type: 'daily' | 'weekly';
  description: string;
  xpReward: number;
  isCompleted: boolean;
};

export type RegionalCompetition = {
  id: string;
  title: string;
  type: 'college' | 'city' | 'state' | 'global';
  startDate: string;
  endDate: string;
  leaderboard: {
    entityId: string;
    name: string;
    score: number;
  }[];
  rewards: string[];
};
