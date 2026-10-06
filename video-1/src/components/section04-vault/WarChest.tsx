import React from 'react';
import { liquidityMetrics } from '../../data/portfolioData';
import { useInView } from '../../hooks/useInView';

const OPERATING_ENGINES = [
  { name: 'GEICO', role: 'Negative-Cost Insurance Float' },
  { name: 'BNSF Railway', role: 'Circulatory Freight Transport' },
  { name: 'Berkshire Energy', role: '12M+ Utility Customers' },
  { name: 'See’s Candies', role: '8,000%+ Return on Capital' },
  { name: 'Precision Castparts', role: 'Aerospace Engineering' },
] as const;

export const WarChest: React.FC = React.memo(() => {
  const { ref: reservoirRef, isInView } = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <div className="max-w-6xl mx-auto py-6">
      {/* Centered Sovereign Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#121E17] border border-[#233B2B] shadow-xs">
          <span className="font-mono text-xs text-[#C5A869] font-bold tracking-widest uppercase">
            VAULT DEPOSITORY
          </span>
          <span className="text-[#3E5C46]">•</span>
          <span className="font-mono text-xs text-[#8FA596] tracking-wide uppercase">
            SOVEREIGN BALANCE SHEET
          </span>
        </div>

        <h4 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#FAF8F2]">
          THE <span className="gold-shimmer-text font-normal">~$360 BILLION</span> CASH RESERVES
        </h4>

        <p className="font-serif text-base sm:text-lg text-[#8FA596] italic font-light leading-relaxed max-w-2xl mx-auto">
          “Charlie and I promised our shareholders we would never rely on the kindness of strangers. Cash combined with courage in a crisis is priceless.”
        </p>
      </div>

      {/* Boxless Monolith Visualizer: Proportional Liquidity Reservoir with Animated Fill */}
      <div ref={reservoirRef} className="max-w-4xl mx-auto space-y-8 py-6 border-y border-[#1E3024]">
        {/* Proportional Dual-Chamber Gauge Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#FAF8F2] flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C5A869] shadow-[0_0_8px_#C5A869]" />
              <span className="font-bold">SHORT-TERM U.S. T-BILLS (90.3%)</span>
            </span>
            <span className="text-[#34D399] flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#34D399] shadow-[0_0_8px_#34D399]" />
              <span className="font-bold">PURE CASH &amp; EQUIVALENTS (9.7%)</span>
            </span>
          </div>

          <div className="h-4 sm:h-5 w-full bg-[#132219] rounded-full overflow-hidden p-0.5 flex border border-[#233B2B] shadow-inner relative">
            {/* T-Bills segment */}
            <div
              className="h-full bg-gradient-to-r from-[#1C3D2F] via-[#94783E] to-[#C5A869] rounded-l-full transition-all duration-1000 ease-out"
              style={{ width: isInView ? '90.3%' : '0%' }}
              title="Short-Term U.S. Treasuries: $324.9B"
            />
            {/* Pulsating Chamber Divider */}
            <div className="w-1 h-full bg-[#FAF8F2] opacity-75 shadow-[0_0_8px_#FAF8F2] animate-pulse" />
            {/* Pure Cash segment */}
            <div
              className="h-full bg-gradient-to-r from-[#205238] to-[#34D399] rounded-r-full transition-all duration-1000 ease-out delay-200"
              style={{ width: isInView ? '9.7%' : '0%' }}
              title="Cash & Cash Equivalents: $35.1B"
            />
          </div>
        </div>

        {/* Dual Flanking Breakdown Columns (Borderless with Vertical Hairline) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:divide-x md:divide-[#1E3024] pt-2">
          {/* Treasury Bills Chamber */}
          <div className="space-y-2 group">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#C5A869] font-bold">
              TREASURY BILL RESERVOIR
            </div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF8F2] group-hover:text-[#C5A869] transition-colors">
              ${liquidityMetrics.shortTermTreasuryBillsBillions}B
            </div>
            <p className="text-xs sm:text-sm font-sans text-[#8FA596] leading-relaxed">
              Parked safely in short-duration paper. It earns billions in risk-free interest each year while patiently awaiting market dislocations.
            </p>
          </div>

          {/* Pure Cash Equivalents Chamber */}
          <div className="space-y-2 md:pl-8 group">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#34D399] font-bold">
              INSTANT DEPLOYMENT FIREPOWER
            </div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#34D399]">
              ${liquidityMetrics.cashAndEquivalentsBillions}B
            </div>
            <p className="text-xs sm:text-sm font-sans text-[#8FA596] leading-relaxed">
              Immediate, unencumbered dry powder. Always ready to fund mega-scale deals without hesitation when panic hits Wall Street.
            </p>
          </div>
        </div>
      </div>

      {/* Operating Engine Constellation (Continuous Ribbon, No Boxes) */}
      <div className="max-w-4xl mx-auto pt-10 space-y-4">
        <div className="text-center font-mono text-[11px] uppercase tracking-widest text-[#7A9181]">
          Wholly-Owned Operating Engines Financing This Liquidity
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 pt-2">
          {OPERATING_ENGINES.map((op) => (
            <div key={op.name} className="flex items-center space-x-2 group cursor-default">
              <span className="font-serif text-sm font-semibold text-[#FAF8F2] group-hover:text-[#C5A869] transition-colors">
                {op.name}
              </span>
              <span className="text-[#3A5242]">•</span>
              <span className="font-mono text-[11px] text-[#8FA596] group-hover:text-[#34D399] transition-colors">
                {op.role}
              </span>
            </div>
          ))}
        </div>

        {/* Baseline Source Note */}
        <div className="text-center pt-6">
          <span className="font-mono text-[11px] text-[#637A6A]">
            Source: Berkshire Hathaway Form 10-K &amp; Mid-2026 Quarterly Financial Filings.
          </span>
        </div>
      </div>
    </div>
  );
});

WarChest.displayName = 'WarChest';
