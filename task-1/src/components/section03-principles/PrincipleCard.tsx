import React from 'react';
import { useStory } from '../../hooks/useStory';
import { principlesList } from '../../data/principlesData';
import type { PrincipleItem } from '../../types/principles';

const MOAT_DEFENSES = [
  { num: '1', title: 'Pricing Power', desc: "Raise prices without losing unit volume (See's Candies, Apple)." },
  { num: '2', title: 'Brand Prestige', desc: 'Habitual consumer affection that competitors cannot replicate (Coca-Cola).' },
  { num: '3', title: 'High Switching Costs', desc: "Painful, risky, or expensive for customers to switch (Moody's, BofA)." },
  { num: '4', title: 'Structural Cost Moat', desc: 'Lowest operating expense ratio in the industry (GEICO).' },
] as const;

const FLYWHEEL_STEPS = [
  { step: '01', title: 'BUY', desc: 'Wonderful enterprise at fair price' },
  { step: '02', title: 'HOLD', desc: 'Decades, not quarterly ticks' },
  { step: '03', title: 'REINVEST', desc: 'Retain earnings tax-deferred' },
  { step: '04', title: 'COMPOUND', desc: 'Exponential capital growth' },
] as const;

export const PrincipleCard: React.FC = React.memo(() => {
  const { expandedPrincipleId, setExpandedPrincipleId } = useStory();

  // Active principle item or default to first
  const activeId = expandedPrincipleId || 'circle-of-competence';
  const activePrinciple = principlesList.find((p) => p.id === activeId) || principlesList[0];

  const renderVisual = (principle: PrincipleItem) => {
    switch (principle.visualType) {
      case 'margin':
        return (
          <div className="py-4 border-y border-[#1E3024] space-y-3">
            <div className="text-xs font-mono tracking-wider text-[#8FA596] uppercase font-semibold">
              Valuation Disconnect Visualizer
            </div>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-[#34D399]">ESTIMATED INTRINSIC VALUE</span>
                <span className="text-[#34D399] font-bold">$100 / Share</span>
              </div>
              <div className="h-6 w-full bg-[#14261B] rounded-xs relative overflow-hidden flex items-center px-3 border border-[#234230]">
                <div className="absolute left-0 top-0 bottom-0 bg-[#34D399]/20 w-full" />
                <span className="relative z-10 text-[11px] font-mono text-[#FAF8F2] font-semibold">
                  Full Conservative Business Value (Discounted Future Cash Flows)
                </span>
              </div>

              <div className="flex items-center justify-between text-xs font-mono pt-1">
                <span className="font-bold text-[#C5A869]">MARKET PRICE PAID</span>
                <span className="text-[#C5A869] font-bold">$55 / Share</span>
              </div>
              <div className="h-6 w-[55%] bg-gradient-to-r from-[#8C6F36] to-[#C5A869] rounded-xs flex items-center px-3 text-[11px] font-mono text-[#090E0B] font-bold shadow-sm transition-all duration-700 ease-out">
                55% Market Price
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs font-mono text-[#FAF8F2] font-bold">
              <span className="text-[#8FA596]">MARGIN OF SAFETY CUSHION:</span>
              <span className="px-2.5 py-0.5 rounded bg-[#162D20] text-[#34D399] border border-[#2B543B]">
                +45% Downside Buffer
              </span>
            </div>
          </div>
        );

      case 'moat':
        return (
          <div className="py-4 border-y border-[#1E3024] space-y-2.5">
            <div className="text-xs font-mono tracking-wider text-[#8FA596] uppercase font-semibold">
              The Castle Moat Defenses
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              {MOAT_DEFENSES.map((m) => (
                <div
                  key={m.num}
                  className="p-3 bg-[#111F17] rounded-xs border border-[#1E3526] hover:border-[#C5A869]/50 text-[#FAF8F2] hover-border-glint transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span className="text-[#34D399] font-bold block mb-0.5">{m.num}. {m.title}</span>
                  {m.desc}
                </div>
              ))}
            </div>
          </div>
        );

      case 'timeline':
        return (
          <div className="py-4 border-y border-[#1E3024] space-y-2.5">
            <div className="text-xs font-mono tracking-wider text-[#8FA596] uppercase font-semibold">
              The Compounding Flywheel
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
              {FLYWHEEL_STEPS.map((item) => (
                <div
                  key={item.step}
                  className="p-3 bg-[#111F17] rounded-xs border border-[#1E3526] hover:border-[#34D399]/60 transition-all duration-300 hover:scale-105 group"
                >
                  <div className="text-[10px] text-[#C5A869] font-bold group-hover:scale-110 transition-transform">{item.step}</div>
                  <div className="font-serif font-bold text-sm text-[#FAF8F2] mt-0.5 group-hover:text-[#34D399] transition-colors">{item.title}</div>
                  <div className="text-[10px] text-[#8FA596] mt-1 leading-tight">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="py-4 border-y border-[#1E3024] space-y-2">
            <div className="text-xs font-mono tracking-wider text-[#8FA596] uppercase font-semibold">
              Cognitive Boundary Model
            </div>
            <p className="text-xs text-[#9EB0A3] font-sans leading-relaxed">
              If an investment requires complex predictions or tech forecasting, I toss it straight into my <strong className="text-[#FAF8F2]">"Too Hard"</strong> tray. I only play games where I know I have the odds heavily in my favor.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Boxless 2-Column Split Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Interactive Principle Index Rail */}
        <div className="lg:col-span-4 space-y-2">
          <div className="font-mono text-xs text-[#8FA596] uppercase tracking-widest pb-3 border-b border-[#1E3024] mb-3">
            SELECT A MENTAL MODEL
          </div>

          <div className="space-y-1.5">
            {principlesList.map((p) => {
              const isSelected = activePrinciple.id === p.id;

              return (
                <button
                  key={p.id}
                  onClick={() => setExpandedPrincipleId(p.id)}
                  className={`w-full text-left p-3.5 rounded-sm transition-all duration-200 flex items-center justify-between group cursor-pointer relative ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#172B20] to-transparent border-l-2 border-[#C5A869] text-[#FAF8F2] translate-x-1 shadow-xs'
                      : 'hover:bg-[#121E17]/60 text-[#8FA596] hover:text-[#FAF8F2] hover:translate-x-0.5 border-l-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className={`font-mono text-sm font-bold ${
                        isSelected ? 'text-[#C5A869]' : 'text-[#4A6352] group-hover:text-[#C5A869]'
                      }`}
                    >
                      {p.number}
                    </span>
                    <span className="font-serif text-base font-normal tracking-wide">
                      {p.title}
                    </span>
                  </div>

                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Spotlight Dossier with Fluid Entrance */}
        <div className="lg:col-span-8 pt-1 min-h-[360px]">
          <div
            key={activePrinciple.id}
            className="space-y-6 animate-text-reveal-1"
          >
            {/* Active Model Header */}
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2 font-mono text-xs text-[#C5A869] font-bold tracking-widest uppercase">
                <span>PRINCIPLE {activePrinciple.number}</span>
                <span className="text-[#3A5242]">•</span>
                <span className="text-[#8FA596] italic font-serif lowercase">"{activePrinciple.tagline}"</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#FAF8F2] tracking-tight">
                {activePrinciple.title}
              </h3>
            </div>

            {/* Golden Rule Callout */}
            <div className="border-l-2 border-[#C5A869] pl-4 py-1 text-sm sm:text-base font-serif italic text-[#FAF8F2] leading-relaxed">
              “{activePrinciple.coreRule}”
            </div>

            {/* Narrative Summary */}
            <p className="text-xs sm:text-sm text-[#9EB0A3] leading-relaxed font-sans">
              {activePrinciple.summary}
            </p>

            {/* Custom Visual (Margin, Moat, Timeline, Circle) */}
            {renderVisual(activePrinciple)}

            {/* Application Breakdown Pills */}
            <div className="space-y-2 pt-1">
              <div className="font-mono text-[11px] text-[#8FA596] uppercase tracking-wider font-semibold">
                How Charlie and I Apply This:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activePrinciple.breakdown.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#0F1A14]/70 border-l border-[#2B4736] hover:border-[#C5A869] space-y-1 transition-colors duration-200"
                  >
                    <div className="font-serif font-bold text-xs text-[#C5A869]">
                      {item.label}
                    </div>
                    <div className="text-[11px] text-[#8FA596] leading-snug font-sans">
                      {item.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

PrincipleCard.displayName = 'PrincipleCard';
