import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const alertVariants = cva(
  "relative w-full rounded-button border p-md text-sm flex items-start gap-sm",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border-border",
        success:
          "bg-success/10 border-success/30 text-success-foreground [&>svg]:text-success",
        destructive:
          "bg-destructive/10 border-destructive/30 text-destructive-foreground [&>svg]:text-destructive",
        warning:
          "bg-warning/10 border-warning/30 text-warning-foreground [&>svg]:text-warning-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

export function Alert({ className, variant, ...props }: AlertProps) {
  return (
    <div
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

export function AlertTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <span className={cn("font-bold block leading-tight", className)} {...props} />
  );
}

export function AlertDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <span className={cn("leading-relaxed", className)} {...props} />
  );
}
