/**
 * Home page copy and imagery (approved Figma design).
 * Images live in /public/images/home — export them from Figma with these file names.
 */

const IMG = "/images/home";

export const HERO = {
  eyebrow: "Global Bridges Network",
  highlight: "Supporting",
  titleRest: "People.",
  titleLine2: "Strengthening Communities.",
  description:
    "We support refugees and immigrants, empower women, and strengthen communities through access to essential resources and opportunities.",
  // Photos for the continuously scrolling strip, shown in this order (all 900px tall).
  panels: [
    { src: `${IMG}/hero-panel-1.jpg`, width: 900, height: 900, alt: "Smiling children sitting together" },
    { src: `${IMG}/hero-panel-2.jpg`, width: 538, height: 900, alt: "A father holding his young child" },
    { src: `${IMG}/hero-panel-3.jpg`, width: 507, height: 900, alt: "An elderly woman sitting at a camp" },
    { src: `${IMG}/hero-panel-4.jpg`, width: 679, height: 900, alt: "Two young boys" },
    { src: `${IMG}/hero-panel-5.jpg`, width: 759, height: 900, alt: "A girl looking through a fence" },
  ],
};

export const MISSION = {
  eyebrow: "Our Mission",
  title: "Creating Change Through Connection",
  description:
    "Global Bridges Network empowers refugees, immigrants, asylees, and vulnerable individuals and families to build safe, healthy, and self sufficient lives through practical support, opportunity, and community partnerships.",
  featureImage: { src: `${IMG}/mission-girl.jpg`, alt: "A smiling young girl washing clothes outdoors" },
  cards: [
    {
      title: "Connecting People to Opportunity",
      description:
        "We help individuals and families overcome the challenges of resettlement and build the skills, stability, and confidence needed for their next chapter.",
      image: { src: `${IMG}/mission-hands.jpg`, alt: "Hands joined together in support" },
    },
    {
      title: "Building Stronger Communities",
      description:
        "We work with communities and partners to create opportunities for people to contribute, participate, and build a stronger future together.",
      image: { src: `${IMG}/mission-circle.jpg`, alt: "A circle of people joining hands from above" },
    },
  ],
};

export const BRIDGE = {
  eyebrow: "The Bridge",
  title: ["Turning Needs", "Into Possibilities"],
  description:
    "Explore the services and opportunities we connect people with, helping communities access the right support when it matters most.",
  steps: [
    {
      number: "01",
      title: "Need",
      description: "Understanding the needs of individuals and communities.",
      image: { src: `${IMG}/bridge-need.jpg`, alt: "A young girl washing a bowl outside a tent in a muddy camp" },
    },
    {
      number: "02",
      title: "Connect",
      description: "Connecting people with the right resources and support.",
      image: { src: `${IMG}/bridge-connect.jpg`, alt: "A man gently touching a young girl's head" },
    },
    {
      number: "03",
      title: "Support",
      description: "Providing services, opportunities, and practical assistance.",
      image: { src: `${IMG}/bridge-support.jpg`, alt: "Hands stacked together in unity" },
    },
    {
      number: "04",
      title: "Impact",
      description: "Helping people build stronger lives and communities.",
      image: { src: `${IMG}/bridge-impact.jpg`, alt: "A group of smiling children sitting together" },
    },
  ],
};

export const SERVICES = {
  eyebrow: "Our Services",
  highlight: "Support",
  titleRest: "for",
  titleLine2: "Every Step Forward",
  description:
    "We provide practical support and opportunities that help individuals and communities build more secure and independent futures.",
  seeMore: { label: "See All Services", href: "/services" },
};

export const HELP_PATHS = [
  {
    title: "I Want To Help",
    description: "Make a difference through your time, skills, resources, or financial support.",
    cta: "getInvolved",
    align: "left",
    image: { src: `${IMG}/help-want.jpg`, alt: "A young girl looking through a fence" },
  },
  {
    title: "I Need Support",
    description: "Find services, resources, and support available through our programs and community network.",
    cta: "findSupport",
    align: "right",
    image: { src: `${IMG}/help-need.jpg`, alt: "A mother washing clothes beside her child at a camp" },
  },
] as const;

export const FAQ = {
  eyebrow: "FAQ",
  highlight: "Questions?",
  title: "Let’s Make It Clear.",
};

export const CTA_BANNER_IMAGE = { src: `${IMG}/cta-banner.jpg`, alt: "A group of children holding onto a chain-link fence at a camp" };
