"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Fraction of the scroll distance the content lags behind (0 = normal scroll, 0.4 = moves 40% slower). */
  speed?: number;
}

/**
 * Makes its content scroll slower than the page, so whatever follows it in the
 * layout appears to slide up over it. Transform is written in requestAnimationFrame.
 */
export function Parallax({ speed = 0.35, className, children, ...props }: ParallaxProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const parent = element.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      // Only work while the parent is on screen.
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const scrolledPast = Math.max(0, -rect.top);
      element.style.transform = `translate3d(0, ${scrolledPast * speed}px, 0)`;
    };
    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [speed]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)} {...props}>
      {children}
    </div>
  );
}
