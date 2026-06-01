export type Theme = "light" | "dark" | "system";

const storageKey = "portfolio-theme";

const VALID: ReadonlySet<Theme> = new Set<Theme>(["light", "dark", "system"]);

export function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored && (VALID as Set<string>).has(stored)) {
      return stored as Theme;
    }
  } catch {
    return "system";
  }
  return "system";
}

export function persistTheme(theme: Theme) {
  try {
    localStorage.setItem(storageKey, theme);
  } catch {
    return;
  }
}
