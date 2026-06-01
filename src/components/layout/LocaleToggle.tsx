import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";
import type { Locale } from "../../data/i18n";

const locales: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "zh", label: "中文" },
];

type LocaleToggleProps = {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
};

export function LocaleToggle({ locale, onLocaleChange }: LocaleToggleProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="rounded-full border border-border-strong bg-surface p-2.5 text-foreground shadow-2xl backdrop-blur transition hover:bg-panel focus:outline-none focus:ring-2 focus:ring-accent"
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Select language"
        aria-expanded={open}
      >
        <Globe size={18} aria-hidden="true" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-32 overflow-hidden rounded-xl border border-border-strong bg-surface shadow-2xl backdrop-blur-xl">
          {locales.map((lang) => (
            <button
              key={lang.code}
              className={`w-full px-4 py-2.5 text-left text-sm transition hover:bg-panel ${
                locale === lang.code ? "text-accent" : "text-foreground"
              }`}
              type="button"
              onClick={() => {
                onLocaleChange(lang.code);
                setOpen(false);
              }}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
