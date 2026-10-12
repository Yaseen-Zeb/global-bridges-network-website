import { ButtonLink } from "@/components/common/button-link";
import { Typography } from "@/components/common/typography";
import { CTA_LINKS } from "@/data/site";
import { HeroMarquee } from "@/features/home/components/hero-marquee";
import { HERO } from "@/features/home/data/home-content";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[calc(100svh-4rem)] items-center justify-center overflow-hidden bg-ink lg:min-h-[calc(100svh-5rem)]"
    >
      <div className="absolute inset-0 -z-10">
        <HeroMarquee panels={HERO.panels} />
        <div className="absolute inset-0 bg-ink/60" aria-hidden="true" />
      </div>

      <div className="mx-auto max-w-4xl space-y-lg px-md py-4xl text-center">
        <Typography variant="eyebrow" as="p" className="animate-fade-up motion-safe-only" style={{ animationDelay: "300ms" }}>
          {HERO.eyebrow}
        </Typography>

        <Typography
          variant="display"
          id="hero-heading"
          className="text-ink-foreground animate-fade-up motion-safe-only"
          style={{ animationDelay: "450ms" }}
        >
          <span className="text-primary">{HERO.highlight}</span> {HERO.titleRest}
          <br />
          {HERO.titleLine2}
        </Typography>

        <Typography
          variant="body"
          className="mx-auto max-w-2xl text-ink-foreground/90 sm:text-lg animate-fade-up motion-safe-only"
          style={{ animationDelay: "600ms" }}
        >
          {HERO.description}
        </Typography>

        <div
          className="flex flex-wrap justify-center gap-sm pt-sm animate-fade-up motion-safe-only"
          style={{ animationDelay: "750ms" }}
        >
          <ButtonLink href={CTA_LINKS.getInvolved.href} variant="primary" size="lg">
            {CTA_LINKS.getInvolved.label}
          </ButtonLink>
          <ButtonLink href={CTA_LINKS.findSupport.href} variant="accent" size="lg">
            {CTA_LINKS.findSupport.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
