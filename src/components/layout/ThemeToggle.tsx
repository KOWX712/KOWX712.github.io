import { Monitor, Moon, Sun } from "lucide-react";
import type { Theme } from "../../lib/theme";
import { cn } from "../../lib/utils";

const themes: { code: Theme; label: string; Icon: typeof Sun }[] = [
  { code: "light", label: "Light", Icon: Sun },
  { code: "dark", label: "Dark", Icon: Moon },
  { code: "system", label: "System", Icon: Monitor },
];

type ThemeToggleProps = {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
};

export function ThemeToggle({ theme, onThemeChange }: ThemeToggleProps) {
  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-border-strong bg-surface p-1 shadow-2xl backdrop-blur"
      role="group"
      aria-label="Select theme"
    >
      {themes.map(({ code, label, Icon }) => {
        const active = theme === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => onThemeChange(code)}
            aria-label={label}
            aria-pressed={active}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              active
                ? "bg-accent text-on-accent shadow"
                : "text-foreground-muted hover:text-foreground hover:bg-panel",
            )}
          >
            <Icon size={14} aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}
