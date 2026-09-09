import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const typographyVariants = cva("text-foreground", {
  variants: {
    variant: {
      h1: "text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "text-3xl font-semibold tracking-tight",
      h3: "text-2xl font-semibold tracking-tight",
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
