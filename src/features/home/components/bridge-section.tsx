import { Reveal } from "@/components/common/reveal";
import { Typography } from "@/components/common/typography";
import { BridgeSteps } from "@/features/home/components/bridge-steps";
import { BRIDGE } from "@/features/home/data/home-content";

export function BridgeSection() {
  return (
    <section aria-labelledby="bridge-heading" className="overflow-hidden bg-primary px-md py-3xl lg:px-xl lg:py-4xl">
      <div className="mx-auto max-w-6xl space-y-2xl">
        <div className="flex flex-col gap-lg md:flex-row md:items-end md:justify-between">
          <Reveal direction="left" className="space-y-sm">
            <Typography variant="eyebrow" as="p">
              {BRIDGE.eyebrow}
            </Typography>
            <Typography variant="title" id="bridge-heading" className="text-primary-foreground lg:text-4xl">
              {BRIDGE.title[0]}
              <br />
              {BRIDGE.title[1]}
            </Typography>
          </Reveal>
          <Reveal direction="right" delay={150} className="md:max-w-sm">
            <Typography variant="body-sm" className="text-primary-foreground/90 md:text-right">
              {BRIDGE.description}
            </Typography>
          </Reveal>
        </div>

        <BridgeSteps steps={BRIDGE.steps} />
      </div>
    </section>
  );
}
