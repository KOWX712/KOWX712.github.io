import { writeFileSync } from "node:fs";
import { JSDOM } from "jsdom";
import { sites } from "../src/data/sites.js";

type SiteMetadata = {
  url: string;
  title: string | null;
  description: string | null;
  favicon: string | null;
};

function extractMetadata(html: string, baseUrl: string): Omit<SiteMetadata, "url"> {
  const dom = new JSDOM(html);
  const doc = dom.window.document;

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

async function fetchSiteMetadata(site: { url: string }): Promise<SiteMetadata> {
  try {
    const response = await fetch(site.url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; SiteMetadataBot/1.0)" },
      redirect: "follow",
    });

    if (!response.ok) {
      return { url: site.url, title: null, description: null, favicon: null };
    }

    const html = await response.text();
    const metadata = extractMetadata(html, site.url);
    return { url: site.url, ...metadata };
  } catch {
    return { url: site.url, title: null, description: null, favicon: null };
  }
}

async function main() {
  console.log("Fetching site metadata...");
  const results = await Promise.all(sites.map(fetchSiteMetadata));
  const outputPath = new URL("../src/data/sites-metadata.json", import.meta.url);
  writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`Wrote metadata for ${results.length} sites to sites-metadata.json`);
}

main();
