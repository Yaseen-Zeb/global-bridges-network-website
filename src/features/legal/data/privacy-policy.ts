/** Privacy Policy copy (approved Figma design). */

export interface PolicySection {
  title: string;
  paragraphs?: string[];
  intro?: string;
  bullets?: string[];
  outro?: string;
}

export const PRIVACY_POLICY = {
  eyebrow: "Privacy Policy",
  title: ["Your Privacy", "Matters"],
  description:
    "We respect your privacy and are committed to protecting the information you share with Global Bridges Network.",
  lastUpdated: "September 16, 2026",
  sections: [
    {
      title: "Introduction",
      paragraphs: [
        "Global Bridges Network (“we,” “our,” or “us”) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard information when you visit our website, contact us, volunteer, donate, or engage with our programs and services.",
      ],
    },
    {
      title: "Information We Collect",
      intro: "We may collect personal information that you provide directly to us, including:",
      bullets: [
        "Contact Information: Name, email address, phone number, and mailing address.",
        "Donation Information: Details related to financial or in-kind donations.",
        "Volunteer Information: Details submitted through volunteer forms.",
        "Inquiry Information: Messages or requests submitted through our contact forms.",
      ],
    },
    {
      title: "How We Use Your Information",
      intro: "We use the information we collect to:",
      bullets: [
        "Respond to your inquiries and provide requested services.",
        "Process donations and send appropriate acknowledgements.",
        "Communicate about our programs, events, and opportunities.",
        "Improve our website, services, and user experience.",
        "Comply with applicable legal and regulatory requirements.",
      ],
    },
    {
      title: "Sharing Your Information",
      paragraphs: ["We do not sell, rent, or trade your personal information."],
      intro: "We may share information only when necessary:",
      bullets: [
        "With trusted service providers who help us operate our website and programs.",
        "When required by law or to comply with legal obligations.",
        "To protect the safety, rights, or property of Global Bridges Network, our community, or others.",
      ],
    },
    {
      title: "Cookies & Tracking Technologies",
      paragraphs: [
        "Our website may use cookies and similar technologies to improve your browsing experience and understand how our website is used.",
        "You can adjust your browser settings to disable cookies if you prefer.",
      ],
    },
  ] satisfies PolicySection[],
};
