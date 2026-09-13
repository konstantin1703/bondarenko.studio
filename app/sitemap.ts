import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://bndstudio.art",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://bndstudio.art/studio",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://bndstudio.art/systems",
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
