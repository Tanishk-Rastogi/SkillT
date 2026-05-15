'use client';

import React from 'react';
import { Target, Shield, Lock } from 'lucide-react';
import { NodeType } from '@/types/creator';

export const NodeSidebar = () => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: NodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 p-4 flex flex-col h-full">
      <div className="mb-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-1">Nodes</h2>
        <p className="text-xs text-slate-500">Drag to canvas</p>
      </div>

      <div className="space-y-3">
        <div 
          className="p-3 bg-slate-800 border border-slate-700 rounded cursor-grab hover:border-cyan-500/50 transition-colors flex items-center"
          onDragStart={(event) => onDragStart(event, 'skill')}
          draggable
        >
          <Target className="w-4 h-4 text-cyan-400 mr-3" />
          <span className="text-sm font-medium text-slate-200">Skill Node</span>
        </div>

        <div 
          className="p-3 bg-slate-800 border border-slate-700 rounded cursor-grab hover:border-red-500/50 transition-colors flex items-center"
          onDragStart={(event) => onDragStart(event, 'boss')}
          draggable
        >
          <Shield className="w-4 h-4 text-red-500 mr-3" />
          <span className="text-sm font-medium text-slate-200">Boss Node</span>
        </div>

        <div 
          className="p-3 bg-slate-800 border border-slate-700 rounded cursor-grab hover:border-amber-500/50 transition-colors flex items-center"
          onDragStart={(event) => onDragStart(event, 'gate')}
          draggable
        >
          <Lock className="w-4 h-4 text-amber-500 mr-3" />
          <span className="text-sm font-medium text-slate-200">Gate Node</span>
        </div>
      </div>
    </aside>
  );
};
