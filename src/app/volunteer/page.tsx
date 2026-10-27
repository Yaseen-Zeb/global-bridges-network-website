import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { DarkCardsSection } from "@/components/common/dark-cards-section";
import { PhotoPanel } from "@/components/common/photo-panel";
import { Typography } from "@/components/common/typography";
import { ContactForm } from "@/features/contact/components/contact-form";
import { SUPPORT_WAYS } from "@/features/donate/data/donate-content";
import { VOLUNTEER_FORM, VOLUNTEER_HERO } from "@/features/volunteer/data/volunteer-content";
import { sanityFetch } from "@/lib/sanity/fetch";
import { SITE_SETTINGS_QUERY, SUPPORT_WAYS_QUERY } from "@/lib/sanity/queries";
import type { SiteSettings, SupportCard } from "@/lib/sanity/types";

export const metadata: Metadata = pageMetadata({
  title: "Volunteer",
  description:
    "Volunteer your time and skills with Global Bridges Network to help refugees, immigrants, and vulnerable families in Maryland access support and opportunity.",
  path: "/volunteer",
  keywords: ["volunteer with refugees", "volunteer Maryland", "volunteer opportunities nonprofit", "mentor immigrant families"],
});

export default async function VolunteerPage() {
  const [settings, supportCards] = await Promise.all([
    sanityFetch<SiteSettings | null>(SITE_SETTINGS_QUERY),
    sanityFetch<SupportCard[] | null>(SUPPORT_WAYS_QUERY),
  ]);

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <PhotoPanel id="volunteer" eyebrow={VOLUNTEER_HERO.eyebrow} title={VOLUNTEER_HERO.title} image={VOLUNTEER_HERO.image} settings={settings}>
        <ContactForm
          categories={settings?.inquiryCategories ?? []}
          defaultCategory="volunteer"
          messageLabel={VOLUNTEER_FORM.messageLabel}
          intro={
            <div className="mb-lg space-y-sm">
              <Typography variant="body-sm" className="text-muted-foreground">
                {VOLUNTEER_FORM.description}
              </Typography>
              <Typography variant="body-sm" className="text-muted-foreground">
                {VOLUNTEER_FORM.prompt}
                {settings?.volunteerEmail && (
                  <>
                    {" "}
                    {VOLUNTEER_FORM.emailPrompt}{" "}
                    <a
                      href={`mailto:${settings.volunteerEmail}`}
                      className="font-medium text-accent underline underline-offset-2 hover:text-accent/80"
                    >
                      {settings.volunteerEmail}
                    </a>
                    .
                  </>
                )}
              </Typography>
            </div>
          }
        />
      </PhotoPanel>
      <DarkCardsSection id="support-ways" {...SUPPORT_WAYS} items={supportCards ?? []} />
    </main>
  );
}
