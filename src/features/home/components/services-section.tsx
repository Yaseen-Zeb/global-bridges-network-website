import Image from "next/image";
import { Reveal } from "@/components/common/reveal";
import { Typography } from "@/components/common/typography";
import { SERVICES } from "@/features/home/data/home-content";
import { cn } from "@/lib/utils";

export function ServicesSection() {
  return (
    <section aria-labelledby="services-heading" className="bg-muted px-md py-3xl lg:px-xl lg:py-4xl">
      <div className="mx-auto max-w-6xl space-y-2xl">
        <Reveal className="mx-auto max-w-xl space-y-sm text-center">
          <Typography variant="eyebrow" as="p">
            {SERVICES.eyebrow}
          </Typography>
          <Typography variant="title" id="services-heading" className="lg:text-4xl">
            <span className="text-primary">{SERVICES.highlight}</span> {SERVICES.titleRest}
            <br />
            {SERVICES.titleLine2}
          </Typography>
          <Typography variant="body-sm" className="text-muted-foreground">
            {SERVICES.description}
          </Typography>
        </Reveal>

        <div>
          {SERVICES.items.map((service, index) => {
            const imageFirst = index % 2 === 1;
            return (
              <article key={service.index} className="grid grid-cols-1 md:grid-cols-2">
                <Reveal
                  direction={imageFirst ? "right" : "left"}
                  className={cn(
                    "flex items-center justify-center bg-background px-lg py-2xl text-center md:aspect-[31/23]",
                    imageFirst && "md:order-last"
                  )}
                >
                  <div className="max-w-xs space-y-sm">
                    <Typography variant="caption" as="p" className="uppercase tracking-widest">
                      {service.index}
                    </Typography>
                    <Typography variant="h3" className="font-semibold lg:text-3xl">
                      {service.title[0]}
                      <br />
                      {service.title[1]}
                    </Typography>
                    <Typography variant="caption" as="p" className="font-normal leading-5">
                      {service.description}
                    </Typography>
                  </div>
                </Reveal>

                <Reveal
                  direction="zoom"
                  delay={150}
                  className="group relative aspect-[31/23] overflow-hidden"
                >
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </Reveal>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
