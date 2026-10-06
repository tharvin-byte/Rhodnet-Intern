import React from 'react';
import { useStory } from '../../hooks/useStory';

export const VaultGateTransition: React.FC = React.memo(() => {
  const { unlockVault } = useStory();

  return (
    <div className="py-12 text-center bg-[#0B120E]/90 border-t border-[#1E3024] relative overflow-hidden backdrop-blur-xs">
      <div className="max-w-2xl mx-auto px-4 space-y-5 relative z-10">
        <h3 className="font-serif text-2xl sm:text-4xl font-normal tracking-tight text-[#FAF8F2]">
          NOW STEP INSIDE <span className="gold-shimmer-text">THE VAULT</span>
        </h3>

        <p className="text-xs sm:text-sm font-sans text-[#8FA596] max-w-md mx-auto leading-relaxed">
          Inspect our core public equity holdings, wholly-owned operating titans, and the $360B cash war chest.
        </p>

        <div>
          <button
            onClick={unlockVault}
            className="inline-flex items-center space-x-3 px-8 py-3.5 rounded-sm bg-[#16291E] text-[#FAF8F2] hover:bg-[#C5A869] hover:text-[#090E0B] border border-[#2E543C] hover:border-[#C5A869] font-mono text-xs tracking-[0.2em] uppercase font-bold transition-all duration-300 transform hover:scale-105 shadow-xl group cursor-pointer hover-border-glint active:scale-95"
          >
            <span className="text-[#C5A869] group-hover:text-[#090E0B] group-hover:rotate-[360deg] transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] inline-block">
              ⬡
            </span>
            <span>UNLOCK THE PORTFOLIO</span>
            <span className="text-[#C5A869] group-hover:text-[#090E0B] group-hover:translate-x-2 transition-transform duration-300 ease-out">
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
});

VaultGateTransition.displayName = 'VaultGateTransition';
