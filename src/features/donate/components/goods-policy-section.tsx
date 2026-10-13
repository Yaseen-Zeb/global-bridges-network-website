import { CircleCheck, CircleX } from "lucide-react";
import { Reveal } from "@/components/common/reveal";
import { Typography } from "@/components/common/typography";
import { GOODS_POLICY } from "@/features/donate/data/donate-content";
import { cn } from "@/lib/utils";

const cards = [
  ...GOODS_POLICY.accepted.map((item) => ({ ...item, accepted: true })),
  ...GOODS_POLICY.rejected.map((item) => ({ ...item, accepted: false })),
];

export function GoodsPolicySection() {
  return (
    <section
      id="accepted-goods"
      aria-labelledby="goods-policy-heading"
      className="scroll-mt-3xl bg-muted px-md py-4xl lg:px-xl lg:py-5xl"
    >
      <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-sm sm:grid-cols-2 lg:grid-cols-4">
        {/* Intro occupies the first two cells of the grid on desktop, like the design. */}
        <li className="pb-lg sm:col-span-2 lg:pb-0 lg:pr-2xl">
          <Reveal direction="left" className="space-y-md">
            <Typography variant="eyebrow" as="p">
              {GOODS_POLICY.eyebrow}
            </Typography>
            <Typography variant="title" as="h2" id="goods-policy-heading" className="lg:text-4xl">
              What We Can <span className="text-accent">{GOODS_POLICY.accept}</span>
              <br />& What We <span className="text-danger">{GOODS_POLICY.cannotAccept}</span>
            </Typography>
            <Typography variant="body-sm" className="max-w-sm text-muted-foreground">
              {GOODS_POLICY.description}
            </Typography>
          </Reveal>
        </li>

        {cards.map((card, index) => {
          const Icon = card.accepted ? CircleCheck : CircleX;
          return (
            <li key={card.title}>
              <Reveal
                delay={(index % 4) * 80}
                className={cn(
                  "group h-full min-h-[14rem] space-y-sm border-2 bg-background p-lg transition-all duration-300 hover:-translate-y-xs hover:shadow-card",
                  card.accepted ? "border-accent/60 hover:border-accent" : "border-danger/60 hover:border-danger"
                )}
              >
                <div className="flex items-start justify-between gap-sm">
                  <Typography variant="card-title" as="h3" className="font-semibold">
                    {card.title}
                  </Typography>
                  <Icon
                    className={cn(
                      "h-5 w-5 shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                      card.accepted ? "text-accent" : "text-danger"
                    )}
                    aria-label={card.accepted ? "Accepted" : "Not accepted"}
                  />
                </div>
                <Typography variant="caption" as="p" className="font-normal leading-5">
                  {card.description}
                </Typography>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
