import { Reveal } from "@/components/common/reveal";
import { Typography } from "@/components/common/typography";
import { APPROACH } from "@/features/services/data/services-content";

export function ApproachSection() {
  return (
    <section
      aria-labelledby="approach-heading"
      className="bg-ink px-md pb-4xl pt-3xl text-ink-foreground lg:px-xl lg:pb-5xl lg:pt-4xl"
    >
      <div className="mx-auto max-w-6xl space-y-2xl">
        <div className="flex flex-col gap-md md:flex-row md:items-end md:justify-between">
          <Reveal direction="left" className="space-y-xs">
            <Typography variant="eyebrow" as="p">
              {APPROACH.eyebrow}
            </Typography>
            <Typography variant="title" id="approach-heading" className="text-ink-foreground lg:text-4xl">
              {APPROACH.title[0]}
              <br />
              {APPROACH.title[1]}
            </Typography>
          </Reveal>
          <Reveal direction="right" delay={150} className="md:max-w-md">
            <Typography variant="body-sm" className="text-ink-muted md:text-right">
              {APPROACH.description}
            </Typography>
          </Reveal>
        </div>

        <ul className="grid grid-cols-1 gap-md md:grid-cols-3">
          {APPROACH.items.map((item, index) => (
            <li key={item.title.join(" ")}>
              <Reveal
                delay={index * 120}
                className="h-full space-y-sm bg-ink-foreground/10 p-lg transition-colors duration-500 hover:bg-primary"
              >
                <Typography variant="card-title" className="font-semibold text-ink-foreground">
                  {item.title[0]}
                  <br />
                  {item.title[1]}
                </Typography>
                <Typography variant="caption" as="p" className="font-normal leading-5 text-ink-foreground/80">
                  {item.description}
                </Typography>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
