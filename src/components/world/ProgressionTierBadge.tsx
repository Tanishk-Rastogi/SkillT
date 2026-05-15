import React from 'react';
import { ProgressionTier } from '@/data/worldLore';
import { Crown, Shield, Zap, Star } from 'lucide-react';

interface ProgressionTierBadgeProps {
  tier: ProgressionTier;
  showPerks?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const TIER_ICONS = {
  novice: Star,
  adept: Zap,
  architect: Shield,
  sovereign: Crown,
};

export const ProgressionTierBadge: React.FC<ProgressionTierBadgeProps> = ({
  tier,
  showPerks = false,
  size = 'md',
}) => {
  const Icon = TIER_ICONS[tier.id];

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs gap-1',
    md: 'px-3 py-1.5 text-sm gap-1.5',
    lg: 'px-4 py-2 text-base gap-2',
  };

  const iconSizes = { sm: 'w-3 h-3', md: 'w-4 h-4', lg: 'w-5 h-5' };

  return (
    <div className="inline-flex flex-col">
      <div
        className={`inline-flex items-center font-bold font-mono rounded border uppercase tracking-wider ${sizeClasses[size]} ${tier.auraLabel} ${tier.auraColor}`}
      >
        <Icon className={iconSizes[size]} />
        {tier.name}
      </div>

      {showPerks && (
        <div className="mt-3 space-y-1.5">
          {tier.perks.map((perk, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
              <span className={`mt-0.5 shrink-0 ${tier.auraColor}`}>▸</span>
              <span>{perk}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
