import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center gap-[3px] rounded-full px-sm py-[2px] text-xs font-semibold whitespace-nowrap transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-primary/10 text-primary border border-primary/20",
        secondary:
          "bg-secondary text-secondary-foreground border border-border",
        success:
          "bg-success/10 text-success border border-success/20 dark:text-success",
        warning:
          "bg-warning/10 text-warning-foreground border border-warning/20",
        destructive:
          "bg-destructive/10 text-destructive border border-destructive/20",
        outline:
          "border border-border bg-transparent text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
