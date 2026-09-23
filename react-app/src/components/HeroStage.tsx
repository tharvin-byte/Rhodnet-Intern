import React from 'react';

interface HeroStageProps {
  opacity: number;
  onOpenSpecs: () => void;
}

export const HeroStage: React.FC<HeroStageProps> = ({ opacity, onOpenSpecs }) => {
  return (
    <div
      className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-20"
      style={{ opacity, visibility: opacity > 0 ? 'visible' : 'hidden' }}
    >
      {/* Typography Layer */}
      <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center justify-center pointer-events-none">
        <h1 className="text-[clamp(85px,11.5vw,160px)] font-extrabold leading-[0.86] tracking-[-0.015em] bg-gradient-to-br from-[#cde6f8] via-[#f2d4ed] to-[#dbf4e7] bg-clip-text text-transparent mb-3">
          Pure
        </h1>
        <p className="text-[clamp(10.5px,1.1vw,14.5px)] font-semibold tracking-[0.52em] uppercase text-white mb-2 pl-[0.52em]">
          SUPERIOR SOUND
        </p>
        <span
          className="text-[clamp(65px,9.6vw,134px)] font-normal leading-[0.88] tracking-[-0.015em] text-transparent"
          style={{ WebkitTextStroke: '1.4px rgba(255, 255, 255, 0.48)' }}
        >
          expression
        </span>
      </div>

      {/* Bottom Actions */}
      <div className="absolute bottom-6 sm:bottom-10 left-5 sm:left-11 z-20 pointer-events-auto">
        <button
          onClick={onOpenSpecs}
          className="bg-white text-black text-[11.5px] font-bold tracking-[0.12em] uppercase px-6 sm:px-7 py-3 sm:py-3.5 rounded-[6px] flex items-center gap-2 hover:bg-neutral-200 transition-colors"
        >
          SHOP NOW
          <svg className="w-3 h-3 stroke-current fill-none stroke-[2.5]" viewBox="0 0 24 24">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </button>
      </div>

      <div className="hidden sm:block absolute bottom-10 right-6 sm:right-11 max-w-[250px] text-left z-20 pointer-events-none">
        <h3 className="text-white text-sm font-bold tracking-wide mb-1">Beoplay H4 2nd Gen</h3>
        <p className="text-[#8c8c90] text-xs font-normal leading-relaxed">
          Buy a pair of headphones and get a free Raf Simons x Kvadrat headphone bag (while stock lasts).
        </p>
      </div>
    </div>
  );
};
