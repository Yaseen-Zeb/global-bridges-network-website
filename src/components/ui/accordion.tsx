"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Root ─────────────────────────────────────────────────────────────────────
// Keeps the same props as the custom Accordion so no consumer files need to change.
export interface AccordionProps {
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  className?: string;
  children: React.ReactNode;
}

export function Accordion({
  type = "single",
  defaultValue,
  className,
  children,
}: AccordionProps) {
  // Radix requires separate Root variants for single / multiple
  if (type === "multiple") {
    const defaults = defaultValue
      ? Array.isArray(defaultValue)
        ? defaultValue
        : [defaultValue]
      : [];
    return (
      <AccordionPrimitive.Root
        type="multiple"
        defaultValue={defaults}
        className={cn("space-y-xs", className)}
      >
        {children}
      </AccordionPrimitive.Root>
    );
  }

  // single (default)
  const defaultSingle =
    defaultValue && !Array.isArray(defaultValue) ? defaultValue : undefined;
  return (
    <AccordionPrimitive.Root
      type="single"
      defaultValue={defaultSingle}
      collapsible
      className={cn("space-y-xs", className)}
    >
      {children}
    </AccordionPrimitive.Root>
  );
}

// ── Item ─────────────────────────────────────────────────────────────────────
export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
}

export function AccordionItem({ value, className, children, ...props }: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item
      value={value}
      className={cn(
        "rounded-card border border-border bg-background shadow-xs overflow-hidden transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </AccordionPrimitive.Item>
  );
}

// ── Trigger ───────────────────────────────────────────────────────────────────
export interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function AccordionTrigger({ className, children, ...props }: AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "flex w-full items-center justify-between p-lg text-left text-base font-semibold text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 select-none group",
          "data-[state=open]:text-primary data-[state=open]:bg-muted/30",
          className
        )}
        {...(props as React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>)}
      >
        <span className="pr-md font-bold leading-snug">{children}</span>
        <ChevronDown
          className="h-5 w-5 text-primary shrink-0 transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-180"
          aria-hidden="true"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

// ── Content ───────────────────────────────────────────────────────────────────
export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function AccordionContent({ className, children, ...props }: AccordionContentProps) {
  return (
    <AccordionPrimitive.Content
      className={cn(
        "overflow-hidden text-sm text-muted-foreground",
        "data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up",
        className
      )}
      {...(props as React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>)}
    >
      <div className="px-lg pb-lg pt-xs border-t border-border/40 leading-relaxed">
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}
