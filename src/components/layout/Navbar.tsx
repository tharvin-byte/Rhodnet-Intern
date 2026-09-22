import React, { useState } from 'react';
import { useStory } from '../../context/StoryContext';
import type { SectionId } from '../../context/StoryContext';

export const Navbar: React.FC = () => {
  const { activeSection, readingProgress, scrollToSection } = useStory();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: SectionId; label: string; number: string }[] = [
    { id: 'who-am-i', number: '01', label: 'Who Am I?' },
    { id: 'compounding', number: '02', label: 'My $340B Math' },
    { id: 'principles', number: '03', label: 'How I Think' },
    { id: 'vault', number: '04', label: 'My Vault' },
  ];

  const handleNavClick = (id: SectionId) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#090E0B]/90 border-b border-[#1E3024] text-[#FAF8F2] backdrop-blur-md transition-colors duration-300">
      {/* Narrative Reading Progress Bar in Gold */}
      <div className="w-full h-[2px] bg-transparent overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#34D399] to-[#C5A869] transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand / Title */}
        <button
          onClick={() => handleNavClick('who-am-i')}
          className="text-left group focus:outline-none"
        >
          <div className="flex items-center space-x-2.5">
            <span className="font-serif tracking-[0.2em] font-bold text-sm sm:text-base uppercase text-[#FAF8F2] group-hover:text-[#C5A869] transition-colors">
              Warren Buffett
            </span>
            <span className="text-[10px] tracking-widest uppercase px-2 py-0.5 rounded font-mono border border-[#2A4433] bg-[#121E17] text-[#8FA596]">
              Archive
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-3">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`group flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs lg:text-sm font-medium transition-all ${
                  isActive
                    ? 'text-[#C5A869] bg-[#15241B] border border-[#2F4A38] shadow-xs'
                    : 'text-[#8FA596] hover:text-[#FAF8F2] hover:bg-[#111C15]'
                }`}
              >
                <span
                  className={`font-mono text-[11px] ${
                    isActive ? 'font-bold text-[#34D399]' : 'opacity-60'
                  }`}
                >
                  {item.number}
                </span>
                <span className="tracking-wide font-sans">{item.label}</span>
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-[#C5A869] ml-1 animate-pulse" />
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
          {navItems.map((item) => {
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
};
