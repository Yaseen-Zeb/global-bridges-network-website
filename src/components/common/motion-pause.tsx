"use client";

import * as React from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * WCAG 2.2.2 (Pause, Stop, Hide): content that moves on its own for more than
 * five seconds needs a way to pause it. Wrap a hero in <MotionPauseProvider>,
 * read the state in the moving component with useMotionPaused(), and place a
 * <MotionPauseButton> somewhere visible in the hero.
 */

const MotionPauseContext = React.createContext<{ paused: boolean; toggle: () => void } | null>(null);

export function MotionPauseProvider({ children }: { children: React.ReactNode }) {
  const [paused, setPaused] = React.useState(false);
  const toggle = React.useCallback(() => setPaused((value) => !value), []);
  const value = React.useMemo(() => ({ paused, toggle }), [paused, toggle]);
  return <MotionPauseContext.Provider value={value}>{children}</MotionPauseContext.Provider>;
}

export function useMotionPaused() {
  return React.useContext(MotionPauseContext)?.paused ?? false;
}

/** Hidden for visitors with "reduce motion" on, since nothing moves for them. */
export function MotionPauseButton({ label = "background images", className }: { label?: string; className?: string }) {
  const context = React.useContext(MotionPauseContext);
  if (!context) return null;
  const { paused, toggle } = context;
  const Icon = paused ? Play : Pause;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={paused}
      aria-label={paused ? `Play ${label}` : `Pause ${label}`}
      className={cn(
        "z-20 flex h-10 w-10 items-center justify-center rounded-full bg-ink/70 text-ink-foreground shadow-card backdrop-blur-sm transition-colors hover:bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight focus-visible:ring-offset-2 motion-reduce:hidden",
        className
      )}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
