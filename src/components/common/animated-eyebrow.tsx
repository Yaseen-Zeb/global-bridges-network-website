"use client";

import * as React from "react";
import { HeartHandshake } from "lucide-react";
import { cn } from "@/lib/utils";

const TAGS = [
  "Building Bridges of Hope & Opportunity",
  "Empowering Refugees & Immigrant Families",
  "Advancing Overseas Women Empowerment",
  "Fostering Sustainable Global Community",
  "Uniting Compassion Across Borders",
];

interface AnimatedEyebrowProps extends React.HTMLAttributes<HTMLDivElement> {
  intervalMs?: number;
}

export function AnimatedEyebrow({
  className,
  intervalMs = 3200,
  ...props
}: AnimatedEyebrowProps) {
  const [index, setIndex] = React.useState(0);
  const [animState, setAnimState] = React.useState<"enter" | "idle" | "exit">("idle");

  React.useEffect(() => {
    const timer = setInterval(() => {
      setAnimState("exit");
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % TAGS.length);
        setAnimState("enter");
        setTimeout(() => {
          setAnimState("idle");
        }, 50);
      }, 300);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [intervalMs]);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-xs rounded-full bg-primary/10 border border-primary/20 px-md py-xs text-xs font-semibold text-primary transition-all duration-300 shadow-sm overflow-hidden",
        className
      )}
      {...props}
    >
      <HeartHandshake className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
      <span
        className={cn(
          "transition-all duration-300 ease-in-out transform inline-block whitespace-nowrap",
          animState === "exit"
            ? "-translate-x-4 opacity-0"
            : animState === "enter"
              ? "translate-x-4 opacity-0"
              : "translate-x-0 opacity-100"
        )}
      >
        {TAGS[index]}
      </span>
    </div>
  );
}
