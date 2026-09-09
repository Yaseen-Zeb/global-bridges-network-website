import * as React from "react";
import { Package, Clock, AlertTriangle, CheckCircle, Tag } from "lucide-react";
import { CurrentNeed } from "@/data/current-needs";
import { Typography } from "@/components/common/typography";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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

  const priorityVariant: Record<string, "destructive" | "warning" | "default"> = {
    urgent: "destructive",
    high: "warning",
    medium: "default",
  };

  const priorityLabels = {
    urgent: "Urgent Priority",
    high: "High Priority",
    medium: "Standard Priority",
  };

  return (
    <Card
      className={cn(
        "flex flex-col justify-between overflow-hidden transition-colors",
        !active && "opacity-60 bg-muted/20 border-dashed",
        className
      )}
    >
      {/* Optional Item Image */}
      {image && (
        <div className="relative h-44 w-full overflow-hidden border-b border-border bg-muted">
          <img src={image} alt={itemName} className="object-cover w-full h-full" />
        </div>
      )}

      <CardContent className="pt-lg space-y-sm flex flex-col justify-between flex-1">
        <div className="space-y-sm">
          {/* Category & Priority Badge Row */}
          <div className="flex flex-wrap items-center justify-between gap-xs">
            <Badge variant="secondary">
              <Tag className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
              {category}
            </Badge>

            <Badge variant={priorityVariant[priority]}>
              <AlertTriangle className="h-3 w-3" aria-hidden="true" />
              {priorityLabels[priority]}
            </Badge>
          </div>

          {/* Item Title */}
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

        {/* Meta Footer */}
        <footer className="pt-sm border-t border-border/60 flex flex-wrap items-center justify-between gap-xs text-xs text-muted-foreground">
          {quantity ? (
            <div className="inline-flex items-center gap-xs font-medium text-foreground">
              <CheckCircle className="h-3.5 w-3.5 text-success shrink-0" aria-hidden="true" />
              <span>
                Requested: <strong>{quantity}</strong>
              </span>
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
      </CardContent>
    </Card>
  );
}
