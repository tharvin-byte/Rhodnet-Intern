import React from 'react';
import { liquidityMetrics } from '../../data/portfolioData';

export const WarChest: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="p-8 sm:p-12 rounded-sm bg-[#121518] border border-[#2B3037] relative overflow-hidden shadow-xl">
        {/* Background Vault Accent Glow */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#B39255]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="font-mono text-xs text-[#B39255] tracking-widest uppercase font-bold">
              MY LIQUIDITY FORTRESS
            </span>
            <h4 className="font-serif text-3xl sm:text-5xl font-light text-[#EDEDE9]">
              MY LIQUIDITY WAR CHEST
            </h4>
            <p className="font-serif text-base sm:text-lg text-[#9CA3AF] italic max-w-xl mx-auto">
              “Charlie and I promised our shareholders we would never rely on the kindness of strangers. Cash combined with courage in a crisis is priceless.”
            </p>
          </div>

          {/* Large Numbers Display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {/* Cash & Treasuries Total */}
            <div className="p-6 rounded bg-[#181B20]/90 backdrop-blur-xs border border-[#2B3037] hover:border-[#B39255]/50 transition-all card-hover-lift text-center space-y-2">
              <div className="font-mono text-xs uppercase tracking-wider text-[#9CA3AF]">
                Our Total Liquidity Fortress
              </div>
              <div className="font-serif text-4xl sm:text-5xl font-bold text-[#B39255]">
                ~${liquidityMetrics.totalCashAndTreasuriesBillions}B
              </div>
              <div className="text-[11px] font-sans text-[#6B7280]">
                Cash &amp; Short-Term U.S. Treasuries
              </div>
            </div>

            {/* Treasury Bills Breakdown */}
            <div className="p-6 rounded bg-[#181B20]/90 backdrop-blur-xs border border-[#2B3037] hover:border-[#B39255]/50 transition-all card-hover-lift text-center space-y-2">
              <div className="font-mono text-xs uppercase tracking-wider text-[#9CA3AF]">
                Short-Term U.S. T-Bills
              </div>
              <div className="font-serif text-4xl sm:text-5xl font-bold text-[#EDEDE9]">
                ${liquidityMetrics.shortTermTreasuryBillsBillions}B
              </div>
              <div className="text-[11px] font-sans text-[#6B7280]">
                Parked in ultra-safe short paper
              </div>
            </div>

            {/* Cash Equivalents */}
            <div className="p-6 rounded bg-[#181B20]/90 backdrop-blur-xs border border-[#2B3037] hover:border-[#B39255]/50 transition-all card-hover-lift text-center space-y-2">
              <div className="font-mono text-xs uppercase tracking-wider text-[#9CA3AF]">
                Cash &amp; Cash Equivalents
              </div>
              <div className="font-serif text-4xl sm:text-5xl font-bold text-emerald-400">
                ${liquidityMetrics.cashAndEquivalentsBillions}B
              </div>
              <div className="text-[11px] font-sans text-[#6B7280]">
                Always available for panic-sale opportunities
              </div>
            </div>
          </div>

          {/* Strict Reporting Date & Disclaimers */}
          <div className="p-5 rounded bg-[#171B20] border border-[#2B3037] space-y-2 text-xs font-sans text-[#9CA3AF] leading-relaxed">
            <div className="flex items-center space-x-2 font-mono text-[11px] text-[#B39255] font-bold uppercase tracking-wider">
              <span>REPORTING DATE:</span>
              <span>{liquidityMetrics.reportingDate}</span>
            </div>
            <p>
              {liquidityMetrics.narrativeContext}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
