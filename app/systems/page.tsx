import type { Metadata } from "next";
import SystemsExperience from "@/components/systems/SystemsExperience";
import RouteScrollSystem from "@/components/system/RouteScrollSystem";
import StructuredPageData from "@/components/system/StructuredPageData";
import { buildRouteMetadata } from "@/lib/site-metadata";

const title = "Системы — BND Studio";
const description =
  "Системы BND Studio: Web, медиа, AI, Telegram и автоматизация как связанные цифровые контуры, а не отдельные услуги.";

export const metadata: Metadata = buildRouteMetadata({
  title,
  shareTitle: "BND Studio — Системы",
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
        <RouteScrollSystem
          rootId="systems-main"
          labels={["СИСТЕМЫ", "СХЕМА", "СЛОИ", "СБОРКА"]}
        />
      </div>
    </>
  );
}
