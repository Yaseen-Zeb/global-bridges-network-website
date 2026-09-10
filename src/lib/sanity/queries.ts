/**
 * GROQ Query Library
 *
 * Named queries for every Sanity content type.
 * Each query returns only the fields needed by the UI (projection),
 * keeping API payloads lean.
 *
 * Usage (Next.js Server Component):
 *   import { client } from "@/lib/sanity/client";
 *   import { TESTIMONIALS_QUERY } from "@/lib/sanity/queries";
 *   const testimonials = await client.fetch(TESTIMONIALS_QUERY);
 */

import { groq } from "next-sanity";

// ─── Testimonials ─────────────────────────────────────────────────────────────

/** All published testimonials, newest first */
export const TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial" && published == true] | order(_createdAt desc) {
    _id,
    _type,
    _createdAt,
    quote,
    authorName,
    authorRole,
    category,
    date,
    "imageUrl": image.asset->url,
    published
  }
`;

/** Published testimonials filtered by category */
export const TESTIMONIALS_BY_CATEGORY_QUERY = groq`
  *[_type == "testimonial" && published == true && category == $category] | order(_createdAt desc) {
    _id,
    _type,
    _createdAt,
    quote,
    authorName,
    authorRole,
    category,
    date,
    "imageUrl": image.asset->url,
    published
  }
`;

// ─── Current Needs ─────────────────────────────────────────────────────────────

/** All active current needs, sorted by priority (urgent → high → medium) */
export const CURRENT_NEEDS_QUERY = groq`
  *[_type == "currentNeed" && active == true] | order(priority asc, _createdAt asc) {
    _id,
    _type,
    _createdAt,
    itemName,
    description,
    category,
    quantity,
    priority,
    "imageUrl": image.asset->url,
    lastUpdated,
    active
  }
`;

/** Single current need by document ID */
export const CURRENT_NEED_BY_ID_QUERY = groq`
  *[_type == "currentNeed" && _id == $id][0] {
    _id,
    _type,
    _createdAt,
    itemName,
    description,
    category,
    quantity,
    priority,
    "imageUrl": image.asset->url,
    lastUpdated,
    active
  }
`;

// ─── Events ───────────────────────────────────────────────────────────────────

/** All published events */
export const EVENTS_QUERY = groq`
  *[_type == "event" && published == true] | order(_createdAt desc) {
    _id,
    _type,
    _createdAt,
    title,
    description,
    category,
    date,
    time,
    location,
    status,
    "imageUrl": image.asset->url,
    registrationUrl,
    published
  }
`;

/** Upcoming published events only */
export const UPCOMING_EVENTS_QUERY = groq`
  *[_type == "event" && published == true && status == "upcoming"] | order(_createdAt asc) {
    _id,
    _type,
    _createdAt,
    title,
    description,
    category,
    date,
    time,
    location,
    status,
    "imageUrl": image.asset->url,
    registrationUrl,
    published
  }
`;

/** Past published events only */
export const PAST_EVENTS_QUERY = groq`
  *[_type == "event" && published == true && status == "past"] | order(_createdAt desc) {
    _id,
    _type,
    _createdAt,
    title,
    description,
    category,
    date,
    time,
    location,
    status,
    "imageUrl": image.asset->url,
    registrationUrl,
    published
  }
`;

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

/** FAQs filtered by category */
export const FAQS_BY_CATEGORY_QUERY = groq`
  *[_type == "faq" && category == $category] | order(order asc) {
    _id,
    _type,
    _createdAt,
    category,
    question,
    answer,
    order
  }
`;

// ─── Contact Info (Singleton) ─────────────────────────────────────────────────

/** The single Contact Info document */
export const CONTACT_INFO_QUERY = groq`
  *[_type == "contactInfo" && _id == "contactInfo"][0] {
    _id,
    _type,
    email,
    phone,
    address,
    mapEmbedUrl,
    officeHours,
    socialLinks[] {
      platform,
      url
    }
  }
`;
