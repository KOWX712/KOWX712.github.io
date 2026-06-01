export type RepoStats = {
  stars: number | null;
  error?: string;
};

type CachedRepoStats = RepoStats & {
  cachedAt: number;
};

const cacheTtlMs = 60 * 60 * 1000;
const cacheKey = (owner: string, repo: string) => `repo:${owner}/${repo}`;

function readCachedRepoStats(key: string): RepoStats | null {
  const cached = localStorage.getItem(key);

  if (!cached) {
    return null;
  }

  try {
    const cachedStats = JSON.parse(cached) as CachedRepoStats;

    if (Date.now() - cachedStats.cachedAt < cacheTtlMs) {
      return { stars: cachedStats.stars, error: cachedStats.error };
    }
  } catch {
    localStorage.removeItem(key);
  }

  return null;
}

export async function getRepoStats(owner: string, repo: string): Promise<RepoStats> {
  const key = cacheKey(owner, repo);
  const cached = readCachedRepoStats(key);

  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: { Accept: "application/vnd.github+json" },
    });

    if (!response.ok) {
      return { stars: null, error: `GitHub API returned ${response.status}` };
    }

    const data = await response.json();
    const stats = { stars: Number(data.stargazers_count ?? 0), cachedAt: Date.now() };
    localStorage.setItem(key, JSON.stringify(stats));
    return stats;
  } catch {
    return { stars: null, error: "Unable to fetch GitHub stars" };
  }
}
