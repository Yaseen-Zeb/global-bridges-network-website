import { Reveal } from "@/components/common/reveal";
import { Typography } from "@/components/common/typography";
import { JourneyTimeline } from "@/features/about/components/journey-timeline";
import type { FoundersJourney } from "@/lib/sanity/types";

/** Content: Sanity → Founders Journey. */
export function FoundersJourneySection({ journey }: { journey: FoundersJourney | null }) {
  const milestones = journey?.milestones ?? [];
  if (milestones.length === 0) return null;

  return (
    <section
      aria-labelledby="founders-journey-heading"
      className="overflow-hidden bg-accent px-md py-3xl text-accent-foreground lg:px-xl lg:py-4xl"
    >
      <div className="mx-auto max-w-5xl space-y-3xl">
        <Reveal className="mx-auto max-w-xl space-y-sm text-center">
          <Typography variant="overline" as="p">
            {journey?.eyebrow}
          </Typography>
          <Typography variant="h2" id="founders-journey-heading" className="whitespace-pre-line text-accent-foreground">
            {journey?.title}
          </Typography>
          {journey?.description && (
            <Typography variant="body-sm" className="text-accent-foreground/90">
              {journey.description}
            </Typography>
          )}
        </Reveal>

        <JourneyTimeline milestones={milestones} />
      </div>
    </section>
  );
}
