# BANG & OLUFSEN “PURE”
## ANTIGRAVITY BUILD SPECIFICATION

Reference video: https://youtu.be/Uo9c85M_0uA  
Public design attribution: Taras Migulko — Bang & Olufsen landing page concept.  
Primary implementation target: responsive React experience with cinematic, scroll-driven product motion.

---

# 0. MISSION

Create a faithful browser-based recreation of the visual and motion experience shown in the supplied Bang & Olufsen “Pure” reference video. This is a recreation, not a redesign and not a generic Bang & Olufsen-themed website. The reference experience should remain the single visual source of truth for composition, product scale, typography, negative space, scene transitions, and motion choreography. Where the source cannot be measured frame-by-frame from the public video URL, use the numeric values in this document only as implementation baselines and tune them against actual playback.

## Non-negotiable direction — do NOT add
- Generic e-commerce grids.
- Product cards or “related products” carousels.
- Testimonials, reviews, social proof, logos, trust badges, star ratings.
- Pricing tables, subscription blocks, financing widgets, shopping-cart UI.
- Blog/news sections.
- Feature-card grids.
- Large FAQ accordions.
- Generic newsletter signup.
- Marketing statistics or KPI counters.
- A conventional multi-column footer unless the reference clearly contains one.
- Giant pill-shaped buttons, glassmorphism, neon gradients, floating dashboard cards.
- Random particles, blobs, 3D decorations, or visual effects not present in the reference.
- Extra B&O products merely because they are available on the real brand site.
- Unrelated sections that make the page longer “because normal sites have them.”
- Independent animation on every element. The page must read as one coordinated motion system.
- A different visual identity. Do not “improve” the concept into a modern startup template.

---

# 1. TARGET EXPERIENCE

Ranked visual priorities:

1. **Composition and headphone silhouette** — the product must occupy the same visual importance and approximate screen region as the reference.
2. **Typography and negative space** — the large editorial type, small metadata, and empty canvas must preserve the same tension.
3. **Motion choreography** — the product, type, and UI must move as a coordinated cinematic sequence.
4. **Scene-to-scene continuity** — transitions should morph the composition instead of switching between unrelated sections.
5. **Product depth and rotation** — the headphone should feel physical, with restrained 3D-like orientation and camera movement.
6. **Minimal UI** — navigation and CTA should support the scene, not compete with it.
7. **Responsive art direction** — mobile must be recomposed, not merely scaled down.
8. **Performance and robustness** — no frame drops caused by oversized assets, no ScrollTrigger/pinning bugs, no layout shifts.

Success test: at a glance, a designer familiar with the reference should identify the reference composition and motion language before reading any text.

---

# 2. RECOMMENDED STACK

| Layer | Choice | Why |
|---|---|---|
| App | React + Vite | Fast iteration and component isolation for a motion-heavy landing page. |
| Styling | Tailwind CSS + CSS custom properties | Precise layout plus centralized design tokens. |
| Motion | GSAP | Fine-grained control of overlapping timelines, transform interpolation, and easing. |
| Scroll choreography | GSAP ScrollTrigger | Pinning, scrubbed progress, scene state transitions, and scroll-controlled camera/product movement. |
| Smooth scrolling | Lenis | Provides controlled interpolation while keeping ScrollTrigger in charge of the scene logic. |
| 3D | React Three Fiber / Three.js only if needed | Use genuine 3D only when the product rotation or separation cannot be reproduced convincingly with 2.5D/image-sequence techniques. |
| Image sequence | WebP/AVIF frames or optimized PNG fallback | Appropriate if the source product motion is better represented by pre-rendered frames than a real-time 3D asset. |
| Accessibility | Native HTML + prefers-reduced-motion | Maintain semantic controls and a deterministic reduced-motion path. |

Rule: **Do not default to Three.js.** First prove that the reference motion needs a real 3D scene. If the product can be reproduced with transparent renders and layered transforms, prefer that simpler path.

---

# 3. ARCHITECTURE

Size the project around the four major visual scenes visible in the reference instead of creating a generic landing-page template.

## Folder structure

- `src/app/`
  - `App`
  - route/bootstrap only
- `src/components/`
  - `Header`
  - `BrandMark`
  - `MenuTrigger`
  - `CTA`
  - `ProductMeta`
  - `ProgressRail` if visible in the reference
