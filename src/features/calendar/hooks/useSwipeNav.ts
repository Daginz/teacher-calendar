// src/features/calendar/hooks/useSwipeNav.ts
import { useEffect } from "react";

type AnyRef<T extends HTMLElement> = { current: T | null };

export function useSwipeNav<T extends HTMLElement>(
  ref: AnyRef<T>,
  onSwipeLeft: () => void,
  onSwipeRight: () => void
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let x0 = 0, y0 = 0, tracking = false;

    const onStart = (e: TouchEvent) => {
      const t = e.touches[0];
      x0 = t.clientX;
      y0 = t.clientY;
      tracking = true;
    };

    const onEnd = (e: TouchEvent) => {
      if (!tracking) return;
      tracking = false;
      const t = e.changedTouches[0];
      const dx = t.clientX - x0;
      const dy = t.clientY - y0;
      // Горизонтальный свайп: |dx| > 50 и |dx| > |dy|
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) onSwipeLeft();
        else onSwipeRight();
      }
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchend", onEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchend", onEnd);
    };
  }, [ref, onSwipeLeft, onSwipeRight]);
}
