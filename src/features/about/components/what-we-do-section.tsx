import { Reveal } from "@/components/common/reveal";
import { Typography } from "@/components/common/typography";
import { WHAT_WE_DO } from "@/features/about/data/about-content";
import { cn } from "@/lib/utils";

const LAYOUT_CLASSES = {
  featured: "sm:col-span-2 lg:col-span-1 lg:row-span-2",
  wide: "sm:col-span-2",
  default: "",
} as const;

export function WhatWeDoSection() {
  return (
    <section aria-labelledby="what-we-do-heading" className="bg-muted px-md py-3xl lg:px-xl lg:py-4xl">
      <div className="mx-auto max-w-6xl space-y-2xl">
        <Reveal className="mx-auto max-w-xl space-y-sm text-center">
          <Typography variant="eyebrow" as="p">
            {WHAT_WE_DO.eyebrow}
          </Typography>
          <Typography variant="title" id="what-we-do-heading" className="lg:text-4xl">
            <span className="text-primary">{WHAT_WE_DO.highlight}</span> {WHAT_WE_DO.titleRest}
            <br />
            {WHAT_WE_DO.titleLine2}
          </Typography>
          <Typography variant="body-sm" className="text-muted-foreground">
            {WHAT_WE_DO.description}
          </Typography>
        </Reveal>

        <ul className="grid grid-cols-1 gap-sm sm:grid-cols-2 lg:grid-cols-3">
          {WHAT_WE_DO.services.map((service, index) => {
            const featured = service.layout === "featured";
            return (
              <li key={service.title.join(" ")} className={LAYOUT_CLASSES[service.layout]}>
                <Reveal
                  delay={index * 80}
                  className={cn(
                    "group h-full space-y-sm p-lg transition-colors duration-500",
                    featured
                      ? "bg-primary text-primary-foreground"
                      : "bg-background hover:bg-primary hover:text-primary-foreground"
                  )}
                >
                  <Typography
                    variant="card-title"
                    className={cn(
                      "font-semibold transition-colors duration-500",
                      featured ? "text-primary-foreground" : "group-hover:text-primary-foreground"
                    )}
                  >
                    {service.title.map((line, i) => (
                      <span key={line} className={cn(featured && "block", !featured && i > 0 && "ml-xs")}>
                        {line}
                      </span>
                    ))}
                  </Typography>
                  <Typography
                    variant="caption"
                    as="p"
                    className={cn(
                      "max-w-sm font-normal leading-5 transition-colors duration-500",
                      featured ? "text-primary-foreground/90" : "group-hover:text-primary-foreground/90"
                    )}
                  >
                    {service.description}
                  </Typography>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
