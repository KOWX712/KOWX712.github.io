import { useRef } from "react";
import { useCountUp } from "../../lib/countUp";

type StatTileProps = {
  label: string;
  target: number;
  duration?: number;
  suffix?: string;
};

export function StatTile({ label, target, duration = 1200, suffix = "" }: StatTileProps) {
  const numberRef = useRef<HTMLSpanElement | null>(null);

  useCountUp({ ref: numberRef, target, duration });

  return (
    <div className="flex flex-col items-start gap-2 rounded-2xl border border-border bg-panel/60 p-5 backdrop-blur transition hover:-translate-y-1 hover:border-accent hover:bg-surface focus:outline-none focus:ring-2 focus:ring-accent sm:p-6" tabIndex={0}>
      <span className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">
        <span ref={numberRef}>0</span>
        {suffix}
      </span>
      <span className="text-[0.65rem] uppercase tracking-[0.35em] text-foreground-muted sm:text-xs">
        {label}
      </span>
    </div>
  );
}
