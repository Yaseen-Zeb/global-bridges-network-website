import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/common/reveal";
import { Typography } from "@/components/common/typography";
import { FAQ } from "@/features/home/data/home-content";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export function FaqSection() {
  return (
    <section aria-labelledby="faq-heading" className="bg-ink px-md pb-4xl pt-3xl text-ink-foreground lg:px-xl lg:pb-5xl lg:pt-4xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="mx-auto max-w-2xl space-y-2xl">
        <Reveal className="space-y-sm text-center">
          <Typography variant="eyebrow" as="p">
            {FAQ.eyebrow}
          </Typography>
          <Typography variant="title" id="faq-heading" className="text-ink-foreground lg:text-4xl">
            <span className="text-primary">{FAQ.highlight}</span>
            <br />
            {FAQ.title}
          </Typography>
        </Reveal>

        <Accordion type="single" defaultValue={FAQ.items[0].id} className="space-y-xl">
          {FAQ.items.map((item, index) => (
            <Reveal key={item.id} delay={index * 80} className="faq-item-layer">
              <AccordionItem value={item.id} variant="dark">
                <AccordionTrigger variant="dark">{item.question}</AccordionTrigger>
                <AccordionContent variant="dark">{item.answer}</AccordionContent>
              </AccordionItem>
            </Reveal>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
