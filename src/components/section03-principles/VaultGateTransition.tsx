import React from 'react';
import { useStory } from '../../context/StoryContext';

export const VaultGateTransition: React.FC = () => {
  const { unlockVault } = useStory();

  return (
    <div className="py-28 text-center bg-[#0B120E]/90 border-t border-[#1E3024] relative overflow-hidden backdrop-blur-xs">
      <div className="max-w-3xl mx-auto px-4 space-y-8 relative z-10">
        <div className="space-y-4 font-serif text-2xl sm:text-3xl text-[#8FA596] font-light">
          <p className="opacity-70 transition-opacity duration-700">You know who I am.</p>
          <p className="opacity-85 transition-opacity duration-700">You've seen my journey.</p>
          <p className="opacity-100 font-normal text-[#FAF8F2]">You know how Charlie and I think.</p>
        </div>

        <div className="py-4">
          <div className="w-12 h-px bg-[#C5A869] mx-auto" />
        </div>

        <div className="space-y-6">
          <h3 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#FAF8F2]">
            NOW STEP INSIDE <span className="gold-shimmer-text">MY VAULT.</span>
          </h3>

          <p className="text-sm sm:text-base font-sans text-[#8FA596] max-w-md mx-auto leading-relaxed">
            Step past the philosophy and inspect our public equities, operating subsidiaries, and the liquidity fortress we built at Berkshire Hathaway.
          </p>

          <div className="pt-4">
            <button
              onClick={unlockVault}
              className="inline-flex items-center space-x-3 px-9 py-4 rounded-sm bg-[#16291E] text-[#FAF8F2] hover:bg-[#C5A869] hover:text-[#090E0B] border border-[#2E543C] hover:border-[#C5A869] font-mono text-xs sm:text-sm tracking-[0.2em] uppercase font-bold transition-all duration-300 transform hover:scale-105 shadow-xl group cursor-pointer"
            >
              <span className="text-[#C5A869] group-hover:text-[#090E0B] group-hover:rotate-90 transition-transform duration-300">
                ⬡
              </span>
              <span>INSPECT MY HOLDINGS</span>
              <span className="text-[#C5A869] group-hover:text-[#090E0B] group-hover:translate-x-1.5 transition-transform duration-200">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
