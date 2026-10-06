import React from 'react';

interface AncStageProps {
  opacity: number;
}

export const AncStage: React.FC<AncStageProps> = ({ opacity }) => {
  return (
    <section
      className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-20"
      style={{ opacity, visibility: opacity > 0 ? 'visible' : 'hidden' }}
    >
      <div className="absolute left-6 md:left-[54%] bottom-12 md:bottom-[68px] max-w-[390px] text-left z-20 pointer-events-auto">
        <h2 className="text-white text-2xl sm:text-[28px] lg:text-[32px] font-bold tracking-tight mb-3 leading-tight">
          Lose yourself in <span className="text-[#22c55e] [text-shadow:0_0_12px_rgba(34,197,94,0.55)]">silence</span>
        </h2>
        <p className="text-[#d8d8dc] text-xs sm:text-[12.5px] leading-[1.55] font-normal mb-3">
          An inward-facing microphone listens inside your ear for unwanted sound, which is also eliminated with anti-noise.
        </p>
        <p className="text-[#8c8c90] text-xs sm:text-[12px] leading-[1.55] font-normal">
          Noise cancellation is continuously adjusted at 200 times per second for truly immersive sound, so you're fully tuned in to your music, podcasts, and calls.
        </p>
      </div>
    </section>
  );
};
