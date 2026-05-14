"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, XCircle } from "lucide-react";
import { MOCK_TESTS } from "@/data/tests";
import { INITIAL_SKILLS } from "@/data/skills";
import { useAuth } from "../layout/AuthProvider";

interface QuizComponentProps {
  skillId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export function QuizComponent({ skillId, onClose, onSuccess }: QuizComponentProps) {
  const { completeSkill } = useAuth();
  const skill = INITIAL_SKILLS.find((s) => s.id === skillId);
  const test = MOCK_TESTS[skillId];

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  if (!skill) return null;

  if (!test) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <div className="bg-cyber-dark border border-white/10 p-8 rounded-lg text-center max-w-md w-full">
          <h2 className="text-xl font-mono text-cyber-cyan mb-4">No Test Available</h2>
          <p className="text-cyber-muted mb-6">There is no test configured for this skill yet.</p>
          <button onClick={onClose} className="px-6 py-2 bg-white/10 rounded hover:bg-white/20 transition">Close</button>
        </div>
      </div>
    );
  }

  const currentQuestion = test.questions[currentQuestionIdx];

  const handleSelectOption = (option: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIdx]: option,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIdx === test.questions.length - 1) {
      // Calculate score
      let finalScore = 0;
      test.questions.forEach((q, i) => {
        if (selectedAnswers[i] === q.correct_answer) {
          finalScore++;
        }
      });
      setScore(finalScore);
      setShowResults(true);

      const passRatio = finalScore / test.questions.length;
      
      if (passRatio >= 0.7) {
        completeSkill(skillId);
      }
    } else {
      setCurrentQuestionIdx((i) => i + 1);
    }
  };

  const passRatio = score / test.questions.length;
  const isPassed = passRatio >= 0.7;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-cyber-darker border border-cyber-purple/30 rounded-2xl w-full max-w-2xl overflow-hidden shadow-[0_0_50px_rgba(176,38,255,0.15)] relative"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 relative bg-black/30">
          <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
            <motion.div 
              className="h-full bg-cyber-cyan" 
              initial={{ width: 0 }}
              animate={{ width: showResults ? "100%" : `${(currentQuestionIdx / test.questions.length) * 100}%` }}
            />
          </div>
          <div>
            <h2 className="text-xl font-bold font-mono text-white tracking-widest uppercase">
              {skill.title}
            </h2>
            <p className="text-xs text-cyber-cyan font-mono mt-1">CAPABILITY EVALUATION</p>
          </div>
          <button onClick={onClose} className="p-2 text-cyber-muted hover:text-white rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div
                key={`q-${currentQuestionIdx}`}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
              >
                <div className="flex justify-between items-center mb-6 font-mono text-sm">
                  <span className="text-cyber-muted">QUESTION {currentQuestionIdx + 1} OF {test.questions.length}</span>
                  <span className="text-cyber-purple">XP POTENTIAL: {skill.xpValue}</span>
                </div>

                <h3 className="text-xl text-white mb-8 leading-relaxed">
                  {currentQuestion.question}
                </h3>

                <div className="space-y-3">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSelectOption(option)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group ${
                        selectedAnswers[currentQuestionIdx] === option
                          ? "bg-cyber-purple/20 border-cyber-purple text-white shadow-[0_0_15px_rgba(176,38,255,0.2)]"
                          : "bg-black/40 border-white/10 text-white/70 hover:border-white/30 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span>{option}</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        selectedAnswers[currentQuestionIdx] === option ? "border-cyber-purple" : "border-white/20"
                      }`}>
                        {selectedAnswers[currentQuestionIdx] === option && (
                          <div className="w-2 h-2 rounded-full bg-cyber-purple animate-pulse" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={handleNext}
                    disabled={!selectedAnswers[currentQuestionIdx]}
                    className="px-8 py-3 bg-cyber-cyan hover:bg-white text-black font-bold font-mono rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {currentQuestionIdx === test.questions.length - 1 ? "SUBMIT EVALUATION" : "NEXT QUESTION"}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8"
              >
                {isPassed ? (
                  <>
                    <div className="w-24 h-24 mx-auto bg-cyber-green/20 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="w-12 h-12 text-cyber-green" />
                    </div>
                    <h2 className="text-3xl font-black font-mono tracking-widest text-glow-green uppercase mb-2">
                      EVALUATION PASSED
                    </h2>
                    <p className="text-cyber-muted mb-6">
                      You have successfully demonstrated your proficiency in {skill.title}.
                    </p>
                    <div className="text-4xl font-black text-cyber-green text-glow-green mb-8">
                      +{skill.xpValue} XP
                    </div>
                    <button
                      onClick={() => {
                        onSuccess();
                        onClose();
                      }}
                      className="px-12 py-4 bg-cyber-green hover:bg-white text-black font-bold font-mono tracking-widest rounded-lg transition-colors w-full"
                    >
                      CLAIM REWARD & RETURN
                    </button>
                  </>
                ) : (
                  <>
                    <div className="w-24 h-24 mx-auto bg-red-500/20 rounded-full flex items-center justify-center mb-6">
                      <XCircle className="w-12 h-12 text-red-500" />
                    </div>
                    <h2 className="text-3xl font-black font-mono tracking-widest text-red-500 uppercase mb-2">
                      EVALUATION FAILED
                    </h2>
                    <p className="text-cyber-muted mb-8">
                      You scored {Math.round(passRatio * 100)}%. A minimum of 70% is required to unlock this capability.
                    </p>
                    <button
                      onClick={() => {
                        setCurrentQuestionIdx(0);
                        setSelectedAnswers({});
                        setShowResults(false);
                      }}
                      className="px-12 py-4 bg-transparent border border-white/20 hover:border-white hover:bg-white/5 text-white font-bold font-mono tracking-widest rounded-lg transition-colors w-full"
                    >
                      RETRY EVALUATION
                    </button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
