import React, { useRef, useCallback } from 'react';
import { useInView } from '../../hooks/useInView';
import { useCountUp } from '../../hooks/useCountUp';

export const WhoAmIHero: React.FC = React.memo(() => {
  const portraitRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);
  const { ref: statsRef, isInView: statsInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  const reignCount = useCountUp(60, {
    enabled: statsInView,
    duration: 1400,
    suffix: '+ Years',
  });

  const alphaCount = useCountUp(19.8, {
    enabled: statsInView,
    duration: 1600,
    decimals: 1,
    prefix: '~',
    suffix: '% (2x S&P)',
  });

  // Smooth 3D perspective mouse tilt with rAF batching & 0 React re-renders
  const handlePortraitMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (rafIdRef.current !== null) return;

    const clientX = e.clientX;
    const clientY = e.clientY;

    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null;
      const card = portraitRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = clientX - rect.left - rect.width / 2;
      const y = clientY - rect.top - rect.height / 2;
      const rotX = -(y / (rect.height / 2)) * 5;
      const rotY = (x / (rect.width / 2)) * 5;
      card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    });
  }, []);

  const handlePortraitMouseLeave = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    if (portraitRef.current) {
      portraitRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
  }, []);

  return (
    <div className="relative pt-24 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Subtle Atmospheric Spotlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#1C3D2F]/25 via-[#132B21]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Tag & Identity */}
        <div className="animate-text-reveal-1 flex flex-wrap items-center justify-between gap-4 border-b border-[#223528] pb-4 mb-12">
          <div className="flex items-center space-x-3">
            <span className="font-mono text-xs tracking-widest text-[#C5A869] font-bold uppercase">
              CHAPTER 01 / 04
            </span>
            <span className="text-[#3A5242]">•</span>
            <span className="font-mono text-xs tracking-wider text-[#8FA596] uppercase">
              BIOGRAPHY &amp; ORIGINS
            </span>
          </div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#132219]/90 border border-[#2A4433] text-[11px] font-mono tracking-widest uppercase text-[#C5A869] font-medium shadow-xs hover-border-glint">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
            <span>ORACLE OF OMAHA</span>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Headlines & Editorial Copy */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="animate-text-reveal-2 font-serif text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#FAF8F2] leading-[1.15]">
              WHO <span className="font-normal text-[#C5A869] drop-shadow-[0_2px_16px_rgba(197,168,105,0.25)]">AM I?</span>
            </h1>

            <p className="animate-text-reveal-3 font-serif text-xl sm:text-2xl text-[#C7D4CA] font-light leading-relaxed max-w-xl">
              Before the billions, I was simply an inquisitive boy from Omaha who became fascinated by the idea of making money work for me.
            </p>

            <div className="animate-text-reveal-4 pt-6 border-t border-[#223528] space-y-3">
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-wide text-[#FAF8F2]">
                  Warren Edward Buffett
                </span>
                <span className="font-sans text-xs tracking-wider uppercase text-[#C5A869] font-semibold mt-1">
                  Chairman &amp; CEO · Berkshire Hathaway
                </span>
              </div>
              <p className="text-sm sm:text-base text-[#9EB0A3] leading-relaxed font-sans max-w-lg">
                I was born in 1930 right here in Omaha, Nebraska, in the depths of the Great Depression. Since 1965, I've had the immense joy of steering Berkshire Hathaway—partnering with my dear friend Charlie Munger to build the longest unbroken compounding journey in modern history.
              </p>
            </div>

            {/* Quick stats rail with Live Count-Up */}
            <div
              ref={statsRef}
              className="animate-text-reveal-4 flex flex-wrap items-center gap-y-3 pt-6 border-t border-[#1E3024]"
            >
              <div className="pr-6 sm:pr-8 border-r border-[#1E3024]">
                <div className="font-mono text-[10px] text-[#7A9181] uppercase tracking-wider">Birthplace</div>
                <div className="font-serif font-bold text-sm sm:text-base text-[#FAF8F2] mt-0.5">Omaha, NE</div>
              </div>
              <div className="px-6 sm:px-8 border-r border-[#1E3024]">
                <div className="font-mono text-[10px] text-[#7A9181] uppercase tracking-wider">Berkshire Reign</div>
                <div className="font-serif font-bold text-sm sm:text-base text-[#FAF8F2] mt-0.5">
                  {reignCount}
                </div>
              </div>
              <div className="pl-6 sm:pl-8">
                <div className="font-mono text-[10px] text-[#7A9181] uppercase tracking-wider">Compounded Alpha</div>
                <div className="font-serif font-bold text-sm sm:text-base text-[#34D399] mt-0.5 stat-number-glow">
                  {alphaCount}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Real Warren Buffett Photograph with 3D Perspective Tilt */}
          <div className="lg:col-span-5 flex justify-center perspective-1000">
            <div
              onMouseMove={handlePortraitMouseMove}
              onMouseLeave={handlePortraitMouseLeave}
              className="relative w-full max-w-sm sm:max-w-md group animate-text-reveal-3 cursor-pointer"
            >
              {/* Outer Decorative Frames */}
              <div className="absolute -inset-3 rounded border border-[#273D30] -rotate-1 pointer-events-none group-hover:rotate-0 transition-transform duration-500" />
              <div className="absolute -inset-1.5 rounded border border-[#C5A869]/40 rotate-1 pointer-events-none group-hover:rotate-0 transition-transform duration-500" />

              <div
                ref={portraitRef}
                className="relative z-10 bg-[#111C15] rounded overflow-hidden shadow-2xl border border-[#2E4738] group-hover:border-[#C5A869]/70 transition-all duration-300 ease-out will-change-transform transform-style-3d hover-border-glint"
              >
                {/* Real High-Resolution Warren Buffett Photograph with Optimized Decoding */}
                <div className="overflow-hidden aspect-[4/5] relative">
                  <img
                    src="/warren-buffett.jpg"
                    alt="Warren Buffett Official Portrait"
                    className="w-full h-full object-cover object-top filter contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                  {/* Subtle editorial film grain & bottom shadow vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1712] via-transparent to-black/20 pointer-events-none" />
                </div>

                {/* Editorial Plaque Below Photo */}
                <div className="p-4 bg-[#0E1712] border-t border-[#22382A] flex items-center justify-between">
                  <div>
                    <div className="font-serif text-sm font-bold text-[#FAF8F2] tracking-wide">
                      WARREN E. BUFFETT
                    </div>
                    <div className="text-[10px] font-mono text-[#C5A869] uppercase tracking-widest mt-0.5">
                      Chairman &amp; CEO · Berkshire Hathaway
                    </div>
                  </div>
                  <div className="px-2 py-0.5 rounded bg-[#18281E] border border-[#2E4738] text-[9px] font-mono text-[#8FA596] uppercase">
                    ARCHIVE PHOTO
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

WhoAmIHero.displayName = 'WhoAmIHero';
