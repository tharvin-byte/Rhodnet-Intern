import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useStory } from '../../hooks/useStory';
import type { SectionId } from '../../hooks/useStory';

interface NavItem {
  id: SectionId;
  label: string;
  number: string;
}

// Hoisted static navigation schema — 0 runtime allocations per render
const NAV_ITEMS: readonly NavItem[] = [
  { id: 'who-am-i', number: '01', label: 'Who Am I?' },
  { id: 'compounding', number: '02', label: 'The $340B Math' },
  { id: 'principles', number: '03', label: 'Before The Fortune' },
  { id: 'vault', number: '04', label: 'The Berkshire Vault' },
];

export const Navbar: React.FC = React.memo(() => {
  const { activeSection, scrollToSection } = useStory();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Directly update the reading progress bar via DOM ref — 0 React re-renders on scroll!
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (progressBarRef.current) {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (totalScroll > 0) {
              const progress = Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100));
              progressBarRef.current.style.width = `${progress}%`;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback((id: SectionId) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  }, [scrollToSection]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#090E0B]/95 border-b border-[#1E3024] text-[#FAF8F2] transition-colors duration-300">
      {/* Narrative Reading Progress Bar in Gold with Dynamic Leading Glint Bead */}
      <div className="w-full h-[2.5px] bg-transparent overflow-hidden relative">
        <div
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-[#34D399] via-[#C5A869] to-[#FAF8F2] transition-none will-change-[width] relative shadow-[0_0_8px_rgba(197,168,105,0.7)]"
          style={{ width: '0%' }}
        >
          {/* Glinting Leading Tip */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#FAF8F2] shadow-[0_0_10px_#FAF8F2,0_0_6px_#C5A869] -mr-1 pointer-events-none" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand / Title */}
        <button
          onClick={() => handleNavClick('who-am-i')}
          className="text-left group focus:outline-none cursor-pointer"
        >
          <div className="flex items-center space-x-2.5">
            <span className="font-serif tracking-[0.18em] font-semibold text-sm sm:text-base uppercase text-[#FAF8F2] group-hover:text-[#C5A869] transition-colors">
              Warren Buffett
            </span>
            <span className="text-[10px] tracking-widest uppercase px-2 py-0.5 rounded font-mono border border-[#2A4433] bg-[#121E17] text-[#8FA596]">
              Archive
            </span>
          </div>
        </button>

        {/* Desktop Navigation (Strictly 4 Major Chapters) */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`group relative flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'text-[#FAF8F2] bg-[#1C3D2F] border border-[#34D399]/50 shadow-[0_0_15px_rgba(52,211,153,0.2)]'
                    : 'text-[#8FA596] hover:text-[#FAF8F2] hover:bg-[#121E17]'
                }`}
              >
                <span
                  className={`font-mono text-[10px] transition-colors duration-200 ${
                    isActive ? 'font-bold text-[#C5A869]' : 'text-[#627A6C]'
                  }`}
                >
                  {item.number}
                </span>
                <span className="tracking-wide font-sans">{item.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] ml-1 animate-pulse shadow-[0_0_6px_#34D399]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md focus:outline-none text-[#FAF8F2] hover:bg-[#15241B]"
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#1E3024] bg-[#0C1510] px-4 pt-3 pb-5 space-y-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-sm font-medium transition-all ${
                  isActive
                    ? 'text-[#C5A869] bg-[#15241B] border border-[#2F4A38]'
                    : 'text-[#8FA596] hover:text-[#FAF8F2]'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs opacity-75">{item.number}</span>
                  <span>{item.label}</span>
                </div>
                {isActive && (
                  <span className="text-xs font-mono tracking-widest text-[#C5A869]">
                    ACTIVE
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
});

Navbar.displayName = 'Navbar';
