import React, { useState } from 'react';
import { Canvas3D } from './components/Canvas3D';
import { SceneManager } from './three/SceneManager';
import { HeadphoneModel } from './three/HeadphoneModel';

export const App: React.FC = () => {
  const [colorway, setColorway] = useState<'champagne' | 'anthracite'>('champagne');
  const [isOrbitActive, setIsOrbitActive] = useState(false);
  const [headphoneModel, setHeadphoneModel] = useState<HeadphoneModel | null>(null);

  const handleSceneReady = (_scene: SceneManager, model: HeadphoneModel) => {
    setHeadphoneModel(model);
  };

  const handleColorChange = (newColor: 'champagne' | 'anthracite') => {
    setColorway(newColor);
    if (headphoneModel) {
      headphoneModel.setColorway(newColor);
    }
  };

  return (
    <main className="relative w-full min-w-full h-screen min-h-screen bg-[#151515] overflow-hidden select-none">
      {/* 1. Top Header Navigation */}
      <header className="absolute top-0 left-0 w-full h-[76px] px-6 sm:px-11 flex items-center justify-between z-40 pointer-events-auto">
        <a href="#" className="flex items-center gap-3 text-white no-underline">
          <span className="text-[10.5px] font-bold tracking-[0.16em] uppercase">BANG & OLUFSEN</span>
          <svg className="h-7 w-auto fill-white" viewBox="0 0 40 38">
            <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 4.8 2.7 8.9 6.7 11L6.7 38h11.6V23.5c4-2.1 6.7-6.2 6.7-11C25 5.6 19.4 0 12.5 0zm0 18.2c-3.1 0-5.7-2.6-5.7-5.7s2.6-5.7 5.7-5.7 5.7 2.6 5.7 5.7-2.6 5.7-5.7 5.7zM27.5 0C20.6 0 15 5.6 15 12.5c0 4.8 2.7 8.9 6.7 11L21.7 38h11.6V23.5c4-2.1 6.7-6.2 6.7-11C40 5.6 34.4 0 27.5 0zm0 18.2c-3.1 0-5.7-2.6-5.7-5.7s2.6-5.7 5.7-5.7 5.7 2.6 5.7 5.7-2.6 5.7-5.7 5.7z" />
          </svg>
        </a>

        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          <li><a href="#headphones" className="text-white text-[12.5px] font-normal tracking-wide opacity-100 hover:opacity-100 transition-opacity">Headphones</a></li>
          <li><a href="#services" className="text-white text-[12.5px] font-normal tracking-wide opacity-85 hover:opacity-100 transition-opacity">Services</a></li>
          <li><a href="#stories" className="text-white text-[12.5px] font-normal tracking-wide opacity-85 hover:opacity-100 transition-opacity">Stories</a></li>
          <li><a href="#accessories" className="text-white text-[12.5px] font-normal tracking-wide opacity-85 hover:opacity-100 transition-opacity">Accessories</a></li>
        </ul>

        <div className="flex items-center gap-3">
          {/* Colorway Switcher */}
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1">
            <button
              onClick={() => handleColorChange('champagne')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11.5px] font-medium transition-all ${
                colorway === 'champagne' ? 'bg-white/15 text-white' : 'text-[#8c8c90] hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#d8c8a8]" />
              Sand
            </button>
            <button
              onClick={() => handleColorChange('anthracite')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11.5px] font-medium transition-all ${
                colorway === 'anthracite' ? 'bg-white/15 text-white' : 'text-[#8c8c90] hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full border border-white/40 bg-[#1c1c1f]" />
              Black
            </button>
          </div>

          {/* 360 Orbit Toggle */}
          <button
            onClick={() => setIsOrbitActive(!isOrbitActive)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11.5px] font-medium transition-all border ${
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

      {/* 2. Hero Typography Layer (Centered behind and aligned with model) */}
      <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center justify-center pointer-events-none z-20">
        <h1 className="text-[clamp(85px,11.5vw,160px)] font-extrabold leading-[0.86] tracking-[-0.015em] bg-gradient-to-br from-[#cde6f8] via-[#f2d4ed] to-[#dbf4e7] bg-clip-text text-transparent mb-3">
          Pure
        </h1>
        <p className="text-[clamp(10.5px,1.1vw,14.5px)] font-semibold tracking-[0.52em] uppercase text-white mb-2 pl-[0.52em]">
          SUPERIOR SOUND
        </p>
        <span
          className="text-[clamp(65px,9.6vw,134px)] font-normal leading-[0.88] tracking-[-0.015em] text-transparent"
          style={{ WebkitTextStroke: '1.4px rgba(255, 255, 255, 0.48)' }}
        >
          expression
        </span>
      </div>

      {/* 3. Bottom Action & Info */}
      <div className="absolute bottom-6 sm:bottom-10 left-5 sm:left-11 z-20 pointer-events-auto">
        <button className="bg-white text-black text-[11.5px] font-bold tracking-[0.12em] uppercase px-6 sm:px-7 py-3 sm:py-3.5 rounded-[6px] flex items-center gap-2 hover:bg-neutral-200 transition-colors">
          SHOP NOW
          <svg className="w-3 h-3 stroke-current fill-none stroke-[2.5]" viewBox="0 0 24 24">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </button>
      </div>

      <div className="hidden sm:block absolute bottom-10 right-6 sm:right-11 max-w-[250px] text-left z-20 pointer-events-none">
        <h3 className="text-white text-sm font-bold tracking-wide mb-1">Beoplay H4 2nd Gen</h3>
        <p className="text-[#8c8c90] text-xs font-normal leading-relaxed">
          Buy a pair of headphones and get a free Raf Simons x Kvadrat headphone bag (while stock lasts).
        </p>
      </div>

      {/* 4. Three.js Canvas3D Imperative Layer */}
      <Canvas3D onSceneReady={handleSceneReady} isOrbitActive={isOrbitActive} />
    </main>
  );
};

export default App;