- `src/sections/`
  - `Scene01Hero`
  - `Scene02ProductTransition`
  - `Scene03ProductDetail`
  - `Scene04Recomposition`
- `src/motion/`
  - `motionTokens`
  - `scene01Motion`
  - `scene02Motion`
  - `scene03Motion`
  - `scene04Motion`
  - `masterSceneController`
- `src/hooks/`
  - `useLenis`
  - `useReducedMotion`
  - `useResponsiveMotion`
  - `useSceneProgress`
- `src/data/`
  - `sceneConfig`
  - `productConfig`
  - `assetManifest`
- `src/assets/`
  - `product/`
  - `typography/`
  - `ui/`
  - `textures/`
- `src/styles/`
  - `globals`
  - `typography`
  - `motion`
- `public/`
  - preloadable hero assets only

## Responsibility rule

Sections define **what the composition is**.  
Motion files define **how it moves**.  
Data files define **which values/assets are used**.  
Components define **reusable UI primitives**.

Do not put long GSAP timelines directly inside presentational UI components.

---

# 4. GLOBAL DESIGN SYSTEM

The reference has a near-black premium canvas, warm editorial whites, thin low-contrast lines, and a restrained stone/limestone product tone.

## Baseline design tokens

| Token | Baseline |
|---|---|
| `--bg` | `#0B0B0B` |
| `--bg-soft` | `#101010` |
| `--fg` | `#E9E6DF` |
| `--fg-muted` | `#A39E95` |
| `--fg-faint` | `#77736D` |
| `--line` | `rgba(233,230,223,0.16)` |
| `--line-strong` | `rgba(233,230,223,0.28)` |
| `--product-limestone` | `#D8CFBA` |
| `--product-shadow` | `rgba(0,0,0,0.38)` |
| `--display-serif` | editorial serif comparable to Cormorant Garamond / Bodoni-like |
| `--ui-sans` | Inter / Helvetica Neue / Arial fallback |

These are **visual baselines inferred from the supplied reference**, not sampled source-file values.

## Spacing philosophy

Use wide negative space and a 4 px base rhythm with major spacing in 8/16/24/32/48/64/96 px increments.

Desktop outer padding:
- baseline: 36–56 px.
- preferred starting point: 48 px.

Header vertical footprint:
- approximately 48–64 px.

Do not fill empty space merely because it is available.

---

# 5. TYPOGRAPHY

## Pairing

### Display
Use an elegant high-contrast serif:
- preferred baseline: Cormorant Garamond, Canela-like, Bodoni-like, or another editorial serif with thin/thick contrast.
- font size baseline: 120–190 px on large desktop depending on viewport.
- line-height: 0.82–0.95.
- tracking: -0.04em to -0.01em for large display type unless reference playback shows otherwise.

### UI
Use Inter / Helvetica Neue:
- 10–14 px.
- uppercase where shown.
- letter spacing: 0.12em–0.22em.
- muted color/opacity.

## Animation rule

Major display type must animate as a **layered reveal**, not a single opacity fade.

Baseline before → after:
- opacity: `0 → 1`
- y: `28–48 px → 0`
- blur: `7–10 px → 0`
- clip/mask: hidden from bottom or side → fully revealed
- duration: `0.75–1.10 s`
- easing: `power3.out` or `power4.out`

For large outlined/background type:
- opacity baseline: `0.18–0.55`, never full foreground contrast;
- x offset: `-40 to +40 px` baseline;
- scale: `0.98 → 1.00`;
- duration: `1.2–2.0 s`;
- easing: `power4.inOut`.

Do not reveal every text element with the exact same start time.

---

# 6. KEY STRUCTURAL SECTION — HEADER

## DOM/component sketch

`PageShell → SceneStage → Header → BrandMark + MinimalNav/MenuTrigger`

The header belongs to the visual stage; it is not a conventional full-width ecommerce navbar.

## Layout

Desktop:
- left: small wordmark/brand mark.
- right: minimal menu/utility control if visible.
- vertical alignment: near the upper frame/border.
- max width should match the stage rather than the full viewport.

## Motion

Initial:
- opacity: `0 → 1`
- y: `-8 → 0 px`
- duration: `0.55–0.80 s`
- easing: `power2.out`
- delay: `0.15–0.35 s`

During major scene transitions:
- keep header mostly stable;
- allow at most subtle opacity/translation changes if the reference shows it;
- do not rotate the header or push it dramatically around the page.

