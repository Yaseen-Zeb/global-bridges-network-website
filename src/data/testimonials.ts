import { Testimonial } from "@/lib/sanity/types";

/**
 * CMS-driven Testimonials Data Array
 * Structured for future Headless CMS / Database integration.
 */
export const CMS_TESTIMONIALS: Testimonial[] = [
  {
    _id: "test-1",
    _type: "testimonial",
    _createdAt: "2024-01-01T00:00:00Z",
    quote:
      "When we arrived in a new country with nothing but our luggage, having someone meet us with a warm meal, airport pickup, and essential household items restored our hope. They didn't just give us items—they gave us dignity.",
    authorName: "Arriving Family Member",
    authorRole: "Resettlement Aid Recipient",
    category: "resettlement",
    date: "Spring 2025",
    imageUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=150&q=80",
    published: true,
  },
  {
    _id: "test-2",
    _type: "testimonial",
    _createdAt: "2024-01-01T00:00:00Z",
    quote:
      "The micro-grant support enabled our local women's artisan cooperative to purchase equipment and train ten new women leaders. It's creating sustainable income for families across our entire village.",
    authorName: "Community Leader & Program Partner",
    authorRole: "Overseas Women's Empowerment Initiative",
    category: "women-empowerment",
    date: "Winter 2024",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    published: true,
  },
  {
    _id: "test-3",
    _type: "testimonial",
    _createdAt: "2024-01-01T00:00:00Z",
    quote:
      "Navigating legal documents and healthcare systems can feel impossible when you don't speak the language. The guidance we received helped my family access medical care and enroll our children in school safely.",
    authorName: "Program Participant",
    authorRole: "Health & Legal Navigation Client",
    category: "resettlement",
    date: "Fall 2024",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    published: true,
  },
  {
    _id: "test-4",
    _type: "testimonial",
    _createdAt: "2024-01-01T00:00:00Z",
    quote:
      "Volunteering as a community mentor opened my eyes to the incredible resilience of new arrivals. Watching families settle in, master new skills, and build their lives has been one of the most rewarding experiences of my life.",
    authorName: "Volunteer Mentor",
    authorRole: "Community Integration Volunteer",
    category: "volunteers",
    date: "Early 2025",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    published: true,
  },
  {
    _id: "test-5",
    _type: "testimonial",
    _createdAt: "2024-01-01T00:00:00Z",
    quote:
      "Partnering with Bridge Global Network allows our local health clinic to connect newly arrived families with essential healthcare resources seamlessly. Their dignity-first approach makes all the difference.",
    authorName: "Community Healthcare Partner",
    authorRole: "Regional Non-Profit Partner",
    category: "partners",
    date: "Winter 2024",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    published: true,
  },
  {
    _id: "test-6",
    _type: "testimonial",
    _createdAt: "2024-01-01T00:00:00Z",
    quote:
      "The educational supplies and language practice sessions helped my teenagers catch up quickly in school. Knowing there is a community standing behind us gives us confidence for the future.",
    authorName: "Parent & New Arrival",
    authorRole: "Education & Youth Support Participant",
    category: "resettlement",
    date: "Late 2024",
    imageUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=150&q=80",
    published: true,
  },
];
