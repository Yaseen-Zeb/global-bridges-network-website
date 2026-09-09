"use client";

import * as React from "react";
import Link from "next/link";
import { Logo } from "@/components/common/logo";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Get Involved", href: "/get-involved" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-md lg:px-xl">
        {/* Brand Logo */}
        <Link href="/" aria-label="Bridge Global Network Home">
          <Logo />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-lg" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-button px-xs py-xs"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA Action & Theme Toggle */}
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
        <nav className="md:hidden border-b border-border bg-background px-md py-md space-y-sm shadow-card" aria-label="Mobile Navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-button px-md py-sm text-base font-medium text-foreground hover:bg-muted hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
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
