import React, { useState } from 'react';
import { portfolioHoldings } from '../../data/portfolioData';
import type { PortfolioHolding } from '../../types/portfolio';

export const HoldingsGrid: React.FC = () => {
  const [selectedHolding, setSelectedHolding] = useState<PortfolioHolding | null>(null);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-8 border-b border-[#2B3037] pb-4">
        <div>
          <span className="font-mono text-xs text-[#B39255] tracking-widest uppercase font-semibold">
            DETAILED ARCHIVE
          </span>
          <h4 className="font-serif text-2xl sm:text-3xl font-light text-[#EDEDE9] mt-0.5">
            Our Major Common Stock Holdings
          </h4>
        </div>
        <div className="text-xs font-mono text-[#9CA3AF]">
          Click any card to read my personal investment thesis
        </div>
      </div>

      {/* Grid of Company Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {portfolioHoldings.map((h) => {
          const isSelected = selectedHolding?.id === h.id;
          const isGain = h.gainPercentage >= 0;

          return (
            <div
              key={h.id}
              onClick={() => setSelectedHolding(isSelected ? null : h)}
              className={`p-6 rounded bg-[#16191D]/90 backdrop-blur-xs border transition-all duration-200 cursor-pointer flex flex-col justify-between card-hover-lift ${
                isSelected
                  ? 'border-[#B39255] bg-[#1A1E24] shadow-md ring-1 ring-[#B39255]/40'
                  : 'border-[#2B3037] hover:border-[#B39255]/50'
              }`}
            >
              {/* Card Header */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="font-mono text-xs text-[#B39255] font-bold tracking-wider">
                      {h.ticker}
                    </span>
                    <h5 className="font-serif text-xl font-semibold text-[#EDEDE9] mt-0.5">
                      {h.name}
                    </h5>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#20252D] text-[#9CA3AF] border border-[#2D333D]">
                    {h.sector}
                  </span>
                </div>

                {/* Metrics Table */}
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 py-4 my-2 border-y border-[#23272E] text-xs font-mono">
                  <div>
                    <div className="text-[10px] text-[#9CA3AF] uppercase">Market Value</div>
                    <div className="text-sm font-bold text-[#EDEDE9] mt-0.5">
                      ${h.marketValueBillions}B
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] text-[#9CA3AF] uppercase">Cost Basis</div>
                    <div className="text-sm font-bold text-[#9CA3AF] mt-0.5">
                      ${h.costBasisBillions}B
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] text-[#9CA3AF] uppercase">Portfolio Weight</div>
                    <div className="text-sm font-bold text-[#B39255] mt-0.5">
                      {h.portfolioWeight}%
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] text-[#9CA3AF] uppercase">Our Ownership Stake</div>
                    <div className="text-sm font-bold text-[#EDEDE9] mt-0.5">
                      {h.berkshireOwnershipPercentage}%
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] text-[#9CA3AF] uppercase">Held Since</div>
                    <div className="text-sm font-bold text-[#9CA3AF] mt-0.5">
                      {h.sinceYear}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] text-[#9CA3AF] uppercase">Annual Dividends</div>
                    <div className="text-sm font-bold text-emerald-400 mt-0.5">
                      ${h.annualDividendMillions}M
                    </div>
                  </div>
                </div>
              </div>

              {/* Unrealized Gain Badge & Thesis Preview */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-[#9CA3AF]">Unrealized Return:</span>
                  <span
                    className={`font-bold ${
                      isGain ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    {isGain ? `+${h.gainPercentage.toFixed(1)}%` : `${h.gainPercentage.toFixed(1)}%`}
                  </span>
                </div>

                {/* Expanded Thesis Detail */}
                <div
                  className={`text-xs text-[#9CA3AF] font-sans leading-relaxed pt-2 border-t border-[#23272E] ${
                    isSelected ? 'block' : 'line-clamp-2'
                  }`}
                >
                  <strong className="font-mono text-[10px] text-[#EDEDE9] block mb-1 uppercase tracking-wider">
                    My Thesis For Owning This Business:
                  </strong>
                  {h.thesisSummary}
                </div>

                <div className="mt-2 text-right">
                  <span className="text-[10px] font-mono text-[#B39255] hover:underline">
                    {isSelected ? 'Less ▲' : 'View Thesis ▼'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
