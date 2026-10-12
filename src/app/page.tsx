import { CtaBanner } from "@/components/common/cta-banner";
import { BridgeSection } from "@/features/home/components/bridge-section";
import { FaqSection } from "@/features/home/components/faq-section";
import { HelpPathsSection } from "@/features/home/components/help-paths-section";
import { HeroSection } from "@/features/home/components/hero-section";
import { MissionSection } from "@/features/home/components/mission-section";
import { ServicesSection } from "@/features/home/components/services-section";
import { CTA_BANNER_IMAGE } from "@/features/home/data/home-content";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <HeroSection />
      <MissionSection />
      <BridgeSection />
      <ServicesSection />
      <HelpPathsSection />
      <FaqSection />
      <CtaBanner imageSrc={CTA_BANNER_IMAGE.src} imageAlt={CTA_BANNER_IMAGE.alt} topClassName="bg-ink" />
    </main>
  );
}
