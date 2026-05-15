'use client';

import React from 'react';
import { useCreatorStore } from '@/store/creatorStore';
import { Settings, Tag, Zap } from 'lucide-react';

export const PropertyPanel = () => {
  const { nodes, selectedNodeId, updateNodeData } = useCreatorStore();

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  if (!selectedNode) {
    return (
      <aside className="w-80 bg-slate-900 border-l border-slate-800 p-4 flex flex-col h-full text-center justify-center text-slate-500">
        Select a node to edit properties.
      </aside>
    );
  }

  const handleDataChange = (field: string, value: any) => {
    updateNodeData(selectedNode.id, { [field]: value });
  };

  return (
    <aside className="w-80 bg-slate-900 border-l border-slate-800 p-4 flex flex-col h-full overflow-y-auto custom-scrollbar">
      <div className="flex items-center space-x-2 mb-6 border-b border-slate-800 pb-4">
        <Settings className="w-5 h-5 text-indigo-400" />
        <h2 className="text-lg font-bold text-slate-100">Properties</h2>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Node Type</label>
          <div className="text-sm px-3 py-2 bg-slate-800 border border-slate-700 rounded text-slate-300 font-mono capitalize">
            {selectedNode.data.nodeType}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Title</label>
          <input 
            type="text" 
            value={selectedNode.data.title} 
            onChange={(e) => handleDataChange('title', e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
            placeholder="e.g., Advanced React Hooks"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Description</label>
          <textarea 
            value={selectedNode.data.description} 
            onChange={(e) => handleDataChange('description', e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 h-24 resize-none"
            placeholder="Describe what the user will learn..."
          />
        </div>

        {selectedNode.data.nodeType !== 'gate' && (
          <div>
            <label className="flex items-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              <Zap className="w-3 h-3 mr-1 text-amber-400" /> XP Reward
            </label>
            <input 
              type="number" 
              value={selectedNode.data.xpReward} 
              onChange={(e) => handleDataChange('xpReward', parseInt(e.target.value) || 0)}
              className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        )}

        <div>
          <label className="flex items-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            <Tag className="w-3 h-3 mr-1 text-purple-400" /> Meta Skills
          </label>
          <input 
            type="text" 
            value={selectedNode.data.metaSkills?.join(', ') || ''} 
            onChange={(e) => handleDataChange('metaSkills', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
            className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
            placeholder="e.g., problem-solving, systems-thinking"
          />
          <p className="text-[10px] text-slate-500 mt-1">Comma-separated list</p>
        </div>

      </div>
    </aside>
  );
};
