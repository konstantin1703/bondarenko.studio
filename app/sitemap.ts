import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://bndstudio.art",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
