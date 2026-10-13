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
