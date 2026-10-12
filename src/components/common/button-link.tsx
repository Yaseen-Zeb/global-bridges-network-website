import * as React from "react";
import Link from "next/link";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ButtonLinkProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Link>, "className">,
    VariantProps<typeof buttonVariants> {
  className?: string;
}

/** A Next.js Link styled with the Button variants (avoids nesting <button> in <a>). */
export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
