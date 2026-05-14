"use client";

import { useState, use } from "react";
import { TreeCanvas } from "@/components/skill-tree/TreeCanvas";
import { SkillDetailsPanel } from "@/components/skill-tree/SkillDetailsPanel";
import { ChallengeHub } from "@/components/challenges/ChallengeHub";
import { ChallengeRunner } from "@/components/challenges/ChallengeRunner";
import { AIReviewPanel } from "@/components/challenges/AIReviewPanel";
import { Skill } from "@/data/skills";
import { Challenge, ChallengeSubmission } from "@/data/challenges";
import { ROLES } from "@/data/roles";
import { DOMAINS } from "@/data/domains";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { useAuth } from "@/components/layout/AuthProvider";

interface PageProps {
  params: Promise<{ domainId: string; roleId: string }>;
}

type ChallengeFlow = 'hub' | 'runner' | 'review' | null;

export default function SkillTreePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { domainId, roleId } = resolvedParams;
  const { submitChallenge } = useAuth();

  const domain = DOMAINS.find((d) => d.id === domainId);
  const role = ROLES.find((r) => r.id === roleId && r.domainId === domainId);

  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [challengeFlow, setChallengeFlow] = useState<ChallengeFlow>(null);
  const [challengeSkillId, setChallengeSkillId] = useState<string | null>(null);
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [lastSubmission, setLastSubmission] = useState<ChallengeSubmission | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  if (!domain || !role) {
    notFound();
  }

  const handleOpenChallenges = (skillId: string) => {
    setChallengeSkillId(skillId);
    setChallengeFlow('hub');
  };

  const handleAcceptChallenge = (challenge: Challenge) => {
    setActiveChallenge(challenge);
    setChallengeFlow('runner');
  };

  const handleSubmitChallenge = async (submissionText: string) => {
    if (!activeChallenge) return;
    setIsSubmitting(true);
    setIsAnalyzing(true);
    setChallengeFlow('review');

    try {
      const submission = await submitChallenge(activeChallenge, submissionText);
      setLastSubmission(submission);
    } finally {
      setIsSubmitting(false);
      setIsAnalyzing(false);
    }
  };

  const handleCloseChallengeFlow = () => {
    setChallengeFlow(null);
    setActiveChallenge(null);
    setLastSubmission(null);
    setChallengeSkillId(null);
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] overflow-hidden flex flex-col">
      {/* Top Breadcrumb */}
      <div className="absolute top-4 left-6 z-10 pointer-events-auto">
        <Link 
          href={`/domain/${domain.id}`} 
          className="flex items-center gap-2 text-cyber-muted hover:text-white transition-colors bg-cyber-darker/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg text-xs font-mono uppercase tracking-wider"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to {domain.title} Roles
        </Link>
      </div>

      <div className="absolute top-4 right-6 z-10 pointer-events-none text-right">
        <h1 className="text-2xl font-black font-mono tracking-widest text-glow-cyan uppercase">
          {role.title}
        </h1>
        <p className="text-xs text-cyber-muted font-mono tracking-wider">
          SKILL PROGRESSION TREE
        </p>
      </div>

      <TreeCanvas onNodeClick={setSelectedSkill} roleId={role.id} />
      
      {/* Skill Details Panel */}
      {selectedSkill && !challengeFlow && (
        <SkillDetailsPanel 
          skill={selectedSkill} 
          onClose={() => setSelectedSkill(null)} 
          onOpenChallenges={handleOpenChallenges} 
        />
      )}

      {/* Challenge Hub */}
      {challengeFlow === 'hub' && challengeSkillId && (
        <ChallengeHub
          skillId={challengeSkillId}
          skillTitle={selectedSkill?.title || challengeSkillId}
          onClose={handleCloseChallengeFlow}
          onAcceptChallenge={handleAcceptChallenge}
        />
      )}

      {/* Challenge Runner */}
      {challengeFlow === 'runner' && activeChallenge && (
        <ChallengeRunner
          challenge={activeChallenge}
          onClose={() => setChallengeFlow('hub')}
          onSubmit={handleSubmitChallenge}
          isSubmitting={isSubmitting}
        />
      )}

      {/* AI Review Panel */}
      {challengeFlow === 'review' && (
        <AIReviewPanel
          submission={lastSubmission}
          isAnalyzing={isAnalyzing}
          onClose={handleCloseChallengeFlow}
        />
      )}
    </div>
  );
}
