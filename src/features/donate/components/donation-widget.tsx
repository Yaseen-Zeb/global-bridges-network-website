"use client";

import * as React from "react";
import { Typography } from "@/components/common/typography";
import { ShieldCheck, Heart, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DonationWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The Zeffy donation form URL.
   * Admin can update this from Sanity Studio → Contact Information.
   */
  zeffyUrl: string;
}

export function DonationWidget({
  zeffyUrl,
  className,
  ...props
}: DonationWidgetProps) {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <div
      className={cn(
        "rounded-card border border-border bg-background shadow-card space-y-md overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Zeffy Embedded Donation Form */}
      <div className="relative w-full min-h-[600px]">
        {/* Loading skeleton */}
        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-md bg-muted/30 animate-pulse">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <Heart className="h-6 w-6" aria-hidden="true" />
            </div>
            <Typography variant="body-sm" className="text-muted-foreground">
              Loading secure donation form…
            </Typography>
          </div>
        )}

        <iframe
          src={zeffyUrl}
          title="Bridge Global Network — Donate via Zeffy"
          className="w-full border-0"
          style={{ minHeight: "600px" }}
          allow="payment"
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
      </div>

      {/* Trust Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-sm px-lg pb-lg text-xs text-muted-foreground">
        <div className="flex items-center gap-xs">
          <ShieldCheck className="h-4 w-4 text-success shrink-0" aria-hidden="true" />
          <span>100% Secure • Zero Platform Fees</span>
        </div>
        <span className="hidden sm:inline">•</span>
        <a
          href={zeffyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-xs text-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-button"
        >
          Open in new tab <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
