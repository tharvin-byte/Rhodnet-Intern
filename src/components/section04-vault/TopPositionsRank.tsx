import React from 'react';
import { portfolioHoldings } from '../../data/portfolioData';

export const TopPositionsRank: React.FC = () => {
  // Take top 5 dominant positions
  const topFive = portfolioHoldings.slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span className="font-mono text-xs text-[#B39255] tracking-widest uppercase font-bold">
          CONVICTION OVER DIVERSIFICATION
        </span>
        <h4 className="font-serif text-3xl sm:text-4xl font-light text-[#EDEDE9]">
          My Five Anchor Pillars
        </h4>
        <p className="text-xs sm:text-sm text-[#9CA3AF] font-sans">
          Charlie and I never believed in broad diversification. We put our eggs in a few baskets and watched those baskets very carefully. These five businesses represent over 58% of our public equity portfolio.
        </p>
      </div>

      {/* Dominant Visual Ranking Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {topFive.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded bg-[#16191D] border border-[#2B3037] hover:border-[#B39255]/70 card-hover-lift transition-all duration-300 flex flex-col justify-between relative overflow-hidden group shadow-lg"
          >
            {/* Massive Typographic Rank Indicator */}
            <div className="font-mono text-5xl sm:text-6xl font-extralight text-[#282E37] group-hover:text-[#B39255]/30 transition-colors leading-none mb-4 select-none">
              0{item.rank}
            </div>

            <div className="space-y-2 relative z-10">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#B39255] font-bold">
                  {item.ticker}
                </span>
                <span className="text-[11px] font-mono text-[#9CA3AF]">
                  Since {item.sinceYear}
                </span>
              </div>

              <h5 className="font-serif text-lg font-bold text-[#EDEDE9] leading-snug group-hover:text-[#FAF9F5] transition-colors">
                {item.name}
              </h5>

              <div className="pt-3 border-t border-[#23272E] space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="font-mono text-[10px] text-[#9CA3AF] uppercase">Weight</span>
                  <span className="font-mono text-base font-bold text-[#EDEDE9]">
                    {item.portfolioWeight}%
                  </span>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="font-mono text-[10px] text-[#9CA3AF] uppercase">Market Value</span>
                  <span className="font-mono text-base font-bold text-[#34D399]">
                    ${item.marketValueBillions}B
                  </span>
                </div>

                <div className="flex justify-between items-baseline text-[11px] text-[#9CA3AF]">
                  <span>Our Ownership Stake:</span>
                  <span className="font-mono text-[#EDEDE9]">{item.berkshireOwnershipPercentage}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
