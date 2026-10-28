import * as React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { Logo } from "@/components/common/logo";
import { Typography } from "@/components/common/typography";
import { FOOTER_COLUMNS, LEGAL_LINKS, SITE } from "@/data/site";
import { CookieSettingsButton } from "@/features/consent/components/cookie-consent";
import { NewsletterForm } from "@/features/newsletter/components/newsletter-form";
import { addressLines, telHref } from "@/lib/contact";
import { sanityFetch } from "@/lib/sanity/fetch";
import { SITE_SETTINGS_QUERY } from "@/lib/sanity/queries";
import type { SiteSettings, SocialPlatform } from "@/lib/sanity/types";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIALS: Record<SocialPlatform, { label: string; Icon: React.ComponentType<{ className?: string }> }> = {
  youtube: { label: "YouTube", Icon: Youtube },
  linkedin: { label: "LinkedIn", Icon: Linkedin },
  twitter: { label: "X (Twitter)", Icon: XIcon },
  facebook: { label: "Facebook", Icon: Facebook },
  instagram: { label: "Instagram", Icon: Instagram },
};

const linkClass =
  "text-sm font-semibold text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-button";

export async function Footer() {
  const settings = await sanityFetch<SiteSettings | null>(SITE_SETTINGS_QUERY);
  const socialLinks = (settings?.socialLinks ?? []).filter((link) => link.url && SOCIALS[link.platform]);

  return (
    <footer className="w-full bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-md pb-lg pt-2xl lg:px-xl">
        <div className="grid grid-cols-1 gap-xl sm:grid-cols-2 lg:grid-cols-12">
          <div className="space-y-md sm:col-span-2 lg:col-span-5">
            <Link href="/" aria-label="Global Bridges Network home" className="inline-block">
              <Logo />
            </Link>
            <Typography variant="body-sm" className="max-w-xs text-foreground/80">
              {SITE.tagline}
            </Typography>
            {socialLinks.length > 0 && (
              <ul className="flex items-center gap-sm">
                {socialLinks.map(({ platform, url }) => {
                  const { label, Icon } = SOCIALS[platform];
                  return (
                    <li key={platform}>
                      <a
                        href={url}
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
            )}
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title} className="space-y-md lg:col-span-2">
              <Typography variant="caption" as="h2" className="block">
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
            <Typography variant="caption" as="h2" className="block">
              Help
            </Typography>
            <ul className="space-y-md">
              {settings?.email && (
                <li>
                  <a href={`mailto:${settings.email}`} className={linkClass}>
                    {settings.email}
                  </a>
                </li>
              )}
              {settings?.phone && (
                <li>
                  <a href={telHref(settings.phone)} className={linkClass}>
                    {settings.phone}
                  </a>
                </li>
              )}
              {settings?.address && (
                <li>
                  <address className="text-sm font-semibold not-italic leading-6">
                    {[SITE.organizationName, ...addressLines(settings.address)].map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Newsletter signup: emails are stored in a Brevo contact list (see /api/newsletter). */}
        <div className="mt-2xl flex flex-col gap-md border-t border-border pt-xl lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-xs">
            <Typography variant="h4-semibold" as="h2">
              Stay connected
            </Typography>
            <Typography variant="body-sm" className="max-w-md text-muted-foreground">
              Get occasional updates on our programs, community stories, and ways to help. No spam; unsubscribe anytime.
            </Typography>
          </div>
          <NewsletterForm className="w-full lg:max-w-md" />
        </div>

        <div className="mt-xl flex flex-col items-center gap-sm border-t border-border pt-lg text-center">
          <Typography variant="caption" as="p" className="text-foreground">
            © Copyright {new Date().getFullYear()}, All Rights Reserved by{" "}
            <span className="uppercase">{SITE.organizationName}</span>
          </Typography>
          <nav aria-label="Legal">
            <ul className="flex items-center gap-md">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-button"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <CookieSettingsButton className="text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-button" />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