## Interaction

Menu/compact control:
- hover x/arrow drift: `0 → 4–6 px`
- duration: `0.25–0.35 s`
- easing: `power2.out`

No large hover transformations.

---

# 7. KEY STRUCTURAL SECTION — HERO / SCENE 01

## Purpose

Establish the product as the central object and create the editorial “Pure / Superior Sound” relationship around it.

## Visual composition

Use a pinned stage with:
- large display type;
- headphone product;
- minimal metadata;
- small CTA;
- dark canvas/frame;
- generous empty space.

## Product entrance baseline

Before:
- opacity `0`
- scale `0.88–0.92`
- y `+24–36 px`
- rotateY `-4° to -6°`
- rotateZ `-1° to -2°`

After:
- opacity `1`
- scale `1.00`
- y `0`
- rotateY near `0°`
- rotateZ near `0°`

Duration: `1.4–2.0 s`  
Easing: `power4.out` / `expo.out`

## Typography entrance baseline

Primary serif:
- starts y `+32–48 px`
- opacity `0`
- blur `7–10 px`
- clip/mask closed
- ends y `0`
- opacity `1`
- blur `0`

Duration: `0.80–1.10 s`  
Delay relative to product start: `0.10–0.35 s`

Small uppercase label:
- opacity `0 → 1`
- y `+8–12 → 0 px`
- duration `0.45–0.65 s`
- easing `power2.out`

CTA/meta:
- opacity `0 → 1`
- y `+8–12 → 0`
- duration `0.45–0.65 s`
- delay `0.20–0.45 s` after headline begins.

---

# 8. KEY STRUCTURAL SECTION — PRIMARY VISUAL / PRODUCT SYSTEM

The product is the most important moving object in the experience.

## Preferred implementation path

1. Use an exact or closely matched transparent product render if available.
2. Use a real GLB/GLTF model only if the source motion genuinely requires continuous 3D rotation/explosion.
3. Use a rendered image sequence if real-time 3D would add unnecessary complexity.
4. Never use a flat rectangular product photo with a visible white background.

## Product scene graph

`ProductVisual → ProductGroup → Headband + LeftCup + RightCup + Cushion/Layers + Shadow`

Each moving part must have its own transform origin.

## Depth model

Even in a 2D recreation, treat the product as multiple depth layers:
- shadow = far/background depth;
- body/headphones = central depth;
- highlights/reflections = foreground depth;
- typography = independent depth plane.

## Rotation baseline

For a restrained cinematic orbit:
- rotateY: `-6° → +6° to +10°`
- rotateX: `0° → +2° to +4°`
- rotateZ: `-1° → +1°`
- scale during camera move: `1.00 → 1.06–1.16`

Duration: `1.5–2.4 s`  
Easing: `power3.inOut` / `power4.inOut`

These are baselines to tune against playback.

---

# 9. MOTION SYSTEM — CORE PRINCIPLES

The reference motion should read as **one continuous cinematic choreography**.

Principles:
- large product motion = slowest/most physical;
- typography motion = quicker and sharper;
- micro UI motion = shortest;
- transitions overlap;
- scenes hold for a moment before the next movement;
- never stop one animation abruptly to start another.

Use a “handoff” approach:
- previous state is still moving while next state starts;
- product, type, and metadata rarely start/finish simultaneously.

---

# 10. MOTION SYSTEM — CENTRAL MOTION TOKENS

Create a single motion-token source and make every scene reference it.

| Token | Baseline value |
|---|---:|
| `uiFast` | 0.28 s |
| `uiShort` | 0.45 s |
| `uiMedium` | 0.65 s |
| `reveal` | 0.90 s |
| `cinematic` | 1.60 s |
| `cinematicLong` | 2.20 s |
| `productOrbit` | 1.80 s |
| `productExplode` | 2.00 s |
| `productReassemble` | 1.80 s |
| `sceneHold` | 0.70–1.30 s |
| `scrollScrubDesktop` | 1.0–1.4 |
| `scrollScrubMobile` | 0.65–0.90 |

## Easing tokens

| Token | Easing |
|---|---|
| `uiOut` | `power2.out` |
| `revealOut` | `power3.out` |
| `cinematicInOut` | `power4.inOut` |
| `cinematicOut` | `expo.out` or `power4.out` |
| `returnInOut` | `power3.inOut` |

