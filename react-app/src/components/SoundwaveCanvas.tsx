import React, { useEffect, useRef } from 'react';
import { SoundwaveVisualizer } from '../audio/SoundwaveVisualizer';

interface SoundwaveCanvasProps {
  onVisualizerReady?: (visualizer: SoundwaveVisualizer) => void;
}

export const SoundwaveCanvas: React.FC<SoundwaveCanvasProps> = ({ onVisualizerReady }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const visualizer = new SoundwaveVisualizer(canvas);
    if (onVisualizerReady) {
      onVisualizerReady(visualizer);
    }

    const handleResize = () => {
      visualizer.onResize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="soundwave-canvas"
      className="absolute inset-0 w-full h-full block z-[3] pointer-events-none"
    />
  );
};
