import { Reveal } from "@/components/common/reveal";
import { Typography } from "@/components/common/typography";
import { cn } from "@/lib/utils";

export interface DarkCard {
  /** Optional stable key (Sanity _key); falls back to the title. */
  _key?: string;
  /** Line breaks are kept. */
  title: string;
  description: string;
}

interface DarkCardsSectionProps {
  id: string;
  eyebrow: string;
  /** Line breaks are kept. */
  title: string;
  description?: string;
  items: DarkCard[];
  /** Cards per row on large screens (default 3). */
  columns?: 3 | 4;
}

/** Black section with a split header and a grid of dark cards that turn blue on hover. */
export function DarkCardsSection({ id, eyebrow, title, description, items, columns = 3 }: DarkCardsSectionProps) {
  if (items.length === 0) return null;

  return (
    <section
      aria-labelledby={`${id}-heading`}
      className="bg-ink px-md pb-4xl pt-3xl text-ink-foreground lg:px-xl lg:pb-5xl lg:pt-4xl"
    >
      <div className="mx-auto max-w-6xl space-y-2xl">
        <div className="flex flex-col gap-md md:flex-row md:items-end md:justify-between">
          <Reveal direction="left" className="space-y-xs">
            <Typography variant="overline" className="text-highlight" as="p">
              {eyebrow}
            </Typography>
            <Typography variant="h2" id={`${id}-heading`} className="whitespace-pre-line text-ink-foreground">
              {title}
            </Typography>
          </Reveal>
          {description && (
            <Reveal direction="right" delay={150} className="md:max-w-md">
              <Typography variant="body-sm" className="text-ink-muted md:text-right">
                {description}
              </Typography>
            </Reveal>
          )}
        </div>

        <ul className={cn("grid grid-cols-1 gap-md", columns === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3")}>
          {items.map((item, index) => (
            <li key={item._key ?? item.title}>
              <Reveal
                delay={(index % columns) * 120}
                className="h-full space-y-sm bg-ink-foreground/10 p-lg transition-colors duration-500 hover:bg-primary"
              >
                <Typography variant="h4-semibold" className="whitespace-pre-line text-ink-foreground">
                  {item.title}
                </Typography>
                <Typography variant="caption" as="p" className="text-ink-foreground/80">
                  {item.description}
                </Typography>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