Do not use one easing function for every motion.

---

# 11. MOTION SYSTEM — SCENE 01 HERO MOTION

Sequence:

1. Canvas/frame appears.
2. Product begins entering.
3. Main serif reveal starts slightly after product.
4. Supporting uppercase type appears.
5. Product completes settle.
6. CTA/meta enters.
7. Short hold.

Baseline overlap:
- headline begins while product is ~20–40% through entrance;
- metadata begins while headline is ~55–70% complete.

## Product movement

Before → after:
- scale `0.90 → 1.00`
- y `+30 → 0`
- rotationY `-4° → 0°`
- rotationZ `-1° → 0°`
- opacity `0 → 1`

## Text movement

Before → after:
- y `+40 → 0`
- opacity `0 → 1`
- blur `8px → 0`
- clip `closed → open`

## Hold

After the intro completes, hold the composition for approximately `0.70–1.20 s`.

This hold is a baseline, not a measured source timing.

---

# 12. MOTION SYSTEM — SCENE 02 PRODUCT ROTATION / TRANSFORMATION

This scene should feel like the camera is moving around the headphone.

## Primary motion

Product:
- rotateY `-6° → +8°`
- rotateX `0° → +2°`
- x `0 → +60–120 px`
- y `0 → -10–30 px`
- scale `1.00 → 1.06–1.14`

Typography:
- x `0 → -50 to -100 px`
- scale `1.00 → 0.98–1.02`
- opacity `1.00 → 0.45–0.75` depending on layer depth

Metadata:
- x `0 → +20–40 px`
- opacity `1 → 0.7` only if reference indicates a recession.

## Camera-like illusion

If no 3D model:
- move shadow less than product;
- move product more than background;
- move background typography opposite or slower;
- use small scale change across the entire product group.

Parallax baseline:
- background = `1.00x`
- large type = `0.15x` relative movement
- product = `0.35x`
- foreground metadata = `0.10x`

These are depth ratios, not source measurements.

---

# 13. MOTION SYSTEM — SCENE 03 SEPARATION / DETAIL

Treat this as an **exploded-view cinematic motion**, not a mechanical diagram.

## Entry

Before explosion:
- product rotates subtly;
- camera/product scale increases;
- composition becomes more intimate.

Camera/product baseline:
- scale `1.00 → 1.10–1.18`
- x/y shift `0 → small 10–30 px` depending on source composition.

## Component separation

Natural-axis baseline:

| Component | Baseline separation | Rotation | Suggested start offset |
|---|---:|---:|---:|
| Headband | y `-70 to -110 px` | `0 to 2°` | 0.00–0.15 s |
| Left earcup | x `-70 to -110 px` | `-2 to -6°` | +0.10–0.25 s |
| Right earcup | x `+70 to +110 px` | `+2 to +6°` | +0.15–0.30 s |
| Cushions | x/y outward `20–50 px` | `±2–4°` | +0.25–0.45 s |
| Internal layers | z/scale/outward motion | `±1–4°` | +0.35–0.55 s |

Duration per group: `1.2–2.0 s`  
Ease: `power3.out`  
Return ease: `power3.inOut`

## Critical rule

Do not separate every component simultaneously.

Stagger the motion so the viewer perceives:
- rotation;
- first component release;
- side separation;
- inner detail;
- complete exploded state;
- short visual hold.

## Detail emphasis

When a specific part becomes the visual focus:
- scale selected detail `1.00 → 1.03–1.06`;
- opacity/callout `0 → 1`;
- supporting parts `1.00 → 0.85–0.95` opacity if the reference de-emphasizes them;
- callout x `+10 → 0`;
- callout duration `0.45–0.75 s`.

---

# 14. MOTION SYSTEM — SCENE 04 RECOMPOSITION

The final scene should restore a clean hero/product composition.

## Reassembly

Components return along the reverse path but not necessarily with identical timing.

Baseline:
- headband starts returning first;
- cups follow;
- cushions/inner layers settle last;
- tiny rotation settles as the group becomes assembled.

Duration: `1.4–2.2 s`  
Ease: `power3.inOut` / `power4.inOut`

## Final product settle

- scale `1.05–1.08 → 1.00`
- rotationY `+2–4° → 0°`
- rotationZ `+0.5–1° → 0°`
- y `+4–10 → 0 px`

