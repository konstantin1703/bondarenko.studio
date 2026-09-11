import type { Metadata } from "next";
import HeroLab from "@/components/hero-lab/HeroLab";
import DiagnosticsLab from "@/components/diagnostics-lab/DiagnosticsLab";
import CapabilitiesLab from "@/components/capabilities-lab/CapabilitiesLab";
import BriefLab from "@/components/brief-lab/BriefLab";

export const metadata: Metadata = {
  title: "BND Studio — Brief Lab",
  robots: { index: false, follow: false },
};

export default function BriefLabPage() {
  return (
    <>
      <HeroLab />
      <DiagnosticsLab />
      <CapabilitiesLab />
      <BriefLab />
    </>
  );
}
