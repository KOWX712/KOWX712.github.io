export type BackendStats = {
  username: string;
  created_at: string;
  repository_count: number;
  total_stars: number;
  followers: number;
  pr_count: number;
  issue_count: number;
  commit_count: number;
  past_year_commit_count: number;
};

export type StatsResult = {
  stats: BackendStats | null;
  error?: string;
};

type CachedStatsResult = StatsResult & {
  cachedAt: number;
};

const cacheTtlMs = 10 * 60 * 1000;
const cacheKey = "backend:stats";

export function getCachedStats(): BackendStats | null {
  const cached = localStorage.getItem(cacheKey);

  if (!cached) {
    return null;
  }

  try {
    const parsed = JSON.parse(cached) as CachedStatsResult;

    if (Date.now() - parsed.cachedAt < cacheTtlMs && parsed.stats) {
      return parsed.stats;
    }
  } catch {
    localStorage.removeItem(cacheKey);
  }

  return null;
}

export async function getBackendStats(): Promise<StatsResult> {
  const cached = getCachedStats();

  if (cached) {
    return { stats: cached };
  }

  const url = import.meta.env.DEV
    ? "/api/stats"
    : "https://stats.kowx712.cc/";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return { stats: null, error: `Backend returned ${response.status}` };
    }

    const data = (await response.json()) as BackendStats;
    if (data) {
      const toCache: CachedStatsResult = { stats: data, cachedAt: Date.now() };
      localStorage.setItem(cacheKey, JSON.stringify(toCache));
    }
    return { stats: data };
  } catch {
    return { stats: null, error: "Unable to fetch stats" };
  }
}
