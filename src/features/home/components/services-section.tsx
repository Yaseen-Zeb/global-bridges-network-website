import Image from "next/image";
import { Reveal } from "@/components/common/reveal";
import { Typography } from "@/components/common/typography";
import { ButtonLink } from "@/components/common/button-link";
import { SERVICES } from "@/features/home/data/home-content";
import { hotspotPosition, type Service } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

const ORDINALS = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];

/** The first four services from Sanity → Services, plus a link to the full list. */
export function ServicesSection({ services }: { services: Service[] }) {
  if (services.length === 0) return null;

  return (
    <section aria-labelledby="services-heading" className="bg-muted px-md py-3xl lg:px-xl lg:py-4xl">
      <div className="mx-auto max-w-6xl space-y-2xl">
        <Reveal className="mx-auto max-w-xl space-y-sm text-center">
          <Typography variant="overline" as="p">
            {SERVICES.eyebrow}
          </Typography>
          <Typography variant="h2" id="services-heading">
            <span className="text-primary">{SERVICES.highlight}</span> {SERVICES.titleRest}
            <br />
            {SERVICES.titleLine2}
          </Typography>
          <Typography variant="body-sm" className="text-muted-foreground">
            {SERVICES.description}
          </Typography>
        </Reveal>

        <div>
          {services.map((service, index) => {
            const imageFirst = index % 2 === 1;
            return (
              <article key={service._id} className="grid grid-cols-1 md:grid-cols-2">
                <Reveal
                  direction={imageFirst ? "right" : "left"}
                  className={cn(
                    "flex items-center justify-center bg-background px-lg py-2xl text-center md:aspect-[31/23]",
                    imageFirst && "md:order-last"
                  )}
                >
                  <div className="max-w-xs space-y-sm">
                    <Typography variant="caption" as="p" className="uppercase tracking-widest">
                      {ORDINALS[index] ?? index + 1}
                    </Typography>
                    <Typography variant="h3" className="mx-auto max-w-[12ch] text-balance">
                      {service.title}
                    </Typography>
                    <Typography variant="caption" as="p">
                      {service.description}
                    </Typography>
                  </div>
                </Reveal>

                <Reveal
                  direction="zoom"
                  delay={150}
                  className="group relative aspect-[31/23] overflow-hidden"
                >
                  {service.imageUrl && (
                    <Image
                      src={service.imageUrl}
                      alt={service.imageAlt ?? ""}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{ objectPosition: hotspotPosition(service.imageHotspot) }}
                    />
                  )}
                </Reveal>
              </article>
            );
          })}
        </div>

        <Reveal className="text-center">
          <ButtonLink href={SERVICES.seeMore.href} variant="primary" size="lg">
            {SERVICES.seeMore.label}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
