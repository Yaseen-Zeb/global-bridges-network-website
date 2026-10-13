import Image from "next/image";
import { Handshake, Megaphone, Package, UsersRound, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/common/reveal";
import { Typography } from "@/components/common/typography";
import { ImpactAction } from "@/features/donate/components/impact-action";
import { IMPACT_WAYS } from "@/features/donate/data/donate-content";

const ICONS: Record<(typeof IMPACT_WAYS.items)[number]["icon"], LucideIcon> = {
  volunteer: UsersRound,
  goods: Package,
  partner: Handshake,
  share: Megaphone,
};

/**
 * Stacked cards: all stick at the same offset, so while scrolling each new card
 * slides up and completely covers the previous one (no edges peeking out).
 */
export function ImpactWaysSection() {
  return (
    <section aria-labelledby="impact-ways-heading" className="bg-background px-md pb-4xl lg:px-xl lg:pb-5xl">
      <div className="mx-auto max-w-6xl space-y-2xl">
        <Reveal className="mx-auto max-w-md space-y-sm text-center">
          <Typography variant="eyebrow" as="p">
            {IMPACT_WAYS.eyebrow}
          </Typography>
          <Typography variant="title" id="impact-ways-heading" className="lg:text-4xl">
            {IMPACT_WAYS.title[0]}
            <br />
            {IMPACT_WAYS.title[1]}
          </Typography>
          <Typography variant="body-sm" className="text-muted-foreground">
            {IMPACT_WAYS.description}
          </Typography>
        </Reveal>

        <ol className="space-y-md">
          {IMPACT_WAYS.items.map((way) => {
            const Icon = ICONS[way.icon];
            return (
              <li key={way.icon} className="sticky top-3xl lg:top-4xl">
                <article className="group relative isolate flex min-h-[22rem] items-end overflow-hidden border-4 border-background bg-ink shadow-modal sm:min-h-[26rem] lg:min-h-[28rem]">
                  <Image
                    src={way.image.src}
                    alt={way.image.alt}
                    fill
                    sizes="(min-width: 1152px) 1152px, 100vw"
                    className="-z-10 object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/80 via-ink/45 to-transparent" aria-hidden="true" />

                  <div className="w-full max-w-md space-y-sm self-start p-lg lg:p-xl">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-foreground/20 text-ink-foreground backdrop-blur-sm">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <Typography variant="title" as="h3" className="text-ink-foreground lg:text-4xl">
                      {way.title[0]}
                      <br />
                      {way.title[1]}
                    </Typography>
                    <Typography variant="body-sm" className="text-ink-foreground/85">
                      {way.description}
                    </Typography>
                    <div className="pt-xs">
                      <ImpactAction {...way.action} />
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
