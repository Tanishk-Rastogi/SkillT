'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';
import { useSidebar } from '@/lib/SidebarContext';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Trophy, Shield, Users,
  Pencil, LogOut, ChevronRight, ChevronLeft, Menu, X,
  Crown, Sparkles, Zap, Bell, RefreshCw
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

  // Quick Action triggers
  const [isSyncing, setIsSyncing] = useState(false);
  const [cacheClaimed, setCacheClaimed] = useState(false);

  // Micro-notifications alert cycling
  const [activeAlert, setActiveAlert] = useState("SYNCED: All local nodes operational.");
  const alerts = [
    "NEW UNLOCK: [Neural Architect] equipped.",
    "GUILD ALERT: 3 new members initiated.",
    "SEASON EVENT: Cybersecurity Clash active.",
    "SYSTEM Sync: Local workspace node stable.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAlert(prev => {
        const idx = alerts.indexOf(prev);
        return alerts[(idx + 1) % alerts.length];
      });
    }, 8500);
    return () => clearInterval(interval);
  }, []);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  // State Evolution Config based on level
  const level = user?.level || 1;
  let tierName = "Beginner";
  let tierColor = "text-slate-400";
  let borderPulse = "border-white/5";
  let bgGradient = "from-slate-950/40 to-slate-900/10";

  if (level >= 40) {
    tierName = "Legendary";
    tierColor = "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)] font-extrabold";
    borderPulse = "border-amber-400/40 shadow-[0_0_15px_rgba(251,191,36,0.15)]";
    bgGradient = "from-amber-500/10 via-cyber-darker to-cyber-darker";
  } else if (level >= 20) {
    tierName = "Elite";
    tierColor = "text-cyber-purple drop-shadow-[0_0_8px_rgba(167,139,250,0.6)] font-bold";
    borderPulse = "border-cyber-purple/40 shadow-[0_0_12px_rgba(167,139,250,0.12)]";
    bgGradient = "from-cyber-purple/10 via-cyber-darker to-cyber-darker";
  } else if (level >= 10) {
    tierName = "Advanced";
    tierColor = "text-cyber-cyan drop-shadow-[0_0_6px_rgba(0,240,255,0.5)]";
    borderPulse = "border-cyber-cyan/35 shadow-[0_0_10px_rgba(6,182,212,0.1)]";
    bgGradient = "from-cyber-cyan/10 via-cyber-darker to-cyber-darker";
  }

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
              className="w-2 h-2 rounded-full shrink-0 animate-pulse"
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

      {/* COLLAPSED RANK SIGN / PULSING ONLINE ICON */}
      {collapsed && !isDrawer && user && (
        <div className="flex flex-col items-center py-3 shrink-0 border-b border-white/5 gap-3">
          <div className={`relative w-8 h-8 rounded border ${borderPulse} bg-slate-900/60 flex items-center justify-center text-cyber-cyan`}>
            {level >= 40 ? (
              <Crown size={14} className="text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
            ) : level >= 20 ? (
              <Sparkles size={14} className="text-cyber-purple" />
            ) : (
              <Zap size={14} className="text-cyber-cyan" />
            )}
            <span className="absolute -bottom-0.5 -right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-cyan"></span>
            </span>
          </div>
        </div>
      )}

      {/* LOGGED-IN NETWORK PRESENCE */}
      {(!collapsed || isDrawer) && user && (
        <div className="mx-3 mt-3 mb-2 p-2.5 rounded-lg border border-white/5 bg-slate-950/40 relative overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_rgba(6,182,212,0.06),_transparent_60%)] pointer-events-none" />
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyber-cyan"></span>
            </span>
            <span className="text-[9px] font-black font-mono tracking-widest text-cyber-cyan">
              NETWORK SYNCED // ONLINE
            </span>
          </div>
          <div className="text-[8px] text-white/40 font-mono mt-1 flex items-center gap-1">
            <Users size={9} className="text-cyber-cyan" /> 12 MEMBERS ACTIVE
          </div>
        </div>
      )}

      {/* DYNAMIC TACTICAL RANK EMBLEM CARD */}
      {(!collapsed || isDrawer) && user && (
        <div className={`mx-3 mb-2 p-3 rounded-lg border ${borderPulse} bg-gradient-to-b ${bgGradient} relative overflow-hidden transition-all duration-300 shrink-0`}>
          {level >= 40 && (
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="absolute top-0 right-0 w-8 h-8 rounded-full border border-dashed border-amber-400/40 animate-spin" />
            </div>
          )}
          <div className="flex items-center gap-2.5 relative z-10">
            <div className="relative shrink-0 w-8 h-8 rounded border border-white/10 bg-white/5 flex items-center justify-center">
              {level >= 40 ? (
                <Crown size={14} className="text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.8)] animate-pulse" />
              ) : level >= 20 ? (
                <Sparkles size={14} className="text-cyber-purple animate-pulse" />
              ) : (
                <Zap size={14} className="text-cyber-cyan animate-pulse" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[9px] font-mono uppercase tracking-wider text-white/40">Active Build</div>
              <div className="text-xs font-bold truncate text-white">{user.activeClass?.name || 'Neural Architect'}</div>
              <div className={`text-[8px] font-mono uppercase mt-0.5 tracking-widest ${tierColor}`}>{tierName} Tier</div>
            </div>
          </div>
        </div>
      )}

      {/* NAV */}
      <nav
        className="flex-1 pt-2 pb-2 overflow-y-auto overflow-x-hidden space-y-0.5"
        style={{ padding: collapsed && !isDrawer ? '10px 8px 8px' : '10px 12px 8px' }}
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

        {/* SYSTEM MICRO-NOTIFICATIONS TICKER */}
        {(!collapsed || isDrawer) && user && (
          <div className="mt-4 mx-1 px-2.5 py-1.5 rounded border border-red-500/10 bg-red-500/5 flex items-center gap-2">
            <Bell size={10} className="text-red-400 shrink-0 animate-bounce" />
            <span className="text-[9px] font-mono text-red-300 truncate tracking-wide flex-1">
              {activeAlert}
            </span>
          </div>
        )}

        {/* PERSISTENT ACTIVE MISSION CARD */}
        {(!collapsed || isDrawer) && user && (
          <div className="mx-1 mt-3 p-2.5 rounded border border-white/5 bg-slate-950/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-cyber-cyan/15 px-1 py-0.5 text-[6.5px] font-mono text-cyber-cyan tracking-widest uppercase select-none rounded-bl border-l border-b border-cyber-cyan/20">
              Active Path
            </div>
            <div className="text-[8px] font-black font-mono tracking-widest text-white/40 mb-1">
              CURRENT OBJECTIVE
            </div>
            <div className="text-[11px] font-bold text-white truncate pr-10">
              Frontend Architect Trial
            </div>
            <div className="mt-2">
              <div className="flex items-center justify-between text-[8px] font-mono text-cyber-muted mb-0.5">
                <span>VERIFICATION</span>
                <span className="text-white">2 / 5</span>
              </div>
              <div className="h-[3px] w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-purple w-[40%]" />
              </div>
            </div>
            <div className="text-[8.5px] text-cyber-muted font-mono mt-2 flex items-center gap-1">
              <span className="relative flex h-1 w-1 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1 w-1 bg-amber-400"></span>
              </span>
              RESONANCE LOCK ACTIVE
            </div>
          </div>
        )}

        {/* TACTICAL QUICK ACTIONS */}
        {(!collapsed || isDrawer) && user && (
          <div className="mx-1 mt-2 grid grid-cols-2 gap-1.5">
            <button
              onClick={handleSync}
              className="py-1 px-2 rounded border border-white/5 hover:border-cyber-cyan/35 bg-white/5 text-[9px] font-mono text-white/70 hover:text-white flex items-center justify-center gap-1 transition-all"
            >
              <RefreshCw size={8} className={`shrink-0 ${isSyncing ? 'animate-spin text-cyber-cyan' : ''}`} />
              {isSyncing ? 'SYNCING...' : 'SYNC SYSTEM'}
            </button>
            <button
              onClick={() => setCacheClaimed(true)}
              disabled={cacheClaimed}
              className={`py-1 px-2 rounded border ${cacheClaimed ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400' : 'border-white/5 hover:border-cyber-cyan/35 bg-white/5 text-white/70 hover:text-white'} text-[9px] font-mono flex items-center justify-center gap-1 transition-all`}
            >
              <Sparkles size={8} className="shrink-0 animate-pulse" />
              {cacheClaimed ? 'CLAIMED' : 'CACHE'}
            </button>
          </div>
        )}
      </nav>

      {/* USER FOOTER */}
      {user ? (
        <div
          className="pt-2 pb-3 shrink-0"
          style={{ borderTop: '1px solid var(--border)', padding: collapsed && !isDrawer ? '10px 8px 12px' : '10px 12px 12px' }}
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
                <span className="text-[9px] font-mono truncate" style={{ color: 'var(--text-muted)' }}>
                  {user.dominantDomain || 'Explorer'}
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
        <div style={{ padding: collapsed && !isDrawer ? '0 8px 12px' : '0 12px 12px' }}>
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
