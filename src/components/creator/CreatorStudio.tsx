'use client';

import React from 'react';
import { NodeSidebar } from './NodeSidebar';
import { PropertyPanel } from './PropertyPanel';
import { GraphEditor } from './GraphEditor';
import { Save, Play, Settings2 } from 'lucide-react';

export const CreatorStudio = () => {
  return (
    <div className="flex flex-col h-screen w-full bg-slate-950 text-slate-200 overflow-hidden font-sans">
      {/* Studio Header */}
      <header className="h-14 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-4 shrink-0 z-10">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 border-r border-slate-800 pr-4">
            <Settings2 className="w-5 h-5 text-indigo-400" />
            <h1 className="font-bold text-lg tracking-tight">Creator Studio</h1>
          </div>
          <span className="text-xs text-slate-500 font-mono bg-slate-800 px-2 py-1 rounded">Draft: Untitled Tree</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded transition-colors border border-slate-700">
            <Play className="w-3.5 h-3.5 mr-1.5" /> Test Play
          </button>
          <button className="flex items-center text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-1.5 rounded transition-colors shadow-[0_0_10px_rgba(79,70,229,0.3)]">
            <Save className="w-3.5 h-3.5 mr-1.5" /> Save Draft
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden relative">
        <NodeSidebar />
        <GraphEditor />
        <PropertyPanel />
      </div>
    </div>
  );
};
