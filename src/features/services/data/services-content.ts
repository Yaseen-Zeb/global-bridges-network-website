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
  // TODO: point the links at dedicated service pages once they exist.
  items: [
    {
      title: "Education & Literacy",
      description:
        "We offer practical support, resources, and opportunities that help individuals and families build safe, healthy, and independent lives.",
      link: { label: "Learn About Education", href: "/contact" },
      image: { src: `${IMG}/area-education.jpg`, alt: "A young girl in a polka-dot hijab writing at a school desk", position: "50% 35%" },
    },
    {
      title: "Resettlement Support",
      description:
        "Practical help for newly arrived refugees and immigrants as they adjust to their new communities and begin rebuilding their lives.",
      link: { label: "Explore Resettlement Support", href: "/contact" },
      image: { src: `${IMG}/area-resettlement.jpg`, alt: "A father holding his young child at the entrance of a tent", position: "46% 50%" },
    },
    {
      title: "Women Empowerment",
      description: "Resources and opportunities that help women build confidence, develop skills, and become more independent.",
      link: { label: "Explore Women’s Empowerment", href: "/contact" },
      image: { src: `${IMG}/area-women.jpg`, alt: "A group of smiling women standing together in a workshop", position: "50% 50%" },
    },
    {
      title: "Legal Guidance",
      description: "Legal support that helps individuals and families understand their options and get through important processes.",
      link: { label: "Explore Legal Support", href: "/contact" },
      image: { src: `${IMG}/area-legal.jpg`, alt: "A law book with scales of justice resting under open documents", position: "50% 60%" },
    },
  ],
};

export const APPROACH = {
  eyebrow: "Our Approach",
  title: ["Resource Navigation &", "Community Referral"],
  description:
    "Starting over in a new community can be challenging. We help individuals and families find the right services, understand their options, and access support with confidence.",
  items: [
    {
      title: ["Resource", "Navigation"],
      description: "Helping individuals and families find trusted legal, healthcare, education, and community services.",
    },
    {
      title: ["Cultural &", "Language Support"],
      description: "Fostering clear communication and welcoming guidance for diverse backgrounds.",
    },
    {
      title: ["Grassroots", "Grants"],
      description: "Supporting local women leaders overseas with grants that help strengthen their communities.",
    },
  ],
};
