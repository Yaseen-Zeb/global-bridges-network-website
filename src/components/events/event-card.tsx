import * as React from "react";
import Link from "next/link";
import { Calendar, Clock, MapPin, Tag, ArrowRight } from "lucide-react";
import { EventItem } from "@/data/events";
import { Typography } from "@/components/common/typography";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface EventCardProps {
  event: EventItem;
  className?: string;
}

export function EventCard({ event, className }: EventCardProps) {
  const {
    title,
    description,
    category,
    date,
    time,
    location,
    status = "upcoming",
    registrationUrl = "/contact",
    published = true,
  } = event;

  const categoryLabels = {
    workshop: "Workshop & Training",
    community: "Community Gathering",
    "volunteer-drive": "Volunteer Drive",
    webinar: "Online Webinar",
  };

  const isUpcoming = status === "upcoming";

  return (
    <article
      className={cn(
        "rounded-card border border-border bg-background p-lg shadow-card flex flex-col justify-between space-y-md relative overflow-hidden transition-colors",
        !isUpcoming && "opacity-75 bg-muted/20 border-dashed",
        !published && "opacity-50",
        className
      )}
    >
      <div className="space-y-sm">
        {/* Category & Status Header */}
        <div className="flex flex-wrap items-center justify-between gap-xs">
          <span className="inline-flex items-center gap-[4px] rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary border border-primary/20">
            <Tag className="h-3 w-3 text-primary shrink-0" aria-hidden="true" />
            {categoryLabels[category]}
          </span>

          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border",
              isUpcoming
                ? "bg-success/10 text-success border-success/30"
                : "bg-muted text-muted-foreground border-border"
            )}
          >
            {isUpcoming ? "Upcoming Event" : "Past Event"}
          </span>
        </div>

        {/* Title */}
        <Typography variant="h3" className="text-xl font-bold text-foreground leading-snug">
          {title}
        </Typography>

        {/* Event Meta Info (Date, Time, Location) */}
        <div className="space-y-xs pt-xs border-t border-border/40 text-xs text-muted-foreground">
          <div className="flex items-start gap-xs">
            <Calendar className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
            <span className="font-semibold text-foreground">{date}</span>
          </div>

          {time && (
            <div className="flex items-start gap-xs">
              <Clock className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
              <span>{time}</span>
            </div>
          )}

          <div className="flex items-start gap-xs">
            <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
            <span>{location}</span>
          </div>
        </div>

        {/* Description */}
        <Typography variant="body-sm" className="text-muted-foreground leading-relaxed pt-xs">
          {description}
        </Typography>
      </div>

      {/* Registration CTA */}
      <div className="pt-sm border-t border-border/60">
        {isUpcoming ? (
          <Link href={registrationUrl} aria-label={`Register for ${title}`}>
            <Button variant="outline" className="w-full">
              Register / Inquire <ArrowRight className="ml-xs h-4 w-4 text-primary" aria-hidden="true" />
            </Button>
          </Link>
        ) : (
          <Button variant="ghost" disabled className="w-full text-xs text-muted-foreground cursor-not-allowed">
            Event Concluded
          </Button>
        )}
      </div>
    </article>
  );
}
