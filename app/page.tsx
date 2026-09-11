import HeroLab from "@/components/hero-lab/HeroLab";
import DiagnosticsLab from "@/components/diagnostics-lab/DiagnosticsLab";
import CapabilitiesLab from "@/components/capabilities-lab/CapabilitiesLab";
import BriefLab from "@/components/brief-lab/BriefLab";
import FooterLab from "@/components/footer-lab/FooterLab";

const siteUrl = "https://bndstudio.art/";
const siteDescription =
  "BND Studio проектирует сайты, медиа-системы, Telegram-продукты, AI-интеграции и автоматизацию как единую цифровую архитектуру.";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}#organization`,
      name: "BND Studio",
      url: siteUrl,
      description: siteDescription,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}#website`,
      url: siteUrl,
      name: "BND Studio",
      description: siteDescription,
      inLanguage: "ru",
      publisher: { "@id": `${siteUrl}#organization` },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        id="bnd-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <a className="site-skip-link" href="#main-content">
        Перейти к содержанию
      </a>

      <main id="main-content" tabIndex={-1}>
        <HeroLab />
        <DiagnosticsLab />
        <CapabilitiesLab />
        <BriefLab />
      </main>
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
          scroll-margin-top: 0;
        }

        @media (max-width: 680px) {
          #hero h1 > span:last-child {
            margin-left: 2vw !important;
            font-size: 0.9em;
          }
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
