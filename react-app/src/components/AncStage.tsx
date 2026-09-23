import React from 'react';

interface AncStageProps {
  opacity: number;
}

export const AncStage: React.FC<AncStageProps> = ({ opacity }) => {
  return (
    <section
      className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-20 flex items-center justify-center p-6"
      style={{ opacity, visibility: opacity > 0 ? 'visible' : 'hidden' }}
    >
      <div className="max-w-[480px] bg-black/60 backdrop-blur-md border border-white/10 p-7 sm:p-9 rounded-2xl text-left shadow-2xl">
        <h2 className="text-white text-2xl sm:text-3xl font-bold tracking-tight mb-4">
          Lose yourself in <span className="text-[#22c55e]">silence</span>
        </h2>
        <p className="text-[#d8d8dc] text-sm sm:text-base font-normal leading-relaxed mb-3">
          An inward-facing microphone listens inside your ear for unwanted sound, which is also eliminated with anti-noise.
        </p>
        <p className="text-[#8c8c90] text-xs sm:text-sm font-normal leading-relaxed">
          Noise cancellation is continuously adjusted at 200 times per second for truly immersive sound, so you're fully tuned in to your music, podcasts, and calls.
        </p>
      </div>
    </section>
  );
};
