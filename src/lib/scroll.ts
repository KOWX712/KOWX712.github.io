import { useEffect, useRef, useState, type RefObject } from "react";
import { onScroll, type ScrollObserver } from "animejs";

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

type ScrollObserverOptions = {
  repeat?: boolean;
  enter?: string;
  leave?: string;
  axis?: "x" | "y";
};

export function useScrollObserver(
  target: RefObject<Element | null>,
  onProgress: (progress: number) => void,
  options: ScrollObserverOptions = {},
): void {
  const reduced = usePrefersReducedMotion();
  const callbackRef = useRef(onProgress);

  useEffect(() => {
    callbackRef.current = onProgress;
  }, [onProgress]);

  useEffect(() => {
    if (reduced) return;
    const el = target.current;
    if (!el) return;

    const observer: ScrollObserver = onScroll({
      target: el as HTMLElement,
      repeat: options.repeat ?? false,
      enter: options.enter ?? "0% 100%",
      leave: options.leave ?? "0% 0%",
      axis: options.axis ?? "y",
      onUpdate: (self) => {
        callbackRef.current(self.progress);
      },
    });

    return () => {
      observer.revert();
    };
  }, [reduced, target, options.repeat, options.enter, options.leave, options.axis]);
}
