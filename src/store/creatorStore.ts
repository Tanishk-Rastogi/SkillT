import { create } from 'zustand';
import { AppNode, AppEdge, CreatorNodeData } from '../types/creator';
import { addEdge, applyNodeChanges, applyEdgeChanges, Connection, EdgeChange, NodeChange } from '@xyflow/react';

interface CreatorState {
  nodes: AppNode[];
  edges: AppEdge[];
  selectedNodeId: string | null;
  
  onNodesChange: (changes: NodeChange<AppNode>[]) => void;
  onEdgesChange: (changes: EdgeChange<AppEdge>[]) => void;
  onConnect: (connection: Connection) => void;
  
  addNode: (node: AppNode) => void;
  updateNodeData: (id: string, data: Partial<CreatorNodeData>) => void;
  setSelectedNodeId: (id: string | null) => void;
  
  validateTree: () => { isValid: boolean; errors: string[]; warnings: string[] };
}

export const useCreatorStore = create<CreatorState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },

  addNode: (node) => {
    set({ nodes: [...get().nodes, node] });
  },

  updateNodeData: (id, data) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === id) {
          return { ...node, data: { ...node.data, ...data } };
        }
        return node;
      }),
    });
  },

  setSelectedNodeId: (id) => {
    set({ selectedNodeId: id });
  },

  validateTree: () => {
    const { nodes, edges } = get();
    const errors: string[] = [];
    const warnings: string[] = [];

    if (nodes.length === 0) {
      errors.push("The skill tree is empty.");
      return { isValid: false, errors, warnings };
    }

    // Check for unreachable nodes (nodes with no incoming edges, excluding a hypothetical 'root')
    // A proper check would find connected components, but for MVP we do a simple check
    const nodesWithIncoming = new Set(edges.map(e => e.target));
    const nodesWithOutgoing = new Set(edges.map(e => e.source));
    
    let rootCount = 0;
    nodes.forEach(node => {
      if (!nodesWithIncoming.has(node.id)) {
        rootCount++;
      }
      
      if (node.data.xpReward <= 0 && node.data.nodeType !== 'gate') {
        warnings.push(`Node "${node.data.title}" grants 0 XP.`);
      }
    });

    if (rootCount > 1) {
      warnings.push(`There are ${rootCount} starting nodes. Usually there should only be one root.`);
    }

    if (rootCount === 0 && nodes.length > 0) {
      errors.push("Cycle detected with no starting point.");
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }
}));
