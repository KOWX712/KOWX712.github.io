import { useEffect, useState } from "react";
import type { Locale } from "../../data/i18n";
import { copy } from "../../data/i18n";
import { Section } from "../layout/Section";
import { StatTile } from "./StatTile";
import type { BackendStats } from "../../lib/backend-stats";
import { getBackendStats } from "../../lib/backend-stats";
import { fallbackStats } from "../../data/stats";

function yearsSince(dateStr: string): number {
  const ms = Date.now() - new Date(dateStr).getTime();
  return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24 * 365.25)));
}

type StatsStripProps = {
  locale: Locale;
};

export function StatsStrip({ locale }: StatsStripProps) {
  const labels = copy[locale].statsStrip;
  const [stats, setStats] = useState<BackendStats>(fallbackStats);

  useEffect(() => {
    let cancelled = false;
    getBackendStats().then((result) => {
      if (!cancelled && result.stats) setStats(result.stats);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const yearsBuilding = yearsSince(stats.created_at);

  return (
    <Section className="gap-6 py-16 sm:py-20">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        <StatTile label={labels.yearsBuilding} target={yearsBuilding} suffix="+" />
        <StatTile label={labels.followers} target={stats.followers} suffix="" />
        <StatTile label={labels.repositories} target={stats.repository_count} suffix="" />
        <StatTile label={labels.totalStars} target={stats.total_stars} suffix="" />
        <StatTile label={labels.pullRequests} target={stats.pr_count} suffix="" />
        <StatTile label={labels.commits} target={stats.commit_count} suffix="" />
      </div>
    </Section>
  );
}
