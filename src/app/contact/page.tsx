import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PhotoPanel } from "@/components/common/photo-panel";
import { ContactForm } from "@/features/contact/components/contact-form";
import { CONTACT_HERO } from "@/features/contact/data/contact-content";
import { HelpPathsSection } from "@/features/home/components/help-paths-section";
import { sanityFetch } from "@/lib/sanity/fetch";
import { SITE_SETTINGS_QUERY } from "@/lib/sanity/queries";
import type { SiteSettings } from "@/lib/sanity/types";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Contact Global Bridges Network in Ellicott City, Maryland. Request support, ask about our services, or reach out about volunteering, donations, and partnerships.",
  path: "/contact",
  keywords: ["contact Global Bridges Network", "request refugee support", "nonprofit partnership"],
});

export default async function ContactPage() {
  const settings = await sanityFetch<SiteSettings | null>(SITE_SETTINGS_QUERY);

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <PhotoPanel
        id="contact"
        eyebrow={CONTACT_HERO.eyebrow}
        title={CONTACT_HERO.title}
        image={{ ...CONTACT_HERO.image, className: "-scale-x-100" }}
        settings={settings}
      >
        <ContactForm categories={settings?.inquiryCategories ?? []} />
      </PhotoPanel>
      <HelpPathsSection />
    </main>
  );
}
