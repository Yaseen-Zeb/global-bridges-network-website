import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Typography } from "@/components/common/typography";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Building2,
  HeartPulse,
  Scale,
  Briefcase,
  GraduationCap,
  HeartHandshake,
  ArrowRight,
  Compass,
  CheckCircle2,
  Mail,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services | Bridge Global Network",
  description:
    "Explore Bridge Global Network's service areas including resettlement support, health navigation, legal guidance, employment readiness, education, and overseas women empowerment.",
  openGraph: {
    title: "Our Services | Bridge Global Network",
    description:
      "Connecting refugees and immigrants with essential resources while supporting overseas women empowerment programs.",
  },
};

// CMS Content Placeholder: Expandable Services Data Structure
const CMS_SERVICES = [
  {
    id: "resettlement",
    icon: Building2,
    title: "Resettlement Support",
    description:
      "Assisting newly arrived refugee and immigrant families with initial housing orientation, household essentials, and neighborhood navigation.",
    ctaText: "Inquire About Resettlement",
    href: "/contact?service=resettlement",
  },
  {
    id: "health",
    icon: HeartPulse,
    title: "Health Navigation",
    description:
      "Helping individuals navigate local healthcare systems, schedule medical appointments, access wellness resources, and understand health services.",
    ctaText: "Inquire About Health Support",
    href: "/contact?service=health",
  },
  {
    id: "legal",
    icon: Scale,
    title: "Legal Guidance",
    description:
      "Connecting clients with trusted legal aid resources, documentation assistance, and guidance through complex immigration processes.",
    ctaText: "Inquire About Legal Guidance",
    href: "/contact?service=legal",
  },
  {
    id: "employment",
    icon: Briefcase,
    title: "Employment Readiness",
    description:
      "Providing foundational job readiness support, resume preparation assistance, interview coaching, and career mentorship connections.",
    ctaText: "Inquire About Employment Help",
    href: "/contact?service=employment",
  },
  {
    id: "education",
    icon: GraduationCap,
    title: "Education & Literacy",
    description:
      "Facilitating English language practice opportunities, adult digital literacy workshops, and youth academic support connections.",
    ctaText: "Inquire About Education",
    href: "/contact?service=education",
  },
  {
    id: "women-empowerment",
    icon: HeartHandshake,
    title: "Women Empowerment",
    description:
      "Partnering with overseas grassroots initiatives to support women's leadership workshops, micro-grant programs, and vocational skill-building.",
    ctaText: "Inquire About Women's Programs",
    href: "/contact?service=women-empowerment",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* 1. HERO SECTION */}
      <section
        className="relative h-[380px] flex flex-col justify-center px-md lg:px-xl border-b border-border overflow-hidden"
        aria-label="Services banner"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80&auto=format&fit=crop"
            alt="Services Background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-background/75 dark:bg-background/75" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center space-y-md">
          <div className="inline-flex items-center gap-xs rounded-full bg-primary/20 px-md py-xs text-xs font-semibold text-primary backdrop-blur-md shadow-sm border border-primary/20">
            <Compass className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <span>Connecting Communities & Empowering Lives</span>
          </div>

          <Typography variant="h1" className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            Our Services
          </Typography>

          <Typography variant="body" className="text-foreground/80 dark:text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Bridge Global Network works to connect newly arrived refugees and immigrants with essential community resources, while supporting sustainable women empowerment initiatives overseas.
          </Typography>
        </div>
      </section>

      {/* 2. SERVICE OVERVIEW SECTION */}
      <section className="py-2xl px-md lg:px-xl border-b border-border" aria-labelledby="service-overview-heading">
        <div className="mx-auto max-w-6xl space-y-xl">
          <div className="text-center max-w-2xl mx-auto space-y-xs">
            <Typography variant="caption" className="text-primary font-semibold tracking-wider uppercase">
              Service Areas
            </Typography>
            <Typography variant="h2" id="service-overview-heading">
              How We Support Our Community
            </Typography>
            <Typography variant="body" className="text-muted-foreground">
              Explore our core focus areas designed to foster dignity, integration, and self-sufficiency.
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
            {CMS_SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.id}
                  className="rounded-card border border-border bg-background p-lg shadow-card flex flex-col justify-between space-y-md"
                >
                  <div className="space-y-sm">
                    <div className="w-10 h-10 rounded-button bg-primary/10 flex items-center justify-center text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <Typography variant="h3" className="text-xl font-bold">
                      {service.title}
                    </Typography>
                    <Typography variant="body-sm" className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </Typography>
                  </div>

                  <div className="pt-sm border-t border-border">
                    <Link
                      href={service.href}
                      className="inline-flex items-center text-xs font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-button"
                      aria-label={`${service.ctaText} for ${service.title}`}
                    >
                      {service.ctaText} <ArrowRight className="ml-xs h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>


        </div>
      </section>

      {/* 3. HOW WE HELP SECTION */}
      <section className="py-2xl px-md lg:px-xl bg-muted/20 border-b border-border" aria-labelledby="how-we-help-heading">
        <div className="mx-auto max-w-5xl space-y-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-center">
            <div className="lg:col-span-6 space-y-md">
              <Typography variant="caption" className="text-primary font-semibold tracking-wider uppercase">
                Our Approach
              </Typography>
              <Typography variant="h2" id="how-we-help-heading">
                Resource Navigation & Community Referral
              </Typography>
              <Typography variant="body" className="text-muted-foreground leading-relaxed">
                Navigating new systems requires trusted guidance. Our work focuses on acting as a compassionate bridge—connecting individuals and families with appropriate legal aid, healthcare providers, educational programs, and local community organizations.
              </Typography>
              <Typography variant="body-sm" className="text-muted-foreground leading-relaxed">
                We work collaboratively with established regional partners and grassroots overseas networks to ensure support is delivered with dignity and cultural respect.
              </Typography>
            </div>

            <div className="lg:col-span-6 space-y-md">
              <div className="rounded-card border border-border bg-background p-md shadow-card flex items-start gap-md">
                <CheckCircle2 className="h-6 w-6 text-success shrink-0" aria-hidden="true" />
                <div className="space-y-xs">
                  <Typography variant="h3" className="text-base font-semibold">
                    Direct Resource Connection
                  </Typography>
                  <Typography variant="body-sm" className="text-muted-foreground">
                    Linking clients with accredited legal aid, healthcare clinics, and community services.
                  </Typography>
                </div>
              </div>

              <div className="rounded-card border border-border bg-background p-md shadow-card flex items-start gap-md">
                <CheckCircle2 className="h-6 w-6 text-success shrink-0" aria-hidden="true" />
                <div className="space-y-xs">
                  <Typography variant="h3" className="text-base font-semibold">
                    Cultural & Language Support
                  </Typography>
                  <Typography variant="body-sm" className="text-muted-foreground">
                    Fostering clear communication and welcoming guidance for diverse backgrounds.
                  </Typography>
                </div>
              </div>

              <div className="rounded-card border border-border bg-background p-md shadow-card flex items-start gap-md">
                <CheckCircle2 className="h-6 w-6 text-success shrink-0" aria-hidden="true" />
                <div className="space-y-xs">
                  <Typography variant="h3" className="text-base font-semibold">
                    Sustainable Grassroots Grants
                  </Typography>
                  <Typography variant="body-sm" className="text-muted-foreground">
                    Supporting local women leaders overseas with micro-grant initiatives.
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION SECTION */}
      <section className="py-2xl px-md lg:py-3xl lg:px-xl bg-primary text-primary-foreground" aria-labelledby="services-cta-heading">
        <div className="mx-auto max-w-4xl text-center space-y-md">
          <Typography variant="h2" id="services-cta-heading" className="text-3xl sm:text-4xl text-primary-foreground font-bold">
            Support Our Service Mission
          </Typography>
          <Typography variant="body" className="text-primary-foreground/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Your contributions help expand resource navigation for newly arrived families and power overseas women empowerment grants.
          </Typography>

          <div className="flex flex-wrap justify-center gap-md pt-md">
            <Link href="/donate" aria-label="Donate financial support to Bridge Global Network">
              <Button size="lg" variant="secondary">
                <Heart className="mr-xs h-4 w-4" aria-hidden="true" />
                Donate Now
              </Button>
            </Link>
            <Link href="/get-involved" aria-label="Get involved as a volunteer with Bridge Global Network">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary dark:bg-transparent dark:text-primary-foreground dark:border-primary-foreground/40 dark:hover:bg-primary-foreground dark:hover:text-primary font-semibold"
              >
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
