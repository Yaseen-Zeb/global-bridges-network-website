import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Typography } from "@/components/common/typography";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Users,
  Package,
  Handshake,
  Share2,
  Mail,
  ArrowRight,
  CheckCircle2,
  HeartHandshake,
  MessageSquare,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Get Involved | Bridge Global Network",
  description:
    "Discover practical ways to support Bridge Global Network beyond financial donations through volunteering, donating essential goods, community partnerships, and advocacy.",
  openGraph: {
    title: "Get Involved | Bridge Global Network",
    description:
      "Explore practical ways to support refugees, immigrants, and overseas women empowerment initiatives.",
  },
};

// CMS Content Placeholder: Reusable Ways to Help Data Structure
const CMS_WAYS_TO_HELP = [
  {
    id: "volunteer",
    icon: Users,
    title: "Volunteer Your Time",
    description:
      "Share your skills and time as a community mentor, assist with English language practice, or help organize local welcome events.",
    ctaText: "Inquire About Volunteering",
    href: "/contact?subject=Volunteer+Inquiry",
  },
  {
    id: "donate-goods",
    icon: Package,
    title: "Donate Essential Goods",
    description:
      "Provide physical necessities such as winter coats, cookware sets, hygiene packages, and school supplies for arriving families.",
    ctaText: "View Goods Needed",
    href: "/donate-goods",
  },
  {
    id: "partner",
    icon: Handshake,
    title: "Partner With Us",
    description:
      "Collaborate as a local business, community organization, school, or faith group to host drives or support integration efforts.",
    ctaText: "Explore Partnerships",
    href: "/contact?subject=Partnership+Inquiry",
  },
  {
    id: "advocate",
    icon: Share2,
    title: "Share Our Mission",
    description:
      "Help raise awareness by sharing our stories, advocating for refugee dignity, and amplifying community voices within your networks.",
    ctaText: "Spread the Word",
    href: "/about",
  },
];

