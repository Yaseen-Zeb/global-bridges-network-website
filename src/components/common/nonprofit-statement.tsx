import { cn } from "@/lib/utils";

/**
 * 501(c)(3) line for the footer and the donation form. The tax ID comes from
 * Sanity → Contact & Site Settings and is left out until it's filled in.
 */
export function NonprofitStatement({ taxId, className }: { taxId?: string | null; className?: string }) {
  return (
    <p className={cn("text-xs text-muted-foreground", className)}>
      Global Bridges Network is a 501(c)(3) nonprofit organization.
      {taxId && <> Our federal tax ID (EIN) is {taxId}.</>}
    </p>
  );
}
