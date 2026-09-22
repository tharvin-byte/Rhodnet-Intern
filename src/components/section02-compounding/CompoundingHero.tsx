import React from 'react';

export const CompoundingHero: React.FC = () => {
  return (
    <div className="pt-24 pb-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
      <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#FAF8F2] leading-[1.08] mb-6">
        HOW I ENDED UP WITH <br />
        <span className="font-normal gold-shimmer-text tracking-normal">
          $340 BILLION
        </span>
      </h2>

      {/* Supporting Subtitle */}
      <p className="font-serif text-xl sm:text-2xl text-[#8FA596] font-light max-w-2xl mx-auto leading-relaxed mb-8">
        It wasn't one lucky bet. It was seventy years of uninterrupted decisions.
      </p>

      {/* Disclosure Badge on Corporate Metrics vs Personal Cash */}
      <div className="max-w-2xl mx-auto p-5 rounded bg-[#101A14]/90 border border-[#203527] text-left shadow-lg">
        <div className="flex items-start space-x-3.5">
          <span className="text-[#C5A869] text-lg leading-none mt-0.5">ℹ</span>
          <div className="space-y-1.5">
            <div className="font-mono text-[11px] uppercase tracking-wider text-[#34D399] font-bold">
              A Personal Note On Berkshire's Fortress
            </div>
            <p className="text-xs text-[#9EB0A3] leading-relaxed font-sans">
              $340B represents a narrative benchmark of our compounded scale. In our official SEC filings, Berkshire Hathaway reported <strong className="text-[#FAF8F2] font-semibold">$369 Billion</strong> in cash, equivalents, and short-term Treasuries at year-end 2025; as of mid-2026, our Insurance and Other segment holds <strong className="text-[#FAF8F2] font-semibold">$35.1B of pure cash</strong> alongside <strong className="text-[#FAF8F2] font-semibold">$324.9B of short-term U.S. T-bills</strong>. That is the fortress Charlie and I built.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
