# Design Specification: Bang & Olufsen Luxury Landing Page & 3D Exploded Animation

- **Date:** 2026-09-22
- **Topic:** Bang & Olufsen "Pure" Interactive Landing Page Replicating the Motion Concept
- **Author:** Antigravity Engineering
- **Status:** Approved for Implementation Planning

---

## 1. Executive Summary

This project replicates the viral **Bang & Olufsen landing page motion concept** designed by Taras Migulko ("They Make Design"). Originally rendered as a 20-second After Effects animation featuring Cinema 4D 3D assets, this project delivers a **live, fully interactive web application** running at 60 FPS in modern web browsers.

Beyond a passive video playback, this implementation provides:
1. **Full 3D Procedural Headphone Assembly** rendered in Three.js with realistic metallic and leather/foam PBR materials.
2. **Scroll-Driven & Scrubbable 3D Exploded View** disassembling the earcup into its physical engineering components with animated leader lines and callouts.
3. **Interactive Audio Frequency Wave Canvas** pulsating harmonically around the headphones.
4. **Dual Colorway Switcher** supporting real-time toggling between *Champagne Sand* and *Black Anthracite*.
5. **Interactive Component Hotspots & 360° Drag Orbit** allowing full user exploration of the industrial design.

---

## 2. Architecture & File Structure

The project uses a clean, high-performance vanilla web architecture without heavy build dependencies or bundler bloat, ensuring instant loading and maximum frame rate consistency.

```
e:\PROJECTS\animation\
├── index.html                  # Semantic HTML5 layout and section containers
├── styles/
│   ├── main.css                # Luxury design tokens, typography, layout, UI overlays
│   └── components.css          # Navigation, buttons, leader lines, specs drawer, controls
├── js/
│   ├── app.js                  # Main orchestrator & state manager
│   ├── scene.js                # Three.js scene, camera, studio lighting, renderer
│   ├── headphone-model.js      # Procedural 3D headphone geometry, materials, and layer rigs
│   ├── exploded-controller.js  # Scroll interpolation, exploded offsets, leader line tracker
│   ├── visualizer.js           # 2D Canvas audio frequency ripple visualizer
│   └── colorway-manager.js     # Real-time PBR material swap (Champagne Sand <-> Black Anthracite)
├── assets/
│   └── audio/                  # Ambient luxury sound sample / frequency tone
└── docs/
    └── superpowers/specs/
        └── 2026-09-22-bang-olufsen-landing-page-design.md
```

---

## 3. UI Design System & Typography

### 3.1 Color Palette
* **Obsidian Backdrop:** `#101012` (with subtle radial vignette to `#09090a`)
* **Warm Titanium / Gold Accent:** `#d4c2a7`
* **Champagne Foam Cushion:** `#e3d3bd` (subtle leather stipple texture)
* **Brushed Aluminum:** `#cfd3d8` (metallic 0.85, roughness 0.25)
* **Anthracite Black Finish:** `#1a1a1c` (metallic 0.6, roughness 0.35)
* **Graphite Dark Cushion:** `#262629`
* **Pure White Text:** `#ffffff`
* **Muted Editorial Text:** `#8e8e93`
* **Leader Line & Border Strokes:** `rgba(255, 255, 255, 0.18)`

### 3.2 Typography Hierarchy
* **Branding / Accent Headline:** `Cinzel` / `Playfair Display` (Serif, mammoth background display font `"Pure"`)
* **Headings:** `Plus Jakarta Sans` / `Inter` (700 weight, tight tracking `-0.02em`)
* **Category Eyebrow:** `Plus Jakarta Sans` (600 weight, uppercase, tracking `0.18em`, font size `11px`)
* **Body Copy:** `Inter` (400 weight, line-height `1.65`, font size `14px` - `15px`)

---

## 4. 3D Model & Exploded Anatomy Engine

### 4.1 Headphone Component Hierarchy
The 3D model is built using mathematically precise Three.js procedural geometries grouped for decoupled transformations:

1. **Headband Assembly:**
   * Arch curve geometry with top leather padding
   * Inner plush stitch contour
   * Twin brushed aluminum telescoping adjustment arms (`SliderArm_L`, `SliderArm_R`)
   * Dual-axis pivoting gimbals/yokes (`Yoke_L`, `Yoke_R`)
