import * as React from "react";
import { cn } from "@/lib/utils";

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  showSubtitle?: boolean;
}

export function Logo({ className, showSubtitle = true, ...props }: LogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-2.5 select-none group cursor-pointer", className)} {...props}>
      {/* High-Resolution Emblem Icon */}
      <div className="relative w-10 h-10 shrink-0 rounded-full bg-slate-900 dark:bg-slate-950 p-1 flex items-center justify-center border border-slate-700/60 shadow-md transition-transform group-hover:scale-105">
        <svg
          width="36"
          height="36"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-hidden="true"
        >
          {/* Outer Ring */}
          <circle cx="20" cy="20" r="18" stroke="#334155" strokeWidth="2" />

          {/* Globe Meridian Arc (Orange) */}
          <path
            d="M 18 5 C 28 13, 27 27, 17 35"
            stroke="#E05638"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Bridge Arch (Vibrant Blue) */}
          <path
            d="M 9 27 C 12 15, 28 15, 31 27"
            stroke="hsl(var(--primary))"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Connection Points (Coral / Orange Nodes) */}
          <circle cx="8.5" cy="28" r="2.5" fill="#E05638" />
          <circle cx="31" cy="27.5" r="2.5" fill="#E05638" />
        </svg>
      </div>

      {/* Brand Name & Subtitle */}
      <div className="flex flex-col justify-center leading-none">
        <span className="text-xl font-black tracking-wider text-primary uppercase drop-shadow-xs">
          BRIDGE
        </span>
        {showSubtitle && (
          <span className="text-[10px] font-extrabold tracking-[0.2em] text-muted-foreground uppercase mt-0.5">
            GLOBAL NETWORK
          </span>
        )}
      </div>
    </div>
  );
}
