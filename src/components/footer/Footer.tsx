import type { Locale } from "../../data/i18n";
import { copy } from "../../data/i18n";
import { Reveal } from "../layout/Reveal";

type FooterProps = {
  locale: Locale;
};

export function Footer({ locale }: FooterProps) {
  return (
    <footer className="border-t border-border px-5 py-8 text-center text-sm text-foreground-subtle">
      <Reveal amount={0.3}>
        <p>Copyright © 2026 KOWX712</p>
        <p className="mt-2">www.kowx712.cc</p>
        <p className="mt-2">{copy[locale].footerLicense}</p>
      </Reveal>
    </footer>
  );
}
