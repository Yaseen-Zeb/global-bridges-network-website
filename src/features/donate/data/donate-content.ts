/**
 * Donate page copy and imagery (approved Figma design).
 * Images live in /public/images/donate.
 */

const IMG = "/images/donate";

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
  email: "volunteer@globalbridgesnetwork.org",
};

export const IMPACT_WAYS = {
  eyebrow: "Practical Support",
  title: ["Four Ways You Can", "Make an Impact"],
  description: "Choose a pathway that aligns with your capacity, skills, and community goals.",
  items: [
    {
      icon: "volunteer",
      title: ["Volunteer", "Your Time"],
      description:
        "Share your skills and time as a community mentor, assist with English language practice, or help organize local welcome events.",
      action: { label: "Inquire About Volunteering", tab: "volunteer" },
      image: { src: `${IMG}/way-volunteer.jpg`, alt: "A volunteer standing with arms crossed during a forest clean-up" },
    },
    {
      icon: "goods",
      title: ["Donate", "Essential Goods"],
      description:
        "Provide physical necessities such as winter coats, cookware sets, hygiene packages, and school supplies for arriving families.",
      action: { label: "View Goods Needed", href: "#accepted-goods" },
      image: { src: `${IMG}/way-goods.jpg`, alt: "Smiling volunteers handing out water beside aid boxes" },
    },
    {
      icon: "partner",
      title: ["Partner", "With Us"],
      description:
        "Collaborate as a local business, community organization, school, or faith group to host drives or support integration efforts.",
      action: { label: "Explore Partnerships", href: "/contact" },
      image: { src: `${IMG}/way-partner.jpg`, alt: "Two older adults talking warmly over coffee" },
    },
    {
      icon: "share",
      title: ["Share", "Our Mission"],
      description:
        "Help raise awareness by sharing our stories, advocating for refugee dignity, and amplifying community voices within your networks.",
      action: { label: "Spread the Word", share: true },
      image: { src: `${IMG}/way-share.jpg`, alt: "Colleagues meeting around a conference table" },
    },
  ],
} as const;

export const GOODS_POLICY = {
  eyebrow: "Getting Started",
  accept: "Accept",
  cannotAccept: "Cannot Accept",
  description:
    "Whether you are an individual looking to mentor a family, a student group seeking community service hours, or a local business wanting to host a supply drive, we welcome your initiative.",
  accepted: [
    { title: "Household & Cookware Starter Kits", description: "Pots, pans, stainless steel cookware, dishware, eating utensils, and basic kitchen tools in clean condition." },
    { title: "Winter Outerwear & Warm Blankets", description: "Clean coats, jackets, gloves, scarves, and thermal blankets for adults and children arriving in winter months." },
    { title: "School Backpacks & Academic Supplies", description: "New or like-new backpacks, notebooks, pens, pencils, markers, and calculators for students." },
    { title: "Hygiene & Personal Care Packages", description: "Unopened soap, shampoo, toothpaste, toothbrushes, feminine hygiene products, and grooming supplies." },
    { title: "Baby & Children Supplies", description: "Unopened diapers, baby wipes, strollers, clean children’s clothing, and safe educational toys." },
  ],
  rejected: [
    { title: "Large Bulky Electrical Appliances", description: "Large refrigerators, stoves, or unverified heavy appliances due to storage limitations." },
    { title: "Damaged or Heavily Stained Items", description: "Torn clothing, broken furniture, or items requiring major repair or deep cleaning." },
    { title: "Used Mattresses & Open Bedding", description: "Used mattresses, used bed pillows, or unwashed bed linens due to health and safety regulations." },
    { title: "Opened Hygiene Products", description: "Opened, partially used, or unsealed personal care products and cosmetics." },
  ],
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
