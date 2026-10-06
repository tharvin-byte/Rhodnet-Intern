import React, { useState } from 'react';
import { PortfolioOverview } from './PortfolioOverview';
import { HoldingsGrid } from './HoldingsGrid';
import { WarChest } from './WarChest';
import { VaultReflection } from './VaultReflection';

export const TheBerkshireVault: React.FC = React.memo(() => {
  const [activeDepository, setActiveDepository] = useState<'equities' | 'liquidity'>('equities');

  return (
    <div className="w-full">
      {/* Chapter 04 Master Header */}
      <div className="pt-24 pb-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#121E17] border border-[#233B2B] mb-6 shadow-xs">
          <span className="font-mono text-xs text-[#C5A869] font-bold tracking-widest uppercase">
            CHAPTER 04 / 04
          </span>
          <span className="text-[#3E5C46]">•</span>
          <span className="font-mono text-xs text-[#8FA596] tracking-wide uppercase">
            THE BERKSHIRE VAULT
          </span>
        </div>

        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#FAF8F2] leading-[1.08] mb-4">
          INSIDE <span className="italic font-normal gold-shimmer-text">THE VAULT</span>
        </h2>

        <p className="font-serif text-xl sm:text-2xl text-[#8FA596] font-light max-w-2xl mx-auto leading-relaxed mb-8">
          The public equity empire and sovereign cash fortress Charlie and I gathered over seventy years.
        </p>

        {/* Swiss Vault Depository Switcher with Pure Tailwind Transitions */}
        <div className="inline-flex p-1.5 rounded-full bg-[#101913] border border-[#233B2B] shadow-lg max-w-md mx-auto">
          <button
            onClick={() => setActiveDepository('equities')}
            className={`flex items-center space-x-2 px-5 sm:px-6 py-2 rounded-full font-mono text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              activeDepository === 'equities'
                ? 'bg-[#1C3D2F] border border-[#34D399]/40 text-[#FAF8F2] font-bold shadow-sm'
                : 'text-[#8FA596] hover:text-[#FAF8F2] hover:bg-[#15241B]/40'
            }`}
          >
            <span className="text-[#C5A869]">◈</span>
            <span>EQUITY LEDGER ($298B)</span>
          </button>

          <button
            onClick={() => setActiveDepository('liquidity')}
            className={`flex items-center space-x-2 px-5 sm:px-6 py-2 rounded-full font-mono text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              activeDepository === 'liquidity'
                ? 'bg-[#1C3D2F] border border-[#34D399]/40 text-[#FAF8F2] font-bold shadow-sm'
                : 'text-[#8FA596] hover:text-[#FAF8F2] hover:bg-[#15241B]/40'
            }`}
          >
            <span className="text-[#34D399]">⬡</span>
            <span>CASH FORTRESS ($360B)</span>
          </button>
        </div>
      </div>

      {/* Depository Views */}
      <div className="w-full">
        {activeDepository === 'equities' ? (
          <div key="equities" className="space-y-6 transition-opacity duration-300">
            <PortfolioOverview />
            <HoldingsGrid />
          </div>
        ) : (
          <div key="liquidity" className="space-y-6 transition-opacity duration-300">
            <WarChest />
          </div>
        )}
      </div>

      {/* Closing Philosophical Colophon */}
      <VaultReflection />
    </div>
  );
});

TheBerkshireVault.displayName = 'TheBerkshireVault';
