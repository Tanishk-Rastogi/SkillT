import { Skill } from '@/data/skills';
import { CharacterClass, INITIAL_CLASSES } from '@/data/classes';
import { Title, INITIAL_TITLES, ProgressionStyle } from '@/data/titles';

export class ProgressionEngine {
  
  /**
   * Evaluates the dominant domain based on the user's completed skills.
   */
  static computeDominantDomain(completedSkills: Skill[]): string {
    if (completedSkills.length === 0) return 'Undecided';

    const domainCounts: Record<string, number> = {};
    
    completedSkills.forEach(skill => {
      skill.domainsUsedIn.forEach(domain => {
        domainCounts[domain] = (domainCounts[domain] || 0) + 1;
      });
    });

    let dominant = 'Undecided';
    let max = 0;

    for (const [domain, count] of Object.entries(domainCounts)) {
      if (count > max) {
        max = count;
        dominant = domain;
      }
    }

    return dominant;
  }

  /**
   * Evaluates progression style.
   */
  static computeProgressionStyle(completedSkills: Skill[]): ProgressionStyle {
    if (completedSkills.length < 3) return 'Generalist';
    
    // Simple heuristic: If they have skills in multiple domains vs just one.
    const uniqueDomains = new Set<string>();
    completedSkills.forEach(s => s.domainsUsedIn.forEach(d => uniqueDomains.add(d)));

    if (uniqueDomains.size === 1) return 'Specialist';
    if (uniqueDomains.size > 2) return 'Pathfinder';
    return 'Hybrid';
  }

  /**
   * Computes which classes the user has unlocked.
   * Prioritizes highest tier classes.
   */
  static evaluateClasses(completedSkillIds: string[], level: number): CharacterClass[] {
    const unlocked: CharacterClass[] = [];

    // Base classes are always available at level 1.
    INITIAL_CLASSES.forEach(cls => {
      if (cls.tier === 1 && level >= cls.requiredProgression) {
        unlocked.push(cls);
      } else if (cls.tier > 1) {
        // Check if required skills are met
        const hasSkills = cls.requiredSkills.every(reqId => completedSkillIds.includes(reqId));
        if (hasSkills && level >= cls.requiredProgression) {
          unlocked.push(cls);
        }
      }
    });

    return unlocked;
  }

  /**
   * Evaluates which titles the user has unlocked.
   */
  static evaluateTitles(completedSkillIds: string[], level: number): Title[] {
    const unlocked: Title[] = [];

    INITIAL_TITLES.forEach(title => {
      const { requiredSkills, minLevel } = title.unlockConditions;
      
      let meetsLevel = true;
      if (minLevel && level < minLevel) meetsLevel = false;

      let meetsSkills = true;
      if (requiredSkills && requiredSkills.length > 0) {
        meetsSkills = requiredSkills.every(reqId => completedSkillIds.includes(reqId));
      }

      if (meetsLevel && meetsSkills) {
        unlocked.push(title);
      }
    });

    return unlocked;
  }
}
