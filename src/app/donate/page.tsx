import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { DarkCardsSection } from "@/components/common/dark-cards-section";
import { PhotoPanel } from "@/components/common/photo-panel";
import { DonateTabs } from "@/features/donate/components/donate-tabs";
import { GoodsPolicySection } from "@/features/donate/components/goods-policy-section";
import { ImpactWaysSection } from "@/features/donate/components/impact-ways-section";
import { DONATE_HERO, SUPPORT_WAYS, isDonateTab } from "@/features/donate/data/donate-content";
import { sanityFetch } from "@/lib/sanity/fetch";
import { GOODS_ITEMS_QUERY, IMPACT_WAYS_QUERY, SITE_SETTINGS_QUERY, SUPPORT_WAYS_QUERY } from "@/lib/sanity/queries";
import type { GoodsItem, ImpactCard, SiteSettings, SupportCard } from "@/lib/sanity/types";

export const metadata: Metadata = pageMetadata({
  title: "Donate",
  description:
    "Give online or donate essential goods to help refugees, immigrants, and vulnerable families. Global Bridges Network is a 501(c)(3) nonprofit; donations are tax-deductible.",
  path: "/donate",
  keywords: ["donate to refugees", "donate goods Maryland", "tax-deductible donation", "support immigrant families", "charity donation"],
});

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
          key={tab ?? "money"}
          initialTab={isDonateTab(tab) ? tab : "money"}
          zeffyUrl={settings?.donationFormUrl ?? null}
          goodsCategories={acceptedGoods}
        />
      </PhotoPanel>
      <ImpactWaysSection cards={impactCards ?? []} />
      <GoodsPolicySection items={goods} />
      <DarkCardsSection id="support-ways" {...SUPPORT_WAYS} items={supportCards ?? []} />
    </main>
  );
}
