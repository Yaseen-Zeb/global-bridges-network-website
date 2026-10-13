import { Reveal } from "@/components/common/reveal";
import { Typography } from "@/components/common/typography";
import type { PolicySection } from "@/features/legal/data/privacy-policy";

interface PolicyPageProps {
  eyebrow: string;
  title: string[];
  description: string;
  lastUpdated: string;
  sections: PolicySection[];
}

/** Layout for legal pages: white header, then numbered sections on a grey band. */
export function PolicyPage({ eyebrow, title, description, lastUpdated, sections }: PolicyPageProps) {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <section aria-labelledby="policy-heading" className="px-md py-3xl lg:px-xl lg:py-4xl">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-md space-y-sm">
            <Typography variant="eyebrow" as="p" className="animate-fade-up motion-safe-only">
              {eyebrow}
            </Typography>
            <Typography
              variant="title"
              as="h1"
              id="policy-heading"
              className="animate-fade-up motion-safe-only lg:text-4xl"
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
              Last Updated: <time>{lastUpdated}</time>
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
                  <Typography variant="h3" as="h2" className="text-xl font-semibold lg:text-2xl">
                    {String(index + 1).padStart(2, "0")} {section.title}
                  </Typography>
                  <div className="space-y-xs text-sm leading-6 text-foreground/85">
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
