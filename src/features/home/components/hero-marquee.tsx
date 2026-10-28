"use client";

import * as React from "react";
import Image from "next/image";
import { useMotionPaused } from "@/components/common/motion-pause";

interface Panel {
  src: string;
  width: number;
  height: number;
  alt: string;
}

interface HeroMarqueeProps {
  panels: Panel[];
}

/**
 * Endlessly scrolling photo strip. The panel set is rendered twice and the track
 * slides by exactly one set (-50%), so the loop restarts without a visible seam.
 * Pure CSS animation; stops for prefers-reduced-motion and when paused (WCAG 2.2.2).
 */
export function HeroMarquee({ panels }: HeroMarqueeProps) {
  const paused = useMotionPaused();

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="flex h-full w-max animate-marquee motion-safe-only"
        style={{ animationPlayState: paused ? "paused" : "running" }}
      >
        {[0, 1].map((copy) =>
          panels.map((panel, i) => (
            <div key={`${copy}-${i}`} className="h-full shrink-0 border-r-2 border-ink">
              <Image
                src={panel.src}
                alt=""
                width={panel.width}
                height={panel.height}
                priority={i < 2}
                sizes="(min-width: 768px) 60vw, 100vw"
                className="h-full w-auto max-w-none object-cover"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
