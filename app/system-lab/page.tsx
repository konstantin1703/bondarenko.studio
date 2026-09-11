import type { Metadata } from "next";
import HeroLab from "@/components/hero-lab/HeroLab";
import DiagnosticsLab from "@/components/diagnostics-lab/DiagnosticsLab";
import CapabilitiesLab from "@/components/capabilities-lab/CapabilitiesLab";
import BriefLab from "@/components/brief-lab/BriefLab";
import FooterLab from "@/components/footer-lab/FooterLab";

export const metadata: Metadata = {
  title: "BND Studio — System Integration",
  robots: { index: false, follow: false },
};

export default function SystemLabPage() {
  return (
    <>
      <HeroLab />
      <DiagnosticsLab />
      <CapabilitiesLab />
      <BriefLab />
      <FooterLab />
      <style>{`
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 0 !important;
        }

        #hero,
        #diagnostics,
        #capabilities,
        #brief,
        #footer {
          scroll-margin-top: 0 !important;
        }

        @media (max-width: 460px) {
          #brief [aria-live="polite"] > div:last-child button > span {
            display: inline !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
        }
      `}</style>
    </>
  );
}
