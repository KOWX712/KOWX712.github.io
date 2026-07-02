export type SiteMetadata = {
  title: string | null;
  description: string | null;
  favicon: string | null;
};

type CachedSiteMetadata = SiteMetadata & {
  cachedAt: number;
};

const cacheTtlMs = 60 * 60 * 1000;
const cacheKey = (url: string) => `site:${url}`;
const corsProxy = "https://api.allorigins.win/raw?url=";

function readCached(url: string): SiteMetadata | null {
  const cached = localStorage.getItem(cacheKey(url));
  if (!cached) return null;

  try {
    const data = JSON.parse(cached) as CachedSiteMetadata;
    if (Date.now() - data.cachedAt < cacheTtlMs) {
      return { title: data.title, description: data.description, favicon: data.favicon };
    }
  } catch {
    localStorage.removeItem(cacheKey(url));
  }

  return null;
}

function writeCache(url: string, metadata: SiteMetadata) {
  const data: CachedSiteMetadata = { ...metadata, cachedAt: Date.now() };
  localStorage.setItem(cacheKey(url), JSON.stringify(data));
}

function extractMetadata(html: string, baseUrl: string): SiteMetadata {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const title =
    doc.querySelector("meta[property='og:title']")?.getAttribute("content") ??
    doc.querySelector("title")?.textContent ??
    null;

  const description =
    doc.querySelector("meta[property='og:description']")?.getAttribute("content") ??
    doc.querySelector("meta[name='description']")?.getAttribute("content") ??
    null;

  let favicon =
    doc.querySelector("link[rel='icon']")?.getAttribute("href") ??
    doc.querySelector("link[rel='shortcut icon']")?.getAttribute("href") ??
    doc.querySelector("link[rel='apple-touch-icon']")?.getAttribute("href") ??
    null;

  if (favicon && !favicon.startsWith("http")) {
    try {
      favicon = new URL(favicon, baseUrl).href;
    } catch {
      favicon = null;
    }
  }

  return { title, description, favicon };
}

export async function getSiteMetadata(url: string): Promise<SiteMetadata> {
  const cached = readCached(url);
  if (cached) return cached;

  try {
    const response = await fetch(corsProxy + encodeURIComponent(url));
    if (!response.ok) {
      return { title: null, description: null, favicon: null };
    }

    const html = await response.text();
    const metadata = extractMetadata(html, url);
    writeCache(url, metadata);
    return metadata;
  } catch {
    return { title: null, description: null, favicon: null };
  }
}
