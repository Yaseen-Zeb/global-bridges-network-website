"use client";

import * as React from "react";
import Link from "next/link";
import { CalendarX, ArrowRight } from "lucide-react";
import { EventItem } from "@/lib/sanity/types";
import { EventCard } from "./event-card";
import { Typography } from "@/components/common/typography";
import { Button } from "@/components/ui/button";

export interface EventFilterGridProps {
  events: EventItem[];
}

const CATEGORY_TABS = [
  { id: "all", label: "All Events" },
  { id: "upcoming", label: "Upcoming Events" },
  { id: "workshop", label: "Workshops & Training" },
  { id: "community", label: "Community Gatherings" },
  { id: "past", label: "Past Events" },
];

export function EventFilterGrid({ events }: EventFilterGridProps) {
  const [activeTab, setActiveTab] = React.useState("upcoming");

  const filteredEvents = React.useMemo(() => {
    return events.filter((evt) => {
      if (!evt.published) return false;
      if (activeTab === "all") return true;
      if (activeTab === "upcoming") return evt.status === "upcoming";
      if (activeTab === "past") return evt.status === "past";
      return evt.category === activeTab;
    });
  }, [events, activeTab]);

  return (
    <div className="space-y-xl">
      {/* Filter Tabs */}
      <div
        role="tablist"
        aria-label="Filter events by category or status"
        className="flex flex-wrap items-center justify-center gap-xs sm:gap-sm p-xs rounded-card bg-muted/60 border border-border max-w-4xl mx-auto"
      >
        {CATEGORY_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className={`px-md py-xs rounded-button text-xs sm:text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 select-none ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/80"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Grid of Events or Empty State */}
      {filteredEvents.length > 0 ? (
        <div
          role="region"
          aria-live="polite"
          aria-label="Events list"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg"
        >
          {filteredEvents.map((item) => (
            <EventCard key={item._id} event={item} />
          ))}
        </div>
      ) : (
        /* Friendly Empty State */
        <div className="col-span-full text-center py-2xl px-md rounded-card border border-border bg-background shadow-card max-w-2xl mx-auto space-y-md">
          <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <CalendarX className="h-7 w-7" aria-hidden="true" />
          </div>

          <div className="space-y-xs">
            <Typography
              variant="h3"
              className="text-xl font-bold text-foreground"
            >
              No Events Found in This Category
            </Typography>
            <Typography
              variant="body-sm"
              className="text-muted-foreground leading-relaxed"
            >
              We are currently planning upcoming welcome dinners, workshops, and
              community drives. Check back soon or contact our team to inquire
              about hosting an event.
            </Typography>
          </div>

          <div className="pt-xs">
            <Link href="/contact">
              <Button variant="primary" size="md">
                Inquire / Host an Event{" "}
                <ArrowRight className="ml-xs h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
