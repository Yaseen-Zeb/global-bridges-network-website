import type { Metadata } from "next";
import { CtaBanner } from "@/components/common/cta-banner";
import { DarkCardsSection } from "@/components/common/dark-cards-section";
import { CTA_BANNER_IMAGE } from "@/features/home/data/home-content";
import { ServiceAreasSection } from "@/features/services/components/service-areas-section";
import { ServicesHero } from "@/features/services/components/services-hero";
import { APPROACH } from "@/features/services/data/services-content";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore Global Bridges Network's services: education and literacy, resettlement support, women's empowerment, legal guidance, and resource navigation for refugees, immigrants, and vulnerable families.",
  openGraph: {
    title: "Our Services | Global Bridges Network",
    description: "Essential services, resources, and opportunities to help families build safe, healthy, and self sufficient lives.",
  },
};

export default function ServicesPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <ServicesHero />
      <ServiceAreasSection />
      <DarkCardsSection id="approach" {...APPROACH} />
      <CtaBanner imageSrc={CTA_BANNER_IMAGE.src} imageAlt={CTA_BANNER_IMAGE.alt} topClassName="bg-ink" />
    </main>
  );
}
