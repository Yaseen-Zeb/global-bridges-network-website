import type { Metadata } from "next";
import { DarkCardsSection } from "@/components/common/dark-cards-section";
import { PhotoPanel } from "@/components/common/photo-panel";
import { DonateTabs } from "@/features/donate/components/donate-tabs";
import { GoodsPolicySection } from "@/features/donate/components/goods-policy-section";
import { ImpactWaysSection } from "@/features/donate/components/impact-ways-section";
import { DONATE_HERO, SUPPORT_WAYS, isDonateTab } from "@/features/donate/data/donate-content";
import { sanityFetch } from "@/lib/sanity/fetch";
import { GOODS_ITEMS_QUERY, IMPACT_WAYS_QUERY, SITE_SETTINGS_QUERY, SUPPORT_WAYS_QUERY } from "@/lib/sanity/queries";
import type { GoodsItem, ImpactCard, SiteSettings, SupportCard } from "@/lib/sanity/types";

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
  const [{ tab }, settings, goods, impactCards, supportCards] = await Promise.all([
    searchParams,
    sanityFetch<SiteSettings | null>(SITE_SETTINGS_QUERY),
    sanityFetch<GoodsItem[]>(GOODS_ITEMS_QUERY),
    sanityFetch<ImpactCard[] | null>(IMPACT_WAYS_QUERY),
    sanityFetch<SupportCard[] | null>(SUPPORT_WAYS_QUERY),
  ]);
  const acceptedGoods = goods.filter((item) => item.accepted).map((item) => item.title);

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <PhotoPanel id="donate" title={DONATE_HERO.title} image={DONATE_HERO.image} settings={settings}>
        <DonateTabs
          key={tab ?? "goods"}
          initialTab={isDonateTab(tab) ? tab : "goods"}
          zeffyUrl={settings?.donationFormUrl ?? null}
          volunteerEmail={settings?.volunteerEmail}
          goodsCategories={acceptedGoods}
        />
      </PhotoPanel>
      <ImpactWaysSection cards={impactCards ?? []} />
      <GoodsPolicySection items={goods} />
      <DarkCardsSection id="support-ways" {...SUPPORT_WAYS} items={supportCards ?? []} />
    </main>
  );
}
