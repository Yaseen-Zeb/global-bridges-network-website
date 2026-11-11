import { BriefcaseBusiness, CalendarClock, ChevronDown, MapPin } from "lucide-react";
import { Reveal } from "@/components/common/reveal";
import { Typography } from "@/components/common/typography";
import { ApplyButton } from "@/features/careers/components/apply-button";
import { OPEN_POSITIONS, POSITION_TYPE_LABELS } from "@/features/careers/data/careers-content";
import type { Position } from "@/lib/sanity/types";

/** "2026-12-01" → "Dec 1, 2026" (read as UTC so the day never shifts). */
const formatDate = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", { timeZone: "UTC", dateStyle: "medium" });

/** Jobs come from Sanity → Open Positions; with none shown, an empty state points to the form. */
export function OpenPositionsSection({ positions }: { positions: Position[] }) {
  const count = positions.length;

  return (
    <section aria-labelledby="open-positions-heading" className="bg-background px-md py-3xl lg:px-xl lg:py-4xl">
      <div className="mx-auto max-w-6xl space-y-2xl">
        <div className="flex flex-col gap-md md:flex-row md:items-end md:justify-between">
          <Reveal direction="left" className="space-y-xs">
            <Typography variant="overline" as="p">
              {OPEN_POSITIONS.eyebrow}
            </Typography>
            <Typography variant="h2" id="open-positions-heading">
              {OPEN_POSITIONS.title}
            </Typography>
          </Reveal>
          {count > 0 && (
            <Reveal direction="right" delay={150}>
              <Typography variant="body-sm" className="text-muted-foreground md:text-right">
                {count} open {count === 1 ? "role" : "roles"}
              </Typography>
            </Reveal>
          )}
        </div>

        {count === 0 ? (
          <Reveal className="flex flex-col items-center gap-sm bg-surface p-xl text-center sm:p-2xl">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <BriefcaseBusiness className="h-6 w-6" aria-hidden="true" />
            </span>
            <Typography variant="body-sm" className="max-w-xl text-muted-foreground">
              {OPEN_POSITIONS.empty}
            </Typography>
          </Reveal>
        ) : (
          <ul className="space-y-md">
            {positions.map((position, index) => (
              <li key={position._id}>
                <Reveal
                  delay={index * 80}
                  className="border-l-4 border-transparent bg-surface transition-colors duration-300 hover:border-primary"
                >
                  <div className="grid grid-cols-1 gap-md p-lg md:grid-cols-[1fr_auto] md:items-center lg:px-xl">
                    <div className="space-y-sm">
                      <div className="flex flex-wrap items-center gap-x-md gap-y-xs text-xs text-muted-foreground">
                        <span className="rounded-full bg-primary px-sm py-[2px] font-semibold text-primary-foreground">
                          {POSITION_TYPE_LABELS[position.type] ?? position.type}
                        </span>
                        {position.location && (
                          <span className="flex items-center gap-xs">
                            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                            {position.location}
                          </span>
                        )}
                        {position.closingDate && (
                          <span className="flex items-center gap-xs">
                            <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
                            Apply by {formatDate(position.closingDate)}
                          </span>
                        )}
                      </div>
                      <Typography variant="h4-semibold" as="h3">
                        {position.title}
                      </Typography>
                      <Typography variant="body-sm" className="max-w-2xl text-muted-foreground">
                        {position.summary}
                      </Typography>
                    </div>

                    <ApplyButton role={position.title} label={OPEN_POSITIONS.apply} />
                  </div>

                  {position.description && (
                    <details className="group border-t border-border">
                      <summary className="flex cursor-pointer list-none items-center gap-xs px-lg py-sm text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring lg:px-xl [&::-webkit-details-marker]:hidden">
                        {OPEN_POSITIONS.details}
                        <ChevronDown className="h-4 w-4 transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
                      </summary>
                      <Typography variant="body-sm" className="whitespace-pre-line px-lg pb-lg text-muted-foreground lg:px-xl">
                        {position.description}
                      </Typography>
                    </details>
                  )}
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
