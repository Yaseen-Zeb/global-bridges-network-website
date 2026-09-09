import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Users, Heart, ArrowRight, Building2 } from "lucide-react";
import { Typography } from "@/components/common/typography";
import { Button } from "@/components/ui/button";
import { CMS_EVENTS } from "@/data/events";
import { EventFilterGrid } from "@/components/events/event-filter-grid";

export const metadata: Metadata = {
  title: "Events & Community Gatherings | Bridge Global Network",
  description:
    "Explore upcoming newcomer orientation workshops, cultural welcome dinners, volunteer drives, and overseas women empowerment webinars hosted by Bridge Global Network.",
  openGraph: {
    title: "Events & Community Gatherings | Bridge Global Network",
    description:
      "Join community events, volunteer orientation sessions, and cultural welcome dinners bringing together arriving families, mentors, and partners.",
    url: "https://globalbridgesnetwork.org/events",
    type: "website",
  },
};

export default function EventsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* 1. HERO SECTION */}
      <section
        className="relative py-2xl px-md lg:py-3xl lg:px-xl border-b border-border bg-gradient-to-b from-background via-muted/30 to-background"
        aria-labelledby="events-hero-heading"
      >
        <div className="mx-auto max-w-4xl text-center space-y-md">
          <div className="inline-flex items-center gap-xs rounded-full bg-primary/10 px-md py-xs text-xs font-semibold text-primary">
            <Calendar className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <span>What We Do • Community Gatherings</span>
          </div>

          <Typography
            variant="h1"
            id="events-hero-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
          >
            Events &amp; Community Gatherings
          </Typography>

          <Typography
            variant="body"
            className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Bringing together arriving families, volunteer mentors, grassroots leaders, and local community partners through orientation workshops, welcome dinners, and global webinars.
          </Typography>
        </div>
      </section>

      {/* 2. CMS EVENTS GRID & FILTERS */}
      <section className="py-2xl px-md lg:px-xl border-b border-border" aria-labelledby="events-list-heading">
        <div className="mx-auto max-w-6xl space-y-xl">
          <div className="text-center max-w-2xl mx-auto space-y-xs">
            <Typography variant="caption" className="text-primary font-semibold tracking-wider uppercase">
              Schedule &amp; Sessions
            </Typography>
            <Typography variant="h2" id="events-list-heading" className="text-2xl sm:text-3xl font-bold">
              Upcoming &amp; Featured Events
            </Typography>
          </div>

          {/* Accessible Filter Tabs & Events Grid */}
          <EventFilterGrid events={CMS_EVENTS} />

          <div className="text-center text-xs text-muted-foreground italic pt-sm">
            * Note for Client: Events are managed in CMS dataset format (`CMS_EVENTS`) and support status controls (upcoming, past, published).
          </div>
        </div>
      </section>

      {/* 3. CO-HOST AN EVENT CALLOUT */}
      <section className="py-2xl px-md lg:px-xl bg-muted/20 border-b border-border" aria-labelledby="cohost-heading">
        <div className="mx-auto max-w-4xl text-center space-y-md">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <Building2 className="h-6 w-6" aria-hidden="true" />
          </div>

          <Typography variant="caption" className="text-primary font-semibold tracking-wider uppercase">
            Partner With Us
          </Typography>
          <Typography variant="h2" id="cohost-heading" className="text-2xl sm:text-3xl font-bold">
            Host a Collection Drive or Orientation Session
          </Typography>

          <Typography variant="body" className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Businesses, schools, places of worship, and community groups frequently partner with Bridge Global Network to co-host winter coat drives, school backpack drives, or welcome sessions.
          </Typography>

          <div className="pt-sm">
            <Link href="/contact" aria-label="Contact us to co-host an event">
              <Button size="lg" variant="primary">
                Inquire / Partner With Us <ArrowRight className="ml-xs h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA */}
      <section
        className="py-2xl px-md lg:py-3xl lg:px-xl bg-primary text-primary-foreground"
        aria-labelledby="events-cta-heading"
      >
        <div className="mx-auto max-w-4xl text-center space-y-md">
          <Typography
            variant="h2"
            id="events-cta-heading"
            className="text-3xl sm:text-4xl text-primary-foreground font-bold"
          >
            Support Bridge Global Network Today
          </Typography>
          <Typography
            variant="body"
            className="text-primary-foreground/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Your financial support, item donations, and volunteer time ensure every event and arrival support session is delivered with dignity and care.
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
