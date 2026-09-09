import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-button text-sm font-semibold transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground border border-border/50 shadow-xs hover:bg-secondary/80 hover:border-primary/30 dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-secondary/80 dark:border-border",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 dark:bg-destructive dark:text-destructive-foreground",
        outline:
          "border-2 border-primary/30 bg-background text-primary shadow-xs hover:border-primary hover:bg-primary/10 dark:border-primary/50 dark:text-foreground dark:hover:text-primary dark:hover:bg-primary/20 dark:hover:border-primary",
        ghost:
          "text-foreground hover:bg-primary/10 hover:text-primary dark:text-foreground dark:hover:bg-primary/20 dark:hover:text-primary-foreground",
        link:
          "text-primary underline-offset-4 hover:underline hover:text-primary/80 dark:text-primary dark:hover:text-primary/90",
      },
      size: {
        sm: "h-8 px-sm text-xs rounded-button",
        md: "h-10 px-md py-sm text-sm rounded-button",
        lg: "h-12 px-lg py-md text-base rounded-button",
        icon: "h-10 w-10 rounded-button",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
