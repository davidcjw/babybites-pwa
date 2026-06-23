import type { MetadataRoute } from "next";
import { RECIPES } from "@/lib/recipes";

const SITE_URL = "https://babybites.davidcjw.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/browse`, changeFrequency: "monthly", priority: 0.8 },
  ];
  const recipes: MetadataRoute.Sitemap = RECIPES.map((r) => ({
    url: `${SITE_URL}/recipe/${r.id}`,
    changeFrequency: "yearly",
    priority: 0.6,
  }));
  return [...pages, ...recipes];
}
