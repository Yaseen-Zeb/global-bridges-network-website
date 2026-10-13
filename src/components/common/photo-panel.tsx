import * as React from "react";
import Image from "next/image";
import { Mail, MapPin, PhoneCall, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/common/reveal";
import { Typography } from "@/components/common/typography";
import { addressLines, telHref } from "@/lib/contact";
import type { SiteSettings } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

interface ContactDetail {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

interface PhotoPanelProps {
  id: string;
  eyebrow?: string;
  title: string[];
  image: { src: string; alt: string; className?: string };
  settings: SiteSettings | null;
  /** The white card on the right (a form, tabs, ...). */
  children: React.ReactNode;
}

/**
 * Navy-washed photo panel used by the Contact and Donate pages: heading top-left,
 * organisation contact details bottom-left, and a white card on the right.
 */
export function PhotoPanel({ id, eyebrow, title, image, settings, children }: PhotoPanelProps) {
  // Contact details come from Sanity → Contact & Site Settings; missing ones are skipped.
  const details: ContactDetail[] = [];
  if (settings?.email) {
    details.push({ icon: Mail, label: "Shared Email Inbox", value: settings.email, href: `mailto:${settings.email}` });
  }
  if (settings?.address) {
    details.push({ icon: MapPin, label: "Registered Office & Administration", value: addressLines(settings.address).join("\n") });
  }
  if (settings?.phone) {
    details.push({ icon: PhoneCall, label: "Administrative & Support Inquiries", value: settings.phone, href: telHref(settings.phone) });
  }

  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-3xl bg-background px-md py-3xl lg:px-xl lg:py-4xl">
      <Reveal direction="zoom" className="relative mx-auto max-w-6xl overflow-hidden bg-navy">
        {/* Photo with a deep-navy wash, darkest at the bottom where the contact details sit. */}
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="(min-width: 1152px) 1152px, 100vw"
          className={cn("object-cover object-center", image.className)}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/60 to-ink/90" aria-hidden="true" />

        <div className="relative grid grid-cols-1 gap-xl p-md sm:p-lg lg:grid-cols-[1fr_minmax(0,30rem)] lg:gap-2xl lg:p-md lg:pl-xl">
          <div className="flex flex-col justify-between gap-2xl py-md lg:py-lg">
            <div className="space-y-sm">
              {eyebrow && (
                <Typography variant="overline" as="p" className="animate-fade-up motion-safe-only">
                  {eyebrow}
                </Typography>
              )}
              <Typography
                variant="h1"
                as="h1"
                id={`${id}-heading`}
                className="text-ink-foreground animate-fade-up motion-safe-only"
                style={{ animationDelay: "150ms" }}
              >
                {title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </Typography>
            </div>

            <ul className="space-y-md">
              {details.map(({ icon: Icon, label, value, href }, index) => (
                <li key={label}>
                  <Reveal direction="left" delay={200 + index * 120} className="flex items-start gap-sm">
                    <Icon className="mt-xs h-5 w-5 shrink-0 text-ink-foreground" aria-hidden="true" />
                    <div>
                      <Typography variant="caption" as="p" className="text-ink-foreground/75">
                        {label}
                      </Typography>
                      {href ? (
                        <a href={href} className="whitespace-pre-line text-body-sm text-ink-foreground transition-colors hover:text-highlight">
                          {value}
                        </a>
                      ) : (
                        <Typography variant="body-sm" className="whitespace-pre-line text-ink-foreground">
                          {value}
                        </Typography>
                      )}
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>

          <Reveal direction="right" delay={150}>
            {children}
          </Reveal>
        </div>
      </Reveal>
    </section>
  );
}
