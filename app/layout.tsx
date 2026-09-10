import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./v11-polish.css";
import "./v11-responsive-fix.css";

export const metadata: Metadata = {
  title: "BND Studio — цифровые системы, медиа и автоматизация",
  description:
    "Проектирование и сборка сайтов, медиа-систем, Telegram-ботов, AI-интеграций и автоматизации в единый цифровой продукт.",
  metadataBase: new URL("https://bndstudio.art"),
  openGraph: {
    title: "BND Studio",
    description: "Цифровые системы, которые работают как одно целое.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050607",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
