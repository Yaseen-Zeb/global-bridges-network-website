export interface ContactInfo {
  organizationName: string;
  addressTitle: string;
  addressDetails: string[];
  email: string;
  phoneTitle: string;
  phoneDetails: string;
  officeHours: string;
}

export interface InquiryCategoryOption {
  value: string;
  label: string;
  description?: string;
}

/**
 * CMS/Config-Driven Contact Information
 * Founders can update these fields without modifying layout code.
 */
export const CONTACT_INFO: ContactInfo = {
  organizationName: "Bridge Global Network",
  addressTitle: "Registered Office & Administration",
  addressDetails: [
    "Bridge Global Network Headquarters",
    "Greater Metropolitan Region, United States",
    "Full street address and appointment details provided upon inquiry response.",
  ],
  email: "info@globalbridgesnetwork.org",
  phoneTitle: "Administrative & Support Inquiries",
  phoneDetails: "Inquiries monitored via shared email inbox (Response within 1-2 business days)",
  officeHours: "Monday – Friday: 9:00 AM – 5:00 PM (EST)",
};

/**
 * Configurable Inquiry Category List
 */
export const INQUIRY_CATEGORIES: InquiryCategoryOption[] = [
  { value: "general", label: "General Inquiry", description: "General questions about our organization and mission" },
  { value: "request-help", label: "Request for Help", description: "Inquire about refugee, immigrant, or community support" },
  { value: "services", label: "Services Information", description: "Questions regarding our 6 primary service areas" },
  { value: "donate-goods", label: "Donate Goods", description: "Questions about item donations and drop-off logistics" },
  { value: "volunteer", label: "Volunteer & Mentorship", description: "Offer your time as a family mentor or drive organizer" },
  { value: "partnership", label: "Partnership & Collaboration", description: "Civic, healthcare, or organizational partnerships" },
  { value: "other", label: "Other", description: "Any other inquiry or feedback" },
];
