import { Monitor, Moon, Sun } from "lucide-react";
import type { Theme } from "../../lib/theme";

const themeOrder: Theme[] = ["light", "dark", "system"];

const icons: Record<Theme, typeof Sun> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

const labels: Record<Theme, string> = {
  light: "Light theme",
  dark: "Dark theme",
  system: "System theme",
};

type ThemeToggleProps = {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
};

export function ThemeToggle({ theme, onThemeChange }: ThemeToggleProps) {
  const cycle = () => {
    const i = themeOrder.indexOf(theme);
    onThemeChange(themeOrder[(i + 1) % themeOrder.length]);
  };

  const Icon = icons[theme];

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={labels[theme]}
      className="rounded-full border border-border-strong bg-surface p-2.5 text-foreground shadow-2xl backdrop-blur transition hover:bg-panel focus:outline-none focus:ring-2 focus:ring-accent"
    >
      <Icon size={18} aria-hidden="true" />
    </button>
  );
}
