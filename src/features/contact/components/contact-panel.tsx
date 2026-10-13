import Image from "next/image";
import { Mail, MapPin, PhoneCall, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/common/reveal";
import { Typography } from "@/components/common/typography";
import { SITE_CONTACT } from "@/data/site";
import { ContactForm } from "@/features/contact/components/contact-form";
import { CONTACT_HERO } from "@/features/contact/data/contact-content";
import type { ContactInfo } from "@/lib/sanity/types";

interface ContactDetail {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

export function ContactPanel({ contactInfo }: { contactInfo: ContactInfo | null }) {
  // CMS values first; the footer's contact details are the fallback.
  const email = contactInfo?.email || SITE_CONTACT.email;
  const phone = contactInfo?.phone || SITE_CONTACT.phone;
  const address = contactInfo?.address || SITE_CONTACT.addressLines.slice(1).join("\n");

  const details: ContactDetail[] = [
    { icon: Mail, label: CONTACT_HERO.details.email, value: email, href: `mailto:${email}` },
    { icon: MapPin, label: CONTACT_HERO.details.address, value: address },
    { icon: PhoneCall, label: CONTACT_HERO.details.phone, value: phone, href: `tel:${phone.replace(/[^\d+]/g, "")}` },
  ];

  return (
    <section aria-labelledby="contact-heading" className="bg-background px-md py-3xl lg:px-xl lg:py-4xl">
      <Reveal direction="zoom" className="relative mx-auto max-w-6xl overflow-hidden bg-navy">
        {/* Photo with a deep-navy wash, darkest at the bottom where the contact details sit. */}
        <Image
          src={CONTACT_HERO.image.src}
          alt={CONTACT_HERO.image.alt}
          fill
          priority
          sizes="(min-width: 1152px) 1152px, 100vw"
          className="-scale-x-100 object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/60 to-ink/90" aria-hidden="true" />

        <div className="relative grid grid-cols-1 gap-xl p-md sm:p-lg lg:grid-cols-[1fr_minmax(0,30rem)] lg:gap-2xl lg:p-md lg:pl-xl">
          <div className="flex flex-col justify-between gap-2xl py-md lg:py-lg">
            <div className="space-y-sm">
              <Typography variant="eyebrow" as="p" className="animate-fade-up motion-safe-only">
                {CONTACT_HERO.eyebrow}
              </Typography>
              <Typography
                variant="title"
                as="h1"
                id="contact-heading"
                className="text-ink-foreground animate-fade-up motion-safe-only"
                style={{ animationDelay: "150ms" }}
              >
                {CONTACT_HERO.title.map((line) => (
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
                      <Typography variant="caption" as="p" className="font-normal text-ink-foreground/75">
                        {label}
                      </Typography>
                      {href ? (
                        <a
                          href={href}
                          className="whitespace-pre-line text-sm text-ink-foreground transition-colors hover:text-highlight"
                        >
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
            <ContactForm />
          </Reveal>
        </div>
      </Reveal>
    </section>
  );
}