export default function GetInvolvedPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* 1. HERO SECTION */}
      <section
        className="relative h-[380px] flex flex-col justify-center px-md lg:px-xl border-b border-border overflow-hidden"
        aria-label="Get involved banner"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://plus.unsplash.com/premium_photo-1770347180331-9e75822632c7?q=80&w=1457&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Get Involved Background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-background/75 dark:bg-background/75" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center space-y-md">
          <div className="inline-flex items-center gap-xs rounded-full bg-primary/20 px-md py-xs text-xs font-semibold text-primary backdrop-blur-md shadow-sm border border-primary/20">
            <Handshake className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <span>Join Our Community Mission</span>
          </div>

          <Typography variant="h1" className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            Get Involved
          </Typography>

          <Typography variant="body" className="text-foreground/80 dark:text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            There are many meaningful ways to support newly arrived refugees, immigrants, and overseas women empowerment programs. Your time, voice, and physical donations make a tangible difference.
          </Typography>
        </div>
      </section>

      {/* 2. WAYS TO HELP GRID */}
      <section className="py-2xl px-md lg:px-xl border-b border-border" aria-labelledby="ways-to-help-heading">
        <div className="mx-auto max-w-6xl space-y-xl">
          <div className="text-center max-w-2xl mx-auto space-y-xs">
            <Typography variant="caption" className="text-primary font-semibold tracking-wider uppercase">
              Practical Support
            </Typography>
            <Typography variant="h2" id="ways-to-help-heading">
              Four Ways You Can Make an Impact
            </Typography>
            <Typography variant="body" className="text-muted-foreground">
              Choose a pathway that aligns with your capacity, skills, and community goals.
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
            {CMS_WAYS_TO_HELP.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.id}
                  className="rounded-card border border-border bg-background p-lg shadow-card flex flex-col justify-between space-y-md"
                >
                  <div className="space-y-sm">
                    <div className="w-10 h-10 rounded-button bg-primary/10 flex items-center justify-center text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <Typography variant="h3" className="text-lg font-bold">
                      {item.title}
                    </Typography>
                    <Typography variant="body-sm" className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </Typography>
                  </div>

                  <div className="pt-sm border-t border-border">
                    <Link
                      href={item.href}
                      className="inline-flex items-center text-xs font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-button"
                      aria-label={`${item.ctaText} for ${item.title}`}
                    >
                      {item.ctaText} <ArrowRight className="ml-xs h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>


        </div>
      </section>

      {/* 3. DONATE GOODS FOCUS */}
      <section className="py-2xl px-md lg:px-xl bg-muted/20 border-b border-border" aria-labelledby="donate-goods-heading">
        <div className="mx-auto max-w-4xl space-y-md text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <Package className="h-6 w-6" aria-hidden="true" />
          </div>

          <Typography variant="caption" className="text-primary font-semibold tracking-wider uppercase">
            Material Assistance
          </Typography>
          <Typography variant="h2" id="donate-goods-heading">
            Donate Essential Goods & Household Supplies
          </Typography>

          <Typography variant="body" className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Physical items help newly arrived families turn empty apartments into warm homes. We accept clean, high-quality essential items including seasonal coats, kitchen sets, bed linens, and school backpacks.
          </Typography>

          <div className="pt-sm">
            <Link href="/donate-goods" aria-label="View current item needs and drop-off guidelines">
              <Button size="lg" variant="primary">
                View Essential Goods List <ArrowRight className="ml-xs h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. VOLUNTEER / SUPPORT INQUIRY */}
      <section className="py-2xl px-md lg:px-xl border-b border-border" aria-labelledby="support-inquiry-heading">
        <div className="mx-auto max-w-5xl space-y-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-center">
            <div className="lg:col-span-6 space-y-md">
              <Typography variant="caption" className="text-primary font-semibold tracking-wider uppercase">
                Getting Started
              </Typography>
              <Typography variant="h2" id="support-inquiry-heading">
                Interested in Support Opportunities?
              </Typography>
              <Typography variant="body" className="text-muted-foreground leading-relaxed">
                Whether you are an individual looking to mentor a family, a student group seeking community service hours, or a local business wanting to host a supply drive, we welcome your initiative.
              </Typography>
              <Typography variant="body-sm" className="text-muted-foreground leading-relaxed">
                Reach out to our team to discuss your interest, learn about current opportunities, and get started on making a meaningful impact.
              </Typography>
              <div className="pt-xs">
                <Link href="/contact" aria-label="Contact Bridge Global Network to learn about volunteer opportunities">
                  <Button variant="outline" size="md">
                    <MessageSquare className="mr-xs h-4 w-4" aria-hidden="true" />
                    Contact Our Volunteer Team
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-md">
              <div className="rounded-card border border-border bg-background p-md shadow-card flex items-start gap-md">
                <CheckCircle2 className="h-6 w-6 text-success shrink-0" aria-hidden="true" />
                <div className="space-y-xs">
                  <Typography variant="h3" className="text-base font-semibold">
                    Flexible Engagement
                  </Typography>
                  <Typography variant="body-sm" className="text-muted-foreground">
                    Support options tailored to your availability, from one-time item drives to ongoing mentorship.
                  </Typography>
                </div>
              </div>

              <div className="rounded-card border border-border bg-background p-md shadow-card flex items-start gap-md">
                <CheckCircle2 className="h-6 w-6 text-success shrink-0" aria-hidden="true" />
                <div className="space-y-xs">
                  <Typography variant="h3" className="text-base font-semibold">
                    Group & Organization Drives
                  </Typography>
                  <Typography variant="body-sm" className="text-muted-foreground">
                    Host collection drives with your school, office, faith group, or local club.
                  </Typography>
                </div>
              </div>

              <div className="rounded-card border border-border bg-background p-md shadow-card flex items-start gap-md">
                <CheckCircle2 className="h-6 w-6 text-success shrink-0" aria-hidden="true" />
                <div className="space-y-xs">
                  <Typography variant="h3" className="text-base font-semibold">
                    Direct Community Impact
                  </Typography>
                  <Typography variant="body-sm" className="text-muted-foreground">
                    Your contribution directly assists arriving families and overseas women leaders.
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINAL CALL TO ACTION */}
      <section className="py-2xl px-md lg:py-3xl lg:px-xl bg-primary text-primary-foreground" aria-labelledby="get-involved-cta-heading">
        <div className="mx-auto max-w-4xl text-center space-y-md">
          <Typography variant="h2" id="get-involved-cta-heading" className="text-3xl sm:text-4xl text-primary-foreground font-bold">
            Every Hand Helps Build Stronger Bridges
          </Typography>
          <Typography variant="body" className="text-primary-foreground/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Support our mission today by contributing financial aid or reaching out to learn how you can support our programs.
          </Typography>

          <div className="flex flex-wrap justify-center gap-md pt-md">
            <Link href="/donate" aria-label="Donate now to Bridge Global Network">
              <Button size="lg" variant="secondary">
                <Heart className="mr-xs h-4 w-4" aria-hidden="true" />
                Donate Now
              </Button>
            </Link>
            <Link href="/contact" aria-label="Contact Bridge Global Network team">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary dark:bg-transparent dark:text-primary-foreground dark:border-primary-foreground/40 dark:hover:bg-primary-foreground dark:hover:text-primary font-semibold"
              >
                <Mail className="mr-xs h-4 w-4" aria-hidden="true" />
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
