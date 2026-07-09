import type { Locale } from "../../data/i18n";
import { copy } from "../../data/i18n";
import { otherProjects, topProjects } from "../../data/projects";
import { Reveal, RevealGroup } from "../layout/Reveal";
import { Section } from "../layout/Section";
import { TextReveal } from "../layout/TextReveal";
import { ProjectCard } from "./ProjectCard";

type ProjectsSectionProps = {
  locale: Locale;
};

export function ProjectsSection({ locale }: ProjectsSectionProps) {
  const t = copy[locale];

  return (
    <Section className="min-h-screen gap-10">
      <div>
        <p className="text-sm uppercase tracking-[0.45em] text-accent-muted">Open Source</p>
        <h2 className="mt-4 text-4xl font-black tracking-tight text-foreground sm:text-6xl">
          <TextReveal text={t.projectsTitle} as="span" />
        </h2>
      </div>

      <div>
        <Reveal delay={0.08}>
          <h3 className="mb-4 text-xl font-bold text-foreground">{t.topProjects}</h3>
        </Reveal>
        <RevealGroup className="grid gap-4 lg:grid-cols-3 overflow-hidden" stagger={0.1} delay={0.15}>
          {topProjects.map((project) => (
            <Reveal key={`${project.owner}/${project.repo}`}>
              <ProjectCard project={project} locale={locale} featured />
            </Reveal>
          ))}
        </RevealGroup>
      </div>

      <div>
        <Reveal>
          <h3 className="mb-4 text-xl font-bold text-foreground">{t.otherProjects}</h3>
        </Reveal>
        <RevealGroup className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 overflow-hidden" stagger={0.06} delay={0.05} amount={0.1}>
          {otherProjects.map((project) => (
            <Reveal key={`${project.owner}/${project.repo}`}>
              <ProjectCard project={project} locale={locale} />
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
