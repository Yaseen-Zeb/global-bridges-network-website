import * as React from "react";
import Image from "next/image";
import { Package, Clock, AlertTriangle, CheckCircle, Tag } from "lucide-react";
import { CurrentNeed } from "@/data/current-needs";
import { Typography } from "@/components/common/typography";
import { cn } from "@/lib/utils";

export interface CurrentNeedCardProps {
  need: CurrentNeed;
  className?: string;
}

export function CurrentNeedCard({ need, className }: CurrentNeedCardProps) {
  const {
    itemName,
    description,
    category,
    quantity,
    priority = "medium",
    image,
    lastUpdated,
    active = true,
  } = need;

  const priorityStyles = {
    urgent: "bg-destructive/10 text-destructive border-destructive/30",
    high: "bg-warning/10 text-warning-foreground border-warning/30",
    medium: "bg-primary/10 text-primary border-primary/20",
  };

  const priorityLabels = {
    urgent: "Urgent Priority",
    high: "High Priority",
    medium: "Standard Priority",
  };

  return (
    <article
      className={cn(
        "rounded-card border border-border bg-background p-lg shadow-card flex flex-col justify-between space-y-md relative overflow-hidden transition-colors",
        !active && "opacity-60 bg-muted/20 border-dashed",
        className
      )}
    >
      {/* Optional Item Image or Fallback Header */}
      {image && (
        <div className="relative h-44 w-full rounded-button overflow-hidden border border-border bg-muted">
          <Image
            src={image}
            alt={itemName}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="space-y-sm">
        {/* Category & Priority Badge Row */}
        <div className="flex flex-wrap items-center justify-between gap-xs">
          <span className="inline-flex items-center gap-[4px] rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground border border-border">
            <Tag className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
            {category}
          </span>

          <span
            className={cn(
              "inline-flex items-center gap-[4px] rounded-full px-2.5 py-0.5 text-xs font-semibold border",
              priorityStyles[priority]
            )}
          >
            <AlertTriangle className="h-3 w-3" aria-hidden="true" />
            {priorityLabels[priority]}
          </span>
        </div>

        {/* Item Title & Icon Top Aligned */}
        <div className="flex items-start gap-sm pt-xs">
          <Package className="h-5 w-5 text-primary shrink-0 mt-1" aria-hidden="true" />
          <Typography variant="h3" className="text-lg font-bold text-foreground leading-snug">
            {itemName}
          </Typography>
        </div>

        {/* Description */}
        <Typography variant="body-sm" className="text-muted-foreground leading-relaxed">
          {description}
        </Typography>
      </div>

      {/* Meta Footer (Quantity & Last Updated) */}
      <footer className="pt-sm border-t border-border/60 flex flex-wrap items-center justify-between gap-xs text-xs text-muted-foreground">
        {quantity ? (
          <div className="inline-flex items-center gap-xs font-medium text-foreground">
            <CheckCircle className="h-3.5 w-3.5 text-success shrink-0" aria-hidden="true" />
            <span>Requested: <strong>{quantity}</strong></span>
          </div>
        ) : (
          <span className="italic">Quantity as available</span>
        )}

        {lastUpdated && (
          <div className="inline-flex items-center gap-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>Updated {lastUpdated}</span>
          </div>
        )}

        {!active && (
          <span className="w-full text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block text-right pt-xs">
            Inactive / Fulfilled
          </span>
        )}
      </footer>
    </article>
  );
}
