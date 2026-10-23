/**
 * Donate page copy and imagery (approved Figma design).
 */

export const DONATE_TABS = [
  { id: "money", label: "Donate Money" },
  { id: "goods", label: "Donate Goods" },
] as const;

export type DonateTab = (typeof DONATE_TABS)[number]["id"];

export function isDonateTab(value: unknown): value is DonateTab {
  return DONATE_TABS.some((tab) => tab.id === value);
}

export const DONATE_HERO = {
  title: ["Provide Essential", "Goods to Communities", "in Need"],
  image: { src: "/images/home/cta-banner.jpg", alt: "Children holding onto a chain-link fence at a camp" },
};

export const GOODS_POLICY = {
  eyebrow: "Getting Started",
  accept: "Accept",
  cannotAccept: "Cannot Accept",
  description:
    "Whether you are an individual looking to mentor a family, a student group seeking community service hours, or a local business wanting to host a supply drive, we welcome your initiative.",
};

/** Heading for the Four Ways cards (cards: Sanity → Four Ways). */
export const IMPACT_WAYS = {
  eyebrow: "Practical Support",
  title: "Four Ways You Can\nMake an Impact",
  description: "Choose a pathway that aligns with your capacity, skills, and community goals.",
};

/** Heading for the Supporting Our Work cards (cards: Sanity → Supporting Our Work). */
export const SUPPORT_WAYS = {
  eyebrow: "Getting Started",
  title: "Interested in\nSupporting Our Work?",
  description:
    "Whether you are an individual looking to mentor a family, a student group seeking community service hours, or a local business wanting to host a supply drive, we welcome your initiative.",
};
