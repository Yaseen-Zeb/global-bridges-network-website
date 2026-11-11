import type { Metadata } from "next";
import { DarkCardsSection } from "@/components/common/dark-cards-section";
import { ApplicationForm } from "@/features/careers/components/application-form";
import { CareersAboutSection } from "@/features/careers/components/careers-about-section";
import { CareersHero } from "@/features/careers/components/careers-hero";
import { HiringStepsSection } from "@/features/careers/components/hiring-steps-section";
import { OpenPositionsSection } from "@/features/careers/components/open-positions-section";
import { CAREERS_VALUES } from "@/features/careers/data/careers-content";
import { sanityFetch } from "@/lib/sanity/fetch";
import { OPEN_POSITIONS_QUERY } from "@/lib/sanity/queries";
import type { Position } from "@/lib/sanity/types";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Careers",
  description:
    "Join Global Bridges Network and help refugees and families starting over in the United States. See open positions and send us your application.",
  path: "/careers",
  keywords: ["nonprofit jobs", "careers Global Bridges Network", "refugee nonprofit jobs Maryland", "jobs Ellicott City"],
});

export default async function CareersPage() {
  // Jobs past their closing date drop off on the next revalidation.
  const today = new Date().toISOString().slice(0, 10);
  const positions = (await sanityFetch<Position[] | null>(OPEN_POSITIONS_QUERY, { today })) ?? [];

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <CareersHero />
      <CareersAboutSection />
      <HiringStepsSection />
      <DarkCardsSection id="careers-values" {...CAREERS_VALUES} columns={4} />
      <OpenPositionsSection positions={positions} />
      <ApplicationForm roles={positions.map((position) => position.title)} />
    </main>
  );
}
