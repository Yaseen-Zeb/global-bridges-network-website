"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

/** Red asterisk for required fields. Screen readers get aria-required on the field instead. */
export function RequiredMark() {
  return (
    <span className="ml-0.5 text-destructive" aria-hidden="true">
      *
    </span>
  );
}

export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & { required?: boolean }
>(({ className, required, children, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "block text-xs font-semibold text-foreground leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  >
    {children}
    {required && <RequiredMark />}
  </LabelPrimitive.Root>
));
Label.displayName = LabelPrimitive.Root.displayName;
