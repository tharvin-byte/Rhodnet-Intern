import React from 'react';

interface HeaderNavProps {
  colorway: 'champagne' | 'anthracite';
  onColorChange: (color: 'champagne' | 'anthracite') => void;
  isOrbitActive: boolean;
  onToggleOrbit: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  onNavClick: (progress: number) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  colorway,
  onColorChange,
  isOrbitActive,
  onToggleOrbit,
  isAudioPlaying,
  onToggleAudio,
  onNavClick
}) => {
  return (
    <header className="absolute top-0 left-0 w-full h-[76px] px-6 sm:px-11 flex items-center justify-between z-40 pointer-events-auto">
      <a href="#" className="flex items-center gap-3 text-white no-underline">
        <span className="text-[10.5px] font-bold tracking-[0.16em] uppercase">BANG & OLUFSEN</span>
        <svg className="h-7 w-auto fill-white" viewBox="0 0 40 38">
          <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 4.8 2.7 8.9 6.7 11L6.7 38h11.6V23.5c4-2.1 6.7-6.2 6.7-11C25 5.6 19.4 0 12.5 0zm0 18.2c-3.1 0-5.7-2.6-5.7-5.7s2.6-5.7 5.7-5.7 5.7 2.6 5.7 5.7-2.6 5.7-5.7 5.7zM27.5 0C20.6 0 15 5.6 15 12.5c0 4.8 2.7 8.9 6.7 11L21.7 38h11.6V23.5c4-2.1 6.7-6.2 6.7-11C40 5.6 34.4 0 27.5 0zm0 18.2c-3.1 0-5.7-2.6-5.7-5.7s2.6-5.7 5.7-5.7 5.7 2.6 5.7 5.7-2.6 5.7-5.7 5.7z" />
        </svg>
      </a>

      <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
        <li>
          <button
            onClick={() => onNavClick(0.0)}
            className="text-white text-[12.5px] font-normal tracking-wide opacity-85 hover:opacity-100 transition-opacity bg-transparent border-0 cursor-pointer p-0"
          >
            Headphones
          </button>
        </li>
        <li>
          <button
            onClick={() => onNavClick(0.20)}
            className="text-white text-[12.5px] font-normal tracking-wide opacity-85 hover:opacity-100 transition-opacity bg-transparent border-0 cursor-pointer p-0"
          >
            Services
          </button>
        </li>
        <li>
          <button
            onClick={() => onNavClick(0.35)}
            className="text-white text-[12.5px] font-normal tracking-wide opacity-85 hover:opacity-100 transition-opacity bg-transparent border-0 cursor-pointer p-0"
          >
            Stories
          </button>
        </li>
        <li>
          <button
            onClick={() => onNavClick(0.52)}
            className="text-white text-[12.5px] font-normal tracking-wide opacity-85 hover:opacity-100 transition-opacity bg-transparent border-0 cursor-pointer p-0"
          >
            Accessories
          </button>
        </li>
      </ul>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Colorway Pill */}
        <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1">
          <button
            onClick={() => onColorChange('champagne')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-[11.5px] font-medium transition-all ${
              colorway === 'champagne' ? 'bg-white/15 text-white' : 'text-[#8c8c90] hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#d8c8a8]" />
            Sand
          </button>
          <button
            onClick={() => onColorChange('anthracite')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-[11.5px] font-medium transition-all ${
              colorway === 'anthracite' ? 'bg-white/15 text-white' : 'text-[#8c8c90] hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full border border-white/40 bg-[#1c1c1f]" />
            Black
          </button>
        </div>

        {/* Ambient Audio Synth Button */}
        <button
          onClick={onToggleAudio}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] sm:text-[11.5px] font-medium transition-all border ${
            isAudioPlaying
              ? 'bg-white/20 text-[#22c55e] border-[#22c55e]/40 shadow-[0_0_10px_rgba(34,197,94,0.3)]'
              : 'bg-white/5 text-[#8c8c90] border-white/10 hover:text-white'
          }`}
          title="Toggle ambient audio"
        >
          <span className="flex items-end gap-0.5 h-3 w-3">
            <span className={`w-0.5 bg-current rounded-full ${isAudioPlaying ? 'animate-pulse h-3' : 'h-1.5'}`} />
            <span className={`w-0.5 bg-current rounded-full ${isAudioPlaying ? 'animate-pulse h-2' : 'h-2.5'}`} />
            <span className={`w-0.5 bg-current rounded-full ${isAudioPlaying ? 'animate-pulse h-3.5' : 'h-1.5'}`} />
          </span>
          Audio
        </button>

        {/* 360 Orbit Toggle */}
        <button
          onClick={onToggleOrbit}
          className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-[11.5px] font-medium transition-all border ${
            isOrbitActive
              ? 'bg-white/20 text-white border-white/40 shadow-[0_0_12px_rgba(255,255,255,0.2)]'
              : 'bg-white/5 text-[#8c8c90] border-white/10 hover:text-white'
          }`}
        >
          <svg className="w-3.5 h-3.5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.83 6.72 2.24" />
            <path d="M21 3v6h-6" />
          </svg>
          360° Orbit
        </button>
      </div>
    </header>
  );
};
