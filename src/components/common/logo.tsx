import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  showSubtitle?: boolean;
}

export function Logo({ className, showSubtitle = true, ...props }: LogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-xs select-none", className)} {...props}>
      {/* Interconnected Bridge & Globe Icon */}
      <svg
        width="38"
        height="38"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-hidden="true"
      >
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2.5" className="text-primary/20" />
        {/* Bridge Arc */}
        <path
          d="M 8 26 C 12 14, 28 14, 32 26"
          stroke="hsl(var(--primary))"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Globe Meridian */}
        <path
          d="M 20 4 C 28 12, 28 28, 20 36"
          stroke="hsl(var(--accent-coral))"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Connection Nodes */}
        <circle cx="20" cy="16" r="3" fill="hsl(var(--primary))" />
        <circle cx="12" cy="23" r="2.5" fill="hsl(var(--accent-coral))" />
        <circle cx="28" cy="23" r="2.5" fill="hsl(var(--accent-coral))" />
      </svg>

      <div className="flex flex-col leading-tight">
        <span className="text-xl font-extrabold tracking-wider text-primary uppercase">
          BRIDGE
        </span>
        {showSubtitle && (
          <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase -mt-1">
            Global Network
          </span>
        )}
      </div>
    </div>
  );
}
