import React from 'react';
import { useStory } from '../../context/StoryContext';

export const VaultReflection: React.FC = () => {
  const { scrollToSection } = useStory();

  return (
    <div className="py-24 text-center border-t border-[#23272E] bg-[#0A0C0E]">
      <div className="max-w-3xl mx-auto px-4 space-y-8">
        <div className="space-y-4">
          <p className="font-serif text-2xl sm:text-3xl text-[#9CA3AF] font-light">
            “My vault isn't just a list of stocks I happen to own.”
          </p>

          <div className="py-2">
            <div className="w-12 h-px bg-[#B39255] mx-auto" />
          </div>

          <p className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#EDEDE9] font-normal leading-tight">
            “It's a mirror of how Charlie and I lived our lives.”
          </p>
        </div>

        <p className="text-xs sm:text-sm text-[#6B7280] max-w-md mx-auto font-sans leading-relaxed">
          Predictable cash flows, enduring consumer habits, ethical partners, and decades of compounding without ever interrupting it unnecessarily.
        </p>

        <div className="pt-6">
          <button
            onClick={() => scrollToSection('who-am-i')}
            className="inline-flex items-center space-x-3 px-8 py-3.5 rounded-full bg-[#B39255] text-[#0E1012] hover:bg-[#C5A869] font-mono text-xs tracking-widest uppercase font-bold transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg group cursor-pointer"
          >
            <span>RETURN TO MY STORY</span>
            <span className="group-hover:translate-x-1 transition-transform duration-200">
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
