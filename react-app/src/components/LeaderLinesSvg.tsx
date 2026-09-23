import React from 'react';

interface LeaderLinesSvgProps {
  line: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    opacity: number;
  } | null;
}

export const LeaderLinesSvg: React.FC<LeaderLinesSvgProps> = ({ line }) => {
  if (!line || line.opacity <= 0.01) return null;

  return (
    <svg
      id="leader-svg"
      className="absolute inset-0 w-full h-full pointer-events-none z-25"
      style={{ opacity: line.opacity }}
    >
      <g>
        <line
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        {/* Beacon hotspot dot */}
        <circle cx={line.x2} cy={line.y2} r="4" fill="#f43f5e" />
        <circle
          cx={line.x2}
          cy={line.y2}
          r="8"
          fill="none"
          stroke="#f43f5e"
          strokeWidth="1.2"
          className="animate-ping origin-center"
        />
      </g>
    </svg>
  );
};
