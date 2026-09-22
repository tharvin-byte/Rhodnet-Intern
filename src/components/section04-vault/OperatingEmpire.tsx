import React, { useState } from 'react';
import { operatingSubsidiaries } from '../../data/portfolioData';

export const OperatingEmpire: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Insurance', 'Railroad', 'Energy & Utilities', 'Manufacturing', 'Service & Retail'];

  const filteredSubs =
    activeCategory === 'ALL'
      ? operatingSubsidiaries
      : operatingSubsidiaries.filter((s) => s.category === activeCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <span className="font-mono text-xs text-[#B39255] tracking-widest uppercase font-bold">
          BEYOND WALL STREET TICKERS
        </span>
        <h4 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#EDEDE9] leading-tight">
          MY PORTFOLIO IS BIGGER <br />
          <span className="italic font-normal">THAN JUST COMMON STOCKS</span>
        </h4>
        <p className="text-xs sm:text-sm text-[#9CA3AF] font-sans max-w-xl mx-auto">
          Berkshire Hathaway is fundamentally a sprawling family of operating companies, not a mutual fund. Charlie and I built these wholly-owned businesses to produce the steady operating earnings and insurance float that fuel all our investments.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all ${
              activeCategory === cat
                ? 'bg-[#B39255] text-[#0E1012] font-bold shadow-xs'
                : 'bg-[#181B20] text-[#9CA3AF] border border-[#2B3037] hover:text-[#EDEDE9]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Subsidiaries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSubs.map((sub) => (
          <div
            key={sub.id}
            className="p-6 rounded bg-[#16191D]/90 backdrop-blur-xs border border-[#2B3037] flex flex-col justify-between space-y-4 hover:border-[#B39255]/50 transition-all card-hover-lift"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#B39255] font-bold">
                  {sub.category}
                </span>
                <span className="text-[11px] font-mono text-[#6B7280]">
                  Acquired {sub.acquiredYear}
                </span>
              </div>

              <h5 className="font-serif text-xl font-bold text-[#EDEDE9]">
                {sub.name}
              </h5>

              <p className="text-xs text-[#9CA3AF] font-sans leading-relaxed mt-2">
                {sub.description}
              </p>
            </div>

            <div className="pt-3 border-t border-[#23272E]">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#6B7280]">
                Key Operating Metric
              </div>
              <div className="font-mono text-xs font-bold text-emerald-400 mt-0.5">
                {sub.highlightMetric}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
