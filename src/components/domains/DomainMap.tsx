"use client";

import { useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  Background as FlowBackground,
  Node,
  NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { motion } from "framer-motion";
import { Globe, BrainCircuit, ShieldAlert, Server, Gamepad2, Lock, Compass, Pencil, Users, Trophy, LayoutDashboard } from "lucide-react";
import { DOMAINS, Domain } from "@/data/domains";

// Map string icon names to Lucide components
const IconMap: Record<string, React.ElementType> = {
  Globe,
  BrainCircuit,
  ShieldAlert,
  Server,
  Gamepad2,
  Pencil,
  Users,
  Trophy,
  LayoutDashboard,
};

function DomainNode({ data }: NodeProps<Node<Domain & Record<string, unknown>>>) {
  const Icon = IconMap[data.iconType] || Globe;
  const isLocked = data.isComingSoon;

  return (
    <motion.div
      whileHover={!isLocked ? { scale: 1.05 } : {}}
      whileTap={!isLocked ? { scale: 0.95 } : {}}
      className={`relative w-80 p-6 rounded-2xl border backdrop-blur-md transition-colors duration-500 cursor-pointer overflow-hidden group
        ${isLocked 
          ? "bg-cyber-darker border-white/5 opacity-50 cursor-not-allowed" 
          : "bg-cyber-dark/80 border-[var(--color-cyber-purple)]/50 hover:border-[var(--color-cyber-cyan)] shadow-[0_0_30px_rgba(176,38,255,0.1)] hover:shadow-[0_0_50px_rgba(0,240,255,0.2)]"
        }`}
    >
      <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:opacity-10 group-hover:scale-110 transition-all duration-500 pointer-events-none select-none">
        <Icon className={`w-32 h-32 ${isLocked ? "text-white" : "text-[var(--accent)]"}`} style={{ filter: 'blur(1px)' }} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-3 rounded-xl bg-black/50 ${!isLocked ? "text-[var(--color-cyber-cyan)] group-hover:animate-pulse-fast" : "text-cyber-muted"}`}>
            <Icon className="w-8 h-8" />
          </div>
          {isLocked && (
            <span className="px-2 py-1 text-xs font-mono font-bold bg-white/10 text-white rounded flex items-center gap-1">
              <Lock className="w-3 h-3" /> COMING SOON
            </span>
          )}
        </div>
        
        <h2 className={`text-2xl font-black font-mono tracking-wider mb-2 ${!isLocked ? "text-glow-cyan" : "text-cyber-muted"}`}>
          {data.title}
        </h2>
        
        <p className="text-sm text-cyber-muted leading-relaxed line-clamp-2 mb-4">
          {data.description}
        </p>

        {data.roles && (
          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
            {data.roles.slice(0, 3).map((role) => (
              <span 
                key={role} 
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/40 border border-white/5 whitespace-nowrap"
              >
                {role.toUpperCase()}
              </span>
            ))}
            {data.roles.length > 3 && (
              <span className="text-[10px] font-mono text-white/20 px-1">
                +{data.roles.length - 3} MORE
              </span>
            )}
          </div>
        )}
      </div>

    </motion.div>
  );
}

const nodeTypes = {
  domain: DomainNode,
};

// Fixed positions for the "world map"
const DOMAIN_POSITIONS: Record<string, { x: number, y: number }> = {
  "web-development": { x: 0, y: 0 },
  "ai-ml": { x: 500, y: -300 },
  "cybersecurity": { x: 550, y: 350 },
  "devops": { x: -500, y: -300 },
  "game-development": { x: -550, y: 350 },
  "ui-ux": { x: 1000, y: 0 },
  "leadership": { x: 0, y: -600 },
  "business": { x: -1000, y: 0 },
  "content": { x: 0, y: 600 },
};


const JOURNEY_STEPS = ["Choose a domain", "Complete quests", "Unlock skills", "Build your legend"];

export function DomainMap() {
  return (
    <ReactFlowProvider>
      <DomainMapContent />
    </ReactFlowProvider>
  );
}

function DomainMapContent() {
  const router = useRouter();
  const { fitView } = useReactFlow();

  const nodes: Node[] = useMemo(() => {
    return DOMAINS.map((domain) => ({
      id: domain.id,
      type: "domain",
      position: DOMAIN_POSITIONS[domain.id] || { x: 0, y: 0 },
      data: domain,
    }));
  }, []);

  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      const domain = node.data as unknown as Domain;
      if (!domain.isComingSoon) {
        router.push(`/domain/${domain.id}`);
      }
    },
    [router]
  );

  return (
    <div className="w-full h-full flex flex-col relative">
      {/* Hero Header */}
      <div className="flex flex-col items-center gap-4 pt-8 pb-6 z-10 shrink-0 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl font-black font-mono tracking-widest text-glow-purple uppercase"
          style={{ color: 'var(--text-primary)' }}
        >
          Progression Universe
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-cyber-cyan font-mono text-sm tracking-widest animate-pulse"
          style={{ color: 'var(--accent)' }}
        >
          SELECT YOUR DOMAIN
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="flex flex-wrap justify-center items-center gap-3 font-mono text-[10px] sm:text-xs tracking-widest text-white/50 select-none"
        >
          {JOURNEY_STEPS.map((step, i) => (
            <span key={step} className="flex items-center gap-3">
              <span className="text-white/60">{step.toUpperCase()}</span>
              {i < JOURNEY_STEPS.length - 1 && (
                <span className="text-[var(--color-cyber-purple)]/30">▸</span>
              )}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ReactFlow Map */}
      <div className="flex-1 relative min-h-0">
        <ReactFlow
          nodes={nodes}
          onNodeClick={handleNodeClick}
          nodeTypes={nodeTypes}
          fitView
          zoomOnScroll={true}
          zoomOnPinch={true}
          panOnScroll={true}
          maxZoom={1.5}
          minZoom={0.5}
          proOptions={{ hideAttribution: true }}
          className="bg-transparent"
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={true}
        >
          <FlowBackground color="#ffffff" gap={30} size={1} className="opacity-5" />
        </ReactFlow>

        {/* Compass Re-center Button */}
        <div className="absolute bottom-6 right-6 z-[70]">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => fitView({ duration: 800, padding: 0.2 })}
            className="p-2.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-white/40 hover:text-[var(--accent)] hover:border-[var(--accent-border)] transition-colors group"
            title="Re-center Universe"
          >
            <Compass className="w-5 h-5" />
          </motion.button>
        </div>

      </div>
    </div>
  );
}

