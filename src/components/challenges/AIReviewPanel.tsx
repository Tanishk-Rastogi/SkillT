"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AIFeedback, ChallengeSubmission, MASTERY_TIER_LABELS } from "@/data/challenges";
import { CheckCircle, TrendingUp, AlertCircle, Cpu, Zap, ArrowRight, Trophy } from "lucide-react";

interface AIReviewPanelProps {
  submission: ChallengeSubmission | null;
  isAnalyzing: boolean;
  onClose: () => void;
}

function ScoreBar({ score }: { score: number }) {
  const [displayed, setDisplayed] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setDisplayed(score), 400);
    return () => clearTimeout(timer);
  }, [score]);

  const color = score >= 85 ? 'bg-cyber-green' : score >= 70 ? 'bg-amber-400' : 'bg-red-400';
  return (
    <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${displayed}%` }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
      />
    </div>
  );
}

function AnalyzingScreen() {
  const steps = ["Parsing submission...", "Evaluating architecture...", "Checking code quality...", "Scoring proficiency...", "Generating feedback..."];
  const [step, setStep] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setStep(s => Math.min(s + 1, steps.length - 1)), 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="w-16 h-16 rounded-full border-2 border-cyber-cyan/30 border-t-cyber-cyan flex items-center justify-center"
      >
        <Cpu className="w-7 h-7 text-cyber-cyan" />
      </motion.div>
      <div className="text-center">
        <p className="text-white font-mono font-bold text-lg">AI REVIEWING</p>
        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-cyber-muted text-sm font-mono mt-1"
          >
            {steps[step]}
          </motion.p>
        </AnimatePresence>
      </div>
      <div className="flex gap-1.5">
        {steps.map((_, i) => (
          <motion.div
            key={i}
            className={`w-1.5 h-1.5 rounded-full ${i <= step ? 'bg-cyber-cyan' : 'bg-white/10'}`}
            animate={i === step ? { scale: [1, 1.4, 1] } : {}}
            transition={{ repeat: Infinity, duration: 0.8 }}
          />
        ))}
      </div>
    </div>
  );
}

export function AIReviewPanel({ submission, isAnalyzing, onClose }: AIReviewPanelProps) {
  const feedback = submission?.aiFeedback;
  const tierMeta = feedback ? MASTERY_TIER_LABELS[feedback.masteryUnlocked] : null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-lg"
        onClick={!isAnalyzing ? onClose : undefined}
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ type: "spring", damping: 28, stiffness: 260 }}
        className="fixed inset-x-3 bottom-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[620px] md:max-h-[88vh] z-[90] flex flex-col bg-cyber-darker border border-white/10 rounded-t-2xl md:rounded-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative border-b border-white/10 bg-black/50 p-5 shrink-0">
          <div className="absolute inset-0 bg-gradient-to-r from-cyber-purple/15 to-cyber-cyan/10 pointer-events-none" />
          <div className="relative flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyber-purple/20 border border-cyber-purple/40">
              <Cpu className="w-5 h-5 text-cyber-purple" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-cyber-muted tracking-widest">AI REVIEW ENGINE</p>
              <h2 className="text-lg font-black font-mono text-white">
                {isAnalyzing ? "ANALYZING SUBMISSION" : "REVIEW COMPLETE"}
              </h2>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {isAnalyzing ? (
            <AnalyzingScreen />
          ) : feedback && submission ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5 space-y-5">
              {/* Score */}
              <div className="bg-black/40 border border-white/8 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-cyber-muted tracking-widest">PROFICIENCY SCORE</span>
                  <span className="text-2xl font-black font-mono text-white">{feedback.overallScore}<span className="text-sm text-cyber-muted">/100</span></span>
                </div>
                <ScoreBar score={feedback.overallScore} />
                <p className="text-xs text-cyber-cyan font-mono mt-2">{feedback.proficiencyEstimate}</p>
              </div>

              {/* Mastery tier gained */}
              {tierMeta && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-cyber-green/10 to-transparent border border-cyber-green/30 rounded-xl"
                >
                  <div className="p-3 rounded-lg bg-cyber-green/20">
                    <TrendingUp className="w-6 h-6 text-cyber-green" />
                  </div>
                  <div>
                    <p className="text-xs text-cyber-muted font-mono">MASTERY TIER ADVANCED</p>
                    <p className={`text-lg font-black font-mono ${tierMeta.color}`}>{tierMeta.label} <span className="text-xs text-white/60">— {tierMeta.description}</span></p>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-lg font-black text-cyber-green font-mono">+{submission.xpEarned}</div>
                    <div className="text-[9px] text-cyber-muted font-mono">XP EARNED</div>
                  </div>
                </motion.div>
              )}

              {/* Verdict */}
              <div className="p-4 bg-white/3 border border-white/8 rounded-xl">
                <p className="text-xs font-mono font-bold text-cyber-muted mb-2 tracking-widest">AI VERDICT</p>
                <p className="text-sm text-white/90 leading-relaxed italic">&ldquo;{feedback.verdict}&rdquo;</p>
              </div>

              {/* Strengths */}
              <div>
                <h3 className="text-xs font-mono font-bold text-cyber-muted tracking-widest mb-3 flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-cyber-green" /> STRENGTHS
                </h3>
                <div className="space-y-2">
                  {feedback.strengths.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="flex items-start gap-2.5 p-2.5 bg-cyber-green/5 border border-cyber-green/20 rounded-lg"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-cyber-green shrink-0 mt-0.5" />
                      <span className="text-sm text-white/80">{s}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Improvements */}
              <div>
                <h3 className="text-xs font-mono font-bold text-cyber-muted tracking-widest mb-3 flex items-center gap-2">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400" /> AREAS TO IMPROVE
                </h3>
                <div className="space-y-2">
                  {feedback.improvements.map((imp, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="flex items-start gap-2.5 p-2.5 bg-amber-400/5 border border-amber-400/20 rounded-lg"
                    >
                      <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-white/80">{imp}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Next steps */}
              {feedback.nextSteps.length > 0 && (
                <div className="p-4 bg-cyber-purple/5 border border-cyber-purple/20 rounded-xl">
                  <h3 className="text-xs font-mono font-bold text-cyber-purple tracking-widest mb-2 flex items-center gap-2">
                    <ArrowRight className="w-3.5 h-3.5" /> RECOMMENDED NEXT STEPS
                  </h3>
                  {feedback.nextSteps.map((step, i) => (
                    <p key={i} className="text-sm text-white/70">{step}</p>
                  ))}
                </div>
              )}
            </motion.div>
          ) : null}
        </div>

        {/* Footer */}
        {!isAnalyzing && (
          <div className="p-5 border-t border-white/10 bg-black/60 shrink-0">
            <button
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 py-3 bg-cyber-cyan hover:bg-white text-black font-mono font-bold rounded-lg transition-all"
            >
              <Trophy className="w-4 h-4" /> Continue Journey
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
