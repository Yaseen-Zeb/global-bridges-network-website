import { Reveal } from "@/components/common/reveal";
import { Typography } from "@/components/common/typography";
import { JourneyTimeline } from "@/features/about/components/journey-timeline";
import { FOUNDERS_JOURNEY } from "@/features/about/data/about-content";
import type { Milestone } from "@/lib/sanity/types";

/** Milestones: Sanity → Founders Journey. Heading: about-content.ts. */
export function FoundersJourneySection({ milestones }: { milestones: Milestone[] }) {
  if (milestones.length === 0) return null;

  return (
    <section
      aria-labelledby="founders-journey-heading"
      className="overflow-hidden bg-accent px-md py-3xl text-accent-foreground lg:px-xl lg:py-4xl"
    >
      <div className="mx-auto max-w-5xl space-y-3xl">
        <Reveal className="mx-auto max-w-xl space-y-sm text-center">
          <Typography variant="overline" className="text-primary-foreground" as="p">
            {FOUNDERS_JOURNEY.eyebrow}
          </Typography>
          <Typography variant="h2" id="founders-journey-heading" className="whitespace-pre-line text-accent-foreground">
            {FOUNDERS_JOURNEY.title}
          </Typography>
          <Typography variant="body-sm" className="text-accent-foreground/90">
            {FOUNDERS_JOURNEY.description}
          </Typography>
        </Reveal>

        <JourneyTimeline milestones={milestones} />
      </div>
    </section>
  );
}
