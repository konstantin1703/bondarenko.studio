import type { Metadata } from "next";
import SystemsExperience from "@/components/systems/SystemsExperience";
import StructuredPageData from "@/components/system/StructuredPageData";
import { buildRouteMetadata } from "@/lib/site-metadata";

const title = "Systems — BND Studio";
const description =
  "Системы BND Studio: web, media, AI, Telegram и automation как связанные цифровые контуры, а не отдельные услуги.";

export const metadata: Metadata = buildRouteMetadata({
  title,
  shareTitle: "BND Studio — Systems",
  description,
  path: "/systems",
});

export default function SystemsPage() {
  return (
    <>
      <StructuredPageData title={title} description={description} path="/systems" />
      <a className="site-skip-link" href="#systems-main">
        Перейти к содержанию
      </a>
      <div id="systems-main" tabIndex={-1}>
        <SystemsExperience />
      </div>
    </>
  );
}
