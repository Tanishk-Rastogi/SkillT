// ============================================================
// CANON LORE — The foundational data skeleton of the SkillT world.
// Dynamic evolution must always reference this structure.
// ============================================================

export type RegionId = 'ai-nexus' | 'cyber-frontier' | 'systems-citadel' | 'design-sanctum';
export type FactionId = 'builders' | 'researchers' | 'founders' | 'hackers';
export type TierId = 'novice' | 'adept' | 'architect' | 'sovereign';

// ─────────────────────────────────────────────
// REGIONS
// ─────────────────────────────────────────────
export interface Region {
  id: RegionId;
  name: string;
  subtitle: string;
  lore: string;
  skillCategories: string[]; // Maps to skill.category values
  faction: FactionId;
  visual: {
    primaryColor: string;     // Tailwind or CSS var
    accentColor: string;
    bgGradient: string;
    glowColor: string;        // For box-shadow CSS
    icon: string;             // Emoji icon
    pattern: 'circuit' | 'grid' | 'stone' | 'gradient';
  };
  activeUsers: number;        // Simulated live count
  worldStateEvents: string[]; // Current world modifiers (e.g., "AI Surge Active")
}

export const REGIONS: Region[] = [
  {
    id: 'ai-nexus',
    name: 'AI Nexus',
    subtitle: 'The Intelligence Frontier',
    lore: 'A city of endless electric storms where machines dream and engineers become architects of synthetic minds. Those who enter rarely speak of the world they left behind.',
    skillCategories: ['AI', 'Machine Learning', 'Data'],
    faction: 'researchers',
    visual: {
      primaryColor: '#3b82f6',
      accentColor: '#60a5fa',
      bgGradient: 'from-blue-950 via-indigo-950 to-slate-950',
      glowColor: 'rgba(59, 130, 246, 0.4)',
      icon: '🧠',
      pattern: 'circuit',
    },
    activeUsers: 1842,
    worldStateEvents: ['⚡ AI Surge Active', '+20% XP on AI challenges'],
  },
  {
    id: 'cyber-frontier',
    name: 'Cyber Frontier',
    subtitle: 'The Edge of the Network',
    lore: 'A lawless territory of red scanlines and perpetual night. Here, the hackers and guardians wage eternal war. Trust is earned in bytes, not words.',
    skillCategories: ['Cybersecurity', 'Networking', 'Infrastructure', 'DevOps'],
    faction: 'hackers',
    visual: {
      primaryColor: '#ef4444',
      accentColor: '#f87171',
      bgGradient: 'from-red-950 via-slate-950 to-zinc-950',
      glowColor: 'rgba(239, 68, 68, 0.4)',
      icon: '🔴',
      pattern: 'grid',
    },
    activeUsers: 963,
    worldStateEvents: ['🛡️ Breach Event: +15% Rep for defenders'],
  },
  {
    id: 'systems-citadel',
    name: 'Systems Citadel',
    subtitle: 'The Foundation of Everything',
    lore: 'Monolithic structures carved from pure logic. The engineers here do not build features — they build the ground beneath all other worlds. Slow, methodical, and unbreakable.',
    skillCategories: ['Backend', 'Databases', 'System Design', 'Algorithms'],
    faction: 'builders',
    visual: {
      primaryColor: '#10b981',
      accentColor: '#34d399',
      bgGradient: 'from-emerald-950 via-teal-950 to-slate-950',
      glowColor: 'rgba(16, 185, 129, 0.4)',
      icon: '🏛️',
      pattern: 'stone',
    },
    activeUsers: 2217,
    worldStateEvents: ['📡 Scale Trial Season: Boss XP ×2'],
  },
  {
    id: 'design-sanctum',
    name: 'Design Sanctum',
    subtitle: 'Where Form Meets Function',
    lore: 'Floating gardens of luminous gradients and interactive sculptures. The Sanctum rewards those who see emotion in pixels and rhythm in interfaces. Beauty is code here.',
    skillCategories: ['Frontend', 'UI/UX', 'Web Development', 'Creative'],
    faction: 'founders',
    visual: {
      primaryColor: '#a855f7',
      accentColor: '#c084fc',
      bgGradient: 'from-purple-950 via-fuchsia-950 to-slate-950',
      glowColor: 'rgba(168, 85, 247, 0.4)',
      icon: '✨',
      pattern: 'gradient',
    },
    activeUsers: 1504,
    worldStateEvents: ['🎨 Creator Renaissance: UI challenges give bonus Rep'],
  },
];

