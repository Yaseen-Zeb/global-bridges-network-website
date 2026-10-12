import Image from "next/image";
import { Reveal } from "@/components/common/reveal";
import { Typography } from "@/components/common/typography";
import { LEADERSHIP } from "@/features/about/data/about-content";

export function LeadershipSection() {
  return (
    <section aria-labelledby="leadership-heading" className="bg-background px-md py-3xl lg:px-xl lg:py-4xl">
      <div className="mx-auto max-w-5xl space-y-2xl">
        <Reveal className="mx-auto max-w-md space-y-sm text-center">
          <Typography variant="eyebrow" as="p">
            {LEADERSHIP.eyebrow}
          </Typography>
          <Typography variant="title" id="leadership-heading" className="lg:text-4xl">
            {LEADERSHIP.title[0]}
            <br />
            {LEADERSHIP.title[1]}
          </Typography>
          <Typography variant="body-sm" className="text-muted-foreground">
            {LEADERSHIP.description}
          </Typography>
        </Reveal>

        <ul className="space-y-xl">
          {LEADERSHIP.members.map((member) => (
            <li key={member.name}>
              <article className="grid grid-cols-1 items-start gap-lg sm:grid-cols-[13rem_1fr] lg:gap-xl">
                <Reveal direction="left" className="group mx-auto w-full max-w-[13rem] bg-background p-xs shadow-modal">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={member.image}
                      alt={`Portrait of ${member.name}`}
                      fill
                      sizes="13rem"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                </Reveal>

                <Reveal direction="right" delay={120} className="space-y-sm">
                  <Typography variant="body-sm" as="p" className="font-semibold text-primary">
                    {member.role}
                  </Typography>
                  <Typography variant="card-title">{member.name}</Typography>
                  <div className="space-y-sm">
                    {member.bio.map((paragraph) => (
                      <Typography key={paragraph.slice(0, 32)} variant="caption" as="p" className="font-normal leading-5">
                        {paragraph}
                      </Typography>
                    ))}
                  </div>
                </Reveal>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
