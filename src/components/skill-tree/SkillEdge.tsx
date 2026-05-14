"use client";

import { BaseEdge, EdgeProps, getBezierPath, Edge } from "@xyflow/react";

export function SkillEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}: EdgeProps<Edge<{ isUnlocked: boolean }>>) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const isUnlocked = data?.isUnlocked;

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: isUnlocked ? 3 : 1,
          stroke: isUnlocked ? "var(--color-cyber-cyan)" : "rgba(255, 255, 255, 0.1)",
          filter: isUnlocked ? "drop-shadow(0 0 5px var(--color-cyber-cyan))" : "none",
          transition: "all 0.5s ease",
        }}
        className={isUnlocked ? "animate-pulse" : ""}
      />
    </>
  );
}
