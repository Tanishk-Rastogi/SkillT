export type TitleRarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';
export type ProgressionStyle = 'Specialist' | 'Hybrid' | 'Generalist' | 'Pathfinder';

export interface Title {
  id: string;
  name: string;
  description: string;
  rarity: TitleRarity;
  hidden: boolean;
  unlockConditions: {
    requiredSkills?: string[];
    requiredDomains?: string[];
    minLevel?: number;
    customCondition?: string; // e.g. "Completed 5 Universal Skills"
  };
  progressionStyle: ProgressionStyle;
  visualTheme: string; // Tailwind color prefixes (e.g. 'amber', 'cyan', 'purple', 'green', 'rose')
  auraEffect: string; // 'none', 'pulse', 'glow', 'fire', 'matrix'
  badgeStyle: string; // Icon name string
  loreText: string;
}

export const INITIAL_TITLES: Title[] = [
  // --- VISIBLE TITLES ---
  {
    id: 'novice-coder',
    name: 'Novice Coder',
    description: 'Began the journey into the digital realm.',
    rarity: 'Common',
    hidden: false,
    unlockConditions: {
      minLevel: 1,
    },
    progressionStyle: 'Generalist',
    visualTheme: 'gray',
    auraEffect: 'none',
    badgeStyle: 'Code',
    loreText: 'Every grand system begins with a single line of code.',
  },
  {
    id: 'api-ranger',
    name: 'API Ranger',
    description: 'Mastered the art of communication between systems.',
    rarity: 'Rare',
    hidden: false,
    unlockConditions: {
      requiredSkills: ['apis-rest'],
      minLevel: 5,
    },
    progressionStyle: 'Specialist',
    visualTheme: 'cyan',
    auraEffect: 'glow',
    badgeStyle: 'Network',
    loreText: 'They navigate the invisible webs that bind the world together.',
  },
  {
    id: 'infrastructure-warden',
    name: 'Infrastructure Warden',
    description: 'Secured the core data systems and user identities.',
    rarity: 'Epic',
    hidden: false,
    unlockConditions: {
      requiredSkills: ['authentication', 'databases-sql'],
    },
    progressionStyle: 'Hybrid',
    visualTheme: 'emerald',
    auraEffect: 'pulse',
    badgeStyle: 'ShieldCheck',
    loreText: 'The steadfast protector of the data fortress. Nothing enters without their knowledge.',
  },

  // --- HIDDEN TITLES ---
  {
    id: 'reality-weaver',
    name: 'Reality Weaver',
    description: 'Combined logic and visual presentation to create interactive worlds.',
    rarity: 'Legendary',
    hidden: true,
    unlockConditions: {
      requiredSkills: ['react-basics', 'dom-manipulation'],
    },
    progressionStyle: 'Specialist',
    visualTheme: 'purple',
    auraEffect: 'matrix',
    badgeStyle: 'Sparkles',
    loreText: 'They don\'t just build interfaces; they weave the fabric of digital reality itself.',
  },
  {
    id: 'system-whisperer',
    name: 'System Whisperer',
    description: 'Understands the deep flow of the backend and global version control.',
    rarity: 'Epic',
    hidden: true,
    unlockConditions: {
      requiredSkills: ['node-basics', 'git-version-control'],
    },
    progressionStyle: 'Hybrid',
    visualTheme: 'amber',
    auraEffect: 'glow',
    badgeStyle: 'Cpu',
    loreText: 'Machines speak a language of their own, and the Whisperer listens intently.',
  }
];
