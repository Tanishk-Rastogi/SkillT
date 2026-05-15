"use client";

import { useAuth } from "@/components/layout/AuthProvider";
import { GuildHub } from "@/components/guilds/GuildHub";
import { PartyFinder } from "@/components/guilds/PartyFinder";
import { CoopChallengeBoard } from "@/components/guilds/CoopChallengeBoard";
import { MentorshipPanel } from "@/components/social/MentorshipPanel";
import { useCollaborative } from "@/hooks/useCollaborative";
import Link from "next/link";

export default function GuildPage() {
  const { user } = useAuth();
  useCollaborative(); // Initialize multiplayer simulation

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <h1 className="text-3xl font-mono text-cyber-cyan mb-4">ACCESS DENIED</h1>
        <p className="text-cyber-muted mb-8">Please initiate login to access the Guild Network.</p>
        <Link href="/" className="px-6 py-2 border border-cyber-cyan text-cyber-cyan rounded hover:bg-cyber-cyan hover:text-black transition-all">
          Return to Hub
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-white mb-2 font-mono uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">
          Collaborative Hub
        </h1>
        <p className="text-slate-400">Join a guild, form a party, and conquer challenges together.</p>
      </div>

      <div className="mb-12">
        <GuildHub />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 h-[600px]">
          <PartyFinder />
        </div>
        
        <div className="lg:col-span-1 h-[600px]">
          <CoopChallengeBoard />
        </div>
        
        <div className="lg:col-span-1 h-[600px]">
          <MentorshipPanel />
        </div>
      </div>
    </div>
  );
}
