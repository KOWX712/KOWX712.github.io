import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { animate, splitText, stagger, type TextSplitter } from "animejs";
import { usePrefersReducedMotion } from "../../lib/scroll";

type TextRevealProps = {
  text: string;
  split?: "word" | "char";
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  staggerMs?: number;
  y?: number;
  children?: ReactNode;
};

export function TextReveal({
  text,
  split = "word",
  className,
  as: Tag = "span",
  staggerMs = 35,
  y = 24,
}: TextRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const splitterRef = useRef<TextSplitter | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) return;

    const splitter = splitText(el, {
      words: { wrap: "clip" },
      chars: split === "char" ? { wrap: "clip" } : false,
    });
    splitterRef.current = splitter;

    const tokens = split === "char" ? splitter.chars : splitter.words;

    animate(tokens, {
      opacity: [0, 1],
      translateY: [y, 0],
      duration: 700,
      ease: "out(3)",
      delay: stagger(staggerMs),
    });

    return () => {
      splitter.revert();
      splitterRef.current = null;
    };
  }, [text, split, reduced, y, staggerMs]);

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return <Tag className={className} ref={ref as React.Ref<never>}>{text}</Tag>;
}

export type { ElementType };
