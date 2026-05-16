'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { UserState } from '@/components/layout/AuthProvider';

interface Node {
  id: string;
  x: number;
  y: number;
  size: number;
  type: 'core' | 'node' | 'edge';
  delay: number;
}

interface Connection {
  from: string;
  to: string;
  opacity: number;
}

export function NeuralConstellation({ user }: { user: UserState }) {
  // Generate constellation based on user level/archetype
  const { nodes, connections } = useMemo(() => {
    const seed = user.level || 1;
    const nodeCount = 5 + Math.min(user.level, 15);
    
    const generatedNodes: Node[] = [];
    const generatedConnections: Connection[] = [];

    // Core central node
    generatedNodes.push({
      id: 'root',
      x: 200,
      y: 200,
      size: 6,
      type: 'core',
      delay: 0
    });

    // Generate surrounding nodes
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2 + (seed * 0.1);
      const radius = 80 + (i % 3) * 40;
      generatedNodes.push({
        id: `node-${i}`,
        x: 200 + Math.cos(angle) * radius,
        y: 200 + Math.sin(angle) * radius,
        size: 3 + (i % 2),
        type: i < 5 ? 'node' : 'edge',
        delay: i * 0.2
      });

      // Connect to root or previous
      if (i < 5) {
        generatedConnections.push({ from: 'root', to: `node-${i}`, opacity: 0.3 });
      } else {
        generatedConnections.push({ from: `node-${i-3}`, to: `node-${i}`, opacity: 0.15 });
      }
    }

    return { nodes: generatedNodes, connections: generatedConnections };
  }, [user.level]);

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
      <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
        {/* Connection Paths */}
        {connections.map((conn, i) => {
          const fromNode = nodes.find(n => n.id === conn.from);
          const toNode = nodes.find(n => n.id === conn.to);
          if (!fromNode || !toNode) return null;

          return (
            <g key={`conn-${i}`}>
              <line 
                x1={fromNode.x} y1={fromNode.y} 
                x2={toNode.x} y2={toNode.y} 
                stroke="currentColor" 
                strokeWidth="0.5" 
                className="text-accent"
                style={{ opacity: conn.opacity }}
              />
              {/* Traveling Energy Pulse */}
              <motion.circle
                r="1"
                fill="white"
                initial={{ opacity: 0 }}
                animate={{ 
                  cx: [fromNode.x, toNode.x], 
                  cy: [fromNode.y, toNode.y],
                  opacity: [0, 0.8, 0]
                }}
                transition={{ 
                  duration: 3 + Math.random() * 2, 
                  repeat: Infinity, 
                  delay: Math.random() * 5,
                  ease: "easeInOut"
                }}
              />
            </g>
          );
        })}

        {/* Neural Nodes */}
        {nodes.map((node) => (
          <g key={node.id}>
            {/* Ambient Aura */}
            <motion.circle 
              cx={node.x} cy={node.y} r={node.size * 3}
              className="fill-accent opacity-5"
              animate={{ opacity: [0.02, 0.08, 0.02], scale: [1, 1.2, 1] }}
              transition={{ duration: 4, delay: node.delay, repeat: Infinity }}
            />
            
            {/* Inner Core */}
            <motion.circle 
              cx={node.x} cy={node.y} r={node.size}
              className={`${node.type === 'core' ? 'fill-white' : 'fill-accent'}`}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, delay: node.delay, repeat: Infinity }}
            />

            {/* Tactical Ring */}
            <circle 
              cx={node.x} cy={node.y} r={node.size + 4} 
              className="stroke-accent/20 fill-none" 
              strokeWidth="0.5" 
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
