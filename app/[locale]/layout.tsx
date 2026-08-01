import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, siteContent, type Locale } from "../../content/site-content";
import { LocaleDocument } from "../../components/locale-document";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "sk" }];
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale: rawLocale } = params;
  if (!isLocale(rawLocale)) return {};
  const locale: Locale = rawLocale;
  const content = siteContent[locale];
  const image = `/og/tomas-simko-${locale}.jpg`;
  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: `https://tomsimko.com/${locale}/`,
      languages: {
        sk: "https://tomsimko.com/sk/",
        en: "https://tomsimko.com/en/",
        "x-default": "https://tomsimko.com/",
      },
    },
    openGraph: {
      title: content.metadata.ogTitle,
      description: content.metadata.ogDescription,
      url: `https://tomsimko.com/${locale}/`,
      siteName: "Tomáš Šimko",
      locale: locale === "sk" ? "sk_SK" : "en_US",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: content.hero.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: content.metadata.ogTitle,
      description: content.metadata.ogDescription,
      images: [image],
    },
  };
}

export default function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  return (
    <>
      <LocaleDocument locale={params.locale} />
      {children}
    </>
  );
}
