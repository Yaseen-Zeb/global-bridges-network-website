import * as React from "react";
import Image from "next/image";
import { ButtonLink } from "@/components/common/button-link";
import { Reveal } from "@/components/common/reveal";
import { Typography } from "@/components/common/typography";
import { CTA_LINKS } from "@/data/site";
import { cn } from "@/lib/utils";

interface CtaBannerProps {
  imageSrc: string;
  imageAlt: string;
  /** Background colour class for the top half, so the banner straddles two sections. */
  topClassName?: string;
  className?: string;
}

export function CtaBanner({ imageSrc, imageAlt, topClassName = "bg-ink", className }: CtaBannerProps) {
  return (
    <section aria-labelledby="cta-banner-heading" className={cn("relative bg-background px-md lg:px-xl", className)}>
      <div className={cn("absolute inset-x-0 top-0 h-1/2", topClassName)} aria-hidden="true" />

      <Reveal direction="up" className="relative mx-auto max-w-6xl">
        <div className="group relative overflow-hidden bg-primary shadow-banner">
          <div className="absolute inset-y-0 right-0 w-full overflow-hidden md:w-3/5">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(min-width: 768px) 60vw, 100vw"
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/70 to-primary/10" />
          </div>

          <div className="relative max-w-xl space-y-md px-lg py-2xl md:px-2xl">
            <Typography variant="eyebrow">Global Bridges Network</Typography>
            <Typography variant="title" id="cta-banner-heading" className="text-primary-foreground">
              Supporting People.
              <br />
              Strengthening Communities.
            </Typography>
            <Typography variant="body" className="max-w-sm text-primary-foreground/90">
              Together, we connect people with the support, resources, and opportunities they need to build stronger
              futures.
            </Typography>
            <div className="flex flex-wrap gap-sm pt-sm">
              <ButtonLink href={CTA_LINKS.getInvolved.href} variant="light" size="lg">
                {CTA_LINKS.getInvolved.label}
              </ButtonLink>
              <ButtonLink href={CTA_LINKS.findSupport.href} variant="light-accent" size="lg">
                {CTA_LINKS.findSupport.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
