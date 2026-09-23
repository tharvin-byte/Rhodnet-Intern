import React from 'react';

interface ExplodedStageProps {
  opacity: number;
  eyebrow: string;
  heading: string;
  desc: string;
  annotationTitle: string;
  annotationDesc: string;
  onOpenSpecs: () => void;
}

export const ExplodedStage: React.FC<ExplodedStageProps> = ({
  opacity,
  eyebrow,
  heading,
  desc,
  annotationTitle,
  annotationDesc,
  onOpenSpecs
}) => {
  return (
    <section
      className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-20 flex flex-col justify-center px-6 sm:px-14"
      style={{ opacity, visibility: opacity > 0 ? 'visible' : 'hidden' }}
    >
      <div className="max-w-[420px] flex flex-col items-start text-left">
        <div className="text-[#8c8c90] text-[10.5px] font-bold tracking-[0.2em] uppercase mb-3">
          {eyebrow || 'AUDIO QUALITY'}
        </div>

        <h2
          className="text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight mb-4"
          dangerouslySetInnerHTML={{ __html: heading || 'Wear all day<br>in total comfort' }}
        />

        <p className="text-[#8c8c90] text-sm font-normal leading-relaxed mb-6">
          {desc || 'Expertly crafted using premium materials, Beoplay H95 headphones embrace the ear for a luxurious and superior fit.'}
        </p>

        <button
          onClick={onOpenSpecs}
          className="border border-white/20 text-white text-[11px] font-bold tracking-[0.14em] uppercase px-5 py-3 rounded-[6px] hover:bg-white/10 transition-colors flex items-center gap-2 pointer-events-auto cursor-pointer mb-8"
        >
          LEARN MORE
          <span>→</span>
        </button>

        {/* Technical Annotation Card */}
        {annotationTitle && (
          <div className="w-full bg-white/5 border border-white/10 backdrop-blur-md p-5 rounded-xl text-left pointer-events-auto">
            <div className="text-white text-sm font-bold tracking-wide mb-2 flex items-center justify-between">
              <span>{annotationTitle}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#f43f5e]" />
            </div>
            <div className="w-full h-px bg-white/10 mb-3" />
            <div className="text-[#8c8c90] text-xs font-normal leading-relaxed">
              {annotationDesc}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
