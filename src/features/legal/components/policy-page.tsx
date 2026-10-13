import { Reveal } from "@/components/common/reveal";
import { Typography } from "@/components/common/typography";
import type { LegalPage } from "@/lib/sanity/types";

/** "2026-09-16" → "September 16, 2026" (date-only, so format in UTC). */
const formatDate = (isoDate: string) =>
  new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date(isoDate));

/** Layout for legal pages: white header, then numbered sections on a grey band. */
export function PolicyPage({ page }: { page: LegalPage }) {
  const { eyebrow, titleLines: title, description, lastUpdated, sections } = page;

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <section aria-labelledby="policy-heading" className="px-md py-3xl lg:px-xl lg:py-4xl">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-md space-y-sm">
            <Typography variant="overline" as="p" className="animate-fade-up motion-safe-only">
              {eyebrow}
            </Typography>
            <Typography
              variant="h2"
              as="h1"
              id="policy-heading"
              className="animate-fade-up motion-safe-only"
              style={{ animationDelay: "150ms" }}
            >
              {title[0]}
              <br />
              {title[1]}
            </Typography>
            <Typography
              variant="body-sm"
              className="text-muted-foreground animate-fade-up motion-safe-only"
              style={{ animationDelay: "300ms" }}
            >
              {description}
            </Typography>
            <Typography
              variant="body-sm"
              className="font-semibold animate-fade-up motion-safe-only"
              style={{ animationDelay: "400ms" }}
            >
              Last Updated: <time dateTime={lastUpdated}>{formatDate(lastUpdated)}</time>
            </Typography>
          </div>
        </div>
      </section>

      <section aria-label={`${eyebrow} details`} className="bg-muted px-md py-3xl lg:px-xl lg:py-4xl">
        <div className="mx-auto max-w-6xl">
          <ol className="max-w-2xl space-y-xl">
            {sections.map((section, index) => (
              <li key={section.title}>
                <Reveal delay={Math.min(index, 3) * 80} className="space-y-sm">
                  <Typography variant="h4-semibold" as="h2">
                    {String(index + 1).padStart(2, "0")} {section.title}
                  </Typography>
                  <div className="space-y-xs text-body-sm text-foreground/85">
                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                    ))}
                    {section.intro && <p>{section.intro}</p>}
                    {section.bullets && (
                      <ul className="list-disc space-y-[2px] pl-lg marker:text-foreground">
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                    {section.outro && <p>{section.outro}</p>}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
