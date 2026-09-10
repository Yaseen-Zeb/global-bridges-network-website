/**
 * TypeScript interfaces for all Sanity-driven content types.
 *
 * These interfaces are intentionally identical to the shapes in
 * frontend/src/data/* so that swapping hardcoded arrays for live
 * Sanity GROQ queries requires zero changes to UI components.
 *
 * Sanity-specific fields (_id, _type, _createdAt) are added alongside
 * the original fields.
 */

// ─── Testimonial ─────────────────────────────────────────────────────────────

export interface SanityImageAsset {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

export interface Testimonial {
  _id: string;
  _type: "testimonial";
  _createdAt: string;
  quote: string;
  authorName: string;
  authorRole: string;
  category: "resettlement" | "women-empowerment" | "volunteers" | "partners";
  date: string;
  image?: SanityImageAsset;
  /** imageUrl is resolved via the urlFor() helper, not from GROQ directly */
  imageUrl?: string;
  published: boolean;
}

// ─── Current Need ─────────────────────────────────────────────────────────────

export interface CurrentNeed {
  _id: string;
  _type: "currentNeed";
  _createdAt: string;
  itemName: string;
  description: string;
  category: string;
  quantity?: string;
  priority?: "urgent" | "high" | "medium";
  image?: SanityImageAsset;
  imageUrl?: string;
  lastUpdated?: string;
  active: boolean;
}

// ─── Event ───────────────────────────────────────────────────────────────────

export interface EventItem {
  _id: string;
  _type: "event";
  _createdAt: string;
  title: string;
  description: string;
  category: "workshop" | "community" | "volunteer-drive" | "webinar";
  date: string;
  time?: string;
  location: string;
  status: "upcoming" | "past";
  image?: SanityImageAsset;
  imageUrl?: string;
  registrationUrl?: string;
  published: boolean;
}

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

// ─── Contact Info (Singleton) ─────────────────────────────────────────────────

export interface SocialLink {
  platform: "facebook" | "instagram" | "twitter" | "linkedin" | "youtube";
  url: string;
}

export interface ContactInfo {
  _id: "contactInfo";
  _type: "contactInfo";
  email: string;
  phone?: string;
  address?: string;
  mapEmbedUrl?: string;
  officeHours?: string;
  socialLinks?: SocialLink[];
}

// ─── Team Member ──────────────────────────────────────────────────────────────

export interface TeamMember {
  _id: string;
  _type: "teamMember";
  _createdAt: string;
  name: string;
  title: string;
  bio: string;
  photoUrl?: string;
  email?: string;
  linkedin?: string;
  order: number;
  published: boolean;
}

// ─── Founding Story (Singleton) ───────────────────────────────────────────────

export interface FoundingStory {
  _id: "foundingStory";
  _type: "foundingStory";
  paragraphs: string[];
}

// ─── Service Area ─────────────────────────────────────────────────────────────

export interface ServiceArea {
  _id: string;
  _type: "serviceArea";
  _createdAt: string;
  title: string;
  description: string;
  icon?: string;
  order: number;
  published: boolean;
}