Duration: `0.8–1.2 s`  
Ease: `expo.out`

## Final hold

Hold the finished composition for at least `0.8 s` before the page ends or advances.

---

# 15. MOTION SYSTEM — OVERLAP + TIMELINE CHOREOGRAPHY

The biggest mistake to avoid is serial animation.

Do NOT think:
- product finishes;
- then text starts;
- then metadata starts.

Use layered overlap:

| Track | Typical role | Typical start |
|---|---|---|
| A | product/camera | first |
| B | major typography | +0.10–0.35 s |
| C | supporting type | +0.25–0.50 s |
| D | UI/meta | +0.45–0.80 s |

When moving between scenes, start the next motion 10–35% before the previous motion fully ends.

The experience should look like:
**move → blend → transform → settle**, not **hide → show → hide → show**.

---

# 16. MOTION SYSTEM — EASING + PHYSICAL FEEL

Use different easing according to role:

- UI = `power2.out`
- typography reveals = `power3.out`
- product entrance = `power4.out` / `expo.out`
- orbital product movement = `power4.inOut`
- exploded outward movement = `power3.out`
- reassembly = `power3.inOut`

Do not use:
- bounce;
- elastic;
- back/overshoot unless a tiny measured overshoot is visibly present;
- linear easing for hero/product motion.

---

# 17. MOTION SYSTEM — EXPLICIT MOTION “DO NOT” LIST

Never:
- bounce the headphone.
- spin the headphone 360° unless the playback visibly shows it.
- use the same duration everywhere.
- use identical easing everywhere.
- fade every element simultaneously.
- move entire sections as a single flattened bitmap.
- snap between product states.
- animate by repeatedly changing top/left when transform interpolation will work.
- pin nested containers that fight each other.
- create ScrollTrigger instances without cleanup.
- let the product jump when crossing scene boundaries.
- use arbitrary spring physics just because it “feels modern.”

---

# 18. UI ELEMENTS — CTA

CTA should be quiet, editorial, and small.

## Baseline

- font: UI sans
- size: `11–14 px`
- uppercase when shown
- tracking: `0.12–0.20em`
- color: `--fg`
- optional line/icon: 1 px

## Entrance

- opacity `0 → 1`
- y `+8 → 0 px`
- duration `0.45–0.65 s`
- easing `power2.out`

## Hover

If CTA uses an arrow:
- arrow x `0 → +5 px`
- duration `0.25–0.35 s`
- easing `power2.out`

Do not make the CTA become a giant button on hover.

---

# 19. UI ELEMENTS — METADATA

Product metadata should feel like product-film annotation rather than ecommerce copy.

Use:
- `10–13 px`
- uppercase
- `0.12–0.22em` tracking
- muted tone.

Potential visible information:
- product name;
- generation;
- finish/color;
- “superior sound” style descriptor.

Do not add long marketing paragraphs unless they are visible in the reference.

Animation:
- y `+8–12 → 0`
- opacity `0 → 1`
- duration `0.45–0.70 s`.

---

# 20. UI STATE — COLOR / VARIANT TRANSITION

If the reference moves between a limestone/light product state and a dark/black product state, the transition must be treated as a cinematic state change.

## Preferred transition

- old product opacity `1 → 0.35`
- new product opacity `0 → 0.65 → 1`
- crossfade overlap: `0.25–0.60 s`
- product transform continues through the swap so the object does not “teleport.”

For real 3D:
- animate material color/roughness rather than swapping the DOM node.

For image sequences:
- crossfade aligned frames.

Never instantly change `src` on a moving product.

---

# 21. UI STATE — PRODUCT DETAIL FOCUS

When a part is being emphasized:
- selected part receives a small scale increase `1.03–1.06`;
- other parts may reduce opacity by `5–15%`;
- text/callout enters independently;
- product motion slows slightly during the informational hold.

The focus should feel like a camera/editorial emphasis, not a dashboard tooltip system.

---

# 22. UI STATE — MENU / MICRO-INTERACTIONS

Keep micro-interactions extremely short.

Baseline:
- duration `0.25–0.45 s`;
- `power2.out`;
- movement `2–6 px`;
- opacity changes no more than `0.15–0.25` unless a state is opening.

Avoid:
- rotating hamburger icons into unrelated shapes unless the reference shows it;
- huge magnetic cursor effects by default;
- exaggerated cursor trails.

---

