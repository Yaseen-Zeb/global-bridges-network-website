export interface InquiryCategoryOption {
  value: string;
  label: string;
  description?: string;
}

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
