"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale, SiteContent } from "../content/site-content";
import { LanguageSwitcher } from "./language-switcher";

type SiteHeaderProps = {
  locale: Locale;
  content: SiteContent;
};

export function SiteHeader({ locale, content }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { href: "#work", label: content.navigation.work },
    { href: "#approach", label: content.navigation.approach },
    { href: "#about", label: content.navigation.about },
    { href: "#contact", label: content.navigation.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className={`header${scrolled ? " scrolled" : ""}`}>
      <div className="container header-inner">
        <Link className="monogram" href={`/${locale}/`} aria-label="Tomáš Šimko home">
          tš.
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link) => (
            <a className="nav-link" href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="header-controls">
          <LanguageSwitcher locale={locale} label={content.language.label} />
          <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? content.navigation.close : content.navigation.menu} onClick={() => setMenuOpen((current) => !current)}>
            {menuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
          </button>
        </div>
      </div>
      {menuOpen ? (
        <nav id="mobile-navigation" className="mobile-menu container" aria-label="Mobile navigation">
          {links.map((link) => (
            <a className="nav-link" href={link.href} key={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
