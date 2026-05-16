'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';
import { useSidebar } from '@/lib/SidebarContext';
import {
  LayoutDashboard, Trophy, Shield, Users,
  Pencil, LogOut, ChevronRight, ChevronLeft, Menu, X,
} from 'lucide-react';

const PRIMARY_NAV = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
];
const SECONDARY_NAV = [
  { href: '/leaderboard', label: 'Rankings', icon: Trophy },
  { href: '/guild',       label: 'Guilds',   icon: Shield },
];

export function Sidebar() {
  const { user, login, logout } = useAuth();
  const pathname = usePathname();
  const { collapsed, toggle } = useSidebar();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const NavItem = ({
    href, label, icon: Icon, secondary = false,
  }: { href: string; label: string; icon: React.ElementType; secondary?: boolean }) => {
    const active = isActive(href);
    return (
      <Link
        href={href}
        onClick={() => setMobileOpen(false)}
        title={collapsed ? label : undefined}
        className="flex items-center rounded-lg transition-all relative group"
        style={{
          gap: collapsed ? 0 : 12,
          padding: collapsed ? '8px 0' : '8px 12px',
          justifyContent: collapsed ? 'center' : 'flex-start',
          color:      active ? '#a89eff' : secondary ? 'rgba(255,255,255,0.38)' : 'rgba(255,255,255,0.72)',
          background: active ? 'rgba(108,99,255,0.14)' : 'transparent',
          fontSize:   secondary ? 12 : 13,
          fontWeight: secondary ? 400 : 500,
        }}
      >
        {active && !collapsed && (
          <span
            className="absolute left-0 top-2 bottom-2 w-[2px] rounded-full"
            style={{ background: '#6c63ff' }}
          />
        )}
        <Icon
          size={15}
          className="shrink-0"
          style={{ color: active ? '#a89eff' : secondary ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.80)' }}
        />
        {!collapsed && <span className="truncate">{label}</span>}
        {!collapsed && active && <ChevronRight size={11} className="ml-auto opacity-40 shrink-0" />}

        {/* Tooltip when collapsed */}
        {collapsed && (
          <span
            className="absolute left-full ml-3 px-2 py-1 rounded text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-[200] transition-opacity"
            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-mid)', color: 'var(--text-primary)' }}
          >
            {label}
          </span>
        )}
      </Link>
    );
  };

  const SidebarContent = ({ isDrawer = false }: { isDrawer?: boolean }) => (
    <div className="flex flex-col h-full">

      {/* LOGO */}
      <div
        className="flex items-center h-16 shrink-0 px-4"
        style={{
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="flex items-center min-w-0"
          style={{ gap: collapsed && !isDrawer ? 6 : 8 }}
        >
          {(!collapsed || isDrawer) && (
            <div
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }}
            />
          )}
          <span
            className="font-black tracking-[0.02em] whitespace-nowrap"
            style={{ color: 'var(--text-primary)', fontSize: collapsed && !isDrawer ? 12 : 16 }}
          >
            {collapsed && !isDrawer ? 'ST' : 'SkillT'}
          </span>
        </Link>

        {/* Mobile close button */}
        {isDrawer && (
          <button onClick={() => setMobileOpen(false)} className="p-1 rounded" style={{ color: 'var(--text-muted)' }}>
            <X size={15} />
          </button>
        )}
      </div>

      {/* NAV */}
      <nav
        className="flex-1 pt-3 pb-2 overflow-y-auto overflow-x-hidden space-y-0.5"
        style={{ padding: collapsed && !isDrawer ? '12px 8px 8px' : '12px 12px 8px' }}
      >
        {(!collapsed || isDrawer) && (
          <p className="text-[10px] font-mono uppercase tracking-widest px-3 pb-2" style={{ color: 'var(--text-muted)' }}>
            Navigate
          </p>
        )}
        {PRIMARY_NAV.map(item => <NavItem key={item.href} {...item} />)}

        <div className="my-2" style={{ borderTop: '1px solid var(--border)' }} />

        {(!collapsed || isDrawer) && (
          <p className="text-[10px] font-mono uppercase tracking-widest px-3 pb-2" style={{ color: 'var(--text-muted)' }}>
            Community
          </p>
        )}
        {SECONDARY_NAV.map(item => <NavItem key={item.href} {...item} secondary />)}

        <div className="my-2" style={{ borderTop: '1px solid var(--border)' }} />

        <Link
          href="/creator"
          onClick={() => setMobileOpen(false)}
          title={collapsed && !isDrawer ? '+ Build Tree' : undefined}
          className="flex items-center rounded-lg transition-colors group relative"
          style={{
            gap: collapsed && !isDrawer ? 0 : 10,
            padding: collapsed && !isDrawer ? '8px 0' : '8px 12px',
            justifyContent: collapsed && !isDrawer ? 'center' : 'flex-start',
            color: 'var(--text-muted)',
            border: '1px dashed var(--border)',
            fontSize: 12,
            fontFamily: 'var(--font-mono)',
          }}
        >
          <Pencil size={13} className="opacity-50 shrink-0" />
          {(!collapsed || isDrawer) && '+ Build Tree'}
          {collapsed && !isDrawer && (
            <span
              className="absolute left-full ml-3 px-2 py-1 rounded text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-[200] transition-opacity"
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-mid)', color: 'var(--text-primary)' }}
            >
              + Build Tree
            </span>
          )}
        </Link>
      </nav>

      {/* USER FOOTER */}
      {user ? (
        <div
          className="pt-3 pb-4 shrink-0"
          style={{ borderTop: '1px solid var(--border)', padding: collapsed && !isDrawer ? '12px 8px 16px' : '12px 12px 16px' }}
        >
          <Link
            href={`/${user.username.toLowerCase()}`}
            onClick={() => setMobileOpen(false)}
            title={collapsed && !isDrawer ? user.username : undefined}
            className="flex items-center rounded-lg hover:bg-white/[0.03] transition-colors mb-2 group relative"
            style={{
              gap: collapsed && !isDrawer ? 0 : 10,
              padding: collapsed && !isDrawer ? '8px 0' : '8px 8px',
              justifyContent: collapsed && !isDrawer ? 'center' : 'flex-start',
            }}
          >
            <div
              className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-[10px] font-semibold"
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-mid)', color: 'var(--text-secondary)' }}
            >
              {user.username.slice(0, 2).toUpperCase()}
            </div>
            {(!collapsed || isDrawer) && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                  {user.username}
                </span>
                <span className="text-[10px] font-mono truncate" style={{ color: 'var(--text-muted)' }}>
                  {(user as any).dominantDomain || 'Explorer'}
                </span>
              </div>
            )}
          </Link>
          <button
            onClick={logout}
            title={collapsed && !isDrawer ? 'Sign out' : undefined}
            className="flex items-center w-full rounded-md hover:bg-white/[0.03] transition-colors text-[11px] font-mono"
            style={{
              gap: collapsed && !isDrawer ? 0 : 8,
              padding: collapsed && !isDrawer ? '6px 0' : '6px 8px',
              justifyContent: collapsed && !isDrawer ? 'center' : 'flex-start',
              color: 'var(--text-muted)',
            }}
          >
            <LogOut size={12} />
            {(!collapsed || isDrawer) && 'Sign out'}
          </button>
        </div>
      ) : (
        <div style={{ padding: collapsed && !isDrawer ? '0 8px 16px' : '0 12px 16px' }}>
          <button
            onClick={() => { login('CyberDev'); setMobileOpen(false); }}
            className="w-full py-2 text-xs font-mono rounded-lg hover:opacity-90 transition-opacity"
            style={{ color: 'var(--accent)', background: 'var(--accent-dim)', border: '1px solid var(--accent-border)' }}
          >
            {collapsed && !isDrawer ? '→' : 'INITIATE'}
          </button>
        </div>
      )}

      {/* COLLAPSE TOGGLE */}
      {!isDrawer && (
        <button
          onClick={toggle}
          className="hidden md:flex items-center shrink-0 w-full transition-colors hover:bg-white/[0.04]"
          style={{
            borderTop: '1px solid var(--border)',
            padding: collapsed ? '10px 0' : '10px 16px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            gap: 8,
            color: 'var(--text-muted)',
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
          }}
          title={collapsed ? 'Expand' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={14} /> : <><ChevronLeft size={14} /><span>Collapse</span></>}
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR — Fixed container width 56px, overlay content */}
      <aside className="hidden md:block fixed top-0 left-0 h-screen z-[70] w-[56px]">
        <div
          className="h-full border-right border-white/5 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            width: collapsed ? 56 : 220,
            background: 'rgba(9,11,16,0.96)',
            borderRight: '1px solid var(--border)',
            backdropFilter: 'blur(16px)',
            boxShadow: collapsed ? 'none' : '20px 0 50px rgba(0,0,0,0.5)',
            overflow: 'hidden',
          }}
        >
          <SidebarContent />
        </div>
      </aside>

      {/* MOBILE HAMBURGER */}
      <button
        className="md:hidden fixed top-3.5 left-4 z-[110] p-2 rounded-lg"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={16} style={{ color: 'var(--text-secondary)' }} />
      </button>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 z-[105] bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside
            className="md:hidden fixed top-0 left-0 h-screen z-[110] w-[260px]"
            style={{ background: 'var(--bg-card)', borderRight: '1px solid var(--border-mid)' }}
          >
            <SidebarContent isDrawer />
          </aside>
        </>
      )}
    </>
  );
}
