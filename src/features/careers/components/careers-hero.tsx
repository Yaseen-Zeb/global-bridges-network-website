import { HeroSlideshow } from "@/components/common/hero-slideshow";
import { Parallax } from "@/components/common/parallax";
import { MotionPauseButton, MotionPauseProvider } from "@/components/common/motion-pause";
import { Typography } from "@/components/common/typography";
import { CAREERS_HERO } from "@/features/careers/data/careers-content";

/** Same treatment as the Services hero: copy on white, panning cross-fade photos below with parallax. */
export function CareersHero() {
  return (
    <section aria-labelledby="careers-hero-heading" className="relative isolate overflow-hidden bg-background">
      <div className="relative z-10 mx-auto max-w-3xl space-y-md px-md pt-2xl text-center lg:pt-3xl">
        <Typography variant="overline" as="p" className="animate-fade-up motion-safe-only" style={{ animationDelay: "150ms" }}>
          {CAREERS_HERO.eyebrow}
        </Typography>
        <Typography
          variant="h1"
          as="h1"
          id="careers-hero-heading"
          className="animate-fade-up motion-safe-only"
          style={{ animationDelay: "300ms" }}
        >
          {CAREERS_HERO.title[0]}
          <br />
          {CAREERS_HERO.title[1]}
        </Typography>
        <Typography
          variant="body-sm"
          className="mx-auto max-w-xl text-foreground/75 animate-fade-up motion-safe-only"
          style={{ animationDelay: "450ms" }}
        >
          {CAREERS_HERO.description}
        </Typography>
      </div>

      <div className="relative -mt-xl h-[24rem] overflow-hidden sm:h-[30rem] lg:-mt-2xl lg:h-[36rem]">
        <MotionPauseProvider>
          <Parallax speed={0.3} className="absolute inset-0">
            <HeroSlideshow images={CAREERS_HERO.images} />
          </Parallax>
          <div
            className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background via-background/60 to-transparent"
            aria-hidden="true"
          />
          <MotionPauseButton label="background photos" className="absolute bottom-md right-md" />
        </MotionPauseProvider>
      </div>
    </section>
  );
}
