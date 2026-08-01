import { notFound } from "next/navigation";
import { LocaleDocument } from "../../components/locale-document";
import { SitePage } from "../../components/site-page";
import { isLocale, siteContent, type Locale } from "../../content/site-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "sk" }];
}

function personSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tomáš Šimko",
    url: "https://tomsimko.com",
    homeLocation: {
      "@type": "Place",
      name: "Bratislava, Slovakia",
    },
    knowsAbout: [
      "E-commerce",
      "Business automation",
      "Artificial intelligence",
      "Logistics",
      "Fulfillment",
      "Product development",
      "Food manufacturing",
      "Supplement manufacturing",
      "Consumer products",
      "Business operations",
    ],
    inLanguage: locale,
  };
}

export default function LocalePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  return (
    <>
      <LocaleDocument locale={locale} />
      <SitePage locale={locale} content={siteContent[locale]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema(locale)) }} />
    </>
  );
}
