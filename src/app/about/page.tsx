import type { Metadata } from "next";
import { CtaBanner } from "@/components/common/cta-banner";
import { AboutHero } from "@/features/about/components/about-hero";
import { CoreValuesSection } from "@/features/about/components/core-values-section";
import { FoundersJourneySection } from "@/features/about/components/founders-journey-section";
import { LeadershipSection } from "@/features/about/components/leadership-section";
import { MissionVisionSection } from "@/features/about/components/mission-vision-section";
import { WhatWeDoSection } from "@/features/about/components/what-we-do-section";
import { CTA_BANNER_IMAGE } from "@/features/home/data/home-content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Founded by two former refugees, Global Bridges Network helps refugees, immigrants, asylees, and vulnerable families build safe, healthy, and self sufficient lives. Meet our mission, values, story, and leadership team.",
  openGraph: {
    title: "About Us | Global Bridges Network",
    description: "Our mission, values, founders journey, and leadership team.",
  },
};

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <AboutHero />
      <MissionVisionSection />
      <CoreValuesSection />
      <WhatWeDoSection />
      <FoundersJourneySection />
      <LeadershipSection />
      <CtaBanner
        imageSrc={CTA_BANNER_IMAGE.src}
        imageAlt={CTA_BANNER_IMAGE.alt}
        topClassName="bg-background"
        className="pt-xl"
      />
    </main>
  );
}
