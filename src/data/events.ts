export interface EventItem {
  id: string;
  title: string;
  description: string;
  category: "workshop" | "community" | "volunteer-drive" | "webinar";
  date: string;
  time?: string;
  location: string;
  status: "upcoming" | "past";
  image?: string;
  registrationUrl?: string;
  published: boolean;
}

/**
 * CMS-driven Events Dataset
 * Founders can add, edit, or publish events without code changes.
 */
export const CMS_EVENTS: EventItem[] = [
  {
    id: "evt-1",
    title: "Newcomer Orientation & Resource Navigation Workshop",
    description:
      "Interactive session for newly arrived families covering local healthcare navigation, public transportation, library resources, and community safety.",
    category: "workshop",
    date: "April 12, 2025",
    time: "10:00 AM – 12:30 PM EST",
    location: "Metropolitan Community Center & Online",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    registrationUrl: "/contact",
    published: true,
  },
  {
    id: "evt-2",
    title: "Spring Cultural Welcome Dinner & Community Exchange",
    description:
      "Community gathering bringing together arriving families, volunteer mentors, and neighborhood partners for a shared potluck dinner and cultural exchange.",
    category: "community",
    date: "April 26, 2025",
    time: "5:30 PM – 8:00 PM EST",
    location: "Civic Hall Auditorium",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1784802010728-2d0fa7394302?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8U3ByaW5nJTIwQ3VsdHVyYWwlMjBXZWxjb21lJTIwRGlubmVyJTIwJTI2JTIwQ29tbXVuaXR5JTIwRXhjaGFuZ2V8ZW58MHx8MHx8fDA%3D",
    registrationUrl: "/contact",
    published: true,
  },
  {
    id: "evt-3",
    title: "Community Mentor & Volunteer Orientation",
    description:
      "Training session for individuals interested in becoming family integration mentors, language practice partners, or donation drive coordinators.",
    category: "volunteer-drive",
    date: "May 10, 2025",
    time: "1:00 PM – 3:00 PM EST",
    location: "Bridge Global Network Hub & Virtual Zoom",
    status: "upcoming",
    image: "https://plus.unsplash.com/premium_photo-1683134557797-55ab062573b5?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    registrationUrl: "/get-involved",
    published: true,
  },
  {
    id: "evt-4",
    title: "Overseas Women Entrepreneurship Micro-Grant Webinar",
    description:
      "Virtual showcase featuring grassroots women leaders from our overseas partner cooperatives presenting their local micro-business achievements.",
    category: "webinar",
    date: "May 24, 2025",
    time: "11:00 AM – 12:30 PM EST",
    location: "Global Online Webinar",
    status: "upcoming",
    image: "https://plus.unsplash.com/premium_photo-1723802460880-8ad33bb0d685?q=80&w=826&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    registrationUrl: "/contact",
    published: true,
  },
  {
    id: "evt-5",
    title: "Winter Coat & Outerwear Distribution Drive",
    description:
      "Community collection drive and distribution event providing winter apparel, boots, and blankets to arriving refugee and immigrant families.",
    category: "community",
    date: "January 18, 2025",
    time: "9:00 AM – 2:00 PM EST",
    location: "Central Regional Welcome Depot",
    status: "past",
    image: "https://plus.unsplash.com/premium_photo-1663051345433-8a643fa751aa?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    published: true,
  },
];