// ─────────────────────────────────────────────
// FACTIONS
// ─────────────────────────────────────────────
export interface Faction {
  id: FactionId;
  name: string;
  philosophy: string;
  bonuses: string[];
  color: string;
}

export const FACTIONS: Record<FactionId, Faction> = {
  builders: {
    id: 'builders',
    name: 'The Builders',
    philosophy: 'Permanence through construction. We do not chase trends. We lay foundations.',
    bonuses: ['+15% XP on infrastructure skills', 'Unlock "Architect" title faster'],
    color: '#10b981',
  },
  researchers: {
    id: 'researchers',
    name: 'The Researchers',
    philosophy: 'Understanding precedes creation. Every system is a hypothesis waiting to be proven.',
    bonuses: ['+20% XP on AI/ML challenges', 'Access to research-tier hidden paths'],
    color: '#3b82f6',
  },
  founders: {
    id: 'founders',
    name: 'The Founders',
    philosophy: 'Ship relentlessly. Founders do not wait for perfection. They build it in public.',
    bonuses: ['+10% XP on projects', 'Team Formation Engine priority'],
    color: '#a855f7',
  },
  hackers: {
    id: 'hackers',
    name: 'The Hackers',
    philosophy: 'Every lock is an invitation. Security is learned by breaking, not reading.',
    bonuses: ['+25% XP on security challenges', 'Access to hidden breach events'],
    color: '#ef4444',
  },
};

// ─────────────────────────────────────────────
// PROGRESSION TIERS
// ─────────────────────────────────────────────
export interface ProgressionTier {
  id: TierId;
  name: string;
  levelRange: [number, number];
  description: string;
  perks: string[];
  auraColor: string;
  auraLabel: string;
}

export const PROGRESSION_TIERS: ProgressionTier[] = [
  {
    id: 'novice',
    name: 'Novice',
    levelRange: [1, 10],
    description: 'You have just arrived. The world is vast. Begin with a region.',
    perks: ['Access to starter skill trees', 'Guild browsing (read-only)'],
    auraColor: 'text-slate-400',
    auraLabel: 'bg-slate-800 border-slate-600',
  },
  {
    id: 'adept',
    name: 'Adept',
    levelRange: [11, 25],
    description: 'You have chosen a path. Your specialization is beginning to define you.',
    perks: ['Guild join/create access', 'Creator Studio (draft trees)', 'Party matchmaking'],
    auraColor: 'text-cyan-400',
    auraLabel: 'bg-cyan-900/30 border-cyan-500/50',
  },
  {
    id: 'architect',
    name: 'Architect',
    levelRange: [26, 50],
    description: 'Cross-domain mastery. You think in systems, not features.',
    perks: ['Mentor eligibility', 'Hidden Path discovery', 'Recruiter visibility', 'Co-op boss challenges'],
    auraColor: 'text-purple-400',
    auraLabel: 'bg-purple-900/30 border-purple-500/50',
  },
  {
    id: 'sovereign',
    name: 'Sovereign',
    levelRange: [51, 999],
    description: 'Legendary status. Your presence influences the world state.',
    perks: ['World Engine influence votes', 'Sovereign-only guild council', 'Exclusive seasonal lore events', 'Platform-wide prestige aura'],
    auraColor: 'text-amber-400',
    auraLabel: 'bg-amber-900/30 border-amber-500/50',
  },
];

