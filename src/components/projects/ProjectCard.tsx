import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import type { Locale } from "../../data/i18n";
import { getProjectUrl, type Project } from "../../data/projects";
import { getRepoStats, type RepoStats } from "../../lib/github";

type ProjectCardProps = {
  project: Project;
  locale: Locale;
  featured?: boolean;
};

export function ProjectCard({ project, locale, featured = false }: ProjectCardProps) {
  const [stats, setStats] = useState<RepoStats>({ stars: null });
  const projectUrl = getProjectUrl(project);

  useEffect(() => {
    let cancelled = false;

    getRepoStats(project.owner, project.repo).then((nextStats) => {
      if (!cancelled) {
        setStats(nextStats);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [project.owner, project.repo]);

  return (
    <a
      className="group relative flex min-h-56 flex-col justify-between overflow-hidden rounded-[2rem] border border-border bg-panel p-5 text-left shadow-2xl transition hover:-translate-y-1 hover:border-accent hover:bg-surface focus:outline-none focus:ring-2 focus:ring-accent"
      href={projectUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={`${project.name} on GitHub`}
    >
      {project.icon && (
        <img
          src={project.icon}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-4 bottom-4 z-0 h-2/3 w-auto opacity-15"
        />
      )}
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <h3 className={featured ? "text-2xl font-black text-foreground" : "text-xl font-bold text-foreground"}>
            {project.name}
          </h3>
          {stats.stars === null ? null : (
            <span className="inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1 text-xs text-foreground-muted">
              <Star className="h-3.5 w-3.5" />
              {stats.stars.toLocaleString()}
            </span>
          )}
        </div>
        <p className="mt-5 text-sm leading-6 text-foreground-muted">{project.description[locale]}</p>
      </div>
      <p className="mt-8 text-sm font-semibold text-accent">{project.owner}/{project.repo}</p>
    </a>
  );
}
