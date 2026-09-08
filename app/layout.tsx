import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BONDARENKO.STUDIO — цифровые продукты как система",
  description: "Стратегия, интерфейс, контент, AI, Telegram и автоматизация в одной архитектуре.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
