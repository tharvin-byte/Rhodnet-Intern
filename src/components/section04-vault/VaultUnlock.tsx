import React, { useState, useEffect } from 'react';
import { useStory } from '../../context/StoryContext';

export const VaultUnlock: React.FC = () => {
  const { vaultUnlocked } = useStory();
  const [accessStep, setAccessStep] = useState<number>(0);

  useEffect(() => {
    if (vaultUnlocked) {
      setAccessStep(1);
      const timer1 = setTimeout(() => setAccessStep(2), 600);
      const timer2 = setTimeout(() => setAccessStep(3), 1200);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [vaultUnlocked]);

  return (
    <div className="pt-20 pb-12 text-center text-[#EDEDE9]">
      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#181B20] border border-[#2B3037] mb-6">
        <span className="font-mono text-xs text-[#B39255] font-bold tracking-widest uppercase">
          CHAPTER 04 / 04
        </span>
        <span className="text-[#4A505A]">•</span>
        <span className="font-mono text-xs text-[#9CA3AF] tracking-wide uppercase">
          THE PORTFOLIO REVEAL
        </span>
      </div>

      <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#FAF8F2] leading-tight mb-4">
        INSIDE <span className="italic font-normal gold-shimmer-text">THE VAULT</span>
      </h2>

      <p className="font-serif text-xl sm:text-2xl text-[#8FA596] font-light max-w-xl mx-auto leading-relaxed mb-8">
        The businesses Charlie and I have gathered over a lifetime.
      </p>

      {/* Elegant Terminal Unlock Sequence */}
      <div className="max-w-md mx-auto p-4 rounded bg-[#101913]/90 border border-[#223527] text-left font-mono text-xs space-y-2.5 shadow-xl">
        <div className="flex items-center justify-between text-[#6B7280] pb-2 border-b border-[#1A281E]">
          <span className="text-[10px] uppercase tracking-widest text-[#8FA596]">SEC FILINGS DEPOSITORY ARCHIVE</span>
          <span className="text-[#C5A869]">BERKSHIRE HATHAWAY INC.</span>
        </div>

        <div className="space-y-1.5 text-xs">
          <div className="flex items-center space-x-2 text-[#9EB0A3]">
            <span className="text-[#C5A869]">›</span>
            <span>OPENING MY PERSONAL ARCHIVE &amp; 13F HOLDINGS...</span>
            <span className="terminal-cursor" />
          </div>

          <div className="w-full bg-[#18281E] h-2 rounded overflow-hidden border border-[#233B2B]">
            <div
              className="h-full bg-gradient-to-r from-[#1C3D2F] via-[#34D399] to-[#C5A869] transition-all duration-700 ease-out"
              style={{ width: accessStep >= 2 ? '100%' : accessStep === 1 ? '55%' : '15%' }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] pt-1">
            <span className="text-[#8FA596]">INTEGRITY CHECK: VERIFIED</span>
            <span className={accessStep >= 3 ? 'text-[#34D399] font-bold' : 'text-[#C5A869]'}>
              {accessStep >= 3 ? '● ACCESS GRANTED' : 'DECRYPTING 13F ASSETS...'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
