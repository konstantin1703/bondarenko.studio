import type { Metadata } from "next";
import BriefRouteExperience from "@/components/brief-route/BriefRouteExperience";

export const metadata: Metadata = {
  title: "Brief — BND Studio",
  description:
    "Соберите проектную спецификацию BND Studio: формат, модули, приоритеты, сроки, бюджет и контакт в одном рабочем маршруте.",
  alternates: { canonical: "/brief" },
  openGraph: {
    title: "BND Studio — Brief",
    description: "Project specification interface for digital systems, media and automation.",
    url: "/brief",
    type: "website",
  },
};

export default function BriefPage() {
  return (
    <>
      <a className="site-skip-link" href="#brief-main">
        Перейти к содержанию
      </a>
      <BriefRouteExperience />
    </>
  );
}
