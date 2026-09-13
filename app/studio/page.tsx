import type { Metadata } from "next";
import StudioExperience from "@/components/studio/StudioExperience";

export const metadata: Metadata = {
  title: "Studio — BND Studio",
  description:
    "BND Studio — независимая digital-студия, которая соединяет стратегию, интерфейсы, медиа, AI и автоматизацию в одну работающую систему.",
  alternates: { canonical: "/studio" },
  openGraph: {
    title: "BND Studio — Studio",
    description: "Independent digital atelier. Systems, media, AI and automation.",
    url: "/studio",
    type: "website",
  },
};

export default function StudioPage() {
  return <StudioExperience />;
}
