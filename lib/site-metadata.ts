import type { Metadata } from "next";

export const SITE_NAME = "BND Studio";
export const SITE_ORIGIN = "https://bndstudio.art";
export const SITE_URL = `${SITE_ORIGIN}/`;
export const SITE_DESCRIPTION =
  "BND Studio проектирует сайты, медиа-системы, Telegram-продукты, AI-интеграции и автоматизацию как единую цифровую архитектуру.";

const SOCIAL_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "BND Studio — цифровые системы",
};

type RouteMetadataInput = {
  title: string;
  description: string;
  path: "/" | "/studio" | "/systems" | "/brief";
  shareTitle?: string;
};

export function absoluteSiteUrl(path: RouteMetadataInput["path"]): string {
  return new URL(path, SITE_URL).toString();
}

export function buildRouteMetadata({
  title,
  description,
  path,
  shareTitle = title,
}: RouteMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: shareTitle,
      description,
      url: path,
      type: "website",
      locale: "ru_RU",
      siteName: SITE_NAME,
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [SOCIAL_IMAGE.url],
    },
  };
}

export const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "ru",
      publisher: { "@id": `${SITE_URL}#organization` },
    },
  ],
};

export function buildWebPageStructuredData({
  title,
  description,
  path,
}: Pick<RouteMetadataInput, "title" | "description" | "path">) {
  const url = absoluteSiteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: "ru",
    isPartOf: { "@id": `${SITE_URL}#website` },
    about: { "@id": `${SITE_URL}#organization` },
    publisher: { "@id": `${SITE_URL}#organization` },
  };
}