// ─────────────────────────────────────────────
// HIDDEN PATHS (Discovery System)
// ─────────────────────────────────────────────
export interface HiddenPath {
  id: string;
  name: string;
  description: string;
  triggerCategories: string[]; // Must have completed skills in ALL of these
  unlocksTitle: string;
  rarity: 'Rare' | 'Legendary' | 'Mythic';
}

export const HIDDEN_PATHS: HiddenPath[] = [
  {
    id: 'hp-digital-behavior',
    name: 'Digital Behavior Architect',
    description: 'You have crossed the streams of AI, UX, and Psychology. You understand what humans want before they do.',
    triggerCategories: ['AI', 'UI/UX', 'Frontend'],
    unlocksTitle: 'Digital Behavior Architect',
    rarity: 'Legendary',
  },
  {
    id: 'hp-fullstack-sovereign',
    name: 'The Full Sovereign',
    description: 'You refused specialization and mastered the full stack. A rare and dangerous path.',
    triggerCategories: ['Frontend', 'Backend', 'Databases'],
    unlocksTitle: 'Full Sovereign',
    rarity: 'Mythic',
  },
  {
    id: 'hp-secure-architect',
    name: 'Secure Systems Architect',
    description: 'You build systems AND break them. The rarest combination in engineering.',
    triggerCategories: ['Cybersecurity', 'System Design', 'Backend'],
    unlocksTitle: 'Secure Architect',
    rarity: 'Rare',
  },
];

// ─────────────────────────────────────────────
// AI MENTOR PROFILES
// ─────────────────────────────────────────────
export interface AIMentorProfile {
  id: string;
  regionId: RegionId;
  name: string;
  title: string;
  personality: 'analytical' | 'motivational' | 'cryptic' | 'demanding';
  openingQuote: string;
  philosophy: string;
  avatar: string;  // Emoji for now
  questHint: string;
}

export const AI_MENTORS: AIMentorProfile[] = [
  {
    id: 'mentor-nexus',
    regionId: 'ai-nexus',
    name: 'AXIOM',
    title: 'The Systems Oracle',
    personality: 'analytical',
    openingQuote: '"Intelligence is not data. It is the absence of surprise."',
    philosophy: 'You cannot build what you cannot model. Before you write a single line, you must understand the shape of the problem space.',
    avatar: '🤖',
    questHint: 'Begin by training a model you fully understand. Only then will I show you the complex ones.',
  },
  {
    id: 'mentor-frontier',
    regionId: 'cyber-frontier',
    name: 'GHOST',
    title: 'The Edge Walker',
    personality: 'cryptic',
    openingQuote: '"Security is a lie. Some walls are just taller than others."',
    philosophy: 'The frontier rewards paranoia. Everything you trust will eventually fail you. Build for that failure.',
    avatar: '👤',
    questHint: 'Find the vulnerability I left in the practice system. It has been there for three days. No one found it.',
  },
  {
    id: 'mentor-citadel',
    regionId: 'systems-citadel',
    name: 'KAIROS',
    title: 'The Architect of Scale',
    personality: 'demanding',
    openingQuote: '"A system that cannot handle ten times its current load is not a system. It is a prototype."',
    philosophy: 'Correctness is the floor, not the ceiling. Scalability, reliability, and observability come before features.',
    avatar: '🏛️',
    questHint: 'Design a database schema for a billion users. Then tell me what you got wrong.',
  },
  {
    id: 'mentor-sanctum',
    regionId: 'design-sanctum',
    name: 'LYRA',
    title: 'The Interaction Poet',
    personality: 'motivational',
    openingQuote: '"Every interaction is a conversation. Every pixel is a choice. Make it intentional."',
    philosophy: 'The best interfaces are the ones users never notice. When design disappears, experience begins.',
    avatar: '✨',
    questHint: 'Redesign something you use every day. Make it feel inevitable. Bring it back and I will tell you what is still wrong.',
  },
];
