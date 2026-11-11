import Image from "next/image";
import { ButtonLink } from "@/components/common/button-link";
import { Reveal } from "@/components/common/reveal";
import { Typography } from "@/components/common/typography";
import { CAREERS_ABOUT } from "@/features/careers/data/careers-content";

export function CareersAboutSection() {
  return (
    <section aria-labelledby="careers-about-heading" className="bg-background px-md py-3xl lg:px-xl lg:py-4xl">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-xl md:grid-cols-2 lg:gap-2xl">
        <Reveal direction="left" className="space-y-md">
          <Typography variant="overline" as="p">
            {CAREERS_ABOUT.eyebrow}
          </Typography>
          <Typography variant="h2" id="careers-about-heading">
            {CAREERS_ABOUT.title}
          </Typography>
          <Typography variant="body-sm" className="text-muted-foreground">
            {CAREERS_ABOUT.description}
          </Typography>
          <div className="pt-xs">
            <ButtonLink href={CAREERS_ABOUT.link.href} variant="primary">
              {CAREERS_ABOUT.link.label}
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal direction="zoom" delay={150} className="group relative aspect-[6/5] overflow-hidden">
          <Image
            src={CAREERS_ABOUT.image.src}
            alt={CAREERS_ABOUT.image.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Reveal>
      </div>
    </section>
  );
}
