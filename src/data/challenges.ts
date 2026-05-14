// ============================================================
// CHALLENGE SYSTEM DATA MODELS
// Proof-based skill mastery engine
// ============================================================

export type ChallengeType = 'mini_project' | 'timed_challenge' | 'debugging_mission' | 'boss_battle';
export type ChallengeDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
export type ChallengeRarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';
export type ChallengeStatus = 'available' | 'in_progress' | 'completed' | 'failed';
export type MasteryTier = 'Learned' | 'Practiced' | 'Applied' | 'Mastered' | 'Verified';

export const MASTERY_TIER_ORDER: MasteryTier[] = ['Learned', 'Practiced', 'Applied', 'Mastered', 'Verified'];

export interface ChallengeObjective {
  id: string;
  description: string;
  required: boolean;
}

export interface Challenge {
  id: string;
  skillId: string;
  type: ChallengeType;
  title: string;
  narrative: string; // The "quest story" intro
  briefing: string;  // Technical details
  objectives: ChallengeObjective[];
  timeLimitMinutes?: number; // Only for timed challenges
  xpReward: number;
  masteryAwarded: MasteryTier; // Tier this challenge proves
  difficulty: ChallengeDifficulty;
  rarity: ChallengeRarity;
  isBossChallenge?: boolean;
  requiredSkillIds?: string[]; // For boss battles
  tags: string[];
}

export interface AIFeedback {
  overallScore: number; // 0-100
  proficiencyEstimate: string; // e.g. "Solid Intermediate"
  strengths: string[];
  improvements: string[];
  verdict: string; // 1-2 sentence summary
  nextSteps: string[];
  masteryUnlocked: MasteryTier;
}

export interface ChallengeSubmission {
  id: string;
  challengeId: string;
  skillId: string;
  challengeTitle: string;
  challengeType: ChallengeType;
  submittedAt: string;
  status: 'pending' | 'reviewed' | 'failed';
  aiFeedback?: AIFeedback;
  xpEarned: number;
}

// ============================================================
// CHALLENGE SEED DATA
// Rich, cinematic challenge definitions per skill
// ============================================================

