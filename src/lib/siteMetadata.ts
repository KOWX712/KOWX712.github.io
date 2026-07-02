import siteMetadataJson from "../data/sites-metadata.json";

export type SiteMetadata = {
  title: string | null;
  description: string | null;
  favicon: string | null;
};

const siteMetadataMap = new Map<string, SiteMetadata>(
  siteMetadataJson.map((s) => [
    s.url,
    { title: s.title, description: s.description, favicon: s.favicon },
  ]),
);

export function getSiteMetadata(url: string): SiteMetadata {
  return siteMetadataMap.get(url) ?? { title: null, description: null, favicon: null };
}
