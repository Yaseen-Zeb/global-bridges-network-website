import { BriefcaseBusiness, CalendarClock, MapPin } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/common/reveal";
import { Typography } from "@/components/common/typography";
import { ApplyButton } from "@/features/careers/components/apply-button";
import { OPEN_POSITIONS, POSITION_TYPE_LABELS } from "@/features/careers/data/careers-content";
import type { Position } from "@/lib/sanity/types";

/** "2026-12-01" → "December 1, 2026" (read as UTC so the day never shifts). */
const formatDate = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", { timeZone: "UTC", dateStyle: "long" });

/** Jobs come from Sanity → Open Positions; with none shown, an empty state points to the form. */
export function OpenPositionsSection({ positions }: { positions: Position[] }) {
  return (
    <section aria-labelledby="open-positions-heading" className="bg-background px-md py-3xl lg:px-xl lg:py-4xl">
      <div className="mx-auto max-w-4xl space-y-2xl">
        <Reveal className="space-y-sm text-center">
          <Typography variant="overline" as="p">
            {OPEN_POSITIONS.eyebrow}
          </Typography>
          <Typography variant="h2" id="open-positions-heading">
            {OPEN_POSITIONS.title}
          </Typography>
        </Reveal>

        {positions.length === 0 ? (
          <Reveal className="mx-auto max-w-2xl space-y-sm border border-border bg-surface p-lg text-center sm:p-xl">
            <BriefcaseBusiness className="mx-auto h-8 w-8 text-primary" aria-hidden="true" />
            <Typography variant="body-sm" className="text-muted-foreground">
              {OPEN_POSITIONS.empty}
            </Typography>
          </Reveal>
        ) : (
          <ul className="space-y-md">
            {positions.map((position, index) => (
              <li key={position._id}>
                <Reveal delay={index * 80} className="space-y-md border border-border bg-background p-lg shadow-sm sm:p-xl">
                  <div className="space-y-sm">
                    <Typography variant="h3">{position.title}</Typography>
                    <ul className="flex flex-wrap gap-x-md gap-y-xs text-sm text-muted-foreground">
                      <li className="flex items-center gap-xs">
                        <BriefcaseBusiness className="h-4 w-4 text-primary" aria-hidden="true" />
                        {POSITION_TYPE_LABELS[position.type] ?? position.type}
                      </li>
                      {position.location && (
                        <li className="flex items-center gap-xs">
                          <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                          {position.location}
                        </li>
                      )}
                      {position.closingDate && (
                        <li className="flex items-center gap-xs">
                          <CalendarClock className="h-4 w-4 text-primary" aria-hidden="true" />
                          Apply by {formatDate(position.closingDate)}
                        </li>
                      )}
                    </ul>
                    <Typography variant="body-sm" className="text-muted-foreground">
                      {position.summary}
                    </Typography>
                  </div>

                  {position.description && (
                    <Accordion>
                      <AccordionItem value="details" variant="line">
                        <AccordionTrigger variant="line">{OPEN_POSITIONS.details}</AccordionTrigger>
                        <AccordionContent variant="line" className="whitespace-pre-line">
                          {position.description}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  )}

                  <ApplyButton role={position.title} label={OPEN_POSITIONS.apply} />
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
