/**
 * TypeScript interfaces for all Sanity-driven content types.
 *
 * Shapes match the GROQ projections in ./queries.ts; Sanity system fields
 * (_id, _type, _createdAt) are included where the queries return them.
 */

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export interface FAQItem {
  _id: string;
  _type: "faq";
  _createdAt: string;
  category: "general" | "services" | "donations" | "donate-goods" | "get-involved";
  question: string;
  answer: string;
  order: number;
}

// ─── Site Settings (Singleton) ────────────────────────────────────────────────

export type SocialPlatform = "facebook" | "instagram" | "twitter" | "linkedin" | "youtube";

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

export interface InquiryCategory {
  label: string;
  value: string;
}

export interface SiteSettings {
  email?: string;
  phone?: string;
  /** One line per row. */
  address?: string;
  volunteerEmail?: string;
  donationFormUrl?: string;
  socialLinks?: SocialLink[] | null;
  inquiryCategories?: InquiryCategory[] | null;
}

// ─── Shared ───────────────────────────────────────────────────────────────────

/** Hotspot set in the Studio; turned into a CSS object-position. */
export interface ImageHotspot {
  x: number;
  y: number;
}

export function hotspotPosition(hotspot?: ImageHotspot | null) {
  return hotspot ? `${Math.round(hotspot.x * 100)}% ${Math.round(hotspot.y * 100)}%` : undefined;
}

// ─── Home / Services / About ──────────────────────────────────────────────────

export interface HomeFaq {
  _id: string;
  question: string;
  answer: string;
}

export interface Service {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  imageHotspot?: ImageHotspot | null;
  linkLabel?: string;
  linkHref?: string;
}

export interface WhatWeDoItem {
  _id: string;
  title: string;
  description: string;
  cardSize?: "default" | "featured" | "wide";
}

export interface TeamMember {
  _id: string;
  name: string;
  title: string;
  /** Paragraphs. Entries created before the redesign may still hold a single string. */
  bio: string[] | string | null;
  photoUrl?: string;
  photoHotspot?: ImageHotspot | null;
}

/** Titles keep the line breaks typed in the Studio (render with whitespace-pre-line). */
export interface Statement {
  eyebrow: string;
  title: string;
  description: string;
}

export interface Milestone {
  _key: string;
  eyebrow: string;
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  imageHotspot?: ImageHotspot | null;
}

export interface MissionVision {
  mission?: Statement | null;
  vision?: Statement | null;
}

export interface FoundersJourney {
  eyebrow?: string;
  title?: string;
  description?: string;
  milestones?: Milestone[] | null;
}

export interface AboutPageContent {
  missionVision: MissionVision | null;
  journey: FoundersJourney | null;
}

export interface CoreValue {
  _id: string;
  title: string;
  description: string;
}

// ─── Donate ───────────────────────────────────────────────────────────────────

export interface GoodsItem {
  _id: string;
  title: string;
  description: string;
  accepted: boolean;
}

export type ImpactIcon = "volunteer" | "goods" | "partner" | "share" | "heart" | "gift";

export interface ImpactCard {
  _key: string;
  icon: ImpactIcon;
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  imageHotspot?: ImageHotspot | null;
  buttonLabel: string;
  buttonAction: "link" | "tab" | "share";
  buttonHref?: string;
  buttonTab?: "goods" | "money" | "volunteer";
}

export interface ImpactWays {
  eyebrow: string;
  title: string;
  description?: string;
  cards?: ImpactCard[] | null;
}

// ─── Legal pages ──────────────────────────────────────────────────────────────

export interface LegalSection {
  title: string;
  paragraphs?: string[] | null;
  intro?: string | null;
  bullets?: string[] | null;
  outro?: string | null;
}

export interface LegalPage {
  eyebrow: string;
  titleLines: string[];
  description: string;
  /** YYYY-MM-DD */
  lastUpdated: string;
  sections: LegalSection[];
}
