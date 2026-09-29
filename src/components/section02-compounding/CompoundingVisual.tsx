import React, { useState } from 'react';

interface CompoundingStep {
  age: number;
  year: number;
  worth: string;
  nominalValue: number;
  stage: string;
  milestoneDescription: string;
}

const STEPS: readonly CompoundingStep[] = [
  { age: 14, year: 1944, worth: '$1,200', nominalValue: 1, stage: 'Paper Routes & Pinballs', milestoneDescription: 'First $1,200 saved; bought a 40-acre farm in Nebraska.' },
  { age: 21, year: 1951, worth: '$20,000', nominalValue: 2, stage: 'Columbia Business School', milestoneDescription: 'Studying under Benjamin Graham; calculating net-nets.' },
  { age: 30, year: 1960, worth: '$1,000,000', nominalValue: 5, stage: 'First Million (Partnership)', milestoneDescription: 'Compounding outside Wall Street with Buffett Partnership Ltd.' },
  { age: 43, year: 1973, worth: '$34,000,000', nominalValue: 12, stage: 'Berkshire & See’s Candies', milestoneDescription: 'Pivoting from failing textiles into durable economic moats.' },
  { age: 53, year: 1983, worth: '$620,000,000', nominalValue: 22, stage: 'National Indemnity & GEICO', milestoneDescription: 'Insurance float engine expanding; purchasing Nebraska Furniture Mart.' },
  { age: 60, year: 1990, worth: '$3,800,000,000', nominalValue: 35, stage: 'First Billions (Coca-Cola)', milestoneDescription: 'Accumulating 7% of Coca-Cola after the 1987 market crash.' },
  { age: 70, year: 2000, worth: '$36,000,000,000', nominalValue: 55, stage: 'Dot-Com Discipline', milestoneDescription: 'Mocked for avoiding unprofitable tech; emerged completely unscathed.' },
  { age: 83, year: 2013, worth: '$58,000,000,000', nominalValue: 70, stage: 'BNSF Railroad & Crisis Capital', milestoneDescription: 'Acquiring Burlington Northern Santa Fe and financing blue-chips.' },
  { age: 90, year: 2020, worth: '$100,000,000,000', nominalValue: 85, stage: 'The Apple Epoch', milestoneDescription: 'Building a $35B Apple stake that peaked at over $170B in value.' },
  { age: 95, year: 2026, worth: '$150,000,000,000+', nominalValue: 100, stage: 'Generational Fortress', milestoneDescription: 'Cash war chest exceeds $360B; over 99% of wealth created after age 50.' },
];

const CONDUIT_NODES = [
  { step: '01', title: 'TIME', desc: 'Starting at age 11, never quitting' },
  { step: '02', title: 'CAPITAL', desc: 'Retaining earnings tax-deferred' },
  { step: '03', title: 'FLOAT', desc: 'Negative-cost insurance reserves' },
  { step: '04', title: 'COMPOUNDING', desc: 'Exponential geometric payoff' },
] as const;

