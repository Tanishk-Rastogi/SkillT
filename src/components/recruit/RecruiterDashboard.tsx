'use client';

import React, { useState } from 'react';
import { Search, Filter, ShieldAlert, Award, Star, Flame, MapPin } from 'lucide-react';
import Link from 'next/link';
import { VerificationLevel } from '@/data/verifications';

// Mock database for the recruiter view
const mockTalentData = [
  {
    id: 'u-1',
    username: 'CyberDev',
    title: 'Senior Systems Architect',
    level: 42,
    location: 'Remote',
    streak: 124,
    metrics: { consistency: 'Elite', collaboration: 'High', execution: 'Elite' },
    topVerifications: [
      { skill: 'React Architecture', level: 4 as VerificationLevel },
      { skill: 'System Design', level: 3 as VerificationLevel },
      { skill: 'GraphQL APIs', level: 3 as VerificationLevel }
    ]
  },
  {
    id: 'u-2',
    username: 'NeuralNetWeaver',
    title: 'AI Integration Specialist',
    level: 28,
    location: 'San Francisco, CA',
    streak: 45,
    metrics: { consistency: 'High', collaboration: 'Medium', execution: 'High' },
    topVerifications: [
      { skill: 'PyTorch', level: 3 as VerificationLevel },
      { skill: 'LLM Fine-tuning', level: 4 as VerificationLevel }
    ]
  },
  {
    id: 'u-3',
    username: 'PixelPerfect',
    title: 'UI/UX Engineer',
    level: 19,
    location: 'Remote',
    streak: 8,
    metrics: { consistency: 'Medium', collaboration: 'High', execution: 'Medium' },
    topVerifications: [
      { skill: 'Figma to Code', level: 3 as VerificationLevel },
      { skill: 'CSS Animation', level: 2 as VerificationLevel }
    ]
  }
];

export const RecruiterDashboard = () => {
  const [filterSkill, setFilterSkill] = useState('');
  const [minVerificationLevel, setMinVerificationLevel] = useState<number>(0);

  const getLevelIcon = (level: number) => {
    switch(level) {
      case 2: return <ShieldAlert className="w-3 h-3 text-cyan-400" />;
      case 3: return <Award className="w-3 h-3 text-purple-400" />;
      case 4: return <Star className="w-3 h-3 text-amber-400" />;
      default: return null;
    }
  };

  const getLevelColor = (level: number) => {
    switch(level) {
      case 2: return 'text-cyan-400 border-cyan-500/30 bg-cyan-900/20';
      case 3: return 'text-purple-400 border-purple-500/30 bg-purple-900/20';
      case 4: return 'text-amber-400 border-amber-500/30 bg-amber-900/20';
      default: return 'text-slate-400 border-slate-700 bg-slate-800';
    }
  };

  const filteredTalent = mockTalentData.filter(t => {
    if (filterSkill) {
      const hasSkill = t.topVerifications.some(v => v.skill.toLowerCase().includes(filterSkill.toLowerCase()));
      if (!hasSkill) return false;
    }
    if (minVerificationLevel > 0) {
      const hasLevel = t.topVerifications.some(v => v.level >= minVerificationLevel);
      if (!hasLevel) return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      
      {/* Search Header */}
      <div className="bg-slate-900 border-b border-slate-800 p-6 flex flex-col md:flex-row items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-widest font-mono">Talent Intelligence</h1>
          <p className="text-slate-400 text-sm">Find candidates based on verified progression proof, not self-reported claims.</p>
        </div>

        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search required skill..." 
              value={filterSkill}
              onChange={(e) => setFilterSkill(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-sm text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <select 
              className="bg-slate-800 border border-slate-700 text-sm text-slate-300 rounded-lg pl-10 pr-8 py-2 focus:outline-none focus:border-cyan-500 appearance-none"
              value={minVerificationLevel}
              onChange={(e) => setMinVerificationLevel(Number(e.target.value))}
            >
              <option value={0}>Any Proof Level</option>
              <option value={2}>Lvl 2+ (Challenge Proof)</option>
              <option value={3}>Lvl 3+ (Project Proof)</option>
              <option value={4}>Lvl 4+ (Social Proof)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="flex-1 overflow-y-auto p-6 bg-slate-950">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="text-sm font-mono text-slate-500 mb-6">{filteredTalent.length} Verifiable Candidates Found</div>
          
          {filteredTalent.map(talent => (
            <div key={talent.id} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all flex flex-col md:flex-row gap-6">
              
              {/* Identity Column */}
              <div className="w-full md:w-1/4 shrink-0">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-12 h-12 rounded-lg border border-cyan-500/30 bg-slate-800 flex items-center justify-center text-xl">
                    🤖
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">{talent.username}</h3>
                    <p className="text-xs font-mono text-cyan-400">Level {talent.level} {talent.title}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-xs text-slate-400 mt-4">
                  <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {talent.location}</span>
                  <span className="flex items-center text-emerald-400"><Flame className="w-3 h-3 mr-1" /> {talent.streak}d</span>
                </div>
              </div>

              {/* Verified Skills Column */}
              <div className="w-full md:w-2/4 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
                <h4 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-3">Top Verified Proofs</h4>
                <div className="flex flex-wrap gap-2">
                  {talent.topVerifications.map((v, i) => (
                    <div key={i} className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded border text-xs font-semibold ${getLevelColor(v.level)}`}>
                      {getLevelIcon(v.level)}
                      <span>{v.skill}</span>
                      <span className="opacity-50">L{v.level}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics & Action Column */}
              <div className="w-full md:w-1/4 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-3">Behavioral Intelligence</h4>
                  <div className="space-y-1 text-xs text-slate-300">
                    <div className="flex justify-between"><span>Execution:</span> <span className="font-mono text-white">{talent.metrics.execution}</span></div>
                    <div className="flex justify-between"><span>Collaboration:</span> <span className="font-mono text-white">{talent.metrics.collaboration}</span></div>
                    <div className="flex justify-between"><span>Consistency:</span> <span className="font-mono text-white">{talent.metrics.consistency}</span></div>
                  </div>
                </div>
                <Link 
                  href={`/${talent.username}`}
                  className="mt-4 w-full block text-center bg-white text-black hover:bg-slate-200 text-sm font-bold py-2 rounded transition-colors"
                >
                  View Living Resume
                </Link>
              </div>

            </div>
          ))}

          {filteredTalent.length === 0 && (
            <div className="text-center py-20 text-slate-500">
              <ShieldAlert className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>No candidates match these specific verifiable criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
