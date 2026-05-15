'use client';

import { useSidebar } from '@/lib/SidebarContext';

export function MainContent({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();
  const sidebarW = collapsed ? 56 : 220;

  return (
    <main
      className="relative z-10 pt-16 min-h-screen"
      style={{
        marginLeft: 56,
      }}
    >
      <div 
        style={{ 
          transform: 'scale(0.97)', 
          transformOrigin: 'top center',
          height: '100%'
        }}
      >
        {children}
      </div>
    </main>
  );
}
