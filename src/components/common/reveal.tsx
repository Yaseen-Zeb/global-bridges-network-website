"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type RevealDirection = "up" | "down" | "left" | "right" | "zoom";

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: RevealDirection;
  /** Delay in milliseconds, used to stagger sibling elements. */
  delay?: number;
}

/**
 * Fades and slides its children into view the first time they scroll on screen.
 * Styles live in globals.css (.reveal) and respect prefers-reduced-motion.
 */
export function Reveal({ direction = "up", delay = 0, className, style, children, ...props }: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-direction={direction}
      data-visible={visible}
      className={cn("reveal", className)}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
