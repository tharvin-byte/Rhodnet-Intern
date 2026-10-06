import React from 'react';
import { useStory } from '../../hooks/useStory';
import { useInView } from '../../hooks/useInView';

export const VaultReflection: React.FC = React.memo(() => {
  const { scrollToSection } = useStory();
  const { ref: reflectionRef, isInView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div ref={reflectionRef} className="py-24 text-center border-t border-[#1E3024] bg-transparent">
      <div className="max-w-3xl mx-auto px-4 space-y-8">
        <div className="space-y-4">
          <p className="font-serif text-2xl sm:text-3xl text-[#8FA596] font-light">
            “My vault isn't just a list of stocks I happen to own.”
          </p>

          <div className="py-2">
            <div
              className={`w-24 h-px bg-gradient-to-r from-transparent via-[#C5A869] to-transparent mx-auto transition-all duration-700 ease-out origin-center ${
                isInView ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
              }`}
            />
          </div>

          <p className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FAF8F2] font-normal leading-tight">
            “It's a mirror of how Charlie and I lived our lives.”
          </p>
        </div>

        <p className="text-xs sm:text-sm text-[#8FA596] max-w-md mx-auto font-sans leading-relaxed">
          Predictable cash flows, enduring consumer habits, ethical partners, and decades of compounding without ever interrupting it unnecessarily.
        </p>

        <div className="pt-6">
          <button
            onClick={() => scrollToSection('who-am-i')}
            className="inline-flex items-center space-x-3 px-8 py-3.5 rounded-full bg-[#C5A869] text-[#090E0B] hover:bg-[#D4BC7D] font-mono text-xs tracking-widest uppercase font-bold transition-all duration-300 transform hover:-translate-y-1 shadow-xl hover:shadow-[0_0_20px_rgba(197,168,105,0.4)] group cursor-pointer active:scale-95"
          >
            <span>RETURN TO THE STORY</span>
            <span className="group-hover:translate-x-1.5 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] inline-block">
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
});

VaultReflection.displayName = 'VaultReflection';
