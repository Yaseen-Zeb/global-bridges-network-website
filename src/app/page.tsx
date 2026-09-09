import Link from "next/link";
import Image from "next/image";
import { Typography } from "@/components/common/typography";
import { Button } from "@/components/ui/button";
import { AnimatedEyebrow } from "@/components/common/animated-eyebrow";
import {
  Heart,
  Home as HomeIcon,
  HeartPulse,
  Scale,
  Briefcase,
  GraduationCap,
  HeartHandshake,
  Package,
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { CMS_TESTIMONIALS } from "@/data/testimonials";
import { CMS_CURRENT_NEEDS } from "@/data/current-needs";
import { TestimonialCard } from "@/components/testimonials/testimonial-card";
import { CurrentNeedCard } from "@/components/needs/current-need-card";

// CMS Content Placeholder: Service Areas Data Structure
const SERVICE_AREAS = [
  {
    icon: HomeIcon,
    title: "Resettlement",
    description:
      "Assisting newly arrived families with safe housing placement, community orientation, and initial household setup.",
  },
  {
    icon: HeartPulse,
    title: "Health Navigation",
    description:
      "Guiding individuals through healthcare systems, medical appointment scheduling, and wellness resources.",
  },
  {
    icon: Scale,
    title: "Legal Guidance",
    description:
      "Offering legal aid connection, documentation support, and guidance through complex immigration processes.",
  },
  {
    icon: Briefcase,
    title: "Employment Support",
    description:
      "Job placement assistance, resume building, interview coaching, and workplace communication practice.",
  },
  {
    icon: GraduationCap,
    title: "Education & Literacy",
    description:
      "Language practice classes, adult digital literacy workshops, and youth after-school academic support.",
  },
  {
    icon: HeartHandshake,
    title: "Women Empowerment",
    description:
      "Supporting overseas skill-building workshops, micro-grant programs, and women's leadership initiatives.",
  },
];

// CMS Content Placeholder: Testimonials Data Structure


export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* 1. HERO SECTION */}
      <section
        className="relative border-b border-border py-3xl px-md lg:py-[120px] lg:px-xl flex items-center justify-center overflow-hidden min-h-[85vh]"
        aria-label="Welcome banner"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.png"
            alt="Global Bridges Network Community"
            fill
            priority
            className="object-cover"
          />
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-background/80 dark:bg-background/90" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center space-y-lg flex flex-col items-center">
          <AnimatedEyebrow />

          <Typography variant="h1" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground drop-shadow-sm">
            Empowering Refugees & Immigrants, Building Stronger Communities
          </Typography>

          <Typography variant="body" className="text-foreground/80 dark:text-muted-foreground text-lg sm:text-xl max-w-3xl leading-relaxed">
            Bridge Global Network supports newly arrived refugees and immigrants with holistic resettlement, health navigation, legal assistance, and educational programs—while fostering sustainable women empowerment initiatives overseas.
          </Typography>

          <div className="flex flex-wrap justify-center gap-md pt-md items-center">
            <Link href="/donate" aria-label="Donate to support Global Bridges Network programs">
              <Button size="lg" variant="primary" className="shadow-lg hover:shadow-xl transition-shadow text-base h-12 px-8">
                <Heart className="mr-sm h-5 w-5" aria-hidden="true" />
                Donate
              </Button>
            </Link>
            <Link href="/get-involved" aria-label="Get involved as a volunteer or community partner">
              <Button size="lg" variant="outline" className="bg-background/80 backdrop-blur-md shadow-lg hover:shadow-xl transition-shadow text-base h-12 px-8">
                Get Involved
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. MISSION / INTRODUCTION SECTION */}
      <section className="py-2xl px-md lg:px-xl border-b border-border" aria-labelledby="mission-heading">
        <div className="mx-auto max-w-4xl text-center space-y-md">
          <Typography variant="caption" className="text-primary font-semibold tracking-wider uppercase">
            Our Mission & Commitment
          </Typography>
          <Typography variant="h2" id="mission-heading">
            Dedicated to Dignity, Opportunity, and Self-Sufficiency
          </Typography>
          <Typography variant="body" className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            At Bridge Global Network, we believe everyone deserves safety, dignity, and a fair chance to thrive. We walk alongside refugees and immigrants as they rebuild their lives locally, while partnering with grassroots organizations to empower women and girls through skill-building programs overseas.
          </Typography>
          <div className="pt-sm">
            <Link href="/about" aria-label="Learn more about Global Bridges Network history and mission">
              <Button variant="link" size="md" className="text-primary font-semibold">
                Learn More About Our Mission <ArrowRight className="ml-xs h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. SERVICE AREAS SECTION */}
      <section className="py-2xl px-md lg:px-xl bg-muted/20 border-b border-border" aria-labelledby="services-heading">
        <div className="mx-auto max-w-6xl space-y-xl">
          <div className="text-center max-w-2xl mx-auto space-y-xs">
            <Typography variant="caption" className="text-primary font-semibold tracking-wider uppercase">
              Comprehensive Support
            </Typography>
            <Typography variant="h2" id="services-heading">
              Our Core Service Areas
            </Typography>
            <Typography variant="body" className="text-muted-foreground">
              Providing holistic support from initial arrival to long-term integration and global empowerment.
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
            {SERVICE_AREAS.map((service, index) => {
              const Icon = service.icon;
              return (
                <article
                  key={index}
                  className="rounded-card border border-border bg-background p-lg shadow-card space-y-sm flex flex-col justify-between"
                >
                  <div className="space-y-sm">
                    <div className="w-10 h-10 rounded-button bg-primary/10 flex items-center justify-center text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <Typography variant="h3" className="text-xl">
                      {service.title}
                    </Typography>
                    <Typography variant="body-sm" className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </Typography>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="text-center pt-md">
            <Link href="/services" aria-label="Explore all Global Bridges Network services in detail">
              <Button variant="outline" size="lg">
                Explore Our Services <ArrowRight className="ml-xs h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. IMPACT / WHY IT MATTERS SECTION */}
      <section className="py-2xl px-md lg:px-xl border-b border-border" aria-labelledby="impact-heading">
        <div className="mx-auto max-w-5xl space-y-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-center">
            <div className="lg:col-span-6 space-y-md">
              <Typography variant="caption" className="text-primary font-semibold tracking-wider uppercase">
                Why It Matters
              </Typography>
              <Typography variant="h2" id="impact-heading">
                A Personal, Dignity-First Approach to Global & Local Support
              </Typography>
              <Typography variant="body" className="text-muted-foreground leading-relaxed">
                Navigating a new language, legal framework, and culture can be overwhelming. We measure our purpose through the strength of community partnerships, individual growth, and sustainable support networks that welcome families warmly and foster lasting independence.
              </Typography>
            </div>

            <div className="lg:col-span-6 space-y-md">
              <div className="rounded-card border border-border bg-background p-md shadow-card flex items-start gap-md">
                <CheckCircle2 className="h-6 w-6 text-success shrink-0 mt-0.5" aria-hidden="true" />
                <div className="space-y-xs">
                  <Typography variant="h3" className="text-base font-semibold">
                    Cultural Respect & Individual Dignity
                  </Typography>
                  <Typography variant="body-sm" className="text-muted-foreground">
                    Tailoring assistance to honor diverse backgrounds and individual goals.
                  </Typography>
                </div>
              </div>

              <div className="rounded-card border border-border bg-background p-md shadow-card flex items-start gap-md">
                <CheckCircle2 className="h-6 w-6 text-success shrink-0 mt-0.5" aria-hidden="true" />
                <div className="space-y-xs">
                  <Typography variant="h3" className="text-base font-semibold">
                    Grassroots Overseas Partnerships
                  </Typography>
                  <Typography variant="body-sm" className="text-muted-foreground">
                    Directly supporting local women leaders in overseas development initiatives.
                  </Typography>
                </div>
              </div>

              <div className="rounded-card border border-border bg-background p-md shadow-card flex items-start gap-md">
                <CheckCircle2 className="h-6 w-6 text-success shrink-0 mt-0.5" aria-hidden="true" />
                <div className="space-y-xs">
                  <Typography variant="h3" className="text-base font-semibold">
                    Long-Term Community Inclusion
                  </Typography>
                  <Typography variant="body-sm" className="text-muted-foreground">
                    Fostering social connections and local mentorship that endure for years.
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW YOU CAN HELP SECTION */}
      <section className="py-2xl px-md lg:px-xl bg-muted/20 border-b border-border" aria-labelledby="help-heading">
        <div className="mx-auto max-w-6xl space-y-xl">
          <div className="text-center max-w-2xl mx-auto space-y-xs">
            <Typography variant="caption" className="text-primary font-semibold tracking-wider uppercase">
              Get Involved
            </Typography>
            <Typography variant="h2" id="help-heading">
              How You Can Help Make a Difference
            </Typography>
            <Typography variant="body" className="text-muted-foreground">
              Whether through financial support, item donations, or volunteering your time, your support transforms lives.
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            <article className="rounded-card border border-border bg-background p-lg shadow-card flex flex-col justify-between space-y-md">
              <div className="space-y-sm">
                <div className="w-10 h-10 rounded-button bg-primary/10 flex items-center justify-center text-primary">
                  <Heart className="h-5 w-5" aria-hidden="true" />
                </div>
                <Typography variant="h3" className="text-xl">
                  Donate Financial Support
                </Typography>
                <Typography variant="body-sm" className="text-muted-foreground leading-relaxed">
                  Your tax-deductible financial contributions directly fund emergency housing aid, legal assistance, and overseas micro-grants for women.
                </Typography>
              </div>
              <Link href="/donate" aria-label="Donate funds to Global Bridges Network" className="w-full">
                <Button variant="primary" className="w-full">
                  Donate Now
                </Button>
              </Link>
            </article>

            <article className="rounded-card border border-border bg-background p-lg shadow-card flex flex-col justify-between space-y-md">
              <div className="space-y-sm">
                <div className="w-10 h-10 rounded-button bg-primary/10 flex items-center justify-center text-primary">
                  <Package className="h-5 w-5" aria-hidden="true" />
                </div>
                <Typography variant="h3" className="text-xl">
                  Donate Essential Goods
                </Typography>
                <Typography variant="body-sm" className="text-muted-foreground leading-relaxed">
                  Provide physical essentials such as winter coats, cookware starter sets, hygiene kits, and school supplies for newly arrived families.
                </Typography>
              </div>
              <Link href="/donate-goods" aria-label="View goods donation guidelines and drop-off locations" className="w-full">
                <Button variant="outline" className="w-full">
                  Donate Goods
                </Button>
              </Link>
            </article>

            <article className="rounded-card border border-border bg-background p-lg shadow-card flex flex-col justify-between space-y-md">
              <div className="space-y-sm">
                <div className="w-10 h-10 rounded-button bg-primary/10 flex items-center justify-center text-primary">
                  <Users className="h-5 w-5" aria-hidden="true" />
                </div>
                <Typography variant="h3" className="text-xl">
                  Volunteer & Mentor
                </Typography>
                <Typography variant="body-sm" className="text-muted-foreground leading-relaxed">
                  Share your time as a family mentor, assist with English language practice, host a community drive, or provide administrative help.
                </Typography>
              </div>
              <Link href="/get-involved" aria-label="Sign up to become a volunteer or mentor" className="w-full">
                <Button variant="secondary" className="w-full">
                  Become a Volunteer
                </Button>
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIAL PREVIEW SECTION */}
      {/* CMS Content Placeholder: Testimonial cards structured for future CMS integration */}
      <section className="py-2xl px-md lg:px-xl border-b border-border" aria-labelledby="testimonials-heading">
        <div className="mx-auto max-w-6xl space-y-xl">
          <div className="text-center max-w-2xl mx-auto space-y-xs">
            <Typography variant="caption" className="text-primary font-semibold tracking-wider uppercase">
              Community Voices
            </Typography>
            <Typography variant="h2" id="testimonials-heading">
              Stories from Those We Serve
            </Typography>
            <Typography variant="body" className="text-muted-foreground">
              Hear directly from the individuals and families who form our vibrant global community.
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            {CMS_TESTIMONIALS.slice(0, 3).map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          <div className="text-center pt-md">
            <Link href="/testimonials" aria-label="Read all community testimonials and stories">
              <Button variant="link" size="md" className="text-primary font-semibold">
                Read All Community Stories <ArrowRight className="ml-xs h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. CURRENT NEEDS PREVIEW SECTION */}
      {/* CMS Content Placeholder: Urgent Goods and Resource Needs */}
      <section className="py-2xl px-md lg:px-xl bg-muted/20 border-b border-border" aria-labelledby="needs-heading">
        <div className="mx-auto max-w-5xl space-y-xl">
          <div className="text-center max-w-2xl mx-auto space-y-xs">
            <Typography variant="caption" className="text-primary font-semibold tracking-wider uppercase">
              Urgent Support
            </Typography>
            <Typography variant="h2" id="needs-heading">
              Current Resource Needs
            </Typography>
            <Typography variant="body" className="text-muted-foreground">
              Items currently requested by arriving families and partner programs.
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            {CMS_CURRENT_NEEDS.slice(0, 3).map((need) => (
              <CurrentNeedCard key={need.id} need={need} />
            ))}
          </div>

          <div className="text-center pt-md">
            <Link href="/donate-goods" aria-label="View complete list of current resource needs">
              <Button variant="outline" size="lg">
                View Current Needs <ArrowRight className="ml-xs h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA SECTION */}
      <section className="py-2xl px-md lg:py-3xl lg:px-xl bg-primary text-primary-foreground" aria-labelledby="final-cta-heading">
        <div className="mx-auto max-w-4xl text-center space-y-md">
          <Typography variant="h2" id="final-cta-heading" className="text-3xl sm:text-4xl text-primary-foreground">
            Together, We Can Build Stronger Bridges
          </Typography>
          <Typography variant="body" className="text-primary-foreground/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Your compassion provides newly arrived refugees and immigrants with a warm welcome and essential tools—while powering women&apos;s empowerment overseas.
          </Typography>

          <div className="flex flex-wrap justify-center gap-md pt-md">
            <Link href="/donate" aria-label="Donate now to Global Bridges Network">
              <Button size="lg" variant="secondary">
                <Heart className="mr-xs h-4 w-4" aria-hidden="true" />
                Donate Now
              </Button>
            </Link>
            <Link href="/get-involved" aria-label="Get involved with Global Bridges Network">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary dark:bg-transparent dark:text-primary-foreground dark:border-primary-foreground/40 dark:hover:bg-primary-foreground dark:hover:text-primary font-semibold"
              >
                Get Involved
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

