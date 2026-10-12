import * as React from "react";
import Link from "next/link";
import { Linkedin, Youtube } from "lucide-react";
import { Logo } from "@/components/common/logo";
import { Typography } from "@/components/common/typography";
import { FOOTER_COLUMNS, SITE_CONTACT, SOCIAL_LINKS, type SocialPlatform } from "@/data/site";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIAL_ICONS: Record<SocialPlatform, React.ComponentType<{ className?: string }>> = {
  youtube: Youtube,
  linkedin: Linkedin,
  x: XIcon,
};

const linkClass =
  "text-sm font-semibold text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-button";

export function Footer() {
  return (
    <footer className="w-full bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-md pb-lg pt-2xl lg:px-xl">
        <div className="grid grid-cols-1 gap-xl sm:grid-cols-2 lg:grid-cols-12">
          <div className="space-y-md sm:col-span-2 lg:col-span-5">
            <Link href="/" aria-label="Global Bridges Network home" className="inline-block">
              <Logo />
            </Link>
            <Typography variant="body-sm" className="max-w-xs text-foreground/80">
              {SITE_CONTACT.tagline}
            </Typography>
            <ul className="flex items-center gap-sm">
              {SOCIAL_LINKS.map(({ platform, label, href }) => {
                const Icon = SOCIAL_ICONS[platform];
                return (
                  <li key={platform}>
                    <a
                      href={href}
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title} className="space-y-md lg:col-span-2">
              <Typography variant="caption" as="h2" className="block font-normal">
                {column.title}
              </Typography>
              <ul className="space-y-md">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="space-y-md lg:col-span-3">
            <Typography variant="caption" as="h2" className="block font-normal">
              Help
            </Typography>
            <ul className="space-y-md">
              <li>
                <a href={`mailto:${SITE_CONTACT.email}`} className={linkClass}>
                  {SITE_CONTACT.email}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE_CONTACT.phone.replace(/[^\d+]/g, "")}`} className={linkClass}>
                  {SITE_CONTACT.phone}
                </a>
              </li>
              <li>
                <address className="text-sm font-semibold not-italic leading-6">
                  {SITE_CONTACT.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-2xl border-t border-border pt-lg text-center">
          <Typography variant="caption" as="p" className="text-foreground">
            © Copyright {new Date().getFullYear()}, All Rights Reserved by{" "}
            <span className="uppercase">{SITE_CONTACT.organizationName}</span>
          </Typography>
        </div>
      </div>
    </footer>
  );
}
