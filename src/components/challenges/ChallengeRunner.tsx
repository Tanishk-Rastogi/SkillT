"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Challenge } from "@/data/challenges";
import { X, Clock, Check, ChevronRight, Sword, AlertTriangle, Send } from "lucide-react";

interface ChallengeRunnerProps {
  challenge: Challenge;
  onClose: () => void;
  onSubmit: (submissionText: string) => void;
  isSubmitting: boolean;
}

export function ChallengeRunner({ challenge, onClose, onSubmit, isSubmitting }: ChallengeRunnerProps) {
  const [submissionText, setSubmissionText] = useState("");
  const [checkedObjectives, setCheckedObjectives] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState<number | null>(
    challenge.timeLimitMinutes ? challenge.timeLimitMinutes * 60 : null
  );
  const [timeExpired, setTimeExpired] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (timeLeft === null) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(timerRef.current!);
          setTimeExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const toggleObjective = (id: string) => {
    setCheckedObjectives(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const canSubmit = submissionText.trim().length > 30 && !isSubmitting;
  const isTimed = !!challenge.timeLimitMinutes;
  const timePercent = timeLeft !== null && challenge.timeLimitMinutes
    ? (timeLeft / (challenge.timeLimitMinutes * 60)) * 100 : 100;
  const timeColor = timePercent > 50 ? 'text-cyber-green' : timePercent > 25 ? 'text-amber-400' : 'text-red-400';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-md"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
        className="fixed inset-x-3 bottom-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[680px] md:max-h-[90vh] z-[80] flex flex-col bg-cyber-darker/99 border border-white/10 rounded-t-2xl md:rounded-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="relative border-b border-white/10 bg-black/60 shrink-0">
          {isTimed && (
            <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-400 to-cyber-green transition-all duration-1000" style={{ width: `${timePercent}%` }} />
          )}
          <div className="p-5 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/30 shrink-0">
              <Sword className="w-6 h-6 text-cyber-cyan" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-mono text-cyber-muted mb-0.5 tracking-widest">MISSION ACTIVE</div>
              <h2 className="text-lg font-black font-mono text-white truncate">{challenge.title}</h2>
              <p className="text-xs text-cyber-muted mt-1 line-clamp-2">{challenge.narrative}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {isTimed && timeLeft !== null && (
                <div className={`flex items-center gap-1.5 font-mono font-bold text-lg ${timeColor}`}>
                  <Clock className="w-4 h-4" />{formatTime(timeLeft)}
                </div>
              )}
              <button onClick={onClose} className="p-1.5 text-cyber-muted hover:text-white rounded-lg hover:bg-white/5 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Briefing */}
          <div className="p-5 border-b border-white/5">
            <h3 className="text-xs font-mono font-bold text-cyber-muted tracking-widest mb-2 flex items-center gap-2">
              <ChevronRight className="w-3.5 h-3.5" /> MISSION BRIEFING
            </h3>
            <p className="text-sm text-white/80 leading-relaxed bg-white/3 border border-white/5 rounded-lg p-3">
              {challenge.briefing}
            </p>
          </div>

          {/* Objectives */}
          <div className="p-5 border-b border-white/5">
            <h3 className="text-xs font-mono font-bold text-cyber-muted tracking-widest mb-3 flex items-center gap-2">
              <Check className="w-3.5 h-3.5" /> OBJECTIVES
            </h3>
            <div className="space-y-2">
              {challenge.objectives.map(obj => (
                <button key={obj.id} onClick={() => toggleObjective(obj.id)}
                  className="w-full flex items-start gap-3 text-left p-2.5 rounded-lg hover:bg-white/5 transition-colors group">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-all
                    ${checkedObjectives.has(obj.id) ? 'bg-cyber-green border-cyber-green' : 'border-white/20 group-hover:border-white/40'}`}>
                    {checkedObjectives.has(obj.id) && <Check className="w-3 h-3 text-black" />}
                  </div>
                  <span className={`text-sm transition-colors ${checkedObjectives.has(obj.id) ? 'text-white/40 line-through' : 'text-white/80'}`}>
                    {obj.description}
                    {!obj.required && <span className="ml-2 text-[10px] text-cyber-muted font-mono">(optional)</span>}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Submission */}
          <div className="p-5">
            <h3 className="text-xs font-mono font-bold text-cyber-muted tracking-widest mb-2 flex items-center gap-2">
              <Send className="w-3.5 h-3.5" /> SUBMIT PROOF
            </h3>
            <p className="text-xs text-cyber-muted mb-3">Describe your solution, paste a GitHub link, or summarize what you built. The AI reviewer will evaluate your submission.</p>
            <textarea
              value={submissionText}
              onChange={e => setSubmissionText(e.target.value)}
              disabled={isSubmitting}
              placeholder="Paste your code, describe your approach, or share a GitHub link..."
              className="w-full h-32 bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white/90 font-mono resize-none focus:outline-none focus:border-cyber-cyan/60 placeholder-white/20 disabled:opacity-50 transition-colors"
            />
            {timeExpired && (
              <div className="flex items-center gap-2 text-xs text-amber-400 font-mono mt-2">
                <AlertTriangle className="w-3.5 h-3.5" /> Time expired — submitting for partial credit.
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-white/10 bg-black/60 shrink-0">
          <div className="flex items-center justify-between gap-3">
            <div className="text-xs text-cyber-muted font-mono">
              <span className="text-cyber-green font-bold">+{challenge.xpReward} XP</span> · {challenge.masteryAwarded} tier · {challenge.difficulty}
            </div>
            <button
              onClick={() => canSubmit && onSubmit(submissionText)}
              disabled={!canSubmit}
              className="flex items-center gap-2 px-5 py-2.5 bg-cyber-cyan hover:bg-white text-black font-mono font-bold text-sm rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? "Analyzing..." : "Submit for AI Review"}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
