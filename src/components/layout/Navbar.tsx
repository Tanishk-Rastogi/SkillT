"use client";

import Link from "next/link";
import { useAuth } from "./AuthProvider";
import { User, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
  const { user, login, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/10 bg-glass px-6 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2 group">
        <Shield className="w-6 h-6 text-[var(--color-cyber-cyan)] group-hover:animate-pulse" />
        <span className="font-mono text-xl font-bold tracking-widest text-glow-cyan uppercase">
          SkillTree
        </span>
      </Link>

      <div className="flex items-center gap-6">
        {user ? (
          <>
            <div className="hidden md:flex items-center gap-4 text-sm font-mono border-r border-white/10 pr-6">
              <div className="flex items-center gap-1 text-[var(--color-cyber-purple)]">
                <Zap className="w-4 h-4" />
                <span>Level {user.level}</span>
              </div>
              <div className="flex items-center gap-1 text-[var(--color-cyber-cyan)]">
                <span>{user.xp} XP</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-sm text-white/60 hover:text-[var(--color-cyber-cyan)] transition-colors font-mono">
                Dashboard
              </Link>
              <Link
                href="/leaderboard"
                className="text-sm text-white/60 hover:text-amber-400 transition-colors font-mono flex items-center gap-1.5"
              >
                🏆 <span className="hidden sm:inline">Rankings</span>
              </Link>
              <Link
                href={`/${user.username.toLowerCase()}`}
                className="flex items-center gap-2 group"
              >
                <div className="w-7 h-7 rounded border border-cyber-cyan/40 bg-cyber-cyan/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-cyber-cyan" />
                </div>
                <span className="hidden sm:block text-sm font-mono font-medium text-white/80 group-hover:text-white transition-colors">
                  {user.username}
                </span>
              </Link>
              <button
                onClick={logout}
                className="text-xs text-cyber-muted hover:text-white font-mono transition-colors hidden sm:block"
              >
                [logout]
              </button>
            </div>
          </>
        ) : (
          <button
            onClick={() => login("CyberDev")}
            className="px-4 py-1.5 text-sm font-mono border border-[var(--color-cyber-cyan)] text-[var(--color-cyber-cyan)] rounded hover:bg-[var(--color-cyber-cyan)] hover:text-black transition-all"
          >
            INITIATE LOGIN
          </button>
        )}
      </div>
    </nav>
  );
}
