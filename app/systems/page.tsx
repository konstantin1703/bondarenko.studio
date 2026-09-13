import type { Metadata } from "next";
import SystemsExperience from "@/components/systems/SystemsExperience";

export const metadata: Metadata = {
  title: "Systems — BND Studio",
  description:
    "Системы BND Studio: web, media, AI, Telegram и automation как связанные цифровые контуры, а не отдельные услуги.",
  alternates: { canonical: "/systems" },
  openGraph: {
    title: "BND Studio — Systems",
    description: "Digital systems, media and automation routed into one product architecture.",
    url: "/systems",
    type: "website",
  },
};

export default function SystemsPage() {
  return (
    <>
      <a className="site-skip-link" href="#systems-main">
        Перейти к содержанию
      </a>
      <div id="systems-main" tabIndex={-1}>
        <SystemsExperience />
      </div>
    </>
  );
}
