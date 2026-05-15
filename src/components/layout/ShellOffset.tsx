'use client';

import { useSidebar } from '@/lib/SidebarContext';

/**
 * Sets --sidebar-w CSS variable on a wrapper div.
 * - Main content uses ml on this div (works fine).
 * - Fixed top bar reads the CSS variable via style prop.
 */
export function ShellOffset({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();
  const w = collapsed ? 56 : 220;

  return (
    <div
      className="hidden md:block"
      style={
        {
          '--sidebar-w': `${w}px`,
          marginLeft: `${w}px`,
          transition: 'margin-left 0.22s cubic-bezier(0.4,0,0.2,1)',
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
