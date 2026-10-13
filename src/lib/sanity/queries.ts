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

/** All FAQs, sorted by category then explicit order field */
export const FAQS_QUERY = groq`
  *[_type == "faq"] | order(category asc, order asc) {
    _id,
    _type,
    _createdAt,
    category,
    question,
    answer,
    order
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

export const HOME_FAQS_QUERY = groq`
  *[_type == "faq" && showOnHome == true] | order(order asc) {
    _id,
    question,
    answer
  }
`;

// ─── Services ─────────────────────────────────────────────────────────────────

/** All published services (Services page). */
export const SERVICES_QUERY = groq`
  *[_type == "serviceArea" && published != false] | order(order asc) {
    _id,
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
  *[_type == "serviceArea" && published != false] | order(order asc) [0...4] {
    _id,
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
  "journey": *[_type == "foundersJourney" && _id == "foundersJourney"][0] {
    eyebrow,
    title,
    description,
    milestones[] {
      _key,
      eyebrow,
      title,
      description,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt,
      "imageHotspot": image.hotspot
    }
  }
}`;

export const TEAM_MEMBERS_QUERY = groq`
  *[_type == "teamMember" && published != false] | order(order asc) {
    _id,
    name,
    title,
    bio,
    "photoUrl": photo.asset->url,
    "photoHotspot": photo.hotspot
  }
`;

export const WHAT_WE_DO_QUERY = groq`
  *[_type == "whatWeDo" && published != false] | order(order asc) {
    _id,
    title,
    description,
    cardSize
  }
`;

export const CORE_VALUES_QUERY = groq`
  *[_type == "coreValue"] | order(order asc) {
    _id,
    title,
    description
  }
`;

// ─── Donate page ──────────────────────────────────────────────────────────────

export const GOODS_ITEMS_QUERY = groq`
  *[_type == "goodsItem"] | order(accepted desc, order asc) {
    _id,
    title,
    description,
    accepted
  }
`;

/** "Four Ways You Can Make an Impact" (singleton). */
export const IMPACT_WAYS_QUERY = groq`
  *[_type == "impactWays" && _id == "impactWays"][0] {
    eyebrow,
    title,
    description,
    cards[] {
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
  }
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
