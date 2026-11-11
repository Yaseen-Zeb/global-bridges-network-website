import { Reveal } from "@/components/common/reveal";
import { Typography } from "@/components/common/typography";
import { HIRING_STEPS } from "@/features/careers/data/careers-content";

export function HiringStepsSection() {
  return (
    <section aria-labelledby="hiring-steps-heading" className="bg-background px-md pb-3xl lg:px-xl lg:pb-4xl">
      <div className="mx-auto max-w-6xl space-y-2xl">
        <div className="flex flex-col gap-md md:flex-row md:items-end md:justify-between">
          <Reveal direction="left" className="space-y-xs">
            <Typography variant="overline" as="p">
              {HIRING_STEPS.eyebrow}
            </Typography>
            <Typography variant="h2" id="hiring-steps-heading" className="whitespace-pre-line">
              {HIRING_STEPS.title}
            </Typography>
          </Reveal>
          <Reveal direction="right" delay={150} className="md:max-w-xs">
            <Typography variant="body-sm" className="text-muted-foreground md:text-right">
              {HIRING_STEPS.description}
            </Typography>
          </Reveal>
        </div>

        <ol className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-4">
          {HIRING_STEPS.steps.map((step, index) => (
            <li key={step.title}>
              <Reveal delay={index * 120} className="h-full space-y-sm bg-surface p-lg">
                <span className="block font-heading text-h3 font-bold text-primary" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Typography variant="h4-semibold" as="h3">
                  {step.title}
                </Typography>
                <Typography variant="caption" as="p">
                  {step.description}
                </Typography>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
