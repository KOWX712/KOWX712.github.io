export type RepoStats = {
  stars: number | null;
  error?: string;
};

export type UserStats = {
  followers: number | null;
  error?: string;
};

type CachedRepoStats = RepoStats & {
  cachedAt: number;
};

type CachedUserStats = UserStats & {
  cachedAt: number;
};

const cacheTtlMs = 60 * 60 * 1000;
const repoCacheKey = (owner: string, repo: string) => `repo:${owner}/${repo}`;
const userCacheKey = (login: string) => `user:${login}`;

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

function readCachedUserStats(key: string): UserStats | null {
  const cached = localStorage.getItem(key);

  if (!cached) {
    return null;
  }

  try {
    const cachedStats = JSON.parse(cached) as CachedUserStats;

    if (Date.now() - cachedStats.cachedAt < cacheTtlMs) {
      return { followers: cachedStats.followers, error: cachedStats.error };
    }
  } catch {
    localStorage.removeItem(key);
  }

  return null;
}

export async function getRepoStats(owner: string, repo: string): Promise<RepoStats> {
  const key = repoCacheKey(owner, repo);
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

export async function getUserStats(login: string): Promise<UserStats> {
  const key = userCacheKey(login);
  const cached = readCachedUserStats(key);

  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${login}`, {
      headers: { Accept: "application/vnd.github+json" },
    });

    if (!response.ok) {
      return { followers: null, error: `GitHub API returned ${response.status}` };
    }

    const data = await response.json();
    const stats = { followers: Number(data.followers ?? 0), cachedAt: Date.now() };
    localStorage.setItem(key, JSON.stringify(stats));
    return stats;
  } catch {
    return { followers: null, error: "Unable to fetch GitHub followers" };
  }
}
