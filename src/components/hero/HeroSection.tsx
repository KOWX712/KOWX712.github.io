import { useState, useEffect } from "react";
import type { Locale } from "../../data/i18n";
import { copy } from "../../data/i18n";
import { Reveal } from "../layout/Reveal";
import { Section } from "../layout/Section";
import { TextReveal } from "../layout/TextReveal";
import { PointerParallax } from "./PointerParallax";

function useTypewriter(text: string, speed = 40) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return displayed;
}

type HeroSectionProps = {
  locale: Locale;
};

export function HeroSection({ locale }: HeroSectionProps) {
  const t = copy[locale];
  const typedSubtitle = useTypewriter(t.heroSubtitle, 40);

  return (
    <Section className="isolate min-h-screen select-none items-center justify-center overflow-hidden text-center">
      <PointerParallax />
      <Reveal className="relative z-10" duration={0.8}>
        <p className="mb-5 text-sm uppercase tracking-[0.6em] text-accent-muted">Portfolio</p>
        <h1 className="text-6xl font-black text-foreground sm:text-8xl lg:text-9xl">
          <TextReveal text={t.heroTitle} split="char" as="span" staggerMs={45} />
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-foreground-muted sm:text-lg">
          {typedSubtitle}
          <span className="inline-block h-[1.5em] w-[2px] translate-y-0.5 bg-accent align-text-bottom animate-pulse" />
        </p>
      </Reveal>
    </Section>
  );
}