# 23. SCROLL BEHAVIOR — PINNING

Use a pinned scene stage for each cinematic scene.

Desktop starting baseline:
- Scene 01 scroll distance: `1100–1600 px`
- Scene 02: `1400–1900 px`
- Scene 03: `1500–2200 px`
- Scene 04: `900–1400 px`

These distances are baselines. Tune to the source video's perceived pacing.

## ScrollTrigger model

Each scene:
- starts at top of viewport;
- pins the visual stage;
- maps scroll progress to a master scene timeline;
- ends only after the composition reaches a stable target state.

Use scrub:
- desktop `1.0–1.4`
- mobile `0.65–0.90`

Avoid multiple nested pin systems.

---

# 24. SCROLL BEHAVIOR — STATE MACHINE

Use explicit scene names:

`BOOT`  
→ `SCENE_01_HERO_INTRO`  
→ `SCENE_01_HERO_HOLD`  
→ `SCENE_02_ORBIT_TRANSFORM`  
→ `SCENE_02_SETTLE`  
→ `SCENE_03_EXPLODE_ENTRY`  
→ `SCENE_03_DETAIL_HOLD`  
→ `SCENE_04_REASSEMBLE`  
→ `SCENE_04_FINAL_HOLD`  
→ `DONE`

Rules:
- every state must have a known entry and exit;
- no section transition may rely on implicit component mount/unmount;
- scene controller owns cross-scene continuity.

---

# 25. SCROLL BEHAVIOR — SMOOTH SCROLLING

Use Lenis as an interpolation layer.

Baseline:
- lerp `0.07–0.10`
- wheel smoothing enabled
- respect touch/native scrolling where appropriate.

Conceptually:
`wheel/touch input → Lenis interpolation → GSAP ticker → ScrollTrigger progress → scene timeline`.

Do not add a second independent scroll smoother.

---

# 26. RESPONSIVE — DESKTOP → TABLET

Desktop is the primary art direction.

At `1280–1440 px`:
- preserve the large display type;
- product should remain central;
- reduce type size by ~10–15% only if necessary;
- maintain large negative space.

At `1024–1279 px`:
- reduce display size another ~10–15%;
- reduce product scale ~8–12%;
- shorten scene pin distances by ~10%.

Do not shrink every element equally.

---

# 27. RESPONSIVE — MOBILE RECOMPOSITION

Mobile must be an intentional composition.

Rules:
- product remains the hero;
- large type can move above/below product instead of forcing desktop overlap;
- reduce simultaneous parallax layers;
- reduce product rotation;
- reduce exploded separation distance;
- shorten scroll distances;
- avoid deep 3D transforms that make the product clip or distort.

Mobile baselines:
- hero display: `56–88 px`
- UI: `10–12 px`
- product max rotationY: `3–5°`
- exploded separation: `55–80%` of desktop separation
- scene pin durations: `700–1300 px`

At `390x844` and `430x932`, the product must remain fully visible without horizontal scrolling.

---

# 28. ACCESSIBILITY — REDUCED MOTION

Honor `prefers-reduced-motion: reduce`.

Reduced-motion path:
- disable parallax;
- disable 3D rotation;
- disable long scroll-driven product travel;
- show final product state quickly;
- use only short opacity/transform transitions;
- keep all content accessible and present.

Baseline reduced-motion duration:
- `0.15–0.25 s`.

Do not hide content simply because animations are disabled.

---

# 29. PERFORMANCE

Performance priorities:
1. first meaningful hero render;
2. product asset decode;
3. motion responsiveness;
4. later-scene assets;
5. nonessential polish.

Rules:
- preload only hero-critical assets;
- lazy-load scenes 2–4 assets when practical;
- cap WebGL pixel ratio around `1.5` on high-DPR devices;
- pause/cancel expensive rendering when offscreen;
- avoid 4K PNGs if a smaller WebP/AVIF works;
- keep transparent product imagery tightly cropped;
- use transform/opacity for animation;
- avoid layout-triggering CSS properties during scroll.

Target:
- no visibly stuttering product motion on a modern laptop at 1440x900;
- no repeated GC-heavy creation of geometry/materials on scroll.

---

# 30. ASSETS — MANIFEST

Use predictable filenames.

## Product

