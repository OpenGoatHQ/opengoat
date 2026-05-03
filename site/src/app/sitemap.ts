import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/lib/categories";
import { allHandles, allSlugs } from "@/lib/data";

const BASE = "https://opengoat.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/manifesto",
    "/how-it-works",
    "/cli",
    "/mcp",
    "/contribute",
    "/search",
  ].map((p) => ({
    url: `${BASE}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1.0 : 0.7,
  }));

  const categoryRoutes = CATEGORIES.map((c) => ({
    url: `${BASE}/c/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const humanRoutes = allHandles().map((handle) => ({
    url: `${BASE}/${handle}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const playbookRoutes = allSlugs().map((slug) => ({
    url: `${BASE}/playbooks/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...categoryRoutes, ...humanRoutes, ...playbookRoutes];
}
