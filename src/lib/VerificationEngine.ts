import { VerificationRecord, ConnectedPlatform } from '@/data/verifications';

/**
 * Mock engine to simulate parsing external platforms and verifying skills.
 * In production, this would be a server-side job making API calls to GitHub/LeetCode.
 */
export class VerificationEngine {

  /**
   * Simulates connecting to a platform and returning mock verification records.
   */
  static async simulateConnection(
    platformId: 'github' | 'leetcode' | 'gfg',
    username: string
  ): Promise<{ platform: ConnectedPlatform; newVerifications: VerificationRecord[] }> {
    
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const platform: ConnectedPlatform = {
      platformId,
      username,
      syncedAt: new Date().toISOString(),
      profileUrl: platformId === 'github' ? `https://github.com/${username}` : 
                  platformId === 'leetcode' ? `https://leetcode.com/${username}` : 
                  `https://auth.geeksforgeeks.org/user/${username}`,
    };

    const newVerifications: VerificationRecord[] = [];

    // Mock GitHub Analysis
    if (platformId === 'github') {
      newVerifications.push({
        skillId: 'git-version-control',
        level: 3,
        verifiedBy: 'GitHub API Analysis',
        evidenceType: 'repository',
        evidenceLinks: [`https://github.com/${username}?tab=repositories`],
        confidenceScore: 99,
        verifiedAt: new Date().toISOString(),
      });
      newVerifications.push({
        skillId: 'react-basics',
        level: 3,
        verifiedBy: 'GitHub Topic Analysis',
        evidenceType: 'repository',
        evidenceLinks: [`https://github.com/${username}?tab=repositories&q=react`],
        confidenceScore: 85,
        verifiedAt: new Date().toISOString(),
      });
    }

    // Mock LeetCode Analysis
    if (platformId === 'leetcode') {
      newVerifications.push({
        skillId: 'js-basics',
        level: 3,
        verifiedBy: 'LeetCode Submissions',
        evidenceType: 'challenge',
        evidenceLinks: [`https://leetcode.com/${username}`],
        confidenceScore: 95,
        verifiedAt: new Date().toISOString(),
      });
    }

    return { platform, newVerifications };
  }
}
