/**
 * About page copy and imagery (approved Figma design).
 * Images live in /public/images/about.
 */

const IMG = "/images/about";

export const ABOUT_HERO = {
  eyebrow: "Who We Are",
  title: ["Building Belonging.", "Creating Opportunity."],
  description:
    "Global Bridges Network was founded by two former refugees. They know firsthand what it takes to start over, to leave everything behind and rebuild a life from scratch. That experience is the foundation of everything we do: the belief that every person deserves to feel safe, valued, and empowered, no matter where they come from. Give people real opportunity and support, and they don’t just get by. They thrive, and they strengthen the communities around them in the process.",
  // Background slideshow: each photo drifts slowly, then cross-fades into the next.
  images: [
    { src: `${IMG}/hero-circle.jpg`, alt: "A diverse group of people standing in a circle with their hands joined at the centre" },
    { src: `${IMG}/hero-camp.jpg`, alt: "A woman carrying a water bucket between rows of tents in a camp" },
  ],
};

export const CORE_VALUES = {
  eyebrow: "Values",
  title: "Our Core Values",
  description: "Comprehensive local resettlement programs paired with global women empowerment initiatives.",
  image: { src: `${IMG}/core-values.jpg`, alt: "Wooden blocks stacked like rising steps beneath an upward arrow" },
};

export const WHAT_WE_DO = {
  eyebrow: "What We Do",
  highlight: "Support",
  titleRest: "That",
  titleLine2: "Creates Opportunity",
  description:
    "We connect refugees, immigrants, and vulnerable communities with essential services, resources, and opportunities to move forward.",
};

export const LEADERSHIP = {
  eyebrow: "Leadership",
  title: ["Our Founders &", "Leadership Team"],
  description: "Guided by dedicated advocates with deep experience in international dialogue and community service.",
};
