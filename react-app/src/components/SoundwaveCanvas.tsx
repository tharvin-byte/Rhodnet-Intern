import React, { useEffect, useRef } from 'react';
import { SoundwaveVisualizer } from '../audio/SoundwaveVisualizer';

interface SoundwaveCanvasProps {
  opacity: number;
  onVisualizerReady?: (visualizer: SoundwaveVisualizer) => void;
}

export const SoundwaveCanvas: React.FC<SoundwaveCanvasProps> = ({ opacity, onVisualizerReady }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const visualizerInstanceRef = useRef<SoundwaveVisualizer | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const visualizer = new SoundwaveVisualizer(canvas);
    visualizerInstanceRef.current = visualizer;
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

  useEffect(() => {
    if (visualizerInstanceRef.current) {
      visualizerInstanceRef.current.setStageAlpha(opacity);
    }
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      id="soundwave-canvas"
      className="absolute inset-0 w-full h-full z-[3] pointer-events-none transition-opacity duration-200"
      style={{
        opacity: opacity > 0.01 ? opacity : 0,
        display: opacity > 0.01 ? 'block' : 'none',
      }}
    />
  );
};
