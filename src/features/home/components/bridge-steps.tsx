"use client";

import * as React from "react";
import Image from "next/image";
import { Typography } from "@/components/common/typography";
import type { BRIDGE } from "@/features/home/data/home-content";

type Step = (typeof BRIDGE.steps)[number];

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Scroll-linked rise: on desktop the cards climb into place one after another as
 * the row scrolls up (card 1 first, card 4 last); on smaller screens each card
 * rises as it enters the viewport. Transforms are written straight to the DOM
 * inside requestAnimationFrame, so scrolling never re-renders React.
 */
export function BridgeSteps({ steps }: { steps: Step[] }) {
  const slotRefs = React.useRef<(HTMLLIElement | null)[]>([]);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const desktop = window.matchMedia("(min-width: 1024px)");
    let frame = 0;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;

      slotRefs.current.forEach((slot, i) => {
        const card = cardRefs.current[i];
        if (!slot || !card) return;

        const top = slot.getBoundingClientRect().top;
        let progress: number;

        if (desktop.matches) {
          // Starts once the row's top is 80% down the viewport (cards actually in view),
          // finishes when it reaches 25% from the top.
          const row = clamp((vh * 0.8 - top) / (vh * 0.55));
          progress = clamp((row - i * 0.15) / 0.55);
        } else {
          // Each card starts rising once its top is 90% down the viewport.
          progress = clamp((vh * 0.9 - top) / (vh * 0.45));
        }

        const offset = (1 - easeOutCubic(progress)) * (desktop.matches ? 100 : 25);
        card.style.transform = `translate3d(0, ${offset}%, 0)`;
      });
    };

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    desktop.addEventListener("change", requestUpdate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      desktop.removeEventListener("change", requestUpdate);
    };
  }, []);

  return (
    <ol className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <li
          key={step.number}
          ref={(el) => {
            slotRefs.current[i] = el;
          }}
        >
          <div
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="group flex h-full flex-col bg-surface will-change-transform"
          >
            <div className="relative aspect-[300/267] overflow-hidden">
              <Image
                src={step.image.src}
                alt={step.image.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div className="flex-1 space-y-xs p-md">
              <Typography variant="body" as="h3" className="font-medium">
                {step.number} - {step.title}
              </Typography>
              <Typography variant="caption" as="p">
                {step.description}
              </Typography>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
