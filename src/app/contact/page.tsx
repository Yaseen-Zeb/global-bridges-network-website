import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  MapPin,
  PhoneCall,
  Clock,
  MessageSquare,
  ShieldCheck,
  Heart,
  Package,
  ArrowRight,
} from "lucide-react";
import { Typography } from "@/components/common/typography";
import { Button } from "@/components/ui/button";
import { client } from "@/lib/sanity/client";
import { CONTACT_INFO_QUERY } from "@/lib/sanity/queries";
import type { ContactInfo as ContactInfoType } from "@/lib/sanity/types";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact Us | Bridge Global Network",
  description:
    "Get in touch with Bridge Global Network. Submit general inquiries, request help, inquire about services, donate goods, or explore volunteer and partnership opportunities.",
  openGraph: {
    title: "Contact Us | Bridge Global Network",
    description:
      "Reach out to Bridge Global Network via our unified inquiry form or contact our administrative team for refugee support, goods donations, or partnerships.",
    url: "https://globalbridgesnetwork.org/contact",
    type: "website",
  },
};

export default async function ContactPage() {
  const contactInfo: ContactInfoType = await client.fetch(CONTACT_INFO_QUERY);
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* 1. HERO SECTION */}
      <section
        className="relative h-[380px] flex flex-col justify-center px-md lg:px-xl border-b border-border overflow-hidden"
        aria-labelledby="contact-hero-heading"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80&auto=format&fit=crop"
            alt="Contact Background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-background/75 dark:bg-background/75" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center space-y-md">
          <div className="inline-flex items-center gap-xs rounded-full bg-primary/20 px-md py-xs text-xs font-semibold text-primary backdrop-blur-md shadow-sm border border-primary/20">
            <Mail className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <span>Get in Touch</span>
          </div>

          <Typography
            variant="h1"
            id="contact-hero-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground drop-shadow-sm"
          >
            Contact Us
          </Typography>

          <Typography
            variant="body"
            className="text-foreground/80 dark:text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Whether you are looking for assistance, interested in volunteering, or representing a partner organization, we would love to hear from you.
          </Typography>
        </div>
      </section>

      {/* 2. CONFIG-DRIVEN CONTACT INFO CARDS & INQUIRY FORM */}
      <section className="py-2xl px-md lg:px-xl border-b border-border" aria-labelledby="contact-main-heading">
        <div className="mx-auto max-w-7xl space-y-xl">
          <div className="text-center max-w-2xl mx-auto space-y-xs">
            <Typography variant="caption" className="text-primary font-semibold tracking-wider uppercase">
              Direct Communication
            </Typography>
            <Typography variant="h2" id="contact-main-heading" className="text-2xl sm:text-3xl font-bold">
              Reach Our Administrative Team
            </Typography>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
            {/* Contact Information Cards Column (5 Cols) */}
            <div className="lg:col-span-5 space-y-md">
              {/* Registered Address */}
              <article className="rounded-card border border-border bg-background p-lg shadow-card flex items-start gap-md">
                <MapPin className="h-6 w-6 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <div className="space-y-xs">
                  <Typography variant="h3" className="text-base font-semibold">
                    Registered Office & Administration
                  </Typography>
                  <Typography variant="body-sm" className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {contactInfo?.address || "Address details upon inquiry response."}
                  </Typography>
                </div>
              </article>

              {/* Shared Email */}
              <article className="rounded-card border border-border bg-background p-lg shadow-card flex items-start gap-md">
                <Mail className="h-6 w-6 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <div className="space-y-xs">
                  <Typography variant="h3" className="text-base font-semibold">
                    Shared Email Inbox
                  </Typography>
                  <a
                    href={`mailto:${contactInfo?.email}`}
                    className="text-sm font-semibold text-primary hover:underline block"
                  >
                    {contactInfo?.email || "info@globalbridgesnetwork.org"}
                  </a>
                  <Typography variant="body-sm" className="text-muted-foreground leading-relaxed">
                    Monitored daily by our administrative team. Response time is typically 1-2 business days.
                  </Typography>
                </div>
              </article>

              {/* Phone & Office Hours */}
              <article className="rounded-card border border-border bg-background p-lg shadow-card flex items-start gap-md">
                <PhoneCall className="h-6 w-6 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <div className="space-y-xs">
                  <Typography variant="h3" className="text-base font-semibold">
                    Administrative & Support Inquiries
                  </Typography>
                  <Typography variant="body-sm" className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {contactInfo?.phone || "Inquiries monitored via shared email inbox"}
                  </Typography>
                  <div className="flex items-center gap-xs pt-xs text-xs text-muted-foreground font-medium">
                    <Clock className="h-3.5 w-3.5 text-primary shrink-0" aria-hidden="true" />
                    <span>{contactInfo?.officeHours || "Monday - Friday: 9:00 AM - 5:00 PM (EST)"}</span>
                  </div>
                </div>
              </article>
            </div>

            {/* Unified Inquiry Form Column (7 Cols) */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* 3. DIRECT PATHWAYS & QUICK ACTIONS */}
      <section className="py-2xl px-md lg:px-xl bg-muted/20 border-b border-border" aria-labelledby="direct-pathways-heading">
        <div className="mx-auto max-w-6xl space-y-xl">
          <div className="text-center max-w-2xl mx-auto space-y-xs">
            <Typography variant="caption" className="text-primary font-semibold tracking-wider uppercase">
              Quick Pathways
            </Typography>
            <Typography variant="h2" id="direct-pathways-heading" className="text-2xl sm:text-3xl font-bold">
              Looking for Something Specific?
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            <article className="rounded-card border border-border bg-background p-lg shadow-card flex flex-col justify-between space-y-md">
              <div className="space-y-sm">
                <Typography variant="h3" className="text-lg font-bold text-foreground">
                  Our Service Areas
                </Typography>
                <Typography variant="body-sm" className="text-muted-foreground leading-relaxed">
                  Explore our six primary focus areas including resettlement aid, health, legal guidance, and overseas women empowerment.
                </Typography>
              </div>
              <Link href="/services">
                <Button variant="outline" className="w-full">
                  Explore Services <ArrowRight className="ml-xs h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
            </article>

            <article className="rounded-card border border-border bg-background p-lg shadow-card flex flex-col justify-between space-y-md">
              <div className="space-y-sm">
                <Typography variant="h3" className="text-lg font-bold text-foreground">
                  Donate Essential Goods
                </Typography>
                <Typography variant="body-sm" className="text-muted-foreground leading-relaxed">
                  Review our current needs list and submit an offer for essential cookware, winter coats, or school backpacks.
                </Typography>
              </div>
              <Link href="/donate-goods">
                <Button variant="outline" className="w-full">
                  <Package className="mr-xs h-4 w-4 text-primary" aria-hidden="true" />
                  Donate Goods
                </Button>
              </Link>
            </article>

            <article className="rounded-card border border-border bg-background p-lg shadow-card flex flex-col justify-between space-y-md">
              <div className="space-y-sm">
                <Typography variant="h3" className="text-lg font-bold text-foreground">
                  Financial Giving
                </Typography>
                <Typography variant="body-sm" className="text-muted-foreground leading-relaxed">
                  Make a financial contribution to advance emergency family assistance and overseas micro-grants.
                </Typography>
              </div>
              <Link href="/donate">
                <Button variant="primary" className="w-full">
                  <Heart className="mr-xs h-4 w-4" aria-hidden="true" />
                  Donate Funds
                </Button>
              </Link>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
