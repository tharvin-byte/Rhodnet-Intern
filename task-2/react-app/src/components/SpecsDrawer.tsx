import React from 'react';

interface SpecsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpecsDrawer: React.FC<SpecsDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 w-full h-full bg-black/75 backdrop-blur-md z-[200] transition-opacity duration-350 flex justify-end ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-[500px] h-full bg-[#18181b] border-l border-white/10 p-8 sm:p-10 overflow-y-auto flex flex-col justify-between transition-transform duration-350 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
            <h3 className="text-white text-xl font-bold tracking-tight">Technical Specifications</h3>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white text-2xl font-light p-1 transition-colors border-0 bg-transparent cursor-pointer"
              aria-label="Close specifications drawer"
            >
              ×
            </button>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <div className="text-[#8c8c90] text-xs font-semibold uppercase tracking-wider mb-1">Sound</div>
              <div className="text-white text-sm font-semibold mb-1">Electro-dynamic Titanium Driver, 40mm diameter</div>
              <div className="text-[#636366] text-xs leading-relaxed">Frequency Range: 10 – 40,000 Hz. Custom acoustic tuning with Neodymium magnets.</div>
            </div>

            <div>
              <div className="text-[#8c8c90] text-xs font-semibold uppercase tracking-wider mb-1">Noise Cancellation</div>
              <div className="text-white text-sm font-semibold mb-1">Adaptive Active Noise Cancellation (ANC)</div>
              <div className="text-[#636366] text-xs leading-relaxed">Digital MEMS microphones adjust 200 times per second for acoustic isolation.</div>
            </div>

            <div>
              <div className="text-[#8c8c90] text-xs font-semibold uppercase tracking-wider mb-1">Materials</div>
              <div className="text-white text-sm font-semibold mb-1">Lambskin Leather, Foamed Urethane, Anodized Aluminum</div>
              <div className="text-[#636366] text-xs leading-relaxed">Radial spun touch surface, stainless steel telescopic sliders, braided cord.</div>
            </div>

            <div>
              <div className="text-[#8c8c90] text-xs font-semibold uppercase tracking-wider mb-1">Battery & Playtime</div>
              <div className="text-white text-sm font-semibold mb-1">Up to 38 hours with Bluetooth and ANC</div>
              <div className="text-[#636366] text-xs leading-relaxed">Up to 50 hours with Bluetooth only. USB-C fast charging (2 hours full charge).</div>
            </div>

            <div>
              <div className="text-[#8c8c90] text-xs font-semibold uppercase tracking-wider mb-1">Connectivity</div>
              <div className="text-white text-sm font-semibold mb-1">Bluetooth 5.3 & Hi-Res Wireless</div>
              <div className="text-[#636366] text-xs leading-relaxed">Codecs: LDAC (990 kbps), AAC, aptX™ Adaptive. Multipoint connection for 2 devices.</div>
            </div>

            <div>
              <div className="text-[#8c8c90] text-xs font-semibold uppercase tracking-wider mb-1">Dimensions & Weight</div>
              <div className="text-white text-sm font-semibold mb-1">185 W x 165 H x 80 D mm — 282 g</div>
              <div className="text-[#636366] text-xs leading-relaxed">Ergonomic memory foam cushion with contoured ear space chamber.</div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 mt-8">
          <div className="text-[#8c8c90] text-xs">Bang & Olufsen — Danish Design Excellence</div>
        </div>
      </div>
    </div>
  );
};
