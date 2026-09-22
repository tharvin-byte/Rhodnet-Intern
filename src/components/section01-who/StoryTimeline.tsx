import React from 'react';
import { whoAmIMilestones } from '../../data/timelineData';

export const StoryTimeline: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section Header */}
      <div className="text-center mb-16 space-y-3">
        <span className="font-mono text-xs tracking-widest uppercase text-[#C5A869] font-bold">
          MY FORMATIVE YEARS
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#FAF8F2]">
          Six Milestones That Shaped How I Think
        </h2>
        <div className="w-12 h-px bg-[#C5A869] mx-auto mt-4" />
      </div>

      {/* Vertical Timeline Track */}
      <div className="relative border-l border-[#22382A] ml-4 sm:ml-32 md:ml-40 space-y-12 pb-8">
        {whoAmIMilestones.map((item, index) => (
          <div key={item.id} className="relative pl-6 sm:pl-10 group">
            {/* Year Stamp on Left (Desktop) */}
            <div className="hidden sm:block absolute -left-32 md:-left-40 top-1 text-right w-24 md:w-32 pr-4 font-mono text-xs text-[#7A9181] group-hover:text-[#C5A869] font-semibold transition-colors">
              {item.year || `STAGE 0${index + 1}`}
            </div>

            {/* Timeline Bullet Marker with Pulse on Hover */}
            <div className="absolute -left-[6px] top-2 w-3 h-3 rounded-full bg-[#0E1712] border-2 border-[#34D399] group-hover:bg-[#C5A869] group-hover:border-[#C5A869] group-hover:scale-125 transition-all duration-300 shadow-sm" />

            {/* Content Card with Smooth Motion Lift */}
            <div className="bg-[#111B15]/85 backdrop-blur-sm p-6 sm:p-8 rounded border border-[#203426] hover:border-[#C5A869]/50 card-hover-lift transition-all duration-300 shadow-lg">
              {/* Top Tag & Mobile Year */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#34D399] bg-[#16291E] border border-[#234230] px-2.5 py-0.5 rounded">
                  {item.tag}
                </span>
                <span className="sm:hidden font-mono text-[11px] text-[#7A9181] font-semibold">
                  {item.year}
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#FAF8F2] mb-1 group-hover:text-[#C5A869] transition-colors">
                {item.title}
              </h3>

              <div className="text-xs uppercase tracking-wider font-mono text-[#8FA596] mb-4">
                {item.subtitle}
              </div>

              <p className="text-sm sm:text-base text-[#B0C0B4] leading-relaxed font-sans mb-4">
                {item.description}
              </p>

              {item.detailQuote && (
                <div className="pt-3 border-t border-[#1C2F22] flex items-start space-x-2 text-xs font-serif italic text-[#C5A869] quote-hover-glow cursor-default">
                  <span className="text-lg leading-none text-[#34D399]">“</span>
                  <span>{item.detailQuote}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
