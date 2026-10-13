import { Reveal } from "@/components/common/reveal";
import { Typography } from "@/components/common/typography";
import { JourneyTimeline } from "@/features/about/components/journey-timeline";
import { FOUNDERS_JOURNEY } from "@/features/about/data/about-content";

export function FoundersJourneySection() {
  return (
    <section
      aria-labelledby="founders-journey-heading"
      className="overflow-hidden bg-accent px-md py-3xl text-accent-foreground lg:px-xl lg:py-4xl"
    >
      <div className="mx-auto max-w-5xl space-y-3xl">
        <Reveal className="mx-auto max-w-xl space-y-sm text-center">
          <Typography variant="overline" as="p">
            {FOUNDERS_JOURNEY.eyebrow}
          </Typography>
          <Typography variant="h2" id="founders-journey-heading" className="text-accent-foreground">
            {FOUNDERS_JOURNEY.title[0]}
            <br />
            {FOUNDERS_JOURNEY.title[1]}
          </Typography>
          <Typography variant="body-sm" className="text-accent-foreground/90">
            {FOUNDERS_JOURNEY.description}
          </Typography>
        </Reveal>

        <JourneyTimeline milestones={FOUNDERS_JOURNEY.milestones} />
      </div>
    </section>
  );
}
