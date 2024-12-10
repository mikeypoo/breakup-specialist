import { useState, useCallback } from 'react';

export const useSwipe = (threshold = 50) => {
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);

  const onTouchStart = useCallback((e) => {
    setStartX(e.touches[0].clientX);
  }, []);

  const onTouchMove = useCallback((e) => {
    setEndX(e.touches[0].clientX);
  }, []);

  const onTouchEnd = useCallback(() => {
    const deltaX = endX - startX;
    if (deltaX > threshold) {
      return 'right';
    } else if (deltaX < -threshold) {
      return 'left';
    }
    return null;
  }, [startX, endX, threshold]);

  return { onTouchStart, onTouchMove, onTouchEnd };
}