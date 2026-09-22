import React from 'react';
import { useStory } from '../../context/StoryContext';
import { principlesList } from '../../data/principlesData';
import type { PrincipleItem } from '../../types/principles';

export const PrincipleCard: React.FC = () => {
  const { expandedPrincipleId, setExpandedPrincipleId } = useStory();

  const handleCardClick = (id: string) => {
    setExpandedPrincipleId(expandedPrincipleId === id ? null : id);
  };

  const renderVisual = (principle: PrincipleItem) => {
    switch (principle.visualType) {
      case 'margin':
        return (
          <div className="p-4 sm:p-6 bg-[#0E1712] rounded border border-[#23382B] space-y-3">
            <div className="text-xs font-mono tracking-wider text-[#8FA596] uppercase font-semibold">
              Valuation Disconnect Visualizer
            </div>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-[#34D399]">ESTIMATED INTRINSIC VALUE</span>
                <span className="text-[#34D399] font-bold">$100 / Share</span>
              </div>
              <div className="h-6 w-full bg-[#18281E] rounded relative overflow-hidden flex items-center px-3 border border-[#233E2E]">
                <div className="absolute left-0 top-0 bottom-0 bg-[#34D399]/20 w-full" />
                <span className="relative z-10 text-[11px] font-mono text-[#FAF8F2] font-semibold">
                  Full Conservative Business Value (Discounted Cash Flows)
                </span>
              </div>

              <div className="flex items-center justify-between text-xs font-mono pt-2">
                <span className="font-bold text-[#C5A869]">MARKET PRICE PAID</span>
                <span className="text-[#C5A869] font-bold">$55 / Share</span>
              </div>
              <div className="h-6 w-[55%] bg-gradient-to-r from-[#8C6F36] to-[#C5A869] rounded flex items-center px-3 text-[11px] font-mono text-[#090E0B] font-bold shadow-sm">
                55% Market Price
              </div>
            </div>

            <div className="pt-2.5 flex items-center justify-between text-xs font-mono text-[#FAF8F2] font-bold border-t border-[#1C2F22]">
              <span className="text-[#8FA596]">MARGIN OF SAFETY CUSHION:</span>
              <span className="bg-[#172D20] border border-[#2E593E] px-2.5 py-0.5 rounded text-[#34D399]">
                +45% Downside Buffer
              </span>
            </div>
          </div>
        );

      case 'timeline':
        return (
          <div className="p-4 sm:p-5 bg-[#0E1712] rounded border border-[#23382B]">
            <div className="text-xs font-mono tracking-wider text-[#8FA596] uppercase font-semibold mb-3">
              The Long-Term Flywheel
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
              {[
                { step: '01', title: 'BUY', desc: 'Wonderful business at fair price' },
                { step: '02', title: 'HOLD', desc: 'Decades, not quarters' },
                { step: '03', title: 'REINVEST', desc: 'Retain earnings tax-free' },
                { step: '04', title: 'COMPOUND', desc: 'Exponential capital growth' },
              ].map((item) => (
                <div key={item.step} className="p-3 rounded bg-[#132219] border border-[#233B2C] hover:border-[#C5A869]/40 transition-colors">
                  <div className="text-[10px] font-mono text-[#C5A869] font-bold">{item.step}</div>
                  <div className="font-serif font-bold text-sm text-[#FAF8F2] mt-0.5">{item.title}</div>
                  <div className="text-[10px] text-[#8FA596] mt-1 leading-tight">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'moat':
        return (
          <div className="p-4 sm:p-5 bg-[#0E1712] rounded border border-[#23382B]">
            <div className="text-xs font-mono tracking-wider text-[#8FA596] uppercase font-semibold mb-3">
              The 5 Castle Moat Defenses
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="p-2.5 bg-[#132219] rounded border border-[#233B2C] font-mono text-[#FAF8F2]">
                <strong className="text-[#34D399]">1. Pricing Power:</strong> Raise prices without losing volume (Why I bought See's Candies).
              </div>
              <div className="p-2.5 bg-[#132219] rounded border border-[#233B2C] font-mono text-[#FAF8F2]">
                <strong className="text-[#34D399]">2. Brand Prestige:</strong> Habitual consumer loyalty (Why I bought Apple, Coca-Cola).
              </div>
              <div className="p-2.5 bg-[#132219] rounded border border-[#233B2C] font-mono text-[#FAF8F2]">
                <strong className="text-[#34D399]">3. High Switching Costs:</strong> Severe friction to replace (Why I own Moody's).
              </div>
              <div className="p-2.5 bg-[#132219] rounded border border-[#233B2C] font-mono text-[#FAF8F2]">
                <strong className="text-[#34D399]">4. Low-Cost Advantage:</strong> Structural cost moat rivals cannot touch (Why I love GEICO).
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pb-12">
      {principlesList.map((p) => {
        const isExpanded = expandedPrincipleId === p.id;

        return (
          <div
            key={p.id}
            className={`transition-all duration-300 rounded border ${
              isExpanded
                ? 'bg-[#111B15] border-[#C5A869]/60 shadow-[0_8px_30px_rgba(0,0,0,0.5)]'
                : 'bg-[#101813]/85 border-[#1E3024] hover:border-[#C5A869]/40 cursor-pointer card-hover-lift'
            }`}
          >
            {/* Clickable Header Bar */}
            <button
              onClick={() => handleCardClick(p.id)}
              className="w-full p-6 sm:p-7 text-left flex items-start sm:items-center justify-between gap-4 focus:outline-none cursor-pointer"
            >
              <div className="flex items-start sm:items-center space-x-4">
                <span className="font-mono text-2xl sm:text-3xl font-light text-[#C5A869] tracking-tight">
                  {p.number}
                </span>

                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#FAF8F2]">
                    {p.title}
                  </h3>
                  <div className="font-serif text-sm italic text-[#8FA596] mt-0.5">
                    {p.tagline}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-1 sm:pt-0">
                <span className="hidden sm:inline font-mono text-xs uppercase tracking-widest text-[#8FA596]">
                  {isExpanded ? 'COLLAPSE' : 'EXPAND'}
                </span>
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-sm border transition-transform duration-300 ${
                    isExpanded
                      ? 'rotate-180 bg-[#C5A869] text-[#090E0B] border-[#C5A869]'
                      : 'bg-[#16251C] text-[#8FA596] border-[#253D2E]'
                  }`}
                >
                  ↓
                </span>
              </div>
            </button>

            {/* Expandable Body */}
            {isExpanded && (
              <div className="px-6 pb-7 sm:px-8 sm:pb-8 pt-2 border-t border-[#1C2F22] space-y-6 animate-fadeIn">
                <p className="text-sm sm:text-base text-[#B0C0B4] leading-relaxed font-sans">
                  {p.summary}
                </p>

                {/* Core Rule Callout */}
                <div className="p-4 rounded bg-[#14231A] border-l-3 border-[#C5A869] text-xs sm:text-sm font-serif italic text-[#FAF8F2]">
                  <strong className="font-mono not-italic uppercase text-[11px] text-[#34D399] block mb-1">
                    MY GOLDEN RULE:
                  </strong>
                  “{p.coreRule}”
                </div>

                {/* Custom Visual if applicable */}
                {renderVisual(p)}

                {/* Granular Breakdown */}
                <div className="space-y-2.5 pt-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#8FA596] font-semibold">
                    HOW CHARLIE AND I APPLY THIS:
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {p.breakdown.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded bg-[#0E1712] border border-[#213527] space-y-1 hover:border-[#C5A869]/40 transition-colors"
                      >
                        <div className="font-serif font-bold text-sm text-[#C5A869]">
                          {item.label}
                        </div>
                        <div className="text-xs text-[#8FA596] leading-snug font-sans">
                          {item.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
