import type { Locale } from "../data/i18n";

const storageKey = "portfolio-locale";

export function getInitialLocale(): Locale {
  const stored = localStorage.getItem(storageKey);

  if (stored === "en" || stored === "zh") {
    return stored;
  }

  if (navigator.language.toLowerCase().startsWith("zh")) {
    return "zh";
  }

  return "en";
}

export function persistLocale(locale: Locale) {
  localStorage.setItem(storageKey, locale);
}
