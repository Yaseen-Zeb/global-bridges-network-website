import { apiClient } from "@/lib/axios";
import type { NewsletterInput } from "@/features/newsletter/schema";

interface NewsletterResponse {
  success: boolean;
  error?: string;
}

/** Sends the signup to our own API route (/api/newsletter), which talks to Brevo. */
export async function subscribeToNewsletter(input: NewsletterInput) {
  const { data } = await apiClient.post<NewsletterResponse>("/newsletter", input);
  return data;
}
