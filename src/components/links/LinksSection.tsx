import { siGithub, siGithubsponsors, siTelegram } from "simple-icons";
import type { Locale } from "../../data/i18n";
import { copy } from "../../data/i18n";
import { links } from "../../data/links";
import { Reveal, RevealGroup } from "../layout/Reveal";
import { Section } from "../layout/Section";

type LinksSectionProps = {
  locale: Locale;
};

const linkIcons: Record<string, string> = {
  GitHub: siGithub.path,
  "GitHub Sponsors": siGithubsponsors.path,
  "Telegram Channel": siTelegram.path,
};

export function LinksSection({ locale }: LinksSectionProps) {
  return (
    <Section className="min-h-[70vh] justify-center gap-8">
      <Reveal>
        <div>
          <p className="text-sm uppercase tracking-[0.45em] text-accent-muted">Links</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-foreground sm:text-6xl">
            {copy[locale].linksTitle}
          </h2>
        </div>
      </Reveal>
      <RevealGroup className="grid gap-4 md:grid-cols-3" stagger={0.1} delay={0.1}>
        {links.map((link) => {
          const path = linkIcons[link.label];
          return (
            <Reveal key={link.href}>
              <a
                className="flex h-full items-center justify-center rounded-[2rem] border border-border bg-panel p-6 text-xl font-bold text-foreground transition hover:-translate-y-1 hover:border-accent hover:bg-surface focus:outline-none focus:ring-2 focus:ring-accent"
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${link.label} (opens in a new tab)`}
              >
                {path && (
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width={24}
                    height={24}
                    className="mr-3 shrink-0"
                    aria-hidden="true"
                  >
                    <path d={path} />
                  </svg>
                )}
                <span>{link.label}</span>
              </a>
            </Reveal>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
