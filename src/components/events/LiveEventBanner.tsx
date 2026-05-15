'use client';

import React, { useState, useEffect } from 'react';
import { useEventStore } from '@/store/eventStore';
import { Clock, AlertCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const LiveEventBanner: React.FC = () => {
  const { activeEvents, activeSeason } = useEventStore();
  const [timeLeft, setTimeLeft] = useState<string>('');

  // Let's grab the most urgent event or the season end
  const mostUrgentEvent = activeEvents[0];
  const targetDate = mostUrgentEvent 
    ? new Date(mostUrgentEvent.endDate).getTime() 
    : activeSeason 
      ? new Date(activeSeason.endDate).getTime() 
      : null;

  useEffect(() => {
    if (!targetDate) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft('ENDED');
        clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (days > 0) {
         setTimeLeft(`${days}d ${hours}h`);
      } else {
         setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!mostUrgentEvent && !activeSeason) return null;

  const isUrgent = mostUrgentEvent && timeLeft.includes('h'); // Less than a day

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full py-2 px-4 flex items-center justify-between text-sm font-medium z-50 ${
        isUrgent 
          ? 'bg-red-500/20 text-red-200 border-b border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
          : 'bg-indigo-500/10 text-indigo-200 border-b border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]'
      }`}
    >
      <div className="flex items-center space-x-3">
        {isUrgent ? <AlertCircle className="w-4 h-4 text-red-400" /> : <Sparkles className="w-4 h-4 text-indigo-400" />}
        <span className="flex items-center space-x-2">
          <span className="font-bold tracking-wider uppercase">
            {mostUrgentEvent ? mostUrgentEvent.title : activeSeason?.title}
          </span>
          <span className="opacity-75 hidden sm:inline">
            — {mostUrgentEvent ? mostUrgentEvent.description : 'Earn exclusive rewards before time runs out.'}
          </span>
        </span>
      </div>

      <div className="flex items-center space-x-2 font-mono bg-black/30 px-3 py-1 rounded-md border border-white/5">
        <Clock className="w-4 h-4 opacity-70" />
        <span className={isUrgent ? 'text-red-300' : 'text-indigo-300'}>
          {timeLeft || '...'}
        </span>
      </div>
    </motion.div>
  );
};
