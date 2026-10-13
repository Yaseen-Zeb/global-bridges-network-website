/** Terms & Conditions copy (approved Figma design). */

import type { PolicySection } from "@/features/legal/types";

export const TERMS_AND_CONDITIONS = {
  eyebrow: "Terms & Conditions",
  title: ["Terms for Using Our", "Website and Services"],
  description:
    "These Terms & Conditions explain the rules for using the Global Bridges Network website and engaging with our online services, donation options, and other resources.",
  lastUpdated: "September 16, 2026",
  sections: [
    {
      title: "Acceptance of Terms",
      paragraphs: [
        "By accessing or using the Global Bridges Network website, you agree to comply with these Terms & Conditions and all applicable laws and regulations.",
        "If you do not agree with these terms, please do not use our website or services.",
      ],
    },
    {
      title: "About Global Bridges Network",
      paragraphs: [
        // The design repeats section 01's first sentence here; kept as designed until the client confirms the copy.
        "By accessing or using the Global Bridges Network website, you agree to comply with these Terms & Conditions and all applicable laws and regulations.",
        "Our website provides information about our programs, services, initiatives, donation opportunities, volunteer activities, and ways to get involved.",
      ],
    },
    {
      title: "Use of Our Website",
      paragraphs: ["You agree to use this website responsibly and only for lawful purposes."],
      intro: "You must not:",
      bullets: [
        "Use the website for fraudulent or unlawful activities.",
        "Submit false, misleading, or inaccurate information.",
        "Attempt to gain unauthorized access to our systems.",
        "Interfere with the security or operation of the website.",
        "Copy, reproduce, or misuse website content without permission.",
      ],
    },
    {
      title: "Donations",
      paragraphs: ["We appreciate every contribution made to support our work."],
      intro: "By making a monetary donation through our website, you confirm that:",
      bullets: [
        "The information you provide is accurate and authorized.",
        "You are authorized to use the selected payment method.",
        "Donations are made voluntarily.",
        "Donation transactions may be processed through third-party payment providers.",
      ],
      outro:
        "Where applicable, donation receipts or acknowledgements may be provided using the contact information submitted with your donation.",
    },
    {
      title: "Goods Donations",
      paragraphs: [
        "If you offer goods or physical items to Global Bridges Network, you agree that the information provided about the items is accurate.",
        "All goods donations may be reviewed before acceptance. We reserve the right to decline items that are unsuitable, unsafe, damaged, prohibited, or not aligned with current community needs.",
        "Submitting a goods donation offer does not guarantee that the items will be accepted.",
      ],
    },
  ] satisfies PolicySection[],
};
