import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { CtaBanner } from "@/components/common/cta-banner";
import { BridgeSection } from "@/features/home/components/bridge-section";
import { FaqSection } from "@/features/home/components/faq-section";
import { HelpPathsSection } from "@/features/home/components/help-paths-section";
import { HeroSection } from "@/features/home/components/hero-section";
import { MissionSection } from "@/features/home/components/mission-section";
import { ServicesSection } from "@/features/home/components/services-section";
import { CTA_BANNER_IMAGE } from "@/features/home/data/home-content";
import { sanityFetch } from "@/lib/sanity/fetch";
import { HOME_FAQS_QUERY, HOME_SERVICES_QUERY } from "@/lib/sanity/queries";
import type { HomeFaq, Service } from "@/lib/sanity/types";

export const metadata: Metadata = pageMetadata({
  title: "Global Bridges Network | Supporting Refugees, Immigrants & Communities",
  description:
    "Global Bridges Network is a 501(c)(3) nonprofit in Maryland founded by former refugees. We help refugees, immigrants, and vulnerable families with resettlement, education, legal, health, and employment support.",
  path: "/",
  keywords: ["help for refugees", "immigrant nonprofit", "community support Maryland"],
});

export default async function Home() {
  const [services, faqs] = await Promise.all([
    sanityFetch<Service[]>(HOME_SERVICES_QUERY),
    sanityFetch<HomeFaq[]>(HOME_FAQS_QUERY),
  ]);

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <HeroSection />
      <MissionSection />
      <BridgeSection />
      <ServicesSection services={services} />
      <HelpPathsSection />
      <FaqSection faqs={faqs} />
      <CtaBanner imageSrc={CTA_BANNER_IMAGE.src} imageAlt={CTA_BANNER_IMAGE.alt} topClassName="bg-ink" />
    </main>
  );
}
