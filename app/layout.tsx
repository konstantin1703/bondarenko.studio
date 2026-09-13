import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import RouteTransitionBridge from "@/components/system/RouteTransitionBridge";
import VercelAnalyticsBridge from "@/components/system/VercelAnalyticsBridge";
import {
  buildRouteMetadata,
  SITE_DESCRIPTION,
  SITE_ORIGIN,
  siteStructuredData,
} from "@/lib/site-metadata";
import "./globals.css";
import "./production-polish.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  ...buildRouteMetadata({
    title: "BND Studio — цифровые системы для бизнеса, медиа и продуктов",
    shareTitle: "BND Studio",
    description: SITE_DESCRIPTION,
    path: "/",
  }),
};

export const viewport: Viewport = {
  themeColor: "#050608",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${manrope.variable} ${plexMono.variable}`}>
      <body>
        <script
          id="bnd-site-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteStructuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <RouteTransitionBridge />
        <VercelAnalyticsBridge />
      </body>
    </html>
  );
}
