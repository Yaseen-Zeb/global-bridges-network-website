import type { Metadata } from "next";
import Link from "next/link";
import { Typography } from "@/components/common/typography";
import { Button } from "@/components/ui/button";
import { GoodsIntakeForm } from "@/components/donate/goods-intake-form";
import {
  Package,
  CheckCircle2,
  XCircle,
  ClipboardList,
  Send,
  PhoneCall,
  Heart,
  Users,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Donate Goods | Bridge Global Network",
  description:
    "Donate essential goods, household starter items, winter outerwear, and school supplies to support refugee and immigrant families.",
  openGraph: {
    title: "Donate Goods | Bridge Global Network",
    description:
      "Support refugee and immigrant families with essential goods and household items.",
  },
};

// CMS Content Placeholder: Accepted Goods Categories
const CMS_ACCEPTED_GOODS = [
  {
    title: "Household & Cookware Starter Kits",
    description:
      "Pots, pans, stainless steel cookware, dishware, eating utensils, and basic kitchen tools in clean condition.",
  },
  {
    title: "Winter Outerwear & Warm Blankets",
    description:
      "Clean coats, jackets, gloves, scarves, and thermal blankets for adults and children arriving in winter months.",
  },
  {
    title: "School Backpacks & Academic Supplies",
    description:
      "New or like-new backpacks, notebooks, pens, pencils, markers, and calculators for students.",
  },
  {
    title: "Hygiene & Personal Care Packages",
    description:
      "Unopened soap, shampoo, toothpaste, toothbrushes, feminine hygiene products, and grooming supplies.",
  },
  {
    title: "Baby & Children Supplies",
    description:
      "Unopened diapers, baby wipes, strollers, clean children's clothing, and safe educational toys.",
  },
];

// CMS Content Placeholder: Excluded Items
const CMS_UNACCEPTED_GOODS = [
  {
    title: "Damaged or Heavily Stained Items",
    description:
      "Torn clothing, broken furniture, or items requiring major repair or deep cleaning.",
  },
  {
    title: "Used Mattresses & Open Bedding",
    description:
      "Used mattresses, used bed pillows, or unwashed bed linens due to health and safety regulations.",
  },
  {
    title: "Opened Hygiene Products",
    description:
      "Opened, partially used, or unsealed personal care products and cosmetics.",
  },
  {
    title: "Large Bulky Electrical Appliances",
    description:
      "Large refrigerators, stoves, or unverified heavy appliances due to storage limitations.",
  },
];

