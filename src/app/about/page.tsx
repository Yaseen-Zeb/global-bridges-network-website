import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Typography } from "@/components/common/typography";
import { Button } from "@/components/ui/button";
import {
  Heart,
  ShieldCheck,
  Users,
  Building2,
  HeartHandshake,
  BookOpen,
  Scale,
  HeartPulse,
  Briefcase,
  GraduationCap,
  Globe2,
  Linkedin,
  Mail,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Bridge Global Network",
  description:
    "Learn about Bridge Global Network's mission, vision, founding story, 501(c)(3) non-profit status, and leadership team dedicated to empowering refugees, immigrants, and women worldwide.",
  openGraph: {
    title: "About Us | Bridge Global Network",
    description:
      "Learn about Bridge Global Network's mission, vision, founding story, 501(c)(3) status, and leadership team.",
  },
};

// CMS Content Placeholder: Leadership Team Data Structure
const CMS_LEADERSHIP = [
  {
    id: "founder-1",
    name: "[Co-Founder Name - Pending Client Input]",
    title: "Co-Founder & Executive Director",
    photo: "/images/founder-1.png",
    bio: "Dedicated to refugee advocacy and community empowerment. Lead administrator overseeing global partnership operations and resettlement program strategy.",
    email: "contact@bridgeglobalnetwork.org",
    linkedin: "https://linkedin.com",
  },
  {
    id: "founder-2",
    name: "[Co-Founder Name - Pending Client Input]",
    title: "Co-Founder & Director of Programs",
    photo: "/images/founder-2.png",
    bio: "Passionate about health navigation, overseas women's micro-grants, and educational development. Directing field operations and community integration services.",
    email: "info@bridgeglobalnetwork.org",
    linkedin: "https://linkedin.com",
  },
];

