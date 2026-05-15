// ============================================================
// WORLD ENGINE — Pure computation. No React. No side effects.
// Takes UserState and derives world-position intelligence.
// ============================================================

import { UserState } from '@/components/layout/AuthProvider';
import {
  Region, REGIONS,
  ProgressionTier, PROGRESSION_TIERS,
  HiddenPath, HIDDEN_PATHS,
  AIMentorProfile, AI_MENTORS,
  FactionId, FACTIONS, Faction,
} from '@/data/worldLore';

export class WorldEngine {

  /**
   * Determine which Region the user primarily belongs to,
   * based on the categories of their completed skills.
   */
  static getCurrentRegion(user: UserState): Region {
    const completedSkills = user.skills.filter(s => s.status === 'Completed');

    // Tally completed skills per region
    const regionScores: Record<string, number> = {};
    for (const region of REGIONS) {
      regionScores[region.id] = completedSkills.filter(s =>
        region.skillCategories.some(cat =>
          s.category?.toLowerCase().includes(cat.toLowerCase())
        )
      ).length;
    }

    // Find region with highest score; default to design-sanctum (frontend web dev)
    const topRegionId = Object.entries(regionScores)
      .sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'design-sanctum';

    return REGIONS.find(r => r.id === topRegionId) ?? REGIONS[3];
  }

  /**
   * Determine the user's current Progression Tier.
   */
  static getProgressionTier(level: number): ProgressionTier {
    for (const tier of [...PROGRESSION_TIERS].reverse()) {
      if (level >= tier.levelRange[0]) return tier;
    }
    return PROGRESSION_TIERS[0]; // Novice
  }

  /**
   * Discover any Hidden Paths the user has unlocked based on
   * cross-domain skill completion.
   */
  static discoverHiddenPaths(user: UserState): HiddenPath[] {
    const completedCategories = new Set(
      user.skills
        .filter(s => s.status === 'Completed')
        .map(s => s.category)
        .filter(Boolean)
    );

    return HIDDEN_PATHS.filter(path =>
      path.triggerCategories.every(cat =>
        [...completedCategories].some(c => c?.toLowerCase().includes(cat.toLowerCase()))
      )
    );
  }

  /**
   * Get the AI Mentor matched to the user's current Region.
   */
  static getMentorForRegion(regionId: string): AIMentorProfile | null {
    return AI_MENTORS.find(m => m.regionId === regionId) ?? null;
  }

  /**
   * Compute the user's Faction alignment based on skill patterns.
   * This becomes a core identity signal.
   */
  static getFactionAlignment(user: UserState): Faction {
    const completedSkills = user.skills.filter(s => s.status === 'Completed');
    const region = WorldEngine.getCurrentRegion(user);
    return FACTIONS[region.faction];
  }

  /**
   * Generate a complete world-position summary for the user.
   * This is the main API for UI components to consume.
   */
  static getWorldPosition(user: UserState) {
    const currentRegion = WorldEngine.getCurrentRegion(user);
    const tier = WorldEngine.getProgressionTier(user.level);
    const faction = WorldEngine.getFactionAlignment(user);
    const mentor = WorldEngine.getMentorForRegion(currentRegion.id);
    const hiddenPaths = WorldEngine.discoverHiddenPaths(user);

    return {
      currentRegion,
      tier,
      faction,
      mentor,
      hiddenPaths,
      isNewRegion: false, // Would be persisted to detect first-time region entry
    };
  }
}
