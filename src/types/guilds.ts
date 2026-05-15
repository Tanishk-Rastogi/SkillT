export type GuildRole = 'Leader' | 'Strategist' | 'Mentor' | 'Recruiter' | 'Challenger' | 'Architect' | 'Raid Coordinator' | 'Member';

export type GuildMember = {
  userId: string;
  username: string;
  role: GuildRole;
  contributionXp: number;
  joinedAt: string;
};

export type Guild = {
  id: string;
  name: string;
  description: string;
  banner: string;
  level: number;
  xp: number;
  reputation: number;
  specialization: string[];
  members: GuildMember[];
  unlockedRewards: string[];
  achievements: string[];
};

export type Party = {
  id: string;
  name: string;
  leaderId: string;
  members: { userId: string; username: string; roleFilled: string }[];
  objective: string;
  lookingFor: string[]; // e.g., ['frontend', 'database-architect']
  isActive: boolean;
};

export type CoopChallenge = {
  id: string;
  title: string;
  description: string;
  rolesRequired: string[];
  xpReward: number;
  guildPrestige: number;
};
