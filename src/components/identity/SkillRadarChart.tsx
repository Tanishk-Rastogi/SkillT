import React from 'react';

interface RadarData {
  axis: string;
  value: number; // 0 to 100
}

interface SkillRadarChartProps {
  data: RadarData[];
  size?: number;
}

export const SkillRadarChart: React.FC<SkillRadarChartProps> = ({ data, size = 300 }) => {
  const numAxes = data.length;
  if (numAxes < 3) return null;

  const center = size / 2;
  const radius = (size / 2) * 0.7; // Leave room for labels
  const angleStep = (Math.PI * 2) / numAxes;

  // Helper to get coordinates
  const getPoint = (value: number, index: number, maxVal = 100) => {
    const r = (value / maxVal) * radius;
    const angle = index * angleStep - Math.PI / 2; // Start at top
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // Build grid polygons (100%, 75%, 50%, 25%)
  const gridLevels = [100, 75, 50, 25];
  const gridPolygons = gridLevels.map(level => {
    const points = Array.from({ length: numAxes }).map((_, i) => {
      const p = getPoint(level, i);
      return `${p.x},${p.y}`;
    }).join(' ');
    return points;
  });

  // Build data polygon
  const dataPoints = data.map((d, i) => {
    const p = getPoint(d.value, i);
    return `${p.x},${p.y}`;
  }).join(' ');

  return (
    <div className="relative flex justify-center items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="overflow-visible">
        {/* Grids */}
        {gridPolygons.map((points, i) => (
          <polygon
            key={i}
            points={points}
            fill="none"
            stroke="currentColor"
            className="text-slate-800"
            strokeWidth="1"
          />
        ))}

        {/* Axes */}
        {Array.from({ length: numAxes }).map((_, i) => {
          const p = getPoint(100, i);
          return (
            <line
              key={`axis-${i}`}
              x1={center}
              y1={center}
              x2={p.x}
              y2={p.y}
              stroke="currentColor"
              className="text-slate-700"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          );
        })}

        {/* Data Polygon */}
        <polygon
          points={dataPoints}
          fill="rgba(34, 211, 238, 0.2)" /* cyan-400 with opacity */
          stroke="#22d3ee" /* cyan-400 */
          strokeWidth="2"
          className="transition-all duration-700"
        />

        {/* Data Points */}
        {data.map((d, i) => {
          const p = getPoint(d.value, i);
          return (
            <circle
              key={`point-${i}`}
              cx={p.x}
              cy={p.y}
              r="4"
              fill="#22d3ee"
            />
          );
        })}

        {/* Labels */}
        {data.map((d, i) => {
          // Push labels slightly outside the max radius
          const p = getPoint(120, i); 
          return (
            <text
              key={`label-${i}`}
              x={p.x}
              y={p.y}
              fill="currentColor"
              className="text-[10px] font-mono font-semibold text-slate-400"
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              {d.axis}
            </text>
          );
        })}
      </svg>
    </div>
  );
};
