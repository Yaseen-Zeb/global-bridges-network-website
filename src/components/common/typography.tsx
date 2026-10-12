import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const typographyVariants = cva("text-foreground", {
  variants: {
    variant: {
      display: "font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl",
      h1: "font-heading text-3xl font-bold tracking-tight lg:text-4xl",
      h2: "font-heading text-2xl font-semibold tracking-tight lg:text-3xl",
      h3: "font-heading text-2xl font-semibold tracking-tight",
      title: "font-heading text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl",
      "card-title": "font-heading text-xl font-bold leading-snug",
      eyebrow: "text-xs font-semibold uppercase tracking-widest text-highlight",
      body: "text-base font-normal leading-7",
      "body-sm": "text-sm font-normal leading-6",
      caption: "text-xs font-medium text-muted-foreground",
      label: "text-sm font-medium leading-none select-none",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

type TypographyElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div" | "label";

const defaultElementMap: Record<NonNullable<VariantProps<typeof typographyVariants>["variant"]>, TypographyElement> = {
  display: "h1",
  title: "h2",
  "card-title": "h3",
  eyebrow: "span",
  h1: "h1",
  h2: "h2",
  h3: "h3",
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
