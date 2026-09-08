import type { Metadata } from "next";
import "./styles/all/01.css";
import "./styles/all/02.css";
import "./styles/all/03.css";
import "./styles/all/04.css";
import "./styles/all/05.css";
import "./styles/all/06.css";
import "./styles/all/07.css";
import "./styles/all/08.css";
import "./styles/all/09.css";
import "./styles/all/10.css";
import "./styles/all/11.css";
import "./styles/all/12.css";
import "./styles/all/13.css";
import "./styles/all/14.css";

export const metadata: Metadata = {
  title: "BONDARENKO.STUDIO — цифровые системы, медиа и автоматизация",
  description:
    "Проектирование и сборка сайтов, медиа-систем, Telegram-ботов, AI-интеграций и автоматизаций в единый цифровой продукт.",
  metadataBase: new URL("https://bondarenko.studio"),
  openGraph: {
    title: "BONDARENKO.STUDIO",
    description: "Собираю цифровые системы под реальные задачи.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
