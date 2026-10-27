import { addressLines } from "@/lib/contact";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";
import { sanityFetch } from "@/lib/sanity/fetch";
import { ABOUT_PAGE_QUERY, FAQS_QUERY, SERVICES_QUERY, SITE_SETTINGS_QUERY, WHAT_WE_DO_QUERY } from "@/lib/sanity/queries";
import type { AboutPageContent, FAQItem, Service, SiteSettings, WhatWeDoItem } from "@/lib/sanity/types";

/**
 * /llms.txt: a plain-text summary of the organization for AI assistants
 * (https://llmstxt.org). Built from Sanity so it stays in step with the CMS.
 */
export const revalidate = 60; // seconds; keep in step with REVALIDATE_SECONDS

const url = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;
const oneLine = (text?: string | null) => (text ?? "").replace(/\s+/g, " ").trim();

export async function GET() {
  const [settings, services, whatWeDo, faqs, about] = await Promise.all([
    sanityFetch<SiteSettings | null>(SITE_SETTINGS_QUERY),
    sanityFetch<Service[] | null>(SERVICES_QUERY),
    sanityFetch<WhatWeDoItem[] | null>(WHAT_WE_DO_QUERY),
    sanityFetch<FAQItem[] | null>(FAQS_QUERY),
    sanityFetch<AboutPageContent | null>(ABOUT_PAGE_QUERY),
  ]);

  const mission = about?.missionVision?.mission;
  const vision = about?.missionVision?.vision;
  const address = addressLines(settings?.address).join(", ");

  const lines: string[] = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "## Key facts",
    "",
    "- Type: 501(c)(3) tax-exempt public charity (US); donations are tax-deductible",
    "- EIN: 42-3467751",
    "- Founded by former refugees",
    "- Serves: refugees, immigrants, asylees, and vulnerable individuals and families",
    `- Location: ${address || "Ellicott City, Maryland, USA"}`,
    ...(settings?.email ? [`- Email: ${settings.email}`] : []),
    ...(settings?.phone ? [`- Phone: ${settings.phone}`] : []),
    `- Website: ${SITE_URL}`,
    "",
  ];

  if (mission || vision) {
    lines.push("## Mission and vision", "");
    if (mission) lines.push(`- Mission: ${oneLine(mission.description)}`);
    if (vision) lines.push(`- Vision: ${oneLine(vision.description)}`);
    lines.push("");
  }

  const programs = [...(whatWeDo ?? []), ...(services ?? [])];
  const seen = new Set<string>();
  if (programs.length) {
    lines.push("## Programs and services", "");
    for (const item of programs) {
      const key = item.title.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      lines.push(`- ${oneLine(item.title)}: ${oneLine(item.description)}`);
    }
    lines.push("");
  }

  lines.push(
    "## Pages",
    "",
    `- [Home](${url("/")}): Overview of the organization, programs, and how to help`,
    `- [About Us](${url("/about")}): Mission, vision, core values, founders journey, and leadership team`,
    `- [Our Services](${url("/services")}): Services for refugees, immigrants, and vulnerable families`,
    `- [Contact Us](${url("/contact")}): Request support or send an inquiry`,
    "",
    "## How to help",
    "",
    `- [Donate](${url("/donate")}): Give online (one-time or monthly) or offer essential goods`,
    `- [Volunteer](${url("/volunteer")}): Volunteer time and skills`,
    "",
  );

  const faqList = (faqs ?? []).filter((faq) => faq.question && faq.answer);
  if (faqList.length) {
    lines.push("## Frequently asked questions", "");
    for (const faq of faqList) lines.push(`- Q: ${oneLine(faq.question)}`, `  A: ${oneLine(faq.answer)}`);
    lines.push("", `More answers: ${url("/faqs")}`, "");
  }

  lines.push(
    "## Optional",
    "",
    `- [Privacy Policy](${url("/privacy-policy")})`,
    `- [Terms & Conditions](${url("/terms-and-conditions")})`,
    `- [Sitemap](${url("/sitemap.xml")})`,
    "",
  );

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
