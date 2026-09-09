"use client";

import * as React from "react";
import Link from "next/link";
import { PackageCheck, ArrowRight, Heart } from "lucide-react";
import { CurrentNeed } from "@/data/current-needs";
import { CurrentNeedCard } from "./current-need-card";
import { Typography } from "@/components/common/typography";
import { Button } from "@/components/ui/button";

export interface CurrentNeedsGridProps {
  needs: CurrentNeed[];
}

export function CurrentNeedsGrid({ needs }: CurrentNeedsGridProps) {
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [selectedPriority, setSelectedPriority] = React.useState("all");

  // Extract unique categories from active needs
  const categories = React.useMemo(() => {
    const activeNeeds = needs.filter((n) => n.active);
    const set = new Set(activeNeeds.map((n) => n.category));
    return ["all", ...Array.from(set)];
  }, [needs]);

  // Filter active needs based on selected category & priority
  const filteredNeeds = React.useMemo(() => {
    return needs.filter((item) => {
      if (!item.active) return false;
      const matchCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchPriority =
        selectedPriority === "all" || item.priority === selectedPriority;
      return matchCategory && matchPriority;
    });
  }, [needs, selectedCategory, selectedPriority]);

  return (
    <div className="space-y-xl">
      {/* Category Filter Tabs */}
      <div
        role="tablist"
        aria-label="Filter current needs by category"
        className="flex flex-wrap items-center justify-center gap-xs sm:gap-sm p-xs rounded-card bg-muted/60 border border-border max-w-4xl mx-auto"
      >
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          const label = cat === "all" ? "All Needed Items" : cat;
          return (
            <button
              key={cat}
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedCategory(cat)}
              className={`px-md py-xs rounded-button text-xs sm:text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 select-none ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/80"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Grid of Current Need Cards or Empty State */}
      {filteredNeeds.length > 0 ? (
        <div
          role="region"
          aria-live="polite"
          aria-label="Current needed items list"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg"
        >
          {filteredNeeds.map((item) => (
            <CurrentNeedCard key={item.id} need={item} />
          ))}
        </div>
      ) : (
        /* Friendly Empty State Container */
        <div className="col-span-full text-center py-2xl px-md rounded-card border border-border bg-background shadow-card max-w-2xl mx-auto space-y-md">
          <div className="w-14 h-14 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto">
            <PackageCheck className="h-7 w-7" aria-hidden="true" />
          </div>

          <div className="space-y-xs">
            <Typography variant="h3" className="text-xl font-bold text-foreground">
              All Immediate Item Needs Currently Met!
            </Typography>
            <Typography variant="body-sm" className="text-muted-foreground leading-relaxed">
              Thanks to the tremendous generosity of our community, all current requested goods in this category have been fulfilled. Please check back soon as new arrival requests arise, or submit an offer for future needs.
            </Typography>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-sm pt-xs">
            <Link href="/donate-goods">
              <Button variant="primary" size="md">
                Offer Goods for Future Needs <ArrowRight className="ml-xs h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
            <Link href="/donate">
              <Button variant="outline" size="md">
                <Heart className="mr-xs h-4 w-4 text-primary" aria-hidden="true" />
                Support Financially
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
