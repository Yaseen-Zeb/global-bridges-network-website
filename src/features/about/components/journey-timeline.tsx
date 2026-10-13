"use client";

import * as React from "react";
import Image from "next/image";
import { Reveal } from "@/components/common/reveal";
import { Typography } from "@/components/common/typography";
import { hotspotPosition, type Milestone } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";


/**
 * Alternating timeline. The dashed centre line "draws" itself as the section
 * scrolls through the viewport (scaleY written in requestAnimationFrame).
 */
export function JourneyTimeline({ milestones }: { milestones: Milestone[] }) {
  const containerRef = React.useRef<HTMLOListElement>(null);
  const lineRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const line = lineRef.current;
    if (!line) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      line.style.transform = "scaleY(1)";
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      // The line tip follows a point 60% down the viewport.
      const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.6 - rect.top) / rect.height));
      line.style.transform = `scaleY(${progress})`;
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
  }, []);

  return (
    <ol ref={containerRef} className="relative space-y-3xl lg:space-y-4xl">
      {/* Faint guide plus the scroll-drawn dashed line on top of it. */}
      <span
        className="absolute inset-y-0 left-lg w-0 border-l-2 border-dashed border-highlight/25 md:left-1/2 md:-translate-x-1/2"
        aria-hidden="true"
      />
      <span
        ref={lineRef}
        className="absolute inset-y-0 left-lg w-0 origin-top scale-y-0 border-l-2 border-dashed border-highlight md:left-1/2 md:-translate-x-1/2"
        aria-hidden="true"
      />

      {milestones.map((milestone, index) => {
        const textFirst = index % 2 === 0;
        return (
          <li
            key={milestone._key}
            className="relative grid grid-cols-1 items-center gap-lg pl-3xl md:grid-cols-[1fr_6rem_1fr] md:gap-0 md:pl-0"
          >
            <Reveal
              direction={textFirst ? "left" : "right"}
              className={cn(
                "space-y-sm",
                textFirst ? "md:text-right" : "md:col-start-3 md:row-start-1"
              )}
            >
              <Typography variant="overline" as="p">
                {milestone.eyebrow}
              </Typography>
              <Typography variant="h3" className="whitespace-pre-line text-accent-foreground">
                {milestone.title}
              </Typography>
              <Typography
                variant="body-sm"
                className={cn("max-w-sm text-accent-foreground/90", textFirst && "md:ml-auto")}
              >
                {milestone.description}
              </Typography>
            </Reveal>

            {/* Marker sits on the line: left gutter on mobile, centre column on desktop. */}
            <span
              className="absolute left-lg top-0 flex h-10 w-10 -translate-x-1/2 items-center justify-center bg-accent md:static md:col-start-2 md:row-start-1 md:mx-auto md:translate-x-0"
              aria-hidden="true"
            >
              <span className="h-full w-full rounded-full border-2 border-dashed border-highlight animate-spin-slow motion-safe-only" />
            </span>

            <Reveal
              direction={textFirst ? "right" : "left"}
              delay={150}
              className={cn(textFirst ? "md:col-start-3" : "md:col-start-1 md:row-start-1")}
            >
              <div
                className={cn(
                  "group mx-auto max-w-sm bg-background p-xs shadow-modal transition-transform duration-500 ease-out hover:rotate-0 hover:scale-[1.03]",
                  textFirst ? "rotate-2" : "-rotate-2"
                )}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {milestone.imageUrl && (
                    <Image
                      src={milestone.imageUrl}
                      alt={milestone.imageAlt ?? ""}
                      fill
                      sizes="(min-width: 768px) 24rem, 90vw"
                      className="object-cover"
                      style={{ objectPosition: hotspotPosition(milestone.imageHotspot) }}
                    />
                  )}
                </div>
              </div>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
