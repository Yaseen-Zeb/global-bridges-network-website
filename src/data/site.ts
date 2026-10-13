/**
 * Site-wide navigation, calls to action, and contact details.
 * Shared by the header, footer, and CTA banner.
 */

export interface NavLink {
  label: string;
  href: string;
}

export const PRIMARY_NAV: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
  { label: "About", href: "/about" },
];

export const CTA_LINKS = {
  getInvolved: { label: "Get Involved", href: "/donate" },
  findSupport: { label: "Find Support", href: "/services" },
} as const;

export const FOOTER_COLUMNS: { title: string; links: NavLink[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { label: "Volunteer", href: "/donate?tab=volunteer" },
      { label: "Donate Goods", href: "/donate?tab=goods" },
      { label: "Donate Money", href: "/donate?tab=money" },
      { label: "Partner With Us", href: "/contact" },
    ],
  },
];

export const LEGAL_LINKS: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  // TODO: page not built yet; this link 404s until /terms-and-conditions exists.
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
];

export const SITE_CONTACT = {
  organizationName: "Global Bridges Network",
  tagline:
    "Connecting people, resources, and opportunities to create stronger communities and brighter futures.",
  email: "hello@globalbridgesnetwork.org",
  phone: "877-829-5500",
  addressLines: ["Global Bridges Network", "10201 Kings Arm Tavern Ct", "Ellicott City, MD 21042"],
};

export type SocialPlatform = "youtube" | "linkedin" | "x";

// TODO: replace "#" with the organization's real profile URLs.
export const SOCIAL_LINKS: { platform: SocialPlatform; label: string; href: string }[] = [
  { platform: "youtube", label: "YouTube", href: "#" },
  { platform: "linkedin", label: "LinkedIn", href: "#" },
  { platform: "x", label: "X (Twitter)", href: "#" },
];
