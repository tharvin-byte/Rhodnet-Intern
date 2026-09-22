import React from 'react';
import { portfolioOverview } from '../../data/portfolioData';

export const PortfolioOverview: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title & Reporting Date Tag */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#2B3037] pb-4 mb-8">
        <div>
          <span className="font-mono text-xs tracking-widest text-[#B39255] uppercase font-semibold">
            EQUITY SECURITIES
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#EDEDE9] mt-0.5">
            Our Public Equity Portfolio
          </h3>
        </div>
        <div className="font-mono text-xs text-[#9CA3AF] bg-[#16191D] px-3 py-1.5 rounded border border-[#2B3037]">
          <span className="text-[#B39255] mr-1">AS OF:</span>
          <span>{portfolioOverview.reportingDate}</span>
        </div>
      </div>

      {/* Primary KPI Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-5 rounded bg-[#16191D]/90 backdrop-blur-xs border border-[#2B3037] hover:border-[#B39255]/50 transition-all card-hover-lift space-y-1">
          <div className="font-mono text-xs uppercase tracking-wider text-[#9CA3AF]">
            Total Equity Value
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#EDEDE9]">
            ${portfolioOverview.totalPortfolioValueBillions}B
          </div>
          <div className="text-[11px] font-sans text-[#6B7280]">
            Market value across our public 13F stakes
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded bg-[#16191D]/90 backdrop-blur-xs border border-[#2B3037] hover:border-[#B39255]/50 transition-all card-hover-lift space-y-1">
          <div className="font-mono text-xs uppercase tracking-wider text-[#9CA3AF]">
            Major Holdings
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#EDEDE9]">
            {portfolioOverview.majorHoldingsCount}
          </div>
          <div className="text-[11px] font-sans text-[#6B7280]">
            Where Charlie and I concentrated our capital
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded bg-[#16191D]/90 backdrop-blur-xs border border-[#2B3037] hover:border-[#B39255]/50 transition-all card-hover-lift space-y-1">
          <div className="font-mono text-xs uppercase tracking-wider text-[#9CA3AF]">
            Largest Position
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#B39255]">
            {portfolioOverview.largestPositionTicker}{' '}
            <span className="text-sm font-mono font-normal text-[#EDEDE9]">
              ({portfolioOverview.largestPositionWeight}%)
            </span>
          </div>
          <div className="text-[11px] font-sans text-[#6B7280]">
            Apple Inc. (Our crown jewel consumer ecosystem)
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded bg-[#16191D]/90 backdrop-blur-xs border border-[#2B3037] hover:border-[#B39255]/50 transition-all card-hover-lift space-y-1">
          <div className="font-mono text-xs uppercase tracking-wider text-[#9CA3AF]">
            Top Sector
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#EDEDE9]">
            {portfolioOverview.topSector}{' '}
            <span className="text-sm font-mono font-normal text-[#9CA3AF]">
              ({portfolioOverview.topSectorWeight}%)
            </span>
          </div>
          <div className="text-[11px] font-sans text-[#6B7280]">
            Financials (AXP, BAC, MCO, CB)
          </div>
        </div>
      </div>
    </div>
  );
};
