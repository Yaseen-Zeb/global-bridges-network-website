import type { Metadata } from "next";
import { DarkCardsSection } from "@/components/common/dark-cards-section";
import { PhotoPanel } from "@/components/common/photo-panel";
import { DonateTabs } from "@/features/donate/components/donate-tabs";
import { GoodsPolicySection } from "@/features/donate/components/goods-policy-section";
import { ImpactWaysSection } from "@/features/donate/components/impact-ways-section";
import { DONATE_HERO, SUPPORT_WAYS, isDonateTab } from "@/features/donate/data/donate-content";
import { client } from "@/lib/sanity/client";
import { CONTACT_INFO_QUERY } from "@/lib/sanity/queries";
import type { ContactInfo } from "@/lib/sanity/types";

export const metadata: Metadata = {
  title: "Donate & Get Involved",
  description:
    "Donate essential goods, give financially, or volunteer your time with Global Bridges Network to support refugees, immigrants, and vulnerable families.",
  openGraph: {
    title: "Donate & Get Involved | Global Bridges Network",
    description: "Donate goods, give money, volunteer, partner with us, or share our mission.",
  },
};

export default async function DonatePage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const [{ tab }, contactInfo, donation] = await Promise.all([
    searchParams,
    client.fetch<ContactInfo | null>(CONTACT_INFO_QUERY),
    client.fetch<{ donationFormUrl?: string } | null>(
      `*[_type == "contactInfo" && _id == "contactInfo"][0]{ donationFormUrl }`
    ),
  ]);

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <PhotoPanel id="donate" title={DONATE_HERO.title} image={DONATE_HERO.image} contactInfo={contactInfo}>
        <DonateTabs key={tab ?? "goods"} initialTab={isDonateTab(tab) ? tab : "goods"} zeffyUrl={donation?.donationFormUrl ?? null} />
      </PhotoPanel>
      <ImpactWaysSection />
      <GoodsPolicySection />
      <DarkCardsSection id="support-ways" {...SUPPORT_WAYS} />
    </main>
  );
}
