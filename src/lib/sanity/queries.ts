/**
 * GROQ Query Library
 *
 * Named queries for every Sanity content type.
 * Each query returns only the fields needed by the UI (projection),
 * keeping API payloads lean.
 *
 * Usage (Next.js Server Component):
 *   import { sanityFetch } from "@/lib/sanity/fetch";
 *   import { FAQS_QUERY } from "@/lib/sanity/queries";
 *   const faqs = await sanityFetch<FAQItem[]>(FAQS_QUERY);
 */

import { groq } from "next-sanity";

// ─── FAQs ─────────────────────────────────────────────────────────────────────

/** All FAQs (FAQs page), in the order set in the Studio. */
export const FAQS_QUERY = groq`
  *[_id == "faqs"][0].items[] {
    "_id": _key,
    category,
    question,
    answer
  }
`;

// ─── Site Settings (Singleton) ────────────────────────────────────────────────

/** Contact & Site Settings: footer, contact/donate panels, form options, Zeffy link. */
export const SITE_SETTINGS_QUERY = groq`
  *[_type == "contactInfo" && _id == "contactInfo"][0] {
    email,
    phone,
    address,
    volunteerEmail,
    donationFormUrl,
    socialLinks[] { platform, url },
    inquiryCategories[] { label, value }
  }
`;

// ─── Home page ────────────────────────────────────────────────────────────────

/** FAQs with "Show on Home Page" on, in list order. */
export const HOME_FAQS_QUERY = groq`
  *[_id == "faqs"][0].items[showOnHome == true] {
    "_id": _key,
    question,
    answer
  }
`;

// ─── Services ─────────────────────────────────────────────────────────────────

/** All services (Services page), in the order set in the Studio. */
export const SERVICES_QUERY = groq`
  *[_id == "services"][0].items[] {
    "_id": _key,
    title,
    description,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
    "imageHotspot": image.hotspot,
    linkLabel,
    linkHref
  }
`;

/** The first four services (home page). */
export const HOME_SERVICES_QUERY = groq`
  *[_id == "services"][0].items[0...4] {
    "_id": _key,
    title,
    description,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
    "imageHotspot": image.hotspot
  }
`;

// ─── About page ───────────────────────────────────────────────────────────────

/** Mission & Vision and Founders Journey singletons, in one request. */
export const ABOUT_PAGE_QUERY = groq`{
  "missionVision": *[_type == "missionVision" && _id == "missionVision"][0] {
    mission { eyebrow, title, description },
    vision { eyebrow, title, description }
  },
  "milestones": *[_type == "foundersJourney" && _id == "foundersJourney"][0].milestones[] {
      _key,
      eyebrow,
      title,
      description,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt,
      "imageHotspot": image.hotspot
  }
}`;

export const TEAM_MEMBERS_QUERY = groq`
  *[_id == "leadership"][0].items[] {
    "_id": _key,
    name,
    title,
    bio,
    "photoUrl": photo.asset->url,
    "photoHotspot": photo.hotspot
  }
`;

export const WHAT_WE_DO_QUERY = groq`
  *[_id == "whatWeDo"][0].items[] {
    "_id": _key,
    title,
    description,
    cardSize
  }
`;

export const CORE_VALUES_QUERY = groq`
  *[_id == "coreValues"][0].items[] {
    "_id": _key,
    title,
    description
  }
`;

// ─── Donate page ──────────────────────────────────────────────────────────────

export const GOODS_ITEMS_QUERY = groq`
  *[_id == "goods"][0].items[] {
    "_id": _key,
    title,
    description,
    "accepted": accepted != false
  }
`;

/** Cards for "Four Ways You Can Make an Impact". */
export const IMPACT_WAYS_QUERY = groq`
  *[_type == "impactWays" && _id == "impactWays"][0].cards[] {
      _key,
      icon,
      title,
      description,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt,
      "imageHotspot": image.hotspot,
      buttonLabel,
      buttonAction,
      buttonHref,
      buttonTab
  }
`;

/** Cards for "Interested in Supporting Our Work?". */
export const SUPPORT_WAYS_QUERY = groq`
  *[_type == "supportWays" && _id == "supportWays"][0].cards[] { _key, title, description }
`;

// ─── Legal pages ──────────────────────────────────────────────────────────────

/** $id: "privacyPolicy" | "termsAndConditions" */
export const LEGAL_PAGE_QUERY = groq`
  *[_type == "legalPage" && _id == $id][0] {
    eyebrow,
    titleLines,
    description,
    lastUpdated,
    sections[] { title, paragraphs, intro, bullets, outro }
  }
`;
