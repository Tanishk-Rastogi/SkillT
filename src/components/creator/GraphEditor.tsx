'use client';

import React, { useCallback, useRef } from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  MiniMap,
  useReactFlow,
  ReactFlowProvider,
  NodeTypes
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCreatorStore } from '@/store/creatorStore';
import { SkillNode, BossNode, GateNode } from './CustomNodes';
import { ValidationPanel } from './ValidationPanel';
import { NodeType } from '@/types/creator';

const nodeTypes: NodeTypes = {
  skill: SkillNode,
  boss: BossNode,
  gate: GateNode,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const GraphEditorInner = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();
  
  const { 
    nodes, 
    edges, 
    onNodesChange, 
    onEdgesChange, 
    onConnect,
    addNode,
    setSelectedNodeId
  } = useCreatorStore();

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow') as NodeType;

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      
      const newNodeId = getId();

      const newNode = {
        id: newNodeId,
        type,
        position,
        data: { 
          title: `New ${type}`,
          description: '',
          xpReward: type === 'boss' ? 1000 : 100,
          nodeType: type,
          challenges: [],
          metaSkills: []
        },
      };

      addNode(newNode);
      setSelectedNodeId(newNodeId);
    },
    [screenToFlowPosition, addNode, setSelectedNodeId],
  );

  return (
    <div className="flex-1 h-full relative" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={(_, node) => setSelectedNodeId(node.id)}
        onPaneClick={() => setSelectedNodeId(null)}
        nodeTypes={nodeTypes}
        fitView
        className="bg-slate-950"
        colorMode="dark"
      >
        <Background gap={20} size={1} />
        <MiniMap 
          nodeColor={(n) => {
            if (n.type === 'skill') return '#22d3ee'; // cyan-400
            if (n.type === 'boss') return '#ef4444'; // red-500
            if (n.type === 'gate') return '#f59e0b'; // amber-500
            return '#475569';
          }}
          maskColor="rgba(15, 23, 42, 0.7)"
          className="bg-slate-900 border border-slate-800"
        />
      </ReactFlow>

      <ValidationPanel />
    </div>
  );
};

export const GraphEditor = () => {
  return (
    <ReactFlowProvider>
      <GraphEditorInner />
    </ReactFlowProvider>
  );
};
