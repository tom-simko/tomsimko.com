import type { Locale, SiteContent } from "../content/site-content";
import { Hero } from "./hero";

export function SitePage({ content }: { locale: Locale; content: SiteContent }) {
  return (
    <div className="site-shell" id="top">
      <main id="main">
        <Hero content={content.hero} />
      </main>
    </div>
  );
}
