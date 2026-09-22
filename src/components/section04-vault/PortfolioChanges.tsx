import React from 'react';
import { portfolioChanges } from '../../data/portfolioData';
import type { ActionType } from '../../types/portfolio';

export const PortfolioChanges: React.FC = () => {
  const getActionBadge = (action: ActionType) => {
    switch (action) {
      case 'ADDED':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60';
      case 'INCREASED':
        return 'bg-teal-950/80 text-teal-300 border-teal-700/60';
      case 'TRIMMED':
        return 'bg-amber-950/80 text-amber-300 border-amber-700/60';
      case 'SOLD':
        return 'bg-red-950/80 text-red-300 border-red-700/60';
      default:
        return 'bg-[#23272E] text-[#EDEDE9] border-[#3E4550]';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span className="font-mono text-xs text-[#B39255] tracking-widest uppercase font-bold">
          OUR RECENT CAPITAL ALLOCATION MOVES
        </span>
        <h4 className="font-serif text-3xl sm:text-4xl font-light text-[#EDEDE9]">
          WHAT AM I DOING RIGHT NOW?
        </h4>
        <p className="text-xs sm:text-sm text-[#9CA3AF] font-sans">
          People often ask me: <em>“Warren, what are you doing with Berkshire’s portfolio right now?”</em> Here is our recent capital redeployment straight from our SEC filings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {portfolioChanges.map((change) => (
          <div
            key={change.id}
            className="p-6 rounded bg-[#16191D]/90 backdrop-blur-xs border border-[#2B3037] hover:border-[#B39255]/50 flex flex-col justify-between space-y-4 shadow-xs card-hover-lift"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#EDEDE9] font-bold">
                  {change.ticker}
                </span>
                <span
                  className={`text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-0.5 rounded border ${getActionBadge(
                    change.action
                  )}`}
                >
                  {change.action}
                </span>
              </div>

              <h5 className="font-serif text-xl font-normal text-[#EDEDE9]">
                {change.company}
              </h5>

              <div className="space-y-1 py-2 border-y border-[#23272E] text-xs font-mono">
                <div className="flex justify-between text-[#9CA3AF]">
                  <span>Timeline:</span>
                  <span className="text-[#EDEDE9]">{change.period}</span>
                </div>
                <div className="flex justify-between text-[#9CA3AF]">
                  <span>Scale:</span>
                  <span className="text-[#B39255] font-semibold">{change.sharesOrValue}</span>
                </div>
              </div>

              <p className="text-xs text-[#9CA3AF] leading-relaxed font-sans pt-1">
                {change.rationale}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
