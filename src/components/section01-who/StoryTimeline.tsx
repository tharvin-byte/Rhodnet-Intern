import React, { useState } from 'react';
import { whoAmIMilestones } from '../../data/timelineData';
import { useInView } from '../../hooks/useInView';

export const StoryTimeline: React.FC = React.memo(() => {
  const [activeId, setActiveId] = useState<string>('origins');
  const { ref: timelineRef, isInView: timelineInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div ref={timelineRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
      {/* Section Subhead & Editorial Rule */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-6 border-b border-[#1E3024]">
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs tracking-widest uppercase text-[#C5A869] font-bold">
              01 / CHRONOLOGY
            </span>
            <span className="text-[#3A5242]">•</span>
            <span className="font-mono text-xs text-[#8FA596] tracking-wide uppercase">
              TURNING POINTS
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#FAF8F2] mt-1.5">
            The Four Formative Turning Points
          </h2>
        </div>
        <div className="font-mono text-xs text-[#8FA596]">
          1930 — PRESENT · OMAHA, NEBRASKA
        </div>
      </div>

      {/* Asymmetrical Editorial Chronology (Pure Tailwind CSS Transitions) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-12 pt-10">
        {whoAmIMilestones.map((item, idx) => {
          const isActive = activeId === item.id;

          return (
            <div
              key={item.id}
              onMouseEnter={() => setActiveId(item.id)}
              onClick={() => setActiveId(item.id)}
              className="relative group cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1.5"
              style={{
                transitionDelay: `${idx * 60}ms`,
              }}
            >
              {/* Subtle Ambient Glow Behind Active Item */}
              <div
                className={`absolute -inset-4 rounded-2xl transition-opacity duration-500 pointer-events-none ${
                  isActive
                    ? 'opacity-100 bg-radial from-[#C5A869]/15 via-[#1C3D2F]/10 to-transparent'
                    : 'opacity-0 group-hover:opacity-50 bg-radial from-[#C5A869]/5 to-transparent'
                }`}
              />

              <div className="relative z-10 flex items-start space-x-5">
                {/* Typographic Epoch Stamp with Radar Pulse Ring */}
                <div className="shrink-0 flex flex-col items-center relative">
                  <span
                    className={`relative z-10 font-serif text-4xl sm:text-5xl font-light transition-all duration-300 select-none ${
                      isActive
                        ? 'text-[#C5A869] font-normal scale-105'
                        : 'text-[#3E5C48] group-hover:text-[#C5A869]'
                    }`}
                  >
                    {item.epoch}
                  </span>

                  {isActive && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-[#C5A869]/30 animate-radar-pulse pointer-events-none" />
                  )}

                  {/* Animated Connecting Vertical Spine */}
                  <div
                    className={`w-px h-16 sm:h-20 transition-all duration-700 ease-out mt-2 origin-top ${
                      timelineInView ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
                    } ${
                      isActive
                        ? 'bg-gradient-to-b from-[#C5A869] via-[#34D399] to-transparent shadow-[0_0_8px_#C5A869]'
                        : 'bg-[#1E3024] group-hover:bg-[#C5A869]/40'
                    }`}
                  />
                </div>

                {/* Editorial Content Block */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center space-x-2.5">
                    <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-[#34D399]">
                      {item.tag}
                    </span>
                    <span className="text-[#3A5242]">•</span>
                    <span className="font-mono text-xs text-[#8FA596]">
                      {item.year}
                    </span>
                  </div>

                  <h3
                    className={`font-serif text-xl sm:text-2xl transition-colors duration-300 leading-snug ${
                      isActive ? 'text-[#FAF8F2]' : 'text-[#D0DDD3] group-hover:text-[#FAF8F2]'
                    }`}
                  >
                    {item.title}
                  </h3>

                  <div className="text-xs uppercase tracking-wider font-mono text-[#C5A869]/90">
                    {item.subtitle}
                  </div>

                  <p className="text-xs sm:text-sm text-[#9EB0A3] leading-relaxed font-sans pt-1">
                    {item.description}
                  </p>

                  {item.detailQuote && (
                    <div className="pt-2 flex items-start space-x-2 text-xs font-serif italic text-[#C5A869]/90 border-l border-[#2F4D38] pl-3 mt-3">
                      <span className="text-sm leading-none text-[#34D399]">“</span>
                      <span>{item.detailQuote}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

StoryTimeline.displayName = 'StoryTimeline';
