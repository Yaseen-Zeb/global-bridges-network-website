"use client";

import * as React from "react";
import Link from "next/link";
import { Logo } from "@/components/common/logo";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Menu,
  X,
  ChevronDown,
  Package,
  ClipboardList,
  MessageSquare,
  Users,
  Building2,
  Sparkles,
} from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [giveDropdownOpen, setGiveDropdownOpen] = React.useState(false);
  const [communityDropdownOpen, setCommunityDropdownOpen] = React.useState(false);

  // Close dropdowns on escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setGiveDropdownOpen(false);
        setCommunityDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-md lg:px-xl">
        {/* Brand Logo */}
        <Link href="/" aria-label="Bridge Global Network Home">
          <Logo />
        </Link>

        {/* Desktop Navigation Links & Grouped Dropdowns */}
        <nav className="hidden md:flex items-center gap-md lg:gap-lg" aria-label="Main Navigation">
          <Link
            href="/"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-button px-xs py-xs"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-button px-xs py-xs"
          >
            About Us
          </Link>
          <Link
            href="/services"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-button px-xs py-xs"
          >
            Services
          </Link>

          {/* Group 1: Ways to Give Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setGiveDropdownOpen(true)}
            onMouseLeave={() => setGiveDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setGiveDropdownOpen(!giveDropdownOpen)}
              aria-expanded={giveDropdownOpen}
              className="inline-flex items-center gap-[4px] text-sm font-medium text-foreground/80 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-button px-xs py-xs"
            >
              <span>Ways to Give</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  giveDropdownOpen ? "rotate-180 text-primary" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            {giveDropdownOpen && (
              <div
                className="absolute top-full left-0 w-64 rounded-card border border-border bg-background p-xs shadow-dropdown space-y-[2px] z-50 pt-xs"
                role="menu"
                aria-orientation="vertical"
              >
                <Link
                  href="/donate"
                  role="menuitem"
                  onClick={() => setGiveDropdownOpen(false)}
                  className="flex items-start gap-sm p-sm rounded-button hover:bg-muted/80 transition-colors group"
                >
                  <Heart className="h-4 w-4 text-primary shrink-0 mt-0.5 group-hover:scale-105 transition-transform" aria-hidden="true" />
                  <div>
                    <span className="text-sm font-semibold text-foreground block group-hover:text-primary">
                      Financial Giving
                    </span>
                    <span className="text-xs text-muted-foreground block">
                      Make a tax-deductible gift
                    </span>
                  </div>
                </Link>

                <Link
                  href="/donate-goods"
                  role="menuitem"
                  onClick={() => setGiveDropdownOpen(false)}
                  className="flex items-start gap-sm p-sm rounded-button hover:bg-muted/80 transition-colors group"
                >
                  <Package className="h-4 w-4 text-primary shrink-0 mt-0.5 group-hover:scale-105 transition-transform" aria-hidden="true" />
                  <div>
                    <span className="text-sm font-semibold text-foreground block group-hover:text-primary">
                      Donate Goods
                    </span>
                    <span className="text-xs text-muted-foreground block">
                      Offer physical items &amp; supplies
                    </span>
                  </div>
                </Link>

                <Link
                  href="/current-needs"
                  role="menuitem"
                  onClick={() => setGiveDropdownOpen(false)}
                  className="flex items-start gap-sm p-sm rounded-button hover:bg-muted/80 transition-colors group"
                >
                  <ClipboardList className="h-4 w-4 text-primary shrink-0 mt-0.5 group-hover:scale-105 transition-transform" aria-hidden="true" />
                  <div>
                    <span className="text-sm font-semibold text-foreground block group-hover:text-primary">
                      Current Needs
                    </span>
                    <span className="text-xs text-muted-foreground block">
                      Real-time requested item list
                    </span>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Group 2: Community Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setCommunityDropdownOpen(true)}
            onMouseLeave={() => setCommunityDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setCommunityDropdownOpen(!communityDropdownOpen)}
              aria-expanded={communityDropdownOpen}
              className="inline-flex items-center gap-[4px] text-sm font-medium text-foreground/80 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-button px-xs py-xs"
            >
              <span>Community</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  communityDropdownOpen ? "rotate-180 text-primary" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            {communityDropdownOpen && (
              <div
                className="absolute top-full left-0 w-64 rounded-card border border-border bg-background p-xs shadow-dropdown space-y-[2px] z-50 pt-xs"
                role="menu"
                aria-orientation="vertical"
              >
                <Link
                  href="/get-involved"
                  role="menuitem"
                  onClick={() => setCommunityDropdownOpen(false)}
                  className="flex items-start gap-sm p-sm rounded-button hover:bg-muted/80 transition-colors group"
                >
                  <Users className="h-4 w-4 text-primary shrink-0 mt-0.5 group-hover:scale-105 transition-transform" aria-hidden="true" />
                  <div>
                    <span className="text-sm font-semibold text-foreground block group-hover:text-primary">
                      Get Involved
                    </span>
                    <span className="text-xs text-muted-foreground block">
                      Volunteer, mentor, or partner
                    </span>
                  </div>
                </Link>

                <Link
                  href="/testimonials"
                  role="menuitem"
                  onClick={() => setCommunityDropdownOpen(false)}
                  className="flex items-start gap-sm p-sm rounded-button hover:bg-muted/80 transition-colors group"
                >
                  <MessageSquare className="h-4 w-4 text-primary shrink-0 mt-0.5 group-hover:scale-105 transition-transform" aria-hidden="true" />
                  <div>
                    <span className="text-sm font-semibold text-foreground block group-hover:text-primary">
                      Stories &amp; Testimonials
                    </span>
                    <span className="text-xs text-muted-foreground block">
                      Read authentic experiences
                    </span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Desktop Action & Theme Toggle */}
        <div className="hidden md:flex items-center gap-sm">
          <ThemeToggle />
          <Link href="/donate" aria-label="Donate to Bridge Global Network">
            <Button variant="primary" size="md">
              <Heart className="mr-xs h-4 w-4" aria-hidden="true" />
              Donate Now
            </Button>
          </Link>
        </div>

        {/* Mobile Menu & Theme Button */}
        <div className="flex items-center gap-xs md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center p-sm rounded-button text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          className="md:hidden border-b border-border bg-background px-md py-md space-y-md shadow-card"
          aria-label="Mobile Navigation"
        >
          {/* Main Pages */}
          <div className="space-y-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block px-xs">
              Main Pages
            </span>
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-button px-md py-xs text-sm font-medium text-foreground hover:bg-muted hover:text-primary"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-button px-md py-xs text-sm font-medium text-foreground hover:bg-muted hover:text-primary"
            >
              About Us
            </Link>
            <Link
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-button px-md py-xs text-sm font-medium text-foreground hover:bg-muted hover:text-primary"
            >
              Services
            </Link>
          </div>

          {/* Ways to Give */}
          <div className="space-y-xs pt-xs border-t border-border/60">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block px-xs">
              Ways to Give
            </span>
            <Link
              href="/donate"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-xs rounded-button px-md py-xs text-sm font-medium text-foreground hover:bg-muted hover:text-primary"
            >
              <Heart className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
              <span>Financial Giving (/donate)</span>
            </Link>
            <Link
              href="/donate-goods"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-xs rounded-button px-md py-xs text-sm font-medium text-foreground hover:bg-muted hover:text-primary"
            >
              <Package className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
              <span>Donate Goods (/donate-goods)</span>
            </Link>
            <Link
              href="/current-needs"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-xs rounded-button px-md py-xs text-sm font-medium text-foreground hover:bg-muted hover:text-primary"
            >
              <ClipboardList className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
              <span>Real-Time Current Needs</span>
            </Link>
          </div>

          {/* Community & Stories */}
          <div className="space-y-xs pt-xs border-t border-border/60">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block px-xs">
              Community &amp; Stories
            </span>
            <Link
              href="/get-involved"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-xs rounded-button px-md py-xs text-sm font-medium text-foreground hover:bg-muted hover:text-primary"
            >
              <Users className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
              <span>Get Involved</span>
            </Link>
            <Link
              href="/testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-xs rounded-button px-md py-xs text-sm font-medium text-foreground hover:bg-muted hover:text-primary"
            >
              <MessageSquare className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
              <span>Stories &amp; Testimonials</span>
            </Link>
          </div>

          {/* Mobile CTA */}
          <div className="pt-sm border-t border-border">
            <Link
              href="/donate"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full"
            >
              <Button variant="primary" className="w-full justify-center">
                <Heart className="mr-xs h-4 w-4" aria-hidden="true" />
                Donate Now
              </Button>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