export default function DonateGoodsPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* 1. HERO SECTION */}
      <section
        className="border-b border-border bg-muted/30 py-2xl px-md lg:py-3xl lg:px-xl"
        aria-label="Donate goods banner"
      >
        <div className="mx-auto max-w-4xl text-center space-y-md">
          <div className="inline-flex items-center gap-xs rounded-full bg-primary/10 px-md py-xs text-xs font-semibold text-primary">
            <Package className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <span>Material Support & Goods Intake</span>
          </div>

          <Typography variant="h1" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Donate Goods
          </Typography>

          <Typography variant="body" className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Supporters can offer useful, high-quality physical goods to help newly arrived refugee and immigrant families transform empty apartments into welcoming homes.
          </Typography>
        </div>
      </section>

      {/* 4. HOW IT WORKS (3-Step Process) */}
      <section className="py-2xl px-md lg:px-xl border-b border-border" aria-labelledby="how-it-works-heading">
        <div className="mx-auto max-w-6xl space-y-xl">
          <div className="text-center max-w-2xl mx-auto space-y-xs">
            <Typography variant="caption" className="text-primary font-semibold tracking-wider uppercase">
              Simple 3-Step Process
            </Typography>
            <Typography variant="h2" id="how-it-works-heading">
              How Goods Donation Works
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            <article className="rounded-card border border-border bg-background p-lg shadow-card space-y-sm text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto font-extrabold text-lg">
                1
              </div>
              <Typography variant="h3" className="text-xl font-bold">
                Check Current Needs
              </Typography>
              <Typography variant="body-sm" className="text-muted-foreground leading-relaxed">
                Review our list of accepted item categories and current high-priority community requests below.
              </Typography>
            </article>

            <article className="rounded-card border border-border bg-background p-lg shadow-card space-y-sm text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto font-extrabold text-lg">
                2
              </div>
              <Typography variant="h3" className="text-xl font-bold">
                Submit Your Offer
              </Typography>
              <Typography variant="body-sm" className="text-muted-foreground leading-relaxed">
                Fill out our simple goods intake form with details about the items, condition, and your contact info.
              </Typography>
            </article>

            <article className="rounded-card border border-border bg-background p-lg shadow-card space-y-sm text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto font-extrabold text-lg">
                3
              </div>
              <Typography variant="h3" className="text-xl font-bold">
                We Contact You
              </Typography>
              <Typography variant="body-sm" className="text-muted-foreground leading-relaxed">
                Our team reviews your submission and reaches out to coordinate item inspection, drop-off, or intake.
              </Typography>
            </article>
          </div>
        </div>
      </section>

      {/* 2. WHAT WE ACCEPT & 3. WHAT WE CANNOT ACCEPT */}
      <section className="py-2xl px-md lg:px-xl bg-muted/20 border-b border-border" aria-labelledby="accepted-goods-heading">
        <div className="mx-auto max-w-6xl space-y-2xl">
          {/* What We Accept Grid */}
          <div className="space-y-xl">
            <div className="text-center max-w-2xl mx-auto space-y-xs">
              <Typography variant="caption" className="text-primary font-semibold tracking-wider uppercase">
                Accepted Categories
              </Typography>
              <Typography variant="h2" id="accepted-goods-heading">
                What We Can Accept
              </Typography>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
              {CMS_ACCEPTED_GOODS.map((item, idx) => (
                <article
                  key={idx}
                  className="rounded-card border border-border bg-background p-lg shadow-card flex items-start gap-sm"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-success mt-1" aria-hidden="true" />
                  <div className="space-y-xs">
                    <Typography variant="h3" className="text-lg font-bold text-foreground leading-snug">
                      {item.title}
                    </Typography>
                    <Typography variant="body-sm" className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </Typography>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* What We Cannot Accept Section */}
          <div className="space-y-xl pt-lg border-t border-border">
            <div className="text-center max-w-2xl mx-auto space-y-xs">
              <Typography variant="caption" className="text-destructive font-semibold tracking-wider uppercase">
                Excluded Items
              </Typography>
              <Typography variant="h2" className="text-2xl font-bold">
                What We Cannot Accept
              </Typography>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-lg max-w-4xl mx-auto">
              {CMS_UNACCEPTED_GOODS.map((item, idx) => (
                <article
                  key={idx}
                  className="rounded-card border border-destructive/20 bg-destructive/5 p-lg shadow-xs flex items-start gap-sm"
                >
                  <XCircle className="h-5 w-5 shrink-0 text-destructive mt-1" aria-hidden="true" />
                  <div className="space-y-xs">
                    <Typography variant="h3" className="text-base font-bold text-foreground leading-snug">
                      {item.title}
                    </Typography>
                    <Typography variant="body-sm" className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </Typography>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="text-center text-xs text-muted-foreground italic">
            * Note for Client: Accepted and excluded item lists are managed in CMS array format (`CMS_ACCEPTED_GOODS` & `CMS_UNACCEPTED_GOODS`) for easy updates by founders.
          </div>
        </div>
      </section>

      {/* 5. GOODS INTAKE FORM */}
      <section className="py-2xl px-md lg:px-xl border-b border-border" aria-labelledby="form-section-heading">
        <div className="mx-auto max-w-3xl space-y-md">
          <div className="text-center space-y-xs">
            <Typography variant="caption" className="text-primary font-semibold tracking-wider uppercase">
              Offer Your Goods
            </Typography>
            <Typography variant="h2" id="form-section-heading">
              Goods Intake Submission
            </Typography>
          </div>

          {/* Reusable GoodsIntakeForm Component */}
          <GoodsIntakeForm />
        </div>
      </section>

      {/* 6. CURRENT NEEDS CTA */}
      <section className="py-2xl px-md lg:px-xl bg-muted/20 border-b border-border" aria-labelledby="current-needs-heading">
        <div className="mx-auto max-w-4xl text-center space-y-md">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <ClipboardList className="h-6 w-6" aria-hidden="true" />
          </div>

          <Typography variant="caption" className="text-primary font-semibold tracking-wider uppercase">
            Urgent Priorities
          </Typography>
          <Typography variant="h2" id="current-needs-heading">
            Looking for Our Specific Real-Time Item Needs?
          </Typography>

          <Typography variant="body" className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Check our real-time list of current item requests submitted by arriving families and partner programs.
          </Typography>

          <div className="pt-sm">
            <Link href="/current-needs" aria-label="View real-time current needs list">
              <Button size="lg" variant="outline">
                View Real-Time Current Needs <ArrowRight className="ml-xs h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="py-2xl px-md lg:py-3xl lg:px-xl bg-primary text-primary-foreground" aria-labelledby="goods-cta-heading">
        <div className="mx-auto max-w-4xl text-center space-y-md">
          <Typography variant="h2" id="goods-cta-heading" className="text-3xl sm:text-4xl text-primary-foreground font-bold">
            Explore Additional Ways to Support
          </Typography>
          <Typography variant="body" className="text-primary-foreground/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Whether through material goods, financial contributions, or volunteering your time, every action strengthens our global community.
          </Typography>

          <div className="flex flex-wrap justify-center gap-md pt-md">
            <Link href="/donate" aria-label="Donate financial support to Bridge Global Network">
              <Button size="lg" variant="secondary">
                <Heart className="mr-xs h-4 w-4" aria-hidden="true" />
                Donate Financial Support
              </Button>
            </Link>
            <Link href="/get-involved" aria-label="Get involved as a volunteer with Bridge Global Network">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary dark:bg-transparent dark:text-primary-foreground dark:border-primary-foreground/40 dark:hover:bg-primary-foreground dark:hover:text-primary font-semibold"
              >
                <Users className="mr-xs h-4 w-4" aria-hidden="true" />
                Get Involved
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