- `h4-limestone-front.webp`
- `h4-limestone-angled.webp`
- `h4-black-front.webp`
- `h4-black-angled.webp`
- `h4-shadow.webp`
- `h4-explode-headband.webp`
- `h4-explode-left-cup.webp`
- `h4-explode-right-cup.webp`
- `h4-explode-cushion-left.webp`
- `h4-explode-cushion-right.webp`
- `h4-detail-internal.webp`

If genuine 3D:
- `h4-product.glb`
- `h4-product.bin`
- texture folder with predictable naming.

## UI

- `logo-mark.svg`
- `arrow-right.svg`
- `menu.svg`

## Texture

- `grain-subtle.webp` only if visible/necessary.
- Do not introduce texture just to make the page feel “premium.”

Formats:
- WebP or AVIF preferred.
- PNG only when transparency/edge quality requires it.
- SVG for simple vectors.

---

# 31. LOADING

The first paint must never show a broken or blank product region.

Sequence:
1. render background/frame immediately;
2. render header immediately;
3. preload the hero product asset;
4. preload primary headline font if self-hosted;
5. begin hero intro only after the hero product is ready;
6. load Scene 02–04 assets progressively after the hero becomes stable.

If an asset fails:
- show a deliberate fallback placeholder or alternate product render;
- do not show an empty white rectangle;
- never let a failed image collapse the layout.

Aim for no layout shift after hero initialization.

---

# 32. DEBUG MODE

Create a dev-only debug overlay that can be toggled without affecting production.

Display:
- current scene/state;
- normalized scroll progress;
- product progress;
- typography progress;
- current viewport size;
- DPR;
- reduced-motion status;
- Lenis enabled/disabled;
- active ScrollTrigger count;
- optional FPS.

Example overlay content:
`SCENE_03_EXPLODE_ENTRY | PROGRESS 0.63 | PRODUCT 0.71 | TYPE 0.54`

Also provide a dev-only “freeze scene” capability so each of the four scenes can be inspected at:
- 0%
- 25%
- 50%
- 75%
- 100%.

---

# 33. TUNING WORKFLOW

Do not attempt all animation and polish at the same time.

Pass order:

1. **Static composition** — build the four scene states with correct assets, type, frame, whitespace, and hierarchy.
2. **Product placement** — match scale, center of mass, crop, silhouette, and margins.
3. **Typography** — match font feel, size, tracking, line-height, and overlap.
4. **Timing** — assign durations, delays, holds, and overlaps.
5. **Easing** — tune each motion curve by role.
6. **Scroll choreography** — add pinning, scrub, parallax, and scene transitions.
7. **Responsive** — recompose tablet/mobile rather than scaling desktop.
8. **Performance** — optimize asset sizes, rendering, and ScrollTrigger lifecycle.
9. **QA regression** — rerun all viewport and reduced-motion tests after fixes.

Do not proceed to the next pass while the previous pass has obvious defects.

---

# 34. QA ACCEPTANCE CRITERIA

The build is accepted only when all of the following are true:

## Visual
- The first viewport reads as the same premium editorial concept.
- Product silhouette and visual weight are correct.
- Large display typography preserves the reference hierarchy.
- Empty space remains intentionally empty.
- The dark canvas/frame remains visually stable.

## Motion
- Product rotation is restrained and 3D-like.
- Product movement and typography movement are not identical.
- Scene 03 separation is staggered rather than simultaneous.
- Reassembly does not snap.
- Transitions overlap rather than behaving like isolated animations.
- No bounce/elastic motion unless visibly demanded by playback.
- Scene holds exist; no frantic continuous movement.

## Technical
- No horizontal scroll at any target breakpoint.
- No console errors.
- No React warnings caused by unstable keys.
- No missing local assets.
- No broken font requests.
- No ScrollTrigger pin jumps.
- No layout shift caused by product loading.
- Product does not clip at target desktop breakpoints.
- Product does not clip at target mobile breakpoints.
- Scroll remains usable after navigating through all four scenes repeatedly.
- Reduced-motion mode exposes all content.
- Re-entering the page does not duplicate timelines.

## Target viewport QA
- 1440x900
- 1280x800
- 1920x1080
- 390x844
- 430x932

---

# 35. EXPLICIT FINAL “DO NOT” LIST

Regardless of what a normal website template would contain, do not add:

