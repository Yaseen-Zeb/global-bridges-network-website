import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { CtaBanner } from "@/components/common/cta-banner";
import { DarkCardsSection } from "@/components/common/dark-cards-section";
import { CTA_BANNER_IMAGE } from "@/features/home/data/home-content";
import { ServiceAreasSection } from "@/features/services/components/service-areas-section";
import { ServicesHero } from "@/features/services/components/services-hero";
import { APPROACH } from "@/features/services/data/services-content";
import { sanityFetch } from "@/lib/sanity/fetch";
import { SERVICES_QUERY } from "@/lib/sanity/queries";
import type { Service } from "@/lib/sanity/types";

export const metadata: Metadata = pageMetadata({
  title: "Refugee & Immigrant Services",
  description:
    "Resettlement support, education and literacy, legal guidance, health navigation, employment readiness, and women's empowerment for refugees, immigrants, and vulnerable families in Maryland and beyond.",
  path: "/services",
  keywords: ["refugee services", "immigrant services Maryland", "resettlement support", "legal guidance for immigrants", "education and literacy programs", "employment readiness"],
});

export default async function ServicesPage() {
  const services = await sanityFetch<Service[]>(SERVICES_QUERY);

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <ServicesHero />
      <ServiceAreasSection services={services} />
      <DarkCardsSection id="approach" {...APPROACH} />
      <CtaBanner imageSrc={CTA_BANNER_IMAGE.src} imageAlt={CTA_BANNER_IMAGE.alt} topClassName="bg-ink" />
    </main>
  );
}
