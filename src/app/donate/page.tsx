import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Typography } from "@/components/common/typography";
import { Button } from "@/components/ui/button";
import { DonationWidget } from "@/components/donate/donation-widget";
import {
  Heart,
  ShieldCheck,
  Lock,
  FileCheck,
  HelpCircle,
  Users,
  Mail,
  ArrowRight,
  Globe2,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Donate | Bridge Global Network",
  description:
    "Support Bridge Global Network with tax-deductible financial contributions to empower newly arrived refugees, immigrants, and overseas women leadership initiatives.",
  openGraph: {
    title: "Donate | Bridge Global Network",
    description:
      "Support Bridge Global Network with tax-deductible financial contributions.",
  },
};

// General Donation FAQs
const DONATION_FAQS = [
  {
    question: "Is my donation tax-deductible?",
    answer:
      "Yes. Bridge Global Network is a registered 501(c)(3) non-profit organization. Financial contributions are tax-deductible to the fullest extent permitted by law.",
  },
  {
    question: "Can I choose between a one-time and monthly recurring gift?",
    answer:
      "Yes. Our donation widget allows you to select either a one-time gift or a monthly recurring partnership to provide ongoing support for our programs.",
  },
  {
    question: "How are online donations processed securely?",
    answer:
      "Online donations are processed through accredited third-party payment platforms utilizing industry-standard 256-bit SSL encryption. We never store credit card details on our servers.",
  },
];

