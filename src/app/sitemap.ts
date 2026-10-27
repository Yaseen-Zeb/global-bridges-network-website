import type { MetadataRoute } from "next";
import { SITE_PAGES, SITE_URL } from "@/lib/seo";

/** /sitemap.xml: every public page, so search engines and AI crawlers can find them. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return SITE_PAGES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
