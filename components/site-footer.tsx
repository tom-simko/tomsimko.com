import { ArrowUp } from "lucide-react";
import Link from "next/link";
import type { Locale, SiteContent } from "../content/site-content";
import { LanguageSwitcher } from "./language-switcher";

export function SiteFooter({ locale, content }: { locale: Locale; content: SiteContent }) {
  return (
    <footer className="site-footer container">
      <div className="footer-inner">
        <div className="footer-copy">
          <span>© {new Date().getFullYear()} Tomáš Šimko</span>
          <span>{content.footer.built}</span>
        </div>
        <div className="footer-actions">
          <LanguageSwitcher locale={locale} label={content.language.label} />
          <Link className="footer-link" href="#top">
            {content.footer.backToTop} <ArrowUp size={13} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
