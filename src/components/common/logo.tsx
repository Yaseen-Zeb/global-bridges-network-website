import * as React from "react";
import { cn } from "@/lib/utils";

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Rendered height in px; width follows the 204×36 artwork ratio. */
  height?: number;
}

const LOGO_WIDTH = 204;
const LOGO_HEIGHT = 36;

export function Logo({ className, height = LOGO_HEIGHT, ...props }: LogoProps) {
  return (
    <div className={cn("inline-flex items-center select-none", className)} {...props}>
      {/* SVG wraps embedded raster artwork, so next/image optimisation adds nothing here. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logo.svg"
        alt="Global Bridges Network"
        width={Math.round((LOGO_WIDTH / LOGO_HEIGHT) * height)}
        height={height}
        className="h-auto max-w-full"
      />
    </div>
  );
}
