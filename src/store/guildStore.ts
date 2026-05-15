import { create } from 'zustand';
import { Guild, Party, CoopChallenge } from '../types/guilds';

interface GuildState {
  currentGuild: Guild | null;
  availableGuilds: Guild[];
  activeParty: Party | null;
  availableParties: Party[];
  coopChallenges: CoopChallenge[];
  
  // Actions
  joinGuild: (guildId: string, userId: string, username: string) => void;
  leaveGuild: () => void;
  joinParty: (partyId: string, userId: string, username: string, roleFilled: string) => void;
  leaveParty: () => void;
  createParty: (party: Party) => void;
}

// Dummy Initial Data
const initialAvailableGuilds: Guild[] = [
  {
    id: 'g-1',
    name: 'Frontend Syndicate',
    description: 'We build the visual layer of the internet. Join us to master React, animations, and UI/UX.',
    banner: 'bg-gradient-to-r from-blue-600 to-cyan-500',
    level: 12,
    xp: 45000,
    reputation: 980,
    specialization: ['React', 'CSS', 'UI/UX'],
    members: [
      { userId: 'u-101', username: 'UI_Master', role: 'Leader', contributionXp: 15000, joinedAt: '2025-01-10T00:00:00Z' },
      { userId: 'u-102', username: 'PixelPerfect', role: 'Strategist', contributionXp: 12000, joinedAt: '2025-02-15T00:00:00Z' },
    ],
    unlockedRewards: ['aura-neon', 'title-pixel-lord'],
    achievements: ['First to Level 10', 'CSS Battle Champions'],
  },
  {
    id: 'g-2',
    name: 'Backend Legion',
    description: 'Scaling architectures and optimizing queries. We are the backbone.',
    banner: 'bg-gradient-to-r from-emerald-600 to-teal-800',
    level: 15,
    xp: 68000,
    reputation: 1120,
    specialization: ['Node.js', 'Databases', 'System Design'],
    members: [
      { userId: 'u-201', username: 'RootAccess', role: 'Leader', contributionXp: 25000, joinedAt: '2024-11-05T00:00:00Z' },
    ],
    unlockedRewards: ['aura-matrix', 'title-server-god'],
    achievements: ['Zero Downtime Event Winners'],
  }
];

const initialParties: Party[] = [
  {
    id: 'p-1',
    name: 'Fullstack Hackathon Squad',
    leaderId: 'u-501',
    members: [{ userId: 'u-501', username: 'CodeNinja', roleFilled: 'backend' }],
    objective: 'Complete the "Build a Real-Time Chat" Co-op Challenge.',
    lookingFor: ['frontend', 'ui-designer'],
    isActive: true,
  }
];

const initialCoopChallenges: CoopChallenge[] = [
  {
    id: 'cc-1',
    title: 'Architect a Microservices Backend',
    description: 'Collaborate to design and simulate a microservices architecture handling 10k requests/second.',
    rolesRequired: ['System Architect', 'Database Engineer', 'API Developer'],
    xpReward: 5000,
    guildPrestige: 100,
  },
  {
    id: 'cc-2',
    title: 'Build a Physics Engine',
    description: 'Create a 2D physics engine using Canvas and TypeScript from scratch.',
    rolesRequired: ['Math Specialist', 'Frontend Engineer'],
    xpReward: 3500,
    guildPrestige: 50,
  }
];

export const useGuildStore = create<GuildState>((set) => ({
  currentGuild: null,
  availableGuilds: initialAvailableGuilds,
  activeParty: null,
  availableParties: initialParties,
  coopChallenges: initialCoopChallenges,

  joinGuild: (guildId, userId, username) => set((state) => {
    const guild = state.availableGuilds.find(g => g.id === guildId);
    if (!guild) return state;

    const updatedGuild = {
      ...guild,
      members: [...guild.members, { userId, username, role: 'Member' as const, contributionXp: 0, joinedAt: new Date().toISOString() }]
    };

    return { currentGuild: updatedGuild };
  }),

  leaveGuild: () => set({ currentGuild: null }),

  joinParty: (partyId, userId, username, roleFilled) => set((state) => {
    const party = state.availableParties.find(p => p.id === partyId);
    if (!party) return state;

    const updatedParty = {
      ...party,
      members: [...party.members, { userId, username, roleFilled }],
      lookingFor: party.lookingFor.filter(role => role !== roleFilled)
    };

    return { activeParty: updatedParty };
  }),

  leaveParty: () => set({ activeParty: null }),

  createParty: (party) => set((state) => ({
    activeParty: party,
    availableParties: [party, ...state.availableParties]
  })),
}));
