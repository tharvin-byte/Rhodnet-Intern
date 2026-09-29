import React from 'react';
import { portfolioOverview } from '../../data/portfolioData';
import { useInView } from '../../hooks/useInView';
import { useCountUp } from '../../hooks/useCountUp';

export const PortfolioOverview: React.FC = React.memo(() => {
  const { ref: overviewRef, isInView } = useInView<HTMLDivElement>({ threshold: 0.15 });

  const totalValueCount = useCountUp(portfolioOverview.totalPortfolioValueBillions, {
    enabled: isInView,
    duration: 1500,
    prefix: '$',
    suffix: 'B',
  });

  const holdingsCount = useCountUp(portfolioOverview.majorHoldingsCount, {
    enabled: isInView,
    duration: 1200,
    suffix: ' Holdings',
  });

  const largestWeightCount = useCountUp(portfolioOverview.largestPositionWeight, {
    enabled: isInView,
    duration: 1400,
    decimals: 1,
    suffix: '%',
  });

  const sectorWeightCount = useCountUp(portfolioOverview.topSectorWeight, {
    enabled: isInView,
    duration: 1600,
    decimals: 1,
    suffix: '%',
  });

  return (
    <div ref={overviewRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Title & Reporting Date Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-6 border-b border-[#1E3024] mb-8">
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs tracking-widest text-[#C5A869] uppercase font-bold">
              PORTFOLIO ASSETS
            </span>
            <span className="text-[#3A5242]">•</span>
            <span className="font-mono text-xs text-[#8FA596] tracking-wide uppercase">
              13F SEC DISCLOSURE
            </span>
          </div>
          <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#FAF8F2] mt-1.5">
            Our Public Equity Portfolio
          </h3>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs text-[#8FA596]">
          <span className="text-[#C5A869]">FILING DATE:</span>
          <span className="text-[#FAF8F2]">{portfolioOverview.reportingDate}</span>
        </div>
      </div>

      {/* Bespoke Luxury Stat Tape (Boxless Horizontal Monolith) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-y border-[#1E3024] py-8 gap-y-8 lg:gap-y-0">
        {/* Metric 01: Total Equity Value */}
        <div className="pr-6 sm:border-r border-[#1E3024] space-y-2 group hover-border-glint p-2 -m-2 rounded transition-colors duration-200">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#7A9181]">
              01 / TOTAL CAPITAL
            </span>
            <span className="text-[#C5A869] text-xs opacity-0 group-hover:opacity-100 transition-opacity">✦</span>
          </div>
          <div className="font-serif text-3xl sm:text-4xl font-normal text-[#FAF8F2] tracking-tight group-hover:text-[#C5A869] stat-number-glow transition-all duration-300">
            {totalValueCount}
          </div>
          <p className="text-xs font-sans text-[#8FA596] leading-relaxed">
            Market value across our public SEC-filing equity stakes.
          </p>
        </div>

        {/* Metric 02: Major Holdings Count */}
        <div className="px-0 sm:px-6 lg:border-r border-[#1E3024] space-y-2 group hover-border-glint p-2 -m-2 rounded transition-colors duration-200">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#7A9181]">
              02 / CONCENTRATION
            </span>
            <span className="text-[#C5A869] text-xs opacity-0 group-hover:opacity-100 transition-opacity">✦</span>
          </div>
          <div className="font-serif text-3xl sm:text-4xl font-normal text-[#FAF8F2] tracking-tight group-hover:text-[#C5A869] stat-number-glow transition-all duration-300">
            {holdingsCount}
          </div>
          <p className="text-xs font-sans text-[#8FA596] leading-relaxed">
            Where Charlie and I deliberately concentrated capital.
          </p>
        </div>

        {/* Metric 03: Largest Position */}
        <div className="pr-6 sm:border-r border-[#1E3024] lg:px-6 space-y-2 group hover-border-glint p-2 -m-2 rounded transition-colors duration-200">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#7A9181]">
              03 / ANCHOR STAKE
            </span>
            <span className="text-[#C5A869] text-xs opacity-0 group-hover:opacity-100 transition-opacity">✦</span>
          </div>
          <div className="font-serif text-3xl sm:text-4xl font-normal text-[#C5A869] tracking-tight">
            {portfolioOverview.largestPositionTicker}{' '}
            <span className="font-mono text-lg font-light text-[#FAF8F2] stat-number-glow">
              {largestWeightCount}
            </span>
          </div>
          <p className="text-xs font-sans text-[#8FA596] leading-relaxed">
            Apple Inc. — our crown jewel consumer ecosystem.
          </p>
        </div>

        {/* Metric 04: Top Sector */}
        <div className="px-0 sm:px-6 lg:pl-6 space-y-2 group hover-border-glint p-2 -m-2 rounded transition-colors duration-200">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#7A9181]">
              04 / CORE SECTOR
            </span>
            <span className="text-[#C5A869] text-xs opacity-0 group-hover:opacity-100 transition-opacity">✦</span>
          </div>
          <div className="font-serif text-3xl sm:text-4xl font-normal text-[#FAF8F2] tracking-tight group-hover:text-[#34D399] transition-colors">
            {portfolioOverview.topSector}{' '}
            <span className="font-mono text-lg font-light text-[#8FA596] stat-number-glow">
              {sectorWeightCount}
            </span>
          </div>
          <p className="text-xs font-sans text-[#8FA596] leading-relaxed">
            Financials: AXP, BAC, MCO, and Chubb.
          </p>
        </div>
      </div>
    </div>
  );
});

PortfolioOverview.displayName = 'PortfolioOverview';
