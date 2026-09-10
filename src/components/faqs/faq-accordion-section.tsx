"use client";

import * as React from "react";
import { FAQItem } from "@/lib/sanity/types";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Typography } from "@/components/common/typography";

export interface FAQAccordionSectionProps {
  faqs: FAQItem[];
}

const CATEGORY_TABS = [
  { id: "all", label: "All Questions" },
  { id: "general", label: "General" },
  { id: "services", label: "Services" },
  { id: "donations", label: "Financial Giving" },
  { id: "donate-goods", label: "Donate Goods" },
  { id: "get-involved", label: "Get Involved" },
];

export function FAQAccordionSection({ faqs }: FAQAccordionSectionProps) {
  const [activeCategory, setActiveCategory] = React.useState("all");

  const filteredFaqs = React.useMemo(() => {
    if (activeCategory === "all") return faqs;
    return faqs.filter((item) => item.category === activeCategory);
  }, [faqs, activeCategory]);

  // Construct authentic FAQPage JSON-LD schema for visible content
  const schemaData = React.useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: filteredFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };
  }, [filteredFaqs]);

  return (
    <div className="space-y-xl">
      {/* Authentic FAQPage JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Category Filter Tabs */}
      <div
        role="tablist"
        aria-label="Filter questions by category"
        className="flex flex-wrap items-center justify-center gap-xs sm:gap-sm p-xs rounded-card bg-muted/60 border border-border max-w-4xl mx-auto"
      >
        {CATEGORY_TABS.map((tab) => {
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-md py-xs rounded-button text-xs sm:text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 select-none ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/80"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Accessible Accordion Component */}
      <div className="max-w-4xl mx-auto">
        {filteredFaqs.length > 0 ? (
          <Accordion type="single" defaultValue={filteredFaqs[0]?._id}>
            {filteredFaqs.map((faq) => (
              <AccordionItem key={faq._id} value={faq._id}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  <Typography variant="body-sm" className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </Typography>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-2xl rounded-card border border-border bg-background p-lg space-y-xs">
            <Typography variant="h3" className="text-lg font-semibold text-foreground">
              No Questions Found
            </Typography>
            <Typography variant="body-sm" className="text-muted-foreground">
              There are currently no FAQs published under this category.
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}
