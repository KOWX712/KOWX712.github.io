import { useEffect, useRef } from "react";
import { type Site } from "../../data/sites";
import { getSiteMetadata } from "../../lib/siteMetadata";
import { onScroll } from "animejs";
import { usePrefersReducedMotion } from "../../lib/scroll";
import BorderGlow from "../ui/BorderGlow";

type SiteCardProps = {
  site: Site;
};

export function SiteCard({ site }: SiteCardProps) {
  const metadata = getSiteMetadata(site.url);
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = cardRef.current;
    if (!el) return;

    const observer = onScroll({
      target: el,
      onUpdate: (self) => {
        const p = self.progress;
        const rotateX = (0.5 - p) * 3;
        const rotateY = Math.sin(p * Math.PI) * 1;
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        el.style.transformStyle = "preserve-3d";
      },
    });
    return () => {
      observer.revert();
      if (el) el.style.transform = "";
    };
  }, [reduced]);

  const displayTitle = metadata.title ?? new URL(site.url).hostname;

  return (
    <BorderGlow className="min-h-48 w-full" borderRadius={28}>
      <a
        ref={cardRef}
        className="group relative flex min-h-48 flex-col justify-between overflow-hidden p-5 text-left"
        href={site.url}
        target="_blank"
        rel="noreferrer"
        aria-label={`${displayTitle} (opens in a new tab)`}
      >
        {metadata.favicon && (
          <img
            src={metadata.favicon}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute right-4 bottom-4 z-0 h-2/3 w-auto opacity-15"
          />
        )}
        <div className="relative z-10">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-bold text-foreground">{displayTitle}</h3>
          </div>
          {metadata.description && (
            <p className="mt-5 text-sm leading-6 text-foreground-muted">{metadata.description}</p>
          )}
        </div>
        <p className="mt-8 text-sm font-semibold text-accent">{site.url}</p>
      </a>
    </BorderGlow>
  );
}
