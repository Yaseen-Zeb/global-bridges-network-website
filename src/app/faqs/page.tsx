import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { HelpCircle, Mail, MessageSquare, ArrowRight, Heart } from "lucide-react";
import { Typography } from "@/components/common/typography";
import { Button } from "@/components/ui/button";
import { CMS_FAQS } from "@/data/faqs";
import { FAQAccordionSection } from "@/components/faqs/faq-accordion-section";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Bridge Global Network",
  description:
    "Find answers to common questions about Bridge Global Network's services, refugee resettlement support, tax-deductible donations, goods intake, and volunteer opportunities.",
  openGraph: {
    title: "Frequently Asked Questions | Bridge Global Network",
    description:
      "Clear answers to questions regarding our refugee services, overseas women empowerment programs, financial giving, and goods donation guidelines.",
    url: "https://globalbridgesnetwork.org/faqs",
    type: "website",
  },
};

export default function FAQsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* 1. HERO SECTION */}
      <section
        className="relative h-[380px] flex flex-col justify-center px-md lg:px-xl border-b border-border overflow-hidden"
        aria-labelledby="faqs-hero-heading"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=1920&q=80&auto=format&fit=crop"
            alt="FAQs Background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-background/75 dark:bg-background/75" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center space-y-md">
          <div className="inline-flex items-center gap-xs rounded-full bg-primary/20 px-md py-xs text-xs font-semibold text-primary backdrop-blur-md shadow-sm border border-primary/20">
            <HelpCircle className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <span>Help &amp; Guidance</span>
          </div>

          <Typography
            variant="h1"
            id="faqs-hero-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground drop-shadow-sm"
          >
            Frequently Asked Questions
          </Typography>

          <Typography
            variant="body"
            className="text-foreground/80 dark:text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Find clear answers to common questions about our organization, service focus, financial donations, goods intake, and community volunteer opportunities.
          </Typography>
        </div>
      </section>

      {/* 2. ACCORDION & CATEGORIES SECTION */}
      <section className="py-2xl px-md lg:px-xl border-b border-border" aria-labelledby="accordion-section-heading">
        <div className="mx-auto max-w-5xl space-y-xl">
          <div className="text-center max-w-2xl mx-auto space-y-xs">
            <Typography variant="caption" className="text-primary font-semibold tracking-wider uppercase">
              Knowledge Base
            </Typography>
            <Typography variant="h2" id="accordion-section-heading" className="text-2xl sm:text-3xl font-bold">
              Explore Questions by Category
            </Typography>
          </div>

          {/* Accessible Accordion & Category Filter Component */}
          <FAQAccordionSection faqs={CMS_FAQS} />

          <div className="text-center text-xs text-muted-foreground italic pt-sm">
            * Note for Client: FAQs are managed in CMS dataset format (`CMS_FAQS`) across 5 categories (General, Services, Donations, Donate Goods, Get Involved).
          </div>
        </div>
      </section>

      {/* 3. CONTACT CTA SECTION */}
      <section className="py-2xl px-md lg:py-3xl lg:px-xl bg-muted/20 border-b border-border" aria-labelledby="contact-cta-heading">
        <div className="mx-auto max-w-4xl text-center space-y-md">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <MessageSquare className="h-6 w-6" aria-hidden="true" />
          </div>

          <Typography variant="caption" className="text-primary font-semibold tracking-wider uppercase">
            Still Have Questions?
          </Typography>
          <Typography variant="h2" id="contact-cta-heading" className="text-2xl sm:text-3xl font-bold">
            Didn&apos;t Find Your Answer?
          </Typography>

          <Typography variant="body" className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            If you have specific inquiries regarding our resettlement programs, partnership opportunities, or goods donation logistics, our team is happy to assist.
          </Typography>

          <div className="flex flex-wrap gap-md justify-center pt-sm">
            <Link href="/get-involved" aria-label="Contact Bridge Global Network team">
              <Button size="lg" variant="primary">
                <Mail className="mr-xs h-4 w-4" aria-hidden="true" />
                Contact Our Team
              </Button>
            </Link>
            <Link href="/services" aria-label="Explore our service areas">
              <Button size="lg" variant="outline">
                Explore Service Areas <ArrowRight className="ml-xs h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FINAL MISSION CTA */}
      <section
        className="py-2xl px-md lg:py-3xl lg:px-xl bg-primary text-primary-foreground"
        aria-labelledby="faqs-final-cta-heading"
      >
        <div className="mx-auto max-w-4xl text-center space-y-md">
          <Typography
            variant="h2"
            id="faqs-final-cta-heading"
            className="text-3xl sm:text-4xl text-primary-foreground font-bold"
          >
            Support Bridge Global Network Today
          </Typography>
          <Typography
            variant="body"
            className="text-primary-foreground/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Your tax-deductible financial support and donated goods help arriving families settle with dignity and empower overseas women leaders.
          </Typography>

          <div className="flex flex-wrap gap-md justify-center pt-md">
            <Link href="/donate" aria-label="Donate financial support to Bridge Global Network">
              <Button size="lg" variant="secondary" className="px-xl">
                <Heart className="mr-xs h-4 w-4" aria-hidden="true" />
                Donate Now
              </Button>
            </Link>
            <Link href="/donate-goods" aria-label="Donate essential goods">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary dark:bg-transparent dark:text-primary-foreground dark:border-primary-foreground/40 dark:hover:bg-primary-foreground dark:hover:text-primary font-semibold"
              >
                Donate Goods
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
