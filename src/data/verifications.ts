export type VerificationLevel = 1 | 2 | 3 | 4;
// 1 = Completion (finished content, weakest proof)
// 2 = Challenge Proof (timed & constrained tasks)
// 3 = Project Proof (real-world implementation)
// 4 = Social Proof (mentors, guilds, peer endorsements)

export interface ConnectedPlatform {
  platformId: 'github' | 'leetcode' | 'gfg';
  username: string;
  syncedAt: string;
  profileUrl: string;
}

export interface VerificationRecord {
  skillId: string;
  level: VerificationLevel;
  verifiedBy: string; // e.g., 'GitHub', 'LeetCode', 'Manual'
  evidenceType: 'repository' | 'certificate' | 'challenge' | 'internal_test' | 'mentor_review' | 'guild_event' | 'peer_endorsement';
  evidenceLinks: string[];
  confidenceScore: number; // 0-100
  verifiedAt: string;
}

// Mock Database of External Mappings
export const EXTERNAL_SKILL_MAPPINGS = {
  github: {
    // If a user has pushed to repos with these languages/topics, they earn verification
    'javascript': 'js-basics',
    'react': 'react-basics',
    'typescript': 'typescript-basics', // Assuming this exists or will exist
    'node': 'node-basics',
    'docker': 'docker-basics',
  },
  leetcode: {
    // If a user solved problems tagged with these, they earn verification
    'dynamic-programming': 'dynamic-programming',
    'graphs': 'graph-algorithms',
  }
};
