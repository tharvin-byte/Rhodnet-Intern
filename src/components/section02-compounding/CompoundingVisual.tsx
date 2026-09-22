import React, { useState } from 'react';

interface CompoundingStep {
  age: number;
  year: number;
  worth: string;
  nominalValue: number;
  stage: string;
  milestoneDescription: string;
}

const steps: CompoundingStep[] = [
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

export const CompoundingVisual: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number>(6);
  const currentStep = steps[selectedIdx];

  return (
    <div className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Central Statement */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
        <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#FAF8F2] leading-tight">
          “I didn't build this fortune overnight.”
        </h3>
        <p className="font-serif text-xl sm:text-2xl text-[#C5A869] italic font-normal">
          I built it by letting time and compound interest do the heavy lifting.
        </p>
        <div className="w-16 h-px bg-[#C5A869] mx-auto pt-2" />
      </div>

      {/* The 4-Step Chain */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-12">
        {[
          { step: '01', title: 'TIME', desc: 'Starting at age eleven, never quitting' },
          { step: '02', title: 'CAPITAL', desc: 'Retaining earnings tax-deferred' },
          { step: '03', title: 'FLOAT', desc: 'Our insurance float at zero cost' },
          { step: '04', title: 'COMPOUNDING', desc: 'The exponential geometric payoff' },
        ].map((item, i) => (
          <div
            key={item.step}
            className="p-4 rounded bg-[#111A14]/85 border border-[#203326] hover:border-[#C5A869]/50 card-hover-lift flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] text-[#7A9181] font-bold">PILLAR {item.step}</span>
              {i < 3 && <span className="text-[#C5A869] text-xs font-mono hidden md:inline">→</span>}
            </div>
            <div className="font-serif font-bold text-base text-[#FAF8F2]">{item.title}</div>
            <div className="text-xs text-[#8FA596] mt-1 font-sans leading-snug">{item.desc}</div>
          </div>
        ))}
      </div>

      {/* Interactive Compounding Curve Visualizer */}
      <div className="p-6 sm:p-8 rounded bg-[#111A14]/90 border border-[#203527] shadow-xl space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E3024] pb-4">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#C5A869] font-bold">
              MY INTERACTIVE MILESTONES
            </span>
            <h4 className="font-serif text-xl font-normal text-[#FAF8F2] mt-0.5">
              My Compounding Curve (Age 14 to 95+)
            </h4>
          </div>

          <div className="flex items-baseline space-x-2 bg-[#15231B] px-4 py-2 rounded border border-[#22382A]">
            <span className="text-xs font-mono text-[#8FA596]">MY NET WORTH AT AGE {currentStep.age}:</span>
            <span className="font-mono font-bold text-lg sm:text-xl text-[#34D399] stat-number-glow">
              {currentStep.worth}
            </span>
          </div>
        </div>

        {/* Dynamic Bar Chart Simulation */}
        <div className="h-44 sm:h-52 flex items-end justify-between gap-1.5 sm:gap-3 pt-6 px-1 sm:px-4">
          {steps.map((s, idx) => {
            const isSelected = idx === selectedIdx;
            const heightPercent = Math.max(8, Math.pow(s.nominalValue / 100, 1.4) * 100);

            return (
              <button
                key={s.age}
                onClick={() => setSelectedIdx(idx)}
                className="flex-1 flex flex-col items-center h-full justify-end group focus:outline-none cursor-pointer"
              >
                {/* Value tooltip when hovered or selected */}
                <div
                  className={`text-[9px] sm:text-[10px] font-mono whitespace-nowrap mb-1 transition-all ${
                    isSelected ? 'opacity-100 font-bold text-[#C5A869]' : 'opacity-0 group-hover:opacity-100 text-[#8FA596]'
                  }`}
                >
                  {s.worth}
                </div>

                {/* Bar */}
                <div
                  className={`w-full rounded-t-sm transition-all duration-300 ${
                    isSelected
                      ? 'bg-gradient-to-t from-[#274834] to-[#C5A869] shadow-[0_0_12px_rgba(197,168,105,0.4)]'
                      : 'bg-[#1C2C21] hover:bg-[#34D399]/60'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />

                {/* Age Label */}
                <span
                  className={`mt-2 text-[10px] sm:text-xs font-mono transition-colors ${
                    isSelected ? 'font-bold text-[#C5A869]' : 'text-[#6A7F71] group-hover:text-[#FAF8F2]'
                  }`}
                >
                  {s.age}y
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Milestone Information */}
        <div className="p-4 sm:p-5 rounded bg-[#15221A] border border-[#23382B] space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-serif text-lg font-bold text-[#FAF8F2]">
              Age {currentStep.age} ({currentStep.year}) — {currentStep.stage}
            </span>
            <span className="font-mono text-xs text-[#C5A869] font-semibold">
              Compounded Net Worth: {currentStep.worth}
            </span>
          </div>
          <p className="text-sm text-[#9EB0A3] leading-relaxed font-sans">
            {currentStep.milestoneDescription}
          </p>
        </div>
      </div>
    </div>
  );
};