// Focus Areas Data
const WHAT_WE_DO_ITEMS = [
  {
    icon: Users,
    title: "Refugee & Immigrant Support",
    description:
      "Welcoming newly arrived individuals and families with compassionate community orientation and personalized support.",
  },
  {
    icon: Building2,
    title: "Resettlement Services",
    description:
      "Assisting with secure initial housing, essential household items, neighborhood orientation, and family logistics.",
  },
  {
    icon: HeartPulse,
    title: "Health Navigation",
    description:
      "Guiding clients through medical appointments, insurance applications, mental wellness support, and healthcare systems.",
  },
  {
    icon: Scale,
    title: "Legal Guidance",
    description:
      "Connecting clients with pro-bono legal aid, documentation support, and guidance through complex immigration processes.",
  },
  {
    icon: Briefcase,
    title: "Employment Readiness",
    description:
      "Providing job placement assistance, resume workshops, interview coaching, and workplace communication practice.",
  },
  {
    icon: GraduationCap,
    title: "Education & Literacy",
    description:
      "Conducting English practice classes, adult digital literacy workshops, and youth after-school academic support.",
  },
  {
    icon: Globe2,
    title: "Overseas Women Empowerment",
    description:
      "Partnering with grassroots organizations overseas to fund micro-grants, skill-building workshops, and women's leadership initiatives.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* 1. PAGE HERO */}
      <section
        className="relative h-[380px] flex flex-col justify-center px-md lg:px-xl border-b border-border overflow-hidden"
        aria-label="About Us banner"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1920&q=80&auto=format&fit=crop"
            alt="About Us Background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-background/75 dark:bg-background/75" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center space-y-md">
          <div className="inline-flex items-center gap-xs rounded-full bg-primary/20 px-md py-xs text-xs font-semibold text-primary backdrop-blur-md shadow-sm border border-primary/20">
            <HeartHandshake className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <span>Who We Are & Our Commitment</span>
          </div>

          <Typography variant="h1" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground drop-shadow-sm">
            About Bridge Global Network
          </Typography>

          <Typography variant="body" className="text-foreground/80 dark:text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Bridge Global Network is an international platform dedicated to empowering refugees, immigrants, and overseas communities through holistic resettlement, education, healthcare navigation, and sustainable women empowerment initiatives.
          </Typography>
        </div>
      </section>

      {/* 2. MISSION & 3. VISION SECTIONS */}
      <section className="py-2xl px-md lg:px-xl border-b border-border" aria-labelledby="mission-vision-heading">
        <div className="mx-auto max-w-6xl space-y-xl">
          <div className="text-center max-w-2xl mx-auto space-y-xs">
            <Typography variant="caption" className="text-primary font-semibold tracking-wider uppercase">
              Guiding Principles
            </Typography>
            <Typography variant="h2" id="mission-vision-heading">
              Our Core Mission & Vision
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            {/* 2. MISSION CARD */}
            <article className="rounded-card border border-border bg-background p-lg shadow-card space-y-md flex flex-col justify-between">
              <div className="space-y-sm">
                <div className="w-10 h-10 rounded-button bg-primary/10 flex items-center justify-center text-primary">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </div>
                <Typography variant="h3" className="text-2xl font-bold">
                  Our Mission
                </Typography>
                {/* CMS Content Placeholder: Mission Statement */}
                <Typography variant="body" className="text-muted-foreground leading-relaxed">
                  To walk alongside newly arrived refugees and immigrants with dignity and compassion—providing essential resettlement, health, legal, and educational resources while advancing sustainable women empowerment programs worldwide.
                </Typography>
              </div>
              <div className="text-xs text-muted-foreground/70 italic border-t border-border/60 pt-sm">
                * Official Mission Statement (Pending Final Client Provision)
              </div>
            </article>

            {/* 3. VISION CARD */}
            <article className="rounded-card border border-border bg-background p-lg shadow-card space-y-md flex flex-col justify-between">
              <div className="space-y-sm">
                <div className="w-10 h-10 rounded-button bg-primary/10 flex items-center justify-center text-primary">
                  <Globe2 className="h-5 w-5" aria-hidden="true" />
                </div>
                <Typography variant="h3" className="text-2xl font-bold">
                  Our Vision
                </Typography>
                {/* CMS Content Placeholder: Vision Statement */}
                <Typography variant="body" className="text-muted-foreground leading-relaxed">
                  A connected global community where refugees, immigrants, and women everywhere have access to safety, equal opportunity, self-sufficiency, and the tools to build a thriving future.
                </Typography>
              </div>
              <div className="text-xs text-muted-foreground/70 italic border-t border-border/60 pt-sm">
                * Official Vision Statement (Pending Final Client Provision)
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 4. OUR STORY */}
      <section className="py-2xl px-md lg:px-xl bg-muted/20 border-b border-border" aria-labelledby="story-heading">
        <div className="mx-auto max-w-4xl space-y-md">
          <div className="text-center space-y-xs">
            <Typography variant="caption" className="text-primary font-semibold tracking-wider uppercase">
              Founding Journey
            </Typography>
            <Typography variant="h2" id="story-heading">
              Our Founding Story
            </Typography>
          </div>

          <article className="rounded-card border border-border bg-background p-lg sm:p-xl shadow-card space-y-md">
            <Typography variant="body" className="text-muted-foreground leading-relaxed">
              Bridge Global Network was founded out of a shared commitment to bridge the gap between initial crisis arrival and long-term community integration. Recognizing the complex obstacles faced by incoming refugee families and immigrants—from housing displacement to healthcare navigation—our founders established a holistic support network designed to treat every individual with dignity and cultural respect.
            </Typography>
            <Typography variant="body" className="text-muted-foreground leading-relaxed">
              Expanding beyond local resettlement services, our organization partnered directly with grassroots leaders overseas to launch targeted women empowerment programs, equipping women with micro-grants, vocational skills, and leadership tools.
            </Typography>
            <div className="rounded-button bg-muted/60 p-sm text-xs text-muted-foreground italic border border-border/50">
              * Note for Client: Additional specific founding timeline facts and historical milestones can be populated here via the CMS upon final approval.
            </div>
          </article>
        </div>
      </section>

      {/* 5. WHAT WE DO */}
      <section className="py-2xl px-md lg:px-xl border-b border-border" aria-labelledby="what-we-do-heading">
        <div className="mx-auto max-w-6xl space-y-xl">
          <div className="text-center max-w-2xl mx-auto space-y-xs">
            <Typography variant="caption" className="text-primary font-semibold tracking-wider uppercase">
              Our Work & Scope
            </Typography>
            <Typography variant="h2" id="what-we-do-heading">
              What We Do
            </Typography>
            <Typography variant="body" className="text-muted-foreground">
              Comprehensive local resettlement programs paired with global women empowerment initiatives.
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
            {WHAT_WE_DO_ITEMS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <article
                  key={idx}
                  className="rounded-card border border-border bg-background p-lg shadow-card space-y-sm flex flex-col justify-between"
                >
                  <div className="space-y-sm">
                    <div className="w-10 h-10 rounded-button bg-primary/10 flex items-center justify-center text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <Typography variant="h3" className="text-lg font-bold">
                      {item.title}
                    </Typography>
                    <Typography variant="body-sm" className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </Typography>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. LEADERSHIP */}
      <section className="py-2xl px-md lg:px-xl bg-muted/20 border-b border-border" aria-labelledby="leadership-heading">
        <div className="mx-auto max-w-6xl space-y-xl">
          <div className="text-center max-w-2xl mx-auto space-y-xs">
            <Typography variant="caption" className="text-primary font-semibold tracking-wider uppercase">
              Leadership & Governance
            </Typography>
            <Typography variant="h2" id="leadership-heading">
              Our Founders & Leadership Team
            </Typography>
            <Typography variant="body" className="text-muted-foreground">
              Guided by dedicated advocates with deep experience in international dialogue and community service.
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-xl max-w-4xl mx-auto">
            {CMS_LEADERSHIP.map((leader) => (
              <article
                key={leader.id}
                className="rounded-card border border-border bg-background p-lg shadow-card flex flex-col justify-between space-y-md"
              >
                <div className="space-y-md">
                  <div className="relative w-full aspect-square max-w-[200px] mx-auto rounded-full overflow-hidden border-2 border-primary/20 shadow-sm bg-muted">
                    <Image
                      src={leader.photo}
                      alt={`Portrait of ${leader.name}`}
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </div>

                  <div className="text-center space-y-xs">
                    <Typography variant="h3" className="text-xl font-bold">
                      {leader.name}
                    </Typography>
                    <Typography variant="body-sm" className="text-primary font-semibold">
                      {leader.title}
                    </Typography>
                    <Typography variant="body-sm" className="text-muted-foreground leading-relaxed pt-xs">
                      {leader.bio}
                    </Typography>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-md border-t border-border pt-sm">
                  {leader.email && (
                    <a
                      href={`mailto:${leader.email}`}
                      className="inline-flex items-center text-xs font-medium text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-button p-xs"
                      aria-label={`Send email to ${leader.name}`}
                    >
                      <Mail className="h-4 w-4 mr-xs" aria-hidden="true" /> Email
                    </a>
                  )}
                  {leader.linkedin && (
                    <a
                      href={leader.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs font-medium text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-button p-xs"
                      aria-label={`LinkedIn profile of ${leader.name}`}
                    >
                      <Linkedin className="h-4 w-4 mr-xs" aria-hidden="true" /> LinkedIn
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="text-center text-xs text-muted-foreground italic">
            * Note for Client: Founder names, portraits, and bios are structured in CMS data format for final client verification.
          </div>
        </div>
      </section>

      {/* 7. 501(c)(3) INFORMATION */}
      <section className="py-2xl px-md lg:px-xl border-b border-border" aria-labelledby="tax-status-heading">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-card border border-primary/20 bg-primary/5 p-lg sm:p-xl shadow-card space-y-md text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <ShieldCheck className="h-6 w-6" aria-hidden="true" />
            </div>

            <div className="space-y-xs">
              <Typography variant="h2" id="tax-status-heading" className="text-2xl font-bold">
                501(c)(3) Non-Profit Organization Status
              </Typography>
              <Typography variant="body" className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Bridge Global Network is registered as a tax-exempt 501(c)(3) non-profit organization. All financial contributions are tax-deductible to the fullest extent allowed by law.
              </Typography>
            </div>

            <div className="inline-block rounded-button bg-background border border-border px-md py-sm shadow-xs">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                Employer Identification Number (EIN)
              </span>
              <span className="text-base font-bold text-foreground font-mono mt-xs block">
                [EIN Pending Client Provision]
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION */}
      <section className="py-2xl px-md lg:py-3xl lg:px-xl bg-primary text-primary-foreground" aria-labelledby="about-cta-heading">
        <div className="mx-auto max-w-4xl text-center space-y-md">
          <Typography variant="h2" id="about-cta-heading" className="text-3xl sm:text-4xl text-primary-foreground font-bold">
            Join Us in Building Global Bridges
          </Typography>
          <Typography variant="body" className="text-primary-foreground/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you donate essential goods, contribute financial support, or volunteer your time, your involvement empowers families and transforms lives.
          </Typography>

          <div className="flex flex-wrap justify-center gap-md pt-md">
            <Link href="/donate" aria-label="Donate to support Bridge Global Network">
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
                Get Involved <ArrowRight className="ml-xs h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
