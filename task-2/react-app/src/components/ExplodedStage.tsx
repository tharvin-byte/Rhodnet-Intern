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
      className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-20"
      style={{ opacity, visibility: opacity > 0 ? 'visible' : 'hidden' }}
    >
      {/*
        scene-content-position:
        CSS controls layout/centering — no GSAP touching this div.
        top: 50% + translateY(-50%) centers the entire text block
        at the same vertical midpoint as the headphone on the right.
      */}
      <div
        className="absolute"
        style={{
          left: 'clamp(36px, 3.75vw, 64px)',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 'min(440px, 42vw)',
        }}
      >
        {/*
          scene-content-motion:
          If animation is ever needed, animate THIS div (e.g. y, opacity).
          Keeps CSS centering separate from motion transforms.
        */}
        <div className="flex flex-col items-start text-left">

          {/* Eyebrow */}
          <div className="text-[#8c8c90] text-[10.5px] font-bold tracking-[0.2em] uppercase mb-[14px]">
            {eyebrow || 'AUDIO QUALITY'}
          </div>

          {/* Main heading */}
          <h2
            className="text-white font-extrabold leading-[1.08] tracking-[-0.01em] mb-[14px]"
            style={{ fontSize: 'clamp(28px, 3.2vw, 52px)' }}
            dangerouslySetInnerHTML={{ __html: heading || 'Wear all day<br>in total comfort' }}
          />

          {/* Description */}
          <p className="text-[#8c8c90] text-[14px] font-normal leading-[1.65] mb-[18px]" style={{ maxWidth: '360px' }}>
            {desc || 'Expertly crafted using premium materials, Beoplay H95 headphones embrace the ear for a luxurious and superior fit.'}
          </p>

          {/* CTA */}
          <button
            onClick={onOpenSpecs}
            className="border border-white/25 text-white text-[11px] font-bold tracking-[0.14em] uppercase px-5 py-[10px] rounded-[4px] hover:bg-white/10 transition-colors flex items-center gap-2 pointer-events-auto cursor-pointer mb-[24px]"
          >
            LEARN MORE
            <span>→</span>
          </button>

          {/* Feature annotation — part of the SAME content group, moves with the block */}
          {annotationTitle && (
            <div className="w-full text-left pointer-events-auto" style={{ maxWidth: '380px' }}>
              <h3 className="text-white text-[15px] font-bold tracking-tight mb-[8px]">
                {annotationTitle}
              </h3>
              {/* annotation-line-anchor — the dashed leader line x1,y1 is computed from this element's getBoundingClientRect() */}
              <div
                id="annotation-line-anchor"
                className="w-full h-[1px] mb-[12px]"
                style={{ background: 'rgba(255,255,255,0.18)' }}
              />
              <p className="text-[#8c8c90] text-[13px] font-normal leading-[1.6]">
                {annotationDesc}
              </p>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
