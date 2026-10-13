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

export const SUPPORT_WAYS = {
  eyebrow: "Getting Started",
  title: ["Interested in", "Supporting Our Work?"],
  description:
    "Whether you are an individual looking to mentor a family, a student group seeking community service hours, or a local business wanting to host a supply drive, we welcome your initiative.",
  items: [
    { title: ["Volunteer Your", "Time"], description: "Share your time and experience by supporting our programs, community activities, or the people we serve." },
    { title: ["Provide", "Essential Goods"], description: "Donate essential goods and supplies that can help individuals and families meet everyday needs." },
    { title: ["Support", "Our Programs"], description: "Make a financial contribution to help sustain our services and expand opportunities for the communities we serve." },
    { title: ["Share", "Your Skills"], description: "Use your professional knowledge and experience to contribute to our work and strengthen the support we offer." },
    { title: ["Partner With", "Us"], description: "Work with Global Bridges Network to support our programs, strengthen community partnerships, and create lasting impact." },
    { title: ["Support Women’s", "Empowerment"], description: "Help create opportunities that enable women to develop skills, build confidence, and contribute to their communities." },
  ],
};
