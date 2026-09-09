"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/common/typography";
import { Heart, RefreshCw, CreditCard, ShieldCheck, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DonationWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The third-party donation provider implementation key.
   * Defaults to "placeholder" until Zeffy or Give Lively integration is finalized.
   */
  provider?: "placeholder" | "zeffy" | "givelively";
  /**
   * Initial frequency tab selection.
   */
  defaultFrequency?: "one-time" | "monthly";
}

export function DonationWidget({
  provider = "placeholder",
  defaultFrequency = "one-time",
  className,
  ...props
}: DonationWidgetProps) {
  const [frequency, setFrequency] = React.useState<"one-time" | "monthly">(defaultFrequency);

  return (
    <div
      className={cn(
        "rounded-card border-2 border-primary/20 bg-background p-lg sm:p-xl shadow-card space-y-lg focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background transition-all",
        className
      )}
      {...props}
    >
      {/* Frequency Selector Tabs */}
      <div className="flex items-center justify-center p-xs rounded-button bg-muted/60 border border-border max-w-sm mx-auto">
        <button
          type="button"
          onClick={() => setFrequency("one-time")}
          className={cn(
            "flex-1 py-xs px-md text-sm font-semibold rounded-button transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            frequency === "one-time"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-pressed={frequency === "one-time"}
        >
          One-Time Gift
        </button>
        <button
          type="button"
          onClick={() => setFrequency("monthly")}
          className={cn(
            "flex-1 py-xs px-md text-sm font-semibold rounded-button transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            frequency === "monthly"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-pressed={frequency === "monthly"}
        >
          Monthly Partner
        </button>
      </div>

      {/* Provider Abstraction Layer */}
      {provider === "placeholder" ? (
        <div
          tabIndex={0}
          role="region"
          aria-label="Donation Processing Container (Placeholder)"
          className="border-2 border-dashed border-primary/30 rounded-card p-lg sm:p-xl bg-muted/20 text-center space-y-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
            {frequency === "monthly" ? (
              <RefreshCw className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Heart className="h-6 w-6" aria-hidden="true" />
            )}
          </div>

          <div className="space-y-xs max-w-md mx-auto">
            <Typography variant="h3" className="text-xl font-bold">
              {frequency === "monthly" ? "Monthly Recurring Gift" : "One-Time Donation"}
            </Typography>
            <Typography variant="body-sm" className="text-muted-foreground leading-relaxed">
              Third-party donation provider container (Zeffy / Give Lively). Once selected, the secure payment processing widget will load seamlessly inside this container.
            </Typography>
          </div>

          <div className="inline-flex items-center gap-xs rounded-button bg-background border border-border px-md py-xs text-xs text-muted-foreground shadow-xs">
            <CreditCard className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <span>Secure 256-Bit SSL Encrypted Processing Container</span>
          </div>
        </div>
      ) : (
        /* Future third-party provider iframe insertion container */
        <div className="w-full min-h-[450px]">
          <iframe
            src={provider === "zeffy" ? "https://www.zeffy.com" : "https://www.givelively.org"}
            title="Bridge Global Network Donation Checkout"
            className="w-full h-full min-h-[450px] border-0 rounded-card"
            allow="payment"
            tabIndex={0}
          />
        </div>
      )}

      {/* Trust & Guarantee Subtext */}
      <div className="flex items-center justify-center gap-xs text-xs text-muted-foreground pt-xs">
        <ShieldCheck className="h-4 w-4 text-success shrink-0" aria-hidden="true" />
        <span>Tax-Deductible 501(c)(3) Donation • Donor Privacy Guaranteed</span>
      </div>

      {/* Early Accessibility Testing Flag Notice */}
      <div className="rounded-button bg-warning/10 border border-warning/20 p-xs text-[11px] text-warning-foreground text-center flex items-center justify-center gap-xs">
        <AlertCircle className="h-3.5 w-3.5 shrink-0 text-warning" aria-hidden="true" />
        <span>Developer Note: Conduct WCAG keyboard focus & iframe title testing once live Zeffy/Give Lively provider is selected.</span>
      </div>
    </div>
  );
}
