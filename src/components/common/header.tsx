"use client";

import * as React from "react";
import Link from "next/link";
import { Logo } from "@/components/common/logo";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Heart,
  Menu,
  X,
  Package,
  ClipboardList,
  MessageSquare,
  Users,
  Building2,
  HelpCircle,
  Calendar,
} from "lucide-react";

// ── Shared menu item inside a NavigationMenuContent panel ─────────────────────
interface NavPanelItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  description: string;
}

function NavPanelItem({ href, icon, label, description }: NavPanelItemProps) {
  return (
    <Link
      href={href}
      className="flex items-start gap-sm p-sm rounded-button hover:bg-muted/80 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="text-primary shrink-0 group-hover:scale-105 transition-transform">
        {icon}
      </span>
      <div>
        <span className="text-sm font-semibold text-foreground block group-hover:text-primary">
          {label}
        </span>
        <span className="text-xs text-muted-foreground block">{description}</span>
      </div>
    </Link>
  );
}

// ── Header ────────────────────────────────────────────────────────────────────
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
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

        {/* Desktop Navigation — Radix NavigationMenu handles hover + keyboard natively */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>

              {/* Static links */}
              <NavigationMenuItem>
                <Link
                  href="/"
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-button px-xs py-xs"
                >
                  Home
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  href="/about"
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-button px-xs py-xs"
                >
                  About Us
                </Link>
              </NavigationMenuItem>

              {/* What We Do */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>What We Do</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-64 rounded-card border border-border bg-background shadow-dropdown p-xs space-y-[2px]">
                    <NavPanelItem
                      href="/services"
                      icon={<Building2 className="h-4 w-4" aria-hidden="true" />}
                      label="Our Services"
                      description="Refugee, health, legal & women aid"
                    />
                    <NavPanelItem
                      href="/events"
                      icon={<Calendar className="h-4 w-4" aria-hidden="true" />}
                      label="Events & Gatherings"
                      description="Workshops, dinners & webinars"
                    />
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Ways to Give */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Ways to Give</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-64 rounded-card border border-border bg-background shadow-dropdown p-xs space-y-[2px]">
                    <NavPanelItem
                      href="/donate"
                      icon={<Heart className="h-4 w-4" aria-hidden="true" />}
                      label="Financial Giving"
                      description="Support our mission with a financial gift"
                    />
                    <NavPanelItem
                      href="/donate-goods"
                      icon={<Package className="h-4 w-4" aria-hidden="true" />}
                      label="Donate Goods"
                      description="Offer physical items & supplies"
                    />
                    <NavPanelItem
                      href="/current-needs"
                      icon={<ClipboardList className="h-4 w-4" aria-hidden="true" />}
                      label="Current Needs"
                      description="Real-time requested item list"
                    />
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Community */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Community</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-64 rounded-card border border-border bg-background shadow-dropdown p-xs space-y-[2px]">
                    <NavPanelItem
                      href="/get-involved"
                      icon={<Users className="h-4 w-4" aria-hidden="true" />}
                      label="Get Involved"
                      description="Volunteer, mentor, or partner"
                    />
                    <NavPanelItem
                      href="/testimonials"
                      icon={<MessageSquare className="h-4 w-4" aria-hidden="true" />}
                      label="Stories & Testimonials"
                      description="Read authentic experiences"
                    />
                    <NavPanelItem
                      href="/faqs"
                      icon={<HelpCircle className="h-4 w-4" aria-hidden="true" />}
                      label="Frequently Asked Questions"
                      description="Clear answers & guidance"
                    />
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
        </div>

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
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-button px-md py-xs text-sm font-medium text-foreground hover:bg-muted hover:text-primary"
            >
              Contact Us
            </Link>
          </div>

          <div className="space-y-xs pt-xs border-t border-border/60">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block px-xs">
              What We Do
            </span>
            <Link
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-xs rounded-button px-md py-xs text-sm font-medium text-foreground hover:bg-muted hover:text-primary"
            >
              <Building2 className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
              <span>Our Services</span>
            </Link>
            <Link
              href="/events"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-xs rounded-button px-md py-xs text-sm font-medium text-foreground hover:bg-muted hover:text-primary"
            >
              <Calendar className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
              <span>Events &amp; Gatherings</span>
            </Link>
          </div>

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
              <span>Financial Giving</span>
            </Link>
            <Link
              href="/donate-goods"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-xs rounded-button px-md py-xs text-sm font-medium text-foreground hover:bg-muted hover:text-primary"
            >
              <Package className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
              <span>Donate Goods</span>
            </Link>
            <Link
              href="/current-needs"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-xs rounded-button px-md py-xs text-sm font-medium text-foreground hover:bg-muted hover:text-primary"
            >
              <ClipboardList className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
              <span>Current Needs</span>
            </Link>
          </div>

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
            <Link
              href="/faqs"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-xs rounded-button px-md py-xs text-sm font-medium text-foreground hover:bg-muted hover:text-primary"
            >
              <HelpCircle className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
              <span>Frequently Asked Questions</span>
            </Link>
          </div>

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
