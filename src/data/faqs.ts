export interface FAQItem {
  id: string;
  category: "general" | "services" | "donations" | "donate-goods" | "get-involved";
  question: string;
  answer: string;
}

/**
 * CMS-driven FAQ Dataset
 * Structured for simple CMS population.
 */
export const CMS_FAQS: FAQItem[] = [
  // General Category
  {
    id: "faq-gen-1",
    category: "general",
    question: "What is Bridge Global Network's mission?",
    answer:
      "Bridge Global Network works to connect communities across borders, welcoming refugees and immigrants with dignity while supporting overseas women empowerment initiatives.",
  },
  {
    id: "faq-gen-2",
    category: "general",
    question: "Is Bridge Global Network an accredited non-profit organization?",
    answer:
      "Bridge Global Network is structured as a 501(c)(3) non-profit organization. Contributions support our charitable mission and are tax-deductible.",
  },
  {
    id: "faq-gen-3",
    category: "general",
    question: "How does the organization protect participant privacy?",
    answer:
      "We adhere to strict dignity-first privacy safeguards. Sensitive personal data, full real surnames, and exact locations of arriving individuals and vulnerable families are kept confidential.",
  },

  // Services Category
  {
    id: "faq-srv-1",
    category: "services",
    question: "What primary service areas does the organization focus on?",
    answer:
      "Our core focus areas include Refugee & Immigrant Resettlement Aid, Health System Navigation, Legal Guidance Connections, Employment & Training Support, Education & Youth Aid, and Overseas Women's Empowerment Initiatives.",
  },
  {
    id: "faq-srv-2",
    category: "services",
    question: "Does Bridge Global Network provide direct legal representation or medical treatment?",
    answer:
      "No. We act as a compassionate bridge—connecting clients with accredited regional partner organizations, legal aid clinics, and healthcare providers to ensure professional care.",
  },
  {
    id: "faq-srv-3",
    category: "services",
    question: "How are overseas women empowerment initiatives supported?",
    answer:
      "We partner with local women leaders and grassroots cooperatives overseas, providing micro-grant opportunities and resource support to foster sustainable economic independence.",
  },

  // Financial Donations Category
  {
    id: "faq-don-1",
    category: "donations",
    question: "Are financial donations tax-deductible?",
    answer:
      "Yes. Financial contributions directly advance our non-profit mission and are tax-deductible. Donors receive a summary receipt for tax documentation.",
  },
  {
    id: "faq-don-2",
    category: "donations",
    question: "Can I choose between a one-time gift and a monthly donation?",
    answer:
      "Yes. Our donation page supports both one-time gifts and recurring monthly partnerships, allowing supporters to choose the level of involvement that fits their goals.",
  },
  {
    id: "faq-don-3",
    category: "donations",
    question: "Is online donation processing secure?",
    answer:
      "All online financial gifts are processed through encrypted, 256-bit SSL third-party payment providers (such as Zeffy or Give Lively) to guarantee maximum donor privacy and security.",
  },

  // Donate Goods Category
  {
    id: "faq-gds-1",
    category: "donate-goods",
    question: "What types of physical goods does the organization accept?",
    answer:
      "We accept essential items in good or new condition, including cookware starter sets, winter outerwear, school backpacks, unopened hygiene supplies, and twin/full bed linens. Please review our Current Needs list before donating.",
  },
  {
    id: "faq-gds-2",
    category: "donate-goods",
    question: "What items can you NOT accept?",
    answer:
      "For safety and logistical reasons, we cannot accept damaged furniture, used mattresses, opened hygiene items, perishable food, or bulky electrical appliances.",
  },
  {
    id: "faq-gds-3",
    category: "donate-goods",
    question: "How do I offer goods to the organization?",
    answer:
      "Visit our Donate Goods page (/donate-goods) and fill out the Goods Intake Form. Our team will review your offer and contact you with next steps.",
  },

  // Get Involved Category
  {
    id: "faq-inv-1",
    category: "get-involved",
    question: "How can I volunteer with Bridge Global Network?",
    answer:
      "We welcome volunteers for community mentorship, family arrival welcoming, collection drive hosting, and administrative assistance. Visit our Get Involved page (/get-involved) to learn more.",
  },
  {
    id: "faq-inv-2",
    category: "get-involved",
    question: "Can my business, school, or community group host a donation drive?",
    answer:
      "Yes! Community groups, schools, places of worship, and local businesses frequently host collection drives for high-priority items like winter coats or school backpacks. Contact our team to coordinate.",
  },
];
