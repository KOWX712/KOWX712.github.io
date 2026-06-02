import { useEffect, useRef, type RefObject } from "react";
import { animate } from "animejs";
import { usePrefersReducedMotion } from "./scroll";

type CountUpOptions = {
  ref: RefObject<HTMLElement | null>;
  target: number;
  duration?: number;
  triggerOnce?: boolean;
};

export function useCountUp({ ref, target, duration = 1200, triggerOnce = true }: CountUpOptions): void {
  const reduced = usePrefersReducedMotion();
  const firedRef = useRef(false);

  useEffect(() => {
    if (reduced) {
      if (ref.current) ref.current.textContent = formatNumber(target, 0);
      return;
    }
    if (triggerOnce && firedRef.current) return;

    const el = ref.current;
    if (!el) return;

    if (target <= 0) {
      el.textContent = formatNumber(0, 0);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (triggerOnce && firedRef.current) continue;
          firedRef.current = true;
          observer.disconnect();

          const obj = { v: 0 };
          animate(obj, {
            v: target,
            duration,
            ease: "outExpo",
            onUpdate: () => {
              if (el) el.textContent = formatNumber(obj.v, 0);
            },
          });
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced, ref, target, duration, triggerOnce]);
}

function formatNumber(value: number, decimals: number): string {
  if (decimals > 0) return value.toFixed(decimals);
  return Math.round(value).toLocaleString();
}
