"use client";

import { useEffect } from "react";

export default function LanguageChoice() {
  useEffect(() => {
    const stored = window.localStorage.getItem("tomsimko-language");
    const browserLanguage = navigator.language?.toLowerCase() ?? "";
    const locale = stored === "sk" || stored === "en" ? stored : browserLanguage.startsWith("sk") || browserLanguage.startsWith("cs") ? "sk" : "en";
    window.location.replace(`/${locale}/`);
  }, []);

  return (
    <main className="container" style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <p className="mono-label">Tomáš Šimko</p>
        <p>Choose a language / Vyberte jazyk</p>
        <p>
          <a className="text-link" href="/sk/">Slovenčina</a> · <a className="text-link" href="/en/">English</a>
        </p>
      </div>
    </main>
  );
}
