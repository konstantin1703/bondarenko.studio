import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BND Studio",
    short_name: "BND",
    description: "Цифровые системы для бизнеса, медиа и продуктов.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#050608",
    theme_color: "#050608",
    lang: "ru",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
