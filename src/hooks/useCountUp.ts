import { useState, useEffect, useRef } from 'react';

interface UseCountUpOptions {
  duration?: number; // in milliseconds
  decimals?: number;
  enabled?: boolean;
  prefix?: string;
  suffix?: string;
}

export function useCountUp(
  target: number,
  options: UseCountUpOptions = {}
): string {
  const {
    duration = 1200,
    decimals = 0,
    enabled = true,
    prefix = '',
    suffix = '',
  } = options;

  const [currentValue, setCurrentValue] = useState<number>(0);
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    startTimeRef.current = null;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      const nextVal = easedProgress * target;
      setCurrentValue(nextVal);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        setCurrentValue(target);
      }
    };

    frameRef.current = requestAnimationFrame(step);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [target, duration, enabled]);

  const valueToDisplay = enabled ? currentValue : 0;
  const formattedNumber = decimals > 0
    ? valueToDisplay.toFixed(decimals)
    : Math.round(valueToDisplay).toString();

  return `${prefix}${formattedNumber}${suffix}`;
}