2. **Left Earcup (Static Anchor):**
   * Housing shell, driver grille, and leather ear cushion
3. **Right Earcup (Exploded Sub-Assembly Rig):**
   * **Component 1: Anodized Aluminum Outer Dial**
     * Radial-brushed circular disc with capacitive touch perimeter
     * Rest position: `X = 0`, Exploded offset: `+4.5 units`
   * **Component 2: Acoustic Dampening Ring & Chassis**
     * Perforated acoustic mesh ring and chassis mounting ring
     * Rest position: `X = 0`, Exploded offset: `+3.0 units`
   * **Component 3: DSP & Bluetooth 5.3 SoC Circuit Board**
     * Circular emerald/obsidian PCB with microchip detailing and gold contact traces
     * Rest position: `X = 0`, Exploded offset: `+1.8 units`
   * **Component 4: 40mm Custom Titanium Driver**
     * Concentric ribbed acoustic diaphragm and neodymium magnet core
     * Rest position: `X = 0`, Exploded offset: `+0.7 units`
   * **Component 5: Ergonomic Memory Foam Cushion**
     * Toroidal ultra-soft urethane foam cushion with breathable perforated leather cover
     * Rest position: `X = 0`, Exploded offset: `-1.2 units`

### 4.2 Interactive Exploded Leader Lines
* Screen-space 2D overlay SVG/Canvas anchored to 3D world coordinates via `camera.project(vector)`.
* Responsive technical line art connecting each floating layer to its corresponding metadata card:
  * *"Gesture Touch Surface"*
  * *"Acoustic Tuning Cavity"*
  * *"Neural ANC & Hi-Res DSP"*
  * *"40mm Electro-Dynamic Titanium Driver"*
  * *"Pressure-Relieving Memory Foam"*

---

## 5. Scroll Choreography & Camera Stages

The scroll timeline divides the page into 4 seamlessly interpolated stages:

* **Stage 0 (Scroll 0.00 – 0.25) — Hero ("Pure"):**
  * Headphones centered, gentle floating yaw oscillation (`±3°`).
  * Big `"PURE"` typography behind the model.
  * Audio wave canvas ripples outward.
* **Stage 1 (Scroll 0.25 – 0.50) — Sound & Lifestyle:**
  * Headphones pivot `45°` to reveal acoustic profile.
  * Wave visualizer intensifies; lifestyle editorial cutout card slides in.
* **Stage 2 (Scroll 0.50 – 0.80) — Ergonomics ("Wear all day in total comfort"):**
  * Model glides to the right viewport (`X: +1.8`), rotating to 90° lateral perspective.
  * Left column locks into place with ergonomic specifications and "LEARN MORE" action.
* **Stage 3 (Scroll 0.80 – 1.00) — Exploded View ("Control at your fingertip"):**
  * Right earcup expands into the 5 distinct exploded layers along its horizontal axis.
  * Technical leader lines trace out and anchor to floating labels.
  * Interactive hotspot beacons pulse and reveal detailed specs on hover/click.

---

## 6. Interactive Features & Controls

1. **Auto-Play Cinema Mode:** A play toggle that automatically scrubs through the 20-second camera path seamlessly like the original video.
2. **360° Drag Orbit Toggle:** Allows the user to break free of the scroll track and orbit the 3D model with mouse/touch drag.
3. **Colorway Selector Pill:**
   * `Champagne Sand`: `#d4c2a7` aluminum, `#e3d3bd` foam, `#silver` accents.
   * `Black Anthracite`: `#1c1c1e` aluminum, `#2b2b2e` foam, `#graphite` accents.
4. **Interactive Audio Wave Visualizer:** Audio toggle with real Web Audio synthesised gentle ambient chord and dynamic canvas frequency bars.
5. **Specs Modal / Drawer:** Clicking "LEARN MORE" or component badges reveals full technical specifications (frequency response 10Hz–40,000Hz, battery life 38h, weight 282g).

---

## 7. Performance & Verification Plan

* **Target Frame Rate:** 60 FPS on standard desktop & laptop GPUs.
* **Memory Footprint:** < 35 MB total memory.
* **Responsive Breakpoints:** Fully responsive across wide desktop (1920px), standard laptop (1440px/1280px), tablet (768px), and mobile (390px).
* **Cross-Browser Verification:** Verified in Chrome, Edge, Safari, and Firefox.
