import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  HeartHandshake,
  Users,
  Building2,
  Globe,
  ArrowRight,
  MessageSquare,
  Heart,
} from "lucide-react";
import { AnimatedEyebrow } from "@/components/common/animated-eyebrow";
import { Typography } from "@/components/common/typography";
import { Button } from "@/components/ui/button";

import { TestimonialFilterGrid } from "@/components/testimonials/testimonial-filter-grid";
import { client } from "@/lib/sanity/client";
import { TESTIMONIALS_QUERY } from "@/lib/sanity/queries";
import type { Testimonial as TestimonialType } from "@/lib/sanity/types";

export const metadata: Metadata = {
  title: "Stories & Testimonials | Bridge Global Network",
  description:
    "Read authentic community stories and testimonials from arriving families, overseas women leaders, volunteer mentors, and partner organizations served by Bridge Global Network.",
  openGraph: {
    title: "Stories & Testimonials | Bridge Global Network",
    description:
      "Explore authentic stories of resilience, dignity, and community connection from individuals and partners across Bridge Global Network programs.",
    url: "https://globalbridgesnetwork.org/testimonials",
    type: "website",
  },
};

export default async function TestimonialsPage() {
  const testimonials: TestimonialType[] = await client.fetch(TESTIMONIALS_QUERY);
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* 1. HERO SECTION */}
      <section
        className="relative h-[380px] flex flex-col justify-center px-md lg:px-xl border-b border-border overflow-hidden"
        aria-labelledby="testimonials-hero-heading"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1623852700794-6870b096fa1c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Stories and Testimonials Background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-background/75 dark:bg-background/75" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center space-y-md">
          <div className="inline-flex items-center gap-xs rounded-full bg-primary/20 px-md py-xs text-xs font-semibold text-primary backdrop-blur-md shadow-sm border border-primary/20">
            <HeartHandshake className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <span>Voices of Hope</span>
          </div>

          <Typography
            variant="h1"
            id="testimonials-hero-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground"
          >
            Stories &amp; Testimonials
          </Typography>

          <Typography
            variant="body"
            className="text-foreground/80 dark:text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Explore authentic stories of resilience, dignity, and community connection from individuals and partners across Bridge Global Network programs.
          </Typography>
        </div>
      </section>

      {/* 2. DIGNITY-FIRST PRIVACY NOTICE */}
      <section className="py-lg px-md lg:px-xl border-b border-border bg-muted/20" aria-label="Privacy and Dignity Statement">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-card border border-primary/20 bg-background p-md sm:p-lg shadow-card flex items-start gap-md">
            <ShieldCheck className="h-6 w-6 text-primary shrink-0" aria-hidden="true" />
            <div className="space-y-xs">
              <Typography variant="h3" className="text-base font-semibold text-foreground">
                Participant Privacy &amp; Dignity Safeguards
              </Typography>
              <Typography variant="body-sm" className="text-muted-foreground leading-relaxed">
                To protect the safety, privacy, and confidentiality of arriving individuals and vulnerable families, sensitive personal data and real surnames are protected. Anonymous descriptors (e.g., <em>&ldquo;Arriving Family Member&rdquo;</em>) and generalized contexts are used where requested by participants.
              </Typography>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TESTIMONIAL GRID & CATEGORY FILTER */}
      <section className="py-2xl px-md lg:px-xl border-b border-border" aria-labelledby="stories-grid-heading">
        <div className="mx-auto max-w-6xl space-y-xl">
          <div className="text-center max-w-2xl mx-auto space-y-xs">
            <Typography variant="caption" className="text-primary font-semibold tracking-wider uppercase">
              Community Perspectives
            </Typography>
            <Typography variant="h2" id="stories-grid-heading" className="text-2xl sm:text-3xl font-bold">
              Voices Across Our Network
            </Typography>
          </div>

          {/* Accessible Category Filter & Testimonials Grid */}
          <TestimonialFilterGrid testimonials={testimonials} />


        </div>
      </section>

      {/* 4. TYPES OF IMPACT STORIES SHOWCASE */}
      <section className="py-2xl px-md lg:px-xl bg-muted/20 border-b border-border" aria-labelledby="represented-groups-heading">
        <div className="mx-auto max-w-6xl space-y-xl">
          <div className="text-center max-w-2xl mx-auto space-y-xs">
            <Typography variant="caption" className="text-primary font-semibold tracking-wider uppercase">
              Our Community
            </Typography>
            <Typography variant="h2" id="represented-groups-heading" className="text-2xl sm:text-3xl font-bold">
              Who These Stories Represent
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
            <article className="rounded-card border border-border bg-background p-lg shadow-card flex items-start gap-md">
              <Users className="h-6 w-6 text-primary shrink-0" aria-hidden="true" />
              <div className="space-y-xs">
                <Typography variant="h3" className="text-base font-semibold">
                  Arriving Families
                </Typography>
                <Typography variant="body-sm" className="text-muted-foreground leading-relaxed">
                  Refugees and immigrants building new lives with dignified arrival and resettlement support.
                </Typography>
              </div>
            </article>

            <article className="rounded-card border border-border bg-background p-lg shadow-card flex items-start gap-md">
              <Globe className="h-6 w-6 text-primary shrink-0" aria-hidden="true" />
              <div className="space-y-xs">
                <Typography variant="h3" className="text-base font-semibold">
                  Overseas Leaders
                </Typography>
                <Typography variant="body-sm" className="text-muted-foreground leading-relaxed">
                  Grassroots women entrepreneurs leading community empowerment cooperatives.
                </Typography>
              </div>
            </article>

            <article className="rounded-card border border-border bg-background p-lg shadow-card flex items-start gap-md">
              <HeartHandshake className="h-6 w-6 text-primary shrink-0" aria-hidden="true" />
              <div className="space-y-xs">
                <Typography variant="h3" className="text-base font-semibold">
                  Volunteer Mentors
                </Typography>
                <Typography variant="body-sm" className="text-muted-foreground leading-relaxed">
                  Dedicated local volunteers offering guidance, mentorship, and community drives.
                </Typography>
              </div>
            </article>

            <article className="rounded-card border border-border bg-background p-lg shadow-card flex items-start gap-md">
              <Building2 className="h-6 w-6 text-primary shrink-0" aria-hidden="true" />
              <div className="space-y-xs">
                <Typography variant="h3" className="text-base font-semibold">
                  Civic Partners
                </Typography>
                <Typography variant="body-sm" className="text-muted-foreground leading-relaxed">
                  Regional healthcare providers, legal clinics, and grassroots organizations.
                </Typography>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 5. SHARE YOUR EXPERIENCE CALLOUT */}
      <section className="py-2xl px-md lg:px-xl border-b border-border" aria-labelledby="share-story-heading">
        <div className="mx-auto max-w-4xl text-center space-y-md">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <MessageSquare className="h-6 w-6" aria-hidden="true" />
          </div>

          <Typography variant="caption" className="text-primary font-semibold tracking-wider uppercase">
            Have an Experience to Share?
          </Typography>
          <Typography variant="h2" id="share-story-heading" className="text-2xl sm:text-3xl font-bold">
            Share Your Story With Complete Confidentiality
          </Typography>

          <Typography variant="body" className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            If you have participated in our programs, volunteered, or partnered with Bridge Global Network and wish to share your story, we welcome your voice. Full privacy controls are guaranteed.
          </Typography>

          <div className="pt-sm">
            <Link href="/get-involved" aria-label="Contact Bridge Global Network to share your story">
              <Button size="lg" variant="outline">
                Contact Our Team <ArrowRight className="ml-xs h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section
        className="py-2xl px-md lg:py-3xl lg:px-xl bg-primary text-primary-foreground"
        aria-labelledby="testimonials-cta-heading"
      >
        <div className="mx-auto max-w-4xl text-center space-y-md">
          <Typography
            variant="h2"
            id="testimonials-cta-heading"
            className="text-3xl sm:text-4xl text-primary-foreground font-bold"
          >
            Help Write the Next Story of Hope &amp; Dignity
          </Typography>
          <Typography
            variant="body"
            className="text-primary-foreground/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Your support makes every arrival smoother, every family feel welcomed, and every overseas woman leader empowered.
          </Typography>

          <div className="flex flex-wrap gap-md justify-center pt-md">
            <Link href="/donate" aria-label="Donate financial support to Bridge Global Network">
              <Button size="lg" variant="secondary" className="px-xl">
                <Heart className="mr-xs h-4 w-4" aria-hidden="true" />
                Support Our Mission
              </Button>
            </Link>
            <Link href="/get-involved" aria-label="Get involved with Bridge Global Network">
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
