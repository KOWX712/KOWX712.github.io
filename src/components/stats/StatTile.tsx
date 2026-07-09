import { useRef } from "react";
import { useCountUp } from "../../lib/countUp";
import BorderGlow from "../ui/BorderGlow";

type StatTileProps = {
  label: string;
  target: number;
  duration?: number;
  suffix?: string;
  highlight?: boolean;
};

export function StatTile({ label, target, duration = 1200, suffix = "", highlight = false }: StatTileProps) {
  const numberRef = useRef<HTMLSpanElement | null>(null);

  useCountUp({ ref: numberRef, target, duration });

  return (
    <BorderGlow className="flex flex-col items-start gap-2 p-5 sm:p-6" borderRadius={16} animated={highlight}>
      <span className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">
        <span ref={numberRef}>0</span>
        {suffix}
      </span>
      <span className="text-[0.65rem] uppercase tracking-[0.35em] text-foreground-muted sm:text-xs">
        {label}
      </span>
    </BorderGlow>
  );
}
