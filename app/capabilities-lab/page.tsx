import type { Metadata } from "next";
import HeroLab from "@/components/hero-lab/HeroLab";
import DiagnosticsLab from "@/components/diagnostics-lab/DiagnosticsLab";
import CapabilitiesLab from "@/components/capabilities-lab/CapabilitiesLab";

export const metadata: Metadata = {
  title: "BND Studio — Capabilities Lab",
  robots: { index: false, follow: false },
};

export default function CapabilitiesLabPage() {
  return (
    <>
      <HeroLab />
      <DiagnosticsLab />
      <CapabilitiesLab />
    </>
  );
}