export const ALL_CHALLENGES: Challenge[] = [

  // ── HTML BASICS ─────────────────────────────────────────
  {
    id: 'html-portfolio',
    skillId: 'html-basics',
    type: 'mini_project',
    title: 'Digital Presence: Portfolio Page',
    narrative: 'Your identity on the web starts here. Every developer needs a home base — a place where recruiters, collaborators, and the world can discover who you are and what you build.',
    briefing: 'Build a complete personal portfolio page using only semantic HTML. No CSS required — focus entirely on structure, accessibility, and meaningful markup.',
    objectives: [
      { id: '1', description: 'Use proper HTML5 document structure (<!DOCTYPE>, head, body)', required: true },
      { id: '2', description: 'Include a navigation bar with at least 3 links', required: true },
      { id: '3', description: 'Create a hero section with your name and tagline', required: true },
      { id: '4', description: 'Build a projects section with at least 2 project cards', required: true },
      { id: '5', description: 'Add a contact section with a functional form structure', required: true },
      { id: '6', description: 'Use semantic elements: header, nav, main, section, footer, article', required: true },
      { id: '7', description: 'Add alt text to any images used', required: false },
    ],
    xpReward: 120,
    masteryAwarded: 'Applied',
    difficulty: 'Beginner',
    rarity: 'Common',
    tags: ['HTML', 'Semantics', 'Portfolio'],
  },
  {
    id: 'html-debug-mission',
    skillId: 'html-basics',
    type: 'debugging_mission',
    title: 'Operation: Broken Blueprint',
    narrative: 'A critical production page has been deployed with 7 structural errors. The site is rendering incorrectly across browsers. Your mission: identify and fix every issue.',
    briefing: 'You are given a broken HTML file. Diagnose the issues, explain what\'s wrong, and describe the corrected version. Think like an HTML inspector — missing closings, wrong nesting, invalid attributes.',
    objectives: [
      { id: '1', description: 'Identify missing or incorrect DOCTYPE declaration', required: true },
      { id: '2', description: 'Fix 3 unclosed or improperly nested tags', required: true },
      { id: '3', description: 'Identify 2 semantic misuses (divs where sections should be)', required: true },
      { id: '4', description: 'Explain why each fix matters for browser rendering', required: false },
    ],
    timeLimitMinutes: 20,
    xpReward: 90,
    masteryAwarded: 'Practiced',
    difficulty: 'Beginner',
    rarity: 'Rare',
    tags: ['HTML', 'Debugging', 'Browser Rendering'],
  },

  // ── CSS BASICS ───────────────────────────────────────────
  {
    id: 'css-flexbox-layout',
    skillId: 'css-basics',
    type: 'mini_project',
    title: 'Layout Architect: Flexbox Dashboard',
    narrative: 'You have been contracted to build the layout skeleton for a SaaS analytics dashboard. The design requires a sidebar, main content area, and a responsive header — all using Flexbox.',
    briefing: 'Implement a complete dashboard layout using Flexbox. No CSS frameworks allowed. The layout must include a sidebar, top navigation, and content area that adapts on resize.',
    objectives: [
      { id: '1', description: 'Create a sidebar of fixed width (240px) using Flexbox', required: true },
      { id: '2', description: 'Implement a top navigation bar with space-between alignment', required: true },
      { id: '3', description: 'Use flex-wrap for a responsive card grid in the content area', required: true },
      { id: '4', description: 'Apply at least one custom CSS variable for color tokens', required: false },
      { id: '5', description: 'The layout must not break at any viewport width above 480px', required: true },
    ],
    xpReward: 130,
    masteryAwarded: 'Applied',
    difficulty: 'Beginner',
    rarity: 'Common',
    tags: ['CSS', 'Flexbox', 'Layout'],
  },
  {
    id: 'css-timed-card',
    skillId: 'css-basics',
    type: 'timed_challenge',
    title: 'Speed Trial: Glassmorphism Card',
    narrative: 'The client needs a product card in 15 minutes. The clock is running. Prove your CSS fluency under pressure.',
    briefing: 'Using only HTML and CSS, recreate a glassmorphism-style product card. The card must have a frosted glass background, a title, subtitle, stat row, and a CTA button — all from memory.',
    objectives: [
      { id: '1', description: 'Apply backdrop-filter: blur() for glass effect', required: true },
      { id: '2', description: 'Include a semi-transparent background with rgba()', required: true },
      { id: '3', description: 'Style a CTA button with hover state', required: true },
      { id: '4', description: 'Complete in under 15 minutes', required: true },
    ],
    timeLimitMinutes: 15,
    xpReward: 100,
    masteryAwarded: 'Practiced',
    difficulty: 'Intermediate',
    rarity: 'Rare',
    tags: ['CSS', 'Glassmorphism', 'Speed', 'Design'],
  },

  // ── JAVASCRIPT BASICS ────────────────────────────────────
  {
    id: 'js-todo-app',
    skillId: 'js-basics',
    type: 'mini_project',
    title: 'CRUD Core: Interactive Todo App',
    narrative: 'Every developer builds a Todo app. Not because it\'s trendy — because it forces you to understand state, DOM manipulation, event handling, and data persistence. This is your rite of passage.',
    briefing: 'Build a fully functional Todo application using only vanilla JavaScript. No frameworks. Focus on clean logic, event delegation, and local storage persistence.',
    objectives: [
      { id: '1', description: 'Add new tasks via an input field + button (or Enter key)', required: true },
      { id: '2', description: 'Mark tasks as complete by clicking them', required: true },
      { id: '3', description: 'Delete tasks individually', required: true },
      { id: '4', description: 'Persist tasks in localStorage so they survive page refresh', required: true },
      { id: '5', description: 'Filter tasks: All / Active / Completed', required: false },
      { id: '6', description: 'Display active task count', required: false },
    ],
    xpReward: 150,
    masteryAwarded: 'Applied',
    difficulty: 'Beginner',
    rarity: 'Common',
    tags: ['JavaScript', 'DOM', 'localStorage', 'CRUD'],
  },
  {
    id: 'js-debug-infinite-loop',
    skillId: 'js-basics',
    type: 'debugging_mission',
    title: 'Detective Mission: The Infinite Renderer',
    narrative: 'A critical client-facing feature is causing browsers to freeze. The team traced it to a JavaScript logic error. No one can find it. You are the last resort.',
    briefing: 'You are given a JavaScript snippet with a hidden bug causing an infinite loop under specific conditions. Your mission: identify the root cause, explain the behavior, and provide the corrected code.',
    objectives: [
      { id: '1', description: 'Identify the exact line causing the infinite loop', required: true },
      { id: '2', description: 'Explain WHY it becomes infinite (not just what it does)', required: true },
      { id: '3', description: 'Provide the corrected function with explanation', required: true },
      { id: '4', description: 'Suggest a defensive pattern to prevent similar bugs', required: false },
    ],
    timeLimitMinutes: 25,
    xpReward: 110,
    masteryAwarded: 'Practiced',
    difficulty: 'Intermediate',
    rarity: 'Rare',
    tags: ['JavaScript', 'Debugging', 'Logic'],
  },

  // ── GIT VERSION CONTROL ──────────────────────────────────
  {
    id: 'git-branch-workflow',
    skillId: 'git-version-control',
    type: 'mini_project',
    title: 'Collaboration Protocol: Feature Branch Workflow',
    narrative: 'You have just joined a 5-person engineering team. You must demonstrate you can work professionally in a team Git workflow without breaking the main branch.',
    briefing: 'Document and execute a complete feature branch workflow. Create a branch, make commits, simulate a code review process, and perform a clean merge.',
    objectives: [
      { id: '1', description: 'Create a feature branch from main with a proper name (feat/add-login)', required: true },
      { id: '2', description: 'Make at least 3 meaningful commits with conventional commit messages', required: true },
      { id: '3', description: 'Create a pull request description explaining the changes', required: true },
      { id: '4', description: 'Resolve a simulated merge conflict on the branch', required: true },
      { id: '5', description: 'Squash commits before merging to keep history clean', required: false },
    ],
    xpReward: 180,
    masteryAwarded: 'Applied',
    difficulty: 'Intermediate',
    rarity: 'Rare',
    tags: ['Git', 'Branching', 'Collaboration', 'PR'],
  },
  {
    id: 'git-boss-oss',
    skillId: 'git-version-control',
    type: 'boss_battle',
    title: '⚔ BOSS TRIAL: Open Source Contributor',
    narrative: 'The gates of the open source world are before you. This is not a simulation. Your mission is to make a real, meaningful contribution to an open source project — and return with proof.',
    briefing: 'Fork an open source repository. Fix a real issue tagged "good first issue." Write a proper commit message, create a pull request with a full description, and share the link as your proof.',
    objectives: [
      { id: '1', description: 'Fork a real open source repository', required: true },
      { id: '2', description: 'Fix a real "good first issue" (link required)', required: true },
      { id: '3', description: 'Write a comprehensive PR description with context, changes, and screenshots', required: true },
      { id: '4', description: 'Respond to at least one review comment from the maintainer', required: false },
      { id: '5', description: 'Link to your submitted pull request as proof', required: true },
    ],
    xpReward: 500,
    masteryAwarded: 'Mastered',
    difficulty: 'Advanced',
    rarity: 'Legendary',
    isBossChallenge: true,
    tags: ['Git', 'Open Source', 'Collaboration', 'Real World', 'Boss'],
  },

  // ── REACT BASICS ─────────────────────────────────────────
  {
    id: 'react-kanban',
    skillId: 'react-basics',
    type: 'mini_project',
    title: 'Fullstack Thinking: React Kanban Board',
    narrative: 'You have been tasked with building the task management board for an internal tool. The team needs drag-and-drop columns, status tracking, and a clean component structure.',
    briefing: 'Build a Kanban board application in React with at least 3 columns (Todo, In Progress, Done). Focus on component architecture, state management, and prop drilling patterns.',
    objectives: [
      { id: '1', description: 'Create at least 3 reusable components (Board, Column, Card)', required: true },
      { id: '2', description: 'Implement drag-and-drop between columns (or a click-to-move mechanic)', required: true },
      { id: '3', description: 'Allow adding new cards to any column', required: true },
      { id: '4', description: 'Allow deleting cards', required: true },
      { id: '5', description: 'Persist board state in localStorage', required: false },
      { id: '6', description: 'Use TypeScript for component props', required: false },
    ],
    xpReward: 200,
    masteryAwarded: 'Applied',
    difficulty: 'Intermediate',
    rarity: 'Epic',
    tags: ['React', 'State', 'Components', 'UX'],
  },
  {
    id: 'react-boss-dashboard',
    skillId: 'react-basics',
    type: 'boss_battle',
    title: '⚔ BOSS TRIAL: Frontend Architect Trial',
    narrative: 'You are the lead frontend engineer on a product launch. You must build a complete, production-quality React dashboard that demonstrates mastery of components, state, API integration, and UI architecture.',
    briefing: 'Build a complete analytics dashboard with React. Include real API data (weather, GitHub, or any public API), charts, a stats header, a data table, and responsive layout. This is your capstone.',
    objectives: [
      { id: '1', description: 'Connect to at least one real public API and display live data', required: true },
      { id: '2', description: 'Build a stats header with 4+ metric cards', required: true },
      { id: '3', description: 'Implement a filterable/sortable data table', required: true },
      { id: '4', description: 'Use custom hooks to separate data-fetching logic', required: true },
      { id: '5', description: 'Add loading + error states for all async operations', required: true },
      { id: '6', description: 'The entire dashboard must be responsive', required: false },
      { id: '7', description: 'Write at least one unit test for a utility function', required: false },
    ],
    xpReward: 600,
    masteryAwarded: 'Mastered',
    difficulty: 'Expert',
    rarity: 'Legendary',
    isBossChallenge: true,
    requiredSkillIds: ['js-basics', 'dom-manipulation', 'apis-rest'],
    tags: ['React', 'Architecture', 'API', 'Boss', 'Capstone'],
  },
];

// Helper: Get challenges for a specific skill
export function getChallengesForSkill(skillId: string): Challenge[] {
  return ALL_CHALLENGES.filter(c => c.skillId === skillId);
}

// Helper: Get a challenge by ID
export function getChallengeById(id: string): Challenge | undefined {
  return ALL_CHALLENGES.find(c => c.id === id);
}

// Mastery tier XP thresholds (challenges needed to advance)
export const MASTERY_TIER_LABELS: Record<MasteryTier, { label: string; shortLabel: string; color: string; description: string }> = {
  Learned:   { label: 'Learned',   shortLabel: 'L', color: 'text-gray-400',    description: 'Consumed educational content' },
  Practiced: { label: 'Practiced', shortLabel: 'P', color: 'text-cyber-cyan',  description: 'Completed exercises and challenges' },
  Applied:   { label: 'Applied',   shortLabel: 'A', color: 'text-cyber-green', description: 'Used in real mini projects' },
  Mastered:  { label: 'Mastered',  shortLabel: 'M', color: 'text-cyber-purple',description: 'Demonstrated advanced implementation' },
  Verified:  { label: 'Verified',  shortLabel: 'V', color: 'text-amber-400',   description: 'External proof + boss challenge completed' },
};
