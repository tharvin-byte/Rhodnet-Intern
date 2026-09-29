import React from 'react';

export const CompoundingHero: React.FC = React.memo(() => {
  return (
    <div className="pt-20 pb-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      {/* Chapter Tag */}
      <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#121E17] border border-[#253D2E] mb-6 shadow-xs">
        <span className="font-mono text-xs text-[#C5A869] font-bold tracking-widest uppercase">
          CHAPTER 02 / 04
        </span>
        <span className="text-[#3E5C46]">•</span>
        <span className="font-mono text-xs text-[#8FA596] tracking-wide uppercase">
          CAPITAL ACCUMULATION
        </span>
      </div>

      {/* Primary Headline */}
      <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#FAF8F2] leading-[1.08] mb-4">
        HOW I ENDED UP WITH <br />
        <span className="font-normal gold-shimmer-text tracking-normal">
          $340 BILLION
        </span>
      </h2>

      {/* Supporting Subtitle */}
      <p className="font-serif text-xl sm:text-2xl text-[#8FA596] font-light max-w-2xl mx-auto leading-relaxed mb-8">
        It wasn't one lucky bet. It was seventy years of uninterrupted decisions.
      </p>

      {/* Boxless Editorial Disclosure Ribbon with Border Glint */}
      <div className="max-w-2xl mx-auto pt-6 border-t border-[#1E3024] flex items-start space-x-4 text-left hover-border-glint p-3 -mx-3 rounded transition-colors duration-300 hover:bg-[#111C15]/40">
        <span className="text-[#C5A869] text-base select-none shrink-0 mt-0.5 font-mono animate-pulse">◈</span>
        <div className="space-y-1">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[#34D399] font-bold">
            A Personal Note on Berkshire's Liquidity
          </div>
          <p className="text-xs text-[#9EB0A3] leading-relaxed font-sans">
            $340B represents our narrative benchmark. Berkshire reported <strong className="text-[#FAF8F2]">$369B</strong> in total liquid assets at year-end 2025; as of mid-2026, we hold <strong className="text-[#FAF8F2]">$35.1B of pure cash</strong> alongside <strong className="text-[#FAF8F2]">$324.9B in short-term U.S. T-bills</strong>. That is the fortress Charlie and I built.
          </p>
        </div>
      </div>
    </div>
  );
});

CompoundingHero.displayName = 'CompoundingHero';
