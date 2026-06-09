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

function readCachedStats(): StatsResult | null {
  const cached = localStorage.getItem(cacheKey);

  if (!cached) {
    return null;
  }

  try {
    const parsed = JSON.parse(cached) as CachedStatsResult;

    if (Date.now() - parsed.cachedAt < cacheTtlMs) {
      return parsed;
    }
  } catch {
    localStorage.removeItem(cacheKey);
  }

  return null;
}

export async function getBackendStats(): Promise<StatsResult> {
  const cached = readCachedStats();

  if (cached) {
    return cached;
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
    const result: StatsResult = { stats: data, error: undefined };
    const toCache: CachedStatsResult = { ...result, cachedAt: Date.now() };
    localStorage.setItem(cacheKey, JSON.stringify(toCache));
    return result;
  } catch {
    return { stats: null, error: "Unable to fetch stats" };
  }
}