export const CompoundingVisual: React.FC = React.memo(() => {
  const [selectedIdx, setSelectedIdx] = useState<number>(6);
  const currentStep = STEPS[selectedIdx];

  return (
    <div className="pb-16 pt-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Central Statement */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#FAF8F2] leading-tight">
          “I didn't build this fortune overnight.”
        </h3>
        <p className="font-serif text-xl sm:text-2xl text-[#C5A869] italic font-normal">
          I built it by letting time and compound interest do the heavy lifting.
        </p>
        <div className="w-16 h-px bg-[#C5A869] mx-auto pt-2" />
      </div>

      {/* The Kinetic Conduit: 4 Interconnected Flow Nodes with Flowing Energy */}
      <div className="relative">
        {/* Continuous Horizontal Golden Conduit Energy Beam */}
        <div className="hidden md:block absolute top-6 left-12 right-12 h-0.5 animate-conduit-energy z-0 rounded-full shadow-[0_0_12px_rgba(197,168,105,0.4)]" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
          {CONDUIT_NODES.map((item) => (
            <div
              key={item.step}
              className="flex flex-col items-center text-center group cursor-default transition-transform duration-300 hover:scale-105"
            >
              {/* Glowing Node Marker with Radar Pulse on Hover */}
              <div className="relative w-12 h-12 rounded-full bg-[#0E1712] border border-[#2A4433] group-hover:border-[#C5A869] flex items-center justify-center transition-all duration-300 shadow-md group-hover:shadow-[0_0_20px_rgba(197,168,105,0.5)] mb-3 group-hover:scale-110">
                <span className="font-mono text-xs font-bold text-[#C5A869] transition-transform duration-300 group-hover:scale-110">
                  {item.step}
                </span>
                <div className="absolute inset-0 rounded-full border border-[#C5A869]/20 opacity-0 group-hover:opacity-100 animate-radar-pulse pointer-events-none" />
              </div>
              <div className="font-serif font-bold text-base text-[#FAF8F2] tracking-wide group-hover:text-[#C5A869] transition-colors">
                {item.title}
              </div>
              <div className="text-xs text-[#8FA596] mt-1 font-sans leading-snug max-w-[170px]">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Interactive Compounding Curve with Spring Physics */}
      <div className="pt-6 space-y-8 border-t border-[#1E3024]">
        {/* Floating HUD Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#C5A869] font-bold">
              02 / THE EXPONENTIAL SNOWBALL
            </span>
            <h4 className="font-serif text-2xl sm:text-3xl font-light text-[#FAF8F2] mt-1">
              Select An Age to Inspect The Snowball
            </h4>
          </div>

          <div className="flex items-baseline space-x-3 text-right">
            <span className="text-xs font-mono text-[#8FA596]">NET WORTH AT AGE {currentStep.age}:</span>
            <span
              key={currentStep.worth}
              className="font-mono font-bold text-2xl sm:text-3xl text-[#34D399] stat-number-glow tracking-tight transition-all duration-300 transform inline-block"
            >
              {currentStep.worth}
            </span>
          </div>
        </div>

        {/* Dynamic Interactive Bar Graph with Spring Easing */}
        <div className="h-44 sm:h-56 flex items-end justify-between gap-2 sm:gap-4 pt-8 px-2 border-b border-[#1E3024]/80 pb-3">
          {STEPS.map((s, idx) => {
            const isSelected = idx === selectedIdx;
            const heightPercent = Math.max(10, Math.pow(s.nominalValue / 100, 1.4) * 100);

            return (
              <button
                key={s.age}
                onClick={() => setSelectedIdx(idx)}
                className="flex-1 flex flex-col items-center h-full justify-end group focus:outline-none cursor-pointer"
              >
                {/* Floating Value Tooltip with Smooth Translate */}
                <div
                  className={`text-[10px] font-mono whitespace-nowrap mb-2 transition-all duration-300 ${
                    isSelected ? 'opacity-100 font-bold text-[#C5A869] -translate-y-1 scale-110' : 'opacity-0 group-hover:opacity-100 text-[#8FA596] group-hover:-translate-y-0.5'
                  }`}
                >
                  {s.worth}
                </div>

                {/* Atmospheric Glow Bar with Spring Interpolation */}
                <div
                  className={`w-full max-w-[38px] rounded-t-sm transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                    isSelected
                      ? 'bg-gradient-to-t from-[#20422F] via-[#34D399] to-[#C5A869] shadow-[0_0_22px_rgba(197,168,105,0.7)] scale-y-105'
                      : 'bg-[#15251C] hover:bg-[#254231] hover:scale-y-102'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />

                {/* Age Label */}
                <span
                  className={`mt-3 text-xs font-mono transition-all duration-200 ${
                    isSelected ? 'font-bold text-[#C5A869] scale-110' : 'text-[#6A7F71] group-hover:text-[#FAF8F2]'
                  }`}
                >
                  {s.age}y
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Milestone Detail with Pure CSS Fade */}
        <div
          key={currentStep.age}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-4 px-2 border-l-2 border-[#C5A869] pl-5 bg-gradient-to-r from-[#14231A]/50 to-transparent transition-all duration-300"
        >
          <div>
            <div className="font-serif text-lg font-bold text-[#FAF8F2]">
              Age {currentStep.age} ({currentStep.year}) — <span className="font-normal italic text-[#C5A869]">{currentStep.stage}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#9EB0A3] font-sans mt-0.5 max-w-2xl">
              {currentStep.milestoneDescription}
            </p>
          </div>
          <div className="shrink-0 text-right font-mono text-xs text-[#34D399] font-semibold">
            {currentStep.age >= 53 ? '✦ >99% Fortune Era' : 'Early Runway Phase'}
          </div>
        </div>
      </div>
    </div>
  );
});

CompoundingVisual.displayName = 'CompoundingVisual';
