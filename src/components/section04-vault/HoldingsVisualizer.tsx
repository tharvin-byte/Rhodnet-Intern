import React from 'react';
import { useStory } from '../../context/StoryContext';
import type { AllocationTab } from '../../context/StoryContext';
import { portfolioHoldings } from '../../data/portfolioData';

export const HoldingsVisualizer: React.FC = () => {
  const { activeAllocationTab, setActiveAllocationTab } = useStory();

  const tabs: { id: AllocationTab; label: string }[] = [
    { id: 'company', label: 'BY COMPANY' },
    { id: 'sector', label: 'BY SECTOR' },
    { id: 'value', label: 'BY VALUE' },
    { id: 'ownership', label: 'BY OWNERSHIP' },
  ];

  // Aggregated data calculations
  const sectorMap: Record<string, number> = {};
  portfolioHoldings.forEach((h) => {
    sectorMap[h.sector] = (sectorMap[h.sector] || 0) + h.marketValueBillions;
  });
  const totalHoldingsValue = Object.values(sectorMap).reduce((a, b) => a + b, 0);

  const sectorData = Object.entries(sectorMap)
    .map(([sector, val]) => ({
      sector,
      valueBillions: Number(val.toFixed(1)),
      percentage: Number(((val / totalHoldingsValue) * 100).toFixed(1)),
    }))
    .sort((a, b) => b.valueBillions - a.valueBillions);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="p-6 sm:p-8 rounded bg-[#16191D] border border-[#2B3037] space-y-6">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#23272E] pb-4">
          <div>
            <span className="font-mono text-xs text-[#B39255] tracking-widest uppercase font-semibold">
            CAPITAL DISTRIBUTION
          </span>
          <h4 className="font-serif text-xl sm:text-2xl font-light text-[#EDEDE9] mt-0.5">
            How Charlie and I Distributed Capital
          </h4>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center flex-wrap gap-1 bg-[#0F1114] p-1 rounded border border-[#2B3037]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveAllocationTab(tab.id)}
                className={`px-3 py-1.5 rounded text-xs font-mono tracking-wider uppercase transition-all ${
                  activeAllocationTab === tab.id
                    ? 'bg-[#1C3D2F] text-[#EDEDE9] font-bold shadow-xs'
                    : 'text-[#9CA3AF] hover:text-[#EDEDE9]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Visualizations by Active Tab */}
        <div className="space-y-4 pt-2">
          {activeAllocationTab === 'company' && (
            <div className="space-y-3">
              <div className="text-xs font-mono text-[#9CA3AF] mb-2 flex justify-between">
                <span>HOLDING (TICKER)</span>
                <span>PORTFOLIO WEIGHT</span>
              </div>
              {portfolioHoldings.map((item) => (
                <div key={item.id} className="space-y-1">
                  <div className="flex items-baseline justify-between text-xs font-mono">
                    <span className="font-sans font-semibold text-[#EDEDE9]">
                      {item.name}{' '}
                      <span className="text-[#9CA3AF] font-mono text-[11px]">
                        ({item.ticker})
                      </span>
                    </span>
                    <span className="font-mono text-[#B39255] font-bold">
                      {item.portfolioWeight}% (${item.marketValueBillions}B)
                    </span>
                  </div>
                  <div className="h-3 w-full bg-[#222730] rounded-sm overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#1C3D2F] to-[#2B604B] transition-all duration-500 rounded-sm"
                      style={{ width: `${item.portfolioWeight * 4.2}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeAllocationTab === 'sector' && (
            <div className="space-y-4">
              <div className="text-xs font-mono text-[#9CA3AF] mb-2 flex justify-between">
                <span>SECTOR GROUP</span>
                <span>ALLOCATION</span>
              </div>
              {sectorData.map((sec) => (
                <div key={sec.sector} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-sans text-sm font-semibold text-[#EDEDE9]">
                      {sec.sector}
                    </span>
                    <div className="space-x-2">
                      <span className="text-[#9CA3AF]">${sec.valueBillions}B</span>
                      <span className="text-[#B39255] font-bold">{sec.percentage}%</span>
                    </div>
                  </div>
                  <div className="h-4 w-full bg-[#222730] rounded-sm overflow-hidden">
                    <div
                      className="h-full bg-[#B39255] transition-all duration-500 rounded-sm"
                      style={{ width: `${sec.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeAllocationTab === 'value' && (
            <div className="space-y-3">
              <div className="text-xs font-mono text-[#9CA3AF] mb-2 flex justify-between">
                <span>SECURITY</span>
                <span>MARKET VALUE VS COST BASIS</span>
              </div>
              {portfolioHoldings.map((item) => (
                <div key={item.id} className="p-3 bg-[#111417] rounded border border-[#23272E] space-y-2">
                  <div className="flex justify-between items-baseline text-xs font-mono">
                    <span className="font-sans font-bold text-[#EDEDE9]">{item.name}</span>
                    <span className="text-[#34D399] font-bold">
                      +{item.gainPercentage > 0 ? item.gainPercentage.toFixed(0) : item.gainPercentage}%
                    </span>
                  </div>

                  <div className="space-y-1 text-[11px] font-mono">
                    <div className="flex justify-between text-[#9CA3AF]">
                      <span>Market Value: <strong className="text-[#EDEDE9]">${item.marketValueBillions}B</strong></span>
                      <span>Cost Basis: <strong className="text-[#9CA3AF]">${item.costBasisBillions}B</strong></span>
                    </div>
                    <div className="h-2 w-full bg-[#222730] rounded overflow-hidden flex">
                      <div
                        className="h-full bg-emerald-500"
                        style={{ width: `${Math.min(100, (item.marketValueBillions / 60.3) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeAllocationTab === 'ownership' && (
            <div className="space-y-3">
              <div className="text-xs font-mono text-[#9CA3AF] mb-2 flex justify-between">
                <span>COMPANY</span>
                <span>OUR OWNERSHIP STAKE IN THE ENTIRE COMPANY</span>
              </div>
              {portfolioHoldings
                .slice()
                .sort((a, b) => b.berkshireOwnershipPercentage - a.berkshireOwnershipPercentage)
                .map((item) => (
                  <div key={item.id} className="space-y-1">
                    <div className="flex justify-between items-baseline text-xs font-mono">
                      <span className="font-sans text-[#EDEDE9] font-semibold">{item.name}</span>
                      <span className="text-[#B39255] font-bold">
                        {item.berkshireOwnershipPercentage}% Owned by Us
                      </span>
                    </div>
                    <div className="h-3 w-full bg-[#222730] rounded-sm overflow-hidden">
                      <div
                        className="h-full bg-[#B39255] transition-all duration-500 rounded-sm"
                        style={{ width: `${Math.min(100, item.berkshireOwnershipPercentage * 2.4)}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
