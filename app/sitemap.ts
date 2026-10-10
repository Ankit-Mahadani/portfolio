import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/content";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllProjects();

  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({
      url: `${site.url}/work/${p.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
