import React from 'react';

interface LifestyleStageProps {
  slideY: number;
  opacity: number;
  onOpenSpecs: () => void;
}

export const LifestyleStage: React.FC<LifestyleStageProps> = ({ slideY, opacity, onOpenSpecs }) => {
  const isInteractive = Math.abs(slideY) < 15;

  return (
    <section
      className="absolute inset-0 z-20 transition-transform duration-300 pointer-events-none"
      style={{
        transform: `translateY(${slideY}%)`,
        opacity,
        visibility: opacity > 0 && Math.abs(slideY) < 95 ? 'visible' : 'hidden'
      }}
    >
      <div className="relative w-full h-full">
        <img
          src="/assets/lifestyle_editorial.png"
          alt="Lifestyle Editorial: Model with Bang & Olufsen Headphones"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

        <div className="absolute bottom-14 sm:bottom-20 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center text-center gap-4 w-full px-6">
          <div className="text-white/80 text-[11px] font-semibold tracking-[0.25em] uppercase">
            ACHIEVE SAVINGS WITHOUT
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={onOpenSpecs}
              style={{ pointerEvents: isInteractive ? 'auto' : 'none' }}
              className="bg-white text-black text-[11.5px] font-bold tracking-[0.12em] uppercase px-7 py-3.5 rounded-[6px] flex items-center gap-2 hover:bg-neutral-200 transition-colors cursor-pointer shadow-lg"
            >
              SHOP NOW
              <svg className="w-3 h-3 stroke-current fill-none stroke-[2.5]" viewBox="0 0 24 24">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </button>
            <button
              onClick={onOpenSpecs}
              style={{ pointerEvents: isInteractive ? 'auto' : 'none' }}
              className="border border-white/40 bg-[#121212]/80 backdrop-blur-md text-white text-[11.5px] font-bold tracking-[0.12em] uppercase px-6 py-3.5 rounded-[6px] hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
            >
              LEARN MORE
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
