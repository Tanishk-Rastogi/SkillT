"use client";

import { useMemo, useCallback, useEffect } from "react";
import {
  ReactFlow,
  Controls,
  Background as FlowBackground,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  ConnectionMode,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { SkillNode } from "./SkillNode";
import { SkillEdge } from "./SkillEdge";
import { useAuth } from "../layout/AuthProvider";
import { Skill, ROLE_SKILLS, INITIAL_SKILLS } from "@/data/skills";

const nodeTypes = {
  skill: SkillNode,
};

const edgeTypes = {
  skillEdge: SkillEdge,
};

interface TreeCanvasProps {
  onNodeClick: (skill: Skill) => void;
  roleId: string;
}

export function TreeCanvas({ onNodeClick, roleId }: TreeCanvasProps) {
  const { user } = useAuth();
  // We map the global INITIAL_SKILLS to the user's unlocked state.
  // Wait, user.skills in AuthProvider currently maps the whole Skill object or just completion status?
  // Usually, user.skills tracks which skills are completed. 
  // Let's assume user?.skills has the updated completion state for skills they interacted with.
  // But wait! INITIAL_SKILLS is the single source of truth for global definitions.
  // We should merge INITIAL_SKILLS with the user's completed state.

  const globalSkillsWithState = useMemo(() => {
    return INITIAL_SKILLS.map(globalSkill => {
      const userSkill = user?.skills?.find(s => s.id === globalSkill.id);
      return {
        ...globalSkill,
        status: userSkill ? userSkill.status : globalSkill.status
      };
    });
  }, [user?.skills]);

  // Filter global skills to only those included in the active role, and map their positions.
  const roleSkillsMap = useMemo(() => ROLE_SKILLS.filter(rs => rs.roleId === roleId), [roleId]);
  const roleSkillIds = useMemo(() => roleSkillsMap.map(rs => rs.skillId), [roleSkillsMap]);

  // Determine availability based on prerequisites
  const processedSkills = useMemo(() => {
    return globalSkillsWithState
      .filter((skill) => roleSkillIds.includes(skill.id))
      .map((skill) => {
        // Find position for this role
        const roleSkillMeta = roleSkillsMap.find(rs => rs.skillId === skill.id);
        
        // If already completed, keep it
        if (skill.status === "Completed") return { ...skill, position: roleSkillMeta?.position };

        // Filter prerequisites to only those that are ACTUALLY present in this role's tree.
        // Wait, what if a prerequisite is global but not in this role? 
        // The prompt says "A single shared skill node should be capable of connecting into multiple roles".
        // Usually, if a skill is in a role, its prerequisites for THAT role should also be mapped in the role.
        // Let's assume we check global completion status for prerequisites regardless of if they are in the tree!
        // This is powerful: You might unlock "Advanced Auth" because you learned "Auth" in another tree.

        const prerequisites = skill.prerequisites || [];
        
        // If no prerequisites, it's available
        if (prerequisites.length === 0) {
          return { ...skill, status: "Available" as const, position: roleSkillMeta?.position };
        }

        // Check if all prerequisites are completed globally
        const allPrerequisitesCompleted = prerequisites.every((prereqId) => {
          const prereqSkill = globalSkillsWithState.find((s) => s.id === prereqId);
          return prereqSkill?.status === "Completed";
        });

        if (allPrerequisitesCompleted) {
          return { ...skill, status: "Available" as const, position: roleSkillMeta?.position };
        }

        return { ...skill, status: "Locked" as const, position: roleSkillMeta?.position };
      });
  }, [globalSkillsWithState, roleSkillIds, roleSkillsMap]);

  const initialNodes: Node[] = useMemo(() => {
    return processedSkills.map((skill) => ({
      id: skill.id,
      type: "skill",
      position: skill.position || { x: 0, y: 0 },
      data: skill as unknown as Record<string, unknown>,
    }));
  }, [processedSkills]);

  const initialEdges: Edge[] = useMemo(() => {
    const edges: Edge[] = [];

    // Dynamically generate edges based on prerequisites that are PRESENT in this specific role's tree.
    // We don't want to draw lines to nodes that aren't on the canvas.
    processedSkills.forEach((skill) => {
      const prerequisites = skill.prerequisites || [];
      prerequisites.forEach((prereqId) => {
        if (roleSkillIds.includes(prereqId)) {
          const parent = processedSkills.find((s) => s.id === prereqId);
          const isUnlocked = parent?.status === "Completed";

          edges.push({
            id: `e-${prereqId}-${skill.id}`,
            source: prereqId,
            target: skill.id,
            type: "skillEdge",
            animated: isUnlocked,
            data: { isUnlocked },
          });
        }
      });
    });

    return edges;
  }, [processedSkills, roleSkillIds]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes when user progress changes
  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      const skill = node.data as unknown as Skill;
      onNodeClick(skill);
    },
    [onNodeClick]
  );

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        minZoom={0.2}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
      >
        <FlowBackground color="#ffffff" gap={16} size={1} className="opacity-5" />
        <Controls 
          className="bg-cyber-darker border border-white/10 rounded-lg overflow-hidden fill-cyber-cyan" 
          showInteractive={false}
        />
      </ReactFlow>
    </div>
  );
}
