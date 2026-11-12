/**
 * Careers page copy and imagery. Open positions come from Sanity → Open Positions.
 */

import type { PositionType } from "@/lib/sanity/types";

export const CAREERS_HERO = {
  eyebrow: "Careers",
  title: ["Careers at", "Global Bridges Network"],
  description: "Join a team helping refugees and families resettle, find stability, and build new lives in the United States.",
  images: [
    { src: "/images/about/hero-circle.jpg", alt: "A diverse group of people standing in a circle with their hands joined at the centre" },
    { src: "/images/home/mission-circle.jpg", alt: "A circle of people joining hands from above" },
  ],
};

export const CAREERS_ABOUT = {
  eyebrow: "About Us",
  title: "Who We Are",
  description:
    "Global Bridges Network is a nonprofit organization supporting refugees and vulnerable families as they rebuild their lives in the United States. Our work focuses on resettlement, health, legal support, employment, education, and women’s empowerment.",
  link: { label: "Learn More About Us", href: "/about" },
  image: { src: "/images/home/mission-hands.jpg", alt: "Hands joined together in support" },
};

export const HIRING_STEPS = {
  eyebrow: "How We Hire",
  title: "From Application\nto Team Member",
  description: "A simple, personal process. We get to know every candidate.",
  steps: [
    { title: "Apply", description: "Send us your details and CV using the form below." },
    {
      title: "We review your profile",
      description: "We read every application and look at your experience and what you would bring to the team.",
    },
    { title: "We interview", description: "If there is a good fit, we will invite you to a conversation to get to know each other." },
    {
      title: "Join the team",
      description: "Successful candidates become part of Global Bridges Network and help shape our work from the start.",
    },
  ],
};

export const CAREERS_VALUES = {
  eyebrow: "What We Value",
  title: "How We Work\nTogether",
  description: "The principles behind our work with families, and with each other.",
  items: [
    { title: "People first", description: "Everything we do starts with the families we serve." },
    { title: "Dignity and respect", description: "For the people we support and for each other." },
    { title: "Learning together", description: "We are a young organization, and we grow by listening and improving." },
    { title: "Real impact", description: "In a small team, your work makes a visible difference." },
  ],
};

export const OPEN_POSITIONS = {
  eyebrow: "Open Positions",
  title: "Current Opportunities",
  empty:
    "There are no open positions right now. You are welcome to send us your CV below, and we will be in touch if a suitable role opens.",
  apply: "Apply for This Role",
  details: "View Details",
};

export const POSITION_TYPE_LABELS: Record<PositionType, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  volunteer: "Volunteer",
};

export const APPLICATION_FORM = {
  eyebrow: "Apply",
  title: "Send Us Your Application",
  description: "Tell us a little about yourself and attach your CV, plus a cover letter if you have one. We read every application.",
  generalRole: "General application",
  consent:
    "I consent to Global Bridges Network using my details and documents to review my application. I understand my application is sent by email to the team and is not stored on this website.",
};

/** Upload rules for the CV and cover letter, shared by the form and /api/careers. */
export const DOCUMENT_RULES = {
  maxBytes: 5 * 1024 * 1024,
  extensions: [".pdf", ".doc", ".docx"],
  accept: ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  hint: "PDF or Word, up to 5 MB",
};
