import Image from "next/image";
import { Gift, Handshake, Heart, Megaphone, Package, UsersRound, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/common/reveal";
import { Typography } from "@/components/common/typography";
import { ImpactAction } from "@/features/donate/components/impact-action";
import { hotspotPosition, type ImpactIcon, type ImpactWays } from "@/lib/sanity/types";

const ICONS: Record<ImpactIcon, LucideIcon> = {
  volunteer: UsersRound,
  goods: Package,
  partner: Handshake,
  share: Megaphone,
  heart: Heart,
  gift: Gift,
};

/**
 * Stacked cards: all stick at the same offset, so while scrolling each new card
 * slides up and completely covers the previous one (no edges peeking out).
 * Content: Sanity → Four Ways (Donate page).
 */
export function ImpactWaysSection({ content }: { content: ImpactWays | null }) {
  const cards = content?.cards ?? [];
  if (!content || cards.length === 0) return null;

  return (
    <section aria-labelledby="impact-ways-heading" className="bg-background px-md pb-4xl lg:px-xl lg:pb-5xl">
      <div className="mx-auto max-w-6xl space-y-2xl">
        <Reveal className="mx-auto max-w-md space-y-sm text-center">
          <Typography variant="overline" as="p">
            {content.eyebrow}
          </Typography>
          <Typography variant="h2" id="impact-ways-heading" className="whitespace-pre-line">
            {content.title}
          </Typography>
          {content.description && (
            <Typography variant="body-sm" className="text-muted-foreground">
              {content.description}
            </Typography>
          )}
        </Reveal>

        <ol className="space-y-md">
          {cards.map((card) => {
            const Icon = ICONS[card.icon] ?? Heart;
            return (
              <li key={card._key} className="sticky top-3xl lg:top-4xl">
                <article className="group relative isolate flex min-h-[22rem] items-end overflow-hidden border-4 border-background bg-ink shadow-modal sm:min-h-[26rem] lg:min-h-[28rem]">
                  {card.imageUrl && (
                    <Image
                      src={card.imageUrl}
                      alt={card.imageAlt ?? ""}
                      fill
                      sizes="(min-width: 1152px) 1152px, 100vw"
                      className="-z-10 object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      style={{ objectPosition: hotspotPosition(card.imageHotspot) }}
                    />
                  )}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/80 via-ink/45 to-transparent" aria-hidden="true" />

                  <div className="w-full max-w-md space-y-sm self-start p-lg lg:p-xl">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-foreground/20 text-ink-foreground backdrop-blur-sm">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <Typography variant="h2" as="h3" className="whitespace-pre-line text-ink-foreground">
                      {card.title}
                    </Typography>
                    <Typography variant="body-sm" className="text-ink-foreground/85">
                      {card.description}
                    </Typography>
                    <div className="pt-xs">
                      <ImpactAction card={card} />
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
