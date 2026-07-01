import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../../lib/scroll";

function getScrollProgress(): number {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight;
  const winHeight = window.innerHeight;
  const maxScroll = docHeight - winHeight;
  return maxScroll > 0 ? Math.min(1, scrollTop / maxScroll) : 1;
}

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const [progress, setProgress] = useState(reduced ? 1 : getScrollProgress());

  useEffect(() => {
    if (reduced) return;

    let ticking = false;

    function handleScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          setProgress(getScrollProgress());
          ticking = false;
        });
        ticking = true;
      }
    }

    setProgress(getScrollProgress());
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [reduced]);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-60 h-0.5 origin-left bg-accent/70"
      ref={barRef}
      style={{ transform: `scaleX(${progress})` }}
      aria-hidden="true"
    />
  );
}
