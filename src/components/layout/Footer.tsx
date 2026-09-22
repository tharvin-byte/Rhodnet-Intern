import React from 'react';
import { useStory } from '../../context/StoryContext';

export const Footer: React.FC = () => {
  const { scrollToSection } = useStory();

  return (
    <footer className="border-t border-[#1E3024] bg-[#070B09]/95 text-[#7A9181] text-xs font-mono py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#1A281E]">
          <div className="space-y-1">
            <div className="font-serif text-lg text-[#FAF8F2] font-bold tracking-wide">
              WARREN BUFFETT PORTFOLIO ARCHIVE
            </div>
            <div className="text-[11px] text-[#8FA596]">
              A direct archive of my thoughts on compounding, capital allocation, and the building of Berkshire Hathaway.
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-[11px]">
            <button
              onClick={() => scrollToSection('who-am-i')}
              className="text-[#9CA3AF] hover:text-[#EDEDE9] transition-colors cursor-pointer"
            >
              01 WHO AM I?
            </button>
            <button
              onClick={() => scrollToSection('compounding')}
              className="text-[#9CA3AF] hover:text-[#EDEDE9] transition-colors cursor-pointer"
            >
              02 MY $340B JOURNEY
            </button>
            <button
              onClick={() => scrollToSection('principles')}
              className="text-[#9CA3AF] hover:text-[#EDEDE9] transition-colors cursor-pointer"
            >
              03 HOW I THINK
            </button>
            <button
              onClick={() => scrollToSection('vault')}
              className="text-[#C5A869] hover:text-[#FAF8F2] transition-colors cursor-pointer"
            >
              04 MY VAULT
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[11px] leading-relaxed text-[#6E8576]">
          <div>
            <strong className="text-[#8FA596] block mb-1 uppercase tracking-wider">
              Data Verification Sources
            </strong>
            Holdings, portfolio weights, and share counts reflect Berkshire Hathaway Inc. SEC Form 13F quarterly filings, the 2025 Berkshire Hathaway Annual Shareholder Report, and interim 2026 Form 10-Q disclosures. Figures are adjusted for stock splits and corporate actions where applicable.
          </div>

          <div>
            <strong className="text-[#8FA596] block mb-1 uppercase tracking-wider">
              Educational &amp; Archival Disclaimer
            </strong>
            This web application is an educational and analytical archive of Warren Buffett and Berkshire Hathaway. It does not constitute investment advice or personal financial endorsement. As Charlie and I always said: think for yourself.
          </div>
        </div>

        <div className="pt-4 border-t border-[#16261C] flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-[#5D7364]">
          <div>
            © {new Date().getFullYear()} Warren Buffett Archive. Crafted for inquisitive investors.
          </div>
          <div className="flex items-center space-x-2">
            <span>Berkshire Hathaway Inc. (NYSE: BRK.A / BRK.B)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
