import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/common/reveal";
import { Typography } from "@/components/common/typography";
import { CORE_VALUES } from "@/features/about/data/about-content";

export function CoreValuesSection() {
  return (
    <section aria-labelledby="core-values-heading" className="bg-background px-md pb-3xl lg:px-xl lg:pb-4xl">
      <div className="mx-auto max-w-6xl space-y-2xl">
        <div className="flex flex-col gap-md md:flex-row md:items-end md:justify-between">
          <Reveal direction="left" className="space-y-xs">
            <Typography variant="eyebrow" as="p">
              {CORE_VALUES.eyebrow}
            </Typography>
            <Typography variant="title" id="core-values-heading" className="lg:text-4xl">
              {CORE_VALUES.title}
            </Typography>
          </Reveal>
          <Reveal direction="right" delay={150} className="md:max-w-xs">
            <Typography variant="body-sm" className="text-muted-foreground md:text-right">
              {CORE_VALUES.description}
            </Typography>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 items-start gap-xl md:grid-cols-2 lg:gap-2xl">
          <Reveal direction="zoom" className="group relative aspect-[6/5] overflow-hidden">
            <Image
              src={CORE_VALUES.image.src}
              alt={CORE_VALUES.image.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-[center_60%] transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </Reveal>

          <Reveal direction="right" delay={150}>
            <Accordion type="single" defaultValue={CORE_VALUES.items[0].id} className="space-y-0">
              {CORE_VALUES.items.map((value) => (
                <AccordionItem key={value.id} value={value.id} variant="line">
                  <AccordionTrigger variant="line">{value.title}</AccordionTrigger>
                  <AccordionContent variant="line">{value.description}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
