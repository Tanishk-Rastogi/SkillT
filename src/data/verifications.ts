export type VerificationLevel = 1 | 2 | 3;
// 1 = Learned (Consumed content)
// 2 = Practiced (Built projects internally)
// 3 = Verified (External proof exists)

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
  evidenceType: 'repository' | 'certificate' | 'challenge' | 'internal_test';
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
