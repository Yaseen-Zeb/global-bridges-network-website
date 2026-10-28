import { Reveal } from "@/components/common/reveal";
import { Typography } from "@/components/common/typography";
import type { Statement } from "@/lib/sanity/types";

/**
 * Pulled up over the bottom of the About hero, so the white cards sit on the
 * photo and appear to rise over it as the (parallax) photo scrolls slower.
 * Content: Sanity → Mission & Vision.
 */
export function MissionVisionSection({ statements }: { statements: Statement[] }) {
  if (statements.length === 0) return null;

  return (
    <section
      aria-label="Our mission and vision"
      className="relative z-10 -mt-[18rem] px-md pb-4xl sm:-mt-[20rem] lg:-mt-[26rem] lg:px-xl lg:pb-5xl"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-md md:grid-cols-2 lg:gap-xl">
        {statements.map((item, index) => (
          <Reveal
            key={item.eyebrow}
            delay={index * 150}
            className="space-y-sm bg-background px-lg py-2xl text-center shadow-card lg:px-2xl"
          >
            <Typography variant="overline" as="p">
              {item.eyebrow}
            </Typography>
            <Typography variant="h3" as="h2" className="whitespace-pre-line">
              {item.title}
            </Typography>
            <Typography variant="body-sm" className="mx-auto max-w-md text-muted-foreground">
              {item.description}
            </Typography>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
