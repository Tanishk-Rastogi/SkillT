'use client';

import React from 'react';
import { AIMentorProfile, Region } from '@/data/worldLore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare } from 'lucide-react';

interface MentorEncounterProps {
  mentor: AIMentorProfile;
  region: Region;
  isOpen: boolean;
  onClose: () => void;
}

export const MentorEncounter: React.FC<MentorEncounterProps> = ({
  mentor,
  region,
  isOpen,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="relative max-w-xl w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${region.visual.bgGradient}`}
              style={{ opacity: 0.97 }}
            />
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-30 pointer-events-none"
              style={{ backgroundColor: region.visual.primaryColor }}
            />

            <div className="relative z-10 p-8">
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Region label */}
              <div
                className="text-[10px] font-mono font-bold uppercase tracking-widest mb-6 inline-flex items-center gap-1.5 px-2 py-1 rounded border"
                style={{
                  color: region.visual.accentColor,
                  borderColor: region.visual.primaryColor + '40',
                  backgroundColor: region.visual.primaryColor + '15',
                }}
              >
                {region.visual.icon} Entering {region.name}
              </div>

              {/* Mentor Identity */}
              <div className="flex items-start gap-5 mb-6">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shrink-0 border"
                  style={{
                    borderColor: region.visual.primaryColor + '60',
                    backgroundColor: region.visual.primaryColor + '20',
                    boxShadow: `0 0 25px ${region.visual.glowColor}`,
                  }}
                >
                  {mentor.avatar}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">{mentor.name}</h2>
                  <p className="font-mono text-sm" style={{ color: region.visual.accentColor }}>
                    {mentor.title}
                  </p>
                  <div
                    className="mt-2 text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded inline-block"
                    style={{
                      color: region.visual.accentColor,
                      backgroundColor: region.visual.primaryColor + '20',
                    }}
                  >
                    {mentor.personality}
                  </div>
                </div>
              </div>

              {/* Opening quote */}
              <blockquote className="text-white/80 italic text-lg leading-relaxed mb-6 border-l-2 pl-4"
                style={{ borderColor: region.visual.primaryColor }}>
                {mentor.openingQuote}
              </blockquote>

              {/* Philosophy */}
              <p className="text-sm text-white/60 leading-relaxed mb-6">{mentor.philosophy}</p>

              {/* Quest hint */}
              <div
                className="p-4 rounded-xl mb-6 border"
                style={{
                  borderColor: region.visual.primaryColor + '30',
                  backgroundColor: region.visual.primaryColor + '10',
                }}
              >
                <div
                  className="text-[10px] font-mono uppercase tracking-widest mb-2 flex items-center gap-1"
                  style={{ color: region.visual.accentColor }}
                >
                  <MessageSquare className="w-3 h-3" /> First Quest
                </div>
                <p className="text-sm text-white/70">{mentor.questHint}</p>
              </div>

              {/* CTA */}
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl font-bold text-sm tracking-wider transition-all hover:brightness-110"
                style={{
                  backgroundColor: region.visual.primaryColor,
                  color: '#fff',
                  boxShadow: `0 4px 20px ${region.visual.glowColor}`,
                }}
              >
                Begin in {region.name}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
