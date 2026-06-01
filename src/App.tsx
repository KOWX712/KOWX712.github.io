import { useEffect, useState } from "react";
import { type Locale } from "./data/i18n";
import { getInitialLocale, persistLocale } from "./lib/locale";
import { getInitialTheme, persistTheme, type Theme } from "./lib/theme";
import { LocaleToggle } from "./components/layout/LocaleToggle";
import { ThemeToggle } from "./components/layout/ThemeToggle";
import { HeroSection } from "./components/hero/HeroSection";
import { SkillsSection } from "./components/skills/SkillsSection";
import { ProjectsSection } from "./components/projects/ProjectsSection";
import { LinksSection } from "./components/links/LinksSection";
import { Footer } from "./components/footer/Footer";

function resolveTheme(theme: Theme): "light" | "dark" {
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return theme;
}

export default function App() {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    persistLocale(locale);
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [locale]);

  useEffect(() => {
    persistTheme(theme);
    document.documentElement.dataset.theme = resolveTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    function onChange() {
      document.documentElement.dataset.theme = mq.matches ? "dark" : "light";
    }
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme]);

  return (
    <main>
      <div className="fixed right-4 top-4 z-50 flex gap-2">
        <ThemeToggle theme={theme} onThemeChange={setTheme} />
        <LocaleToggle locale={locale} onLocaleChange={setLocale} />
      </div>
      <HeroSection locale={locale} />
      <SkillsSection locale={locale} />
      <ProjectsSection locale={locale} />
      <LinksSection locale={locale} />
      <Footer locale={locale} />
    </main>
  );
}
