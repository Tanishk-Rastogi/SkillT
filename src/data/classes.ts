export interface CharacterClass {
  id: string;
  name: string;
  tier: number; // 1 = Base, 2 = Evolved, 3 = Master
  parentClass: string | null;
  evolutionPath: string;
  requiredSkills: string[];
  requiredProgression: number; // minimum level
  dominantDomains: string[];
  passiveBonuses: string[];
  visualTheme: 'cyber' | 'stealth' | 'creator' | 'architect' | 'mystic';
  description: string;
}

export const INITIAL_CLASSES: CharacterClass[] = [
  // --- TIER 1: BASE CLASSES ---
  {
    id: 'builder',
    name: 'Builder',
    tier: 1,
    parentClass: null,
    evolutionPath: 'Builder',
    requiredSkills: [],
    requiredProgression: 1,
    dominantDomains: ['Web Development'],
    passiveBonuses: ['+5% XP on Frontend Skills'],
    visualTheme: 'creator',
    description: 'Constructors of the digital realm. Builders excel at laying the foundation and bringing visual structure to life.',
  },
  {
    id: 'architect',
    name: 'Architect',
    tier: 1,
    parentClass: null,
    evolutionPath: 'Architect',
    requiredSkills: [],
    requiredProgression: 1,
    dominantDomains: ['Web Development', 'Backend Engineering'],
    passiveBonuses: ['+5% XP on Database Skills'],
    visualTheme: 'architect',
    description: 'System designers who focus on structure, data integrity, and scalable foundations.',
  },
  {
    id: 'hacker',
    name: 'Hacker',
    tier: 1,
    parentClass: null,
    evolutionPath: 'Hacker',
    requiredSkills: [],
    requiredProgression: 1,
    dominantDomains: ['Cybersecurity', 'DevOps'],
    passiveBonuses: ['+5% XP on Security Skills'],
    visualTheme: 'stealth',
    description: 'Explorers of vulnerabilities and masters of the terminal. Hackers bend systems to their will.',
  },
  {
    id: 'explorer',
    name: 'Explorer',
    tier: 1,
    parentClass: null,
    evolutionPath: 'Explorer',
    requiredSkills: [],
    requiredProgression: 1,
    dominantDomains: ['AI / Machine Learning', 'Data Science'],
    passiveBonuses: ['+5% XP on AI Skills'],
    visualTheme: 'mystic',
    description: 'Pioneers venturing into the unknown realms of data and machine intelligence.',
  },

  // --- TIER 2: EVOLVED CLASSES ---
  {
    id: 'frontend-builder',
    name: 'Frontend Builder',
    tier: 2,
    parentClass: 'builder',
    evolutionPath: 'Builder',
    requiredSkills: ['html-basics', 'css-basics', 'js-basics'],
    requiredProgression: 5,
    dominantDomains: ['Web Development'],
    passiveBonuses: ['+10% XP on Frontend Skills', 'Unlocks custom UI themes'],
    visualTheme: 'creator',
    description: 'A dedicated artisan of the client-side. You craft interfaces that millions interact with daily.',
  },
  {
    id: 'ui-architect',
    name: 'UI Architect',
    tier: 3,
    parentClass: 'frontend-builder',
    evolutionPath: 'Builder',
    requiredSkills: ['react-basics', 'responsive-design', 'dom-manipulation'],
    requiredProgression: 10,
    dominantDomains: ['Web Development'],
    passiveBonuses: ['+15% XP on Frontend Skills', 'Legendary Aura unlocked'],
    visualTheme: 'architect',
    description: 'A visionary of user experience. You design complex component systems and dictate the flow of interaction.',
  },
  {
    id: 'shadow-engineer',
    name: 'Shadow Engineer',
    tier: 2,
    parentClass: 'hacker',
    evolutionPath: 'Hacker',
    requiredSkills: ['authentication', 'git-version-control'],
    requiredProgression: 7,
    dominantDomains: ['Cybersecurity', 'Backend Engineering'],
    passiveBonuses: ['Hidden from leaderboards (optional)', '+10% XP on Security'],
    visualTheme: 'stealth',
    description: 'Operating unseen, you secure the infrastructure and manage the invisible logic that powers the web.',
  }
];
