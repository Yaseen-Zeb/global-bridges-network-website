import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/common/reveal";
import { Typography } from "@/components/common/typography";
import { SERVICE_AREAS } from "@/features/services/data/services-content";

export function ServiceAreasSection() {
  return (
    <section aria-labelledby="service-areas-heading" className="bg-background px-md py-4xl lg:px-xl lg:py-5xl">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-2xl lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-3xl">
        {/* Intro stays pinned while the service list scrolls past on desktop. */}
        <div className="lg:sticky lg:top-3xl lg:self-start">
          <Reveal direction="left" className="space-y-sm">
            <Typography variant="overline" as="p">
              {SERVICE_AREAS.eyebrow}
            </Typography>
            <Typography variant="h2" id="service-areas-heading">
              {SERVICE_AREAS.title[0]}
              <br />
              {SERVICE_AREAS.title[1]}
            </Typography>
            <Typography variant="body-sm" className="text-muted-foreground">
              {SERVICE_AREAS.description}
            </Typography>
          </Reveal>
        </div>

        <ul className="space-y-md">
          {SERVICE_AREAS.items.map((area) => (
            <li key={area.title}>
              <article className="grid grid-cols-1 items-center gap-lg sm:grid-cols-[14rem_1fr] lg:gap-xl">
                <Reveal direction="zoom" className="group mx-auto w-full max-w-[14rem] bg-background p-xs shadow-modal">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={area.image.src}
                      alt={area.image.alt}
                      fill
                      sizes="14rem"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{ objectPosition: area.image.position }}
                    />
                  </div>
                </Reveal>

                <Reveal direction="right" delay={120} className="max-w-sm space-y-sm">
                  <Typography variant="h4-semibold">
                    {area.title}
                  </Typography>
                  <Typography variant="caption" as="p">
                    {area.description}
                  </Typography>
                  <Link
                    href={area.link.href}
                    className="group/link inline-flex items-center gap-xs text-body-sm font-semibold text-accent transition-colors hover:text-accent/80"
                  >
                    {area.link.label}
                    <ArrowRight
                      className="h-4 w-4 -translate-x-xs opacity-0 transition-all duration-300 group-hover/link:translate-x-0 group-hover/link:opacity-100"
                      aria-hidden="true"
                    />
                  </Link>
                </Reveal>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
