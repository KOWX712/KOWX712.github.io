import type { Locale } from "../../data/i18n";
import { copy } from "../../data/i18n";
import { sites } from "../../data/sites";
import { Reveal, RevealGroup } from "../layout/Reveal";
import { Section } from "../layout/Section";
import { TextReveal } from "../layout/TextReveal";
import { SiteCard } from "./SiteCard";

type SitesSectionProps = {
  locale: Locale;
};

export function SitesSection({ locale }: SitesSectionProps) {
  const t = copy[locale];

  return (
    <Section className="min-h-[70vh] justify-center gap-8">
      <div>
        <p className="text-sm uppercase tracking-[0.45em] text-accent-muted">Sites</p>
        <h2 className="mt-4 text-4xl font-black tracking-tight text-foreground sm:text-6xl">
          <TextReveal text={t.mySitesTitle} as="span" />
        </h2>
      </div>
      <RevealGroup className="flex flex-col gap-4 overflow-hidden" stagger={0.1} delay={0.1}>
        {sites.map((site) => (
          <Reveal key={site.url}>
            <SiteCard site={site} />
          </Reveal>
        ))}
      </RevealGroup>
    </Section>
  );
}
