import type { Metadata } from "next";
import Link from "next/link";
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
import { CMS_CURRENT_NEEDS } from "@/data/current-needs";
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

export default function CurrentNeedsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* 1. HERO SECTION */}
      <section
        className="relative py-2xl px-md lg:py-3xl lg:px-xl border-b border-border bg-gradient-to-b from-background via-muted/30 to-background"
        aria-labelledby="current-needs-hero-heading"
      >
        <div className="mx-auto max-w-4xl text-center space-y-md">
          <div className="inline-flex items-center gap-xs rounded-full bg-primary/10 px-md py-xs text-xs font-semibold text-primary">
            <ClipboardList className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <span>Real-Time Priority Items</span>
          </div>

          <Typography
            variant="h1"
            id="current-needs-hero-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
          >
            Current Needs
          </Typography>

          <Typography
            variant="body"
            className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Our item requests shift over time as newly arrived families settle into permanent homes and seasonal priorities change. Please check this list before purchasing or donating goods.
          </Typography>
        </div>
      </section>

      {/* IMPORTANT ADVISORY BANNER */}
      <section className="py-md px-md lg:px-xl border-b border-border bg-muted/20" aria-label="Donation Guidance Advisory">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-card border border-primary/20 bg-background p-md shadow-card flex items-start gap-md">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-xs">
              <Typography variant="h3" className="text-base font-semibold text-foreground">
                Before You Donate Goods
              </Typography>
              <Typography variant="body-sm" className="text-muted-foreground leading-relaxed">
                Reviewing active items ensures that arriving families receive exactly what they need immediately without cluttering storage space. If you have an item listed below, please use our <strong>Donate Goods</strong> form to coordinate delivery or drop-off.
              </Typography>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CMS NEEDS LIST & FILTERS */}
      <section className="py-2xl px-md lg:px-xl border-b border-border" aria-labelledby="active-needs-heading">
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
          <CurrentNeedsGrid needs={CMS_CURRENT_NEEDS} />

          <div className="text-center text-xs text-muted-foreground italic pt-sm">
            * Note for Client: This page is manually maintained via headless CMS data (`CMS_CURRENT_NEEDS`). It is not auto-populated from intake form submissions.
          </div>
        </div>
      </section>

      {/* 3. DONATE GOODS CTA SECTION */}
      <section className="py-2xl px-md lg:px-xl bg-muted/20 border-b border-border" aria-labelledby="donate-goods-cta-heading">
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
