import React, { useState, useMemo, useCallback } from 'react';
import { portfolioHoldings } from '../../data/portfolioData';
import type { PortfolioHolding } from '../../types/portfolio';
import { useInView } from '../../hooks/useInView';

export const HoldingsGrid: React.FC = React.memo(() => {
  const [selectedHoldingId, setSelectedHoldingId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);
  const { ref: gridRef, isInView: gridInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  // Top 5 conviction anchors represent >58% of public equity capital
  const displayedHoldings = useMemo(
    () => (showAll ? portfolioHoldings : portfolioHoldings.slice(0, 5)),
    [showAll]
  );

  const toggleThesis = useCallback((id: string) => {
    setSelectedHoldingId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div ref={gridRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Section Header & Mode Toggle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#1E3024] mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs text-[#C5A869] tracking-widest uppercase font-bold">
              CONVICTION ASSETS
            </span>
            <span className="text-[#3A5242]">•</span>
            <span className="font-mono text-xs text-[#8FA596] tracking-wide uppercase">
              HIGH CONCENTRATION DISCIPLINE
            </span>
          </div>
          <h4 className="font-serif text-3xl sm:text-4xl font-light text-[#FAF8F2] mt-1.5">
            The High-Conviction Equity Ledger
          </h4>
          <p className="text-xs sm:text-sm font-sans text-[#8FA596] mt-1">
            Over 58% of Berkshire's public stock portfolio is concentrated in just five companies.
          </p>
        </div>

        {/* View Toggle Pill */}
        <div className="flex items-center space-x-1 p-1 rounded-full bg-[#111C15] border border-[#233B2B] shrink-0 self-start md:self-end shadow-md">
          <button
            onClick={() => setShowAll(false)}
            className={`px-4 py-1.5 rounded-full font-mono text-xs transition-all duration-300 cursor-pointer ${
              !showAll
                ? 'bg-[#1C3D2F] border border-[#34D399]/40 text-[#FAF8F2] font-semibold shadow-xs scale-105'
                : 'text-[#8FA596] hover:text-[#FAF8F2]'
            }`}
          >
            Top 5 Anchors
          </button>
          <button
            onClick={() => setShowAll(true)}
            className={`px-4 py-1.5 rounded-full font-mono text-xs transition-all duration-300 cursor-pointer ${
              showAll
                ? 'bg-[#1C3D2F] border border-[#34D399]/40 text-[#FAF8F2] font-semibold shadow-xs scale-105'
                : 'text-[#8FA596] hover:text-[#FAF8F2]'
            }`}
          >
            All 10 Holdings
          </button>
        </div>
      </div>

      {/* Boxless Table/Ledger Spread */}
      <div className="w-full">
        {/* Ledger Column Headers (Desktop) */}
        <div className="hidden lg:grid grid-cols-12 gap-4 pb-3 border-b border-[#1E3024] font-mono text-[11px] text-[#7A9181] uppercase tracking-wider">
          <div className="col-span-1">Rank</div>
          <div className="col-span-4">Company &amp; Sector</div>
          <div className="col-span-2 text-right">Market Value</div>
          <div className="col-span-2 text-right">Weight</div>
          <div className="col-span-1 text-right">Dividends</div>
          <div className="col-span-1 text-right">Return</div>
          <div className="col-span-1 text-right">Thesis</div>
        </div>

        {/* Ledger Rows */}
        <div className="divide-y divide-[#1A2C21]">
          {displayedHoldings.map((h: PortfolioHolding, idx: number) => {
            const isSelected = selectedHoldingId === h.id;
            const isGain = h.gainPercentage >= 0;

            return (
              <div key={h.id} className="transition-colors">
                {/* Main Interactive Row with Magnetic Hover Displacement */}
                <div
                  onClick={() => toggleThesis(h.id)}
                  className={`py-4 px-2 sm:px-3 -mx-2 sm:-mx-3 rounded-sm transition-all duration-200 cursor-pointer flex flex-col lg:grid lg:grid-cols-12 gap-2 lg:gap-4 items-start lg:items-center hover:translate-x-1.5 hover:shadow-[inset_3px_0_0_#34D399] ${
                    isSelected
                      ? 'bg-[#132219]/90 shadow-[inset_3px_0_0_#C5A869]'
                      : 'hover:bg-[#111C15]/70'
                  }`}
                  style={{
                    animationDelay: `${idx * 40}ms`,
                  }}
                >
                  {/* Rank + Company & Sector */}
                  <div className="col-span-5 flex items-center space-x-3 w-full lg:w-auto justify-between lg:justify-start">
                    <div className="flex items-center space-x-3">
                      <span className="font-serif text-lg sm:text-xl font-light text-[#C5A869] w-7 select-none">
                        {h.rank < 10 ? `0${h.rank}` : h.rank}
                      </span>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-serif text-base sm:text-lg font-normal text-[#FAF8F2] group-hover:text-[#C5A869] transition-colors">
                            {h.name}
                          </span>
                          <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-[#18281E] border border-[#2A4433] text-[#C5A869] font-bold">
                            {h.ticker}
                          </span>
                        </div>
                        <div className="text-[11px] font-mono text-[#8FA596] mt-0.5 flex items-center space-x-2">
                          <span>{h.sector}</span>
                          <span>•</span>
                          <span>Held since {h.sinceYear}</span>
                          <span>•</span>
                          <span className="text-[#34D399]">{h.berkshireOwnershipPercentage}% owned</span>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Only: Value and Return Badge */}
                    <div className="lg:hidden text-right">
                      <div className="font-serif font-bold text-base text-[#FAF8F2]">
                        ${h.marketValueBillions}B
                      </div>
                      <div className={`font-mono text-xs ${isGain ? 'text-[#34D399]' : 'text-red-400'}`}>
                        +{h.gainPercentage.toFixed(0)}%
                      </div>
                    </div>
                  </div>

                  {/* Desktop Columns */}
                  {/* Market Value */}
                  <div className="hidden lg:block col-span-2 text-right">
                    <div className="font-serif text-lg font-bold text-[#FAF8F2]">
                      ${h.marketValueBillions}B
                    </div>
                    <div className="font-mono text-[10px] text-[#8FA596]">
                      {h.shares} shs
                    </div>
                  </div>

                  {/* Portfolio Weight & Inline Progress Conduit with Animated Fill */}
                  <div className="hidden lg:block col-span-2 text-right">
                    <div className="font-mono text-base font-bold text-[#C5A869]">
                      {h.portfolioWeight}%
                    </div>
                    <div className="w-24 ml-auto h-1.5 bg-[#17271E] rounded-full overflow-hidden mt-1 border border-[#233B2B]">
                      <div
                        style={{
                          width: gridInView ? `${Math.min(100, h.portfolioWeight * 4.2)}%` : '0%',
                        }}
                        className="h-full bg-gradient-to-r from-[#1C3D2F] via-[#34D399] to-[#C5A869] transition-all duration-700 ease-out"
                      />
                    </div>
                  </div>

                  {/* Annual Dividend Flow */}
                  <div className="hidden lg:block col-span-1 text-right">
                    <div className="font-mono text-sm font-bold text-[#34D399]">
                      ${h.annualDividendMillions}M
                    </div>
                    <div className="font-mono text-[10px] text-[#8FA596]">
                      / year
                    </div>
                  </div>

                  {/* Unrealized Gain */}
                  <div className="hidden lg:block col-span-1 text-right">
                    <div
                      className={`font-mono text-sm font-bold ${
                        isGain ? 'text-[#34D399]' : 'text-red-400'
                      }`}
                    >
                      {isGain ? `+${h.gainPercentage.toFixed(0)}%` : `${h.gainPercentage.toFixed(0)}%`}
                    </div>
                    <div className="font-mono text-[10px] text-[#8FA596]">
                      return
                    </div>
                  </div>

                  {/* Thesis Trigger */}
                  <div className="hidden lg:flex col-span-1 justify-end">
                    <span className="font-mono text-xs text-[#C5A869] hover:underline flex items-center space-x-1">
                      <span>{isSelected ? 'Close' : 'Thesis'}</span>
                      <span className="text-[10px]">{isSelected ? '▲' : '▼'}</span>
                    </span>
                  </div>
                </div>

                {/* Expanded Thesis Drawer with Pure CSS Accordion */}
                <div
                  className={`transition-all duration-300 ease-out overflow-hidden ${
                    isSelected ? 'max-h-[500px] opacity-100 py-1' : 'max-h-0 opacity-0 py-0'
                  }`}
                >
                  <div className="py-5 px-4 sm:px-6 my-2 bg-[#0E1712] border-l-2 border-[#C5A869] rounded-r-sm space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#8FA596] pb-2 border-b border-[#1A2C21]">
                      <span className="text-[#C5A869] uppercase font-bold tracking-wider">
                        WARREN'S PERSONAL INVESTMENT THESIS — {h.name}
                      </span>
                      <div className="flex items-center space-x-3">
                        <span>Cost Basis: <strong className="text-[#FAF8F2]">${h.costBasisBillions}B</strong></span>
                        <span>•</span>
                        <span>Current Value: <strong className="text-[#FAF8F2]">${h.marketValueBillions}B</strong></span>
                      </div>
                    </div>

                    <p className="font-serif text-base sm:text-lg text-[#FAF8F2] italic leading-relaxed">
                      “{h.thesisSummary}”
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-mono text-[#8FA596]">
                      <span className="px-2.5 py-1 rounded bg-[#16271E] border border-[#264433] text-[#34D399]">
                        Annual Cash Flow: ${h.annualDividendMillions}M in pure cash dividends
                      </span>
                      <span className="px-2.5 py-1 rounded bg-[#16271E] border border-[#264433] text-[#C5A869]">
                        Berkshire Owns: {h.berkshireOwnershipPercentage}% of all outstanding shares
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

HoldingsGrid.displayName = 'HoldingsGrid';
