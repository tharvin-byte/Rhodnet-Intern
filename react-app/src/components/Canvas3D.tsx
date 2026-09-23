import React, { useEffect, useRef } from 'react';
import { SceneManager } from '../three/SceneManager';
import { HeadphoneModel } from '../three/HeadphoneModel';

interface Canvas3DProps {
  onSceneReady?: (scene: SceneManager, model: HeadphoneModel) => void | (() => void);
  isOrbitActive?: boolean;
}

export const Canvas3D: React.FC<Canvas3DProps> = ({ onSceneReady, isOrbitActive = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneManagerRef = useRef<SceneManager | null>(null);
  const headphoneModelRef = useRef<HeadphoneModel | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Initialize Scene & Model with exact Stage 1 parameters
    const sceneManager = new SceneManager(canvas);
    const headphoneModel = new HeadphoneModel();
    sceneManager.addModel(headphoneModel);

    sceneManagerRef.current = sceneManager;
    headphoneModelRef.current = headphoneModel;

    let cleanupOnSceneReady: void | (() => void);
    if (onSceneReady) {
      cleanupOnSceneReady = onSceneReady(sceneManager, headphoneModel);
    }

    // 2. Measure layout AFTER settling to prevent initial aspect ratio distortion
    let animationFrameId: number;
    let resizeObserver: ResizeObserver | null = null;

    const measureAndResize = () => {
      if (!canvas) return;
      const parent = canvas.parentElement || document.body;
      const width = parent.clientWidth || window.innerWidth;
      const height = parent.clientHeight || window.innerHeight;
      sceneManager.onResize(width, height);
    };

    // Defer initial resize measurement until after initial paint settles
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        measureAndResize();
      });
    });

    if (window.ResizeObserver && canvas.parentElement) {
      resizeObserver = new ResizeObserver(() => {
        measureAndResize();
      });
      resizeObserver.observe(canvas.parentElement);
    }

    const handleWindowResize = () => {
      measureAndResize();
    };
    window.addEventListener('resize', handleWindowResize);

    // 3. Render Loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      sceneManager.render();
    };
    animate();

    // 4. Full StrictMode Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (typeof cleanupOnSceneReady === 'function') {
        cleanupOnSceneReady();
      }
      window.removeEventListener('resize', handleWindowResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      headphoneModel.dispose();
      sceneManager.dispose();
      sceneManagerRef.current = null;
      headphoneModelRef.current = null;
    };
  }, []);

  // Sync free orbit mode
  useEffect(() => {
    if (sceneManagerRef.current) {
      sceneManagerRef.current.setFreeOrbit(isOrbitActive);
    }
  }, [isOrbitActive]);

  return (
    <canvas
      ref={canvasRef}
      id="webgl-canvas"
      className={`absolute inset-0 w-full h-full block z-[5] ${
        isOrbitActive ? 'cursor-grab active:cursor-grabbing pointer-events-auto' : 'pointer-events-none'
      }`}
    />
  );
};
