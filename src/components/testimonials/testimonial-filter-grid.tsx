"use client";

import * as React from "react";
import { TestimonialCard } from "./testimonial-card";
import { Testimonial } from "@/lib/sanity/types";
import { Typography } from "@/components/common/typography";

export interface TestimonialFilterGridProps {
  testimonials: Testimonial[];
}

const CATEGORIES = [
  { id: "all", label: "All Stories" },
  { id: "resettlement", label: "Resettlement & Aid" },
  { id: "women-empowerment", label: "Women's Empowerment" },
  { id: "volunteers", label: "Volunteers" },
  { id: "partners", label: "Community Partners" },
];

export function TestimonialFilterGrid({ testimonials }: TestimonialFilterGridProps) {
  const [activeCategory, setActiveCategory] = React.useState("all");

  const filteredTestimonials = React.useMemo(() => {
    if (activeCategory === "all") return testimonials;
    return testimonials.filter((t) => t.category === activeCategory);
  }, [testimonials, activeCategory]);

  return (
    <div className="space-y-xl">
      {/* Category Filter Tabs */}
      <div
        role="tablist"
        aria-label="Filter stories by category"
        className="flex flex-wrap items-center justify-center gap-xs sm:gap-sm p-xs rounded-card bg-muted/60 border border-border max-w-3xl mx-auto"
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isActive}
              aria-controls="testimonial-grid"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-md py-xs rounded-button text-xs sm:text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 select-none ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/80"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Testimonials Grid (Non-Carousel) */}
      <div
        id="testimonial-grid"
        role="region"
        aria-live="polite"
        aria-label="Testimonial stories grid"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg"
      >
        {filteredTestimonials.length > 0 ? (
          filteredTestimonials.map((item) => (
            <TestimonialCard key={item._id} testimonial={item} />
          ))
        ) : (
          <div className="col-span-full text-center py-2xl rounded-card border border-border bg-background p-lg space-y-xs">
            <Typography variant="h3" className="text-lg font-semibold text-foreground">
              No Stories Found
            </Typography>
            <Typography variant="body-sm" className="text-muted-foreground">
              There are currently no published stories under this category.
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}
