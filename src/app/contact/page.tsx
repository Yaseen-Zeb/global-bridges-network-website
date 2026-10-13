import type { Metadata } from "next";
import { PhotoPanel } from "@/components/common/photo-panel";
import { ContactForm } from "@/features/contact/components/contact-form";
import { CONTACT_HERO } from "@/features/contact/data/contact-content";
import { HelpPathsSection } from "@/features/home/components/help-paths-section";
import { client } from "@/lib/sanity/client";
import { CONTACT_INFO_QUERY } from "@/lib/sanity/queries";
import type { ContactInfo } from "@/lib/sanity/types";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Global Bridges Network. Send a general inquiry, request support, or ask about volunteering, donations, and partnerships.",
  openGraph: {
    title: "Contact Us | Global Bridges Network",
    description: "Reach our administrative team through the inquiry form, shared inbox, or phone.",
    url: "https://globalbridgesnetwork.org/contact",
    type: "website",
  },
};

export default async function ContactPage() {
  const contactInfo = await client.fetch<ContactInfo | null>(CONTACT_INFO_QUERY);

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <PhotoPanel
        id="contact"
        eyebrow={CONTACT_HERO.eyebrow}
        title={CONTACT_HERO.title}
        image={{ ...CONTACT_HERO.image, className: "-scale-x-100" }}
        contactInfo={contactInfo}
      >
        <ContactForm />
      </PhotoPanel>
      <HelpPathsSection />
    </main>
  );
}
