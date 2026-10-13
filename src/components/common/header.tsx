"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/common/logo";
import { ButtonLink } from "@/components/common/button-link";
import { CTA_LINKS, PRIMARY_NAV } from "@/data/site";
import { cn } from "@/lib/utils";

function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-header">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-md px-md lg:h-20 lg:px-xl">
        <Link href="/" aria-label="Global Bridges Network home">
          <Logo />
        </Link>

        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-xl">
            {PRIMARY_NAV.map((link) => {
              const active = isActivePath(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative py-xs text-nav font-medium uppercase tracking-wide transition-colors hover:text-primary",
                      "after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100",
                      active ? "text-primary after:scale-x-100" : "text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-sm md:flex">
          <ButtonLink href={CTA_LINKS.getInvolved.href} variant="primary">
            {CTA_LINKS.getInvolved.label}
          </ButtonLink>
          <ButtonLink href={CTA_LINKS.findSupport.href} variant="accent">
            {CTA_LINKS.findSupport.label}
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="inline-flex items-center justify-center rounded-button p-sm text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="animate-fade-up border-t border-border bg-background px-md pb-lg pt-sm shadow-dropdown md:hidden"
        >
          <ul className="space-y-xs">
            {PRIMARY_NAV.map((link) => {
              const active = isActivePath(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block rounded-button px-sm py-sm text-nav font-medium uppercase tracking-wide hover:bg-muted",
                      active ? "text-primary" : "text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-md grid grid-cols-2 gap-sm">
            <ButtonLink href={CTA_LINKS.getInvolved.href} variant="primary">
              {CTA_LINKS.getInvolved.label}
            </ButtonLink>
            <ButtonLink href={CTA_LINKS.findSupport.href} variant="accent">
              {CTA_LINKS.findSupport.label}
            </ButtonLink>
          </div>
        </nav>
      )}
    </header>
  );
}
