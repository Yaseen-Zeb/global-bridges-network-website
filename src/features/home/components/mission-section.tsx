import Image from "next/image";
import { Reveal } from "@/components/common/reveal";
import { Typography } from "@/components/common/typography";
import { MISSION } from "@/features/home/data/home-content";

type MissionCard = (typeof MISSION.cards)[number];

function MissionCardItem({ card, delay }: { card: MissionCard; delay: number }) {
  return (
    <Reveal delay={delay} className="group flex h-full flex-col border border-border bg-surface">
      <div className="relative aspect-[41/29] overflow-hidden">
        <Image
          src={card.image.src}
          alt={card.image.alt}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="flex-1 space-y-sm p-lg">
        <Typography variant="h4">{card.title}</Typography>
        <Typography variant="body-sm" className="text-muted-foreground">
          {card.description}
        </Typography>
      </div>
    </Reveal>
  );
}

export function MissionSection() {
  const [leftCard, rightCard] = MISSION.cards;

  return (
    <section aria-labelledby="mission-heading" className="bg-background px-md pb-3xl pt-3xl lg:px-xl lg:pb-4xl lg:pt-4xl">
      <div className="mx-auto max-w-6xl">
        {/* Blue mission card overlaps the image grid on desktop */}
        <Reveal direction="down" className="relative z-10 mx-auto bg-primary px-lg py-2xl text-center shadow-banner md:w-1/2 md:-mb-4xl">
          <div className="space-y-md">
            <Typography variant="overline" className="text-primary-foreground" as="p">
              {MISSION.eyebrow}
            </Typography>
            <Typography variant="h2" id="mission-heading" className="text-primary-foreground">
              {MISSION.title}
            </Typography>
            <Typography variant="body-sm" className="mx-auto max-w-md text-primary-foreground/90">
              {MISSION.description}
            </Typography>
          </div>
        </Reveal>

        <div className="mt-lg grid grid-cols-1 gap-xs md:mt-0 md:grid-cols-3">
          <MissionCardItem card={leftCard} delay={100} />

          <Reveal delay={200} direction="zoom" className="group relative min-h-[24rem] overflow-hidden">
            <Image
              src={MISSION.featureImage.src}
              alt={MISSION.featureImage.alt}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </Reveal>

          <MissionCardItem card={rightCard} delay={300} />
        </div>
      </div>
    </section>
  );
}
