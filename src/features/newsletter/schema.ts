import { z } from "zod";

/**
 * One schema, used twice: by the form in the browser (instant feedback) and by
 * the API route on the server (never trust the browser).
 */
export const newsletterSchema = z.object({
  email: z.string().trim().toLowerCase().email("Please enter a valid email address."),
  /** Honeypot: hidden from people, but bots fill every field. Must stay empty. */
  company: z.string().max(0).optional(),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
