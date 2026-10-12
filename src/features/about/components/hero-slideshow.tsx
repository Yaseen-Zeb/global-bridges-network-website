"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface HeroSlideshowProps {
  images: { src: string; alt: string }[];
  intervalMs?: number;
}

const FADE_MS = 2000;

/**
 * Stacked background photos that cross-fade. Each photo starts a fresh, steady
 * sideways pan the moment it becomes active and keeps panning until it has fully
 * faded out, so a visible photo is never standing still. Direction alternates.
 */
export function HeroSlideshow({ images, intervalMs = 7000 }: HeroSlideshowProps) {
  const [active, setActive] = React.useState(0);
  // The outgoing photo keeps its animation while it fades out.
  const [leaving, setLeaving] = React.useState<number | null>(null);
  const activeRef = React.useRef(0);

  React.useEffect(() => {
    if (images.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let fadeTimer: ReturnType<typeof setTimeout>;
    const timer = setInterval(() => {
      if (document.hidden) return;
      const current = activeRef.current;
      activeRef.current = (current + 1) % images.length;
      setLeaving(current);
      setActive(activeRef.current);
      clearTimeout(fadeTimer);
      fadeTimer = setTimeout(() => setLeaving(null), FADE_MS);
    }, intervalMs);

    return () => {
      clearInterval(timer);
      clearTimeout(fadeTimer);
    };
  }, [images.length, intervalMs]);

  // One pan covers the photo's whole visible time: shown for intervalMs, then fading out.
  const panDuration = `${intervalMs + FADE_MS}ms`;

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {images.map((image, i) => {
        const moving = i === active || i === leaving;
        return (
          <div
            key={image.src}
            className={cn(
              "absolute inset-0 transition-opacity duration-[2000ms] ease-in-out",
              i === active ? "opacity-100" : "opacity-0"
            )}
          >
            <Image
              src={image.src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              // Re-adding the class when a photo becomes active restarts its pan from the beginning.
              className={cn(
                "scale-[1.08] object-cover motion-safe-only",
                moving && (i % 2 === 0 ? "animate-pan-right" : "animate-pan-left")
              )}
              style={moving ? { animationDuration: panDuration } : undefined}
            />
          </div>
        );
      })}
    </div>
  );
}
