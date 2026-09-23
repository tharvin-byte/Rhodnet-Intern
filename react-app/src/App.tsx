import React, { useState, useEffect, useRef } from 'react';
import { Canvas3D } from './components/Canvas3D';
import { SoundwaveCanvas } from './components/SoundwaveCanvas';
import { HeaderNav } from './components/HeaderNav';
import { HeroStage } from './components/HeroStage';
import { AncStage } from './components/AncStage';
import { LifestyleStage } from './components/LifestyleStage';
import { ExplodedStage } from './components/ExplodedStage';
import { LeaderLinesSvg } from './components/LeaderLinesSvg';
import { StageNavDots } from './components/StageNavDots';
import { SpecsDrawer } from './components/SpecsDrawer';

import { SceneManager } from './three/SceneManager';
import { HeadphoneModel } from './three/HeadphoneModel';
import { ExplodedController, type StageState } from './three/ExplodedController';
import { SoundwaveVisualizer } from './audio/SoundwaveVisualizer';
import { AudioManager } from './audio/AudioManager';

export const App: React.FC = () => {
  const [colorway, setColorway] = useState<'champagne' | 'anthracite'>('champagne');
  const [isOrbitActive, setIsOrbitActive] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);

  const [stageState, setStageState] = useState<StageState>({
    progress: 0.0,
    stageIndex: 0,
    heroOpacity: 1.0,
    ancOpacity: 0.0,
    lifestyleSlideY: 100,
    lifestyleOpacity: 0.0,
    explodedOpacity: 0.0,
    eyebrow: 'AUDIO QUALITY',
    heading: 'Wear all day<br>in total comfort',
    desc: 'Expertly crafted using premium materials, Beoplay H95 headphones embrace the ear for a luxurious and superior fit.',
    annotationTitle: 'Earpads',
    annotationDesc: 'Super soft, pressure-relieving earpads in foamed urethane evenly distribute pressure and increase ear pad contact for a stable fit.',
    leaderLine: null
  });

  const sceneManagerRef = useRef<SceneManager | null>(null);
  const headphoneModelRef = useRef<HeadphoneModel | null>(null);
  const explodedControllerRef = useRef<ExplodedController | null>(null);
  const visualizerRef = useRef<SoundwaveVisualizer | null>(null);
  const audioManagerRef = useRef<AudioManager | null>(null);

  // Initialize AudioManager
  useEffect(() => {
    audioManagerRef.current = new AudioManager();
    return () => {
      audioManagerRef.current?.stop();
    };
  }, []);

  // When 3D Scene is mounted
  const handleSceneReady = (scene: SceneManager, model: HeadphoneModel) => {
    sceneManagerRef.current = scene;
    headphoneModelRef.current = model;

    const controller = new ExplodedController(scene, model);
    controller.onStateChange = (state) => {
      setStageState(state);
    };
    explodedControllerRef.current = controller;

    // Expose PureApp on window for inspection & automated verification
    (window as any).PureApp = {
      explodedController: controller,
      sceneManager: scene,
      headphoneModel: model,
      audioManager: audioManagerRef.current,
      setColorway: (c: 'champagne' | 'anthracite') => handleColorChange(c),
      setOrbit: (active: boolean) => {
        setIsOrbitActive(active);
        scene.setFreeOrbit(active);
      },
      setSpecsOpen: (open: boolean) => setIsSpecsOpen(open)
    };

    // Synchronize 360 orbit button state when user directly drags on the 3D canvas
    scene.onOrbitStateChange = (isOrbit) => {
      setIsOrbitActive(isOrbit);
    };

    // Render & Animation Loop
    let animId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      animId = requestAnimationFrame(loop);
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      controller.update(delta);

      if (visualizerRef.current && audioManagerRef.current) {
        const freqData = audioManagerRef.current.getFrequencyData();
        visualizerRef.current.update(freqData);
        visualizerRef.current.setStageAlpha(controller.progress >= 0.14 && controller.progress < 0.28 ? 1.0 : 0.0);
      }
    };
    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      delete (window as any).PureApp;
    };
  };

  const handleVisualizerReady = (visualizer: SoundwaveVisualizer) => {
    visualizerRef.current = visualizer;
  };

  // Scroll and touch event listeners
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!explodedControllerRef.current) return;
      const delta = e.deltaY * 0.00015;
      explodedControllerRef.current.setProgress(explodedControllerRef.current.targetProgress + delta);
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!explodedControllerRef.current) return;
      if (e.touches && e.touches.length > 0) {
        const deltaY = touchStartY - e.touches[0].clientY;
        touchStartY = e.touches[0].clientY;
        const delta = deltaY * 0.00035;
        explodedControllerRef.current.setProgress(explodedControllerRef.current.targetProgress + delta);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const handleColorChange = (newColor: 'champagne' | 'anthracite') => {
    setColorway(newColor);
    headphoneModelRef.current?.setColorway(newColor);
  };

  const handleToggleOrbit = () => {
    const next = !isOrbitActive;
    setIsOrbitActive(next);
    sceneManagerRef.current?.setFreeOrbit(next);
  };

  const handleToggleAudio = () => {
    if (!audioManagerRef.current) return;
    const playing = audioManagerRef.current.toggle();
    setIsAudioPlaying(playing);
    visualizerRef.current?.setAudioPlaying(playing);
  };

  const handleNavClick = (targetP: number) => {
    explodedControllerRef.current?.setProgress(targetP);
  };

  return (
    <main className="relative w-full min-w-full h-screen min-h-screen bg-[#151515] overflow-hidden select-none">
      {/* 1. Header Navigation */}
      <HeaderNav
        colorway={colorway}
        onColorChange={handleColorChange}
        isOrbitActive={isOrbitActive}
        onToggleOrbit={handleToggleOrbit}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
        onNavClick={handleNavClick}
      />

      {/* 2. Audio Visualizer Canvas */}
      <SoundwaveCanvas onVisualizerReady={handleVisualizerReady} />

      {/* 3. Three.js Canvas3D Scene */}
      <Canvas3D onSceneReady={handleSceneReady} isOrbitActive={isOrbitActive} />

      {/* 4. SVG Leader Lines */}
      <LeaderLinesSvg line={stageState.leaderLine} />

      {/* 5. Stage Overlays */}
      <HeroStage
        opacity={stageState.heroOpacity}
        onOpenSpecs={() => setIsSpecsOpen(true)}
      />

      <AncStage opacity={stageState.ancOpacity} />

      <LifestyleStage
        slideY={stageState.lifestyleSlideY}
        opacity={stageState.lifestyleOpacity}
        onOpenSpecs={() => setIsSpecsOpen(true)}
      />

      <ExplodedStage
        opacity={stageState.explodedOpacity}
        eyebrow={stageState.eyebrow}
        heading={stageState.heading}
        desc={stageState.desc}
        annotationTitle={stageState.annotationTitle}
        annotationDesc={stageState.annotationDesc}
        onOpenSpecs={() => setIsSpecsOpen(true)}
      />

      {/* 6. Vertical Stage Pagination Dots */}
      <StageNavDots
        stageIndex={stageState.stageIndex}
        onSelectStage={handleNavClick}
      />

      {/* 7. Slide-Over Specs Drawer */}
      <SpecsDrawer
        isOpen={isSpecsOpen}
        onClose={() => setIsSpecsOpen(false)}
      />
    </main>
  );
};

export default App;
