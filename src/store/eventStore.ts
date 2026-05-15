import { create } from 'zustand';
import { Season, GlobalEvent, CommunityGoal, Mission, WorldStateChange } from '../types/events';

interface EventState {
  activeSeason: Season | null;
  activeEvents: GlobalEvent[];
  communityGoals: CommunityGoal[];
  dailyMissions: Mission[];
  weeklyMissions: Mission[];
  activeWorldChanges: WorldStateChange[];
  
  // Actions
  setSeason: (season: Season) => void;
  setEvents: (events: GlobalEvent[]) => void;
  updateCommunityGoal: (goalId: string, addedAmount: number) => void;
  completeMission: (missionId: string) => void;
}

// Dummy initial data for the simulation
const initialSeason: Season = {
  id: 'season-1',
  title: 'Neon Builder Event',
  theme: 'cyber-neon',
  startDate: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
  endDate: new Date(Date.now() + 86400000 * 25).toISOString(), // 25 days from now
  featuredDomains: ['frontend', 'design'],
  eventChallenges: ['build-cyber-ui', 'neon-animations'],
  seasonalRewards: ['neon-profile-border', 'title-neon-pathfinder'],
  leaderboardRules: {},
  worldChanges: [
    {
      id: 'wc-1',
      type: 'visual',
      description: 'The world map is bathed in a neon grid.',
      isActive: true,
    }
  ],
  exclusiveTitles: ['Neon Pathfinder', 'Cyber Architect'],
  cosmetics: ['neon-trail', 'cyber-avatar'],
  progressionTrack: {
    levels: [
      { level: 1, xpRequired: 1000, rewards: ['xp-boost'] },
      { level: 2, xpRequired: 2500, rewards: ['neon-avatar-border'] },
      { level: 3, xpRequired: 5000, rewards: ['title-neon-pathfinder'] }
    ]
  }
};

const initialEvents: GlobalEvent[] = [
  {
    id: 'event-1',
    title: 'Frontend Sprint Week',
    description: 'Complete 5 frontend challenges this week to earn the Ascended Builder title.',
    type: 'sprint',
    startDate: new Date(Date.now() - 86400000 * 1).toISOString(),
    endDate: new Date(Date.now() + 86400000 * 6).toISOString(),
    rewards: ['title-ascended-builder', '500-xp']
  }
];

const initialCommunityGoals: CommunityGoal[] = [
  {
    id: 'cg-1',
    title: 'Deploy 500,000 Verified APIs Globally',
    targetCount: 500000,
    currentCount: 342150,
    rewardUnlocks: ['global-xp-boost-10%', 'unlock-dark-cyber-zone']
  }
];

const initialMissions: Mission[] = [
  {
    id: 'm-1',
    title: 'Solve 2 Challenges',
    type: 'daily',
    description: 'Complete any 2 challenges in your skill tree.',
    xpReward: 150,
    isCompleted: false,
  },
  {
    id: 'm-2',
    title: 'Help a Learner',
    type: 'daily',
    description: 'Provide an AI review for someone else\'s code.',
    xpReward: 200,
    isCompleted: true,
  },
  {
    id: 'wm-1',
    title: 'Complete a Boss Challenge',
    type: 'weekly',
    description: 'Defeat a domain boss this week.',
    xpReward: 1000,
    isCompleted: false,
  }
];

export const useEventStore = create<EventState>((set) => ({
  activeSeason: initialSeason,
  activeEvents: initialEvents,
  communityGoals: initialCommunityGoals,
  dailyMissions: initialMissions.filter(m => m.type === 'daily'),
  weeklyMissions: initialMissions.filter(m => m.type === 'weekly'),
  activeWorldChanges: initialSeason.worldChanges.filter(wc => wc.isActive),

  setSeason: (season) => set({ activeSeason: season, activeWorldChanges: season.worldChanges.filter(wc => wc.isActive) }),
  
  setEvents: (events) => set({ activeEvents: events }),
  
  updateCommunityGoal: (goalId, addedAmount) => set((state) => ({
    communityGoals: state.communityGoals.map(goal => 
      goal.id === goalId 
        ? { ...goal, currentCount: Math.min(goal.currentCount + addedAmount, goal.targetCount) }
        : goal
    )
  })),

  completeMission: (missionId) => set((state) => ({
    dailyMissions: state.dailyMissions.map(m => m.id === missionId ? { ...m, isCompleted: true } : m),
    weeklyMissions: state.weeklyMissions.map(m => m.id === missionId ? { ...m, isCompleted: true } : m),
  }))
}));
