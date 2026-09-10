import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import "./globals.css";

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
  title: "BND Studio — цифровые системы для бизнеса, медиа и продуктов",
  description:
    "BND Studio проектирует сайты, медиа-системы, Telegram-продукты, AI-интеграции и автоматизацию как единую цифровую архитектуру.",
  metadataBase: new URL("https://bndstudio.art"),
  openGraph: {
    title: "BND Studio",
    description: "Цифровые системы, которые работают как одно целое.",
    type: "website",
    locale: "ru_RU",
  },
};

export const viewport: Viewport = {
  themeColor: "#070709",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${manrope.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
