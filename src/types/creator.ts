import { Node, Edge } from '@xyflow/react';

export type NodeType = 'skill' | 'boss' | 'gate';

export type CreatorNodeData = {
  title: string;
  description: string;
  xpReward: number;
  nodeType: NodeType;
  challenges: string[]; // For MVP, array of challenge IDs or titles
  metaSkills: string[];
};

export type AppNode = Node<CreatorNodeData>;
export type AppEdge = Edge;

export type TreeValidationResult = {
  isValid: boolean;
  errors: string[];
  warnings: string[];
};
