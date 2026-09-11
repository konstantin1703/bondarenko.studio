import type { Metadata } from "next";
import HeroLab from "@/components/hero-lab/HeroLab";
import DiagnosticsLab from "@/components/diagnostics-lab/DiagnosticsLab";
import CapabilitiesLab from "@/components/capabilities-lab/CapabilitiesLab";
import BriefLab from "@/components/brief-lab/BriefLab";
import FooterLab from "@/components/footer-lab/FooterLab";

export const metadata: Metadata = {
  title: "BND Studio — Footer Lab",
  robots: { index: false, follow: false },
};

export default function FooterLabPage() {
  return (
    <>
      <HeroLab />
      <DiagnosticsLab />
      <CapabilitiesLab />
      <BriefLab />
      <FooterLab />
      <style>{`
        @media (max-width: 460px) {
          #brief [aria-live="polite"] > div:last-child button > span {
            display: inline !important;
          }
        }
      `}</style>
    </>
  );
}