- product catalog grids;
- ecommerce product cards;
- “shop now” blocks;
- testimonials;
- ratings;
- pricing;
- cart/checkout interface;
- large footer;
- newsletter;
- blog;
- FAQ;
- team section;
- social proof;
- generic “features” cards;
- generic three-column content sections;
- unrelated animations;
- decorative 3D objects;
- random particles;
- gradients that are not present in the reference;
- excessive blur;
- neon glow;
- floating glass panels;
- giant pill buttons;
- scrollbars styled as decorative UI;
- cursor trails;
- excessive magnetic interactions;
- generic landing-page sections to fill unused scroll length.

When uncertain, **preserve the reference's restraint**.

---

# 36. IMPLEMENTATION INSTRUCTIONS FOR THE AGENT

## Paste-ready imperative block

Build this as a real responsive Vite + React application.

1. First inspect the supplied reference URL and any local project/assets available in the workspace.
2. Treat the reference video as the visual source of truth.
3. Recreate exactly four cinematic scenes:
   - Scene 01: Hero Intro / “Pure”
   - Scene 02: Product Rotation / Transformation
   - Scene 03: Product Separation / Detail
   - Scene 04: Reassembly / Final Recomposition
4. Do not invent additional content sections.
5. Build the **static composition first**.
6. Do not implement animation until the static composition is visually correct.
7. Use Tailwind plus CSS custom properties for design tokens.
8. Keep all motion configuration in one central motion-token source.
9. Keep each scene’s motion logic in its own motion module.
10. Use GSAP + ScrollTrigger for cinematic and scroll-driven movement.
11. Use Lenis only for scroll interpolation.
12. Use React Three Fiber/Three.js only if the product rotation/separation truly needs genuine 3D.
13. If 2.5D transparent renders can reproduce the effect convincingly, prefer 2.5D.
14. For the headphone rotation, use restrained Y-axis orbit with small X/Z support rotation, scale change, and camera-like translation.
15. For separation, use a staggered exploded-view sequence with natural-axis translation and tiny individual rotations.
16. Do not make every component move at once.
17. Use overlapping timelines and intentional holds.
18. Do not use bounce, elastic, generic spring motion, or linear easing for major product movement.
19. Never animate layout with repeated top/left changes if transform interpolation can be used.
20. Pin each cinematic scene and use the baseline scrub ranges in this document.
21. Tune all numerical values against actual playback; values in this document that are not directly measurable are baselines, not source measurements.
22. Add a dev-only debug overlay with scene/progress/FPS information.
23. Add a dev-only way to freeze/inspect each scene at 0/25/50/75/100%.
24. Test at:
   - 1440x900
   - 1280x800
   - 1920x1080
   - 390x844
   - 430x932
25. Test reduced-motion.
26. Test repeated forward/back scrolling through every scene.
27. Fix bugs before moving to the next pass.
28. Optimize assets and rendering only after visual and motion correctness are established.
29. Do not stop at “looks close.”
30. Continue tuning until the overall result reads as a faithful recreation of the reference experience.

---

# 37. REFERENCE SOURCES

## Primary
Reference video:
https://youtu.be/Uo9c85M_0uA

## Public design attribution
The design is publicly attributed to **Taras Migulko** as the Bang & Olufsen landing page concept. A design-inspiration publication lists “Bang and Olufsen Landing Page Concept” and credits Taras Migulko. The public Dribbble reference associated with the concept is the primary attribution/source context.

## Context
The concept is best treated as an editorial product-film interaction rather than a standard ecommerce page. Public design material around the concept and related B&O interaction work supports the use of deliberate product motion, typography hierarchy, and cinematic transitions.

Important: the exact frame-by-frame timing, exact source 3D model parameters, and exact easing curves are not asserted here as measured facts because they are not exposed by the public YouTube URL in this environment. Such values must be tuned against actual playback.

---

# 38. FINAL DELIVERABLE DEFINITION

Deliver a fully working, responsive website that recreates the supplied Bang & Olufsen “Pure” reference experience as a **four-scene cinematic product interaction**, including a centralized motion system, scene-specific animation logic, locally organized/optimized assets, responsive desktop/mobile behavior, reduced-motion handling, debug mode, and a README explaining how the project is structured and run. The final build must have no console errors, no broken required assets, no horizontal overflow at target sizes, no product clipping at common breakpoints, and no duplicated timelines or pinning bugs. The target deliverable is explicitly **a recreation of the reference experience**, not a generic Bang & Olufsen-themed or ecommerce-style landing page.
