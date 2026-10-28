"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeToNewsletter } from "@/features/newsletter/api/newsletter.api";
import { newsletterSchema, type NewsletterInput } from "@/features/newsletter/schema";
import { cn } from "@/lib/utils";

interface NewsletterFormProps {
  /** "inverted" for use on the brand-blue newsletter card. */
  tone?: "default" | "inverted";
  className?: string;
}

export function NewsletterForm({ tone = "default", className }: NewsletterFormProps) {
  const inverted = tone === "inverted";
  const [done, setDone] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "", company: "" },
  });

  const onSubmit = async (values: NewsletterInput) => {
    try {
      const result = await subscribeToNewsletter(values);
      if (!result.success) throw new Error(result.error);
      setDone(true);
      reset();
    } catch (error) {
      const message = isAxiosError(error) ? error.response?.data?.error : error instanceof Error ? error.message : undefined;
      toast.error("Subscription failed", { description: message || "Please try again in a moment." });
    }
  };

  if (done) {
    return (
      <p
        role="status"
        className={cn(
          "flex items-center gap-xs text-sm font-semibold",
          inverted ? "text-primary-foreground" : "text-accent",
          className
        )}
      >
        <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
        Thanks for subscribing! You&apos;ll hear from us soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={cn("space-y-xs", className)}>
      <div className="flex flex-col gap-sm sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <Input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="Your email address"
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "newsletter-error" : undefined}
          className={cn(
            "h-12 flex-1",
            inverted && "border-transparent bg-background focus-visible:ring-highlight focus-visible:ring-offset-primary",
            errors.email && "border-destructive"
          )}
          {...register("email")}
        />

        {/* Honeypot: off-screen and skipped by keyboard and screen readers; only bots fill it. */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
          {...register("company")}
        />

        <Button
          type="submit"
          variant={inverted ? "accent" : "primary"}
          size={inverted ? "lg" : "md"}
          disabled={isSubmitting}
          className="sm:min-w-[9rem]"
        >
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" aria-label="Subscribing" /> : "Subscribe"}
        </Button>
      </div>
      {errors.email && (
        <p
          id="newsletter-error"
          className={cn("text-xs font-medium", inverted ? "text-highlight" : "text-destructive")}
        >
          {errors.email.message}
        </p>
      )}
    </form>
  );
}
