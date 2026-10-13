/**
 * Donate page copy and imagery (approved Figma design).
 */

export const DONATE_TABS = [
  { id: "goods", label: "Donate Goods" },
  { id: "money", label: "Donate Money" },
  { id: "volunteer", label: "Volunteer" },
] as const;

export type DonateTab = (typeof DONATE_TABS)[number]["id"];

export function isDonateTab(value: unknown): value is DonateTab {
  return DONATE_TABS.some((tab) => tab.id === value);
}

export const DONATE_HERO = {
  title: ["Provide Essential", "Goods to Communities", "in Need"],
  image: { src: "/images/home/cta-banner.jpg", alt: "Children holding onto a chain-link fence at a camp" },
};

export const VOLUNTEER_TAB = {
  eyebrow: "Volunteer With Us",
  title: ["Make a Difference", "Through Your Time", "& Skills"],
  description:
    "Thank you for your interest in volunteering with Global Bridges Network. Your time, skills, and compassion can help refugees, immigrants, and vulnerable communities access support and opportunity.",
  prompt: "Interested in Volunteering?",
  promptText: "Have questions or want to learn more?",
};

export const GOODS_POLICY = {
  eyebrow: "Getting Started",
  accept: "Accept",
  cannotAccept: "Cannot Accept",
  description:
    "Whether you are an individual looking to mentor a family, a student group seeking community service hours, or a local business wanting to host a supply drive, we welcome your initiative.",
};
