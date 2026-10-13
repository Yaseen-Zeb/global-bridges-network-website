import Image from "next/image";
import { ButtonLink } from "@/components/common/button-link";
import { Reveal } from "@/components/common/reveal";
import { Typography } from "@/components/common/typography";
import { CTA_LINKS } from "@/data/site";
import { HELP_PATHS } from "@/features/home/data/home-content";
import { cn } from "@/lib/utils";

export function HelpPathsSection() {
  return (
    <section aria-label="How we can work together" className="flex flex-col bg-ink md:flex-row">
      {HELP_PATHS.map((path, index) => {
        const cta = CTA_LINKS[path.cta];
        const alignRight = path.align === "right";
        return (
          <article
            key={path.title}
            className={cn(
              "group relative flex min-h-[32rem] items-end overflow-hidden lg:min-h-[40rem]",
              // Hovered (or keyboard-focused) panel widens to ~2/3 while its sibling shrinks.
              "md:flex-1 md:transition-[flex-grow] md:duration-700 md:ease-in-out md:hover:flex-[2] md:focus-within:flex-[2]",
              index > 0 && "md:border-l md:border-ink-foreground/60"
            )}
          >
            <Image
              src={path.image.src}
              alt={path.image.alt}
              fill
              sizes="(min-width: 768px) 67vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" aria-hidden="true" />

            <Reveal
              direction={alignRight ? "right" : "left"}
              delay={index * 150}
              className={cn(
                "relative w-full space-y-sm p-lg lg:p-xl",
                alignRight ? "flex flex-col items-end text-right" : "flex flex-col items-start"
              )}
            >
              <Typography variant="h3" className="text-ink-foreground">
                {path.title}
              </Typography>
              <Typography variant="body" className="max-w-sm text-ink-foreground/85">
                {path.description}
              </Typography>
              <ButtonLink href={cta.href} variant="outline-light" className="mt-sm">
                {cta.label}
              </ButtonLink>
            </Reveal>
          </article>
        );
      })}
    </section>
  );
}
