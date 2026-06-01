import { createContext, useContext, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "../../lib/utils";

/**
 * Scroll-driven float-up reveal. Renders a `motion.div` that fades and
 * translates into place the first time it enters the viewport.
 *
 * Use standalone for a single element, or nest inside <RevealGroup> to
 * participate in a staggered cascade (children inherit the group's
 * `whileInView` trigger and animate via shared variants).
 *
 * Respects `prefers-reduced-motion`: when set, the content renders
 * immediately with no animation and no wrapper layout shift.
 */
const RevealContext = createContext(false);

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Pixels to translate from below. Default 28. */
  y?: number;
  /** Delay in seconds before animating. Default 0. */
  delay?: number;
  /** Duration in seconds. Default 0.7. */
  duration?: number;
  /** Fraction of element in view (0–1) required to trigger. Default 0.2. */
  amount?: number;
};

export function Reveal({
  children,
  className,
  y = 28,
  delay = 0,
  duration = 0.7,
  amount = 0.2,
}: RevealProps) {
  const inGroup = useContext(RevealContext);
  const reduced = useReducedMotion() === true;

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const variants: Variants = {
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration, delay, ease: REVEAL_EASE },
    },
  };

  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial={inGroup ? undefined : "hidden"}
      whileInView={inGroup ? undefined : "show"}
      viewport={inGroup ? undefined : { once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  /** Seconds between each child's animation start. Default 0.08. */
  stagger?: number;
  /** Seconds before the first child animates. Default 0.05. */
  delay?: number;
  /** Fraction of group in view (0–1) required to trigger. Default 0.2. */
  amount?: number;
};

/**
 * Container that staggers the float-up of its <Reveal> children.
 * Children must be <Reveal> components (or motion elements with matching
 * `hidden`/`show` variants) to participate in the cascade.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0.05,
  amount = 0.2,
}: RevealGroupProps) {
  const reduced = useReducedMotion() === true;

  if (reduced) {
    return (
      <RevealContext.Provider value={true}>
        <div className={className}>{children}</div>
      </RevealContext.Provider>
    );
  }

  const variants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  return (
    <RevealContext.Provider value={true}>
      <motion.div
        className={cn(className)}
        variants={variants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount }}
      >
        {children}
      </motion.div>
    </RevealContext.Provider>
  );
}
