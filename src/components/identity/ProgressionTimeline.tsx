import React from 'react';
import { FeedEvent } from '@/data/social';
import { Shield, Zap, Target, Star, Award } from 'lucide-react';

interface ProgressionTimelineProps {
  events: FeedEvent[];
}

export const ProgressionTimeline: React.FC<ProgressionTimelineProps> = ({ events }) => {
  if (!events || events.length === 0) {
    return <div className="text-slate-500 text-sm italic">No progression data available yet.</div>;
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'skill_unlock': return <Target className="w-4 h-4 text-cyan-400" />;
      case 'rare_discovery': return <Shield className="w-4 h-4 text-red-400" />;
      case 'level_up': return <Zap className="w-4 h-4 text-amber-400" />;
      case 'title_earned': return <Star className="w-4 h-4 text-purple-400" />;
      default: return <Award className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="relative border-l-2 border-slate-800 ml-3 space-y-8 py-4">
      {events.map((event, idx) => (
        <div key={event.id} className="relative pl-6 group">
          {/* Timeline Node */}
          <div className="absolute -left-[11px] top-1 w-5 h-5 bg-slate-900 border-2 border-slate-700 rounded-full flex items-center justify-center group-hover:border-indigo-500 transition-colors z-10">
            <div className="w-1.5 h-1.5 bg-slate-500 rounded-full group-hover:bg-indigo-400 transition-colors" />
          </div>

          <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-lg hover:border-slate-700 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center space-x-2">
                {getIcon(event.type)}
                <span className="font-bold text-sm text-slate-200">{event.message}</span>
              </div>
              <span className="text-xs font-mono text-slate-500">
                {new Date(event.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            {event.subtext && (
              <p className="text-xs text-slate-400">{event.subtext}</p>
            )}
            
            {/* Visual indicators for "Proof" events could go here */}
            {event.type === 'rare_discovery' && (
              <div className="mt-3 inline-flex items-center space-x-1 bg-red-500/10 text-red-400 text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded border border-red-500/20">
                <Shield className="w-3 h-3 mr-1" /> Verified Proof Created
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
