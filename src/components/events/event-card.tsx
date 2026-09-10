import * as React from "react";
import Link from "next/link";
import { Calendar, Clock, MapPin, Tag, ArrowRight } from "lucide-react";
import { EventItem } from "@/lib/sanity/types";
import { Typography } from "@/components/common/typography";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
    status,
    registrationUrl,
    published = true,
  } = event;

  const resolvedStatus = status ?? "upcoming";
  const resolvedRegistrationUrl = registrationUrl ?? "/contact";

  const categoryLabels: Record<string, string> = {
    workshop: "Workshop & Training",
    community: "Community Gathering",
    "volunteer-drive": "Volunteer Drive",
    webinar: "Online Webinar",
  };

  const isUpcoming = resolvedStatus === "upcoming";

  return (
    <Card
      className={cn(
        "flex flex-col justify-between overflow-hidden transition-colors",
        !isUpcoming && "opacity-75 bg-muted/20 border-dashed",
        !published && "opacity-50",
        className
      )}
    >
      {/* Optional Event Image */}
      {event.imageUrl && (
        <div className="relative h-48 w-full overflow-hidden border-b border-border bg-muted">
          <img src={event.imageUrl} alt={title} className="object-cover w-full h-full" />
        </div>
      )}
      <CardContent className="pt-lg flex flex-col flex-1">
        {/* Category & Status Header */}
        <div className="flex flex-wrap items-center justify-between gap-xs">
          <Badge variant="default">
            <Tag className="h-3 w-3 shrink-0" aria-hidden="true" />
            {categoryLabels[category]}
          </Badge>

          <Badge variant={isUpcoming ? "success" : "secondary"}>
            {isUpcoming ? "Upcoming Event" : "Past Event"}
          </Badge>
        </div>

        {/* Title */}
        <Typography variant="h3" className="text-xl font-bold text-foreground leading-snug mt-sm">
          {title}
        </Typography>

        {/* Event Meta Info */}
        <div className="space-y-xs pt-sm border-t border-border/40 text-xs text-muted-foreground mt-sm">
          <div className="flex items-center gap-xs">
            <Calendar className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
            <span className="font-semibold text-foreground">{date}</span>
          </div>

          {time && (
            <div className="flex items-center gap-xs">
              <Clock className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
              <span>{time}</span>
            </div>
          )}

          <div className="flex items-center gap-xs">
            <MapPin className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
            <span>{location}</span>
          </div>
        </div>

        {/* Description — flex-1 absorbs extra space so footer CTA always aligns */}
        <Typography variant="body-sm" className="text-muted-foreground leading-relaxed pt-xs mt-sm flex-1">
          {description}
        </Typography>
      </CardContent>

      {/* Registration CTA */}
      <CardFooter className="border-t border-border/60 pt-sm">
        {isUpcoming ? (
          <Link href={resolvedRegistrationUrl} aria-label={`Register for ${title}`} className="w-full">
            <Button variant="outline" className="w-full">
              Register / Inquire{" "}
              <ArrowRight className="ml-xs h-4 w-4 text-primary" aria-hidden="true" />
            </Button>
          </Link>
        ) : (
          <Button
            variant="ghost"
            disabled
            className="w-full text-xs text-muted-foreground cursor-not-allowed"
          >
            Event Concluded
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
