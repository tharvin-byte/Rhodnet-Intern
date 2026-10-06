import React from 'react';

interface NoteConfig {
  id: number;
  leftPercent: number;
  scale: number;
  fallDurationSec: number;
  fallDelaySec: number;
  driftXPx: number;
  targetOpacity: number;
  isDesktopOnly: boolean;
}

// 6 ambient drifting banknotes positioned STRICTLY along the outer margins to never obstruct content
const STATIC_NOTES: readonly NoteConfig[] = [
  // Left extreme margin (away from content)
  { id: 1, leftPercent: 1.5, scale: 0.82, fallDurationSec: 18.0, fallDelaySec: -2.0, driftXPx: 8, targetOpacity: 0.28, isDesktopOnly: false },
  { id: 2, leftPercent: 4.0, scale: 0.68, fallDurationSec: 23.0, fallDelaySec: -9.5, driftXPx: -6, targetOpacity: 0.20, isDesktopOnly: true },
  { id: 3, leftPercent: 2.5, scale: 0.75, fallDurationSec: 20.0, fallDelaySec: -5.0, driftXPx: 10, targetOpacity: 0.22, isDesktopOnly: true },

  // Right extreme margin (away from content)
  { id: 4, leftPercent: 94.5, scale: 0.80, fallDurationSec: 19.0, fallDelaySec: -4.0, driftXPx: -8, targetOpacity: 0.26, isDesktopOnly: false },
  { id: 5, leftPercent: 96.5, scale: 0.65, fallDurationSec: 24.0, fallDelaySec: -11.0, driftXPx: 6, targetOpacity: 0.18, isDesktopOnly: true },
  { id: 6, leftPercent: 93.0, scale: 0.88, fallDurationSec: 17.0, fallDelaySec: -8.0, driftXPx: -10, targetOpacity: 0.25, isDesktopOnly: false },
];

export const MoneyRain: React.FC = React.memo(() => {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none contain-strict"
      aria-hidden="true"
    >
      {/* SVG Defs: Single cached vector template in GPU memory */}
      <svg className="hidden" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <g id="banknote-front">
            <rect x="0.5" y="0.5" width="105" height="45" rx="2" fill="#122218" stroke="#A88B4B" strokeWidth="0.8" />
            <rect x="3" y="3" width="100" height="40" rx="1" fill="#0B1811" stroke="#254A33" strokeWidth="0.6" />
            <rect x="5" y="5" width="96" height="36" fill="none" stroke="#34D399" strokeWidth="0.4" strokeDasharray="2.5 1" strokeOpacity="0.35" />
            <text x="53" y="9.5" fontFamily="Georgia, serif" fontSize="3.8" fontWeight="bold" letterSpacing="0.8" fill="#E2CE9F" textAnchor="middle">
              THE UNITED STATES OF AMERICA
            </text>
            <text x="7" y="13" fontFamily="Georgia, serif" fontSize="6" fontWeight="bold" fill="#34D399">$</text>
            <text x="93" y="13" fontFamily="Georgia, serif" fontSize="6" fontWeight="bold" fill="#34D399">$</text>
            <text x="7" y="38" fontFamily="Georgia, serif" fontSize="6" fontWeight="bold" fill="#34D399">100</text>
            <text x="88" y="38" fontFamily="Georgia, serif" fontSize="6" fontWeight="bold" fill="#34D399">100</text>
            <circle cx="53" cy="23" r="11" fill="#101F16" stroke="#C5A869" strokeWidth="0.7" />
            <path d="M49,18 C49,15 56,15 56,18 C56,20 58,21 55,22 C57,24 56,27 54,28 C51,29 49,27 49,24 Z" fill="#4D7A5C" fillOpacity="0.7" />
            <rect x="30" y="36.5" width="46" height="5" rx="1" fill="#14281C" />
            <text x="53" y="40.2" fontFamily="sans-serif" fontSize="3" fontWeight="bold" letterSpacing="0.6" fill="#E2CE9F" textAnchor="middle">
              ONE HUNDRED DOLLARS
            </text>
          </g>
        </defs>
      </svg>

      {STATIC_NOTES.map((note) => (
        <div
          key={note.id}
          className={`money-note-container ${note.isDesktopOnly ? 'hidden xl:block' : 'block'}`}
          style={
            {
              left: `${note.leftPercent}%`,
              '--fall-duration': `${note.fallDurationSec}s`,
              '--fall-delay': `${note.fallDelaySec}s`,
              '--drift-x': `${note.driftXPx}px`,
              '--target-opacity': note.targetOpacity,
              transform: `scale(${note.scale})`,
            } as React.CSSProperties
          }
        >
          <div className="w-[100px] h-[44px] rounded-xs shadow-md opacity-70">
            <svg width="100" height="44" viewBox="0 0 106 46" className="w-full h-full">
              <use href="#banknote-front" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
});

MoneyRain.displayName = 'MoneyRain';
