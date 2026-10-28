import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/common/reveal";
import { Typography } from "@/components/common/typography";
import { FAQ } from "@/features/home/data/home-content";
import type { HomeFaq } from "@/lib/sanity/types";

/** Questions come from Sanity → FAQs with "Show on Home Page" turned on. */
export function FaqSection({ faqs }: { faqs: HomeFaq[] }) {
  if (faqs.length === 0) return null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <section aria-labelledby="faq-heading" className="bg-ink px-md pb-4xl pt-3xl text-ink-foreground lg:px-xl lg:pb-5xl lg:pt-4xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="mx-auto max-w-2xl space-y-2xl">
        <Reveal className="space-y-sm text-center">
          <Typography variant="overline" className="text-highlight" as="p">
            {FAQ.eyebrow}
          </Typography>
          <Typography variant="h2" id="faq-heading" className="text-ink-foreground">
            <span className="text-primary-light">{FAQ.highlight}</span>
            <br />
            {FAQ.title}
          </Typography>
        </Reveal>

        <Accordion type="single" defaultValue={faqs[0]._id} className="space-y-xl">
          {faqs.map((item, index) => (
            <Reveal key={item._id} delay={index * 80} className="faq-item-layer">
              <AccordionItem value={item._id} variant="dark">
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
