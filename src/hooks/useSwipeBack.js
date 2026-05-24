import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNavigation } from '@/lib/NavigationContext';

export default function useSwipeBack() {
  const navigate = useNavigate();
  const { canGoBack } = useNavigation();

  useEffect(() => {
    if (!canGoBack) return;

    let startX = 0;
    let startY = 0;

    const onTouchStart = (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const onTouchEnd = (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = Math.abs(e.changedTouches[0].clientY - startY);

      // Swipe from left edge (first 30px), horizontal > vertical, at least 60px
      if (startX < 30 && dx > 60 && dy < 80) {
        navigate(-1);
      }
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [canGoBack, navigate]);
}