export default function DonatePage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* 1. HERO SECTION */}
      <section
        className="relative h-[380px] flex flex-col justify-center px-md lg:px-xl border-b border-border overflow-hidden"
        aria-label="Donation page banner"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1920&q=80&auto=format&fit=crop"
            alt="Donate Background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-background/75 dark:bg-background/75" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center space-y-md">
          <div className="inline-flex items-center gap-xs rounded-full bg-primary/20 px-md py-xs text-xs font-semibold text-primary backdrop-blur-md shadow-sm border border-primary/20">
            <Heart className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <span>Empower Communities Worldwide</span>
          </div>

          <Typography variant="h1" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground drop-shadow-sm">
            Support Bridge Global Network
          </Typography>

          <Typography variant="body" className="text-foreground/80 dark:text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Your generous financial contributions help us provide essential resettlement guidance, healthcare navigation, educational resources, and overseas women empowerment programs.
          </Typography>
        </div>
      </section>

      {/* 2. DONATION WIDGET AREA */}
      <section className="py-2xl px-md lg:px-xl border-b border-border" aria-labelledby="donation-widget-heading">
        <div className="mx-auto max-w-3xl space-y-md">
          <div className="text-center space-y-xs">
            <Typography variant="caption" className="text-primary font-semibold tracking-wider uppercase">
              Make a Gift
            </Typography>
            <Typography variant="h2" id="donation-widget-heading">
              Select Your Contribution
            </Typography>
          </div>

          {/* Reusable DonationWidget Component (Placeholder Abstraction) */}
          <DonationWidget provider="placeholder" defaultFrequency="one-time" />
        </div>
      </section>

      {/* 3. WHY DONATE SECTION */}
      <section className="py-2xl px-md lg:px-xl bg-muted/20 border-b border-border" aria-labelledby="why-donate-heading">
        <div className="mx-auto max-w-5xl space-y-xl">
          <div className="text-center max-w-2xl mx-auto space-y-xs">
            <Typography variant="caption" className="text-primary font-semibold tracking-wider uppercase">
              Your Impact
            </Typography>
            <Typography variant="h2" id="why-donate-heading">
              How Your Support Advances Our Mission
            </Typography>
            <Typography variant="body" className="text-muted-foreground">
              Financial gifts directly power essential services and sustainable community initiatives.
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            <article className="rounded-card border border-border bg-background p-lg shadow-card space-y-sm">
              <div className="w-10 h-10 rounded-button bg-primary/10 flex items-center justify-center text-primary">
                <Users className="h-5 w-5" aria-hidden="true" />
              </div>
              <Typography variant="h3" className="text-lg font-bold">
                Resettlement & Arrival Aid
              </Typography>
              <Typography variant="body-sm" className="text-muted-foreground leading-relaxed">
                Assisting newly arrived refugee and immigrant families with housing placement, basic setup, and neighborhood orientation.
              </Typography>
            </article>

            <article className="rounded-card border border-border bg-background p-lg shadow-card space-y-sm">
              <div className="w-10 h-10 rounded-button bg-primary/10 flex items-center justify-center text-primary">
                <FileCheck className="h-5 w-5" aria-hidden="true" />
              </div>
              <Typography variant="h3" className="text-lg font-bold">
                Health & Legal Navigation
              </Typography>
              <Typography variant="body-sm" className="text-muted-foreground leading-relaxed">
                Guiding clients through medical clinic systems, wellness resources, and connections to pro-bono legal assistance.
              </Typography>
            </article>

            <article className="rounded-card border border-border bg-background p-lg shadow-card space-y-sm">
              <div className="w-10 h-10 rounded-button bg-primary/10 flex items-center justify-center text-primary">
                <Globe2 className="h-5 w-5" aria-hidden="true" />
              </div>
              <Typography variant="h3" className="text-lg font-bold">
                Overseas Women Grants
              </Typography>
              <Typography variant="body-sm" className="text-muted-foreground leading-relaxed">
                Partnering with grassroots leaders overseas to support micro-grants, vocational training, and women&apos;s leadership programs.
              </Typography>
            </article>
          </div>
        </div>
      </section>

      {/* 4. TAX-DEDUCTIBILITY & 5. TRUST / TRANSPARENCY SECTIONS */}
      <section className="py-2xl px-md lg:px-xl border-b border-border" aria-labelledby="tax-trust-heading">
        <div className="mx-auto max-w-4xl space-y-lg">
          <div className="rounded-card border border-primary/20 bg-primary/5 p-lg sm:p-xl shadow-card space-y-md text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <ShieldCheck className="h-6 w-6" aria-hidden="true" />
            </div>

            <div className="space-y-xs">
              <Typography variant="h2" id="tax-trust-heading" className="text-2xl font-bold">
                Tax-Deductible 501(c)(3) Organization
              </Typography>
              <Typography variant="body" className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Bridge Global Network is a registered 501(c)(3) tax-exempt organization. Your contributions are tax-deductible to the extent permitted by law.
              </Typography>
            </div>

            {/* EIN Placeholder */}
            <div className="inline-block rounded-button bg-background border border-border px-md py-sm shadow-xs">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                Employer Identification Number (EIN)
              </span>
              <span className="text-base font-bold text-foreground font-mono mt-xs block">
                [EIN Pending Client Provision]
              </span>
            </div>
          </div>

          {/* 5. Trust & Transparency Callout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md pt-sm">
            <div className="rounded-card border border-border bg-background p-md shadow-card flex items-start gap-md">
              <Lock className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
              <div className="space-y-xs">
                <Typography variant="h3" className="text-base font-semibold">
                  Donor Privacy Protection
                </Typography>
                <Typography variant="body-sm" className="text-muted-foreground">
                  We respect your privacy. Donor information is never sold, traded, or shared with third parties.
                </Typography>
              </div>
            </div>

            <div className="rounded-card border border-border bg-background p-md shadow-card flex items-start gap-md">
              <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" aria-hidden="true" />
              <div className="space-y-xs">
                <Typography variant="h3" className="text-base font-semibold">
                  Responsible Stewardship
                </Typography>
                <Typography variant="body-sm" className="text-muted-foreground">
                  Committed to financial accountability and maximizing the impact of every donated dollar.
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ PREVIEW */}
      <section className="py-2xl px-md lg:px-xl bg-muted/20 border-b border-border" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-4xl space-y-xl">
          <div className="text-center max-w-2xl mx-auto space-y-xs">
            <Typography variant="caption" className="text-primary font-semibold tracking-wider uppercase">
              Questions & Answers
            </Typography>
            <Typography variant="h2" id="faq-heading">
              Frequently Asked Questions
            </Typography>
          </div>

          <div className="space-y-md">
            {DONATION_FAQS.map((faq, index) => (
              <article
                key={index}
                className="rounded-card border border-border bg-background p-lg shadow-card flex items-start gap-sm"
              >
                <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <div className="space-y-xs">
                  <Typography variant="h3" className="text-base font-semibold text-foreground leading-snug">
                    {faq.question}
                  </Typography>
                  <Typography variant="body-sm" className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </Typography>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="py-2xl px-md lg:py-3xl lg:px-xl bg-primary text-primary-foreground" aria-labelledby="donate-cta-heading">
        <div className="mx-auto max-w-4xl text-center space-y-md">
          <Typography variant="h2" id="donate-cta-heading" className="text-3xl sm:text-4xl text-primary-foreground font-bold">
            Explore More Ways to Support
          </Typography>
          <Typography variant="body" className="text-primary-foreground/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Beyond financial contributions, you can support our mission by donating essential goods, volunteering, or contacting our team.
          </Typography>

          <div className="flex flex-wrap justify-center gap-md pt-md">
            <Link href="/get-involved" aria-label="Learn about practical ways to get involved">
              <Button size="lg" variant="secondary">
                <Users className="mr-xs h-4 w-4" aria-hidden="true" />
                Get Involved
              </Button>
            </Link>
            <Link href="/contact" aria-label="Contact Bridge Global Network team">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary dark:bg-transparent dark:text-primary-foreground dark:border-primary-foreground/40 dark:hover:bg-primary-foreground dark:hover:text-primary font-semibold"
              >
                <Mail className="mr-xs h-4 w-4" aria-hidden="true" />
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
