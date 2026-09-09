import { Typography } from "@/components/common/typography";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-2xl">
      <div className="mx-auto max-w-4xl space-y-xl">
        <header className="space-y-sm">
          <Typography variant="h1">Global Bridges Network</Typography>
          <Typography variant="body" className="text-muted-foreground">
            Feature-based Next.js project setup complete with custom design system and shadcn components.
          </Typography>
        </header>

        <section className="rounded-card border border-border bg-background p-lg shadow-card space-y-md">
          <Typography variant="h2">Design Tokens & Components</Typography>
          <Typography variant="body">
            This project follows strict architecture rules with centralized design tokens, strict spacing, semantic colors, and modular features.
          </Typography>

          <div className="flex flex-wrap gap-md pt-sm">
            <Button variant="primary">Primary Action</Button>
            <Button variant="secondary">Secondary Action</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </section>
      </div>
    </main>
  );
}
