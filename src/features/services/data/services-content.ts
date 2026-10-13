/**
 * Services page copy and imagery (approved Figma design).
 * Images live in /public/images/services.
 */

const IMG = "/images/services";

export const SERVICES_HERO = {
  eyebrow: "Our Services",
  title: ["Support That Creates", "Opportunity"],
  description:
    "We connect refugees, immigrants, asylees, and vulnerable families with essential services, resources, and opportunities to build safe, healthy, and self sufficient lives.",
  images: [
    { src: `${IMG}/hero-girl.jpg`, alt: "A smiling girl at a camp as a man gently touches her hair" },
    { src: `${IMG}/hero-classroom.jpg`, alt: "Two schoolboys in blue uniforms sitting at a classroom desk" },
  ],
};

export const SERVICE_AREAS = {
  eyebrow: "Service Areas",
  title: ["How We Support", "Our Community"],
  description:
    "We connect individuals and families with the services, resources, and opportunities they need to build secure and self sufficient lives.",
};

export const APPROACH = {
  eyebrow: "Our Approach",
  title: "Resource Navigation &\nCommunity Referral",
  description:
    "Starting over in a new community can be challenging. We help individuals and families find the right services, understand their options, and access support with confidence.",
  items: [
    {
      title: "Resource\nNavigation",
      description: "Helping individuals and families find trusted legal, healthcare, education, and community services.",
    },
    {
      title: "Cultural &\nLanguage Support",
      description: "Fostering clear communication and welcoming guidance for diverse backgrounds.",
    },
    {
      title: "Grassroots\nGrants",
      description: "Supporting local women leaders overseas with grants that help strengthen their communities.",
    },
  ],
};
