import type { Metadata } from "next";
import StudioExperience from "@/components/studio/StudioExperience";
import RouteScrollSystem from "@/components/system/RouteScrollSystem";
import StructuredPageData from "@/components/system/StructuredPageData";
import { buildRouteMetadata } from "@/lib/site-metadata";

const title = "Studio — BND Studio";
const description =
  "BND Studio — независимая digital-студия, которая соединяет стратегию, интерфейсы, медиа, AI и автоматизацию в одну работающую систему.";

export const metadata: Metadata = buildRouteMetadata({
  title,
  shareTitle: "BND Studio — Studio",
  description,
  path: "/studio",
});

export default function StudioPage() {
  return (
    <>
      <StructuredPageData title={title} description={description} path="/studio" />
      <a className="site-skip-link" href="#studio-main">
        Перейти к содержанию
      </a>
      <div id="studio-main" tabIndex={-1}>
        <StudioExperience />
        <RouteScrollSystem
          rootId="studio-main"
          labels={["STUDIO", "OPERATING", "PRINCIPLES", "CONTINUE"]}
        />
      </div>
    </>
  );
}
