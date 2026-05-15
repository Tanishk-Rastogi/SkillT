import React from 'react';

interface SkillTLogoProps {
  className?: string;
  size?: number;
  color?: string;
}

export const SkillTLogo: React.FC<SkillTLogoProps> = ({
  className = '',
  size = 40,
  color = 'currentColor',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/*
        SkillT Logo:
        - Bold slab-serif T with thick crossbar
        - Upward arrow cut out from T stem (negative space)
        - Joystick/key orb sitting on top of crossbar
      */}

      {/* ── T BODY ── */}
      {/* Crossbar (top horizontal bar of T) */}
      <rect x="10" y="90" width="180" height="36" rx="0" fill={color} />
      {/* Crossbar inner tabs (left cap) */}
      <rect x="10" y="82" width="52" height="14" fill={color} />
      {/* Crossbar inner tabs (right cap) */}
      <rect x="138" y="82" width="52" height="14" fill={color} />

      {/* T stem */}
      <rect x="72" y="126" width="56" height="100" fill={color} />
      {/* Stem base foot (left) */}
      <rect x="55" y="210" width="90" height="16" fill={color} />

      {/* ── UPWARD ARROW CUTOUT ── (white/transparent negative space through stem) */}
      {/* Arrow shaft */}
      <rect x="92" y="152" width="16" height="62" fill="transparent" stroke="none" />
      <rect
        x="92"
        y="152"
        width="16"
        height="62"
        fill="white"
        fillOpacity="1"
      />
      {/* Arrow head (triangle pointing up) */}
      <polygon
        points="100,122 83,156 117,156"
        fill="white"
      />

      {/* ── JOYSTICK ORB ── */}
      {/* Outer circle (the disc/base of the joystick) */}
      <ellipse cx="100" cy="66" rx="40" ry="30" fill={color} />
      {/* Inner circle cutout for depth */}
      <ellipse cx="100" cy="62" rx="24" ry="18" fill="white" fillOpacity="0.12" />
      {/* Joystick pin stem */}
      <rect x="96" y="28" width="8" height="26" rx="4" fill={color} />
      {/* Pin top knob */}
      <circle cx="100" cy="24" r="8" fill={color} />
      {/* Pin top highlight */}
      <circle cx="97" cy="21" r="2.5" fill="white" fillOpacity="0.4" />
      {/* Base ring shadow detail */}
      <ellipse cx="100" cy="72" rx="18" ry="8" fill="white" fillOpacity="0.08" />
    </svg>
  );
};

export const SkillTWordmark: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 32,
  color = 'currentColor',
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <SkillTLogo size={size} color={color} />
      <span
        className="font-black tracking-widest uppercase text-xl"
        style={{ color, letterSpacing: '0.12em', fontFamily: 'inherit' }}
      >
        SkillT
      </span>
    </div>
  );
};
