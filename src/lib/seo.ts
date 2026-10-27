import type { Metadata } from "next";

/**
 * Site-wide SEO settings. Set NEXT_PUBLIC_SITE_URL on the host if the site is
 * served from a different domain (e.g. a preview deployment).
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://globalbridgesnetwork.org").replace(/\/$/, "");

export const SITE_NAME = "Global Bridges Network";

export const SITE_DESCRIPTION =
  "Global Bridges Network is a 501(c)(3) nonprofit in Ellicott City, Maryland, founded by former refugees. We help refugees, immigrants, asylees, and vulnerable families with resettlement, education, legal guidance, health navigation, employment readiness, and women's empowerment.";

/** Default social share card (public/og-image.jpg, 1200×630). */
export const OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Global Bridges Network: Supporting People. Strengthening Communities.",
};

/** Search terms the whole site is about; each page adds its own. */
export const SITE_KEYWORDS = [
  "Global Bridges Network",
  "refugee support",
  "immigrant support",
  "refugee resettlement",
  "asylee assistance",
  "nonprofit Maryland",
  "Ellicott City nonprofit",
  "Howard County nonprofit",
  "501(c)(3) charity",
  "women's empowerment",
];

interface PageSeo {
  /** Short page title; the layout appends "| Global Bridges Network". */
  title: string;
  description: string;
  /** Path starting with "/", e.g. "/donate". */
  path: string;
  keywords?: string[];
  /** Set false for pages that shouldn't appear in search results. */
  index?: boolean;
}

/** Consistent title, description, keywords, canonical URL and social cards for a page. */
export function pageMetadata({ title, description, path, keywords = [], index = true }: PageSeo): Metadata {
  const fullTitle = path === "/" ? title : `${title} | ${SITE_NAME}`;
  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    keywords: [...keywords, ...SITE_KEYWORDS],
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: SITE_NAME,
      url: path,
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
    ...(index ? {} : { robots: { index: false, follow: true } }),
  };
}

/** Public pages, used by sitemap.xml and llms.txt. */
export const SITE_PAGES = [
  { path: "/", name: "Home", priority: 1.0, changeFrequency: "weekly" },
  { path: "/about", name: "About Us", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services", name: "Our Services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/donate", name: "Donate", priority: 0.9, changeFrequency: "monthly" },
  { path: "/volunteer", name: "Volunteer", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", name: "Contact Us", priority: 0.8, changeFrequency: "yearly" },
  { path: "/faqs", name: "FAQs", priority: 0.7, changeFrequency: "monthly" },
  { path: "/privacy-policy", name: "Privacy Policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms-and-conditions", name: "Terms & Conditions", priority: 0.3, changeFrequency: "yearly" },
] as const;
