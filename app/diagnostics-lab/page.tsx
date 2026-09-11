import type { Metadata } from "next";
import HeroLab from "@/components/hero-lab/HeroLab";
import DiagnosticsLab from "@/components/diagnostics-lab/DiagnosticsLab";

export const metadata: Metadata = {
  title: "BND Studio — Diagnostics Lab",
  robots: { index: false, follow: false },
};

export default function DiagnosticsLabPage() {
  return (
    <>
      <HeroLab />
      <DiagnosticsLab />
    </>
  );
}
