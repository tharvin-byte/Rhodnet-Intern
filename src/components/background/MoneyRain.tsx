import React, { useMemo } from 'react';

type TumbleType = 'flip' | 'rock' | 'glide';

interface NoteConfig {
  id: number;
  leftPercent: number;
  scale: number;
  fallDurationSec: number;
  fallDelaySec: number;
  swayDurationSec: number;
  swayDelaySec: number;
  tumbleDurationSec: number;
  tumbleDelaySec: number;
  tumbleType: TumbleType;
  swayDistancePx: number;
  driftXPx: number;
  rotXDeg: number;
  rotYDeg: number;
  rotZDeg: number;
  targetOpacity: number;
  blurPx: number;
  glintDurationSec: number;
  glintDelaySec: number;
  isDesktopOnly: boolean;
}

export const MoneyRain: React.FC = () => {
  // Generate 48 realistic falling banknotes with true 3D physics across three depth tiers
  const notes = useMemo<NoteConfig[]>(() => {
    const list: NoteConfig[] = [];
    const count = 48;

    for (let i = 0; i < count; i++) {
      // Natural distribution: 40% left flank, 40% right flank, 20% center drift
      const zoneType = i % 5;
      let leftPercent: number;

      if (zoneType <= 1) {
        // Left zone: 1% to 26%
        leftPercent = 1 + Math.random() * 25;
      } else if (zoneType <= 3) {
        // Right zone: 72% to 97%
        leftPercent = 72 + Math.random() * 25;
      } else {
        // Center area: 28% to 70%
        leftPercent = 28 + Math.random() * 42;
      }

      // Three distinct depth tiers for realistic optical perspective
      const depthTier = i % 3;
      let scale: number;
      let targetOpacity: number;
      let blurPx: number;
      let fallDurationSec: number;

      if (depthTier === 0) {
        // Foreground: large, crisp, prominent 3D presence
        scale = 0.96 + Math.random() * 0.18;
        targetOpacity = 0.46 + Math.random() * 0.14;
        blurPx = 0;
        fallDurationSec = 13 + Math.random() * 5; // 13-18s fall
      } else if (depthTier === 1) {
        // Midground: standard size, crisp
        scale = 0.76 + Math.random() * 0.14;
        targetOpacity = 0.32 + Math.random() * 0.10;
        blurPx = 0;
        fallDurationSec = 16 + Math.random() * 6; // 16-22s fall
      } else {
        // Background: smaller, subtle depth
        scale = 0.58 + Math.random() * 0.12;
        targetOpacity = 0.20 + Math.random() * 0.08;
        blurPx = 0.8;
        fallDurationSec = 20 + Math.random() * 8; // 20-28s fall
      }

      // Three distinct 3D tumbling modes
      const typeMod = i % 10;
      let tumbleType: TumbleType;
      if (typeMod < 4) {
        tumbleType = 'flip'; // Full 360° tumbling showing front and back
      } else if (typeMod < 8) {
        tumbleType = 'rock'; // Deep 3D rocking with pitch & roll
      } else {
        tumbleType = 'glide'; // Gentle floating descent
      }

      // Stagger start delay across the cycle so banknotes are continuously falling from moment 0
      const fallDelaySec = -(Math.random() * fallDurationSec);
      const swayDurationSec = 3.6 + Math.random() * 2.2;
      const swayDelaySec = Math.random() * 4;
      const tumbleDurationSec = tumbleType === 'flip' ? 7 + Math.random() * 4 : 5 + Math.random() * 3.5;
      const tumbleDelaySec = Math.random() * 5;
      const swayDistancePx = 25 + Math.random() * 35;
      const driftXPx = (Math.random() - 0.5) * 60;
      const rotXDeg = 25 + Math.random() * 35;
      const rotYDeg = 30 + Math.random() * 45;
      const rotZDeg = 14 + Math.random() * 26;
      const glintDurationSec = 3.5 + Math.random() * 3;
      const glintDelaySec = Math.random() * 3;

      list.push({
        id: i,
        leftPercent,
        scale,
        fallDurationSec,
        fallDelaySec,
        swayDurationSec,
        swayDelaySec,
        tumbleDurationSec,
        tumbleDelaySec,
        tumbleType,
        swayDistancePx,
        driftXPx,
        rotXDeg,
        rotYDeg,
        rotZDeg,
        targetOpacity,
        blurPx,
        glintDurationSec,
        glintDelaySec,
        isDesktopOnly: i >= 22, // 22 notes on mobile, 48 on desktop
      });
    }

    return list;
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none money-rain-viewport"
      aria-hidden="true"
    >
      {notes.map((note) => {
        const tumbleClass =
          note.tumbleType === 'flip'
            ? 'money-note-tumble-flip'
            : note.tumbleType === 'rock'
            ? 'money-note-tumble-rock'
            : 'money-note-tumble-glide';

        return (
          <div
            key={note.id}
            className={`money-note-container ${note.isDesktopOnly ? 'hidden md:block' : 'block'}`}
            style={
              {
                left: `${note.leftPercent}%`,
                '--fall-duration': `${note.fallDurationSec}s`,
                '--fall-delay': `${note.fallDelaySec}s`,
                '--drift-x': `${note.driftXPx}px`,
                '--target-opacity': note.targetOpacity,
              } as React.CSSProperties
            }
          >
            {/* Aerodynamic Sway Layer */}
            <div
              className="money-note-sway"
              style={
                {
                  '--sway-duration': `${note.swayDurationSec}s`,
                  '--sway-delay': `${note.swayDelaySec}s`,
                  '--sway-distance': `${note.swayDistancePx}px`,
                  '--rot-z': `${note.rotZDeg}deg`,
                } as React.CSSProperties
              }
            >
              {/* True 3D Tumbling & Perspective Layer */}
              <div
                className={tumbleClass}
                style={
                  {
                    '--tumble-duration': `${note.tumbleDurationSec}s`,
                    '--tumble-delay': `${note.tumbleDelaySec}s`,
                    '--rot-x': `${note.rotXDeg}deg`,
                    '--rot-y': `${note.rotYDeg}deg`,
                    transform: `scale(${note.scale})`,
                    filter: note.blurPx > 0 ? `blur(${note.blurPx}px)` : 'none',
                  } as React.CSSProperties
                }
              >
                {/* 3D Double-Sided Banknote Card */}
                <div className="money-card-3d">
                  {/* FRONT FACE: Authentic $100 Franklin Note */}
                  <div className="money-face money-front">
                    <svg
                      width="106"
                      height="46"
                      viewBox="0 0 106 46"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-full"
                    >
                      {/* Outer Parchment Margin / Border */}
                      <rect
                        x="0.5"
                        y="0.5"
                        width="105"
                        height="45"
                        rx="2"
                        fill="#192C20"
                        stroke="#A88B4B"
                        strokeWidth="1.1"
                      />

                      {/* Banknote Intaglio Green Inner Canvas */}
                      <rect
                        x="3"
                        y="3"
                        width="100"
                        height="40"
                        rx="1"
                        fill="#112017"
                        stroke="#2B543B"
                        strokeWidth="0.8"
                      />

                      {/* Ornate Intaglio Geometric Guilloché Border Line */}
                      <rect
                        x="5"
                        y="5"
                        width="96"
                        height="36"
                        fill="none"
                        stroke="#34D399"
                        strokeWidth="0.5"
                        strokeDasharray="2.5 1"
                        strokeOpacity="0.45"
                      />

                      {/* Top Banner: UNITED STATES OF AMERICA */}
                      <text
                        x="53"
                        y="9.5"
                        fontFamily="Georgia, serif"
                        fontSize="4"
                        fontWeight="bold"
                        letterSpacing="0.8"
                        fill="#E2CE9F"
                        textAnchor="middle"
                      >
                        THE UNITED STATES OF AMERICA
                      </text>

                      {/* Four Corner Denominations: 100 / $ */}
                      <text
                        x="7"
                        y="13"
                        fontFamily="Georgia, serif"
                        fontSize="6.5"
                        fontWeight="bold"
                        fill="#34D399"
                      >
                        $
                      </text>
                      <text
                        x="93"
                        y="13"
                        fontFamily="Georgia, serif"
                        fontSize="6.5"
                        fontWeight="bold"
                        fill="#34D399"
                      >
                        $
                      </text>

                      <text
                        x="7"
                        y="38"
                        fontFamily="Georgia, serif"
                        fontSize="6.5"
                        fontWeight="bold"
                        fill="#34D399"
                      >
                        100
                      </text>
                      <text
                        x="88"
                        y="38"
                        fontFamily="Georgia, serif"
                        fontSize="6.5"
                        fontWeight="bold"
                        fill="#34D399"
                      >
                        100
                      </text>

                      {/* Left Federal Reserve Bank Seal */}
                      <circle
                        cx="24"
                        cy="23"
                        r="6.5"
                        fill="#1C3828"
                        stroke="#34D399"
                        strokeWidth="0.7"
                      />
                      <text
                        x="24"
                        y="25"
                        fontFamily="sans-serif"
                        fontSize="4.5"
                        fontWeight="bold"
                        fill="#34D399"
                        textAnchor="middle"
                      >
                        B
                      </text>

                      {/* Right Treasury Seal */}
                      <circle
                        cx="82"
                        cy="23"
                        r="6.5"
                        fill="#2E2816"
                        stroke="#C5A869"
                        strokeWidth="0.7"
                      />
                      <path
                        d="M79,21 L85,21 L82,26 Z"
                        fill="#C5A869"
                      />

                      {/* Central Portrait Oval Frame */}
                      <ellipse
                        cx="53"
                        cy="23"
                        rx="14"
                        ry="12"
                        fill="#15261D"
                        stroke="#C5A869"
                        strokeWidth="0.9"
                      />
                      <ellipse
                        cx="53"
                        cy="23"
                        rx="12"
                        ry="10.5"
                        fill="none"
                        stroke="#477356"
                        strokeWidth="0.4"
                        strokeDasharray="1.5 1"
                      />

                      {/* Statesman Profile Silhouette inside Medallion */}
                      <path
                        d="M49,18 C49,15 56,15 56,18 C56,20 58,21 55,22 C57,24 56,27 54,28 C51,29 49,27 49,24 Z"
                        fill="#4D7A5C"
                        fillOpacity="0.85"
                      />
                      <path
                        d="M48,29 C47,31 59,31 58,29 Z"
                        fill="#4D7A5C"
                        fillOpacity="0.85"
                      />

                      {/* Bottom Denomination Banner */}
                      <rect
                        x="28"
                        y="36.5"
                        width="50"
                        height="5"
                        rx="1"
                        fill="#1C3626"
                      />
                      <text
                        x="53"
                        y="40.3"
                        fontFamily="sans-serif"
                        fontSize="3.2"
                        fontWeight="bold"
                        letterSpacing="0.6"
                        fill="#E2CE9F"
                        textAnchor="middle"
                      >
                        ONE HUNDRED DOLLARS
                      </text>
                    </svg>

                    {/* Dynamic Specular Light Glint */}
                    <div
                      className="money-glint"
                      style={
                        {
                          '--glint-duration': `${note.glintDurationSec}s`,
                          '--glint-delay': `${note.glintDelaySec}s`,
                        } as React.CSSProperties
                      }
                    />
                  </div>

                  {/* BACK FACE: Authentic $100 Reverse (Independence Hall) */}
                  <div className="money-face money-back">
                    <svg
                      width="106"
                      height="46"
                      viewBox="0 0 106 46"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-full"
                    >
                      {/* Outer Border */}
                      <rect
                        x="0.5"
                        y="0.5"
                        width="105"
                        height="45"
                        rx="2"
                        fill="#172A1E"
                        stroke="#A88B4B"
                        strokeWidth="1.1"
                      />

                      {/* Inner Canvas */}
                      <rect
                        x="3"
                        y="3"
                        width="100"
                        height="40"
                        rx="1"
                        fill="#0F1E15"
                        stroke="#2B543B"
                        strokeWidth="0.8"
                      />

                      {/* Ornate Guilloché Inner Border */}
                      <rect
                        x="5"
                        y="5"
                        width="96"
                        height="36"
                        fill="none"
                        stroke="#34D399"
                        strokeWidth="0.5"
                        strokeDasharray="2.5 1"
                        strokeOpacity="0.4"
                      />

                      {/* Top Banner: THE UNITED STATES OF AMERICA */}
                      <text
                        x="53"
                        y="9.5"
                        fontFamily="Georgia, serif"
                        fontSize="3.8"
                        fontWeight="bold"
                        letterSpacing="0.8"
                        fill="#E2CE9F"
                        textAnchor="middle"
                      >
                        THE UNITED STATES OF AMERICA
                      </text>

                      {/* Four Corner Denominations: 100 */}
                      <text
                        x="7"
                        y="13"
                        fontFamily="Georgia, serif"
                        fontSize="5.5"
                        fontWeight="bold"
                        fill="#34D399"
                      >
                        100
                      </text>
                      <text
                        x="89"
                        y="13"
                        fontFamily="Georgia, serif"
                        fontSize="5.5"
                        fontWeight="bold"
                        fill="#34D399"
                      >
                        100
                      </text>
                      <text
                        x="7"
                        y="38"
                        fontFamily="Georgia, serif"
                        fontSize="5.5"
                        fontWeight="bold"
                        fill="#34D399"
                      >
                        100
                      </text>
                      <text
                        x="89"
                        y="38"
                        fontFamily="Georgia, serif"
                        fontSize="5.5"
                        fontWeight="bold"
                        fill="#34D399"
                      >
                        100
                      </text>

                      {/* Motto: IN GOD WE TRUST */}
                      <text
                        x="53"
                        y="14.5"
                        fontFamily="Georgia, serif"
                        fontSize="3"
                        letterSpacing="0.6"
                        fill="#8FA596"
                        textAnchor="middle"
                      >
                        IN GOD WE TRUST
                      </text>

                      {/* Center Vignette: Independence Hall Engraving */}
                      <rect
                        x="32"
                        y="17"
                        width="42"
                        height="17"
                        rx="0.5"
                        fill="#14261B"
                        stroke="#2D5A3F"
                        strokeWidth="0.6"
                      />
                      {/* Tower & Spire */}
                      <rect
                        x="49.5"
                        y="14"
                        width="7"
                        height="18"
                        fill="#1A3324"
                        stroke="#34D399"
                        strokeWidth="0.5"
                      />
                      <polygon points="53,9 50,14 56,14" fill="#C5A869" />

                      {/* Hall Windows & Pillars */}
                      <line
                        x1="35"
                        y1="23"
                        x2="71"
                        y2="23"
                        stroke="#34D399"
                        strokeWidth="0.4"
                        strokeDasharray="1.5 1.5"
                      />
                      <line
                        x1="35"
                        y1="28"
                        x2="71"
                        y2="28"
                        stroke="#34D399"
                        strokeWidth="0.4"
                        strokeDasharray="1.5 1.5"
                      />
                      <text
                        x="53"
                        y="32"
                        fontFamily="sans-serif"
                        fontSize="2.2"
                        letterSpacing="0.4"
                        fill="#8FA596"
                        textAnchor="middle"
                      >
                        INDEPENDENCE HALL
                      </text>

                      {/* Bottom Denomination Banner */}
                      <rect
                        x="28"
                        y="36.5"
                        width="50"
                        height="5"
                        rx="1"
                        fill="#1C3626"
                      />
                      <text
                        x="53"
                        y="40.3"
                        fontFamily="sans-serif"
                        fontSize="3.2"
                        fontWeight="bold"
                        letterSpacing="0.6"
                        fill="#E2CE9F"
                        textAnchor="middle"
                      >
                        ONE HUNDRED DOLLARS
                      </text>
                    </svg>

                    {/* Dynamic Specular Light Glint */}
                    <div
                      className="money-glint"
                      style={
                        {
                          '--glint-duration': `${note.glintDurationSec}s`,
                          '--glint-delay': `${note.glintDelaySec}s`,
                        } as React.CSSProperties
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
