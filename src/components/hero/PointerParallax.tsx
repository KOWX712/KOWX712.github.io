import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { PointerEvent } from "react";

export function PointerParallax() {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 80, damping: 18 });
  const springY = useSpring(pointerY, { stiffness: 80, damping: 18 });
  const orbX = useTransform(springX, [-1, 1], [-36, 36]);
  const orbY = useTransform(springY, [-1, 1], [-24, 24]);
  const cardX = useTransform(springX, [-1, 1], [28, -28]);
  const cardY = useTransform(springY, [-1, 1], [18, -18]);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  }

  return (
    <div className="absolute inset-0 overflow-hidden" onPointerMove={handlePointerMove}>
      <motion.div
        className="absolute left-[12%] top-[18%] h-52 w-52 rounded-full bg-glow-1 blur-3xl"
        style={{ x: orbX, y: orbY }}
      />
      <motion.div
        className="absolute bottom-[20%] right-[14%] h-64 w-64 rounded-full bg-glow-2 blur-3xl"
        style={{ x: cardX, y: cardY }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-[3rem] border border-border bg-panel shadow-2xl backdrop-blur"
        style={{ x: cardX, y: cardY, rotate: 8 }}
      />
    </div>
  );
}
