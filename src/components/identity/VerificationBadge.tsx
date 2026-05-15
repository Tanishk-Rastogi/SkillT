import React from 'react';
import { VerificationLevel } from '@/data/verifications';
import { CheckCircle2, ShieldAlert, Award, Star, ExternalLink } from 'lucide-react';

interface VerificationBadgeProps {
  level: VerificationLevel;
  skillName: string;
  evidenceType: string;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({ level, skillName, evidenceType }) => {
  const getConfig = () => {
    switch (level) {
      case 1:
        return {
          icon: <CheckCircle2 className="w-4 h-4 text-slate-400" />,
          color: 'bg-slate-800 border-slate-700 text-slate-300',
          label: 'Completion',
          desc: 'Self-reported or content completed.'
        };
      case 2:
        return {
          icon: <ShieldAlert className="w-4 h-4 text-cyan-400" />,
          color: 'bg-cyan-900/30 border-cyan-500/30 text-cyan-300',
          label: 'Challenge Proof',
          desc: 'Passed constrained tasks.'
        };
      case 3:
        return {
          icon: <Award className="w-4 h-4 text-purple-400" />,
          color: 'bg-purple-900/30 border-purple-500/30 text-purple-300',
          label: 'Project Proof',
          desc: 'Real-world implementation.'
        };
      case 4:
        return {
          icon: <Star className="w-4 h-4 text-amber-400" />,
          color: 'bg-amber-900/30 border-amber-500/30 text-amber-300',
          label: 'Social Proof',
          desc: 'Endorsed by peers/mentors.'
        };
    }
  };

  const config = getConfig();

  return (
    <div className={`flex flex-col p-3 rounded-lg border ${config.color} group relative cursor-help transition-all hover:-translate-y-1`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          {config.icon}
          <span className="font-bold text-sm tracking-wide">{skillName}</span>
        </div>
        <span className="text-[10px] font-mono uppercase bg-black/20 px-1.5 py-0.5 rounded opacity-70">Lvl {level}</span>
      </div>
      
      <div className="text-xs opacity-80 flex items-center justify-between">
        <span>{config.label}</span>
        {level > 1 && (
          <span className="flex items-center text-[10px] text-white/50 hover:text-white transition-colors cursor-pointer ml-2">
             {evidenceType.replace('_', ' ')} <ExternalLink className="w-3 h-3 ml-1" />
          </span>
        )}
      </div>

      {/* Tooltip */}
      <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-900 border border-slate-700 rounded text-xs text-slate-300 shadow-xl pointer-events-none z-10 text-center">
        {config.desc}
      </div>
    </div>
  );
};
