import { useEffect, useRef, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { onScroll } from "animejs";
import { usePrefersReducedMotion } from "../../lib/scroll";

const SCROLL_TRANSLATE = [-90, -120, -40] as const;

export function PointerParallax() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const orb1WrapRef = useRef<HTMLDivElement | null>(null);
  const orb2WrapRef = useRef<HTMLDivElement | null>(null);
  const cardWrapRef = useRef<HTMLDivElement | null>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 80, damping: 18 });
  const springY = useSpring(pointerY, { stiffness: 80, damping: 18 });
  const orbX = useTransform(springX, [-1, 1], [-36, 36]);
  const orbY = useTransform(springY, [-1, 1], [-24, 24]);
  const cardX = useTransform(springX, [-1, 1], [28, -28]);
  const cardY = useTransform(springY, [-1, 1], [18, -18]);

  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const target = containerRef.current;
    if (!target) return;

    const observer = onScroll({
      target,
      enter: "0% 100%",
      leave: "0% -50%",
      onUpdate: (self) => {
        const p = self.progress;
        if (orb1WrapRef.current) {
          orb1WrapRef.current.style.transform = `translate3d(0, ${p * SCROLL_TRANSLATE[0]}px, 0)`;
        }
        if (orb2WrapRef.current) {
          orb2WrapRef.current.style.transform = `translate3d(0, ${p * SCROLL_TRANSLATE[1]}px, 0)`;
        }
        if (cardWrapRef.current) {
          cardWrapRef.current.style.transform = `translate3d(0, ${p * SCROLL_TRANSLATE[2]}px, 0) rotate(-2deg)`;
        }
      },
    });
    return () => {
      observer.revert();
    };
  }, [reduced]);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      onPointerMove={handlePointerMove}
    >
      <div ref={orb1WrapRef} className="absolute left-[12%] top-[18%] will-change-transform">
        <motion.div
          className="h-52 w-52 rounded-full bg-glow-1 blur-3xl"
          style={{ x: orbX, y: orbY }}
        />
      </div>
      <div ref={orb2WrapRef} className="absolute bottom-[20%] right-[14%] will-change-transform">
        <motion.div
          className="h-64 w-64 rounded-full bg-glow-2 blur-3xl"
          style={{ x: cardX, y: cardY }}
        />
      </div>
      <div ref={cardWrapRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform">
        <motion.div
          className="h-72 w-72 rounded-[3rem] border border-border bg-panel shadow-2xl backdrop-blur"
          style={{ x: cardX, y: cardY, rotate: 8 }}
        />
      </div>
    </div>
  );
}
