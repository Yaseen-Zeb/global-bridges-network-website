import { Parallax } from "@/components/common/parallax";
import { Typography } from "@/components/common/typography";
import { HeroSlideshow } from "@/components/common/hero-slideshow";
import { ABOUT_HERO } from "@/features/about/data/about-content";

export function AboutHero() {
  return (
    <section aria-labelledby="about-hero-heading" className="relative isolate overflow-hidden bg-background">
      <div className="relative z-10 mx-auto max-w-3xl space-y-md px-md pt-2xl text-center lg:pt-3xl">
        <Typography variant="overline" as="p" className="animate-fade-up motion-safe-only" style={{ animationDelay: "150ms" }}>
          {ABOUT_HERO.eyebrow}
        </Typography>
        <Typography
          variant="h1"
          as="h1"
          id="about-hero-heading"
          className="animate-fade-up motion-safe-only"
          style={{ animationDelay: "300ms" }}
        >
          {ABOUT_HERO.title[0]}
          <br />
          {ABOUT_HERO.title[1]}
        </Typography>
        <Typography
          variant="body-sm"
          className="mx-auto max-w-2xl text-foreground/75 animate-fade-up motion-safe-only"
          style={{ animationDelay: "450ms" }}
        >
          {ABOUT_HERO.description}
        </Typography>
      </div>

      {/*
        Photos sit below the heading, tucking only slightly under the copy. They scroll slower than the
        page (parallax) and fade to white at both ends, so the Mission/Vision cards glide up over them.
      */}
      <div className="relative -mt-2xl h-[36rem] overflow-hidden sm:h-[42rem] lg:-mt-3xl lg:h-[52rem]">
        <Parallax speed={0.4} className="absolute inset-0">
          <HeroSlideshow images={ABOUT_HERO.images} />
        </Parallax>
        <div
          className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background via-background/60 to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background via-background/60 to-transparent"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
