"use client";

import * as React from "react";
import Link from "next/link";
import { Heart, Package, ShieldCheck, Mail, ArrowUp } from "lucide-react";
import { Logo } from "@/components/common/logo";
import { Typography } from "@/components/common/typography";
import { Button } from "@/components/ui/button";

export function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full border-t border-border bg-muted/40 text-foreground">
      {/* Upper Newsletter / Quick Support Callout */}
      <div className="border-b border-border bg-background py-xl px-md lg:px-xl">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-lg">
          <div className="space-y-xs text-center md:text-left max-w-xl">
            <Typography variant="h3" className="text-xl font-bold text-foreground">
              Empower Communities Across Borders
            </Typography>
            <Typography variant="body-sm" className="text-muted-foreground">
              Whether through financial support, donating essential goods, or volunteering your time, your involvement transforms lives.
            </Typography>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-sm shrink-0">
            <Link href="/donate" aria-label="Donate funds to Bridge Global Network">
              <Button variant="primary" size="md">
                <Heart className="mr-xs h-4 w-4" aria-hidden="true" />
                Donate Now
              </Button>
            </Link>
            <Link href="/donate-goods" aria-label="Donate essential goods">
              <Button variant="outline" size="md">
                <Package className="mr-xs h-4 w-4 text-primary" aria-hidden="true" />
                Donate Goods
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main 4-Column Footer Navigation Grid */}
      <div className="mx-auto max-w-7xl py-2xl px-md lg:px-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-xl">
          {/* Column 1: Organization Info & Mission (4 Cols) */}
          <div className="lg:col-span-4 space-y-md">
            <Link href="/" aria-label="Bridge Global Network Home">
              <Logo />
            </Link>
            <Typography variant="body-sm" className="text-muted-foreground leading-relaxed">
              Bridge Global Network connects communities across borders, welcoming refugees and immigrants with dignity while supporting overseas women empowerment initiatives.
            </Typography>

            <div className="rounded-button bg-background border border-border p-xs flex items-center gap-xs text-xs text-muted-foreground shadow-xs">
              <ShieldCheck className="h-4 w-4 text-success shrink-0" aria-hidden="true" />
              <span>501(c)(3) Non-Profit Organization • Tax-Deductible</span>
            </div>
          </div>

          {/* Column 2: What We Do (3 Cols) */}
          <div className="lg:col-span-3 space-y-sm">
            <Typography variant="caption" className="text-foreground font-bold uppercase tracking-wider block">
              What We Do
            </Typography>
            <ul className="space-y-xs text-sm">
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-button py-[2px] block"
                >
                  Our Services (/services)
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-button py-[2px] block"
                >
                  Events &amp; Gatherings (/events)
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-button py-[2px] block"
                >
                  About Our Mission
                </Link>
              </li>
              <li>
                <Link
                  href="/testimonials"
                  className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-button py-[2px] block"
                >
                  Stories &amp; Testimonials
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support & Giving (3 Cols) */}
          <div className="lg:col-span-3 space-y-sm">
            <Typography variant="caption" className="text-foreground font-bold uppercase tracking-wider block">
              Support &amp; Giving
            </Typography>
            <ul className="space-y-xs text-sm">
              <li>
                <Link
                  href="/donate"
                  className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-button py-[2px] block"
                >
                  Financial Giving (/donate)
                </Link>
              </li>
              <li>
                <Link
                  href="/donate-goods"
                  className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-button py-[2px] block"
                >
                  Donate Goods (/donate-goods)
                </Link>
              </li>
              <li>
                <Link
                  href="/current-needs"
                  className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-button py-[2px] block"
                >
                  Real-Time Current Needs
                </Link>
              </li>
              <li>
                <Link
                  href="/get-involved"
                  className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-button py-[2px] block"
                >
                  Get Involved &amp; Volunteer
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Help & Contact (2 Cols) */}
          <div className="lg:col-span-2 space-y-sm">
            <Typography variant="caption" className="text-foreground font-bold uppercase tracking-wider block">
              Help &amp; Contact
            </Typography>
            <ul className="space-y-xs text-sm">
              <li>
                <Link
                  href="/faqs"
                  className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-button py-[2px] block"
                >
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-button py-[2px] block"
                >
                  Contact Us (/contact)
                </Link>
              </li>
            </ul>

            <div className="space-y-xs text-xs text-muted-foreground pt-xs">
              <div className="flex items-start gap-xs">
                <Mail className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <a
                  href="mailto:info@globalbridgesnetwork.org"
                  className="hover:text-primary transition-colors underline-offset-2 hover:underline"
                >
                  info@globalbridgesnetwork.org
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Footer Bar */}
      <div className="border-t border-border bg-background py-md px-md lg:px-xl">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-sm text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Bridge Global Network. All rights reserved.</p>

          <div className="flex items-center gap-md">
            <span className="italic text-[11px]">Dignity-First Non-Profit Advocacy</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-[4px] hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-button px-xs py-[2px]"
              aria-label="Scroll back to top of page"
            >
              <span>Back to top</span>
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
