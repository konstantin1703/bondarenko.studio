import type { Metadata } from "next";
import BriefRouteExperience from "@/components/brief-route/BriefRouteExperience";
import StructuredPageData from "@/components/system/StructuredPageData";
import { buildRouteMetadata } from "@/lib/site-metadata";

const title = "Бриф — BND Studio";
const description =
  "Соберите проектную спецификацию BND Studio: форматы, модули, приоритеты, сроки, бюджет и контакт в одном рабочем маршруте.";

export const metadata: Metadata = buildRouteMetadata({
  title,
  shareTitle: "BND Studio — Бриф",
  description,
  path: "/brief",
});

export default function BriefPage() {
  return (
    <>
      <StructuredPageData title={title} description={description} path="/brief" />
      <a className="site-skip-link" href="#brief-main">
        Перейти к содержанию
      </a>
      <BriefRouteExperience />
    </>
  );
}
