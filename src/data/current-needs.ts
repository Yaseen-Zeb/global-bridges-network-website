export interface CurrentNeed {
  id: string;
  itemName: string;
  description: string;
  category: string;
  quantity?: string;
  priority?: "urgent" | "high" | "medium";
  image?: string;
  lastUpdated?: string;
  active: boolean; // active / inactive status in CMS
}

/**
 * CMS-driven Current Needs Dataset
 * MANUALLY MAINTAINED BY FOUNDERS VIA HEADLESS CMS / CONFIG FILE.
 * NOT AUTO-POPULATED FROM SUBMISSIONS.
 */
export const CMS_CURRENT_NEEDS: CurrentNeed[] = [
  {
    id: "need-1",
    itemName: "New Household Cookware Sets",
    description:
      "Pots, pans, cooking utensils, and basic kitchen starter sets for newly resettled families moving into permanent housing.",
    category: "Kitchen & Dining",
    quantity: "15 Starter Sets",
    priority: "urgent",
    lastUpdated: "March 2025",
    image: "https://images.unsplash.com/photo-1585238332058-fcc7bd56515a?auto=format&fit=crop&w=600&q=80",
    active: true,
  },
  {
    id: "need-2",
    itemName: "Winter Outerwear & Heavy Coats",
    description:
      "New or clean winter coats, boots, gloves, and warm apparel for adults and children experiencing their first winter.",
    category: "Clothing & Outerwear",
    quantity: "High Priority",
    priority: "urgent",
    lastUpdated: "March 2025",
    image: "https://images.unsplash.com/photo-1552594615-585eaaf6cba2?auto=format&fit=crop&w=600&q=80",
    active: true,
  },
  {
    id: "need-3",
    itemName: "School Backpacks & Supplies",
    description:
      "Unused backpacks, notebooks, pens, pencils, rulers, and school essentials for students enrolling in local schools.",
    category: "Education & Youth",
    quantity: "30 Backpacks",
    priority: "high",
    lastUpdated: "February 2025",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
    active: true,
  },
  {
    id: "need-4",
    itemName: "Hygiene & Personal Care Kits",
    description:
      "Unopened soap, shampoo, toothbrushes, toothpaste, deodorant, feminine care items, and infant care products.",
    category: "Hygiene & Care",
    quantity: "25 Kits",
    priority: "high",
    lastUpdated: "March 2025",
    image: "https://images.unsplash.com/photo-1584305574041-38290e2908cb?auto=format&fit=crop&w=600&q=80",
    active: true,
  },
  {
    id: "need-5",
    itemName: "Twin & Full Size Bed Linens",
    description:
      "New sheet sets, comforters, and pillows in original packaging for arriving family members.",
    category: "Home & Bedding",
    quantity: "10 Sets",
    priority: "medium",
    lastUpdated: "February 2025",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80",
    active: true,
  },
];
