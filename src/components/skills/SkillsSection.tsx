import type { Locale } from "../../data/i18n";
import { copy } from "../../data/i18n";
import { skillGroups } from "../../data/skills";
import { Reveal } from "../layout/Reveal";
import { Section } from "../layout/Section";
import { SkillGrid } from "./SkillGrid";

type SkillsSectionProps = {
  locale: Locale;
};

export function SkillsSection({ locale }: SkillsSectionProps) {
  return (
    <Section className="min-h-screen justify-center gap-10">
      <Reveal>
        <div>
          <p className="text-sm uppercase tracking-[0.45em] text-accent-muted">Skills</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-foreground sm:text-6xl">
            {copy[locale].skillsTitle}
          </h2>
        </div>
      </Reveal>
      <Reveal delay={0.12} duration={0.8}>
        <SkillGrid groups={skillGroups} locale={locale} />
      </Reveal>
    </Section>
  );
}
