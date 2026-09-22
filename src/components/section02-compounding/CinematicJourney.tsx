import React from 'react';
import { compoundingChapters } from '../../data/timelineData';

export const CinematicJourney: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-16">
        {compoundingChapters.map((ch) => {
          return (
            <article
              key={ch.id}
              className="relative p-6 sm:p-10 lg:p-12 rounded bg-[#111A14]/85 backdrop-blur-xs border border-[#203326] hover:border-[#C5A869]/50 card-hover-lift transition-all duration-300 shadow-xl overflow-hidden"
            >
              {/* Giant Watermark Number */}
              <div className="absolute right-6 top-4 select-none pointer-events-none font-serif text-6xl sm:text-8xl md:text-9xl font-extralight text-[#1A2C21]/40 leading-none">
                {ch.chapterNumber}
              </div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                {/* Left Column: Metadata & Title */}
                <div className="lg:col-span-4 space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold tracking-widest text-[#34D399] uppercase">
                      CHAPTER {ch.chapterNumber}
                    </span>
                    <span className="text-[#3E5C46]">•</span>
                    <span className="font-mono text-xs text-[#8FA596]">{ch.period}</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#FAF8F2] leading-tight">
                    {ch.title}
                  </h3>

                  <div className="inline-block px-2.5 py-0.5 rounded bg-[#16251C] border border-[#253D2E] text-[11px] font-mono tracking-wider text-[#C5A869] uppercase font-semibold">
                    {ch.age}
                  </div>

                  {/* Metric callout if present */}
                  {ch.metricValue && (
                    <div className="mt-4 pt-4 border-t border-[#1F3124]">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[#7A9181]">
                        {ch.metricLabel}
                      </div>
                      <div className="font-serif text-base sm:text-lg font-bold text-[#C5A869] mt-0.5">
                        {ch.metricValue}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Narrative Storytelling & Moral */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="font-serif text-lg sm:text-xl text-[#FAF8F2] font-light leading-snug border-l-2 border-[#C5A869] pl-4 quote-hover-glow cursor-default">
                    “{ch.headline}”
                  </div>

                  <p className="text-sm sm:text-base text-[#B0C0B4] leading-relaxed font-sans">
                    {ch.story}
                  </p>

                  <div className="pt-3 flex items-center space-x-2 text-xs font-mono text-[#C7D4CA] bg-[#15231B] px-3.5 py-2.5 rounded border border-[#22382A]">
                    <span className="text-[#34D399] font-bold">MY LESSON:</span>
                    <span>{ch.keyTakeaway}</span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
