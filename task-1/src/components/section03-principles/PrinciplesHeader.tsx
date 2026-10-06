import React from 'react';

export const PrinciplesHeader: React.FC = React.memo(() => {
  return (
    <div className="pt-16 pb-8 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#121E17] border border-[#253D2E] mb-5 shadow-xs">
        <span className="font-mono text-xs text-[#C5A869] font-bold tracking-widest uppercase">
          CHAPTER 03 / 04
        </span>
        <span className="text-[#3E5C46]">•</span>
        <span className="font-mono text-xs text-[#8FA596] tracking-wide uppercase">
          THE INTELLECTUAL FRAMEWORK
        </span>
      </div>

      <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#FAF8F2] tracking-tight leading-tight mb-3">
        BEFORE YOU OPEN <br className="hidden sm:inline" />
        <span className="font-normal italic gold-shimmer-text">THE FORTUNE</span>
      </h2>

      <p className="font-serif text-xl sm:text-2xl text-[#8FA596] font-light max-w-xl mx-auto leading-relaxed">
        You need to understand how I think.
      </p>

      <div className="w-16 h-px bg-[#C5A869] mx-auto mt-5 mb-6" />

      <p className="text-sm sm:text-base text-[#9EB0A3] max-w-2xl mx-auto font-sans leading-relaxed">
        I have never used computer algorithms or macroeconomic forecasts to pick a stock. Charlie and I filtered every prospective dollar of capital through four non-negotiable mental models.
      </p>
    </div>
  );
});

PrinciplesHeader.displayName = 'PrinciplesHeader';
