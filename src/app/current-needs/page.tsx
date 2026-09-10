import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ClipboardList,
  Package,
  Heart,
  ArrowRight,
  Info,
  CheckCircle2,
} from "lucide-react";
import { Typography } from "@/components/common/typography";
import { Button } from "@/components/ui/button";
import { client } from "@/lib/sanity/client";
import { CURRENT_NEEDS_QUERY } from "@/lib/sanity/queries";
import type { CurrentNeed as CurrentNeedType } from "@/lib/sanity/types";
import { CurrentNeedsGrid } from "@/components/needs/current-needs-grid";

export const metadata: Metadata = {
  title: "Current Needs | Bridge Global Network",
  description:
    "View real-time requested items and essential goods needed for newly arrived families and community support programs at Bridge Global Network.",
  openGraph: {
    title: "Current Needs | Bridge Global Network",
    description:
      "Check our manually maintained real-time list of requested cookware, winter coats, school supplies, and hygiene kits before donating goods.",
    url: "https://globalbridgesnetwork.org/current-needs",
    type: "website",
  },
};

export default async function CurrentNeedsPage() {
  const needs: CurrentNeedType[] = await client.fetch(CURRENT_NEEDS_QUERY);
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* 1. HERO SECTION */}
      <section
        className="relative h-[380px] flex flex-col justify-center px-md lg:px-xl border-b border-border overflow-hidden"
        aria-labelledby="current-needs-hero-heading"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80&auto=format&fit=crop"
            alt="Current Needs Background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-background/75 dark:bg-background/75" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center space-y-md">
          <div className="inline-flex items-center gap-xs rounded-full bg-primary/20 px-md py-xs text-xs font-semibold text-primary backdrop-blur-md shadow-sm border border-primary/20">
            <ClipboardList className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <span>Real-Time Priority Items</span>
          </div>

          <Typography
            variant="h1"
            id="current-needs-hero-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground drop-shadow-sm"
          >
            Current Needs
          </Typography>

          <Typography
            variant="body"
            className="text-foreground/80 dark:text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Our item requests shift over time as newly arrived families settle into permanent homes and seasonal priorities change. Please check this list before purchasing or donating goods.
          </Typography>
        </div>
      </section>



      {/* 2. CMS NEEDS LIST & FILTERS */}
      <section className="py-2xl px-md lg:px-xl bg-muted/20 border-b border-border" aria-labelledby="active-needs-heading">
        <div className="mx-auto max-w-6xl space-y-xl">
          <div className="text-center max-w-2xl mx-auto space-y-xs">
            <Typography variant="caption" className="text-primary font-semibold tracking-wider uppercase">
              Requested Items
            </Typography>
            <Typography variant="h2" id="active-needs-heading" className="text-2xl sm:text-3xl font-bold">
              Active Essential Item Requests
            </Typography>
          </div>

          {/* Interactive Needs Grid & Empty State Handler */}
          <CurrentNeedsGrid needs={needs} />


        </div>
      </section>

      {/* 3. DONATE GOODS CTA SECTION */}
      <section className="py-2xl px-md lg:px-xl border-b border-border" aria-labelledby="donate-goods-cta-heading">
        <div className="mx-auto max-w-4xl text-center space-y-md">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <Package className="h-6 w-6" aria-hidden="true" />
          </div>

          <Typography variant="caption" className="text-primary font-semibold tracking-wider uppercase">
            Have Items to Offer?
          </Typography>
          <Typography variant="h2" id="donate-goods-cta-heading" className="text-2xl sm:text-3xl font-bold">
            Ready to Submit a Goods Donation Offer?
          </Typography>

          <Typography variant="body" className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Fill out our simple goods intake form to let us know what item, quantity, and condition you have available. Our team will contact you with next steps.
          </Typography>

          <div className="pt-sm">
            <Link href="/donate-goods" aria-label="Go to donate goods intake form page">
              <Button size="lg" variant="primary">
                Submit Your Goods Offer <ArrowRight className="ml-xs h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FINANCIAL SUPPORT ALTERNATIVE CTA */}
      <section
        className="py-2xl px-md lg:py-3xl lg:px-xl bg-primary text-primary-foreground"
        aria-labelledby="financial-cta-heading"
      >
        <div className="mx-auto max-w-4xl text-center space-y-md">
          <Typography
            variant="h2"
            id="financial-cta-heading"
            className="text-3xl sm:text-4xl text-primary-foreground font-bold"
          >
            Don&apos;t Have Physical Items to Offer?
          </Typography>
          <Typography
            variant="body"
            className="text-primary-foreground/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Financial contributions allow our team to bulk-purchase emergency items, cover transit logistics, and issue micro-grants directly where needed most.
          </Typography>

          <div className="flex flex-wrap gap-md justify-center pt-md">
            <Link href="/donate" aria-label="Donate financial support to Bridge Global Network">
              <Button size="lg" variant="secondary" className="px-xl">
                <Heart className="mr-xs h-4 w-4" aria-hidden="true" />
                Make a Financial Donation
              </Button>
            </Link>
            <Link href="/get-involved" aria-label="Learn about other ways to get involved">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary dark:bg-transparent dark:text-primary-foreground dark:border-primary-foreground/40 dark:hover:bg-primary-foreground dark:hover:text-primary font-semibold"
              >
                Get Involved
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
