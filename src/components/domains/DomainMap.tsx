"use client";

import { useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ReactFlow,
  Controls,
  Background as FlowBackground,
  Node,
  NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { motion } from "framer-motion";
import { Globe, BrainCircuit, ShieldAlert, Server, Gamepad2, Lock } from "lucide-react";
import { DOMAINS, Domain } from "@/data/domains";

// Map string icon names to Lucide components
const IconMap: Record<string, React.ElementType> = {
  Globe,
  BrainCircuit,
  ShieldAlert,
  Server,
  Gamepad2,
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
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
        <Icon className={`w-32 h-32 ${isLocked ? "text-white" : "text-[var(--color-cyber-cyan)]"}`} />
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
        
        <p className="text-sm text-cyber-muted leading-relaxed line-clamp-3">
          {data.description}
        </p>
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
  "ai-ml": { x: 400, y: -200 },
  "cybersecurity": { x: 450, y: 250 },
  "devops": { x: -350, y: -150 },
  "game-development": { x: -400, y: 200 },
};

export function DomainMap() {
  const router = useRouter();

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
    <div className="w-full h-full relative">
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none text-center">
        <h1 className="text-4xl font-black font-mono tracking-widest text-glow-purple uppercase mb-2">
          Progression Universe
        </h1>
        <p className="text-cyber-cyan font-mono text-sm tracking-widest animate-pulse">
          SELECT YOUR DOMAIN
        </p>
      </div>

      <ReactFlow
        nodes={nodes}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.2}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }}
        className="bg-transparent"
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={true}
      >
        <FlowBackground color="#ffffff" gap={30} size={1} className="opacity-5" />
        <Controls 
          className="bg-cyber-darker border border-white/10 rounded-lg overflow-hidden fill-cyber-cyan" 
          showInteractive={false}
        />
      </ReactFlow>
    </div>
  );
}
