import { useState, useRef, useCallback } from 'react';

const THRESHOLD = 72;

export default function usePullToRefresh(onRefresh) {
  const [pullDistance, setPullDistance] = useState(0);
  const startY = useRef(null);
  const pulling = useRef(false);

  const onTouchStart = useCallback((e) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY;
      pulling.current = true;
    }
  }, []);

  const onTouchMove = useCallback((e) => {
    if (!pulling.current || startY.current === null) return;
    const delta = e.touches[0].clientY - startY.current;
    if (delta > 0) {
      setPullDistance(Math.min(delta * 0.5, THRESHOLD * 1.2));
    }
  }, []);

  const onTouchEnd = useCallback(async () => {
    if (!pulling.current) return;
    pulling.current = false;
    if (pullDistance >= THRESHOLD) {
      setPullDistance(THRESHOLD);
      await onRefresh();
    }
    setPullDistance(0);
    startY.current = null;
  }, [pullDistance, onRefresh]);

  return { pullDistance, onTouchStart, onTouchMove, onTouchEnd, threshold: THRESHOLD };
}