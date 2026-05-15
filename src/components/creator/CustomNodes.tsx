import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { CreatorNodeData } from '@/types/creator';
import { Shield, Target, Lock } from 'lucide-react';

interface NodeProps {
  data: CreatorNodeData;
  selected: boolean;
}

export const SkillNode = ({ data, selected }: NodeProps) => {
  return (
    <div className={`px-4 py-2 shadow-md rounded-md bg-slate-900 border-2 ${selected ? 'border-cyan-400' : 'border-slate-700'} min-w-[150px]`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-slate-500" />
      <div className="flex items-center space-x-2">
        <Target className="w-4 h-4 text-cyan-400" />
        <div className="font-bold text-sm text-slate-100">{data.title || 'New Skill'}</div>
      </div>
      <div className="text-xs text-slate-400 mt-1">{data.xpReward} XP</div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-cyan-500" />
    </div>
  );
};

export const BossNode = ({ data, selected }: NodeProps) => {
  return (
    <div className={`px-4 py-3 shadow-[0_0_15px_rgba(239,68,68,0.2)] rounded-lg bg-slate-900 border-2 ${selected ? 'border-red-500' : 'border-red-900'} min-w-[180px]`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-slate-500" />
      <div className="flex items-center space-x-2">
        <Shield className="w-5 h-5 text-red-500" />
        <div className="font-bold text-md text-red-100 uppercase tracking-wider">{data.title || 'Boss Challenge'}</div>
      </div>
      <div className="text-xs text-red-400/80 mt-1">{data.xpReward} XP + Prestige</div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-red-500" />
    </div>
  );
};

export const GateNode = ({ data, selected }: NodeProps) => {
  return (
    <div className={`px-3 py-2 shadow-md rounded-full bg-slate-800 border-2 ${selected ? 'border-amber-400' : 'border-slate-600'} flex items-center justify-center min-w-[120px]`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-slate-500" />
      <Lock className="w-4 h-4 text-amber-500 mr-2" />
      <div className="font-semibold text-xs text-slate-200">{data.title || 'Level Gate'}</div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-amber-500" />
    </div>
  );
};
