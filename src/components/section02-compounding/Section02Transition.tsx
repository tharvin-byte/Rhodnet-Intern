import React from 'react';
import { useStory } from '../../context/StoryContext';

export const Section02Transition: React.FC = () => {
  const { scrollToSection } = useStory();

  return (
    <div className="py-20 text-center border-t border-b border-[#1E3024] bg-[#0C1510]/75 backdrop-blur-xs">
      <div className="max-w-3xl mx-auto px-4 space-y-6">
        <span className="font-mono text-xs tracking-widest text-[#C5A869] uppercase font-bold">
          TRANSITION TO CHAPTER 03
        </span>

        <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#FAF8F2] font-light leading-snug">
          “Now, let me tell you what Charlie and I actually look for before putting a single dollar of capital to work.”
        </p>

        <div className="pt-3">
          <button
            onClick={() => scrollToSection('principles')}
            className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-[#183123] hover:bg-[#C5A869] text-[#FAF8F2] hover:text-[#090E0B] border border-[#2E543C] hover:border-[#C5A869] font-mono text-xs tracking-widest uppercase font-bold transition-all duration-300 transform hover:-translate-y-1 shadow-lg group cursor-pointer"
          >
            <span>HOW CHARLIE &amp; I PICK BUSINESSES</span>
            <span className="group-hover:translate-y-0.5 transition-transform">↓</span>
          </button>
        </div>
      </div>
    </div>
  );
};
