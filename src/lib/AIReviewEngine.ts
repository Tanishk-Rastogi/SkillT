import { AIFeedback, Challenge, MasteryTier } from '@/data/challenges';

// ============================================================
// SIMULATED AI REVIEW ENGINE
// Produces realistic, contextual feedback with a timed delay.
// Replace the body of simulateReview() with a real API call
// (e.g., Gemini) when backend is available.
// ============================================================

const STRENGTHS_BY_TYPE: Record<string, string[]> = {
  mini_project: [
    'Your project structure demonstrates a clear understanding of separation of concerns.',
    'The component/module breakdown is clean and shows architectural thinking.',
    'Good use of semantic HTML and meaningful naming conventions throughout.',
    'The core feature requirements were met with solid implementation logic.',
    'Your approach to state management is appropriate for the project scope.',
  ],
  debugging_mission: [
    'You correctly identified the root cause rather than just patching symptoms.',
    'Your explanation of the bug\'s behavior shows deep runtime understanding.',
    'The fix is minimal and targeted — a sign of disciplined debugging.',
    'You demonstrated strong code reading ability under time pressure.',
  ],
  timed_challenge: [
    'You completed the challenge with good time management.',
    'The implementation is clean despite the time constraint — a mark of fluency.',
    'Core requirements were prioritized correctly.',
  ],
  boss_battle: [
    'This is a genuinely impressive submission that demonstrates real-world readiness.',
    'The architecture shows mature engineering thinking beyond the basics.',
    'Your documentation and PR communication are professional-grade.',
    'You went beyond the minimum requirements — this is the hallmark of a strong engineer.',
  ],
};

const IMPROVEMENTS_BY_SKILL: Record<string, string[]> = {
  'html-basics': [
    'Consider adding ARIA roles to interactive elements for better accessibility.',
    'Some structural elements could be more semantic — prefer <main> over generic <div> wrappers.',
    'Add a lang attribute to your <html> tag for internationalization support.',
  ],
  'css-basics': [
    'Avoid magic numbers in margins/paddings — use CSS custom properties for consistency.',
    'Consider how your layout handles extremely narrow viewports (< 320px).',
    'Some color choices may not meet WCAG contrast ratio requirements.',
  ],
  'js-basics': [
    'Your error handling could be more robust — consider try/catch for storage operations.',
    'Some functions are doing too much — single responsibility would make testing easier.',
    'Using const over let where values don\'t change improves predictability.',
  ],
  'git-version-control': [
    'Commit messages could be more descriptive — include "why" not just "what".',
    'Branch names should follow a consistent convention (feat/, fix/, chore/).',
    'Consider adding a .gitignore file before the first commit to avoid tracking artifacts.',
  ],
  'react-basics': [
    'Some components are doing too much — consider extracting smaller sub-components.',
    'useEffect dependencies could be more explicit to avoid stale closure bugs.',
    'Prop drilling is becoming deep — consider Context or a state management pattern.',
  ],
};

const NEXT_STEPS_BY_MASTERY: Record<MasteryTier, string[]> = {
  Learned:   ['Start the Practiced tier — attempt a debugging challenge to test comprehension.'],
  Practiced: ['Move to Applied tier — build a mini project that uses this skill end-to-end.'],
  Applied:   ['Challenge yourself at the Mastered level — attempt a multi-skill boss trial.'],
  Mastered:  ['Achieve Verified status by connecting external proof via GitHub or a certification.'],
  Verified:  ['You have fully mastered this skill. Consider mentoring others or exploring advanced extensions.'],
};

function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export class AIReviewEngine {
  static async simulateReview(challenge: Challenge): Promise<AIFeedback> {
    // Simulate AI processing time (2-3.5 seconds)
    const delay = 2000 + Math.random() * 1500;
    await new Promise(resolve => setTimeout(resolve, delay));

    const strengths = pickRandom(STRENGTHS_BY_TYPE[challenge.type] || STRENGTHS_BY_TYPE.mini_project, 3);
    const improvements = pickRandom(IMPROVEMENTS_BY_SKILL[challenge.skillId] || ['Keep iterating on your approach.'], 2);
    const masteryUnlocked = challenge.masteryAwarded;
    const nextSteps = NEXT_STEPS_BY_MASTERY[masteryUnlocked] || [];

    // Score varies by challenge type and rarity
    const baseScore =
      challenge.rarity === 'Legendary' ? 82 :
      challenge.rarity === 'Epic' ? 78 :
      challenge.rarity === 'Rare' ? 75 : 70;
    const overallScore = baseScore + Math.floor(Math.random() * 15);

    const proficiencyEstimate =
      overallScore >= 90 ? 'Advanced Practitioner' :
      overallScore >= 80 ? 'Solid Intermediate' :
      overallScore >= 70 ? 'Developing Competence' : 'Foundational Understanding';

    const verdicts: Record<string, string> = {
      mini_project: `Your project submission demonstrates solid foundational ability. The implementation is functional and shows genuine understanding of the skill — not just theoretical knowledge.`,
      debugging_mission: `Your debugging analysis shows strong diagnostic thinking. You identified the core issue and provided a valid fix — this is the most important skill a developer can demonstrate.`,
      timed_challenge: `Completing this under time pressure proves practical fluency. Speed with correctness is a real-world differentiator.`,
      boss_battle: `This is a landmark submission. Completing this boss trial proves you can operate at a professional level with this skill. The title unlock reflects genuine achievement.`,
    };

    return {
      overallScore: Math.min(overallScore, 99),
      proficiencyEstimate,
      strengths,
      improvements,
      verdict: verdicts[challenge.type] || verdicts.mini_project,
      nextSteps,
      masteryUnlocked,
    };
  }
}
