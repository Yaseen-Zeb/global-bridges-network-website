import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Variants mirror the approved Typography System:
 * headings in Montserrat, everything else in IBM Plex Sans.
 * Sizes come from the fontSize tokens in tailwind.config.ts; headings scale
 * down a step or two on smaller screens and hit the spec size on desktop.
 */
export const typographyVariants = cva("text-foreground", {
  variants: {
    variant: {
      display: "font-heading text-h3 font-bold sm:text-h1 lg:text-display", // 64/72 Bold
      h1: "font-heading text-h3 font-bold sm:text-h2 lg:text-h1", // 48/56 Bold
      h2: "font-heading text-h4 font-bold sm:text-h3 lg:text-h2", // 40/48 Bold
      h3: "font-heading text-h4 font-bold lg:text-h3", // 32/40 Bold
      h4: "font-heading text-h4 font-bold", // 24/30 Bold
      "h4-semibold": "font-heading text-h4 font-semibold", // "H4.1": 24/30 Semibold
      overline: "text-overline font-semibold uppercase tracking-widest text-highlight", // 12/16 Semibold
      "body-lg": "text-body-lg font-normal", // 20/30 Regular
      body: "text-body font-normal", // 16/26 Regular
      "body-sm": "text-body-sm font-normal", // 14/22 Regular
      caption: "text-caption font-normal text-muted-foreground", // 12/18 Regular
      label: "text-body-sm font-medium leading-none select-none",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

type TypographyElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div" | "label";

// H4 styles are mostly card titles sitting under an h2 section, so they render as h3 by default.
const defaultElementMap: Record<NonNullable<VariantProps<typeof typographyVariants>["variant"]>, TypographyElement> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h3",
  "h4-semibold": "h3",
  overline: "span",
  "body-lg": "p",
  body: "p",
  "body-sm": "p",
  caption: "span",
  label: "label",
};

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: TypographyElement;
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = "body", as, children, ...props }, ref) => {
    const Component = as || (variant ? defaultElementMap[variant] : "p");

    return React.createElement(
      Component,
      {
        className: cn(typographyVariants({ variant, className })),
        ref,
        ...props,
      },
      children
    );
  }
);

Typography.displayName = "Typography";
