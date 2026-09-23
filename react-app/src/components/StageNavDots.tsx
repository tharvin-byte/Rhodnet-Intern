import React from 'react';

interface StageNavDotsProps {
  stageIndex: number;
  onSelectStage: (progress: number) => void;
}

const STAGE_PROGRESS_MAP = [0.0, 0.20, 0.35, 0.50, 0.66, 0.80];

export const StageNavDots: React.FC<StageNavDotsProps> = ({ stageIndex, onSelectStage }) => {
  return (
    <nav
      className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30 pointer-events-auto"
      aria-label="Product Sections Navigation"
    >
      {STAGE_PROGRESS_MAP.map((p, idx) => {
        const isActive = stageIndex === idx;
        return (
          <button
            key={idx}
            onClick={() => onSelectStage(p)}
            className={`w-1.5 rounded-full transition-all duration-300 border-0 p-0 cursor-pointer ${
              isActive ? 'h-6 bg-white' : 'h-1.5 bg-white/30 hover:bg-white/60'
            }`}
            title={`Stage ${idx + 1}`}
          />
        );
      })}
    </nav>
  );
};
