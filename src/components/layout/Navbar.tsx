"use client";

import { XPDisplay } from '@/components/ui/XPDisplay';
import { useAuth } from './AuthProvider';
import Link from 'next/link';

/** Slim top bar — XP only. Fixed at 56px offset. */
export function Navbar() {
  const { user } = useAuth();

  return (
    <header
      className="fixed top-0 right-0 z-[60] h-16 flex items-center px-4"
      style={{
        left: 56,
        background: 'rgba(9,11,16,0.85)',
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Left spacer */}
      <div className="flex-1" />

      {/* Center — XP bar, constrained width */}
      <div className="w-full max-w-sm px-2">
        {user ? (
          <XPDisplay />
        ) : (
          <Link
            href="/"
            className="text-xs font-mono px-3 py-1.5 rounded-full"
            style={{ color: 'var(--accent)', background: 'var(--accent-dim)', border: '1px solid var(--accent-border)' }}
          >
            INITIATE
          </Link>
        )}
      </div>

      {/* Right spacer */}
      <div className="flex-1" />
    </header>
  );
}
