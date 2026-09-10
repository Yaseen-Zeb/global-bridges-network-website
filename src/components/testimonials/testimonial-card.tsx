import * as React from "react";
import { Quote } from "lucide-react";
import { Typography } from "@/components/common/typography";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { Testimonial } from "@/lib/sanity/types";

export interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  const { quote, authorName, authorRole, date, imageUrl, published = true } = testimonial;

  return (
    <Card
      className={cn(
        "flex flex-col justify-between relative transition-colors",
        !published && "opacity-75 border-dashed border-warning/50",
        className
      )}
    >
      {!published && (
        <div className="absolute top-3 right-3">
          <Badge variant="warning">Unpublished</Badge>
        </div>
      )}

      <CardContent className="pt-lg space-y-sm flex flex-col justify-between h-full">
        <div className="space-y-sm">
          {/* Quote Icon Header */}
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Quote className="h-5 w-5 text-primary rotate-180" aria-hidden="true" />
            </div>
            {date && (
              <span className="text-xs text-muted-foreground font-medium">{date}</span>
            )}
          </div>

          {/* Semantic Quote Content */}
          <blockquote className="m-0">
            <Typography
              variant="body"
              className="text-foreground leading-relaxed italic font-normal"
            >
              &ldquo;{quote}&rdquo;
            </Typography>
          </blockquote>
        </div>

        {/* Author & Role Meta */}
        <footer className="pt-sm border-t border-border/60 flex items-center gap-sm">
          {imageUrl ? (
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
              <img src={imageUrl} alt={authorName} className="object-cover w-full h-full" />
            </div>
          ) : (
            <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold text-sm select-none">
              {authorName.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="space-y-[2px] min-w-0">
            <cite className="not-italic block">
              <Typography
                variant="body-sm"
                className="font-semibold text-foreground truncate"
              >
                {authorName}
              </Typography>
            </cite>
            {authorRole && (
              <Typography
                variant="caption"
                className="text-xs text-muted-foreground block truncate"
              >
                {authorRole}
              </Typography>
            )}
          </div>
        </footer>
      </CardContent>
    </Card>
  );
}
