"use client";

import Link from "next/link";
import type { Locale } from "../content/site-content";

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
};

export function LanguageSwitcher({ locale, label }: LanguageSwitcherProps) {
  function rememberLanguage(targetLocale: Locale) {
    window.localStorage.setItem("tomsimko-language", targetLocale);
  }

  return (
    <div className="language-switcher" aria-label={label}>
      <Link className="language-option" href="/en/" lang="en" aria-current={locale === "en" ? "page" : undefined} onClick={() => rememberLanguage("en")}>
        EN
      </Link>
      <Link className="language-option" href="/sk/" lang="sk" aria-current={locale === "sk" ? "page" : undefined} onClick={() => rememberLanguage("sk")}>
        SK
      </Link>
    </div>
  );
}
